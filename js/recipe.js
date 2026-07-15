function parseExif(ab) {
    var out = { model: null, iso: null, fNumber: null, exposureTime: null, exposureBias: null };
    var dv = new DataView(ab);
    // locate APP1 "Exif\0\0"
    var off = 2, tiff = -1;
    try {
        while (off + 4 < dv.byteLength) {
            if (dv.getUint8(off) !== 0xFF) break;
            var marker = dv.getUint8(off + 1);
            var size = dv.getUint16(off + 2);
            if (marker === 0xE1 &&
                dv.getUint8(off + 4) === 0x45 && dv.getUint8(off + 5) === 0x78 &&
                dv.getUint8(off + 6) === 0x69 && dv.getUint8(off + 7) === 0x66) { tiff = off + 10; break; }
            off += 2 + size;
        }
        if (tiff < 0) return out;
        var little = dv.getUint8(tiff) === 0x49 && dv.getUint8(tiff + 1) === 0x49;
        var u16 = function (o) { return dv.getUint16(o, little); };
        var u32 = function (o) { return dv.getUint32(o, little); };
        var i32 = function (o) { return dv.getInt32(o, little); };
        var TYPE_SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };
        function readIFD(ifdOff) {
            var n = u16(ifdOff), e = {};
            for (var i = 0; i < n; i++) {
                var p = ifdOff + 2 + i * 12;
                var tag = u16(p), type = u16(p + 2), cnt = u32(p + 4);
                var byteLen = (TYPE_SIZE[type] || 1) * cnt;
                var valOff = (byteLen > 4) ? tiff + u32(p + 8) : p + 8;
                e[tag] = { type: type, cnt: cnt, valOff: valOff };
            }
            return e;
        }
        var rat = function (o) { return u32(o) / u32(o + 4); };
        var srat = function (o) { return i32(o) / i32(o + 4); };
        var ascii = function (en) {
            var s = '';
            for (var i = 0; i < en.cnt; i++) {
                var c = dv.getUint8(en.valOff + i);
                if (c) s += String.fromCharCode(c);
            }
            return s;
        };
        var readNum = function (en) { return en.type === 3 ? u16(en.valOff) : u32(en.valOff); }; // SHORT vs LONG (ISO type-aware)
        var ifd0 = readIFD(tiff + u32(tiff + 4));
        if (ifd0[0x0110]) out.model = ascii(ifd0[0x0110]);
        var exifPtr = ifd0[0x8769];
        if (exifPtr) {
            var ex = readIFD(tiff + u32(exifPtr.valOff));
            if (ex[0x8827]) out.iso = readNum(ex[0x8827]);
            if (ex[0x829D]) out.fNumber = rat(ex[0x829D].valOff);
            if (ex[0x829A]) out.exposureTime = rat(ex[0x829A].valOff);
            if (ex[0x9204]) out.exposureBias = srat(ex[0x9204].valOff);
        }
    } catch (e) { /* malformed EXIF → return whatever we have */ }
    return out;
}

function exifToRecipeFields(exif) {
    var out = { iso: null, aperture: null, shutterSpeed: null, exposureComp: null };
    if (!exif) return out;

    if (exif.iso !== null && exif.iso !== undefined) {
        out.iso = String(exif.iso);
    }

    if (exif.fNumber !== null && exif.fNumber !== undefined) {
        var f = exif.fNumber;
        var fStr = (Math.round(f) === f) ? String(f) : f.toFixed(1);
        out.aperture = 'f/' + fStr;
    }

    if (exif.exposureTime !== null && exif.exposureTime !== undefined) {
        var et = exif.exposureTime;
        if (et < 1) {
            out.shutterSpeed = '1/' + Math.round(1 / et);
        } else {
            out.shutterSpeed = String(Math.round(et * 10) / 10);
        }
    }

    if (exif.exposureBias !== null && exif.exposureBias !== undefined) {
        var r = Math.round(exif.exposureBias * 10) / 10;
        out.exposureComp = (r > 0) ? ('+' + r) : String(r);
    }

    return out;
}

function main() {
    var canvas = document.getElementById('recipe-canvas');
    if (!canvas) return;

    // ---------------------------------------------------------------
    // 4.1 Field definitions
    // ---------------------------------------------------------------
    var FILM_SIM_OPTIONS = [
        'Provia / Standard',
        'Velvia / Vivid',
        'Astia / Soft',
        'Classic Chrome',
        'PRO Neg. Hi',
        'PRO Neg. Std',
        'Acros',
        'Acros + Ye Filter',
        'Acros + R Filter',
        'Acros + G Filter',
        'Monochrome',
        'Mono + Ye Filter',
        'Mono + R Filter',
        'Mono + G Filter',
        'Sepia'
    ];

    var FIELDS = [
        { id: 'filmSimulation', label: 'Film Simulation', kind: 'select', big: true, options: FILM_SIM_OPTIONS, default: 'Classic Chrome' },
        { id: 'whiteBalance', label: 'White Balance', kind: 'wb', big: true, default: { value: '6500K', red: 0, blue: 0 } },
        { id: 'shutterSpeed', label: 'Speed', kind: 'text', big: true, default: '1/250' },
        { id: 'aperture', label: 'Aperture', kind: 'text', big: true, default: 'f/8' },
        { id: 'dynamicRange', label: 'Dynamic Range', kind: 'select', big: false, options: ['DR100', 'DR200', 'DR400', 'Auto'], default: 'DR200' },
        { id: 'highlight', label: 'Highlight', kind: 'number', big: false, default: '-2' },
        { id: 'shadow', label: 'Shadow', kind: 'number', big: false, default: '-1' },
        { id: 'color', label: 'Color', kind: 'number', big: false, default: '4' },
        { id: 'colorChromeEffect', label: 'Color Chrome Effect', kind: 'select', big: false, options: ['Off', 'Weak', 'Strong'], default: 'Off' },
        { id: 'colorFxBlue', label: 'Color FX Blue', kind: 'select', big: false, options: ['Off', 'Weak', 'Strong'], default: 'Off' },
        { id: 'sharpness', label: 'Sharpness', kind: 'number', big: false, default: '-2' },
        { id: 'clarity', label: 'Clarity', kind: 'number', big: false, default: '0' },
        { id: 'noiseReduction', label: 'Noise Reduction', kind: 'number', big: false, default: '-4' },
        { id: 'grainEffect', label: 'Grain Effect', kind: 'select', big: false, options: ['Off', 'Weak', 'Strong'], default: 'Strong' },
        { id: 'iso', label: 'ISO', kind: 'text', big: false, default: 'Auto' },
        { id: 'exposureComp', label: 'Exposure Comp.', kind: 'text', big: false, default: '0' }
    ];

    var SIGNED_FIELD_IDS = ['highlight', 'shadow', 'color', 'sharpness', 'clarity', 'noiseReduction'];

    // ---------------------------------------------------------------
    // 4.2 State & persistence
    // ---------------------------------------------------------------
    var LS_PHOTO = 'fuji_recipe_photo';
    var LS_DATA = 'fuji_recipe_data';

    var state = {
        photoUrl: null,
        isPortrait: false,
        ratio: 1.5,
        name: '',
        values: {},
        hidden: {}
    };

    FIELDS.forEach(function (f) {
        if (f.kind === 'wb') {
            state.values[f.id] = { value: f.default.value, red: f.default.red, blue: f.default.blue };
        } else {
            state.values[f.id] = f.default;
        }
    });

    try {
        var storedPhoto = localStorage.getItem(LS_PHOTO);
        if (storedPhoto) state.photoUrl = storedPhoto;
    } catch (e) { /* private mode / unavailable */ }

    try {
        var storedData = localStorage.getItem(LS_DATA);
        if (storedData) {
            var parsed = JSON.parse(storedData);
            if (parsed && typeof parsed === 'object') {
                if (typeof parsed.name === 'string') state.name = parsed.name;
                if (parsed.values && typeof parsed.values === 'object') {
                    Object.keys(parsed.values).forEach(function (k) {
                        if (Object.prototype.hasOwnProperty.call(state.values, k)) {
                            state.values[k] = parsed.values[k];
                        }
                    });
                }
                if (parsed.hidden && typeof parsed.hidden === 'object') {
                    Object.keys(parsed.hidden).forEach(function (k) {
                        state.hidden[k] = parsed.hidden[k];
                    });
                }
            }
        }
    } catch (e) { /* malformed JSON or unavailable, keep defaults */ }

    function saveData() {
        try {
            localStorage.setItem(LS_DATA, JSON.stringify({ name: state.name, values: state.values, hidden: state.hidden }));
        } catch (e) { /* quota / private mode */ }
    }

    function savePhoto() {
        try {
            localStorage.setItem(LS_PHOTO, state.photoUrl);
        } catch (e) { /* quota / private mode */ }
    }

    // ---------------------------------------------------------------
    // 4.3 Build the form
    // ---------------------------------------------------------------
    var formEl = document.getElementById('recipe-form');

    function buildForm() {
        if (!formEl) return;
        formEl.innerHTML = '';

        var nameField = document.createElement('div');
        nameField.className = 'recipe-field full';
        var nameLabel = document.createElement('label');
        nameLabel.textContent = 'Recipe Name';
        var nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'recipe-name';
        nameInput.placeholder = 'e.g. Classic Chrome Everyday';
        nameInput.value = state.name;
        nameInput.addEventListener('input', function () {
            state.name = nameInput.value;
            saveData();
            render();
        });
        nameField.appendChild(nameLabel);
        nameField.appendChild(nameInput);
        formEl.appendChild(nameField);

        FIELDS.forEach(function (f) {
            var wrap = document.createElement('div');
            wrap.className = 'recipe-field';

            var head = document.createElement('div');
            head.className = 'recipe-field-head';

            var label = document.createElement('label');
            label.textContent = f.label;
            head.appendChild(label);

            var toggleLabel = document.createElement('label');
            toggleLabel.className = 'recipe-toggle';
            var toggleInp = document.createElement('input');
            toggleInp.type = 'checkbox';
            toggleInp.checked = !state.hidden[f.id];
            toggleInp.addEventListener('change', function () {
                state.hidden[f.id] = !toggleInp.checked;
                saveData();
                render();
            });
            toggleLabel.appendChild(toggleInp);
            toggleLabel.appendChild(document.createTextNode('show'));
            head.appendChild(toggleLabel);

            wrap.appendChild(head);

            if (f.kind === 'select') {
                var sel = document.createElement('select');
                f.options.forEach(function (opt) {
                    var o = document.createElement('option');
                    o.value = opt;
                    o.textContent = opt;
                    sel.appendChild(o);
                });
                sel.value = state.values[f.id];
                sel.addEventListener('change', function () {
                    state.values[f.id] = sel.value;
                    saveData();
                    render();
                });
                wrap.appendChild(sel);
            } else if (f.kind === 'text' || f.kind === 'number') {
                var inp = document.createElement('input');
                inp.type = 'text';
                inp.setAttribute('data-field-id', f.id);
                inp.value = state.values[f.id];
                inp.addEventListener('input', function () {
                    state.values[f.id] = inp.value;
                    saveData();
                    render();
                });
                wrap.appendChild(inp);
            } else if (f.kind === 'wb') {
                var valInp = document.createElement('input');
                valInp.type = 'text';
                valInp.value = state.values[f.id].value;
                valInp.addEventListener('input', function () {
                    state.values[f.id].value = valInp.value;
                    saveData();
                    render();
                });
                wrap.appendChild(valInp);

                var shiftRow = document.createElement('div');
                shiftRow.className = 'recipe-wb-shift';

                var redLabel = document.createElement('label');
                redLabel.textContent = 'Red';
                var redInp = document.createElement('input');
                redInp.type = 'text';
                redInp.value = state.values[f.id].red;
                redInp.addEventListener('input', function () {
                    state.values[f.id].red = redInp.value;
                    saveData();
                    render();
                });

                var blueLabel = document.createElement('label');
                blueLabel.textContent = 'Blue';
                var blueInp = document.createElement('input');
                blueInp.type = 'text';
                blueInp.value = state.values[f.id].blue;
                blueInp.addEventListener('input', function () {
                    state.values[f.id].blue = blueInp.value;
                    saveData();
                    render();
                });

                shiftRow.appendChild(redLabel);
                shiftRow.appendChild(redInp);
                shiftRow.appendChild(blueLabel);
                shiftRow.appendChild(blueInp);
                wrap.appendChild(shiftRow);
            }

            formEl.appendChild(wrap);
        });
    }

    // ---------------------------------------------------------------
    // 4.4 / 4.5 Photo ingest + element cache
    // ---------------------------------------------------------------
    var photoImg = new Image();
    var dropHintEl = document.getElementById('recipe-drop-hint');

    function setHintVisible(visible) {
        if (dropHintEl) dropHintEl.style.display = visible ? '' : 'none';
    }

    function applyPhotoMeta() {
        if (photoImg.naturalWidth) {
            state.ratio = photoImg.naturalWidth / photoImg.naturalHeight;
            state.isPortrait = photoImg.naturalHeight > photoImg.naturalWidth * 1.02;
        }
    }

    function loadPhotoThenRender() {
        if (!state.photoUrl) {
            setHintVisible(true);
            render();
            return;
        }
        setHintVisible(false);
        photoImg.onload = function () {
            applyPhotoMeta();
            render();
        };
        photoImg.src = state.photoUrl;
        if (photoImg.complete && photoImg.naturalWidth) {
            applyPhotoMeta();
            render();
        }
    }

    function ingest(file) {
        if (!file || !file.type || file.type.indexOf('image/') !== 0) return;

        var reader = new FileReader();
        reader.onload = function () {
            var img = new Image();
            img.onload = function () {
                var w = img.naturalWidth, h = img.naturalHeight;
                var sc = Math.min(1, 2560 / Math.max(w, h));
                var nw = Math.max(1, Math.round(w * sc));
                var nh = Math.max(1, Math.round(h * sc));

                var off = document.createElement('canvas');
                off.width = nw;
                off.height = nh;
                var octx = off.getContext('2d');
                octx.drawImage(img, 0, 0, nw, nh);

                var dataUrl;
                try {
                    dataUrl = off.toDataURL('image/jpeg', 0.9);
                } catch (e) {
                    dataUrl = reader.result;
                }

                state.photoUrl = dataUrl;
                state.ratio = w / h;
                state.isPortrait = h > w * 1.02;
                savePhoto();
                setHintVisible(false);
                loadPhotoThenRender();
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);

        try {
            var exifReader = new FileReader();
            exifReader.onload = function () {
                try {
                    var exif = parseExif(exifReader.result);
                    var fields = exifToRecipeFields(exif);
                    var ids = ['iso', 'aperture', 'shutterSpeed', 'exposureComp'];
                    var changed = false;
                    ids.forEach(function (id) {
                        var v = fields[id];
                        if (v !== null && v !== undefined) {
                            state.values[id] = v;
                            var inputEl = formEl ? formEl.querySelector('[data-field-id="' + id + '"]') : null;
                            if (inputEl) inputEl.value = v;
                            changed = true;
                        }
                    });
                    if (changed) {
                        saveData();
                        render();
                    }
                } catch (e) { /* EXIF parse failure must not block photo load */ }
            };
            exifReader.readAsArrayBuffer(file);
        } catch (e) { /* FileReader unavailable */ }
    }

    // ---------------------------------------------------------------
    // 4.8 Field -> box value strings
    // ---------------------------------------------------------------
    function formatSigned(v) {
        var trimmed = (v === undefined || v === null) ? '' : String(v).trim();
        if (trimmed === '') return '';
        var num = parseFloat(trimmed);
        if (isNaN(num)) return trimmed;
        if (num > 0) return '+' + trimmed.replace(/^\+/, '');
        if (num < 0) return trimmed.replace(/^-/, '−');
        return '0';
    }

    function fieldDisplayValue(f) {
        var raw = state.values[f.id];

        if (f.kind === 'wb') {
            var val = (raw && raw.value !== undefined && raw.value !== null) ? String(raw.value) : '';
            if (val.trim() === '') return null;
            var redRaw = (!raw || raw.red === undefined || raw.red === null || String(raw.red).trim() === '') ? 0 : raw.red;
            var blueRaw = (!raw || raw.blue === undefined || raw.blue === null || String(raw.blue).trim() === '') ? 0 : raw.blue;
            var red = formatSigned(redRaw);
            var blue = formatSigned(blueRaw);
            return { value: val, label: f.label, sub: 'Red: ' + red + '   Blue: ' + blue };
        }

        if (SIGNED_FIELD_IDS.indexOf(f.id) !== -1) {
            var signed = formatSigned(raw);
            if (signed === '') return null;
            return { value: signed, label: f.label };
        }

        var str = (raw === undefined || raw === null) ? '' : String(raw);
        if (str.trim() === '') return null;
        return { value: str, label: f.label };
    }

    function buildBoxes() {
        var big = [];
        var small = [];
        FIELDS.forEach(function (f) {
            if (state.hidden[f.id]) return;
            var d = fieldDisplayValue(f);
            if (!d) return;
            var box = { value: d.value, label: d.label, sub: d.sub, big: !!f.big };
            if (f.big) big.push(box); else small.push(box);
        });
        return { big: big, small: small };
    }

    function chunk(arr, size) {
        var out = [];
        for (var i = 0; i < arr.length; i += size) {
            out.push(arr.slice(i, i + size));
        }
        return out;
    }

    function buildRows(bigBoxes, smallBoxes) {
        var rows = [];
        chunk(bigBoxes, 2).forEach(function (g) {
            rows.push({ height: BIG_H, boxes: g });
        });
        chunk(smallBoxes, 4).forEach(function (g) {
            rows.push({ height: SMALL_H, boxes: g });
        });
        return rows;
    }

    // ---------------------------------------------------------------
    // 4.6 / 4.7 Renderer
    // ---------------------------------------------------------------
    var PAD = 28, COL_GAP = 12, ROW_GAP = 12, PANEL_GAP = 20;
    var BIG_H = 104, SMALL_H = 84, FRAME_R = 28, BOX_R = 22;
    var FONT_FAMILY = "'Google Sans Code', -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif";

    // Shorten a string with an ellipsis until it fits within maxWidth (font must be set on ctx).
    function ellipsize(ctx, str, maxWidth) {
        if (ctx.measureText(str).width <= maxWidth) return str;
        while (str.length > 1 && ctx.measureText(str + '…').width > maxWidth) {
            str = str.slice(0, -1);
        }
        return str + '…';
    }

    // Word-wrap text into at most maxLines lines fitting maxWidth (font must be set on ctx).
    function wrapLines(ctx, text, maxWidth, maxLines) {
        text = (text === undefined || text === null) ? '' : String(text);
        if (ctx.measureText(text).width <= maxWidth) return [text];
        var words = text.split(/\s+/);
        var lines = [];
        var cur = '';
        for (var i = 0; i < words.length; i++) {
            var test = cur ? cur + ' ' + words[i] : words[i];
            if (cur !== '' && ctx.measureText(test).width > maxWidth) {
                lines.push(cur);
                if (lines.length === maxLines - 1) {
                    cur = words.slice(i).join(' ');
                    break;
                }
                cur = words[i];
            } else {
                cur = test;
            }
        }
        lines.push(cur);
        for (var j = 0; j < lines.length; j++) {
            lines[j] = ellipsize(ctx, lines[j], maxWidth);
        }
        return lines;
    }

    function roundRect(ctx, x, y, w, h, r) {
        if (typeof ctx.roundRect === 'function') {
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, r);
            return;
        }
        var rr = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + rr, y);
        ctx.lineTo(x + w - rr, y);
        ctx.arcTo(x + w, y, x + w, y + rr, rr);
        ctx.lineTo(x + w, y + h - rr);
        ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
        ctx.lineTo(x + rr, y + h);
        ctx.arcTo(x, y + h, x, y + h - rr, rr);
        ctx.lineTo(x, y + rr);
        ctx.arcTo(x, y, x + rr, y, rr);
        ctx.closePath();
    }

    function computeLayout() {
        var boxes = buildBoxes();
        var rows = buildRows(boxes.big, boxes.small);
        var rowHeightsSum = rows.reduce(function (s, r) { return s + r.height; }, 0);
        var rowGapSum = ROW_GAP * Math.max(0, rows.length - 1);
        var panelH = rowHeightsSum + rowGapSum;

        var totalW, totalH, photoRect, panelRect;
        var rowsLayout = [];

        if (!state.isPortrait) {
            var CARD_W = 660;
            totalW = CARD_W + 2 * PAD;
            var photoW = CARD_W;
            var photoH = CARD_W / state.ratio;
            photoRect = { x: PAD, y: PAD, w: photoW, h: photoH };

            var panelX = PAD;
            var panelY = PAD + photoH + PANEL_GAP;
            var panelW = CARD_W;

            var y = panelY;
            rows.forEach(function (row) {
                var n = row.boxes.length;
                var boxW = n > 0 ? (panelW - COL_GAP * (n - 1)) / n : panelW;
                var x = panelX;
                var positioned = row.boxes.map(function (b) {
                    var r = { x: x, y: y, w: boxW, h: row.height, value: b.value, label: b.label, big: b.big };
                    x += boxW + COL_GAP;
                    return r;
                });
                rowsLayout.push(positioned);
                y += row.height + ROW_GAP;
            });

            panelRect = { x: panelX, y: panelY, w: panelW, h: panelH };
            totalH = PAD + photoH + PANEL_GAP + panelH + PAD;
        } else {
            var PHOTO_W = 380, PANEL_W = 520, INNER_GAP = 24;
            totalW = PAD + PHOTO_W + INNER_GAP + PANEL_W + PAD;
            var photoH2 = PHOTO_W / state.ratio;
            photoRect = { x: PAD, y: PAD, w: PHOTO_W, h: photoH2 };

            var panelX2 = PAD + PHOTO_W + INNER_GAP;
            var panelY2 = PAD;
            var panelW2 = PANEL_W;

            var y2 = panelY2;
            rows.forEach(function (row) {
                var n = row.boxes.length;
                var boxW = n > 0 ? (panelW2 - COL_GAP * (n - 1)) / n : panelW2;
                var x = panelX2;
                var positioned = row.boxes.map(function (b) {
                    var r = { x: x, y: y2, w: boxW, h: row.height, value: b.value, label: b.label, big: b.big };
                    x += boxW + COL_GAP;
                    return r;
                });
                rowsLayout.push(positioned);
                y2 += row.height + ROW_GAP;
            });

            panelRect = { x: panelX2, y: panelY2, w: panelW2, h: panelH };
            var contentH = Math.max(photoH2, panelH);
            totalH = PAD + contentH + PAD;
        }

        return { totalW: totalW, totalH: totalH, photoRect: photoRect, panelRect: panelRect, rows: rowsLayout };
    }

    function render() {
        var ctx = canvas.getContext('2d');
        var layout = computeLayout();
        var totalW = layout.totalW, totalH = layout.totalH;
        var SCALE = 2048 / Math.max(totalW, totalH);

        canvas.width = Math.round(totalW * SCALE);
        canvas.height = Math.round(totalH * SCALE);
        canvas.style.width = totalW + 'px';
        ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);

        // 2. base fill
        ctx.fillStyle = '#0d0d0f';
        ctx.fillRect(0, 0, totalW, totalH);

        var hasPhoto = !!state.photoUrl && photoImg.complete && photoImg.naturalWidth > 0;

        // 3. blurred backdrop
        if (hasPhoto) {
            ctx.save();
            ctx.filter = 'blur(64px) saturate(1.5) brightness(0.82)';
            var natW = photoImg.naturalWidth, natH = photoImg.naturalHeight;
            var coverScale = Math.max(totalW / natW, totalH / natH) * 1.18;
            var dw = natW * coverScale, dh = natH * coverScale;
            var dx = (totalW - dw) / 2, dy = (totalH - dh) / 2;
            ctx.drawImage(photoImg, dx, dy, dw, dh);
            ctx.restore();
        }

        // 4. gradient overlay
        var grad = ctx.createLinearGradient(0, 0, 0, totalH);
        grad.addColorStop(0, 'rgba(10,10,14,.28)');
        grad.addColorStop(1, 'rgba(10,10,14,.46)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, totalW, totalH);

        // 5. photo frame
        var pr = layout.photoRect;

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.5)';
        ctx.shadowBlur = 70;
        ctx.shadowOffsetY = 24;
        ctx.fillStyle = '#000';
        roundRect(ctx, pr.x, pr.y, pr.w, pr.h, FRAME_R);
        ctx.fill();
        ctx.restore();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.save();
        roundRect(ctx, pr.x, pr.y, pr.w, pr.h, FRAME_R);
        ctx.clip();
        if (hasPhoto) {
            var natW2 = photoImg.naturalWidth, natH2 = photoImg.naturalHeight;
            var coverScale2 = Math.max(pr.w / natW2, pr.h / natH2);
            var dw2 = natW2 * coverScale2, dh2 = natH2 * coverScale2;
            var dx2 = pr.x + (pr.w - dw2) / 2, dy2 = pr.y + (pr.h - dh2) / 2;
            ctx.drawImage(photoImg, dx2, dy2, dw2, dh2);
        } else {
            ctx.fillStyle = 'rgba(255,255,255,.06)';
            ctx.fillRect(pr.x, pr.y, pr.w, pr.h);
        }
        ctx.restore();

        // 6. recipe name
        if (state.name && state.name.trim() !== '') {
            ctx.save();
            ctx.font = "600 22px " + FONT_FAMILY;
            ctx.fillStyle = '#fff';
            ctx.shadowColor = 'rgba(0,0,0,.55)';
            ctx.shadowBlur = 12;
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(state.name, pr.x + 22, pr.y + pr.h - 20);
            ctx.restore();
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }

        // 7. glass boxes
        layout.rows.forEach(function (row) {
            row.forEach(function (box) {
                ctx.save();
                roundRect(ctx, box.x, box.y, box.w, box.h, BOX_R);
                ctx.fillStyle = 'rgba(255,255,255,0.10)';
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                ctx.stroke();

                ctx.save();
                roundRect(ctx, box.x, box.y, box.w, box.h, BOX_R);
                ctx.clip();

                var valueSize = box.big ? 26 : 20;
                var labelSize = box.big ? 13 : 11;
                var subSize = box.big ? 12 : 10;
                var padLeft = box.big ? 20 : 15;
                var padTop = box.big ? 14 : 10;
                var textX = box.x + padLeft;
                var maxTextW = box.w - padLeft * 2;

                // setting name — top-left, wraps to 2 lines when too long
                ctx.textBaseline = 'top';
                ctx.font = '500 ' + labelSize + 'px ' + FONT_FAMILY;
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                var nameLines = wrapLines(ctx, box.label, maxTextW, 2);
                var nameLineH = labelSize + 3;
                nameLines.forEach(function (line, i) {
                    ctx.fillText(line, textX, box.y + padTop + i * nameLineH);
                });

                // setting value — vertically centered, left-aligned
                if (box.sub) {
                    // value on the main line, sub (e.g. WB shift) as a small line under it
                    var subGap = 4;
                    var blockH = valueSize + subGap + subSize;
                    var blockTop = box.y + (box.h - blockH) / 2;
                    ctx.textBaseline = 'top';
                    ctx.font = '600 ' + valueSize + 'px ' + FONT_FAMILY;
                    ctx.fillStyle = '#fff';
                    ctx.fillText(box.value, textX, blockTop);
                    ctx.font = '500 ' + subSize + 'px ' + FONT_FAMILY;
                    ctx.fillStyle = 'rgba(255,255,255,0.6)';
                    ctx.fillText(box.sub, textX, blockTop + valueSize + subGap);
                } else {
                    ctx.textBaseline = 'middle';
                    ctx.font = '600 ' + valueSize + 'px ' + FONT_FAMILY;
                    ctx.fillStyle = '#fff';
                    ctx.fillText(box.value, textX, box.y + box.h / 2);
                }

                ctx.restore();
                ctx.restore();
            });
        });
    }

    // ---------------------------------------------------------------
    // 4.9 Generate & Save
    // ---------------------------------------------------------------
    function slugify(s) {
        return String(s)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function downloadCanvas() {
        render();
        var filename = (state.name && state.name.trim() !== '' ? slugify(state.name) : 'film-recipe') + '.png';

        if (typeof canvas.toBlob === 'function') {
            canvas.toBlob(function (blob) {
                if (!blob) return;
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/png');
        } else {
            var a2 = document.createElement('a');
            a2.href = canvas.toDataURL('image/png');
            a2.download = filename;
            document.body.appendChild(a2);
            a2.click();
            document.body.removeChild(a2);
        }
    }

    // ---------------------------------------------------------------
    // 4.10 Tab switching
    // ---------------------------------------------------------------
    function wireTabs() {
        var tabLinks = document.querySelectorAll('.tab-link');
        tabLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                tabLinks.forEach(function (l) { l.classList.remove('active'); });
                var panes = document.querySelectorAll('.tab-pane');
                panes.forEach(function (p) { p.classList.remove('active'); });

                link.classList.add('active');
                var paneId = link.getAttribute('data-pane');
                var pane = paneId ? document.getElementById(paneId) : null;
                if (pane) {
                    pane.classList.add('active');
                    if (pane.querySelector('#recipe-canvas')) render();
                }
            });
        });
    }

    // ---------------------------------------------------------------
    // 4.11 Init sequence
    // ---------------------------------------------------------------
    buildForm();

    var uploadBtn = document.getElementById('recipe-upload-btn');
    var fileInput = document.getElementById('recipe-file');
    var previewWrap = document.getElementById('recipe-preview-wrap');
    var saveBtn = document.getElementById('recipe-save-btn');

    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', function () {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (fileInput.files && fileInput.files[0]) {
                ingest(fileInput.files[0]);
            }
            fileInput.value = '';
        });
    }

    if (previewWrap) {
        previewWrap.addEventListener('dragover', function (e) {
            e.preventDefault();
            previewWrap.classList.add('dragover');
        });
        previewWrap.addEventListener('dragleave', function () {
            previewWrap.classList.remove('dragover');
        });
        previewWrap.addEventListener('drop', function (e) {
            e.preventDefault();
            previewWrap.classList.remove('dragover');
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
                ingest(e.dataTransfer.files[0]);
            }
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', downloadCanvas);
    }

    wireTabs();
    loadPhotoThenRender();

    // Re-render once Google Sans Code is loaded so the card doesn't paint with a fallback font.
    if (document.fonts && document.fonts.load) {
        Promise.all([
            document.fonts.load('600 26px "Google Sans Code"'),
            document.fonts.load('500 13px "Google Sans Code"')
        ]).then(function () { render(); }).catch(function () {});
    }
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', main);
if (typeof module !== 'undefined' && module.exports) module.exports = { parseExif: parseExif, exifToRecipeFields: exifToRecipeFields };
