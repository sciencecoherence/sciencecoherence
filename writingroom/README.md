# The Writing Room

A visual editor for Science Coherence's articles. It can run locally on this computer and as a private, authenticated editor on the same PHP/MySQL hosting as the website.

## Open the room

Double-click **Start-WritingRoom.cmd** in this folder. It starts the local service and opens **http://127.0.0.1:8765/**. Opening it again reuses the running service when it is the current version; an older Writing Room still running in the background is stopped and replaced automatically. Restart it after restarting the computer.

Opening `public/index.html` directly from disk acts as a launch page. If the local service is already running, it redirects to the working room automatically; otherwise it explains that `Start-WritingRoom.cmd` must be opened first. A browser cannot safely write `content.js` from a `file:///` page.

The launcher uses the Python runtime already available through Codex, or an installed Python 3.11+. There is no package installation or build step. Closing the browser does not stop the local service; it ends when you sign out or restart. To run it in a terminal instead, use `python server.py` and stop with Ctrl+C.

## Write and save

1. Choose an article in the left-hand library, or choose **New article**.
2. Edit the title, summary, and body directly. Expand **Article details** for its collection, type, date, and address. Existing article addresses are fixed to preserve links.
3. Use the toolbar for bold, italic, headings, quotes, lists, and links. Pasted text arrives without formatting. Equations use `$…$` or `$$…$$` and render in the preview. Interactive blocks are protected from text editing and preserved when saving. The preview shows the reading layout; use the website preview to operate instruments.
4. **Save draft** (Ctrl+S / Cmd+S) stores a private draft in this folder. Saving is manual. The page warns before you leave unsaved changes. Drafts survive browser and computer restarts.
5. **Update local website** asks you to confirm, creates an exact backup of the current article file, and updates the local website. **View website** opens the full website preview at **http://127.0.0.1:8766/**. Refresh an already-open preview after an update.

## Sections, collections and types

Each article is filed in two places and described by a type, exactly as on the website:

- **Section**: where it lives on the site, such as Research, The Lab or Transmissions (`sections.js`). A section's texts are edited under Pages; its address and flags by hand.
- **Collection**: a named group inside a section. For Research these are 01 Framework, 02 Philosophy, 03 Meta-Mathematics, 04 Biophysic and 05 Notes & Methods (`collections.js`).
- **Type**: what kind of piece it is, such as Research article, Collection introduction or Transmission. The Library on the website classifies by it.

Under **Article details**, the **Collection** menu lists Research's collections and, below them, the sections that have none (The Lab, Transmissions…). Choosing one files the article there. **Type** suggests the types already in use. A section that has collections needs one chosen before the article can be saved, and a type is needed before updating the website.

The library on the left groups all writing by collection. Its menu shows one collection or section at a time, and **＋ New article** starts a new piece in the collection being shown.

**＋ New collection** adds a collection to a section, numbered after that section's last one, and files the open article under it. **Rename collection** changes the name or description of the selected one. Both write the website's `collections.js` at once, after an exact backup, and refuse to overwrite a change made in another window. A collection's address, number and section stay fixed so links keep working. Renumbering, moving and deleting are done by editing `collections.js`.

## The main pages

Choose **Pages** at the top of the library to edit the text of the Home page, Research, The Protocol, The Lab, Transmissions, the Library, About, Editorial principles and Privacy. Each page appears as its parts — Opening, features, cards, closing banner — with every text labelled. Click a text to change it. Short texts take bold, italic and links, and the longer ones also take headings, lists and quotes. **View page** opens it on the local website, and **Update local website** puts the changes there.

Research shows its introduction and each collection's name, description and small line. The Protocol shows its title, notes, key figures and each section; a section's text opens when you unfold it. In the Protocol's text the working parts — controls, the dose scaler, live values, the lexicon list — are locked and preserved, and the rest can be edited.

Only changed texts are sent. An exact backup of every file involved is kept first (`pages.js`, `sections.js`, `collections.js`, the Protocol's source and `documents.js`), and nothing is written if one of those files changed since the page was opened. Layout, links, the top menu and footer, and the Protocol's lexicon entries are not edited here.

The local room never uploads anything to the hosting server. Hidden website collections remain hidden according to the website's existing settings. The editor does not change navigation or section visibility.

## Use the room online

The online entry point is `writing-room/index.php`. It uses the blog's existing MySQL `users` table, password hashes, and administrator flag, so the same administrator username/email and password open both systems. Non-administrators cannot enter the Writing Room.

On first use, log in and choose **Connect database**. This creates only four namespaced tables in that same database:

- `sc_wr_articles` records the published article versions.
- `sc_wr_drafts` stores private drafts per administrator.
- `sc_wr_revisions` retains each prior version when an article is published.
- `sc_wr_collections` records the latest version of each collection created or renamed online.

An installation connected before collections existed is sent back to **Connect database** once, which adds the fourth table and leaves the others as they are.

The setup does not add, remove, or modify blog users. **Save draft** keeps an unpublished draft in MySQL, so it follows the account across a computer and phone. **Publish website** safely rewrites the website's `content.js` in the deployed website folder and records the former article in the revision table. This requires PHP to have write access to the folder containing `content.js`.

The online code loads the database settings from the same private configuration used by the blog. By default it looks outside the public web root at `.private/science-coherence-blog/database.php`. `SC_WRITING_ROOM_DB_CONFIG` can point to a different private configuration file when the same database should be accessed with a more restricted SQL login; `SC_BLOG_DB_CONFIG` remains a fallback. No database password belongs in this repository or public directory.

Serve the website through HTTPS and deploy the whole website project into one writable PHP-capable document root. The static website and `writing-room/` must remain together because publishing updates the parent `content.js`. The checked-in `.htaccess` blocks the local Python service, tests, drafts, backups, setup SQL, and documentation from direct web access.

Online edits change the deployed site files directly. When GitHub sync is set up, each one is also committed to GitHub and brought down to this computer.

## GitHub sync

Every article, page or collection published online is committed to the `main` branch of `sciencecoherence/sciencecoherence.com`, as one commit per publish, with the administrator's name in the message. The files covered are the ones the room writes: `content.js`, `collections.js`, `sections.js`, `pages.js`, `documents.js`, `documents/*.html` and `index.html`.

Each file is compared on the server, on GitHub, and against the last version the two agreed on:

- **Changed only on the server** — committed.
- **Changed only on GitHub** (you pushed from your computer and it has not been deployed yet) — left alone; the deployment brings it.
- **Changed on both** — not sent. The room says so, and **GitHub sync** (at the top of the room, `github.php`) shows every file's state and offers **Send the website's versions to GitHub**. GitHub's version stays in its history.

If GitHub cannot be reached, the website change still stands. The room says it is not yet on GitHub and tries again when it is next opened.

**Set it up once:**

1. On GitHub: *Settings → Developer settings → Fine-grained tokens → Generate new token*. Repository access: only `sciencecoherence/sciencecoherence.com`. Permissions: *Contents: Read and write*. Choose an expiry and note the date.
2. On the server, add `const SC_GITHUB_TOKEN = '…';` to the private database configuration file on the server, the one that already defines `DB_PASS` (normally `.private/science-coherence-blog/database.php`, above `public_html`). Never put it in this repository.
3. Open **GitHub sync** in the online room. The first time, files already changed online show as changed on both sides; check the list and choose **Send the website's versions to GitHub**. Later publishes need nothing.
4. On this computer, after committing and pushing this folder, run once:
   `powershell -ExecutionPolicy Bypass -File tools\Install-SyncTask.ps1`

The scheduled task runs `tools\Sync-FromGitHub.ps1` at logon and every 10 minutes. It fast-forwards this folder to GitHub (it never merges over your own unpushed work) and copies the same site files into the editing copy one folder up, but only files you have not changed there since the last sync; those are listed in a notification instead. The log is `%LOCALAPPDATA%\ScienceCoherence\sync.log`. `Install-SyncTask.ps1 -Uninstall` removes the task.

Each commit to `main` also runs the Hostinger workflow. The release it builds contains the same files the server already has.

## What it edits

- Article source: `C:\cohera\sciencecoherence.com\content.js`.
- Collections: `C:\cohera\sciencecoherence.com\collections.js`.
- Page texts: `pages.js`; section texts in `sections.js`; the Protocol in `documents\holographic-repolymerization.html`, from which `documents.js` is rebuilt.
- Private drafts: `C:\cohera\sciencecoherence.com\writingroom\data\drafts.json`.
- Backups: `C:\cohera\sciencecoherence.com\writingroom\data\backups\` (timestamped `.js` files before article updates, `.collections.js` files before collection changes).
- Other article fields, including source download links and custom properties, are retained. Search text and reading estimates are refreshed for changed writing.
- The separately authored Protocol in `documents/` and the blog are outside this editor's current scope.

Back up the Writing Room's `data` folder with the rest of your project. To restore a website backup, stop editing, keep a copy of the current `content.js`, then copy the selected backup over the website's `content.js`. Each backup contains **all articles**, so restoring one returns every article to that saved state. Reload the room afterward; drafts based on a different article version will be blocked from overwriting it.

When another window changes a draft, or an external editor changes the same website article, saving stops with a conflict message. Keep the current page open and copy any unsaved writing before reloading to compare versions. Other articles' external changes are preserved automatically.

## Security

The local service binds to `127.0.0.1`, checks its Host header, and requires the editor's origin and a per-session token for write requests. The website preview runs on a separate origin with no write API. Only explicit public assets are served; drafts, backups, private project files, and application source are not served. Draft and preview article HTML use script-disabled sandboxed frames.

The online editor uses a separate strict session cookie, the blog's existing password hashes, administrator-only authorization, per-session request tokens, same-origin checks, request-size limits, security headers, and server-side article validation. Its dedicated tables reference the existing `users` table. The local `data` folder is denied by `.htaccess` and should still be omitted from deployment where possible.

## Development checks

`python -m unittest discover -s tests -v`

The GitHub sync tests (`tests/test_github_sync.py`) run the PHP code against a fake GitHub and SQLite. They are skipped unless PHP 8.1+ with the curl and pdo_sqlite extensions is on the PATH or named by `PHP_BINARY`.

`node --check public/room.js`

Use `python server.py --website PATH --data PATH --port 8875 --preview-port 8876` for an isolated test copy. Do not run write tests against the real website. The tests exercise draft persistence, exact backups, field preservation, conflicts, new articles, no-op saves, collection creation and renaming, filing rules for sections and collections, and HTTP access boundaries. The page recognises the local service only at port 8765, so use the isolated ports for the tests and API checks, not for trying the page itself.
