/* ==========================================================================
   The Protocol — the full operating document, standalone.
   The renderer, dose scaler, lexicon, pacer and math are carried from the
   original website's app.js (science-coherence-website, 22 Sep 2026) so the
   document reads exactly as it did there. The document itself is documents.js,
   rebuilt from documents/holographic-repolymerization.html — never hand-edit
   documents.js. Sections are addressed as #section-id.
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
  const DOCUMENTS = window.SC_DOCUMENTS || [];
  const doc = DOCUMENTS.find(d => d.id === 'holographic-repolymerization') || DOCUMENTS[0];
  if (!doc) { $('#main').innerHTML = '<div class="wrap"><p>The document could not be loaded.</p></div>'; return; }

  const secs = doc.sections.filter(s => s.id !== 'overview');
  let sectionId = null;

  function render() {
    const nav = `<div class="doc-nav-wrap"><div class="wrap"><div class="doc-nav" role="tablist" aria-label="Document sections" id="doc-nav">${secs.map(s => `<button role="tab" id="tab-${s.id}" data-section="${s.id}" aria-selected="false" aria-controls="panel-${s.id}"><i>${String(s.num).padStart(2, '0')}</i>${s.label}</button>`).join('')}<div class="mode"><button type="button" id="mode-sections" aria-pressed="true">Sections</button><button type="button" id="mode-all" aria-pressed="false">Continuous</button></div></div></div></div>`;
    const panels = secs.map((s, i) => `<section class="doc-panel" id="panel-${s.id}" role="tabpanel" aria-labelledby="tab-${s.id}" tabindex="-1"><div class="doc-panel-head"><span class="kicker-small">${s.num === '0' || s.num === 0 ? 'Overview' : 'Section ' + s.num}</span><h2>${s.title}</h2><p>${s.summary}</p></div>${s.html}<div class="doc-panel-foot">${i > 0 ? `<button type="button" data-go="${secs[i - 1].id}">← ${secs[i - 1].label}</button>` : ''}${i < secs.length - 1 ? `<button type="button" class="next" data-go="${secs[i + 1].id}">${secs[i + 1].label} →</button>` : ''}</div></section>`).join('');
    const banner = `<div class="path-banner"><div><h3>The day, read live.</h3><p>The daily architecture of this protocol on the Temporal Matrix clock: now, next, and every window of the day.</p></div><a class="button" href="protocol.html">Open the instrument <span>↗</span></a></div>`;
    $('#main').innerHTML = `<div class="reading-progress" id="reading-progress"></div><section class="page-hero green doc-hero"><div class="wrap"><div class="breadcrumb"><a href="index.html">Horizon</a> / <a href="protocol.html">The day</a> / The Protocol</div><span class="eyebrow">${doc.type} · Version ${doc.version}</span><h1>${doc.title}</h1>${doc.subtitle ? `<p class="lede">${doc.subtitle}</p>` : ''}</div></section>${nav}<div class="wrap doc" id="doc">${panels}${banner}</div>`;
  }

  function showSection(id, { scroll = true, focus = false } = {}) {
    const target = $('#panel-' + id);
    if (!target) return;
    sectionId = id;
    $$('.doc-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + id));
    $$('#doc-nav [role=tab]').forEach(t => { const on = t.dataset.section === id; t.setAttribute('aria-selected', on); if (on) t.scrollIntoView({ block: 'nearest', inline: 'nearest' }); });
    const allMode = $('#doc').classList.contains('all');
    if (scroll) {
      if (allMode) target.scrollIntoView({ block: 'start' });
      else window.scrollTo({ top: $('.doc-nav-wrap').offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 84), behavior: 'smooth' });
    }
    if (focus && !$('#doc-nav').contains(document.activeElement)) target.focus({ preventScroll: true });
    updateProgress();
  }
  const go = id => { if (('#' + id) === location.hash) showSection(id, { focus: true }); else location.hash = id; };

  function enhance() {
    const root = $('#doc');
    $('#doc-nav').addEventListener('click', e => {
      const tab = e.target.closest('[role=tab]');
      if (tab) { go(tab.dataset.section); return; }
      if (e.target.id === 'mode-all' || e.target.id === 'mode-sections') {
        const all = e.target.id === 'mode-all';
        root.classList.toggle('all', all);
        $('#mode-all').setAttribute('aria-pressed', all);
        $('#mode-sections').setAttribute('aria-pressed', !all);
        store.set('sc-doc-mode', all ? 'all' : 'sections');
        if (all) setupScrollSpy(); else { teardownScrollSpy(); showSection(sectionId, { scroll: false }); }
      }
    });
    $('#doc-nav').addEventListener('keydown', e => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
      const tabs = $$('#doc-nav [role=tab]'); const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      const j = e.key === 'ArrowRight' ? Math.min(i + 1, tabs.length - 1) : e.key === 'ArrowLeft' ? Math.max(i - 1, 0) : e.key === 'Home' ? 0 : tabs.length - 1;
      e.preventDefault(); tabs[j].focus(); go(tabs[j].dataset.section);
    });
    root.addEventListener('click', e => {
      const g = e.target.closest('[data-go]');
      if (g) go(g.dataset.go);
    });
    if (store.get('sc-doc-mode', 'sections') === 'all') { root.classList.add('all'); $('#mode-all').setAttribute('aria-pressed', true); $('#mode-sections').setAttribute('aria-pressed', false); setupScrollSpy(); }

    // dose scaler
    const scaler = $('#weight-scaler', root);
    if (scaler) {
      const format = v => Number.isInteger(v) ? String(v) : (Math.round(v * 10) / 10).toString();
      const apply = () => {
        const mult = parseFloat(scaler.value);
        $$('.dose', root).forEach(el => {
          const min = parseFloat(el.dataset.min) * mult, max = parseFloat(el.dataset.max) * mult, unit = el.dataset.unit || 'mg';
          el.textContent = (min === max ? format(min) : format(min) + '–' + format(max)) + ' ' + unit;
          el.classList.toggle('scaled', mult !== 1);
        });
        const label = scaler.options[scaler.selectedIndex].textContent;
        $('#dose-note').textContent = mult === 1 ? 'Doses shown at the standard scale.' : `Doses scaled ×${mult} for ${label.toLowerCase()}.`;
      };
      scaler.addEventListener('change', apply);
    }

    // lexicon
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
      grid.addEventListener('click', e => {
        const card = e.target.closest('.lex-card'); if (!card) return;
        const item = doc.lexicon[card.dataset.idx]; if (item) openLexiconModal(item);
      });
      grid.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const card = e.target.closest('.lex-card'); if (!card) return;
          e.preventDefault();
          const item = doc.lexicon[card.dataset.idx]; if (item) openLexiconModal(item);
        }
      });
    }

    // pacer
    if ($('#pacer', root)) new Pacer(root);

    // math
    loadKatex().then(() => renderMath(root)).catch(() => {});
  }

  /* scroll spy for continuous mode */
  let spy = null;
  function setupScrollSpy() {
    teardownScrollSpy();
    spy = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const id = visible.target.id.replace('panel-', '');
      if (id !== sectionId) { sectionId = id; $$('#doc-nav [role=tab]').forEach(t => t.setAttribute('aria-selected', t.dataset.section === id)); history.replaceState(null, '', '#' + id); }
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('.doc-panel').forEach(p => spy.observe(p));
  }
  function teardownScrollSpy() { if (spy) { spy.disconnect(); spy = null; } }

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

  /* theme, toast, progress, menu */
  let toastTimer;
  function toast(text) { const t = $('#toast'); t.textContent = text; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600); }
  $('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set('sc-theme', next);
    toast(next === 'dark' ? 'Dark theme.' : 'Light theme.');
  });
  $('#menu-toggle').addEventListener('click', () => {
    const nav = $('#mobile-nav'), open = nav.hidden;
    nav.hidden = !open; $('#menu-toggle').setAttribute('aria-expanded', open);
  });
  function updateProgress() {
    const bar = $('#reading-progress'); if (!bar) return;
    const body = $('#doc'); if (!body) return;
    const start = body.offsetTop, end = body.offsetTop + body.offsetHeight - innerHeight;
    bar.style.width = Math.max(0, Math.min(100, 100 * (scrollY - start) / Math.max(1, end - start))) + '%';
  }
  addEventListener('scroll', updateProgress, { passive: true });

  /* ---------- resonant field pacer -------------------------------------- */
  class Pacer {
    constructor(root) {
      this.el = {
        phase: $('#pacer-phase-name', root), orb: $('#pacer-orb', root), prompt: $('#pacer-prompt', root), time: $('#pacer-time', root),
        toggle: $('#pacer-toggle', root), reset: $('#pacer-reset', root), audio: $('#pacer-audio', root), audioLabel: $('#pacer-audio-label', root),
        status: $('#pacer-status', root), list: $('#pacer-phases', root), pacer: $('#pacer', root)
      };
      this.phases = [
        { name: 'Phase 1: Ground State', center: 963, left: 943, right: 983, accent: 'teal' },
        { name: 'Phase 2: Clearing the Noise', center: 852, left: 832, right: 872, accent: 'blue' },
        { name: 'Phase 3: Coherent Blueprint', center: 741, left: 721, right: 761, accent: 'violet' },
        { name: 'Phase 4: Repolymerization', center: 528, left: 508, right: 548, accent: 'rose' },
        { name: 'Phase 5: Telomere Shelter', center: 639, left: 619, right: 659, accent: 'amber' },
        { name: 'Phase 6: Integration & Seal', center: 432, left: 412, right: 452, accent: 'green' }
      ];
      this.PHASE = 300; this.timer = null; this.ctx = null; this.gain = null; this.oscillators = [];
      this.reset(false);
      this.el.toggle.addEventListener('click', () => this.running ? this.pause() : this.start());
      this.el.reset.addEventListener('click', () => this.reset(true));
      this.el.audio.addEventListener('change', () => { if (this.running) this.el.audio.checked ? this.audioOn() : this.audioOff(); });
      this.el.list.addEventListener('click', event => {
        const item = event.target.closest('li[data-phase]');
        if (item && this.el.list.contains(item)) this.selectPhase(+item.dataset.phase - 1);
      });
      this.onVisibility = () => { if (document.hidden && this.running) this.pause('Paused while the tab was hidden.'); };
      document.addEventListener('visibilitychange', this.onVisibility);
    }
    start() {
      if (this.completeState) this.reset(false);
      this.running = true;
      this.el.toggle.textContent = 'Pause session';
      this.el.status.textContent = this.phases[this.phase].name + ' in progress.';
      if (this.el.audio.checked) this.audioOn();
      this.timer = setInterval(() => this.tick(), 1000);
      this.render();
    }
    pause(msg) {
      this.running = false; clearInterval(this.timer); this.timer = null;
      this.el.toggle.textContent = 'Resume session';
      this.el.status.textContent = msg || 'Paused.';
      this.audioOff();
      this.el.orb.className = 'pacer-orb';
      this.el.prompt.textContent = 'Paused';
    }
    reset(announce) {
      this.running = false; clearInterval(this.timer); this.timer = null;
      this.phase = 0; this.remaining = this.PHASE; this.completeState = false; this.completed = new Set();
      this.el.toggle.textContent = 'Start session';
      this.audioOff();
      this.el.orb.className = 'pacer-orb';
      this.el.prompt.textContent = 'Ready';
      this.el.status.textContent = announce ? 'Reset. Six phases of five minutes; choose any phase or begin with Ground State.' : 'Six phases of five minutes. Choose any phase or begin with Ground State. The orb breathes on a 14-second cycle: inhale 4 s, hold 4 s, exhale 6 s.';
      this.render();
    }
    selectPhase(phase) {
      if (!Number.isInteger(phase) || phase < 0 || phase >= this.phases.length) return;
      if (this.completeState) this.completed.clear();
      this.completeState = false;
      this.completed.delete(phase);
      this.phase = phase; this.remaining = this.PHASE;
      this.el.toggle.textContent = this.running ? 'Pause session' : 'Start selected phase';
      this.el.prompt.textContent = this.running ? 'Inhale' : 'Ready';
      this.el.orb.className = this.running ? 'pacer-orb in' : 'pacer-orb';
      this.el.status.textContent = this.phases[phase].name + (this.running ? ' in progress.' : ' selected. Press start when ready.');
      if (this.running && this.el.audio.checked) this.updateAudioFrequencies();
      this.render();
    }
    tick() {
      this.remaining -= 1;
      if (this.remaining <= 0) {
        this.completed.add(this.phase);
        this.phase += 1;
        if (this.phase >= this.phases.length) { this.phase = this.phases.length - 1; this.remaining = 0; this.complete(); return; }
        this.remaining = this.PHASE;
        this.el.status.textContent = this.phases[this.phase].name + ' in progress.';
        if (this.el.audio.checked) this.updateAudioFrequencies();
      }
      this.render();
    }
    complete() {
      this.running = false; this.completeState = true; clearInterval(this.timer); this.timer = null;
      this.audioOff();
      this.el.toggle.textContent = 'Start again';
      this.el.orb.className = 'pacer-orb';
      const count = this.completed.size;
      this.el.status.textContent = `Session complete — ${count * 5} minutes across ${count} ${count === 1 ? 'phase' : 'phases'}.`;
      this.el.prompt.textContent = 'Complete';
      this.render();
    }
    render() {
      const m = String(Math.floor(this.remaining / 60)).padStart(2, '0'), s = String(this.remaining % 60).padStart(2, '0');
      this.el.time.textContent = `${m}:${s}`;
      const current = this.phases[this.phase];
      this.el.phase.textContent = current.name;
      this.el.audioLabel.textContent = `Audio carrier — ${current.left} Hz left + ${current.right} Hz right (40 Hz difference; ${current.center} Hz center)`;
      this.el.pacer.dataset.accent = current.accent;
      if (this.running) {
        const t = (this.PHASE - this.remaining) % 14;
        const state = t < 4 ? ['Inhale', 'in'] : t < 8 ? ['Hold', 'hold'] : ['Exhale', 'out'];
        this.el.prompt.textContent = state[0];
        this.el.orb.className = 'pacer-orb ' + state[1];
      }
      $$('li', this.el.list).forEach(li => {
        const phase = +li.dataset.phase - 1;
        const active = phase === this.phase && !this.completeState;
        li.classList.toggle('active', active);
        li.classList.toggle('done', this.completed.has(phase));
        const button = $('.phase-select', li);
        if (button) button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }
    audioOn() {
      try {
        if (!this.ctx) {
          this.ctx = new (window.AudioContext || window.webkitAudioContext)();
          this.gain = this.ctx.createGain(); this.gain.gain.value = 0;
          this.gain.connect(this.ctx.destination);
          [-1, 1].forEach(pan => {
            const oscillator = this.ctx.createOscillator(); oscillator.type = 'sine';
            if (this.ctx.createStereoPanner) {
              const panner = this.ctx.createStereoPanner(); panner.pan.value = pan;
              oscillator.connect(panner); panner.connect(this.gain);
            } else oscillator.connect(this.gain);
            oscillator.start(); this.oscillators.push(oscillator);
          });
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        this.updateAudioFrequencies();
        this.gain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.gain.gain.linearRampToValueAtTime(0.025, this.ctx.currentTime + 1.5);
      } catch { this.el.audio.checked = false; this.el.status.textContent = 'Audio is not available in this browser.'; }
    }
    updateAudioFrequencies() {
      if (!this.ctx || this.oscillators.length < 2) return;
      const current = this.phases[this.phase], now = this.ctx.currentTime;
      this.oscillators[0].frequency.setTargetAtTime(current.left, now, 0.04);
      this.oscillators[1].frequency.setTargetAtTime(current.right, now, 0.04);
    }
    audioOff() {
      if (!this.ctx) return;
      this.gain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);
      setTimeout(() => { if (this.ctx && !this.running && this.ctx.state === 'running') this.ctx.suspend(); }, 700);
    }
    destroy() {
      clearInterval(this.timer);
      document.removeEventListener('visibilitychange', this.onVisibility);
      if (this.ctx) { try { this.ctx.close(); } catch {} this.ctx = null; this.oscillators = []; }
    }
  }



  /* ---------- run ---------- */
  render();
  enhance();
  const fromHash = () => { const id = decodeURIComponent(location.hash.slice(1)); return secs.some(s => s.id === id) ? id : null; };
  showSection(fromHash() || secs[0].id, { scroll: !!fromHash() });
  addEventListener('hashchange', () => { const id = fromHash(); if (id) showSection(id, { focus: true }); });
})();
