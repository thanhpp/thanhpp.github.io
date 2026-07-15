# Film Recipe Card Tab — Implementation Plan

> **For any agent or human:** This plan is self-contained; execute tasks in order.

**Goal:** Add a second tab to the site's main page that lets a visitor upload a photo, fill in Fujifilm X‑T20 film‑recipe settings (with a custom recipe name), and download a savable PNG of a glassmorphism "film recipe card" whose orientation follows the uploaded photo.

**Context:** The site owner mocked up a "Film Recipe Card" in Claude Design (glassmorphism: blurred photo backdrop, frosted‑glass setting boxes over a photo frame) and wants it built into this Hugo site. Everything must run client‑side because the site is served as static files on GitHub Pages — no server, no build‑time data. The card is a self‑contained image the visitor generates and saves.

**Site conditions:**

- **Hugo static site.** Source of truth: `layouts/` (templates) + `static/` (assets copied verbatim to the site root). `public/` is the built output — do **not** edit it; `hugo` regenerates it, and the deploy workflow `.github/workflows/deploy.yaml` rebuilds fresh with `hugo --minify` on push to `master`.
- **Single page, no tabs today.** `layouts/index.html` renders, in order: an `.intro` block (avatar/name/link), a "Main Quests" grid, and a "Side Quests" filterable list. There is no tab UI.
- **Scripts are hardcoded, not auto‑discovered.** `layouts/_default/baseof.html` loads exactly two things: `/css/style.css` and `/js/filter.js`. A new JS file will **not** run unless it is added there.
- **`static/js/filter.js`** handles the Side‑Quests filter buttons (class `.tag-btn`). Do not reuse or overload that class for tabs.
- **Existing aesthetic is pixel/terminal:** dark bg `#0f0f12`, card bg `#1a1a20`, green accent `#5dbd7a`, `border-radius: 0`, DM Sans font, a fixed scanline overlay (`body::after`), CSS variables defined in `:root` at the top of `static/css/style.css`.
- **Deliberate aesthetic split:** the tab chrome and the editor form match the site's pixel/terminal style. The generated card matches the wireframe's glassmorphism (rounded corners, blur, system font, white‑on‑photo). This split is intentional — the card is meant to look like the Fujifilm mock, not the site.
- **Design source read in full:** `/home/thanhpp/Downloads/film_recipe_design/responsive-wireframe-design-adjustments/project/Film Recipe Card.dc.html`. It runs on a custom `x-dc`/`sc-if`/`sc-for` framework (`support.js`) that is **not reusable**; only its plain logic and inline style values are reused, reimplemented in vanilla JS/Canvas. Exact style values from that file are inlined in Task 3 below so the executor does not need the file.

**Key rendering decision (do not substitute a library):** The card's look depends on `backdrop-filter: blur()` glassmorphism. DOM‑screenshot libraries (`html2canvas`, `dom-to-image`, `html-to-image`) silently drop `backdrop-filter` and hit canvas‑taint/CORS problems, and the project rule is to prefer built‑ins over external deps. Therefore the card is drawn with **one manual Canvas 2D renderer that is both the on‑page preview and the export** — no DOM screenshot, no library, no preview/export drift.

**Output when complete:**

- A "Film Recipe" tab on the main page, alongside a "Quests" tab holding the existing content.
- In that tab: a photo uploader (button + drag‑and‑drop), a recipe‑name field, form controls for the X‑T20 settings, a live `<canvas>` preview of the card, and a "Generate & Save" button that downloads a PNG.
- The card orientation follows the photo (landscape photo → photo‑on‑top layout; portrait photo → photo‑left layout). Empty settings are omitted from the card. Photo and settings persist across reloads via `localStorage`.

---

## Task 1: Add the tab structure and the recipe‑tab shell to the main page

**Files:**

- Modify: `layouts/index.html`

**Precondition:** None.

1. Keep the existing `.intro` block (lines rendering avatar/name/role/link) exactly as‑is at the top of the `{{ define "main" }}` block — it is shared chrome above both tabs. Do not modify it.

2. Immediately after the `.intro` `</div>`, insert a tab navigation bar:

   ```html
   <div class="tab-nav">
       <button class="tab-link active" data-pane="pane-quests">Quests</button>
       <button class="tab-link" data-pane="pane-recipe">Film Recipe</button>
   </div>
   ```

   Use the class names `tab-nav` / `tab-link` (not `tag-btn`, which is owned by `filter.js`).

3. Wrap **all** the current post‑intro content (the `<div class="section-label">Main Quests</div>` through the closing `</div>` of `.sq-list`) in a pane wrapper that is active by default:

   ```html
   <div id="pane-quests" class="tab-pane active">
       <!-- existing Main Quests + Side Quests markup, unchanged -->
   </div>
   ```

   Move nothing else; only add the wrapper open tag before "Main Quests" and the close tag after `.sq-list`.

4. After the quests pane, add the recipe pane shell. JavaScript (Task 4) populates the form and drives the canvas; this markup only provides the containers and static buttons:

   ```html
   <div id="pane-recipe" class="tab-pane">
       <div class="section-label">Film Recipe Generator</div>

       <div class="recipe-actions">
           <button type="button" id="recipe-upload-btn" class="recipe-btn">Upload Photo</button>
           <button type="button" id="recipe-save-btn" class="recipe-btn recipe-btn-primary">Generate &amp; Save</button>
           <input type="file" id="recipe-file" accept="image/*" hidden>
       </div>

       <div id="recipe-preview-wrap" class="recipe-preview-wrap">
           <canvas id="recipe-canvas" class="recipe-canvas"></canvas>
           <div id="recipe-drop-hint" class="recipe-drop-hint">Click "Upload Photo" or drop an image here</div>
       </div>

       <div class="recipe-form" id="recipe-form">
           <!-- fields injected by static/js/recipe.js -->
       </div>
   </div>
   ```

5. Do not add any `<script>` here (scripts are centralized in `baseof.html`, handled in Task 2).

**Edge cases:** The quests pane must carry `active`; the recipe pane must not, so the page opens on Quests exactly as it does today.

---

## Task 2: Load the recipe script site‑wide

**Files:**

- Modify: `layouts/_default/baseof.html`

**Precondition:** None (independent of Task 1; both edit different files).

1. In `layouts/_default/baseof.html`, directly after the existing line `<script src="/js/filter.js"></script>`, add:

   ```html
   <script src="/js/recipe.js"></script>
   ```

   `recipe.js` (created in Task 4) contains its own DOM‑ready guard, so load order relative to `filter.js` does not matter, and it is inert on any page without the `#recipe-canvas` element.

---

## Task 3: Add CSS for the tabs, editor form, and preview

**Files:**

- Modify: `static/css/style.css`

**Reuses:** The `:root` CSS variables already defined at the top of `static/css/style.css` (`--card-bg`, `--text`, `--text-muted`, `--text-hint`, `--accent`, `--accent-light`, `--border`). Reference them; do not redefine them.

**Precondition:** None (Task 1 markup is not required to be present to add CSS, but the classes must match Task 1's names exactly).

1. Append the following blocks to the **end** of `static/css/style.css`. All UI chrome here follows the site's pixel/terminal aesthetic (0 radius, green accent, existing variables). The glass card itself is drawn on canvas, not styled here.

2. **Tab navigation** (mirror the look of the existing `.tag-btn` states but with distinct classes):

   ```css
   .tab-nav {
       display: flex;
       gap: 6px;
       margin-bottom: 1.75rem;
   }
   .tab-link {
       font-family: 'DM Sans', sans-serif;
       font-size: 13px;
       padding: 6px 16px;
       border: 1px solid var(--border);
       background: var(--card-bg);
       color: var(--text-hint);
       cursor: pointer;
       letter-spacing: 0.5px;
   }
   .tab-link:hover { border-color: var(--accent); color: var(--accent); }
   .tab-link.active {
       background: var(--accent-light);
       color: var(--accent);
       border-color: var(--accent);
   }
   .tab-pane { display: none; }
   .tab-pane.active { display: block; }
   ```

3. **Recipe action buttons and file input:**

   ```css
   .recipe-actions {
       display: flex;
       flex-wrap: wrap;
       gap: 8px;
       margin-bottom: 1rem;
   }
   .recipe-btn {
       font-family: 'DM Sans', sans-serif;
       font-size: 13px;
       padding: 8px 16px;
       border: 1px solid var(--border);
       background: var(--card-bg);
       color: var(--text);
       cursor: pointer;
       letter-spacing: 0.5px;
   }
   .recipe-btn:hover { border-color: var(--accent); color: var(--accent); }
   .recipe-btn-primary {
       background: var(--accent-light);
       color: var(--accent);
       border-color: var(--accent);
   }
   ```

4. **Preview area** (canvas scales down to fit; drop hint centers over it):

   ```css
   .recipe-preview-wrap {
       position: relative;
       border: 1px solid var(--border);
       background: #0d0d0f;
       padding: 12px;
       margin-bottom: 1.25rem;
       min-height: 120px;
       display: flex;
       align-items: center;
       justify-content: center;
   }
   .recipe-canvas {
       display: block;
       max-width: 100%;
       height: auto;
   }
   .recipe-drop-hint {
       position: absolute;
       inset: 0;
       display: flex;
       align-items: center;
       justify-content: center;
       text-align: center;
       padding: 1rem;
       font-size: 12px;
       color: var(--text-hint);
       pointer-events: none;
   }
   .recipe-preview-wrap.dragover { border-color: var(--accent); }
   ```

5. **Editor form** (label + control rows, terminal style):

   ```css
   .recipe-form {
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 10px 12px;
   }
   .recipe-field { display: flex; flex-direction: column; gap: 4px; }
   .recipe-field.full { grid-column: 1 / -1; }
   .recipe-field label {
       font-size: 11px;
       text-transform: uppercase;
       letter-spacing: 0.5px;
       color: var(--text-muted);
   }
   .recipe-field input,
   .recipe-field select {
       font-family: 'DM Sans', sans-serif;
       font-size: 13px;
       padding: 6px 8px;
       background: var(--card-bg);
       border: 1px solid var(--border);
       color: var(--text);
       border-radius: 0;
   }
   .recipe-field input:focus,
   .recipe-field select:focus {
       outline: none;
       border-color: var(--accent);
   }
   .recipe-wb-shift { display: flex; gap: 8px; }
   .recipe-wb-shift input { width: 100%; }
   @media (max-width: 500px) {
       .recipe-form { grid-template-columns: 1fr; }
   }
   ```

**Edge cases:** `.recipe-canvas { max-width: 100% }` prevents the (large, 2×‑resolution) canvas from overflowing `.page` (max‑width 680px). The drop hint uses `pointer-events: none` so clicks fall through to the drop target.

---

## Task 4: Implement the recipe logic and Canvas renderer

**Files:**

- Create: `static/js/recipe.js`

**Reuses:** The plain image‑ingest logic from the design file `Film Recipe Card.dc.html` (`ingest()` method), reimplemented in vanilla JS: downscale so the longest edge ≤ 1600 px on an offscreen canvas, `toDataURL('image/jpeg', 0.9)`, detect portrait via `naturalHeight > naturalWidth * 1.02`, persist to `localStorage`. No code is imported from that file — its framework is not reusable.

**Precondition:** Tasks 1–3 done (the script targets `#recipe-canvas`, `#recipe-form`, and the buttons from Task 1, and relies on classes from Task 3).

Write the file with a single `DOMContentLoaded` handler that returns early if `document.getElementById('recipe-canvas')` is absent (keeps it inert elsewhere). Inside, implement the pieces below.

### 4.1 Field definitions

Define an ordered array `FIELDS`. Each entry: `{ id, label, kind, big, options?, default }`.

- `kind` is one of `'select'`, `'text'`, `'number'`, `'wb'`.
- `big: true` marks the four large boxes; the rest are small.

Fields, in this exact order (this order is also the card layout order):

| id | label | kind | big | options / notes | default |
|----|-------|------|-----|-----------------|---------|
| `filmSimulation` | Film Simulation | select | yes | see film‑sim list below | `Classic Chrome` |
| `whiteBalance` | White Balance | wb | yes | value text + Red shift + Blue shift | `6500K`, R `0`, B `0` |
| `shutterSpeed` | Speed | text | yes | e.g. `1/250` | `1/250` |
| `aperture` | Aperture | text | yes | e.g. `f/8` | `f/8` |
| `dynamicRange` | Dynamic Range | select | no | `DR100`,`DR200`,`DR400`,`Auto` | `DR200` |
| `highlight` | Highlight | number | no | range −2…+4 | `-2` |
| `shadow` | Shadow | number | no | range −2…+4 | `-1` |
| `color` | Color | number | no | range −4…+4 | `4` |
| `sharpness` | Sharpness | number | no | range −4…+4 | `-2` |
| `noiseReduction` | Noise Reduction | number | no | range −4…+4 | `-4` |
| `grainEffect` | Grain Effect | select | no | `Off`,`Weak`,`Strong` | `Strong` |
| `iso` | ISO | text | no | e.g. `Auto` or `800` | `Auto` |
| `exposureComp` | Exposure Comp. | text | no | e.g. `+0.3` | `0` |

**X‑T20 reconciliation (do this exactly):** The design mock included `Clarity`, `Color Effect` (Color Chrome Effect), and `Color FX Blue`. The real Fujifilm **X‑T20** (X‑Trans III / X‑Processor Pro) does **not** have those three controls, and its Highlight/Shadow/Color/Sharpness/Noise Reduction are integer steps. The owner said "follow the XT‑20 settings," so those three fields are intentionally omitted and steps are integers. `Speed` and `Aperture` are added per the owner's request as big boxes. Keep the field set above as the source of truth.

Film‑simulation `options` list (X‑T20 set):

```
Provia / Standard, Velvia / Vivid, Astia / Soft, Classic Chrome,
PRO Neg. Hi, PRO Neg. Std, Acros, Acros + Ye Filter, Acros + R Filter,
Acros + G Filter, Monochrome, Mono + Ye Filter, Mono + R Filter,
Mono + G Filter, Sepia
```

### 4.2 State and persistence

- `state = { photoUrl: null, isPortrait: false, ratio: 1.5, name: '', values: {} }`.
- Initialize `state.values[f.id]` from each field's default; for `whiteBalance` store `{ value, red, blue }`.
- `LS_PHOTO = 'fuji_recipe_photo'`, `LS_DATA = 'fuji_recipe_data'` (JSON of `{ name, values }`).
- On init, wrap `localStorage` reads in `try/catch` (Safari private mode throws): if `LS_PHOTO` present, set `state.photoUrl`; if `LS_DATA` present, `JSON.parse` and merge into `state.name`/`state.values` (guard against malformed JSON with `try/catch`, fall back to defaults).
- `saveData()` writes `LS_DATA`; `savePhoto()` writes `LS_PHOTO`. Both wrapped in `try/catch` and no‑op on failure (quota/private mode).

### 4.3 Build the form

Add a `recipe-field full` text input for the recipe **name** (`id="recipe-name"`, label "Recipe Name", placeholder "e.g. Classic Chrome Everyday") as the first form row.

Then iterate `FIELDS` and append a `.recipe-field` per field into `#recipe-form`:

- `select` → `<select>` with `<option>` per entry in `options`; set current value.
- `text` / `number` → `<input>` (`type="text"`; use `type="text"` even for numbers so signs like `+0.3`/`−2` and `Auto` are allowed — do not use `type="number"`).
- `wb` → a text input for the WB value plus a `.recipe-wb-shift` row containing two text inputs (Red, Blue) with small inline labels.

Wire an `input`/`change` listener on every control that updates `state`, calls `saveData()`, and calls `render()`. The name input updates `state.name`.

### 4.4 Photo ingest

Implement `ingest(file)`:

1. Reject if `!file.type || file.type.indexOf('image/') !== 0` (return silently).
2. `FileReader.readAsDataURL`. On load, create an `Image`, `src = reader.result`.
3. On image load: compute `sc = Math.min(1, 1600 / Math.max(w, h))`, new `w`/`h` rounded (min 1). Draw onto an offscreen `<canvas>` at that size; `dataUrl = canvas.toDataURL('image/jpeg', 0.9)` inside `try/catch` (fall back to `reader.result` if it throws).
4. Set `state.photoUrl = dataUrl`, `state.ratio = w / h`, `state.isPortrait = h > w * 1.02`.
5. `savePhoto()`, hide `#recipe-drop-hint`, then `loadPhotoThenRender()` (below).

Wire:

- `#recipe-upload-btn` click → `#recipe-file.click()`.
- `#recipe-file` `change` → `ingest(files[0])`, then reset `value = ''`.
- On `#recipe-preview-wrap`: `dragover` → `preventDefault()` + add `.dragover`; `dragleave` → remove `.dragover`; `drop` → `preventDefault()`, remove `.dragover`, `ingest(dataTransfer.files[0])`.

### 4.5 Photo element cache

Keep a module‑level `photoImg = new Image()`. `loadPhotoThenRender()`:

- If `state.photoUrl` is falsy, `render()` immediately (draws the empty‑frame state) and show the hint.
- Else set `photoImg.onload = render`, `photoImg.src = state.photoUrl`. If `photoImg.complete && photoImg.naturalWidth`, call `render()` directly (cached). Hide the hint.

Also, if a photo was restored from `localStorage` on init, derive `state.ratio`/`isPortrait` from `photoImg.naturalWidth/Height` in the `onload` before rendering.

### 4.6 Canvas renderer — layout

All numbers below are **logical** CSS pixels; render at `SCALE = 2` for a crisp PNG. Set `canvas.width = totalW * SCALE`, `canvas.height = totalH * SCALE`, then `ctx.setTransform(SCALE,0,0,SCALE,0,0)` once per render and draw in logical units. Set the CSS display size via `canvas.style.width = totalW + 'px'` (CSS `max-width:100%` from Task 3 scales it down responsively).

Shared constants: `PAD = 28`, `COL_GAP = 12`, `ROW_GAP = 12`, `PANEL_GAP = 20`, `BIG_H = 104`, `SMALL_H = 84`, `FRAME_R = 28`, `BOX_R = 22`.

Compute the **visible box list**: map `FIELDS` to `{ value, label, big }`, dropping any whose display value is empty (see 4.8 for how each field's value string is formed). This is the "omit empty settings" rule.

Split into `bigBoxes` (first, preserving order: Film Sim, White Balance, Speed, Aperture — minus any empty) and `smallBoxes` (the rest, minus any empty).

**Row builder** `buildRows(bigBoxes, smallBoxes)`:

- Big rows: chunk `bigBoxes` into groups of **2** → each a row of height `BIG_H`. (So Film Sim + White Balance form row 1; Speed + Aperture form row 2, per the owner's spec. If one is omitted, its row has a single box.)
- Small rows: chunk `smallBoxes` into groups of **at most 4** → each a row of height `SMALL_H`.
- Return an ordered list of rows: all big rows first, then all small rows.

**Landscape mode** (`!isPortrait`):

- `CARD_W = 660`. `totalW = CARD_W + 2*PAD`.
- `photoW = CARD_W`, `photoH = CARD_W / state.ratio`.
- Photo rect: `x = PAD`, `y = PAD`, `w = photoW`, `h = photoH`.
- Panel starts at `panelY = PAD + photoH + PANEL_GAP`, panel width `= CARD_W`, left `= PAD`.
- For each row, box width `= (CARD_W - COL_GAP*(n-1)) / n` where `n` is that row's column count (2 for big rows, up to 4 for small rows). Lay boxes left‑to‑right at `PAD`, advancing by `boxW + COL_GAP`. Advance `y` by rowHeight + `ROW_GAP` between rows.
- `panelH = sum(rowHeights) + ROW_GAP*(rowCount-1)`.
- `totalH = PAD + photoH + PANEL_GAP + panelH + PAD`.

**Portrait mode** (`isPortrait`):

- `PHOTO_W = 380`, `PANEL_W = 520`, inner gap `24`. `totalW = PAD + PHOTO_W + 24 + PANEL_W + PAD`.
- Photo rect: `x = PAD`, `y = PAD`, `w = PHOTO_W`, `h = PHOTO_W / state.ratio`.
- Panel left `= PAD + PHOTO_W + 24`, width `= PANEL_W`, top `= PAD`. Same row layout as landscape but box widths computed against `PANEL_W`.
- `panelH = sum(rowHeights) + ROW_GAP*(rowCount-1)`.
- `contentH = max(photoH, panelH)`; `totalH = PAD + contentH + PAD`.

If `state.photoUrl` is null, still render using a placeholder frame at the default landscape ratio (`state.ratio = 1.5`) so the layout is visible; draw the frame as a flat `rgba(255,255,255,.06)` fill instead of a photo, and keep the hint visible.

### 4.7 Canvas renderer — drawing

Define a helper `roundRect(ctx, x, y, w, h, r)` (build a path with `arcTo` or `ctx.roundRect` where available — feature‑detect `ctx.roundRect` and fall back to a manual arc path for older engines).

Draw order in `render()`:

1. Recompute layout (4.6). Resize canvas + set transform.
2. **Base:** fill entire canvas `#0d0d0f`.
3. **Blurred backdrop:** if a photo is loaded, `ctx.save()`, `ctx.filter = 'blur(64px) saturate(1.5) brightness(0.82)'`, draw `photoImg` scaled to **cover** the whole canvas enlarged ×1.18 (compute cover dimensions from the photo's natural ratio, center it, offset by the extra 18%), `ctx.restore()`. (Canvas `ctx.filter` blur works; this is why no per‑box blur is needed — boxes sit over an already‑blurred field.)
4. **Gradient overlay:** fill a top‑to‑bottom `linearGradient` from `rgba(10,10,14,.28)` to `rgba(10,10,14,.46)` over the whole canvas.
5. **Photo frame:** `ctx.save()`, `roundRect` the photo rect with `FRAME_R`, `ctx.clip()`. If photo loaded, draw `photoImg` cover‑cropped into the rect (compute cover scale/offset for the rect's own aspect vs the photo's ratio); else fill `rgba(255,255,255,.06)`. `ctx.restore()`. Then draw a soft drop shadow for the frame by stroking/filling before the clip, or draw the frame onto the canvas with `ctx.shadowColor='rgba(0,0,0,.5)'`, `ctx.shadowBlur=70`, `ctx.shadowOffsetY=24` set on a filled rounded rect drawn just before the clipped image (reset shadow props to defaults afterward so boxes/text are not shadowed).
6. **Recipe name:** if `state.name` is non‑empty, draw it bottom‑left inside the photo frame: `ctx.font = "600 22px -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif"`, `fillStyle = '#fff'`, with `shadowColor='rgba(0,0,0,.55)'`, `shadowBlur=12` for legibility; position baseline at `photo.y + photo.h - 20`, `x = photo.x + 22`. Reset shadow afterward.
7. **Glass boxes:** for each positioned box:
   - `roundRect` at `BOX_R`; `fillStyle = 'rgba(255,255,255,0.10)'`, fill.
   - Stroke the same path: `strokeStyle = 'rgba(255,255,255,0.15)'`, `lineWidth = 1`.
   - Text, left‑aligned, vertically centered as a block of `value` over `label`:
     - value: `fontWeight 600`, `#fff`, size `26px` (big) / `20px` (small), family as above, `letterSpacing` not needed on canvas.
     - label: `fontWeight 500`, `rgba(255,255,255,0.6)`, size `13px` (big) / `11px` (small).
     - Left padding `20` (big) / `15` (small). Compute block height `= valueSize + 6 + labelSize`; `valueBaseline = box.y + (box.h - blockH)/2 + valueSize`; `labelBaseline = valueBaseline + 6 + labelSize`.
     - Clip each box (save/clip to the rounded rect) while drawing its text so long values do not spill into neighbors; restore after.

### 4.8 Field → box value strings

For each field, form the display value:

- `filmSimulation`, `dynamicRange`, `grainEffect`, `iso`, `shutterSpeed`, `aperture`, `exposureComp`: the raw string; treat empty/whitespace‑only as omitted.
- `highlight`, `shadow`, `color`, `sharpness`, `noiseReduction`: format signed — if the trimmed value is empty, omit; else if it is a number `> 0`, prefix `+`; render minus as the Unicode minus `−` (U+2212) to match the mock (e.g. `−2`, `+4`, `0`).
- `whiteBalance` (`wb`): box `value = state.values.whiteBalance.value` (omit the whole box if that is empty); box `label = 'Red: ' + red + '   Blue: ' + blue'` using signed formatting for red/blue (default `0` shows as `0`). This matches the mock, where the WB box shows the Kelvin/mode as the value and the shift as the sub‑label rather than the words "White Balance".
- For every non‑WB field, box `label` is the field's `label` from the table.

### 4.9 Generate & Save

`#recipe-save-btn` click handler:

1. Call `render()` once to guarantee the canvas is current.
2. `canvas.toBlob(function(blob){ ... }, 'image/png')`. In the callback: create an object URL, a temporary `<a>` with `download = (state.name ? slugify(state.name) : 'film-recipe') + '.png'`, click it, then `URL.revokeObjectURL`. `slugify` = lowercase, non‑alphanumerics → `-`, collapse repeats, trim dashes.
3. If `canvas.toBlob` is undefined (very old engine), fall back to `canvas.toDataURL('image/png')` as the `href`.

### 4.10 Tab switching

Wire the tab bar here (it is new behavior; `filter.js` only handles side‑quest tags):

- Query `.tab-link`; on click, remove `active` from all `.tab-link` and all `.tab-pane`, add `active` to the clicked link and to the pane whose `id` matches its `data-pane`.
- After switching **to** the recipe pane, call `render()` once (a canvas sized/drawn while its pane was `display:none` can mis‑measure in some engines; re‑rendering when visible is safe and cheap).

### 4.11 Init sequence

On DOM ready (guard on `#recipe-canvas`): load persisted state → build form (name + fields with restored values) → `loadPhotoThenRender()` → wire upload/drop/save/tab handlers. Ensure `#recipe-drop-hint` visibility reflects whether a photo is present.

---

## Verification

Run all commands from the repo root `/home/thanhpp/go/src/github.com/thanhpp/thanhpp.github.io`.

1. **Build succeeds:**
   ```
   hugo --minify
   ```
   Expected: exits 0, no template errors, and `public/js/recipe.js` exists afterward (`ls public/js/recipe.js`).

2. **Serve and open:**
   ```
   hugo server -D
   ```
   Open `http://localhost:1313/`.

3. **Manual checks in the browser:**
   - Page opens on the **Quests** tab; Main Quests + Side Quests render exactly as before; the Side‑Quests filter buttons still work (regression check on `filter.js`).
   - Click **Film Recipe**: the pane shows the action buttons, an empty preview frame with the drop hint, and the form (recipe name + all fields from the 4.1 table with their defaults).
   - Click **Upload Photo**, choose a **landscape** JPG/PNG: the card renders with the photo on top and, below it, row 1 = Film Simulation + White Balance, row 2 = Speed + Aperture, then small settings ≤ 4 per row. Glass boxes are frosted over a blurred version of the photo. The drop hint disappears.
   - Upload a **portrait** photo: the card re‑lays out to photo‑left / settings‑right.
   - Clear a field (e.g. blank out ISO): its box disappears from the card (omit‑empty rule).
   - Type a **Recipe Name**: it appears bottom‑left on the photo.
   - Click **Generate & Save**: a PNG downloads, named after the recipe (or `film-recipe.png`); opening it shows the same card as the preview at higher resolution.
   - Reload the page, return to the Film Recipe tab: the photo and all field values are restored from `localStorage`.
   - **Drag‑and‑drop** an image onto the preview: it loads the same as the upload button.

---

## Punch List (Out of Scope)

- **Multiple saved recipes / presets library.** Only one recipe persists (the current one). A named preset gallery is deferred; not requested.
- **Copying the design's bundled sample photos** (`assets/sample-landscape.png`, `sample-portrait.png`). The empty‑frame placeholder replaces them; a default sample is unnecessary and would add binary assets to the repo.
- **The design's Color Chrome Effect / Color FX Blue / Clarity fields.** Intentionally excluded because the X‑T20 lacks them (see Task 4.1 reconciliation). Add later only if targeting a newer body.
- **Exact pixel parity with the mock at every viewport.** The renderer reproduces the mock's look (glass, radii, type scale, colors) but uses fixed logical widths (660 landscape / 380+520 portrait) rather than the mock's fluid `clamp()`/`vw` sizing, since the export is a fixed raster.
- **The "Photo" pill badge from the mock.** It was an upload affordance; the editor's Upload button + drop target replace it, so it is omitted from the rendered card.
