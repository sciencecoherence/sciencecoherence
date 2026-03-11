# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Active project

All current work lives in **`portal/`**. The root-level files are legacy drafts; ignore them unless explicitly asked.

## Portal structure

```
portal/
├── index.html              # Portal landing page
├── router.js               # Mobile/desktop routing (injected in every page <head>)
├── main-project/           # Primary site: Cosmos · Ethos · Regenesis
│   ├── index.html / cosmos.html / ethos.html / regenesis.html / retreat.html
│   ├── mobile/             # Mobile variants of every page
│   ├── copy/               # Draft copies
│   └── new-design/         # Design explorations
├── ethos-project/          # Standalone Ethos branch
│   ├── *.html
│   └── mobile/
├── tcb-project/            # Time-Crystalline Biology standalone
│   ├── *.html
│   └── mobile/
└── agents-app/             # Node.js content-generation backend
    ├── server.js
    ├── agents.js
    ├── public/             # Frontend UI for agent dashboard
    └── output/             # Generated content (auto-created)
```

## Running the agents app

```bash
cd portal/agents-app
npm install          # first time only
npm run dev          # node --watch server.js (auto-restarts)
npm start            # production
```

Runs on **port 3000**. Requires `OPENAI_API_KEY` in a `.env` file at `portal/agents-app/.env`.

## Mobile routing

`router.js` is a IIFE included at the top of every page `<head>`. It detects mobile and redirects:
- `/portal/main-project/cosmos.html` → `/portal/main-project/mobile/cosmos.html`
- Reverse redirect also handled (mobile → desktop when on wide screen)
- Override via `localStorage.setItem('sci-coh-layout', 'desktop' | 'mobile')`

When adding a new page, always create both the desktop and `mobile/` variant and include `<script src="/router.js"></script>` as the first script in `<head>`.

## Static HTML conventions

- No build step — edit HTML/CSS directly, refresh browser.
- CSS is **inline per-file** (`<style>` blocks). There is no shared stylesheet in `portal/`.
- Design tokens are defined in each file's `:root {}` block — match the tokens already in the file you're editing.

### Three-pillar color identities (main-project)

| Pillar | Color | Token |
|---|---|---|
| Regenesis | Green | `--regenesis: #72a862` |
| Cosmos | Cerulean/Blue | `--cosmos: #5a84b8` |
| Ethos | Gold/Amber | `--ethos: #b89050` |

### Typography (main-project & portal index)

Google Fonts loaded in each file's `<head>`:
- `Playfair Display` — display headings (`--font-display`)
- `Cinzel` — labels/eyebrows (`--font-label`)
- `Jost` — body text (`--font-body`)

The portal `index.html` uses `Cormorant Garamond` instead of Playfair Display.

## Project context

`portal/CLAUDE.md` contains the project's philosophical framework (Time-Crystalline Biology, three-pillar model, content philosophy). Read it for domain context when writing or editing content pages.
