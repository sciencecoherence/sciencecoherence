/* ==========================================================================
   The holographic boundary — opening animation of the Protocol.
   A sphere of light whose surface carries the information of its interior:
   a scanning band reads the boundary, and each lit boundary point projects
   inward to the part of the bulk it encodes, a double helix of chromatin.
   Canvas 2D, no library. Pauses off-screen, still frame under reduced motion.
   ========================================================================== */
(function () {
  'use strict';
  const cv = document.getElementById('holo');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;

  /* ---- the boundary: a Fibonacci sphere ---- */
  const N = innerWidth < 700 ? 900 : 1500;
  const S = [];
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = GA * i;
    S.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, ph: Math.random() * TAU, f: .6 + Math.random() * 1.8 });
  }

  /* ---- the bulk: a double helix with base-pair rungs ---- */
  const H = [], RUNGS = [];
  const TURNS = 3.2, PER = 64, HR = .27, HH = 1.28;
  for (let s = 0; s < 2; s++) {
    for (let i = 0; i <= PER * TURNS; i++) {
      const u = i / (PER * TURNS), a = u * TURNS * TAU + s * Math.PI;
      H.push({ x: Math.cos(a) * HR, y: (u - .5) * HH, z: Math.sin(a) * HR, s, u });
    }
  }
  const half = H.length / 2;
  for (let i = 0; i < half; i += 8) RUNGS.push([i, i + half]);
  // each helix point is encoded by the boundary point along its own radius
  H.forEach(p => {
    const L = Math.hypot(p.x, p.y, p.z) || 1;
    p.bx = p.x / L; p.by = p.y / L; p.bz = p.z / L;
  });

  let W = 0, Hh = 0, dpr = 1, cx = 0, cy = 0, R = 0;
  let col = {};
  function colors() {
    const cs = getComputedStyle(document.documentElement);
    const g = n => cs.getPropertyValue(n).trim();
    col = { l: g('--l-rgb'), c: g('--c-rgb'), teal: g('--teal'), violet: g('--violet'), lime: g('--lime'), light: document.documentElement.dataset.theme === 'light' };
  }
  const hex = (h, a) => { if (!h || h[0] !== '#') return `rgba(${col.l},${a})`; const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };

  function layout() {
    const b = cv.getBoundingClientRect();
    dpr = Math.min(2, devicePixelRatio || 1);
    W = b.width; Hh = b.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(Hh * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const wide = W > 860;
    R = wide ? Math.min(W * .27, Hh * .36) : Math.min(W * .38, Hh * .23);
    cx = wide ? W * .66 : W * .5;
    cy = wide ? Hh * .47 : Hh * .29;
  }

  /* ---- interaction ---- */
  let mx = 0, my = 0, tx = 0, ty = 0, scrollK = 0;
  addEventListener('pointermove', e => { tx = (e.clientX / innerWidth - .5); ty = (e.clientY / innerHeight - .5); }, { passive: true });
  addEventListener('scroll', () => { scrollK = Math.min(1, scrollY / Math.max(1, cv.offsetHeight)); }, { passive: true });

  /* ---- projection ---- */
  let rotY = 0, rotX = -.32;
  function proj(x, y, z, scale) {
    // rotate about Y, then X
    const cyA = Math.cos(rotY), syA = Math.sin(rotY);
    let x1 = x * cyA + z * syA, z1 = -x * syA + z * cyA;
    const cxA = Math.cos(rotX), sxA = Math.sin(rotX);
    let y1 = y * cxA - z1 * sxA, z2 = y * sxA + z1 * cxA;
    const f = 3.2, k = f / (f - z2);
    return { x: cx + x1 * R * scale * k, y: cy + y1 * R * scale * k, z: z2, k };
  }

  let t0 = performance.now(), visible = true, running = false;
  function frame(now) {
    running = visible && !document.hidden;
    if (!running) return;
    draw((now - t0) / 1000);
    requestAnimationFrame(frame);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, Hh);
    mx += (tx - mx) * .04; my += (ty - my) * .04;
    rotY = t * .09 + mx * 1.1;
    rotX = -.32 + my * .5;
    const scale = 1 + scrollK * .55;
    const fade = 1 - scrollK * .9;
    if (fade <= 0) return;
    const A = col.light ? 1.25 : 1;

    // halo
    const g = ctx.createRadialGradient(cx, cy, R * .1, cx, cy, R * 1.6 * scale);
    g.addColorStop(0, `rgba(${col.l},${.07 * fade})`); g.addColorStop(.55, `rgba(${col.l},${.025 * fade})`); g.addColorStop(1, `rgba(${col.l},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.6 * scale, 0, TAU); ctx.fill();

    // the scanning band: a latitude that sweeps up and down the boundary
    const band = Math.sin(t * .42) * .92;
    const bandW = .085;

    // helix points projected once per frame
    const HP = H.map(p => proj(p.x, p.y, p.z, scale));

    // encoding rays: from boundary points in the band to the bulk they encode
    ctx.lineWidth = .7;
    for (let i = 0; i < H.length; i += 2) {
      const p = H[i];
      const d = Math.abs(p.by - band);
      if (d > bandW * 1.4) continue;
      const w = 1 - d / (bandW * 1.4);
      const a = proj(p.bx, p.by, p.bz, scale), b = HP[i];
      const lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      const c = p.s ? col.violet : col.teal;
      lg.addColorStop(0, hex(c, .0)); lg.addColorStop(.25, hex(c, .32 * w * fade * A)); lg.addColorStop(1, hex(c, .05 * fade));
      ctx.strokeStyle = lg;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }

    // boundary points, back to front
    for (let i = 0; i < N; i++) {
      const s = S[i];
      const p = proj(s.x, s.y, s.z, scale);
      const front = (p.z + 1) / 2;                       // 0 back … 1 front
      const d = Math.abs(s.y - band);
      const lit = d < bandW ? 1 - d / bandW : 0;
      const flick = .5 + .5 * Math.sin(t * s.f + s.ph);
      const a = (.06 + .28 * front + .55 * lit * (.4 + .6 * flick)) * fade * A;
      const r = (.55 + .9 * front + 1.1 * lit) * p.k;
      ctx.fillStyle = lit > .05 ? hex(col.lime, Math.min(1, a)) : `rgba(${col.c},${a * .8})`;
      ctx.fillRect(p.x - r / 2, p.y - r / 2, r, r);
    }

    // the bulk: helix strands, rungs; brightest where the band has just read them
    for (let k = 0; k < RUNGS.length; k++) {
      const [i, j] = RUNGS[k], a = HP[i], b = HP[j];
      const read = Math.max(0, 1 - Math.abs(H[i].by - band) / .35);
      ctx.strokeStyle = `rgba(${col.c},${(.07 + .22 * read) * fade * A})`;
      ctx.lineWidth = .8;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    for (let s = 0; s < 2; s++) {
      const c = s ? col.violet : col.teal;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = s * half; i < (s + 1) * half; i++) { const p = HP[i]; i === s * half ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); }
      ctx.strokeStyle = hex(c, .42 * fade * A); ctx.stroke();
      for (let i = s * half; i < (s + 1) * half; i += 3) {
        const p = HP[i], read = Math.max(0, 1 - Math.abs(H[i].by - band) / .2);
        if (read <= 0) continue;
        ctx.fillStyle = hex(c, Math.min(1, (.3 + .7 * read) * fade));
        ctx.shadowColor = c; ctx.shadowBlur = 10 * read;
        ctx.beginPath(); ctx.arc(p.x, p.y, (1 + 1.6 * read) * p.k, 0, TAU); ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    // the band itself, as a faint ellipse on the boundary
    ctx.beginPath();
    for (let i = 0; i <= 96; i++) {
      const a = i / 96 * TAU, rr = Math.sqrt(1 - band * band);
      const p = proj(Math.cos(a) * rr, band, Math.sin(a) * rr, scale);
      i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
    }
    ctx.strokeStyle = hex(col.lime, .22 * fade * A); ctx.lineWidth = 1; ctx.stroke();
  }

  colors(); layout();
  addEventListener('resize', layout);
  new MutationObserver(colors).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (reduce) { draw(6); addEventListener('resize', () => draw(6)); return; }
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !running) requestAnimationFrame(frame); }).observe(cv);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible && !running) requestAnimationFrame(frame); });
  requestAnimationFrame(frame);
})();
