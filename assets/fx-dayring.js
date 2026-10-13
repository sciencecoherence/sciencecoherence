/* ==========================================================================
   The day ring — Master Protocol.
   The protocol's twenty-four hours on the Temporal Matrix face (00:00 top).
   As the reader moves through the section, the ring turns the window being
   read to the top and lights it; the rest of the day falls quiet. A stream
   of light runs round the rim, the day as a generative flow. The live Matrix
   hour is marked when the engine is present. Outside-the-day strata open an
   outer orbit instead of a window.
   API: SCDayRing.focus(ids | 'all' | 'beyond'), SCDayRing.onPick(fn)
   ========================================================================== */
(function () {
  'use strict';
  const cv = document.getElementById('dayring');
  const P = window.SCProtocol;
  if (!cv || !P) return;
  const ctx = cv.getContext('2d');
  const M = window.SCMatrix;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;
  const WIN = P.WINDOWS;
  const spans = WIN.filter(w => w.end > w.start), points = WIN.filter(w => w.end === w.start);

  let W = 0, H = 0, cx = 0, cy = 0, R = 0, compact = false, col = {};
  function colors() {
    const cs = getComputedStyle(document.documentElement), g = n => cs.getPropertyValue(n).trim();
    col = { l: g('--l-rgb'), c: g('--c-rgb'), lime: g('--lime'), cream: g('--cream'), serif: g('--serif'), mono: g('--mono'), light: document.documentElement.dataset.theme === 'light' };
    ['teal', 'amber', 'blue', 'violet', 'rose', 'green'].forEach(k => col[k] = g('--' + k));
  }
  const hex = (h, a) => { if (!h || h[0] !== '#') return `rgba(${col.l},${a})`; const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
  function layout() {
    const b = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    W = b.width; H = b.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    compact = W < 200;
    R = compact ? Math.min(W, H) * .4 : Math.min(W, H) * .34;
    cx = W / 2; cy = H / 2;
  }

  /* ---- state, all eased ---- */
  const wt = {}; WIN.forEach(w => wt[w.id] = { v: .35, t: .35 });
  let mode = 'all', rot = 0, rotT = 0, beyond = 0, beyondT = 0, pick = null, focusIds = [];
  const mid = w => (w.start + (w.end > w.start ? w.end : w.start)) / 2;
  const angOf = h => h / 24 * TAU - Math.PI / 2;
  function shortest(from, to) { let d = (to - from) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return from + d; }

  function focus(what) {
    if (what === 'all' || what === 'beyond') {
      mode = what; focusIds = [];
      WIN.forEach(w => wt[w.id].t = what === 'all' ? .62 : .16);
      beyondT = what === 'beyond' ? 1 : 0;
      return;
    }
    mode = 'focus'; focusIds = what; beyondT = 0;
    WIN.forEach(w => wt[w.id].t = what.includes(w.id) ? 1 : .2);
    // turn the centre of the focused windows to the top
    const ws = WIN.filter(w => what.includes(w.id));
    if (!ws.length) return;
    let sx = 0, sy = 0;
    ws.forEach(w => { const a = mid(w) / 24 * TAU; sx += Math.sin(a); sy += Math.cos(a); });
    const m = Math.atan2(sx, sy);             // angle of the focus from 00:00
    rotT = shortest(rot, -m);
  }

  /* ---- the stream of light round the rim ---- */
  const FLOW = Array.from({ length: 150 }, () => ({ a: Math.random() * TAU, v: .05 + Math.random() * .12, r: .98 + Math.random() * .16, s: .6 + Math.random() * 1.4, p: Math.random() * TAU }));

  /* ---- the live Matrix hour ---- */
  let liveH = null, lastLive = 0;
  function live(now) {
    if (!M || now - lastLive < 1000) return;
    lastLive = now;
    try { if (M.CAL360.longitude === null) M.CAL360.longitude = -new Date().getTimezoneOffset() / 4; liveH = M.cal360(new Date()).phi * 24; } catch (e) { liveH = null; }
  }

  function draw(t, now) {
    ctx.clearRect(0, 0, W, H);
    const k = reduce ? 1 : .065;
    if (mode === 'all' && !reduce) rotT -= .0009;
    rot += (rotT - rot) * k;
    beyond += (beyondT - beyond) * k;
    WIN.forEach(w => { const o = wt[w.id]; o.v += (o.t - o.v) * k; });
    live(now);

    const r = R * (1 - .22 * beyond);
    const th = Math.max(compact ? 5 : 9, r * .085);
    const A = col.light ? 1.2 : 1;
    const ang = h => angOf(h) + rot;

    // halo
    const g = ctx.createRadialGradient(cx, cy, r * .2, cx, cy, r * 1.5);
    g.addColorStop(0, `rgba(${col.l},${.06})`); g.addColorStop(1, `rgba(${col.l},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r * 1.5, 0, TAU); ctx.fill();

    // rim and hours
    ctx.lineWidth = 1; ctx.strokeStyle = `rgba(${col.l},.2)`;
    ctx.beginPath(); ctx.arc(cx, cy, r * 1.14, 0, TAU); ctx.stroke();
    if (!compact) {
      for (let i = 0; i < 96; i++) {
        const a = ang(i / 4), big = i % 12 === 0, maj = i % 4 === 0, l = big ? r * .06 : maj ? r * .035 : r * .015;
        ctx.strokeStyle = `rgba(${col.l},${big ? .6 : maj ? .32 : .14})`;
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r * 1.14, cy + Math.sin(a) * r * 1.14); ctx.lineTo(cx + Math.cos(a) * (r * 1.14 - l), cy + Math.sin(a) * (r * 1.14 - l)); ctx.stroke();
      }
      ctx.font = `400 ${Math.max(9, r * .042)}px ${col.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (let i = 0; i < 24; i += 3) {
        const a = ang(i), rr = r * 1.14 + Math.max(15, r * .09);
        ctx.fillStyle = `rgba(${col.l},${i % 6 === 0 ? .7 : .38})`;
        ctx.fillText(String(i).padStart(2, '0'), cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      }
    }

    // the stream
    if (!compact || true) {
      for (const f of FLOW) {
        if (!reduce) f.a += f.v * .016;
        const h = ((f.a / TAU) * 24) % 24;
        const inW = spans.find(w => h >= w.start && h < w.end);
        const boost = inW ? wt[inW.id].v : .2;
        const a = ang(h), rr = r * f.r;
        const tw = .5 + .5 * Math.sin(t * 2 * f.s + f.p);
        ctx.fillStyle = inW && boost > .6 ? hex(col[inW.accent], (.25 + .6 * tw) * boost * A) : `rgba(${col.c},${(.05 + .12 * tw) * A})`;
        const s = (compact ? .9 : 1.3) * f.s * (inW && boost > .6 ? 1.3 : 1);
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, s, 0, TAU); ctx.fill();
      }
    }

    // the windows
    spans.forEach(w => {
      const v = wt[w.id].v, c = col[w.accent];
      const a0 = ang(w.start) + .014, a1 = ang(w.end) - .014;
      const width = (w.kind === 'rest' ? th : th * .74) * (.85 + .35 * Math.max(0, v - .5) * 2);
      if (v > .6) { ctx.shadowColor = c; ctx.shadowBlur = 22 * (v - .6) * 2.5; }
      ctx.strokeStyle = hex(c, (.08 + .82 * v) * A);
      ctx.lineWidth = width; ctx.lineCap = 'butt';
      ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1); ctx.stroke();
      ctx.shadowBlur = 0;
      if (!compact && v > .45 && w.end - w.start >= 1.5) {
        const am = ang(mid(w)), lr = r - th * 1.5;
        ctx.save(); ctx.translate(cx + Math.cos(am) * lr, cy + Math.sin(am) * lr);
        let rt = am + Math.PI / 2; if (Math.sin(am) > 0) rt += Math.PI; ctx.rotate(rt);
        ctx.font = `500 ${Math.max(8, r * .036)}px ${col.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = hex(c, Math.min(1, (v - .3) * 1.4));
        ctx.fillText(w.short.toUpperCase().split('').join(String.fromCharCode(8202)), 0, 0);
        ctx.restore();
      }
    });
    points.forEach(w => {
      const v = wt[w.id].v, c = col[w.accent], a = ang(w.start);
      const rr = r + th * 1.2, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      ctx.strokeStyle = hex(c, (.12 + .7 * v) * A); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (r - th * .5), cy + Math.sin(a) * (r - th * .5)); ctx.lineTo(x, y); ctx.stroke();
      const s = (compact ? 2 : Math.max(3, r * .017)) * (1 + .6 * Math.max(0, v - .5) * 2);
      if (w.kind === 'mark') {
        ctx.strokeStyle = hex(c, (.2 + .8 * v) * A); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke();
      } else {
        if (v > .6) { ctx.shadowColor = c; ctx.shadowBlur = 16; }
        ctx.fillStyle = hex(c, (.2 + .8 * v) * A); ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
        if (v > .6 && !reduce) { ctx.strokeStyle = hex(c, .35 * (1 - (t * .8 % 1))); ctx.beginPath(); ctx.arc(x, y, s + 3 + 12 * (t * .8 % 1), 0, TAU); ctx.stroke(); }
      }
    });

    // the live Matrix hour
    if (liveH !== null && !compact) {
      const a = ang(liveH);
      ctx.strokeStyle = hex(col.lime, .8); ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r * .72, cy + Math.sin(a) * r * .72); ctx.lineTo(cx + Math.cos(a) * r * 1.2, cy + Math.sin(a) * r * 1.2); ctx.stroke();
      ctx.fillStyle = col.lime; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r * 1.2, cy + Math.sin(a) * r * 1.2, 2.6, 0, TAU); ctx.fill();
      ctx.font = `500 ${Math.max(8, r * .032)}px ${col.mono}`; ctx.textAlign = 'center';
      ctx.fillText('NOW', cx + Math.cos(a) * r * 1.3, cy + Math.sin(a) * r * 1.3);
    }

    // the focus marker at the top
    if (!compact && mode === 'focus') {
      ctx.fillStyle = `rgba(${col.c},.7)`;
      const y = cy - r * 1.14 - 6;
      ctx.beginPath(); ctx.moveTo(cx, y + 5); ctx.lineTo(cx - 4, y - 2); ctx.lineTo(cx + 4, y - 2); ctx.closePath(); ctx.fill();
    }

    // centre: the hour being read
    if (!compact) {
      const ws = WIN.filter(w => focusIds.includes(w.id)).sort((a, b) => ((a.start - 5 + 24) % 24) - ((b.start - 5 + 24) % 24));
      const label = mode === 'beyond' ? 'cyclic' : mode === 'all' ? '24 h' : ws.length ? hm(ws[0].start) + (ws.length > 1 || ws[0].end > ws[0].start ? '–' + hm(Math.max(...ws.map(w => w.end))) : '') : '';
      ctx.font = `300 ${r * (label.length > 6 ? .15 : .22)}px ${col.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(${col.c},${.9 * (1 - beyond * .4)})`;
      ctx.fillText(label, cx, cy);
    }

    // beyond the day: the outer orbit of the cyclic strata
    if (beyond > .01) {
      const ro = R * 1.22;
      ctx.setLineDash([2, 6]); ctx.strokeStyle = hex(col.violet, .5 * beyond); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, ro, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(cx, cy, ro * 1.12, 0, TAU); ctx.strokeStyle = hex(col.rose, .25 * beyond); ctx.stroke();
      const a1 = t * .35, a2 = -t * .12 + 2;
      [[ro, a1, col.violet, 4], [ro * 1.12, a2, col.rose, 5]].forEach(([rr, a, c, s]) => {
        ctx.shadowColor = c; ctx.shadowBlur = 14 * beyond;
        ctx.fillStyle = hex(c, .9 * beyond); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, s, 0, TAU); ctx.fill();
        ctx.shadowBlur = 0;
      });
      if (!compact) {
        ctx.font = `500 ${Math.max(8, R * .03)}px ${col.mono}`; ctx.textAlign = 'center'; ctx.fillStyle = hex(col.violet, .8 * beyond);
        ctx.fillText('OUTSIDE THE DAY', cx, cy + ro * 1.12 + 18);
      }
    }
  }
  const hm = h => { const m = Math.round(((h % 24) + 24) % 24 * 60); return String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };

  /* ---- pick a window on the ring ---- */
  cv.addEventListener('click', e => {
    if (!pick) return;
    const b = cv.getBoundingClientRect(), x = e.clientX - b.left - cx, y = e.clientY - b.top - cy;
    const d = Math.hypot(x, y), rr = R * (1 - .22 * beyond);
    if (d < rr * .75 || d > rr * 1.3) return;
    let h = ((Math.atan2(y, x) - rot + Math.PI / 2) / TAU * 24) % 24; h = (h + 24) % 24;
    const p = points.find(w => Math.abs(((h - w.start + 36) % 24) - 12) < .35);
    const s = spans.find(w => h >= w.start && h < w.end);
    const w = p || s; if (w) pick(w.id);
  });
  cv.addEventListener('pointermove', e => {
    const b = cv.getBoundingClientRect(), d = Math.hypot(e.clientX - b.left - cx, e.clientY - b.top - cy), rr = R * (1 - .22 * beyond);
    cv.style.cursor = pick && d > rr * .75 && d < rr * 1.3 ? 'pointer' : 'default';
  });

  let visible = true, running = false, t0 = performance.now();
  function frame(now) {
    running = visible && !document.hidden;
    if (!running) return;
    draw((now - t0) / 1000, now);
    if (!reduce) requestAnimationFrame(frame); else running = false;
  }
  colors(); layout();
  addEventListener('resize', () => { layout(); if (reduce) draw(0, performance.now()); });
  new MutationObserver(() => { colors(); if (reduce) draw(0, performance.now()); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !running) requestAnimationFrame(frame); }).observe(cv);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible && !running) requestAnimationFrame(frame); });

  window.SCDayRing = {
    focus(what) { focus(what); if (reduce) requestAnimationFrame(n => draw(0, n)); },
    onPick(fn) { pick = fn; },
    relayout: layout
  };
  requestAnimationFrame(frame);
})();
