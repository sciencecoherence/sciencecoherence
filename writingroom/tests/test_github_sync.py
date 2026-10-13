"""The online room's GitHub sync (inc/github.php), run through PHP against a fake
GitHub API and SQLite. Skipped when no PHP is found; set PHP_BINARY to point at one."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOM = Path(__file__).resolve().parents[1]
PHP = os.environ.get('PHP_BINARY') or shutil.which('php')

DRIVER = r'''<?php
require $argv[1] . '/writingroom/inc/articles.php';
$db = new PDO('sqlite:' . $argv[2]);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
$mode = $argv[3];
$result = $mode === 'status' ? wr_github_status($db) : wr_github_sync($db, ['id' => 1, 'username' => 'julien'], $mode === 'send', $mode === 'preview');
echo json_encode($result);
'''


def blob_sha(data):
    return hashlib.sha1(b'blob %d\0' % len(data) + data).hexdigest()


class FakeGitHub:
    """Just enough of the Git Data API: refs, commits, recursive trees."""

    def __init__(self, files):
        self.lock = threading.Lock()
        self.trees = {}
        self.commits = {}
        self.requests = []
        self.move_before_patch = None  # files to push "from elsewhere" right before the next PATCH
        self.head = self.commit(files, None, 'initial')

    def commit(self, files, parent, message):
        tree = 't' + hashlib.sha1(json.dumps(sorted(files.items())).encode()).hexdigest()
        self.trees[tree] = dict(files)
        sha = hashlib.sha1(f'{tree}{parent}{message}{len(self.commits)}'.encode()).hexdigest()
        self.commits[sha] = {'tree': tree, 'parent': parent, 'message': message}
        return sha

    def files(self, commit=None):
        return self.trees[self.commits[commit or self.head]['tree']]

    def push(self, changes, message='pushed from a computer'):
        files = dict(self.files())
        files.update({path: blob_sha(data) for path, data in changes.items()})
        self.head = self.commit(files, self.head, message)

    def handle(self, method, path, body, authorised):
        self.requests.append((method, path))
        if not authorised:
            return 401, {'message': 'Bad credentials'}
        prefix = '/repos/owner/site/git/'
        if not path.startswith(prefix):
            return 404, {'message': 'Not Found'}
        path = path[len(prefix):].split('?')[0]
        with self.lock:
            if method == 'GET' and path == 'ref/heads/main':
                return 200, {'object': {'sha': self.head}}
            if method == 'GET' and path.startswith('commits/'):
                return 200, {'tree': {'sha': self.commits[path[8:]]['tree']}}
            if method == 'GET' and path.startswith('trees/'):
                return 200, {'truncated': False, 'tree': [{'path': p, 'type': 'blob', 'sha': s} for p, s in self.trees[path[6:]].items()]}
            if method == 'POST' and path == 'trees':
                files = dict(self.trees[body['base_tree']])
                for entry in body['tree']:
                    files[entry['path']] = blob_sha(entry['content'].encode('utf-8'))
                tree = 't' + hashlib.sha1(json.dumps(sorted(files.items())).encode()).hexdigest()
                self.trees[tree] = files
                return 201, {'sha': tree}
            if method == 'POST' and path == 'commits':
                sha = hashlib.sha1(f'{body["tree"]}{body["parents"]}{len(self.commits)}'.encode()).hexdigest()
                self.commits[sha] = {'tree': body['tree'], 'parent': body['parents'][0], 'message': body['message']}
                return 201, {'sha': sha}
            if method == 'PATCH' and path == 'refs/heads/main':
                if self.move_before_patch is not None:
                    changes, self.move_before_patch = self.move_before_patch, None
                    files = dict(self.files())
                    files.update({p: blob_sha(d) for p, d in changes.items()})
                    self.head = self.commit(files, self.head, 'raced')
                if self.commits[body['sha']]['parent'] != self.head or body.get('force'):
                    return 422, {'message': 'Update is not a fast forward'}
                self.head = body['sha']
                return 200, {'object': {'sha': self.head}}
        return 404, {'message': 'Not Found'}


@unittest.skipUnless(PHP, 'PHP is not installed; set PHP_BINARY to run the GitHub sync tests.')
class GitHubSyncTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        root = Path(self.temp.name)
        self.site = root / 'site'
        shutil.copytree(ROOM, self.site / 'writingroom', ignore=shutil.ignore_patterns('data', 'tests', '__pycache__'))
        self.files = {
            'content.js': b'window.SC_CONTENT = [];\n',
            'collections.js': b'window.SC_COLLECTIONS = [];\n',
            'sections.js': b'window.SC_SECTIONS = [];\n',
            'pages.js': b'window.SC_PAGES = [];\n',
            'documents.js': b'window.SC_DOCUMENTS = {};\n',
            'index.html': b'<!doctype html><script src="content.js?v=1"></script>\n',
            'documents/protocol.html': b'<section id="a">Protocol</section>\n',
        }
        for path, data in self.files.items():
            (self.site / path).parent.mkdir(parents=True, exist_ok=True)
            (self.site / path).write_bytes(data)
        self.github = FakeGitHub({path: blob_sha(data) for path, data in self.files.items()} | {'app.js': blob_sha(b'app')})
        self.database = root / 'room.sqlite'
        self.driver = root / 'driver.php'
        self.driver.write_text(DRIVER, encoding='utf-8')
        self.sessions = root / 'sessions'
        self.sessions.mkdir()
        self.token = 'good'

        github = self.github
        test = self

        class Handler(BaseHTTPRequestHandler):
            def respond(self):
                length = int(self.headers.get('Content-Length') or 0)
                body = json.loads(self.rfile.read(length)) if length else None
                status, data = github.handle(self.command, self.path, body, self.headers.get('Authorization') == 'Bearer good')
                payload = json.dumps(data).encode()
                self.send_response(status)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
            do_GET = do_POST = do_PATCH = respond

            def log_message(self, *args):
                pass

        self.server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.api = f'http://127.0.0.1:{self.server.server_address[1]}'

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.temp.cleanup()

    def run_php(self, mode='sync'):
        command = [PHP, '-d', 'display_errors=stderr', '-d', f'session.save_path={self.sessions}']
        extensions = Path(PHP).resolve().parent / 'ext'
        if extensions.is_dir() and not (Path(PHP).resolve().parent / 'php.ini').exists():
            command += ['-d', f'extension_dir={extensions}', '-d', 'extension=curl', '-d', 'extension=pdo_sqlite']
        command += [str(self.driver), str(self.site), str(self.database), mode]
        env = dict(os.environ, SC_WRITING_ROOM_GITHUB_TOKEN=self.token, SC_WRITING_ROOM_GITHUB_API=self.api,
                   SC_WRITING_ROOM_GITHUB_REPO='owner/site')
        env.pop('SC_WEBSITE_DIR', None)
        done = subprocess.run(command, capture_output=True, env=env, timeout=60)
        self.assertEqual(done.returncode, 0, done.stderr.decode(errors='replace'))
        return json.loads(done.stdout)

    def edit(self, path, data):
        (self.site / path).write_bytes(data)

    def test_first_run_commits_nothing_until_the_owner_chooses(self):
        self.edit('content.js', b'window.SC_CONTENT = [{"id":"online"}];\n')
        head = self.github.head
        result = self.run_php()
        self.assertEqual(result['status'], 'conflict')
        self.assertEqual(result['files']['content.js'], 'differs')
        self.assertEqual(result['files']['pages.js'], 'same')
        self.assertEqual(self.github.head, head)

        result = self.run_php('send')
        self.assertEqual(result['status'], 'synced')
        self.assertEqual(result['files']['content.js'], 'sent')
        self.assertEqual(self.github.files()['content.js'], blob_sha(b'window.SC_CONTENT = [{"id":"online"}];\n'))
        self.assertEqual(self.github.files()['app.js'], blob_sha(b'app'), 'files the room does not write are kept')
        self.assertIn('Published online by julien', self.github.commits[self.github.head]['message'])

    def test_later_online_edits_are_committed_automatically(self):
        self.run_php()  # every file matches: this records the baseline
        self.edit('content.js', b'window.SC_CONTENT = [1];\n')
        self.edit('index.html', b'<!doctype html><script src="content.js?v=2"></script>\n')
        result = self.run_php()
        self.assertEqual(result['status'], 'synced', result)
        self.assertEqual(result['message'], 'Saved to GitHub.')
        self.assertEqual(self.github.files()['content.js'], blob_sha(b'window.SC_CONTENT = [1];\n'))
        self.assertEqual(self.github.files()['index.html'], blob_sha(b'<!doctype html><script src="content.js?v=2"></script>\n'))
        commits = len(self.github.commits)
        self.assertEqual(self.run_php()['message'], 'GitHub already matches the website.')
        self.assertEqual(len(self.github.commits), commits, 'nothing to send means no commit')

    def test_newer_github_version_is_left_for_the_deployment(self):
        self.run_php()
        self.github.push({'pages.js': b'window.SC_PAGES = [2];\n'})
        head = self.github.head
        result = self.run_php()
        self.assertEqual(result['status'], 'waiting')
        self.assertEqual(result['files']['pages.js'], 'github-newer')
        self.assertEqual(self.github.head, head, 'the newer GitHub version is not overwritten')

    def test_file_changed_on_both_sides_is_not_sent(self):
        self.run_php()
        self.github.push({'content.js': b'window.SC_CONTENT = ["computer"];\n'})
        self.edit('content.js', b'window.SC_CONTENT = ["online"];\n')
        self.edit('sections.js', b'window.SC_SECTIONS = ["online"];\n')
        result = self.run_php()
        self.assertEqual(result['status'], 'conflict')
        self.assertIn('content.js', result['message'])
        self.assertEqual(self.github.files()['content.js'], blob_sha(b'window.SC_CONTENT = ["computer"];\n'))
        self.assertEqual(self.github.files()['sections.js'], blob_sha(b'window.SC_SECTIONS = ["online"];\n'), 'the other change still goes')
        self.assertEqual(self.run_php('status')['status'], 'conflict')

    def test_branch_moving_during_the_commit_is_compared_again(self):
        self.run_php()
        self.edit('content.js', b'window.SC_CONTENT = ["online"];\n')
        self.github.move_before_patch = {'app.js': b'app 2'}
        result = self.run_php()
        self.assertEqual(result['status'], 'synced', result)
        self.assertEqual(self.github.files()['app.js'], blob_sha(b'app 2'), 'the other push is kept')
        self.assertEqual(self.github.files()['content.js'], blob_sha(b'window.SC_CONTENT = ["online"];\n'))

    def test_windows_line_endings_on_the_server_are_not_a_change(self):
        self.edit('pages.js', b'window.SC_PAGES = [];\r\n')
        result = self.run_php()
        self.assertEqual(result['files']['pages.js'], 'same')

    def test_refused_token_is_reported_and_changes_nothing(self):
        self.token = 'expired'
        head = self.github.head
        result = self.run_php()
        self.assertEqual(result['status'], 'error')
        self.assertIn('token was refused', result['message'])
        self.assertEqual(self.github.head, head)
        self.assertEqual(self.run_php('status')['status'], 'error')

    def test_preview_changes_nothing(self):
        self.edit('content.js', b'window.SC_CONTENT = [9];\n')
        head = self.github.head
        result = self.run_php('preview')
        self.assertEqual(result['status'], 'preview')
        self.assertEqual(self.github.head, head)
        self.assertFalse(any(method != 'GET' for method, _ in self.github.requests))


if __name__ == '__main__':
    unittest.main()
