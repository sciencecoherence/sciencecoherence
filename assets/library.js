/* ==========================================================================
   The Library — every article of the site, in the new design.
   Content: content.js (articles), sections.js, collections.js and pages.js,
   the same files the Writing Room edits. Nothing here changes them.
   Routes (hash, the old site's own, so every existing link keeps working):
     #/                      the shelves
     #/research[/<coll>]     a section or collection shelf
     #/lab  #/transmissions  a section
     #/kept                  what the reader has kept
     #/read/<id>[/<h2 id>]   the reader
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = s => String(s).replace(/<[^>]+>/g, ' ').replace(/\$\$[^$]*\$\$|\$[^$]*\$/g, ' ').replace(/\s+/g, ' ').trim();
  const fmtDate = s => new Date(s + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const pad2 = n => String(n).padStart(2, '0');
  const store = {
    get(k, f) { try { const v = localStorage.getItem(k); return v === null ? f : JSON.parse(v); } catch (e) { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const byNum = (a, b) => String(a.num).localeCompare(String(b.num), undefined, { numeric: true });
  const newest = (a, b) => b.date.localeCompare(a.date);

  /* ---------- the content ---------- */
  const SECTIONS = (window.SC_SECTIONS || []).slice().sort(byNum);
  const COLLECTIONS = (window.SC_COLLECTIONS || []).slice().sort(byNum);
  const ARTICLES = (window.SC_CONTENT || []).map(a => ({ ...a, raw: strip(a.body), plain: strip(a.body).toLowerCase(), minutes: a.minutes || Math.max(1, Math.round(strip(a.body).split(' ').length / 220)) }));
  const PAGE_COPY = new Map((window.SC_PAGES || []).flatMap(p => (p.fields || []).map(f => [p.id + ' ' + f.key, f.value])));
  const copy = (page, key, fallback) => { const v = PAGE_COPY.get(page + ' ' + key); return typeof v === 'string' && v.trim() ? v : fallback; };
  const section = id => SECTIONS.find(s => s.id === id);
  const collectionOf = a => a && a.collection ? COLLECTIONS.find(c => c.id === a.collection && c.section === a.category) : null;
  const byId = id => ARTICLES.find(a => a.id === id);
  const hidden = a => !!(section(a.category) || {}).hidden;
  const listed = () => ARTICLES.filter(a => !hidden(a));
  function collectionItems(c) {
    const order = c.order || [];
    const rank = a => { const i = order.indexOf(a.id); return i < 0 ? Infinity : i; };
    return listed().filter(a => a.category === c.section && a.collection === c.id).sort((a, b) => rank(a) - rank(b) || newest(a, b));
  }
  const sectionItems = id => listed().filter(a => a.category === id && !collectionOf(a)).sort(id === 'transmissions' ? newest : (a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));

  /* The Temporal Matrix article describes the old 360-date instrument; the
     instrument itself now lives on its own page. */
  const LIVE = { 'calendar-360': 'temporal-matrix.html' };
  const link = id => LIVE[id] || '#/read/' + id;

  /* colours: a collection takes the accent of its own authored architecture
     (pages.js), a section its own, a piece its tone */
  const VAR = { teal: 'var(--teal)', amber: 'var(--amber)', blue: 'var(--blue)', violet: 'var(--violet)', rose: 'var(--rose)', green: 'var(--green)', lime: 'var(--lime)' };
  const TONE = { forest: 'green', sage: 'teal', ochre: 'amber', emerald: 'green' };
  const SECTION_ACC = { research: 'lime', lab: 'rose', transmissions: 'violet', protocol: 'teal', regenesis: 'green', learning: 'blue' };
  function collAcc(c) {
    const body = copy('research', `stratum.${c.id}.body`, '');
    const m = body.match(/data-accent="(\w+)"/);
    return (m && VAR[m[1]]) ? m[1] : ({ framework: 'teal', philosophy: 'violet', 'meta-mathematics': 'blue', biophysic: 'green', 'notes-methods': 'amber' }[c.id] || 'lime');
  }
  const accOf = a => { const c = collectionOf(a); return c ? collAcc(c) : (SECTION_ACC[a.category] || TONE[a.tone] || 'lime'); };

  /* ---------- the kept list ---------- */
  let kept = store.get('sc-kept', []);
  if (!Array.isArray(kept)) kept = [];
  const isKept = id => kept.includes(id);
  function toggleKept(id) { kept = isKept(id) ? kept.filter(x => x !== id) : kept.concat(id); store.set('sc-kept', kept); $('#kept-n').textContent = kept.length; }

  /* ---------- the hero ---------- */
  $('#h-eyebrow').textContent = copy('library', 'hero.eyebrow', 'Library');
  const hTitle = copy('library', 'hero.title', 'A place for every thread.');
  { const m = hTitle.match(/^(.*?)(\S+\s+\S+\.?)$/); $('#lib-title').innerHTML = m ? `${esc(m[1])}<em>${esc(m[2])}</em>` : esc(hTitle); }
  $('#h-sub').textContent = copy('library', 'hero.text', 'Frameworks, the operating document, experiments and notes. Browse by collection, or search the full text.');
  const totalWords = listed().reduce((s, a) => s + (a.words || strip(a.body).split(' ').length), 0);
  $('#h-meta').textContent = `${listed().length} pieces · ${COLLECTIONS.filter(c => c.section === 'research').length} collections · ${Math.round(totalWords / 1000)}k words · Dr. William Conroy`;

  /* ---------- cards and rows ---------- */
  function card(a, i) {
    const acc = accOf(a), live = !!LIVE[a.id];
    return `<a class="bk reveal${live ? ' live' : ''}" href="${link(a.id)}" style="--a:${VAR[acc]};transition-delay:${Math.min(i, 6) * 60}ms" data-id="${esc(a.id)}">`
      + `<div class="ty"><span>${esc(live ? 'Instrument · live' : a.type)}</span><span>${a.minutes} min</span></div>`
      + `<h4>${esc(a.title)}</h4>${a.subtitle ? `<p class="st">${esc(a.subtitle)}</p>` : ''}<p class="d">${esc(a.description)}</p>`
      + `<div class="ft"><span>${fmtDate(a.date)}</span><i aria-hidden="true">${live ? 'Open ↗' : 'Read →'}</i></div>${isKept(a.id) ? '<span class="kept" title="Kept">✦</span>' : ''}</a>`;
  }
  const door = (href, ty, title, text, acc, cls = '') => `<a class="bk door reveal ${cls}" href="${href}" style="--a:${VAR[acc]}"><div class="ty"><span>${esc(ty)}</span><span>page</span></div><h4>${esc(title)}</h4><p class="d">${esc(text)}</p><div class="ft"><span>${esc(href)}</span><i aria-hidden="true">Open ↗</i></div></a>`;
  function whereOf(a) { const c = collectionOf(a), s = section(a.category); return c ? `${s ? s.short : ''} · ${c.num} ${c.name}` : (s ? s.short : a.category); }
  function row(a, i, q) {
    return `<a class="row" href="${link(a.id)}" style="--a:${VAR[accOf(a)]}"><span class="n">${pad2(i + 1)}</span><div><h4>${esc(a.title)}${isKept(a.id) ? ' <span style="color:var(--a);font-size:.6em">✦</span>' : ''}</h4><p>${q ? snippet(a, q) : esc(a.description)}</p>`
      + `<div class="m">${esc(a.type)} · ${esc(whereOf(a))} · ${fmtDate(a.date)} · ${a.minutes} min</div></div><span class="go" aria-hidden="true">→</span></a>`;
  }
  function snippet(a, q) {
    const t = a.plain, i = t.indexOf(q);
    if (i < 0) return esc(a.description);
    const s = Math.max(0, i - 70), e = Math.min(t.length, i + q.length + 110);
    const src = a.raw.length === t.length ? a.raw : t, raw = (s ? '…' : '') + src.slice(s, e) + (e < t.length ? '…' : '');
    return esc(raw).replace(new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => `<mark>${m}</mark>`);
  }

  /* ---------- the shelves ---------- */
  const unhref = h => h.startsWith('#/protocol') ? 'protocol.html' : (LIVE[(h.match(/^#\/read\/([^/]+)/) || [])[1]] || h);
  function arch(page, key, label) {
    let body = copy(page, key, '');
    if (!body) return '';
    body = body.replace(/<div class="cal"[\s\S]*$/, '');                // the old 360 widget is not carried
    return `<details class="arch"><summary>${esc(label)}</summary><div class="arch-body" data-math>${body}</div></details>`;
  }
  function shelves() {
    let h = '';
    SECTIONS.filter(s => !s.hidden).forEach(s => {
      const acc = SECTION_ACC[s.id] || 'lime';
      h += `<section class="section" id="s-${s.id}" data-label="${esc(s.short)}" style="--a:${VAR[acc]}"><span class="big" aria-hidden="true">${esc(s.num)}</span>`
        + `<header class="s-head reveal"><p class="s-num">${esc(s.num)} · ${esc(s.short)}</p><h2>${esc(s.name)}</h2><p>${esc(s.intro || s.description)}</p>${s.label ? `<p class="lbl">${esc(s.label)}</p>` : ''}</header>`;
      if (s.id === 'research') {
        COLLECTIONS.filter(c => c.section === 'research').forEach(c => {
          const items = collectionItems(c), ca = collAcc(c);
          const kick = copy('research', `stratum.${c.id}.kicker`, ''), ttl = copy('research', `stratum.${c.id}.title`, '');
          h += `<div class="shelf" id="c-${c.id}" data-label="${esc(c.name)}" style="--a:${VAR[ca]}"><div class="shelf-head reveal"><span class="n">${esc(c.num)}</span><h3>${esc(c.name)}</h3>`
            + `<p class="tl">${esc(kick || c.tagline || '')}</p><p class="ds">${esc(c.description)}</p></div>`
            + (items.length ? `<div class="cards">${items.map(card).join('')}</div>` : `<p class="empty-shelf reveal">${esc(c.id === 'biophysic' ? copy('research', 'biophysic.empty', 'Nothing on this shelf yet.') : copy('research', 'empty.title', 'Work in this area is in progress.'))}</p>`)
            + arch('research', `stratum.${c.id}.body`, ttl ? `The architecture · ${ttl}` : 'The architecture of this collection')
            + ((c.connected || []).length ? `<div class="connected"><span>Connected</span>${c.connected.map(x => `<a class="pill" href="${esc(unhref(x.href))}">${esc(x.name)}</a>`).join('')}</div>` : '')
            + `</div>`;
        });
      } else if (s.id === 'protocol') {
        h += `<div class="cards">`
          + door('protocol.html', 'Operating document', 'Holographic Cosmic Repolymerization', 'The full operating document: holographic biophysics, the master protocol, epigenetic repolymerization, biophysics and shielding, and the lexicon.', 'teal')
          + door('protocol-matrix.html', 'The day, live', 'The protocol on the Matrix clock', 'The daily architecture, window by window, on the live clock: what is open now, what comes next, and the mind recoding engine.', 'amber')
          + door('protocol-pathogen.html', 'Operating document', 'Pathogen Elimination & Tissue Regeneration', 'The 21-agent cleanse: biofilm and pathogen biophysics, the four daily windows, the four-tier metal drainage cascade, titration, compounding and the botanical lexicon.', 'rose')
          + door('compounds.html', 'Compound library', 'The Regenesis Compounds', 'Twenty-three compounds and the sleep architecture, read through the five nested layers and placed on the Protocol’s day: substrate, extracts, synergy, interactions and a monograph for each.', 'green')
          + door('temporal-matrix.html', 'Instrument · live', 'The Temporal Matrix', 'The calendar and clock that give the protocol its rhythm: τ* dates, nineteen signs, six-date weeks and a day anchored to the sun.', 'violet', 'live')
          + `</div>`;
      } else {
        const items = sectionItems(s.id);
        h += `<div class="shelf" data-label="${esc(s.short)}" style="--a:${VAR[acc]}">` + (items.length ? `<div class="cards">${items.map(card).join('')}</div>` : `<p class="empty-shelf">Nothing here yet.</p>`);
        if (s.id === 'lab') {
          [['method', 'The experimental method'], ['cohera', 'The minimal Cohera loop'], ['records', 'The experimental record']].forEach(([k, l]) => {
            const t = copy('lab', `track.${k}.title`, l);
            h += arch('lab', `track.${k}.body`, `Track · ${t}`);
          });
        }
        h += `</div>`;
      }
      h += `</section>`;
    });
    return h;
  }

  /* ---------- the catalogue: search, filters, order ---------- */
  const S = { q: '', type: 'all', place: 'all', sort: 'shelves', kept: false };
  const TYPES = [...new Set(listed().map(a => a.type))].sort((a, b) => a.localeCompare(b));
  function buildControls() {
    $('#place').innerHTML = `<option value="all">Every collection</option>` + SECTIONS.filter(s => !s.hidden && s.acceptsArticles !== false).map(s => {
      const cols = COLLECTIONS.filter(c => c.section === s.id);
      return cols.length ? `<optgroup label="${esc(s.name)}"><option value="section:${s.id}">All of ${esc(s.short)}</option>${cols.map(c => `<option value="collection:${c.id}">${esc(c.num)} ${esc(c.name)}</option>`).join('')}</optgroup>`
        : `<option value="section:${s.id}">${esc(s.name)}</option>`;
    }).join('');
    $('#types').innerHTML = `<button class="pill" type="button" data-type="all" aria-pressed="true">Every type</button>` + TYPES.map(t => `<button class="pill" type="button" data-type="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join('');
    $('#kept-n').textContent = kept.length;
    $('#q').addEventListener('input', e => { S.q = e.target.value; update(); });
    $('#place').addEventListener('change', e => { S.place = e.target.value; update(); });
    $('#sort').addEventListener('change', e => { S.sort = e.target.value; update(); });
    $('#kept-btn').addEventListener('click', () => { S.kept = !S.kept; update(); });
    $$('#types [data-type]').forEach(b => b.addEventListener('click', () => { S.type = b.dataset.type; update(); }));
    addEventListener('keydown', e => {
      if (e.key === '/' && !e.target.closest('input, textarea, select, [contenteditable]') && !$('#library-view').hidden) { e.preventDefault(); $('#catalogue').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); setTimeout(() => $('#q').focus({ preventScroll: true }), reduce ? 0 : 450); }
    });
  }
  const inPlace = (a, p) => { if (p === 'all') return true; const [k, id] = p.split(':'); return k === 'section' ? a.category === id : a.collection === id && !!collectionOf(a); };
  const shelfRank = (() => { const order = []; SECTIONS.forEach(s => { COLLECTIONS.filter(c => c.section === s.id).forEach(c => collectionItems(c).forEach(a => order.push(a.id))); ARTICLES.filter(a => a.category === s.id && !collectionOf(a)).sort(newest).forEach(a => order.push(a.id)); }); return id => { const i = order.indexOf(id); return i < 0 ? 999 : i; }; })();
  function update() {
    $$('#types [data-type]').forEach(b => b.setAttribute('aria-pressed', b.dataset.type === S.type));
    $('#kept-btn').setAttribute('aria-pressed', S.kept);
    $('#place').value = S.place; $('#sort').value = S.sort;
    const q = S.q.toLowerCase().trim();
    const plain = !q && S.type === 'all' && S.place === 'all' && S.sort === 'shelves' && !S.kept;
    $('#shelves').hidden = !plain; $('#results').hidden = plain;
    if (plain) { $('#count').textContent = `${listed().length} pieces on the shelves · press / to search`; return; }
    const pool = S.place.startsWith('section:') && section(S.place.slice(8)) && section(S.place.slice(8)).hidden ? ARTICLES : listed();
    let items = pool.filter(a => (S.type === 'all' || a.type === S.type) && inPlace(a, S.place) && (!S.kept || isKept(a.id)) && (!q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.plain.includes(q)));
    const score = a => !q ? 0 : (a.title.toLowerCase().includes(q) ? 6 : 0) + (a.description.toLowerCase().includes(q) ? 3 : 0) + 1;
    const sorts = { shelves: (a, b) => (score(b) - score(a)) || shelfRank(a.id) - shelfRank(b.id), newest, oldest: (a, b) => a.date.localeCompare(b.date), title: (a, b) => a.title.localeCompare(b.title), length: (a, b) => b.minutes - a.minutes };
    items.sort(sorts[S.sort] || sorts.shelves);
    const [pk, pid] = S.place.split(':'), pc = pk === 'collection' ? COLLECTIONS.find(c => c.id === pid) : null, where = S.place === 'all' ? '' : ' · ' + (pc ? `${pc.num} ${pc.name}` : (section(pid) || {}).name || pid);
    $('#count').textContent = `${items.length} piece${items.length === 1 ? '' : 's'}${S.type !== 'all' ? ' · ' + S.type : ''}${where}${S.kept ? ' · kept' : ''}${q ? ` · “${S.q.trim()}”` : ''}`;
    $('#results').innerHTML = items.length ? `<div class="rows">${items.map((a, i) => row(a, i, q)).join('')}</div>`
      : `<div class="nothing"><h3>Nothing matches, yet.</h3><p>${S.kept ? 'Keep a piece with ✦ Keep in the reader and it will wait for you here.' : 'Try another word, type or collection.'}</p><button class="pill" type="button" id="clear">Clear the search</button></div>`;
    const cl = $('#clear'); if (cl) cl.addEventListener('click', clear);
  }
  function clear() { Object.assign(S, { q: '', type: 'all', place: 'all', sort: 'shelves', kept: false }); $('#q').value = ''; update(); }

  /* ---------- the reader ---------- */
  function prepare(a) {
    const box = document.createElement('div');
    box.innerHTML = a.body;
    box.querySelectorAll('[data-widget]').forEach(w => {                // an old interactive instrument: point to the live one
      const p = document.createElement('div'); p.className = 'instrument';
      p.innerHTML = `<div><b>The instrument is live</b>It now runs on its own page, rebuilt on the current engine.</div><a class="pill" href="${LIVE[a.id] || 'temporal-matrix.html'}">Open the Temporal Matrix ↗</a>`;
      w.replaceWith(p);
    });
    box.querySelectorAll('a[href]').forEach(x => {
      const h = x.getAttribute('href');
      if (h.startsWith('#/')) x.setAttribute('href', unhref(h));
      else if (/^https?:/.test(h)) { x.target = '_blank'; x.rel = 'noopener'; }
    });
    const toc = $$('h2', box).map((h, i) => {
      h.id = 'section-' + (i + 1);
      const f = h.firstChild, m = f && f.nodeType === 3 ? f.textContent.match(/^\s*(\d{1,2}|[IVXLC]{1,6})[.)]\s+/) : null;
      let num = '';
      if (m) { num = /^\d+$/.test(m[1]) ? pad2(m[1]) : m[1]; f.textContent = f.textContent.slice(m[0].length); const s = document.createElement('span'); s.className = 'h-num'; s.textContent = num; h.prepend(s); }
      return { id: h.id, num: num || '·', label: h.textContent.slice(num.length).trim() };
    });
    $$('p', box).forEach(p => { const t = p.innerHTML.trim(); if (/^\$\$[\s\S]+\$\$$/.test(t) && t.indexOf('$$', 2) === t.length - 2) { const d = document.createElement('div'); d.className = 'equation'; d.innerHTML = t; p.replaceWith(d); } });
    return { html: box.innerHTML, toc };
  }
  function neighbours(a) {
    const c = collectionOf(a);
    const list = c ? collectionItems(c) : (hidden(a) ? ARTICLES : listed()).filter(x => x.category === a.category && !collectionOf(x)).sort((x, y) => x.date.localeCompare(y.date));
    const i = list.findIndex(x => x.id === a.id);
    return { prev: list[i - 1], next: list[i + 1] };
  }
  function related(a) {
    // what it links to, what links to it, then its own shelf
    const out = [], add = x => { if (x && x.id !== a.id && !hidden(x) && !out.includes(x) && !LIVE[x.id]) out.push(x); };
    [...a.body.matchAll(/href="#\/read\/([^"/]+)/g)].forEach(m => add(byId(m[1])));
    ARTICLES.forEach(x => { if (x.body.includes(`#/read/${a.id}"`)) add(x); });
    const c = collectionOf(a);
    (c ? collectionItems(c) : listed().filter(x => x.category === a.category)).forEach(add);
    listed().sort(newest).forEach(x => { if (out.length < 3) add(x); });
    return out.slice(0, 3);
  }
  let current = null, spy = null, libScroll = 0;
  function showReader(a, sub) {
    if (current !== a.id) {
      if ($('#reader-view').hidden) libScroll = scrollY;
      renderReader(a);
    }
    $('#library-view').hidden = true; $('#reader-view').hidden = false;
    document.title = `${a.title} — Science Coherence`;
    const s = section(a.category); $('#k-sec').textContent = ' · ' + (s ? s.short : '');
    const target = sub && document.getElementById(sub);
    requestAnimationFrame(() => target ? target.scrollIntoView({ behavior: current === a.id && !reduce ? 'smooth' : 'auto' }) : (current !== a.id && scrollTo(0, 0)));
    current = a.id;
  }
  function renderReader(a) {
    const p = prepare(a), s = section(a.category), c = collectionOf(a), acc = accOf(a);
    const crumbs = `<nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Library</a><span class="sep">/</span>`
      + (s && !s.hidden ? `<a href="#/${s.id}">${esc(s.short)}</a>` : `<span>${esc(s ? s.short : a.category)}</span>`)
      + (c ? `<span class="sep">/</span><a href="#/${c.section}/${c.id}">${esc(c.num)} ${esc(c.name)}</a>` : '') + `</nav>`;
    const words = a.words || strip(a.body).split(' ').length;
    const facts = [[a.sourceAuthor ? 'Source author' : 'Author', a.sourceAuthor || 'Dr. William Conroy'], ['Published', fmtDate(a.date)], ['Reading', a.minutes + ' min'], ['Length', words.toLocaleString('en-GB') + ' words'], p.toc.length ? ['Sections', String(p.toc.length)] : null].filter(Boolean);
    const toc = p.toc.map(t => `<a href="#/read/${a.id}/${t.id}" data-t="${t.id}"><i>${esc(t.num)}</i><span>${esc(t.label)}</span></a>`).join('');
    const { prev, next } = neighbours(a), where = c ? c.name : (s ? s.short : '');
    const old = LIVE[a.id] ? `<aside class="note old"><span>An earlier edition</span><p>This page describes the first version of the instrument, with a year of 360 dates. The Temporal Matrix now runs on the current engine: a year of τ* dates and nineteen signs. <a href="${LIVE[a.id]}">Open the live instrument ↗</a></p></aside>` : '';
    $('#reader').style.setProperty('--a', VAR[acc]);
    $('#reader').innerHTML = `<header class="r-head">${crumbs}<p class="eyebrow">${esc(a.type)}</p><h1>${esc(a.title)}</h1>${a.subtitle ? `<p class="subtitle">${esc(a.subtitle)}</p>` : ''}<p class="lede">${esc(a.description)}</p>`
      + `<div class="r-bar"><dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`
      + `<div class="tools"><button class="pill" type="button" id="t-keep" aria-pressed="${isKept(a.id)}">✦ ${isKept(a.id) ? 'Kept' : 'Keep'}</button><button class="pill" type="button" id="t-link">Copy link</button><button class="pill" type="button" id="t-print">Print / PDF</button></div></div></header>`
      + `<div class="r-layout${toc ? '' : ' no-toc'}">${toc ? `<aside class="toc"><h5>On this page</h5><nav aria-label="Sections">${toc}</nav></aside>` : ''}`
      + `<div class="r-main">${old}${a.note ? `<aside class="note"><span>Reading note</span><p>${a.note}</p></aside>` : ''}`
      + (toc ? `<details class="toc-m"><summary>On this page · ${p.toc.length}</summary><nav aria-label="Sections">${toc}</nav></details>` : '')
      + `<div class="prose" id="prose">${p.html}</div></div></div>`
      + `<footer class="r-foot"><div class="pager">${prev ? `<a class="prev" href="${link(prev.id)}"><span>← Earlier in ${esc(where)}</span><strong>${esc(prev.title)}</strong></a>` : '<div></div>'}${next ? `<a class="next" href="${link(next.id)}"><span>Later in ${esc(where)} →</span><strong>${esc(next.title)}</strong></a>` : '<div></div>'}</div>`
      + `<h3>Keep following the thread</h3><div class="rows">${related(a).map((x, i) => row(x, i)).join('')}</div>`
      + `<p style="margin-top:34px"><a class="pill" href="${c ? `#/${c.section}/${c.id}` : '#/' + (s && !s.hidden ? s.id : '')}">Back to ${esc(where || 'the library')}</a></p></footer>`;
    $('#t-keep').addEventListener('click', e => { toggleKept(a.id); e.currentTarget.setAttribute('aria-pressed', isKept(a.id)); e.currentTarget.textContent = '✦ ' + (isKept(a.id) ? 'Kept' : 'Keep'); dirty = true; });
    $('#t-link').addEventListener('click', e => { const b = e.currentTarget; const u = location.href.split('#')[0] + '#/read/' + a.id; (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(() => { b.textContent = 'Copied'; }).catch(() => { b.textContent = u; }).finally(() => setTimeout(() => { b.textContent = 'Copy link'; }, 1800)); });
    $('#t-print').addEventListener('click', () => print());
    $$('#reader .toc-m a').forEach(x => x.addEventListener('click', () => { x.closest('details').open = false; }));
    const prose = $('#prose');
    math(prose).then(() => { if (window.SCHouse) window.SCHouse.gloss(prose, 'read-' + a.id); });
    watchToc();
  }
  function watchToc() {
    if (spy) spy.disconnect();
    const hs = $$('#prose h2'); if (!hs.length) return;
    const links = id => $$(`#reader .toc a[data-t="${id}"]`);
    spy = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { $$('#reader .toc a.on').forEach(x => x.classList.remove('on')); links(e.target.id).forEach(x => x.classList.add('on')); } });
    }, { rootMargin: '-20% 0px -70% 0px' });
    hs.forEach(h => spy.observe(h));
  }

  /* KaTeX, from the vendored copy, on demand */
  let katexP = null;
  function math(root) {
    if (!root || !/\$|\\\(/.test(root.textContent)) return Promise.resolve();
    if (!katexP) katexP = new Promise(res => {
      const base = 'assets/vendor/katex/';
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = base + 'katex.min.css'; document.head.appendChild(l);
      const load = src => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
      (window.katex ? Promise.resolve() : load(base + 'katex.min.js')).then(() => window.renderMathInElement ? null : load(base + 'contrib/auto-render.min.js')).then(res, () => res());
    });
    return katexP.then(() => {
      if (!window.renderMathInElement) return;
      try { window.renderMathInElement(root, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\(', right: '\\)', display: false }, { left: '$', right: '$', display: false }], throwOnError: false, ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option'] }); } catch (e) {}
    });
  }

  /* ---------- the library view ---------- */
  let dirty = false, built = false;
  function showLibrary(page, id) {
    const wasReader = !$('#reader-view').hidden;
    $('#reader-view').hidden = true; $('#library-view').hidden = false;
    document.title = 'Science Coherence — The Library';
    if (!built || dirty) { $('#shelves').innerHTML = shelves(); built = true; dirty = false; $('#kept-n').textContent = kept.length; wire(); }
    if (page === 'kept') { S.kept = true; update(); }
    else if (page && section(page) && section(page).hidden) { clear(); S.place = 'section:' + page; update(); }
    else if (page === 'library' || page === 'browse' || section(page)) { if (S.kept && !S.q) { S.kept = false; } update(); }
    else update();
    const target = page === 'browse' || page === 'kept' || (page && section(page) && section(page).hidden) ? $('#catalogue')
      : page && id && $('#c-' + id) ? $('#c-' + id) : page && $('#s-' + page) ? $('#s-' + page) : null;
    requestAnimationFrame(() => {
      if (target) {
        if (!$('#shelves').hidden || target.id === 'catalogue') {
          target.scrollIntoView({ behavior: wasReader || reduce ? 'auto' : 'smooth' });
          if (target.classList.contains('shelf')) { target.classList.remove('flash'); void target.offsetWidth; target.classList.add('flash'); }
        }
      } else if (wasReader) scrollTo(0, libScroll);
      reveal();
    });
  }
  function wire() {
    $$('#shelves .bk').forEach(b => b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.setProperty('--mx', (e.clientX - r.left) + 'px'); b.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));
    $$('#shelves .arch').forEach(d => d.addEventListener('toggle', () => { if (d.open && !d.dataset.done) { d.dataset.done = 1; const b = d.querySelector('.arch-body'); math(b).then(() => { if (window.SCHouse) window.SCHouse.gloss(b); }); } }));
    watchSections();
  }
  let secSpy = null;
  function watchSections() {
    if (secSpy) secSpy.disconnect();
    secSpy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && !$('#library-view').hidden) $('#k-sec').textContent = ' · ' + e.target.dataset.label; }), { rootMargin: '-45% 0px -50% 0px' });
    $$('#shelves [data-label]').forEach(x => secSpy.observe(x));
  }
  let revealer = null;
  function reveal() {
    if (reduce || !('IntersectionObserver' in window)) { $$('.reveal').forEach(x => x.classList.add('in')); return; }
    if (!revealer) revealer = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealer.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal:not(.in)').forEach(x => revealer.observe(x));
  }

  /* ---------- routing ---------- */
  function route() {
    const [page, id, sub] = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    if (page === 'read') { const a = byId(id); if (a) { showReader(a, sub); return; } }
    if (page === 'protocol') { location.replace('protocol.html'); return; }
    if (page === 'explore') { location.replace('#/'); return; }
    current = null;
    $('#k-sec').textContent = '';
    showLibrary(page, id);
  }

  /* ---------- chrome ---------- */
  function onScroll() {
    const h = document.documentElement, reading = !$('#reader-view').hidden;
    let f;
    if (reading) { const p = $('#prose'); if (p) { const r = p.getBoundingClientRect(); f = Math.min(1, Math.max(0, (innerHeight * .35 - r.top) / Math.max(1, r.height))); } }
    else f = scrollY / Math.max(1, h.scrollHeight - innerHeight);
    $('#progress').style.width = (100 * (f || 0)) + '%';
    document.body.classList.toggle('scrolled', scrollY > 40);
    const c = $('.controls'); if (c && !reading) c.classList.toggle('stuck', c.getBoundingClientRect().top <= parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--top-h')) + 12);
  }
  addEventListener('scroll', onScroll, { passive: true });
  $('#theme').addEventListener('click', () => {
    const t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = t; store.set('sc-theme', t);
  });

  /* ---------- the constellation ---------- */
  function constellation() {
    const cv = $('#stars'); if (!cv) return;
    const ctx = cv.getContext('2d');
    let W = 0, H = 0, dpr = 1, col = {}, mx = 0, my = 0, hot = null, t0 = performance.now(), running = false, visible = true;
    const readCol = () => { const cs = getComputedStyle(document.documentElement); ['lime', 'cream', 'teal', 'amber', 'blue', 'violet', 'rose', 'green'].forEach(k => col[k] = cs.getPropertyValue('--' + k).trim()); col.light = document.documentElement.dataset.theme === 'light'; };
    const rgba = (hex, a) => { const n = parseInt(hex.replace('#', ''), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
    // the clusters
    const G = [];
    COLLECTIONS.filter(c => c.section === 'research').forEach(c => G.push({ key: c.id, label: `${c.num} ${c.name}`, acc: collAcc(c), items: collectionItems(c).map(a => ({ a, href: link(a.id) })) }));
    SECTIONS.filter(s => !s.hidden && s.id !== 'research' && s.id !== 'protocol').forEach(s => G.push({ key: s.id, label: `${s.num} ${s.short}`, acc: SECTION_ACC[s.id] || 'lime', items: sectionItems(s.id).map(a => ({ a, href: link(a.id) })) }));
    G.push({ key: 'protocol', label: '05 The Protocol', acc: 'teal', items: [
      { a: { title: 'Holographic Cosmic Repolymerization', type: 'Operating document', minutes: 40 }, href: 'protocol.html' },
      { a: { title: 'The day, live', type: 'The protocol on the clock', minutes: 10 }, href: 'protocol-matrix.html' },
      { a: { title: 'Pathogen Elimination & Tissue Regeneration', type: 'Operating document', minutes: 15 }, href: 'protocol-pathogen.html' },
      { a: { title: 'The Regenesis Compounds', type: 'Compound library', minutes: 13 }, href: 'compounds.html' },
      { a: { title: 'The Temporal Matrix', type: 'Instrument · live', minutes: 12 }, href: 'temporal-matrix.html' }] });
    const N = [];                                           // every star
    G.forEach((g, gi) => g.items.forEach((it, k) => N.push(Object.assign(it, { g, gi, k, n: g.items.length, r: Math.min(6.5, 2.4 + Math.sqrt(it.a.minutes || 3) * .9), x: 0, y: 0 }))));
    const idx = new Map(N.filter(n => n.a.id).map(n => [n.a.id, n]));
    const X = [];                                           // the threads between pieces that cite each other
    N.forEach(n => { if (!n.a.body) return; [...n.a.body.matchAll(/href="#\/read\/([^"/]+)/g)].forEach(m => { const o = idx.get(m[1]); if (o && o !== n && !X.some(e => (e[0] === n && e[1] === o) || (e[0] === o && e[1] === n))) X.push([n, o, Math.random()]); }); if (/href="#\/protocol/.test(n.a.body)) X.push([n, N.find(z => z.href === 'protocol.html'), Math.random()]); });
    const DUST = Array.from({ length: 150 }, () => ({ x: Math.random(), y: Math.random(), z: .2 + Math.random() * .8, p: Math.random() * 6.28, s: Math.random() < .08 ? 1.4 : .7 }));
    function size() { const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function centre(gi, t) {
      const narrow = W < 860;
      const cx = W * (narrow ? .5 : .7), cy = narrow ? H * .28 : H * .47, rx = W * (narrow ? .33 : .2), ry = narrow ? Math.min(H * .13, 110) : H * .28;
      const a = -Math.PI / 2 + gi * 2 * Math.PI / G.length + t * .012;
      return [cx + Math.cos(a) * rx + (mx - W / 2) * -.018, cy + Math.sin(a) * ry + (my - H / 2) * -.018];
    }
    function draw(now) {
      const t = Math.max(0, (now - t0) / 1000), grow = reduce ? 1 : Math.max(.001, Math.min(1, t / 2.4)), L = col.light;
      ctx.clearRect(0, 0, W, H);
      // dust
      DUST.forEach(d => { const a = (reduce ? .5 : .35 + .35 * Math.sin(t * 1.3 * d.z + d.p)) * (L ? .35 : .6); ctx.fillStyle = L ? `rgba(29,43,37,${a * .5})` : `rgba(238,240,230,${a})`; ctx.beginPath(); ctx.arc(d.x * W + (mx - W / 2) * -.03 * d.z, d.y * H + (my - H / 2) * -.03 * d.z, d.s * d.z, 0, 6.283); ctx.fill(); });
      // place the stars
      G.forEach((g, gi) => {
        const [cx, cy] = centre(gi, reduce ? 0 : t); g.cx = cx; g.cy = cy;
        const R = (g.items.length > 1 ? 30 + 11 * g.items.length : 0) * (W < 860 ? .5 : 1);
        g.R = R;
        g.items.forEach((n, k) => { const a = k * 2 * Math.PI / Math.max(1, g.items.length) + (reduce ? 0 : t * (gi % 2 ? -.05 : .04)) + gi; const e = grow * (1 - (1 - grow) * 0); n.x = cx + Math.cos(a) * R * e; n.y = cy + Math.sin(a) * R * .72 * e; });
      });
      // cluster rings, threads, labels
      G.forEach(g => {
        const c = col[g.acc] || col.lime, on = hot && hot.g === g;
        ctx.strokeStyle = rgba(c, (on ? .5 : .16) * grow); ctx.lineWidth = 1;
        if (!g.items.length) { ctx.setLineDash([2, 5]); ctx.beginPath(); ctx.ellipse(g.cx, g.cy, 26, 19, 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
        else if (g.items.length > 1) { ctx.beginPath(); g.items.forEach((n, k) => k ? ctx.lineTo(n.x, n.y) : ctx.moveTo(n.x, n.y)); ctx.closePath(); ctx.stroke(); }
        g.items.forEach(n => { ctx.strokeStyle = rgba(c, (on ? .28 : .07) * grow); ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(n.x, n.y); ctx.stroke(); });
        // the heart of the cluster
        const pulse = reduce ? 1 : 1 + .25 * Math.sin(t * 1.4 + g.cx * .01);
        const gr = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, 22 * pulse);
        gr.addColorStop(0, rgba(c, (L ? .25 : .35) * grow)); gr.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx, g.cy, 22 * pulse, 0, 6.283); ctx.fill();
        ctx.fillStyle = rgba(c, .9 * grow); ctx.beginPath(); ctx.arc(g.cx, g.cy, 1.6, 0, 6.283); ctx.fill();
        ctx.font = '500 9.5px "JetBrains Mono", monospace'; if ('letterSpacing' in ctx) ctx.letterSpacing = '2px';
        ctx.fillStyle = rgba(c, (on ? 1 : L ? .75 : .6) * grow); ctx.textAlign = 'center';
        const lab = (W < 860 ? g.label.replace(/^\d+\s+/, '') : g.label).toUpperCase() + (g.items.length || W < 860 ? '' : ' · awaiting');
        const lw = ctx.measureText(lab).width / 2 + 10;
        ctx.fillText(lab, Math.min(W - lw, Math.max(lw, g.cx)), g.cy + (g.R ? g.R * .72 : 19) + (W < 860 ? 16 : 22));
        if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      });
      // cross-threads with light travelling along them
      X.forEach(([a, b, ph]) => {
        if (!a || !b) return;
        const mxp = (a.x + b.x) / 2, myp = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y, qx = mxp - dy * .18, qy = myp + dx * .18;
        const on = hot && (hot === a || hot === b), c = col[a.g.acc] || col.lime;
        ctx.strokeStyle = rgba(c, (on ? .55 : .14) * grow); ctx.lineWidth = on ? 1.2 : .8;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(qx, qy, b.x, b.y); ctx.stroke();
        if (!reduce) { const u = (t * .12 + ph) % 1, v = 1 - u; const px = v * v * a.x + 2 * v * u * qx + u * u * b.x, py = v * v * a.y + 2 * v * u * qy + u * u * b.y;
          ctx.fillStyle = rgba(c, .9 * grow); ctx.beginPath(); ctx.arc(px, py, 1.6, 0, 6.283); ctx.fill(); }
      });
      // the stars
      N.forEach(n => {
        const c = col[n.g.acc] || col.lime, on = hot === n, tw = reduce ? 1 : .85 + .15 * Math.sin(t * 2 + n.k * 1.7 + n.gi);
        const r = n.r * (on ? 1.5 : 1) * grow;
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        halo.addColorStop(0, rgba(c, (on ? .5 : .22) * tw)); halo.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(n.x, n.y, r * 5, 0, 6.283); ctx.fill();
        ctx.fillStyle = L ? rgba(c, .95) : (on ? '#ffffff' : rgba(c, .95 * tw)); ctx.beginPath(); ctx.arc(n.x, n.y, Math.max(.5, r * .55), 0, 6.283); ctx.fill();
        if (n.a.id && LIVE[n.a.id] || /\.html$/.test(n.href)) { ctx.strokeStyle = rgba(c, .5 * grow); ctx.beginPath(); ctx.arc(n.x, n.y, r + 3, 0, 6.283); ctx.stroke(); }
      });
      // the name of the star under the pointer
      if (hot) {
        const title = hot.a.title, meta = `${hot.a.type || ''}${hot.a.minutes ? ' · ' + hot.a.minutes + ' min' : ''}`;
        ctx.font = '400 17px Newsreader, Georgia, serif'; const tw1 = ctx.measureText(title).width;
        ctx.font = '500 9.5px "JetBrains Mono", monospace'; const tw2 = ctx.measureText(meta.toUpperCase()).width + meta.length * 1.2;
        const w = Math.max(tw1, tw2) + 28, h = 54; let x = hot.x + 18, y = hot.y - h - 10;
        if (x + w > W - 12) x = hot.x - w - 18; if (y < 70) y = hot.y + 16; x = Math.max(12, x);
        ctx.fillStyle = L ? 'rgba(246,244,236,.94)' : 'rgba(11,16,13,.86)'; ctx.strokeStyle = rgba(col[hot.g.acc] || col.lime, .6);
        ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, 10); else ctx.rect(x, y, w, h); ctx.fill(); ctx.stroke();
        ctx.textAlign = 'left'; ctx.fillStyle = col.cream; ctx.font = '400 17px Newsreader, Georgia, serif'; ctx.fillText(title, x + 14, y + 24);
        ctx.font = '500 9.5px "JetBrains Mono", monospace'; if ('letterSpacing' in ctx) ctx.letterSpacing = '1.2px';
        ctx.fillStyle = rgba(col[hot.g.acc] || col.lime, .9); ctx.fillText(meta.toUpperCase(), x + 14, y + 42); if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      }
    }
    function frame(now) { if (!visible || document.hidden || $('#library-view').hidden) { running = false; return; } running = true; draw(now); requestAnimationFrame(frame); }
    const kick = () => { if (!running && !reduce) requestAnimationFrame(frame); else if (reduce) draw(performance.now()); };
    function pick(x, y) { let best = null, bd = 18; N.forEach(n => { const d = Math.hypot(n.x - x, n.y - y); if (d < bd) { bd = d; best = n; } }); return best; }
    cv.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; const h = pick(mx, my); if (h !== hot) { hot = h; cv.classList.toggle('hot', !!h); if (reduce) draw(performance.now()); } });
    cv.addEventListener('pointerleave', () => { hot = null; cv.classList.remove('hot'); mx = W / 2; my = H / 2; if (reduce) draw(performance.now()); });
    cv.addEventListener('click', e => { const r = cv.getBoundingClientRect(), h = pick(e.clientX - r.left, e.clientY - r.top); if (!h) return; if (h.href.startsWith('#')) location.hash = h.href; else location.href = h.href; });
    readCol(); size(); mx = W / 2; my = H / 2;
    addEventListener('resize', () => { size(); if (reduce) draw(performance.now()); });
    new MutationObserver(() => { readCol(); if (reduce) draw(performance.now()); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) kick(); }).observe(cv);
    document.addEventListener('visibilitychange', kick);
    addEventListener('hashchange', () => setTimeout(kick, 30));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => reduce && draw(performance.now()));
    kick();
  }

  /* ---------- start ---------- */
  buildControls();
  function start() { route(); constellation(); onScroll(); }
  addEventListener('hashchange', route);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.SCLibrary = { articles: ARTICLES, link, byId };
})();
