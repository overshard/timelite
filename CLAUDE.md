# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Timelite is a progressive web app for casual time tracking. All data is stored locally in the browser using localForage (IndexedDB) — there is no backend or database. It works offline.

## Commands

- `bun install` — install dependencies
- `bun start` — run dev server on port 8000
- `bun run next:build` — production build
- `docker-compose up -d --build` — build and run via Docker

There are no tests or linting configured in this project.

## Architecture

**Framework:** Next.js (Pages Router) with React. Plain JavaScript (no TypeScript).

**State management:** Single React Context + useReducer pattern in `components/context.js`. All app state (timer, log entries, notes, language) lives here and is persisted to localForage on every reducer action. The reducer handles actions like ADD_LOG, EDIT_LOG, REMOVE_LOG, NEW_TIMER, etc.

**Pages** (`pages/`): index (timer), log, summary, about. `_app.js` wraps everything with ContextProvider, HotKeysMapping, L10n, Sidebar, and page transitions.

**Localization** (`l10n/`): Uses react-localization. Each component/page has a corresponding l10n file with strings for en, jp, and pl.

**Styling:** CSS Modules (`styles/components/` and `styles/pages/`) plus a global stylesheet. Theme colors defined in `site.config.js`.

**Key libraries:** chart.js (summary charts), react-hook-form (entry editing), react-hotkeys (keyboard shortcuts), react-csv (export), react-toastify (notifications), uuid (entry IDs).

**Log entries** have: id, start, end, note, and tags (extracted from #hashtags in the note text).
