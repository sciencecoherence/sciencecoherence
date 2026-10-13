/* ==========================================================================
   The Protocol — the full document in the new site's design.
   Content: documents.js (rebuilt from documents/holographic-repolymerization.html,
   never hand-edited). The same script renders any operating document: the
   page names it with <body data-doc="…"> (default: the repolymerization). Dose scaler, lexicon, pacer and math are carried from the
   original website's app.js. New here: continuous chapters, the index rail,
   reveals, and the Master Protocol ring that follows the reading.
   ========================================================================== */
(function () {
  'use strict';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pluralize = (n, one, many) => n + ' ' + (n === 1 ? one : many);
  const store = {
    get(key, fallback) { try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DOC_ID = document.body.dataset.doc || 'holographic-repolymerization';
  const MAIN = DOC_ID === 'holographic-repolymerization';
  const doc = (window.SC_DOCUMENTS || []).find(d => d.id === DOC_ID);
  if (!doc) { $('#doc').innerHTML = '<div class="wrap"><p>The document could not be loaded.</p></div>'; return; }
  const P = window.SCProtocol;

  /* links written for the old website's router, read here */
  const has = id => doc.sections.some(s => s.id === id);
  const relink = html => html
    .replace(/href="#\/protocol\/([\w-]+)"/g, (m, id) => `href="#${has(id) ? id : id === 'protocol' && has('master-protocol') ? 'master-protocol' : id}"`)
    .replace(/href="#\/protocol"/g, 'href="#protocol"')
    .replace(/href="#\/read\/calendar-360"/g, 'href="temporal-matrix.html"')
    .replace(/href="#meditation"/g, 'href="protocol-matrix.html#mind"');

  /* emphasis written as *markdown* in some sources */
  const emph = html => MAIN ? html : html.split(/(\$\$[\s\S]*?\$\$|\$[^$]*\$|<[^>]+>)/).map((part, i) => i % 2 ? part
    : part.replace(/(^|[^\w*])\*([^*\n]+?)\*(?![\w*])/g, '$1<em>$2</em>').replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')).join('');
  doc.sections.forEach(s => { s.html = emph(s.html); });

  /* the agents of a lexicon table become words the house can explain */
  if (!MAIN) {
    const lex = doc.sections.find(s => s.id === 'lexicon');
    if (lex) {
      const box = document.createElement('div'); box.innerHTML = lex.html;
      const clean = t => t.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      window.SC_EXTRA_TERMS = [...box.querySelectorAll('tbody tr')].map(tr => {
        const th = tr.querySelector('th'), td = [...tr.querySelectorAll('td')].map(x => clean(x.innerHTML));
        if (!th) return null;
        const full = clean(th.innerHTML), latin = [...th.innerHTML.matchAll(/<em>([^<]+)<\/em>/g)].map(m => m[1].trim());
        const name = full.replace(/\s*\(.*\)\s*$/, '').trim();
        const aliases = [name, ...latin.filter(l => l.length > 5 && !/^[A-Z]\.\s/.test(l))];
        return { id: 'agent-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), term: full, category: 'Agent · the lexicon', aliases, case: false,
          accent: th.dataset.accent || 'teal', motto: td[0] || '', desc: td[2] || '', meta: td[1] || '', link: ['#lexicon', 'Open the lexicon'] };
      }).filter(Boolean);
    }
  }

  /* ---------- render ---------- */
  const overview = doc.sections.find(s => s.id === 'overview');
  /* The meditation lives on the protocol monitor (protocol-matrix.html). */
  const secs = doc.sections.filter(s => s.id !== 'overview' && s.id !== 'meditation');
  $('#h-eyebrow').textContent = `${doc.type} · Version ${doc.version}`;
  $('#h-sub').textContent = doc.subtitle || '';
  $('#h-meta').textContent = `Dr. William Conroy · ${secs.length} sections`;

  const chapter = (s, i) => {
    const num = String(s.num).padStart(2, '0');
    const ring = MAIN && s.id === 'protocol';
    const body = `<div class="body">${relink(s.html)}</div>`;
    return `<section class="chapter" id="${s.id}" data-label="${escapeHTML(s.label)}">
      <span class="ch-big" aria-hidden="true">${num}</span>
      <div class="wrap">
        <header class="ch-head reveal"><p class="ch-num">${num} · ${escapeHTML(s.label)}</p><h2>${s.title}</h2><p>${s.summary}</p></header>
        ${ring ? `<div class="with-ring"><div class="ring-pane" aria-hidden="true"><canvas id="dayring"></canvas><div class="ring-cap" id="ring-cap"><div class="k"></div><div class="h"></div><div class="t"></div></div></div>${body}</div>` : body}
      </div></section>`;
  };
  $('#doc').innerHTML =
    (overview ? `<section class="chapter" id="overview" data-label="Overview"><div class="wrap"><div class="body">${!MAIN && doc.facts ? `<dl class="doc-facts">${doc.facts.map(f => `<div><dt>${escapeHTML(f.label)}</dt><dd>${escapeHTML(f.value)}</dd></div>`).join('')}</dl>` : ''}${relink(overview.html)}${!MAIN && doc.note ? `<aside class="callout doc-note"><p>${escapeHTML(doc.note)}</p></aside>` : ''}</div></div></section>` : '') +
    secs.map(chapter).join('');
  $('#rail').innerHTML = secs.map(s => `<a href="#${s.id}" data-id="${s.id}"><i>${String(s.num).padStart(2, '0')}</i><span>${escapeHTML(s.label)}</span></a>`).join('');

  const root = $('#doc');
  /* the windows of a daily protocol can be named in an address: #w1, #w2 … */
  if (!MAIN) $$('#master-protocol article.phase', root).forEach((a, i) => { if (!a.id) a.id = 'w' + (i + 1); });
  const toHash = () => { const el = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1))); if (el) { $$('.reveal', el).concat(el.classList.contains('reveal') ? [el] : []).forEach(x => x.classList.add('in')); el.scrollIntoView(); } };

  /* ---------- dose scaler ---------- */
  const scaler = $('#weight-scaler', root);
  if (scaler) {
    const format = v => Number.isInteger(v) ? String(v) : (Math.round(v * 10) / 10).toString();
    scaler.addEventListener('change', () => {
      const mult = parseFloat(scaler.value);
      $$('.dose', root).forEach(el => {
        const min = parseFloat(el.dataset.min) * mult, max = parseFloat(el.dataset.max) * mult, unit = el.dataset.unit || 'mg';
        el.textContent = (min === max ? format(min) : format(min) + '–' + format(max)) + ' ' + unit;
        el.classList.toggle('scaled', mult !== 1);
      });
      const label = scaler.options[scaler.selectedIndex].textContent;
      $('#dose-note').textContent = mult === 1 ? 'Doses shown at the standard scale.' : `Doses scaled ×${mult} for ${label.toLowerCase()}.`;
    });
  }

  /* ---------- lexicon ---------- */
  if (doc.lexicon && $('#lexicon-grid', root)) {
    const grid = $('#lexicon-grid', root);
    grid.innerHTML = doc.lexicon.map((item, idx) => `<article class="lex-card" data-idx="${idx}" data-search="${escapeHTML((item.term + ' ' + item.category + ' ' + item.desc).toLowerCase())}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="${escapeHTML(item.term)}: click to view details"><span class="tag">${escapeHTML(item.category)}</span><h4>${escapeHTML(item.term)}</h4><div class="formula">$$${item.formula}$$</div></article>`).join('');
    const count = () => { const n = $$('.lex-card', grid).filter(c => !c.hidden).length; $('#lexicon-count').textContent = pluralize(n, 'term', 'terms'); };
    $('#lexicon-search', root).addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      $$('.lex-card', grid).forEach(c => { c.hidden = !!q && !c.dataset.search.includes(q); });
      count();
    });
    count();
    const open = card => { const item = doc.lexicon[card.dataset.idx]; if (item) openLexiconModal(item); };
    grid.addEventListener('click', e => { const c = e.target.closest('.lex-card'); if (c) open(c); });
    grid.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const c = e.target.closest('.lex-card'); if (c) { e.preventDefault(); open(c); } } });
  }

  /* KaTeX, loaded on demand from the vendored copy */
  let katexPromise = null;
  function loadKatex() {
    if (window.renderMathInElement) return Promise.resolve();
    if (katexPromise) return katexPromise;
    const base = 'assets/vendor/katex/';
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = base + 'katex.min.css'; document.head.appendChild(css);
    const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.defer = true; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
    katexPromise = load(base + 'katex.min.js').then(() => load(base + 'contrib/auto-render.min.js'));
    return katexPromise;
  }
  function renderMath(root) {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(root, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\(', right: '\\)', display: false }, { left: '$', right: '$', display: false }], throwOnError: false, ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option'] });
  }

  /* lexicon dialog */
  function closeLexModal() {
    const dlg = $('#lexicon-dialog');
    if (!dlg || !dlg.open) return;
    dlg.classList.add('closing');
    const onEnd = () => { dlg.classList.remove('closing'); dlg.removeEventListener('animationend', onEnd); if (dlg.open) dlg.close(); };
    dlg.addEventListener('animationend', onEnd);
    setTimeout(onEnd, 220);
  }
  function openLexiconModal(item) {
    const dlg = $('#lexicon-dialog');
    if (!dlg || !item) return;
    $('#lex-dialog-category').textContent = item.category;
    $('#lex-dialog-term').textContent = item.term;
    $('#lex-dialog-formula').innerHTML = `$$${item.formula}$$`;
    $('#lex-dialog-desc').innerHTML = `<p>${item.desc}</p>`;
    loadKatex().then(() => renderMath(dlg)).catch(() => {});
    dlg.classList.remove('closing');
    dlg.showModal();
  }
  $('#lex-dialog-close').addEventListener('click', closeLexModal);
  $('#lexicon-dialog').addEventListener('cancel', e => { e.preventDefault(); closeLexModal(); });
  $('#lexicon-dialog').addEventListener('click', e => { if (e.target === e.currentTarget) closeLexModal(); });

  const glossNow = () => { if (window.SCHouse) window.SCHouse.gloss(); else addEventListener('load', () => window.SCHouse && window.SCHouse.gloss()); };
  loadKatex().then(() => renderMath(root)).catch(() => {}).then(glossNow).then(() => { if (location.hash) requestAnimationFrame(toHash); });

  /* ---------- the Master Protocol ring follows the reading ---------- */
  const W = id => P.WINDOWS.find(w => w.id === id);
  const hm = h => { const m = Math.round(((h % 24) + 24) % 24 * 60); return String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
  const range = ids => { const ws = ids.map(W).filter(Boolean); const a = ws[0]; const b = ws.reduce((m, w) => Math.max(m, w.end), 0); return a.end > a.start || ws.length > 1 ? `${hm(a.start)}–${hm(b)}` : hm(a.start); };
  const RULES = [
    { test: el => el.matches('.doc-toolbar'), focus: 'all', k: 'The 24-hour architecture', h: 'Two sleeps, one meal, one rhythm', t: 'Hours read on the Temporal Matrix clock · noon is peak sun' },
    { test: el => /2\.0 The 24-Hour/.test(el.textContent.slice(0, 200)), focus: 'all', k: 'The 24-hour architecture', h: 'An engineered cycle entrained to the sun', t: 'Sleep · fast · train · eat · reset' },
    { test: el => /Why Biphasic Sleep/.test(el.textContent.slice(0, 200)), focus: ['sleep1', 'sleep2'], h: 'Biphasic sleep' },
    { test: el => /Inter-Sleep Interval/.test(el.textContent.slice(0, 200)), focus: ['watch'], h: 'The watch' },
    { test: el => /Coconut Oil Does Not Break/.test(el.textContent.slice(0, 200)), focus: ['vehicle'], h: 'The coconut-oil vehicle' },
    { test: el => /Fasted Resistance Training/.test(el.textContent.slice(0, 200)), focus: ['train', 'post', 'omad', 'cutoff'], h: 'Fasted training, then the meal' },
    { test: el => el.matches('article.phase') && /Awakening Elixir/.test(el.textContent), focus: ['vehicle'] },
    { test: el => el.matches('article.phase') && /Pre-Workout Hydration/.test(el.textContent), focus: ['pre', 'train'] },
    { test: el => el.matches('article.phase') && /Post-Workout Hydration/.test(el.textContent), focus: ['post'] },
    { test: el => el.matches('article.phase') && /OMAD/.test(el.textContent), focus: ['omad', 'cutoff'] },
    { test: el => el.matches('article.phase') && /Bedtime Somatic Reset/.test(el.textContent), focus: ['evening'] },
    { test: el => el.matches('article.phase') && /Pulsed Strata/.test(el.textContent), focus: 'beyond', k: 'Cyclic strata', h: 'Outside the day', t: 'Weekly and monthly cadences, set out in the text' },
    { test: el => /whole-brain rotation/.test(el.textContent.slice(0, 200)), focus: 'beyond', k: 'Cyclic strata', h: 'Outside the day', t: 'A weekly rotation' },
    { test: el => el.matches('article.phase') && el.id === 'optional-strata', focus: 'beyond', k: 'As needed', h: 'Outside the daily rhythm', t: 'Deployed on demand, not on the clock' }
  ];
  const master = $('#protocol .body');
  const blocks = [];
  if (master) {
    const cand = [];
    [...master.children].forEach(el => { if (el.matches('.card-grid')) cand.push(...el.children); cand.push(el); });
    cand.forEach(el => {
      const r = RULES.find(x => x.test(el));
      if (!r || blocks.some(b => b.el.contains(el) && b.el !== el && !b.el.matches('.card-grid'))) return;
      if (el.matches('.card-grid') && r.focus !== 'beyond') return;   // its cards carry the focus
      const f = r.focus;
      let cap;
      if (Array.isArray(f)) {
        const w0 = W(f[0]), ph = w0.phase ? P.PHASES[w0.phase] : null;
        cap = { k: `${ph ? ph.label : w0.short} · ${range(f)}`, h: r.h || (ph ? ph.title : w0.name), t: ph && ph.vehicle ? `${ph.vehicleLabel} · ${ph.vehicle}` : (w0.text || ''), acc: w0.accent };
      } else cap = { k: r.k, h: r.h, t: r.t, acc: f === 'beyond' ? 'violet' : null };
      blocks.push({ el, focus: f, cap });
    });
  }
  let current = -1;
  function setCap(c) {
    const box = $('#ring-cap'); if (!box) return;
    box.classList.add('swap');
    setTimeout(() => {
      box.querySelector('.k').textContent = c.k || ''; box.querySelector('.h').textContent = c.h || ''; box.querySelector('.t').textContent = c.t || '';
      box.style.setProperty('--acc', c.acc ? `var(--${c.acc})` : 'var(--ink-faint)');
      box.classList.remove('swap');
    }, reduce ? 0 : 220);
  }
  function follow() {
    if (!blocks.length || !window.SCDayRing) return;
    const line = innerHeight * .45;
    let idx = 0;
    blocks.forEach((b, i) => { if (b.el.getBoundingClientRect().top < line) idx = i; });
    if (idx !== current) { current = idx; window.SCDayRing.focus(blocks[idx].focus); setCap(blocks[idx].cap); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    if (window.SCDayRing) {
      window.SCDayRing.onPick(id => {
        const b = blocks.find(x => Array.isArray(x.focus) && x.el.matches('article.phase') && x.focus.includes(id)) || blocks.find(x => Array.isArray(x.focus) && x.focus.includes(id));
        if (b) b.el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
      follow();
    }
  });

  /* ---------- rail, kicker, progress, reveals ---------- */
  const chapters = $$('.chapter[id]').filter(c => c.id !== 'overview');
  let onId = null;
  function onScroll() {
    const h = document.documentElement;
    $('#progress').style.width = (100 * scrollY / Math.max(1, h.scrollHeight - innerHeight)) + '%';
    document.body.classList.toggle('scrolled', scrollY > 40);
    document.body.classList.toggle('reading', scrollY > innerHeight * .8);
    let id = null;
    chapters.forEach(c => { if (c.getBoundingClientRect().top < innerHeight * .4) id = c.id; });
    if (id !== onId) {
      onId = id;
      $$('#rail a').forEach(a => a.classList.toggle('on', a.dataset.id === id));
      const c = id && $('#' + id);
      $('#k-sec').textContent = c ? ' · ' + c.dataset.label : '';
    }
    follow();
  }
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } }, { passive: true });
  addEventListener('resize', onScroll);
  $$('.chapter .body > *').forEach(el => el.classList.add('reveal'));
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('in'));
  onScroll();

  /* ---------- theme ---------- */
  $('#theme').addEventListener('click', () => {
    const t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
    store.set('sc-theme', t);
  });
})();
