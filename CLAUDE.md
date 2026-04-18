# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Timelite is a browser-based app for casual time tracking. All data is stored locally in the browser using localForage (IndexedDB) — there is no backend or database. Once loaded, the app works offline. It is not installable as a PWA: the service worker and `next-pwa` integration were removed; the `manifest.json` is retained for icon/theme metadata only, and any previously registered service worker is unregistered on load.

## Commands

- `bun install` — install dependencies
- `bun start` — run dev server on port 8000
- `bun run next:build` — production build
- `docker-compose up -d --build` — build and run via Docker

There are no tests or linting configured in this project.

## Architecture

**Framework:** Next.js (Pages Router) with React. Plain JavaScript (no TypeScript).

**State management:** Single React Context + useReducer pattern in `components/context.js`. All app state (timer, pause state, log entries, note draft, language, selection, edit mode) lives here and is persisted to localForage on every reducer action. Actions include `ADD_LOG`, `ADD_MANUAL_LOG`, `IMPORT_LOG`, `EDIT_LOG`, `REMOVE_LOG`, `CLEAR_LOG`, `CLEAR_TAG`, `NEW_TIMER`, `PAUSE_TIMER`, `RESUME_TIMER`, `NOTE_UPDATED`, `SET_LANGUAGE`, `NEXT_LOG_ITEM`, `PREVIOUS_LOG_ITEM`, `SELECT_LOG_ITEM`, `TOGGLE_EDITION`, `LOCALDATA_READY`.

**Pages** (`pages/`): index (timer), log, summary, about. `_app.js` wraps everything with `ContextProvider`, `HotKeysMapping`, `ToastContainer`, and `Sidebar`, plus route-level page transitions via `react-transition-group`. `L10n` (language picker) is only rendered on the About page, not globally.

**Components** (`components/`):
- `timer.js` — timer display + note input + reset/pause/add buttons
- `entry.js` — one log row, inline-editable via `react-hook-form`
- `newEntryForm.js` — manual entry form with datetime-local inputs
- `tagNoteInput.js` — text input with `#tag` autocomplete dropdown
- `sidebar.js` — left nav with brand mark + page icons
- `HotKeysMapping.js` — global hotkey handlers via `react-hotkeys`
- `keyHelpOverlay.js` — `?` shortcut cheat-sheet modal
- `l10n.js` — language `<select>` (used on About page)
- `page.js` — shared `<Head>` + page wrapper

**Localization** (`l10n/`): Uses `react-localization`. Each component/page has a corresponding l10n file with strings for en, jp, and pl.

**Styling:** CSS Modules in `styles/components/` and `styles/pages/`. Global styles and the full theme (CSS custom properties, palette, transitions, toast overrides) live in `styles/globals.css`.

**Import/export** (`utils/importExport.js`): CSV, JSON, and Markdown export; CSV/JSON import with de-duplication and tag re-extraction. CSV cells are prefixed with `'` when they start with `=+-@` to neutralize formula-injection in spreadsheets.

**IDs:** `crypto.randomUUID()` with a `Date.now()`-based fallback for environments without it (see `newId` in `context.js`).

**Key libraries:** `chart.js` (summary charts), `react-hook-form` (entry editing), `react-hotkeys` (keyboard shortcuts), `react-csv` (CSV export), `react-toastify` (notifications), `react-transition-group` (page + entry transitions), `localforage` (IndexedDB persistence), `prop-types` (runtime prop checks).

**Log entries** have: `id`, `start`, `end`, `note`, and `tags` (lowercased `#hashtag` words extracted from the note text).
