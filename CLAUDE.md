# CLAUDE.md

Project-wide rules live in `C:\cohera\AGENTS.md` (canon, `.private/`, generated files,
`mem.py`/`coord.py`). Read that first. This file covers only this repository.

## What this repository is

This is the **approved Git copy** of the Science Coherence website — the local checkout of
`sciencecoherence/sciencecoherence.com`. It sits nested inside the editing copy:

| Layer | Path | Role |
|---|---|---|
| Editing copy | `C:\cohera\sciencecoherence.com\` | Where changes and previews happen |
| **Approved copy (this repo)** | `C:\cohera\sciencecoherence.com\sciencecoherence.com\` | Only the owner copies chosen files in; `main` is the reviewed source |
| Release | `hostinger` branch | Built from `main` by a GitHub workflow; Hostinger deploys it to `public_html` |

See `..\README.md` for the full release procedure. Consequences for you:

- **Do not copy files in from the editing copy on your own.** Promotion is the owner's
  decision. Edit here only when the task is explicitly about this repo.
- Never commit `writingroom/data/`, `writingroom/inc/database.php`, `.env`, tokens,
  drafts, backups or test output (`writingroom/.gitignore` covers most of these).
- `.github/workflows/main.yml` runs on every push to `main`: it checks that no private files
  are tracked, strips docs/Python/tests/local state, and force-rebuilds the `hostinger` branch.
- The Writing Room writes site files in place — online on the server, locally in this folder.
  That is intended. Server-side edits are the newest version of those files; do not overwrite
  them with an older copy from Git.

## Contents

- `index.html` — the "Event Horizon" landing page (countdown to 20 March 2027, 20:25 UTC).
  Inline CSS/JS, theme stored in `localStorage` key `sc-theme`.
- `app.js`, `styles.css` — the site application and stylesheet.
- `content.js`, `collections.js`, `sections.js`, `pages.js`, `documents.js` — site data
  (see below).
- `assets/` — self-hosted fonts, `hero.jpg`, `mark.svg`, the opening `.ics`, `cover.*`, and
  vendored KaTeX. Every file `index.html` references is present (checked 2026-09-25).
- `writingroom/` — the Writing Room, a visual editor for the site's articles and page text.
  Its `README.md` is the user-facing manual; read it before changing behaviour.

## Writing Room architecture

Two independent back ends share one browser UI (`public/index.html`, `room.js`, `room.css`)
and edit the same site data files:

- `content.js` (`window.SC_CONTENT`) — articles
- `collections.js` (`window.SC_COLLECTIONS`), `sections.js` (`window.SC_SECTIONS`)
- `pages.js` (`window.SC_PAGES`) — main page text
- `documents/*.html` → `documents.js` (the Protocol; rebuilt, never hand-edited)

**Local (Python, stdlib only, 3.11+)** — `server.py` + `site_pages.py`.
Editor on `127.0.0.1:8765`, read-only website preview on `127.0.0.1:8766`. Started by
`Start-WritingRoom.cmd` → `Start-WritingRoom.ps1`. Drafts and backups go in
`writingroom/data/`. The website directory defaults to the folder above `writingroom/` if it
has `content.js`, else `../science-coherence-website`; override with `--website`.

**Online (PHP 8 + MySQL, Hostinger)** — `index.php`, `api.php`, `login.php`, `logout.php`,
`setup.php`, `inc/*.php`, `schema.sql`. Authenticates against the blog's existing `users`
table (admins only) and creates four `sc_wr_*` tables. DB config is found via
`SC_WRITING_ROOM_DB_CONFIG`, `SC_BLOG_DB_CONFIG`, or `.private/science-coherence-blog/database.php`
outside the web root; the file defines `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` (and
optionally `SC_GITHUB_TOKEN`). There is deliberately no template in the repo. Site files are located by
`wr_site_root()` / `wr_find_site_file()` in `inc/articles.php`; `SC_WEBSITE_DIR` overrides.
`writingroom/pages.js` is a bundled fallback used only when the site has no `pages.js`.
`default.php` is Hostinger's stock placeholder page.

**Keep the two back ends in step.** The same actions exist on both sides
(`draft`, `apply`, `discard`, `collection-create`, `collection-rename`, `page-save`; PHP also
has `page-apply`), with matching validation, conflict detection by SHA-256 revision, exact
backups before writes, and atomic temp-file-then-rename writes. A behaviour change in
`server.py`/`site_pages.py` usually needs its counterpart in `inc/articles.php`/`inc/pages.php`.

**`ROOM_VERSION`** in `server.py` must be bumped whenever the page depends on a changed
local API; the launcher reads it to replace a stale background service.

`.htaccess` blocks `.py/.md/.sql/.ps1/.cmd/.json` and `inc/`, `tests/`, `data/` from the web.
Keep it that way when adding files.

## GitHub sync (online edits → GitHub → this computer)

- `writingroom/inc/github.php` — after every online write (`api.php`, all actions except
  `draft`/`discard`), commits the changed site files to `main` via the GitHub Git Data API.
  Three-way check per file by git blob SHA (server / GitHub / stored baseline in
  `sc_wr_github_files`): server-only changes are sent, GitHub-only changes are left for the
  deployment, both-changed files are never sent automatically. Tables are created lazily and
  the SQL is kept SQLite-compatible for the tests. It must never throw into the save path:
  the website change has already happened.
- `writingroom/github.php` — admin page: per-file state, first-run and conflict resolution
  ("send the website's versions", i.e. `wr_github_sync(..., sendServerVersions: true)`).
- Token: `SC_GITHUB_TOKEN` in the private DB config (or `SC_WRITING_ROOM_GITHUB_TOKEN` env).
  `SC_WRITING_ROOM_GITHUB_API` exists only so the tests can point at a fake GitHub.
- `tools/Sync-FromGitHub.ps1` (Windows PowerShell 5.1, ASCII only) — fast-forward-only pull of
  this repo, then mirrors the same site files into the editing copy `..\` only where that copy
  still has the previous version. `tools/Install-SyncTask.ps1` registers it as a scheduled task.
- If you add a file the room writes, add it to both `wr_github_tracked_files()` and
  `$siteFilePattern` in the sync script.

## Commands

Run from `writingroom/`:

```
python -m unittest discover -s tests -v
node --check public/room.js
python server.py --website PATH --data PATH --port 8875 --preview-port 8876   # isolated copy
```

Never point write tests or API experiments at the real website or at ports 8765/8766.

Known test state (checked 2026-09-25): 41 tests, all pass. The page/Protocol tests need
`tools/build-documents.py` at the repo root (loaded via `site_pages.load_builder()`).
`tests/test_github_sync.py` (8 tests) runs the PHP sync code and is skipped unless PHP 8.1+
with curl and pdo_sqlite is on PATH or set in `PHP_BINARY`. The rest of the PHP has no tests.
