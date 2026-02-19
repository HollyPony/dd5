# DD5

Character sheet **creator/editor for D&D 5e 2024** as a browser-only web app, built with **Web Components** and local persistence.

## Project status

The project is active and currently focused on reaching a complete playable sheet MVP for levels 1-20.

Detailed roadmap: [`ROADMAP.md`](ROADMAP.md)

## Available features

- Web Components architecture (modular UI)
- i18n
- Local character persistence (autosave, create/load, JSON import/export)
- Core creation selectors: origin, class, subclass, species
- Structured 2024 data packs (classes, origins, species, feats, equipment, spells)

## Current limitations

- `WeaponsCantrip` and `Feats` are still incomplete
- `CharacterProfile`, `Spellbook`, `Backpack`, and `Currency` are still only partially connected to state/storage
- Inventory/equipment flow is not fully finalized
- Part of 2024 rules effects are still TODO in data packs

Details and priorities: [`ROADMAP.md`](ROADMAP.md)

## Run locally

No build step is required.

1. Serve the folder over HTTP (do not open `index.html` directly with `file://`).
2. Open the app in your browser.

Personnaly using the Live Preview from microsoft extension in VSCode.

Then open: `http://localhost:3000`

## Deployment

GitHub Pages deployment is configured via:

- [`.github/workflows/gh-pages.yml`](.github/workflows/gh-pages.yml)

The workflow generates `modules/env.js` at publish time.

## Quick structure

- `index.html` / `index.js`: app bootstrap
- `index.webmodules.js`: Web Components registration
- `webComponents/`: UI components
- `modules/stores/`: state (authority + derived)
- `modules/services/`: business logic
- `modules/data/`: D&D 5e 2024 data packs
- `modules/storages/`: local persistence
- `i18n/`: translations

## Technical principles

- Browser-only target
- Fail-fast oriented
- Centralized error handling in `modules/errors.js` for UI displays
- Mobile-first UX

## Links

- Repository: <https://github.com/HollyPony/dd5>
- Other apps: <https://hollypony.github.io>
