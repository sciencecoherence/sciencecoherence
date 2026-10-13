/* ==========================================================================
   THE HOUSE — doors, dense linking, mystery blocks, rooms, secrets, the map.
   Reads assets/house-registry.js (what exists) and assets/glossary.js (what
   the words mean), plus the Temporal Matrix and protocol data when a page
   has them. Everything a visitor finds is remembered in their own browser
   only (localStorage 'sc-house-found').
   Public: SCHouse.gloss(root?), .openTerm(id, anchor?), .openRoom(id),
           .openMap(), .doorOpen(id), .find(id, label)
   ========================================================================== */
(function () {
  'use strict';
  const REG = window.SC_HOUSE || { doors: {}, rooms: {}, secrets: { words: {} }, gloss: {}, map: {}, links: [] };
  const PAGE = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  const PREVIEW = new URLSearchParams(location.search).get('doors') === 'all';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const pad = n => String(n).padStart(2, '0');

  /* ---------- what has been found ---------- */
  const KEY = 'sc-house-found';
  let found = new Set();
  try { found = new Set(JSON.parse(localStorage.getItem(KEY)) || []); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...found])); } catch (e) {} };
  function find(id, label, quiet) {
    if (found.has(id)) return false;
    found.add(id); save(); glyphCount();
    if (!quiet) toast(label || id);
    return true;
  }
  const doorOpen = id => PREVIEW || !!(REG.doors[id] && REG.doors[id].on);

  /* ---------- layers ---------- */
  const layer = document.createElement('div');
  layer.className = 'house-layer';
  layer.innerHTML = '<div class="house-cards" id="house-cards"></div><div class="house-toast" id="house-toast" role="status" aria-live="polite"></div>';
  document.body.appendChild(layer);
  let toastT;
  function toast(label) {
    const t = $('#house-toast');
    t.innerHTML = `<b>✧</b> Found · ${esc(label)}<small>${found.size} in the house</small>`;
    t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3200);
  }

  /* ---------- the Matrix, loaded if a page does not carry it ---------- */
  let enginePromise = null;
  function engine() {
    if (window.SCMatrix) return Promise.resolve(window.SCMatrix);
    if (!enginePromise) enginePromise = new Promise(res => { const s = document.createElement('script'); s.src = 'assets/matrix-engine.js'; s.onload = () => res(window.SCMatrix); s.onerror = () => res(null); document.head.appendChild(s); });
    return enginePromise;
  }
  function reading(M, t) { if (M.CAL360.longitude === null) M.CAL360.longitude = -new Date().getTimezoneOffset() / 4; return M.cal360(t || new Date()); }

  /* ---------- the glossary: static + what this page carries ---------- */
  const TERMS = new Map();
  function addTerm(t) { if (!t || !t.id || TERMS.has(t.id)) return; TERMS.set(t.id, t); }
  (window.SC_GLOSSARY && window.SC_GLOSSARY.terms || []).forEach(addTerm);
  function runtimeTerms() {
    const M = window.SCMatrix, P = window.SCProtocol;
    if (M && M.SIGNS) {
      M.SIGNS.forEach(S => addTerm({ id: 'sign-' + slug(S.name), term: S.name, category: 'Time wave · ' + S.epithet, aliases: [S.name], case: true,
        motto: S.motto, desc: S.text, accent: S.accent, glyph: S.glyph,
        meta: `${S.dates} date${S.dates === 1 ? '' : 's'} · number ${S.number}${S.gate ? ' · a gate' : ''} · ${M.TIDES[S.tide].name}`,
        extra: [['Gift', S.gift], ['Shadow', S.shadow]], link: ['temporal-matrix.html', 'Open the Temporal Matrix'] }));
      (M.TIDES || []).forEach(T => addTerm({ id: 'tide-' + slug(T.name), term: T.name, category: 'Tide of the year', aliases: [T.name], case: true, desc: T.text, accent: T.accent }));
      (M.CAL360.days || []).forEach((D, i) => addTerm({ id: 'day-' + slug(D.name), term: D.name, category: 'Day · ' + D.epithet, aliases: [D.name], case: true,
        motto: D.verb, desc: D.text, accent: D.accent, glyph: D.glyph, meta: `Day ${i + 1} of the six-date week`, extra: [['Gift', D.gift], ['Shadow', D.shadow]] }));
      addTerm({ id: 'page-temporal-matrix', term: 'The Temporal Matrix', category: 'An instrument', aliases: ['Temporal Matrix'], case: true,
        desc: 'The calendar and clock of the framework: a year of τ* Matrix dates divided by nineteen signs, six-date weeks, and a dilated day anchored to the sun.',
        link: ['temporal-matrix.html', 'Open the Temporal Matrix'] });
    }
    if (P && P.WINDOWS) {
      P.WINDOWS.forEach(w => {
        const ph = w.phase ? P.PHASES[w.phase] : null;
        const hours = w.end > w.start ? `${hm(w.start)}–${hm(w.end)}` : hm(w.start);
        const al = [w.name.replace(/^The /, '')]; if (ph) al.push(ph.title);
        addTerm({ id: 'window-' + w.id, term: w.name, category: 'The protocol day · ' + hours, aliases: al, case: w.name === 'OMAD',
          desc: ph ? (ph.vehicle ? `${ph.vehicleLabel}: ${ph.vehicle}.` : '') + (ph.note ? ' ' + ph.note : '') : w.text, accent: w.accent,
          link: [PAGE === 'protocol-matrix.html' ? '#w-' + w.id : 'protocol-matrix.html#w-' + w.id, 'See it on the day'] });
      });
    }
    /* words a page brings with it (a document's own lexicon) */
    (window.SC_EXTRA_TERMS || []).forEach(addTerm);
    /* the articles, on a page that carries the library's content */
    (window.SC_CONTENT || []).forEach(a => {
      if (a.id === 'calendar-360' || !a.title) return;
      const hiddenSec = (window.SC_SECTIONS || []).some(s => s.id === a.category && s.hidden);
      if (hiddenSec) return;
      const short = a.title.split(':')[0].trim();
      addTerm({ id: 'read-' + a.id, term: a.title, category: 'In the library · ' + a.type, aliases: short !== a.title && short.length > 6 ? [a.title, short] : [a.title], case: true,
        motto: a.subtitle || '', desc: a.description, meta: `${a.minutes || ''} min · ${a.date || ''}`,
        link: [(PAGE === 'library.html' ? '' : 'library.html') + '#/read/' + a.id, 'Read it'] });
    });
    buildMatchers();
  }
  const hm = h => { const m = Math.round(((h % 24) + 24) % 24 * 60); return pad(Math.floor(m / 60) % 24) + ':' + pad(m % 60); };

  let RX_CI = null, RX_CS = null, MAP_CI = new Map(), MAP_CS = new Map();
  function buildMatchers() {
    const ci = [], cs = [];
    MAP_CI = new Map(); MAP_CS = new Map();
    TERMS.forEach(t => (t.aliases || [t.term]).forEach(a => {
      if (!a || a.length < 2) return;
      if (t.case) { if (!MAP_CS.has(a)) { MAP_CS.set(a, t.id); cs.push(a); } }
      else { const k = a.toLowerCase(); if (!MAP_CI.has(k)) { MAP_CI.set(k, t.id); ci.push(a); } }
    }));
    const rx = (list, flags) => list.length ? new RegExp('(?<![\\p{L}\\p{N}])(' + list.sort((a, b) => b.length - a.length).map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![\\p{L}\\p{N}])', flags) : null;
    RX_CI = rx(ci, 'giu'); RX_CS = rx(cs, 'gu');
  }

  /* ---------- dense linking ---------- */
  const SKIP = 'a,button,code,pre,script,style,textarea,input,select,option,label,svg,canvas,h1,h2,h3,h4,h5,thead,.katex,.katex-display,.formula,.gl,.no-gloss,.dose,.tag,.card-kicker,.kicker-small,.phase-num,.when,.hc,.house-layer,.house-room,.house-map';
  const SECTION = '.chapter, .phase, .card, article, li, .wd, .mystery, .hc, section, .col';
  function glossNode(root, exclude) {
    if (!RX_CI && !RX_CS) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (!n.nodeValue.trim() || n.nodeValue.includes('$') || (n.parentElement && n.parentElement.closest(SKIP))) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    const seen = new WeakMap();
    nodes.forEach(node => {
      const text = node.nodeValue, hits = [];
      [[RX_CI, MAP_CI, true], [RX_CS, MAP_CS, false]].forEach(([rx, map, lower]) => {
        if (!rx) return; rx.lastIndex = 0; let m;
        while ((m = rx.exec(text))) { const id = map.get(lower ? m[1].toLowerCase() : m[1]); if (id && id !== exclude) hits.push({ i: m.index, j: m.index + m[1].length, id }); }
      });
      if (!hits.length) return;
      hits.sort((a, b) => a.i - b.i || (b.j - b.i) - (a.j - a.i));
      const sec = (node.parentElement && node.parentElement.closest(SECTION)) || root;
      let used = seen.get(sec); if (!used) { used = new Set(); seen.set(sec, used); }
      const frag = document.createDocumentFragment(); let pos = 0, any = false;
      hits.forEach(h => {
        if (h.i < pos || used.has(h.id)) return;
        used.add(h.id); any = true;
        frag.appendChild(document.createTextNode(text.slice(pos, h.i)));
        const span = document.createElement('span');
        span.className = 'gl'; span.dataset.term = h.id; span.tabIndex = 0; span.setAttribute('role', 'button');
        span.textContent = text.slice(h.i, h.j);
        frag.appendChild(span); pos = h.j;
      });
      if (!any) return;
      frag.appendChild(document.createTextNode(text.slice(pos)));
      node.parentNode.replaceChild(frag, node);
    });
  }
  function gloss(root, exclude) {
    const sels = REG.gloss[PAGE] || [];
    if (root) { glossNode(root, exclude); return; }
    sels.forEach(sel => $$(sel).forEach(el => glossNode(el)));
  }

  /* ---------- math, when a definition carries a formula ---------- */
  let katexP = null;
  function katex() {
    if (window.katex) return Promise.resolve(window.katex);
    if (!katexP) katexP = new Promise(res => {
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'assets/vendor/katex/katex.min.css'; document.head.appendChild(l);
      const s = document.createElement('script'); s.src = 'assets/vendor/katex/katex.min.js'; s.onload = () => res(window.katex); s.onerror = () => res(null); document.head.appendChild(s);
    });
    return katexP;
  }
  function mathInto(el, tex) { katex().then(K => { if (!K) { el.textContent = tex; return; } try { el.innerHTML = K.renderToString(tex, { throwOnError: false, displayMode: true }); } catch (e) { el.textContent = tex; } }); }
  function inlineMath(el) {
    if (!el.textContent.includes('$')) return;
    katex().then(K => {
      if (!K) return;
      el.innerHTML = el.innerHTML.replace(/\$([^$]+)\$/g, (m, tex) => { try { return K.renderToString(tex.replace(/&amp;/g, '&'), { throwOnError: false }); } catch (e) { return m; } });
      glossNode(el, el.dataset.self);
    });
  }

  /* ---------- the cards ---------- */
  const cards = [];                    // stack of { el, id, level, anchor, pinned }
  let closeT = null;
  function accentOf(t) { return t.accent ? `var(--${t.accent})` : 'var(--lime)'; }
  function entryHTML(t, full) {
    const extra = (t.extra || []).filter(x => x[1]).map(x => `<span><b>${esc(x[0])}</b> ${esc(x[1])}</span>`).join('');
    return `<div class="hc-k">${t.glyph ? `<i>${esc(t.glyph)}</i> ` : ''}${esc(t.category || '')}</div>
      <div class="hc-h" data-scramble>${esc(t.term)}</div>
      ${t.motto ? `<div class="hc-m">${esc(t.motto)}</div>` : ''}
      ${t.formula ? `<div class="hc-f" data-tex="${esc(t.formula)}"></div>` : ''}
      <div class="hc-p" data-self="${esc(t.id)}">${esc(t.desc || '')}</div>
      ${extra ? `<div class="hc-x">${extra}</div>` : ''}
      ${t.meta ? `<div class="hc-meta">${esc(t.meta)}</div>` : ''}`;
  }
  function hydrate(el, t) {
    const f = $('.hc-f', el); if (f) mathInto(f, f.dataset.tex);
    const p = $('.hc-p', el); if (p) { glossNode(p, t.id); inlineMath(p); }
    const h = $('[data-scramble]', el); if (h) scramble(h);
  }
  function openCard(id, anchor, pinned) {
    const t = TERMS.get(id); if (!t) return;
    const inCard = anchor && anchor.closest('.hc');
    const level = inCard ? (+inCard.dataset.level + 1) : 0;
    closeFrom(level);
    const el = document.createElement('div');
    el.className = 'hc'; el.dataset.level = level; el.style.setProperty('--c', accentOf(t)); el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', t.term);
    el.innerHTML = entryHTML(t) + `<div class="hc-a"><button type="button" data-act="unfold">Unfold here ↓</button>${t.link ? `<a href="${esc(t.link[0])}">${esc(t.link[1])} →</a>` : ''}</div>`;
    $('#house-cards').appendChild(el);
    hydrate(el, t);
    place(el, anchor);
    requestAnimationFrame(() => el.classList.add('on'));
    cards.push({ el, id, level, anchor, pinned: !!pinned });
    if (anchor) anchor.classList.add('gl-open');
    el.addEventListener('mouseenter', () => clearTimeout(closeT));
    el.addEventListener('mouseleave', () => { if (!cards.some(c => c.pinned)) scheduleClose(level); });
    $('[data-act="unfold"]', el).addEventListener('click', () => { const a = cards[0] && cards[0].anchor; closeFrom(0); unfold(id, anchor && !anchor.closest('.hc') ? anchor : a); });
    find('term:' + id, t.term);
  }
  function place(el, anchor) {
    const w = Math.min(360, innerWidth - 24);
    el.style.width = w + 'px';
    if (!anchor) { el.style.left = (innerWidth - w) / 2 + 'px'; el.style.top = '18vh'; return; }
    const r = anchor.getBoundingClientRect(), h = el.offsetHeight;
    let x = Math.min(innerWidth - w - 12, Math.max(12, r.left + r.width / 2 - w / 2));
    let y = r.bottom + 10; if (y + h > innerHeight - 12 && r.top - h - 10 > 12) y = r.top - h - 10;
    el.style.left = x + 'px'; el.style.top = Math.max(12, Math.min(y, innerHeight - h - 12)) + 'px';
  }
  function closeFrom(level) {
    for (let i = cards.length - 1; i >= 0; i--) if (cards[i].level >= level) {
      const c = cards[i]; c.el.classList.remove('on'); setTimeout(() => c.el.remove(), 250);
      if (c.anchor) c.anchor.classList.remove('gl-open'); cards.splice(i, 1);
    }
  }
  function scheduleClose(level) { clearTimeout(closeT); closeT = setTimeout(() => closeFrom(level), 380); }
  let hoverT = null;
  document.addEventListener('mouseover', e => {
    const g = e.target.closest && e.target.closest('.gl'); if (!g || matchMedia('(hover: none)').matches) return;
    clearTimeout(closeT); clearTimeout(hoverT);
    hoverT = setTimeout(() => { if (!cards.some(c => c.anchor === g)) openCard(g.dataset.term, g, false); }, 260);
  });
  document.addEventListener('mouseout', e => {
    const g = e.target.closest && e.target.closest('.gl'); if (!g) return;
    clearTimeout(hoverT);
    const c = cards.find(c => c.anchor === g); if (c && !c.pinned) scheduleClose(c.level);
  });
  document.addEventListener('click', e => {
    const g = e.target.closest('.gl');
    if (g) { e.preventDefault(); const c = cards.find(c => c.anchor === g); if (c) c.pinned = true; else openCard(g.dataset.term, g, true); return; }
    if (!e.target.closest('.hc')) closeFrom(0);
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('gl')) { e.preventDefault(); openCard(e.target.dataset.term, e.target, true); }
    if (e.key === 'Escape') { if (cards.length) closeFrom(cards[cards.length - 1].level); else if (roomOpen) closeRoom(); else if (mapOpen) closeMap(); else if (mysteries.length) fold(mysteries[mysteries.length - 1]); }
  });
  addEventListener('scroll', () => { if (cards.length && !cards.some(c => c.pinned)) closeFrom(0); }, { passive: true });

  /* ---------- unfolding: a mystery block opens in the page itself ---------- */
  function unfold(id, anchor) {
    const t = TERMS.get(id); if (!t) return;
    // unfold only into the flowing text; a door outside it (a caption, a dial, a card) unfolds at the start of the reading
    const flows = (REG.gloss[PAGE] || []).map(sel => $$(sel)).flat();
    const inFlow = el => el && flows.some(f => f.contains(el));
    let host = anchor && anchor.closest('.table-scroll, p, li, .card, .phase, .wd, .mystery, .read');
    if (!inFlow(host)) host = null;
    if (!host && flows.length) { const f = flows[0]; host = f.firstElementChild || f; }
    const existing = document.querySelector(`.mystery[data-term="${CSS.escape(id)}"]`);
    if (existing) { existing.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); existing.classList.remove('flash'); void existing.offsetWidth; existing.classList.add('flash'); return; }
    const rel = related(t);
    const box = document.createElement('div');
    box.className = 'mystery'; box.dataset.term = id; box.style.setProperty('--c', accentOf(t));
    box.innerHTML = `<div class="my-in"><div class="my-body"><button type="button" class="my-x" aria-label="Fold away">×</button>${entryHTML(t, true)}
      ${rel.length ? `<div class="my-rel"><b>Threads</b>${rel.map(r => `<span class="gl" tabindex="0" role="button" data-term="${esc(r.id)}">${esc(r.term)}</span>`).join('')}</div>` : ''}
      ${t.link ? `<a class="my-link" href="${esc(t.link[0])}">${esc(t.link[1])} →</a>` : ''}</div></div>`;
    if (host) host.insertAdjacentElement('afterend', box); else (document.querySelector('main') || document.body).appendChild(box);
    hydrate(box, t);
    requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add('open')));
    $('.my-x', box).addEventListener('click', () => fold(box));
    mysteries.push(box);
    setTimeout(() => { const r = box.getBoundingClientRect(); if (r.bottom > innerHeight || r.top < 90) box.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }, 450);
  }
  const mysteries = [];
  function fold(box) { const i = mysteries.indexOf(box); if (i >= 0) mysteries.splice(i, 1); box.classList.remove('open'); setTimeout(() => box.remove(), 700); }
  function related(t) {
    const out = [], seen = new Set([t.id]);
    const text = (t.desc || '') + ' ' + (t.motto || '');
    [[RX_CI, MAP_CI, true], [RX_CS, MAP_CS, false]].forEach(([rx, map, lower]) => { if (!rx) return; rx.lastIndex = 0; let m; while ((m = rx.exec(text))) { const id = map.get(lower ? m[1].toLowerCase() : m[1]); if (id && !seen.has(id)) { seen.add(id); out.push(TERMS.get(id)); } } });
    TERMS.forEach(x => { if (out.length < 7 && !seen.has(x.id) && x.category && t.category && x.category.split(' · ')[0] === t.category.split(' · ')[0]) { seen.add(x.id); out.push(x); } });
    return out.slice(0, 7);
  }

  /* ---------- a word decodes itself ---------- */
  const GLYPHS = '∇ΦΛΩΔτ◇△□○≈—01ψξ∞';
  function scramble(el) {
    if (reduce) return;
    const final = el.textContent; let f = 0; const N = 18;
    const step = () => {
      f++;
      el.textContent = final.split('').map((ch, i) => ch === ' ' || i < (f / N) * final.length ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('');
      if (f < N) setTimeout(step, 28); else el.textContent = final;
    };
    step();
  }

  /* ---------- rooms ---------- */
  let roomOpen = null, roomTimer = null;
  const roomEl = document.createElement('div');
  roomEl.className = 'house-room'; roomEl.hidden = true; roomEl.setAttribute('role', 'dialog'); roomEl.setAttribute('aria-modal', 'true');
  roomEl.innerHTML = '<div class="hr-veil"></div><div class="hr-panel"><button type="button" class="hr-x" aria-label="Leave the room">×</button><div class="hr-in"></div></div>';
  document.body.appendChild(roomEl);
  roomEl.querySelector('.hr-veil').addEventListener('click', () => closeRoom());
  roomEl.querySelector('.hr-x').addEventListener('click', () => closeRoom());
  function lockOpen(lock, M, t) {
    if (!lock) return true;
    if (!M) return false;
    const r = reading(M, t);
    if (lock.hours) { const h = r.phi * 24; return h >= lock.hours[0] && h < lock.hours[1]; }
    if (lock.weekday !== undefined) return r.weekday === lock.weekday;
    if (lock.gate) return !!(M.SIGNS[r.sign] && M.SIGNS[r.sign].gate);
    return true;
  }
  function nextOpening(lock, M) {
    const now = Date.now();
    for (let k = 1; k <= 144 * 800; k++) {
      const t = new Date(now + k * 600000);
      if (lockOpen(lock, M, t)) return t;
      if (k > 144 * 60 && !lock.gate) break;
    }
    return null;
  }
  const dur = ms => { const m = Math.round(ms / 60000), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60); return d ? `${d} d ${h} h` : h ? `${h} h ${pad(m % 60)} m` : `${m} min`; };
  function openRoom(id) {
    const R = REG.rooms[id]; if (!R) return;
    engine().then(M => {
      const open = lockOpen(R.lock, M);
      const inner = roomEl.querySelector('.hr-in');
      roomEl.style.setProperty('--c', R.accent ? `var(--${R.accent})` : 'var(--lime)');
      let body = '';
      if (!open) {
        const at = M ? nextOpening(R.lock, M) : null;
        body = `<div class="hr-lock"><div class="hr-sigil" aria-hidden="true"></div><p>${esc(R.closed || 'This room is closed.')}</p>${at ? `<p class="hr-when">It opens in <b data-at="${at.getTime()}">${dur(at - Date.now())}</b> · ${at.toLocaleString(undefined, { weekday: 'long', hour: '2-digit', minute: '2-digit' })}</p>` : ''}<p class="hr-small">Return then. The door stays where you found it.</p></div>`;
      } else body = roomBody(R, M);
      inner.innerHTML = `<p class="hr-k">${esc(R.kicker || '')}</p><h2 class="hr-h" data-scramble>${esc(R.title)}</h2><div class="hr-b">${body}</div>`;
      roomEl.hidden = false; document.documentElement.classList.add('house-lock');
      requestAnimationFrame(() => roomEl.classList.add('on'));
      scramble(inner.querySelector('.hr-h'));
      if (open) { glossNode(inner.querySelector('.hr-b')); find('room:' + id, R.title); }
      roomOpen = id;
      clearInterval(roomTimer);
      roomTimer = setInterval(() => { const b = inner.querySelector('[data-at]'); if (b) b.textContent = dur(+b.dataset.at - Date.now()); }, 30000);
      setTimeout(() => roomEl.querySelector('.hr-x').focus(), 60);
    });
  }
  function roomBody(R, M) {
    if (R.html) return `<div class="hr-doc">${R.html}</div>`;
    if (R.source === 'recursion') return recursionHTML();
    if (R.source && R.source.startsWith('day:') && M) {
      const D = M.CAL360.days[+R.source.slice(4)];
      return `<p class="hr-motto">${esc(D.epithet)} · <i>${esc(D.verb)}</i></p><p>${esc(D.text)}</p><p class="hr-gs"><b>Gift</b> ${esc(D.gift)} · <b>Shadow</b> ${esc(D.shadow)}</p>`;
    }
    if (R.source === 'sign:now' && M) {
      const r = reading(M), S = M.SIGNS[r.sign];
      return `<p class="hr-motto"><span class="hr-glyph">${esc(S.glyph)}</span> ${esc(S.name)} · ${esc(S.epithet)}</p><p class="hr-quote">${esc(S.motto)}</p><p>${esc(S.text)}</p><p class="hr-gs"><b>Gift</b> ${esc(S.gift)} · <b>Shadow</b> ${esc(S.shadow)}</p><p class="hr-small">${S.dates} date${S.dates === 1 ? '' : 's'} · number ${S.number} · ${esc(M.TIDES[S.tide].name)}</p>`;
    }
    return '';
  }
  function recursionHTML() {
    const G = window.SC_GLOSSARY || { terms: [], recursion: { edges: [] } };
    const nodes = ['canon-nabla-phi', 'canon-lambda', 'canon-omega', 'canon-delta'].map(id => G.terms.find(t => t.id === id)).filter(Boolean);
    const pos = { '∇Φ': [60, 150], 'Λ': [180, 50], 'Ω': [300, 150], 'Δ': [180, 250] };
    const sym = t => t.aliases[0];
    const arrow = (a, b, kind, k) => {
      const [x1, y1] = pos[a], [x2, y2] = pos[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      const sx = x1 + ux * 30, sy = y1 + uy * 30, ex = x2 - ux * 34, ey = y2 - uy * 34;
      const bend = kind === 'closure' ? 36 : 0, mx = (sx + ex) / 2 - uy * bend, my = (sy + ey) / 2 + ux * bend;
      return `<path class="rc-${kind}" d="M${sx},${sy} Q${mx},${my} ${ex},${ey}" marker-end="url(#rc-head)" style="animation-delay:${k * .0}s"/>`;
    };
    const svg = `<svg class="rc" viewBox="0 0 360 300" role="img" aria-label="The recursion: imagination to selection to rendering to recursive persistence, with the closures Δ to Λ and Ω to ∇Φ, all at once">
      <defs><marker id="rc-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="currentColor"/></marker></defs>
      ${G.recursion.edges.map((e, k) => arrow(e.from, e.to, e.kind, k)).join('')}
      ${nodes.map(t => { const [x, y] = pos[sym(t)]; return `<g class="rc-n"><circle cx="${x}" cy="${y}" r="27"/><text x="${x}" y="${y + 7}" text-anchor="middle">${esc(sym(t))}</text></g>`; }).join('')}
    </svg>`;
    return `${svg}<ul class="hr-nodes">${nodes.map(t => `<li><b>${esc(sym(t))}</b> <i>${esc(t.aliases[1])}</i> — ${esc(t.desc)}</li>`).join('')}</ul>
      <ul class="hr-nodes">${G.recursion.edges.filter(e => e.note).map(e => `<li><b>${esc(e.from)} → ${esc(e.to)}</b> ${esc(e.note)}.</li>`).join('')}</ul>
      <p class="hr-small">${esc(G.recursion.note)}</p>`;
  }
  function closeRoom() {
    roomEl.classList.remove('on'); document.documentElement.classList.remove('house-lock'); clearInterval(roomTimer);
    setTimeout(() => { roomEl.hidden = true; }, 500); roomOpen = null;
  }

  /* ---------- where a door leads ---------- */
  function go(to, anchor) {
    if (!to) return;
    if (to.startsWith('room:')) openRoom(to.slice(5));
    else if (to.startsWith('term:')) openCard(to.slice(5), anchor || null, true);
    else location.href = to;
  }

  /* ---------- doors ---------- */
  function doors() {
    $$('[data-door]').forEach(el => {
      const id = el.dataset.door;
      if (!doorOpen(id)) { el.removeAttribute('href'); el.setAttribute('tabindex', '-1'); el.classList.add('door-off'); return; }
      el.addEventListener('click', () => find('door:' + id, (REG.doors[id] && REG.doors[id].where) || id, true));
    });
    // doors this file draws itself
    if (REG.doors['watch-star'] && REG.doors['watch-star'].page === PAGE && doorOpen('watch-star')) watchStar();
    if (REG.doors.stilla && REG.doors.stilla.page === PAGE && doorOpen('stilla')) stillaDoor();
    // word doors: one phrase in the text quietly leads elsewhere
    Object.keys(REG.doors).forEach(id => { const d = REG.doors[id]; if (d.word && d.page === PAGE && doorOpen(id)) wordDoor(id, d); });
    if (REG.doors.boundary && REG.doors.boundary.page === PAGE && doorOpen('boundary')) holdDoor('.holo-cap', 'boundary');
  }
  function watchStar() {
    const s = document.createElement('button');
    s.type = 'button'; s.className = 'house-star'; s.setAttribute('aria-label', 'A star');
    document.body.appendChild(s);
    const tick = () => engine().then(M => {
      const h = M ? reading(M).phi * 24 : new Date().getHours();
      s.classList.toggle('lit', h >= 20 || h < 5);
    });
    tick(); setInterval(tick, 30000);
    s.addEventListener('click', () => { find('door:watch-star', 'One star, by night'); openRoom('watch'); });
  }
  function stillaDoor() {
    const host = $('#r-day') && $('#r-day').closest('.read'); if (!host) return;
    const tick = () => engine().then(M => { host.classList.toggle('house-stilla', !!M && reading(M).weekday === 5); });
    tick(); setInterval(tick, 60000);
    host.addEventListener('click', () => { if (host.classList.contains('house-stilla')) { find('door:stilla', 'The lived day, on Stilla'); openRoom('stilla'); } });
  }
  function wordDoor(id, d) {
    const scope = $(d.within || 'body'); if (!scope) return;
    const want = d.word.toLowerCase();
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('a, button, .katex, .gl, h1, h2, h3, thead, script, style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    let n; while ((n = walker.nextNode())) {
      const i = n.nodeValue.toLowerCase().indexOf(want); if (i < 0) continue;
      const tail = n.splitText(i); tail.splitText(d.word.length);
      const a = document.createElement('a');
      a.className = 'door-word'; a.href = d.to; a.dataset.door = id; a.textContent = tail.nodeValue;
      a.addEventListener('click', () => find('door:' + id, d.where, true));
      tail.parentNode.replaceChild(a, tail);
      return;
    }
  }
  function holdDoor(sel, id) {
    const el = $(sel); if (!el) return;
    el.style.pointerEvents = 'auto'; el.classList.add('house-hold');
    let t = null;
    const start = () => { el.classList.add('holding'); t = setTimeout(() => { el.classList.remove('holding'); find('door:' + id, REG.doors[id].where); go(REG.doors[id].to, el); }, 1600); };
    const stop = () => { el.classList.remove('holding'); clearTimeout(t); };
    el.addEventListener('pointerenter', start); el.addEventListener('pointerleave', stop);
    el.addEventListener('touchstart', start, { passive: true }); el.addEventListener('touchend', stop);
  }

  /* ---------- secrets: words typed anywhere ---------- */
  let typed = '';
  addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    const k = e.key.toLowerCase();
    if (k === 'm') {
      const inWord = Object.keys(REG.secrets.words).some(w => { for (let i = 0; i <= typed.length; i++) if (w.startsWith(typed.slice(i) + 'm') && typed.slice(i)) return true; return false; });
      if (!inWord) { typed = ''; mapOpen ? closeMap() : openMap(); return; }
    }
    typed = (typed + k).slice(-16);
    for (const w of Object.keys(REG.secrets.words)) if (typed.endsWith(w)) { typed = ''; find('secret:' + w, `the word “${w}”`); go(REG.secrets.words[w]); break; }
  });

  /* ---------- the map ---------- */
  let mapOpen = false;
  const mapEl = document.createElement('div');
  mapEl.className = 'house-map'; mapEl.hidden = true; mapEl.setAttribute('role', 'dialog'); mapEl.setAttribute('aria-label', 'The map of the house');
  document.body.appendChild(mapEl);
  const glyph = document.createElement('button');
  glyph.type = 'button'; glyph.className = 'house-glyph'; glyph.setAttribute('aria-label', 'The map of the house');
  if (PAGE !== 'index.html') document.body.appendChild(glyph);
  glyph.addEventListener('click', () => openMap());
  function glyphCount() { glyph.innerHTML = `✧ <span>${found.size}</span>`; }
  function totals() {
    const pages = Object.keys(REG.map).filter(k => k.startsWith('page:')).length;
    const rooms = Object.keys(REG.rooms).length;
    const drs = Object.keys(REG.doors).filter(k => REG.doors[k].on).length;
    const secrets = Object.keys(REG.secrets.words).length;
    return pages + rooms + drs + secrets + TERMS.size;
  }
  function openMap() {
    const terms = [...TERMS.values()], foundTerms = terms.filter(t => found.has('term:' + t.id));
    const nodes = Object.entries(REG.map);
    const lit = id => id === 'lexicon' ? foundTerms.length > 0 : found.has(id);
    const edges = REG.links.map(([a, b]) => {
      const A = REG.map[a], B = REG.map[b]; if (!A || !B) return '';
      const la = lit(a), lb = lit(b); if (!la && !lb) return '';
      return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" class="${la && lb ? 'lit' : 'half'}"/>`;
    }).join('');
    const dots = terms.map((t, i) => {
      const a = i * 2.39996, r = 2.2 + Math.sqrt(i) * 1.15, L = REG.map.lexicon || { x: 10, y: 14 };
      return `<span class="hm-t${found.has('term:' + t.id) ? ' on' : ''}" style="left:${L.x + Math.cos(a) * r * .75}%;top:${L.y + Math.sin(a) * r}%;--d:${(i % 9) * .3}s" ${found.has('term:' + t.id) ? `data-term="${esc(t.id)}" title="${esc(t.term)}"` : ''}></span>`;
    }).join('');
    mapEl.innerHTML = `<div class="hm-veil"></div><div class="hm-panel">
      <button type="button" class="hr-x" aria-label="Close the map">×</button>
      <header><p class="hr-k">The house</p><h2>${found.size} <span>of ${totals()} found</span></h2></header>
      <div class="hm-field"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${edges}</svg>${dots}
        ${nodes.map(([id, n], i) => {
          const on = lit(id);
          const label = id === 'lexicon' ? `${n.label} · ${foundTerms.length}/${terms.length}` : n.label;
          return `<button type="button" class="hm-n${on ? ' on' : ''}${id === 'page:' + PAGE ? ' here' : ''}" style="left:${n.x}%;top:${n.y}%;--d:${i * .08}s" data-node="${esc(id)}" ${on ? '' : 'tabindex="-1" aria-label="Not yet found"'}><i></i><span>${on ? esc(label) : '?'}</span></button>`;
        }).join('')}
      </div>
      <footer><span>What you find is remembered in this browser only.</span><button type="button" class="hm-forget">Forget what I found</button></footer></div>`;
    mapEl.hidden = false; mapOpen = true; document.documentElement.classList.add('house-lock');
    requestAnimationFrame(() => mapEl.classList.add('on'));
    mapEl.querySelector('.hm-veil').addEventListener('click', closeMap);
    mapEl.querySelector('.hr-x').addEventListener('click', closeMap);
    mapEl.querySelector('.hm-forget').addEventListener('click', () => { found = new Set(['page:' + PAGE]); save(); glyphCount(); closeMap(); setTimeout(openMap, 520); });
    mapEl.querySelectorAll('.hm-n.on').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.node;
      if (id.startsWith('page:')) { location.href = id.slice(5); return; }
      if (id.startsWith('room:')) { closeMap(); setTimeout(() => openRoom(id.slice(5)), 300); return; }
      if (id === 'lexicon') { const t = foundTerms[foundTerms.length - 1]; if (t) openCard(t.id, b, true); }
    }));
    mapEl.querySelectorAll('.hm-t.on').forEach(d => d.addEventListener('click', () => openCard(d.dataset.term, d, true)));
    find('map', 'The map', true);
    setTimeout(() => mapEl.querySelector('.hr-x').focus(), 60);
  }
  function closeMap() {
    mapOpen = false; mapEl.classList.remove('on'); document.documentElement.classList.remove('house-lock'); closeFrom(0);
    setTimeout(() => { mapEl.hidden = true; }, 500);
  }

  /* ---------- run ---------- */
  function start() {
    runtimeTerms();
    find('page:' + PAGE, (REG.map['page:' + PAGE] || {}).label || PAGE, true);
    glyphCount();
    doors();
    if (!window.SC_GLOSS_DEFER) setTimeout(() => gloss(), 400);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  window.SCHouse = { gloss, openTerm: (id, a) => openCard(id, a || null, true), openRoom, openMap, doorOpen, find, terms: TERMS, unfold };
})();
