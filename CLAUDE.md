# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal GitHub Page built with **Hugo** (extended edition required). No theme — custom layouts only. Single-page site with two tabs: "Quests" (a resume/portfolio rendered from YAML data) and "Film Recipe" (a client-side Fujifilm recipe-card image generator).

## Commands

```bash
hugo server          # local dev at http://localhost:1313 (live reload)
hugo --minify        # production build into public/ (what CI runs)
```

There are no tests, linters, or a package manager. Hugo is the only build tool. Install with `go install github.com/gohugoio/hugo@latest` (extended edition).

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yaml`: it builds with `hugo --minify` and force-pushes `public/` to the `gh-pages` branch, which GitHub Pages serves. Note: `public/` is committed in the repo but the deployed copy always comes from a fresh CI build, so don't hand-edit `public/`.

## Architecture

The site renders from a small set of files — understand these and you understand the whole site:

- **`hugo.yaml`** — site config plus the `params.intro` block (avatar, name, role, link) shown at the top of the page. If `avatar` starts with `http` it renders as an `<img>`, otherwise as literal text (e.g. an emoji).
- **`data/main_quests.yaml`** / **`data/side_quests.yaml`** — the content of the Quests tab. `layouts/index.html` ranges over `hugo.Data.main_quests` and `hugo.Data.side_quests` to build cards. Side-quest tags are collected dynamically into filter buttons, and progress is auto-computed from each item's `checklist` (`done: true`/`false`).
- **`layouts/_default/baseof.html`** — the only base template: loads fonts, `/css/style.css`, and both JS files (`filter.js`, `recipe.js`).
- **`layouts/index.html`** — the single page. Defines the tab nav, the quests pane markup, and the film-recipe pane skeleton (`#recipe-canvas`, `#recipe-form` — form fields are injected by JS, not templated).

CSS lives in `static/css/style.css`. Client JS lives in `static/js/`. Hugo copies `static/` to the site root, so `/css/...` and `/js/...` resolve at runtime.

### JavaScript

- **`static/js/filter.js`** — tiny; wires the side-quest tag buttons to show/hide `.sq-item` elements.
- **`static/js/recipe.js`** — the bulk of the interactivity (~1100 lines), all vanilla JS, no dependencies. Three top-level parts:
  - `parseExif(ab)` — a hand-rolled EXIF/TIFF reader over an `ArrayBuffer`, including a Fujifilm MakerNote parser (`parseFujiMakerNote`, EXIF sub-IFD tag `0x927C`) that extracts film-recipe settings.
  - `exifToRecipeFields(exif)` — maps raw EXIF/MakerNote values to the recipe form fields (film simulation, saturation→B&W/color options, etc.).
  - `main()` — the UI: a `FIELDS` array defines every recipe parameter (Fujifilm settings like Film Simulation, White Balance, Dynamic Range, Highlight/Shadow, Grain, etc.), renders the form, draws the recipe card onto `<canvas>`, supports upload/drag-drop, 2K export, per-field hide toggles, and persists photo + values to `localStorage` (`fuji_recipe_photo`, `fuji_recipe_data`).

When adding or changing a recipe parameter, edit the `FIELDS` array in `main()`; signed numeric fields (that show a leading `+`/`-`) are listed in `SIGNED_FIELD_IDS`.

## Conventions

- Commit messages use gitmoji + conventional-commit prefixes (e.g. `feat: ✨ ...`, `docs: 📝 ...`, `refactor: ♻️ ...`).
- Design mockups and plans live in `artifacts/` and `.claude/plans/`; they are references, not part of the build.
