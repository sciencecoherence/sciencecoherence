/* ==========================================================================
   The biofilm — the opening of the pathogen protocol.
   A living hydrogel of polymer strands (the EPS matrix) holds metal ions in
   its mesh; spirochetes swim through it. The pointer strips the matrix (the
   Cistus decoction's work): where it dissolves, the ions it held are
   released and fall through the four tiers of the drainage cascade to
   capture. Left alone, a slow wave does the stripping, and the matrix grows
   back. Canvas 2D, dependency-free; still under reduced motion.
   ========================================================================== */
(function () {
  'use strict';
  const cv = document.getElementById('biofilm'); if (!cv) return;
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;
  let W = 0, H = 0, dpr = 1, col = {}, light = false;
  let nodes = [], ions = [], worms = [], R = null, tiers = [];
  const ptr = { x: -1e4, y: -1e4, on: false, last: -1e9 };
  const METALS = [
    { sym: 'Hg²⁺', c: 'violet' }, { sym: 'Pb²⁺', c: 'blue' }, { sym: 'Cd²⁺', c: 'amber' }, { sym: 'Al³⁺', c: 'rose' }
  ];
  const TIERS = ['I · CNS mobilization', 'II · Sulfhydryl buffer', 'III · Biliary transit', 'IV · Luminal capture'];

  function colors() {
    const cs = getComputedStyle(document.documentElement), g = k => cs.getPropertyValue('--' + k).trim();
    light = document.documentElement.dataset.theme === 'light';
    ['lime', 'teal', 'amber', 'blue', 'violet', 'rose', 'green', 'cream'].forEach(k => col[k] = rgb(g(k)));
  }
  function rgb(h) { if (!h || h[0] !== '#') return [200, 220, 180]; const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;
  const rand = (a, b) => a + Math.random() * (b - a);

  function layout() {
    const r = cv.getBoundingClientRect(); W = r.width; H = r.height; dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const narrow = W < 860;
    R = narrow ? { x0: W * .04, x1: W * .96, y0: H * .08, y1: H * .32 } : { x0: Math.max(W * .54, Math.min(W * .6, 820)), x1: W * .96, y0: Math.max(96, H * .13), y1: H * .56 };
    R.xl = narrow ? R.x1 : R.x1 - 200;                 // where the tier lines end and their names begin
    let t0 = narrow ? H * .36 : H * .66, dt = narrow ? H * .016 : Math.min(H * .06, 46);
    if (narrow) {                                        // above the title, whatever the height of the screen
      const txt = document.querySelector('.hero-text'), top = txt ? txt.getBoundingClientRect().top - r.top - 30 : H * .42;
      dt = Math.min(dt, 12); t0 = top - 3 * dt; R.y1 = Math.max(R.y0 + 60, t0 - 22);
    }
    tiers = TIERS.map((label, i) => ({ y: t0 + i * dt, label }));
    // the matrix: a jittered lattice
    const sp = narrow ? 30 : 36;
    nodes = [];
    for (let y = R.y0; y <= R.y1; y += sp * .86) for (let x = R.x0 + ((Math.round((y - R.y0) / (sp * .86)) % 2) ? sp / 2 : 0); x <= R.x1; x += sp) {
      // a soft, organic edge: fewer nodes towards the rim
      const u = (x - R.x0) / (R.x1 - R.x0), v = (y - R.y0) / (R.y1 - R.y0);
      const edge = Math.min(u, 1 - u, v, 1 - v);
      if (edge < .12 && Math.random() > edge / .12 * .9) continue;
      nodes.push({ rx: x + rand(-8, 8), ry: y + rand(-8, 8), x: 0, y: 0, a: reduce ? 1 : 0, ph: Math.random() * TAU, hit: -1e9, n: [] });
    }
    nodes.forEach((p, i) => { for (let j = i + 1; j < nodes.length; j++) { const q = nodes[j]; if (Math.hypot(p.rx - q.rx, p.ry - q.ry) < sp * 1.3) { p.n.push(j); } } p.x = p.rx; p.y = p.ry; });
    ions = []; for (let k = 0; k < (narrow ? 26 : 46); k++) spawnIon(true);
    worms = Array.from({ length: narrow ? 4 : 7 }, () => ({ x: rand(R.x0, R.x1), y: rand(R.y0, R.y1), h: rand(0, TAU), v: rand(18, 34), ph: rand(0, TAU), len: rand(46, 78), tw: rand(-.4, .4) }));
  }
  function spawnIon(initial) {
    const alive = nodes.filter(n => n.a > .6);
    const home = (alive.length ? alive : nodes)[Math.floor(Math.random() * (alive.length || nodes.length))];
    if (!home) return;
    ions.push({ node: home, m: METALS[Math.floor(Math.random() * METALS.length)], state: 'bound', x: home.x, y: home.y, vx: 0, vy: 0, tier: -1, wait: 0, life: 1, born: initial ? 0 : 1, ph: Math.random() * TAU });
  }

  let tPrev = performance.now(), T = 0;
  function step(now) {
    const dt = Math.min(.05, (now - tPrev) / 1000); tPrev = now; T += dt;
    // the stripping agent: the pointer, or a slow wave when nobody is there
    let sx = ptr.x, sy = ptr.y, sr = W < 860 ? 64 : 92;
    if (!ptr.on || T - ptr.last > 3) {
      const u = T * .11;
      sx = R.x0 + (R.x1 - R.x0) * (.5 + .45 * Math.sin(u * 1.3)); sy = R.y0 + (R.y1 - R.y0) * (.5 + .42 * Math.sin(u * 2.1 + 1)); sr *= .8;
    }
    nodes.forEach(p => {
      const d = Math.hypot(p.x - sx, p.y - sy);
      if (d < sr) { p.a = Math.max(0, p.a - dt * 1.8 * (1 - d / sr) - dt * .2); p.hit = T; }
      else if (T - p.hit > 3.5) p.a = Math.min(1, p.a + dt * (p.hit < 0 ? .5 : .07));
      const loose = 1 - p.a, br = 2.2 + loose * 7;
      p.x = p.rx + Math.sin(T * .9 + p.ph) * br + loose * Math.sin(p.ph * 3) * 12;
      p.y = p.ry + Math.cos(T * .7 + p.ph * 1.3) * br + loose * loose * 22;
    });
    ions.forEach(o => {
      o.ph += dt;
      if (o.state === 'bound') {
        o.x = o.node.x; o.y = o.node.y;
        if (o.node.a < .28) { o.state = 'free'; o.vx = rand(-12, 12); o.vy = rand(10, 30); o.tier = 0; }
      } else if (o.state === 'free') {
        const target = tiers[o.tier];
        o.vy += 60 * dt; o.vx *= .98; o.x = Math.max(R.x0 + 6, Math.min(R.xl - 8, o.x + o.vx * dt)); o.y += o.vy * dt;
        if (o.y >= target.y) { o.y = target.y; o.state = 'held'; o.wait = rand(.35, .9); o.flash = 1; }
      } else if (o.state === 'held') {
        o.wait -= dt; o.flash = Math.max(0, (o.flash || 0) - dt * 2);
        if (o.wait <= 0) { if (o.tier < tiers.length - 1) { o.tier++; o.state = 'free'; o.vy = rand(8, 20); o.vx = rand(-8, 8); } else { o.state = 'captured'; } }
      } else if (o.state === 'captured') { o.life -= dt * .22; o.x += dt * 3; }
      o.born = Math.min(1, o.born + dt * .8);
    });
    for (let i = ions.length - 1; i >= 0; i--) if (ions[i].life <= 0) { ions.splice(i, 1); spawnIon(false); }
    worms.forEach(w => {
      w.h += (Math.sin(T * .5 + w.ph) * .6 + w.tw) * dt; w.ph += dt * 3.2;
      w.x += Math.cos(w.h) * w.v * dt; w.y += Math.sin(w.h) * w.v * dt;
      if (w.x < R.x0 || w.x > R.x1) { w.h = Math.PI - w.h; w.x = Math.max(R.x0, Math.min(R.x1, w.x)); }
      if (w.y < R.y0 || w.y > R.y1) { w.h = -w.h; w.y = Math.max(R.y0, Math.min(R.y1, w.y)); }
    });
    return { sx, sy, sr };
  }

  function draw(s) {
    ctx.clearRect(0, 0, W, H);
    const eps = light ? col.teal : col.green, strand = light ? .5 : .3;
    // the matrix
    ctx.lineWidth = 1;
    nodes.forEach(p => p.n.forEach(j => {
      const q = nodes[j], a = Math.min(p.a, q.a);
      if (a < .04) return;
      ctx.strokeStyle = rgba(eps, a * strand);
      ctx.beginPath(); ctx.moveTo(p.x, p.y);
      const mx = (p.x + q.x) / 2 + Math.sin(T + p.ph) * 3, my = (p.y + q.y) / 2 + Math.cos(T + q.ph) * 3;
      ctx.quadraticCurveTo(mx, my, q.x, q.y); ctx.stroke();
    }));
    nodes.forEach(p => { if (p.a < .05) return; ctx.fillStyle = rgba(eps, p.a * (light ? .7 : .55)); ctx.beginPath(); ctx.arc(p.x, p.y, 1.3, 0, TAU); ctx.fill(); });
    // where the matrix is being stripped
    if (!reduce && s) {
      const g = ctx.createRadialGradient(s.sx, s.sy, 0, s.sx, s.sy, s.sr * 1.2);
      g.addColorStop(0, rgba(col.amber, light ? .1 : .09)); g.addColorStop(1, rgba(col.amber, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.sx, s.sy, s.sr * 1.2, 0, TAU); ctx.fill();
    }
    // spirochetes: helices travelling through the gel
    worms.forEach(w => {
      const c = light ? col.teal : col.lime, cx = Math.cos(w.h), sy = Math.sin(w.h);
      ctx.strokeStyle = rgba(c, light ? .7 : .6); ctx.lineWidth = 1.4; ctx.lineCap = 'round';
      ctx.beginPath();
      for (let k = 0; k <= 34; k++) {
        const u = k / 34, back = u * w.len, amp = 4.2 * Math.sin(u * Math.PI) + 1.2;
        const off = Math.sin(u * 16 - w.ph * 2.4) * amp;
        const x = w.x - cx * back - sy * off, y = w.y - sy * back + cx * off;
        k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    });
    // the four tiers
    const narrow = W < 860;
    tiers.forEach((t, i) => {
      const c = [col.violet, col.teal, col.amber, col.green][i];
      ctx.strokeStyle = rgba(c, light ? .35 : .22); ctx.lineWidth = 1; ctx.setLineDash([2, 6]);
      ctx.beginPath(); ctx.moveTo(R.x0, t.y); ctx.lineTo(R.xl, t.y); ctx.stroke(); ctx.setLineDash([]);
      if (!narrow) {
        ctx.font = '500 9.5px "JetBrains Mono", monospace'; if ('letterSpacing' in ctx) ctx.letterSpacing = '2px';
        ctx.fillStyle = rgba(c, light ? .85 : .65); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(t.label.toUpperCase(), R.xl + 16, t.y);
        ctx.textBaseline = 'alphabetic'; if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      }
    });
    if (!narrow) {                                      // what the picture is, above the cascade
      ctx.font = '500 9.5px "JetBrains Mono", monospace'; if ('letterSpacing' in ctx) ctx.letterSpacing = '2.4px';
      ctx.textAlign = 'left'; ctx.fillStyle = light ? 'rgba(29,43,37,.55)' : 'rgba(238,240,230,.45)';
      ctx.fillText('THE BIOFILM SINK · MOVE THROUGH THE MATRIX', R.x0, tiers[0].y - 26);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    }
    // the ions
    ions.forEach(o => {
      const c = col[o.m.c], a = o.born * (o.state === 'captured' ? o.life : 1);
      const pulse = o.state === 'bound' ? .8 + .2 * Math.sin(o.ph * 3) : 1;
      const r = (o.state === 'bound' ? 2.3 : 2) * pulse;
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r * 5);
      g.addColorStop(0, rgba(c, .5 * a)); g.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x, o.y, r * 5, 0, TAU); ctx.fill();
      ctx.fillStyle = rgba(light ? c : [255, 255, 255], .9 * a); ctx.beginPath(); ctx.arc(o.x, o.y, r * .6, 0, TAU); ctx.fill();
      if (o.flash) { ctx.strokeStyle = rgba(c, o.flash * .7); ctx.beginPath(); ctx.ellipse(o.x, o.y, 16 * (1 - o.flash) + 3, 3, 0, 0, TAU); ctx.stroke(); }
      if (o.state === 'free' && !narrow) { ctx.strokeStyle = rgba(c, .25 * a); ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(o.x - o.vx * .08, o.y - o.vy * .08); ctx.stroke(); }
    });
    // the name of the ion under the pointer
    if (ptr.on) {
      let best = null, bd = 14; ions.forEach(o => { const d = Math.hypot(o.x - ptr.x, o.y - ptr.y); if (d < bd) { bd = d; best = o; } });
      if (best) {
        ctx.font = '500 10px "JetBrains Mono", monospace'; ctx.textAlign = 'left';
        const st = { bound: 'held in the matrix', free: 'falling', held: 'tier ' + ['I', 'II', 'III', 'IV'][best.tier], captured: 'captured' }[best.state];
        ctx.fillStyle = rgba(col[best.m.c], 1); ctx.fillText(`${best.m.sym} · ${st}`, best.x + 10, best.y - 10);
      }
    }
  }

  let running = false, visible = true;
  function frame(now) {
    if (!visible || document.hidden) { running = false; return; }
    running = true; draw(step(now)); requestAnimationFrame(frame);
  }
  function kick() { if (reduce) { draw(null); return; } if (!running) { tPrev = performance.now(); requestAnimationFrame(frame); } }

  colors(); layout();
  // the title's final size is known once its fonts have loaded and it has risen into place
  const settle = () => { if (W < 860) layout(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
  setTimeout(settle, 1900);
  cv.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true; ptr.last = T; if (reduce) draw(null); });
  cv.addEventListener('pointerleave', () => { ptr.on = false; });
  addEventListener('resize', () => { layout(); kick(); });
  new MutationObserver(() => { colors(); kick(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) kick(); }).observe(cv);
  document.addEventListener('visibilitychange', kick);
  kick();
})();
