Here's the plan.

---

## Repository structure

```
thanhpp.github.io/
├── hugo.yaml                  # Site config + intro data
├── content/
│   └── _index.md              # Homepage (empty body, front matter only)
├── data/
│   ├── main_quests.yaml       # Array of main quest cards
│   └── side_quests.yaml       # Array of side quest items
├── layouts/
│   ├── _default/
│   │   └── baseof.html        # <html>, <head>, font imports, CSS, JS
│   └── index.html             # Homepage template (extends baseof)
├── static/
│   └── css/
│       └── style.css          # All styles from the mockup
│   └── js/
│       └── filter.js          # Side quest tag filtering logic
├── .github/
│   └── workflows/
│       └── deploy.yaml        # GitHub Actions: hugo build → gh-pages
└── .gitignore
```

---

## Data design

**`hugo.yaml`** — site-level config + intro section params:

```yaml
params:
  intro:
    avatar: "T"
    name: "thanhpp"
    role: "Software engineer"
    link:
      url: "https://github.com/thanhpp"
      label: "github.com/thanhpp"
```

**`data/main_quests.yaml`** — each card as a list item:

```yaml
- type: "Work"
  title: "Backend Engineer @ Company"
  subtitle: "Building scalable services"
  bullets:
    - "Microservices architecture"
    - "High-throughput data pipelines"
    - "API design & observability"
```

**`data/side_quests.yaml`** — each item with tag, progress, checklist:

```yaml
- title: "Learn Rust"
  tag: "learn" # maps to CSS class + filter
  label: "Learning" # display text
  percent: 60
  checklist:
    - { text: "Ownership", done: true }
    - { text: "Traits", done: true }
    - { text: "Async", done: false }
```

---

## Templates

**`layouts/_default/baseof.html`** — skeleton with Google Fonts link, `style.css`, and `filter.js` at the bottom. Defines `{{ block "main" . }}`.

**`layouts/index.html`** — three sections, all data-driven:

1. **Intro** — reads from `site.Params.intro`, renders avatar circle, name, role, link.
2. **Main quests** — `{{ range site.Data.main_quests }}`, renders the 2-column grid of `mq-card` divs.
3. **Side quests** — renders filter buttons by collecting unique tags from the data (`{{ $tags := slice }}`), then `{{ range site.Data.side_quests }}` for each item card with `data-tag` attribute for JS filtering.

---

## JS filtering (`static/js/filter.js`)

Short vanilla JS: on button click, read `data-tag` from each `.sq-item`, toggle `display: none` vs visible. "All" button shows everything. Toggles `.active` class on buttons.

---

## GitHub Actions deploy (`deploy.yaml`)

Standard workflow: checkout → setup Hugo (extended) → `hugo --minify` → deploy `public/` to `gh-pages` branch. Triggered on push to `main`.

---

## Build steps (in order)

1. `hugo new site thanhpp.github.io --format yaml` — scaffold
2. Delete unused dirs (`archetypes/`, `themes/`)
3. Create the data YAML files with real content
4. Port the mockup's CSS into `static/css/style.css`
5. Build `baseof.html` + `index.html` templates
6. Write `filter.js`
7. Add the GitHub Actions workflow
8. `hugo server` to verify locally
9. Push → Actions deploys to Pages

---
