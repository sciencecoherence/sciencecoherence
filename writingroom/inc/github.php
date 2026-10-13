<?php
declare(strict_types=1);

// Sends the website files the online Writing Room writes back to GitHub, so the
// repository and the owner's computer follow the server.
//
// Each file is compared three ways, by git blob SHA: the server's copy, GitHub's
// copy, and the baseline (the last version both agreed on).
//   server == GitHub            in step
//   GitHub == baseline          the server changed it     -> committed
//   server == baseline          GitHub changed it         -> left for the next deployment
//   neither                     both changed              -> conflict, nothing sent
// A conflict is resolved from github.php, which can send the server's version.

require_once __DIR__ . '/articles.php';

const WR_GITHUB_DEFAULT_REPO = 'sciencecoherence/sciencecoherence.com';
const WR_GITHUB_DEFAULT_BRANCH = 'main';

function wr_github_setting(string $constant, string $env): string {
    if (defined($constant) && is_string(constant($constant))) return trim((string) constant($constant));
    $value = getenv($env);
    return is_string($value) ? trim($value) : '';
}

// The token lives in the same private configuration file as the database
// password (loaded by wr_db()), never in this repository.
function wr_github_config(): ?array {
    $token = wr_github_setting('SC_GITHUB_TOKEN', 'SC_WRITING_ROOM_GITHUB_TOKEN');
    if ($token === '') return null;
    $repo = wr_github_setting('SC_GITHUB_REPO', 'SC_WRITING_ROOM_GITHUB_REPO') ?: WR_GITHUB_DEFAULT_REPO;
    $branch = wr_github_setting('SC_GITHUB_BRANCH', 'SC_WRITING_ROOM_GITHUB_BRANCH') ?: WR_GITHUB_DEFAULT_BRANCH;
    if (!preg_match('~^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$~', $repo) || !preg_match('~^[A-Za-z0-9_./-]+$~', $branch)) {
        throw new RuntimeException('The GitHub repository or branch setting is not valid.');
    }
    // The API address is only ever changed by the tests (tests/test_github_sync.py).
    $api = wr_github_setting('SC_GITHUB_API', 'SC_WRITING_ROOM_GITHUB_API') ?: 'https://api.github.com';
    return ['token' => $token, 'repo' => $repo, 'branch' => $branch, 'api' => rtrim($api, '/')];
}

function wr_github_ensure_tables(PDO $db): void {
    static $done = false;
    if ($done) return;
    // Kept to SQL that SQLite also accepts, so the tests can run without MySQL.
    $engine = $db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql' ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' : '';
    $db->exec(
        'CREATE TABLE IF NOT EXISTS sc_wr_github_files (
          path VARCHAR(255) NOT NULL,
          blob_sha CHAR(40) NOT NULL,
          updated_at DATETIME NOT NULL,
          PRIMARY KEY (path)
        )' . $engine
    );
    $db->exec(
        'CREATE TABLE IF NOT EXISTS sc_wr_github_state (
          id TINYINT NOT NULL,
          status VARCHAR(20) NOT NULL,
          message TEXT NOT NULL,
          details_json MEDIUMTEXT NULL,
          commit_sha CHAR(40) NULL,
          attempted_at DATETIME NOT NULL,
          synced_at DATETIME NULL,
          PRIMARY KEY (id)
        )' . $engine
    );
    $done = true;
}

// Line endings are normalised to LF, as .gitattributes (text=auto) does for Git.
function wr_github_normalise(string $bytes): string {
    return str_replace("\r\n", "\n", $bytes);
}

function wr_git_blob_sha(string $bytes): string {
    return sha1('blob ' . strlen($bytes) . "\0" . $bytes);
}

// Repository path => absolute server path, for every file the room can write.
// The repository root is the deployed folder that holds writingroom/.
function wr_github_tracked_files(): array {
    $root = str_replace('\\', '/', dirname(__DIR__, 2));
    $paths = [wr_content_path(), wr_collections_path(), wr_sections_path(), wr_find_site_file('pages.js')];
    $siteRoot = dirname(wr_find_site_file('pages.js'));
    $paths[] = $siteRoot . '/documents.js';
    $paths[] = $siteRoot . '/index.html';
    $paths[] = dirname(wr_content_path()) . '/index.html';
    $horizon = wr_horizon_path();
    if ($horizon !== null) $paths[] = $horizon;
    foreach (glob($siteRoot . '/documents/*.html') ?: [] as $document) $paths[] = $document;

    $files = [];
    foreach ($paths as $path) {
        $path = str_replace('\\', '/', $path);
        if (!is_file($path) || !str_starts_with($path, $root . '/')) continue;
        $relative = substr($path, strlen($root) + 1);
        if (!preg_match('~^[A-Za-z0-9_./ -]+$~', $relative) || str_contains($relative, '..')) continue;
        $files[$relative] = $path;
    }
    ksort($files);
    return $files;
}

function wr_github_request(array $config, string $method, string $path, ?array $body = null): array {
    $url = $config['api'] . '/repos/' . $config['repo'] . $path;
    $headers = [
        'Accept: application/vnd.github+json',
        'Authorization: Bearer ' . $config['token'],
        'User-Agent: ScienceCoherence-WritingRoom',
        'X-GitHub-Api-Version: 2022-11-28',
    ];
    $payload = $body === null ? null : json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    if ($payload !== null) $headers[] = 'Content-Type: application/json';

    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 30,
        ]);
        if ($payload !== null) curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
        $response = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        $failure = curl_error($curl);
        curl_close($curl);
        if ($response === false) throw new RuntimeException('GitHub could not be reached: ' . $failure);
    } else {
        $context = stream_context_create(['http' => [
            'method' => $method, 'header' => implode("\r\n", $headers), 'content' => $payload ?? '',
            'timeout' => 30, 'ignore_errors' => true,
        ]]);
        $response = @file_get_contents($url, false, $context);
        if ($response === false) throw new RuntimeException('GitHub could not be reached.');
        $status = preg_match('~^HTTP/\S+\s+(\d{3})~', $http_response_header[0] ?? '', $m) ? (int) $m[1] : 0;
    }
    $data = json_decode((string) $response, true);
    return [$status, is_array($data) ? $data : []];
}

function wr_github_expect(array $result, int $status, string $what): array {
    [$code, $data] = $result;
    if ($code === $status) return $data;
    $reason = match (true) {
        $code === 401 => 'the token was refused (expired or mistyped)',
        $code === 403 || $code === 404 => 'the token cannot reach this repository (check its repository and Contents: write permission)',
        default => 'GitHub answered ' . $code . (isset($data['message']) ? ': ' . $data['message'] : ''),
    };
    throw new RuntimeException('Could not ' . $what . ' — ' . $reason . '.');
}

function wr_github_baseline(PDO $db): array {
    $baseline = [];
    foreach ($db->query('SELECT path, blob_sha FROM sc_wr_github_files') as $row) $baseline[$row['path']] = $row['blob_sha'];
    return $baseline;
}

function wr_github_save_baseline(PDO $db, array $shas): void {
    if (!$shas) return;
    $statement = $db->prepare('REPLACE INTO sc_wr_github_files (path, blob_sha, updated_at) VALUES (?, ?, ?)');
    foreach ($shas as $path => $sha) $statement->execute([$path, $sha, gmdate('Y-m-d H:i:s')]);
}

function wr_github_record(PDO $db, array $status): array {
    $now = gmdate('Y-m-d H:i:s');
    $previous = $db->query('SELECT commit_sha, synced_at FROM sc_wr_github_state WHERE id = 1')->fetch() ?: [];
    $synced = in_array($status['status'], ['synced', 'waiting'], true);
    $statement = $db->prepare(
        'REPLACE INTO sc_wr_github_state (id, status, message, details_json, commit_sha, attempted_at, synced_at)
         VALUES (1, ?, ?, ?, ?, ?, ?)'
    );
    $statement->execute([
        $status['status'], $status['message'], wr_json(['files' => $status['files'] ?? []]),
        $status['commit'] ?? ($previous['commit_sha'] ?? null), $now, $synced ? $now : ($previous['synced_at'] ?? null),
    ]);
    return $status;
}

// The last recorded outcome, without contacting GitHub.
function wr_github_status(PDO $db): array {
    try {
        if (wr_github_config() === null) return ['status' => 'off', 'message' => 'GitHub sync is not set up.'];
        wr_github_ensure_tables($db);
        $row = $db->query('SELECT status, message, details_json, commit_sha, attempted_at, synced_at FROM sc_wr_github_state WHERE id = 1')->fetch();
    } catch (Throwable $error) {
        return ['status' => 'error', 'message' => $error->getMessage()];
    }
    if (!$row) return ['status' => 'unknown', 'message' => 'GitHub sync has not run yet.'];
    $details = json_decode((string) ($row['details_json'] ?? ''), true);
    return [
        'status' => $row['status'], 'message' => $row['message'], 'commit' => $row['commit_sha'],
        'files' => is_array($details['files'] ?? null) ? $details['files'] : [],
        'attemptedAt' => $row['attempted_at'], 'syncedAt' => $row['synced_at'],
    ];
}

// Compares every tracked file and, unless $dryRun, commits the server's changes.
// $sendServerVersions also sends files whose GitHub copy changed too (a conflict),
// and files with no baseline yet; it is the explicit choice made on github.php.
// Never throws: the website change has already been made.
function wr_github_sync(PDO $db, array $user, bool $sendServerVersions = false, bool $dryRun = false): array {
    try {
        $config = wr_github_config();
        if ($config === null) return ['status' => 'off', 'message' => 'GitHub sync is not set up.'];
        wr_github_ensure_tables($db);
    } catch (Throwable $error) {
        return ['status' => 'error', 'message' => $error->getMessage()];
    }

    $lockPath = rtrim(sys_get_temp_dir(), '/\\') . '/science-coherence-writing-room-github.lock';
    $lock = @fopen($lockPath, 'c');
    if ($lock !== false) flock($lock, LOCK_EX);
    try {
        for ($attempt = 1; ; $attempt++) {
            $branch = rawurlencode($config['branch']);
            $ref = wr_github_expect(wr_github_request($config, 'GET', '/git/ref/heads/' . $branch), 200, 'read the ' . $config['branch'] . ' branch');
            $head = (string) ($ref['object']['sha'] ?? '');
            $commit = wr_github_expect(wr_github_request($config, 'GET', '/git/commits/' . $head), 200, 'read the latest commit');
            $baseTree = (string) ($commit['tree']['sha'] ?? '');
            $tree = wr_github_expect(wr_github_request($config, 'GET', '/git/trees/' . $baseTree . '?recursive=1'), 200, 'read the repository files');
            if (!empty($tree['truncated'])) throw new RuntimeException('The repository is too large to compare in one request.');
            $remote = [];
            foreach ($tree['tree'] ?? [] as $entry) if (($entry['type'] ?? '') === 'blob') $remote[$entry['path']] = $entry['sha'];

            $baseline = wr_github_baseline($db);
            $agreed = $send = $files = [];
            foreach (wr_github_tracked_files() as $path => $absolute) {
                $bytes = @file_get_contents($absolute);
                if ($bytes === false) continue;
                $bytes = wr_github_normalise($bytes);
                $local = wr_git_blob_sha($bytes);
                $theirs = $remote[$path] ?? null;
                $base = $baseline[$path] ?? null;
                if ($local === $theirs) {
                    $agreed[$path] = $local;
                    $state = 'same';
                } elseif ($theirs === $base || $sendServerVersions) {
                    $send[$path] = $bytes;
                    $state = $theirs === $base ? 'server-newer' : 'differs';
                } elseif ($local === $base) {
                    $state = 'github-newer';
                } else {
                    $state = 'differs';
                }
                $files[$path] = $state;
            }

            $conflicts = array_keys(array_filter($files, fn($s) => $s === 'differs'));
            $waiting = array_keys(array_filter($files, fn($s) => $s === 'github-newer'));
            if ($dryRun) return ['status' => 'preview', 'message' => '', 'files' => $files];

            $newCommit = null;
            if ($send) {
                $entries = [];
                foreach ($send as $path => $bytes) $entries[] = ['path' => $path, 'mode' => '100644', 'type' => 'blob', 'content' => $bytes];
                $newTree = wr_github_expect(wr_github_request($config, 'POST', '/git/trees', ['base_tree' => $baseTree, 'tree' => $entries]), 201, 'prepare the files');
                $names = array_map('basename', array_keys($send));
                $message = 'Writing Room: update ' . implode(', ', array_slice($names, 0, 4)) . (count($names) > 4 ? ' and ' . (count($names) - 4) . ' more' : '')
                    . "\n\nPublished online by " . (string) ($user['username'] ?? 'an administrator') . '.';
                $created = wr_github_expect(wr_github_request($config, 'POST', '/git/commits', [
                    'message' => $message, 'tree' => $newTree['sha'] ?? '', 'parents' => [$head],
                ]), 201, 'create the commit');
                [$code] = $moved = wr_github_request($config, 'PATCH', '/git/refs/heads/' . $branch, ['sha' => $created['sha'] ?? '', 'force' => false]);
                if ($code === 422 && $attempt < 3) continue; // The branch moved meanwhile: compare again.
                wr_github_expect($moved, 200, 'update the ' . $config['branch'] . ' branch');
                $newCommit = (string) $created['sha'];
                foreach ($send as $path => $bytes) {
                    $agreed[$path] = wr_git_blob_sha($bytes);
                    $files[$path] = 'sent';
                }
            }
            wr_github_save_baseline($db, $agreed);

            if ($conflicts && !$sendServerVersions) {
                $status = 'conflict';
                $text = implode(', ', $conflicts) . (count($conflicts) === 1 ? ' was' : ' were')
                    . ' changed both here and on GitHub, so ' . (count($conflicts) === 1 ? 'it was' : 'they were') . ' not sent. Resolve this on the GitHub sync page.';
            } elseif ($waiting) {
                $status = 'waiting';
                $text = 'GitHub has newer ' . implode(', ', $waiting) . '; the next deployment will bring ' . (count($waiting) === 1 ? 'it' : 'them') . ' here.';
            } else {
                $status = 'synced';
                $text = $newCommit ? 'Saved to GitHub.' : 'GitHub already matches the website.';
            }
            return wr_github_record($db, ['status' => $status, 'message' => $text, 'commit' => $newCommit, 'files' => $files]);
        }
    } catch (Throwable $error) {
        error_log(json_encode(['event' => 'science_coherence_writing_room_github_failed', 'message' => $error->getMessage()]));
        $failure = ['status' => 'error', 'message' => 'Not yet saved to GitHub: ' . $error->getMessage() . ' It will be tried again.'];
        try { return wr_github_record($db, $failure); } catch (Throwable $ignored) { return $failure; }
    } finally {
        if ($lock !== false) {
            flock($lock, LOCK_UN);
            fclose($lock);
        }
    }
}

// A failed sync is retried when the room is next opened, at most once a minute.
// The first run is always started by hand from github.php.
function wr_github_retry_if_due(PDO $db, array $user): void {
    $status = wr_github_status($db);
    if ($status['status'] !== 'error' || !isset($status['attemptedAt'])) return;
    if (strtotime($status['attemptedAt'] . ' UTC') > time() - 60) return;
    wr_github_sync($db, $user);
}
