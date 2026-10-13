/* ==========================================================================
   The sky — a living background for the protocol pages.
   It follows the Temporal Matrix hour (or local time without the engine):
   a sun glow travels its arc from dawn to dusk, soft aurora fields drift and
   change colour through dawn, day, dusk and night, and stars come out after
   the first sleep begins. SCSky.hour(h) lets a page show another hour
   (the monitor's dial); SCSky.hour(null) returns to now.
   Fixed canvas behind everything; ~30 fps; still under reduced motion.
   ========================================================================== */
(function () {
  'use strict';
  const cv = document.createElement('canvas');
  cv.id = 'sky'; cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;';
  document.body.insertBefore(cv, document.body.firstChild);
  const ctx = cv.getContext('2d');
  const M = window.SCMatrix;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;

  let W = 0, H = 0, col = {}, light = false;
  function colors() {
    const cs = getComputedStyle(document.documentElement), g = n => cs.getPropertyValue(n).trim();
    light = document.documentElement.dataset.theme === 'light';
    col = {};
    ['bg', 'lime', 'teal', 'amber', 'blue', 'violet', 'rose', 'green', 'cream'].forEach(k => col[k] = rgb(g('--' + k)));
  }
  function rgb(h) { if (!h || h[0] !== '#') return [200, 220, 180]; const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  const mix = (a, b, k) => [0, 1, 2].map(i => a[i] + (b[i] - a[i]) * k);
  const css = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  function size() {
    W = innerWidth; H = innerHeight;
    cv.width = W; cv.height = H;              // device-independent: the sky is soft by nature
  }

  /* the moods of the day, by Matrix hour */
  const MOODS = [
    { h: 0,  a: 'violet', b: 'blue',  c: 'teal',  star: 1,   glow: .10 },
    { h: 4,  a: 'blue',   b: 'violet', c: 'teal', star: .9,  glow: .10 },
    { h: 6,  a: 'blue',   b: 'violet', c: 'rose', star: .2, glow: .14 },
    { h: 9,  a: 'lime',   b: 'teal',  c: 'amber', star: 0,   glow: .13 },
    { h: 13, a: 'lime',   b: 'teal',  c: 'green', star: 0,   glow: .14 },
    { h: 17, a: 'teal',   b: 'violet', c: 'amber', star: 0,  glow: .14 },
    { h: 19.5, a: 'violet', b: 'rose', c: 'blue', star: .35, glow: .13 },
    { h: 21, a: 'violet', b: 'blue',  c: 'teal',  star: .9,  glow: .11 },
    { h: 24, a: 'violet', b: 'blue',  c: 'teal',  star: 1,   glow: .10 }
  ];
  function mood(h) {
    let i = 0; while (i < MOODS.length - 2 && MOODS[i + 1].h <= h) i++;
    const A = MOODS[i], B = MOODS[i + 1], k = (h - A.h) / (B.h - A.h);
    const s = k * k * (3 - 2 * k);
    return { a: mix(col[A.a], col[B.a], s), b: mix(col[A.b], col[B.b], s), c: mix(col[A.c], col[B.c], s),
             star: A.star + (B.star - A.star) * s, glow: A.glow + (B.glow - A.glow) * s };
  }

  const STARS = Array.from({ length: 260 }, () => ({ x: Math.random(), y: Math.random() * .85, s: Math.random() < .07 ? 1.8 : .6 + Math.random() * .8, p: Math.random() * TAU, f: .4 + Math.random() * 1.4 }));
  const BLOBS = [
    { k: 'a', x: .18, y: .22, r: .75, ax: .06, ay: .05, fx: .031, fy: .027 },
    { k: 'b', x: .82, y: .3,  r: .7,  ax: .05, ay: .07, fx: .023, fy: .035 },
    { k: 'c', x: .5,  y: .92, r: .85, ax: .08, ay: .04, fx: .019, fy: .025 }
  ];

  let forced = null, curH = null;
  function hourNow() {
    if (forced !== null) return forced;
    try {
      if (M) { if (M.CAL360.longitude === null) M.CAL360.longitude = -new Date().getTimezoneOffset() / 4; return M.cal360(new Date()).phi * 24; }
    } catch (e) {}
    const d = new Date(); return d.getHours() + d.getMinutes() / 60;
  }
  const solarOf = h => (M ? M.consumed(((h % 24) + 24) % 24 / 24, 1) : h / 24);   // where the sun actually is

  function draw(t) {
    const target = hourNow();
    if (curH === null) curH = target;
    let d = target - curH; if (d > 12) d -= 24; if (d < -12) d += 24;
    curH = (curH + d * (forced !== null ? .18 : .05) + 24) % 24;       // the sky eases to a travelled hour
    const m = mood(curH), sc = Math.min(1, scrollY / (H * 3));
    const sf = solarOf(curH);                          // 0 midnight … .5 noon
    const day = Math.sin((sf - .25) * TAU);            // -1 midnight … 1 noon
    const low = Math.max(0, 1 - Math.abs(day) / .45);  // 1 when the sun is at the horizon
    const bg = col.bg;

    // the sky itself: a vertical gradient in the mood of the hour
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    if (light) {
      sky.addColorStop(0, css(mix(bg, m.a, .07), 1));
      sky.addColorStop(.6, css(bg, 1));
      sky.addColorStop(1, css(mix(bg, mix(col.amber, col.rose, .5), .10 * low + .03), 1));
    } else {
      sky.addColorStop(0, css(mix(bg, m.a, .09 + .1 * Math.max(0, day)), 1));
      sky.addColorStop(.55, css(mix(bg, m.b, .06), 1));
      sky.addColorStop(1, css(mix(bg, mix(col.amber, col.rose, .45), .22 * low), 1));
    }
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

    // soft fields of colour, drifting
    ctx.globalCompositeOperation = light ? 'source-over' : 'screen';
    BLOBS.forEach((B, i) => {
      const x = (B.x + B.ax * Math.sin(t * B.fx + i)) * W;
      const y = (B.y + B.ay * Math.cos(t * B.fy + i * 2) - sc * .12 * (i + 1)) * H;
      const r = B.r * Math.max(W, H), c = m[B.k];
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, css(c, light ? .07 : .10));
      g.addColorStop(.5, css(c, light ? .025 : .035));
      g.addColorStop(1, css(c, 0));
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    });

    // aurora ribbons, by night
    const night = m.star;
    if (night > .05 && !light) {
      for (let k = 0; k < 2; k++) {
        const c = k ? col.violet : col.teal;
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const u = i / 40, x = u * W * 1.2 - W * .1;
          const y = H * (.12 + k * .09) + Math.sin(u * 5 + t * .07 + k * 2) * H * .06 + Math.sin(u * 11 - t * .05) * H * .02 - sc * H * .1;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.filter = 'blur(38px)';
        ctx.strokeStyle = css(c, .09 * night); ctx.lineWidth = H * .07;
        ctx.stroke();
        ctx.filter = 'none';
      }
    }

    // the sun: travels its arc by day; a band of light on the horizon at dawn and dusk
    if (day > -.3) {
      const k = Math.min(1, (day + .3) / .5);
      const sx = W * (.08 + .84 * ((sf - .25) / .5));
      const sy = H * (1.04 - .98 * Math.max(0, day));
      const warm = light ? mix(mix(col.amber, col.rose, .3 * low), [255, 248, 228], .72)
                         : mix(mix(col.amber, col.rose, .35 * low), col.cream, Math.max(0, day) * .8);
      const r = Math.max(W, H) * (.5 + .2 * low);
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r);
      g.addColorStop(0, css(warm, (light ? .22 : m.glow * 1.3) * k));
      g.addColorStop(.3, css(warm, (light ? .08 : m.glow * .45) * k));
      g.addColorStop(1, css(warm, 0));
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (low > .05) {
        const hz = ctx.createLinearGradient(0, H * .7, 0, H);
        hz.addColorStop(0, css(warm, 0)); hz.addColorStop(1, css(warm, (light ? .12 : .16) * low * k));
        ctx.fillStyle = hz; ctx.fillRect(0, H * .7, W, H * .3);
      }
    }
    ctx.globalCompositeOperation = 'source-over';

    // stars, wheeling slowly round a pole above the page
    if (night > .02 && !light) {
      const px = W * .5, py = -H * .35, rot = reduce ? 0 : t * .0035;
      const cr = Math.cos(rot), sr = Math.sin(rot);
      for (const s of STARS) {
        const x0 = s.x * W * 1.3 - W * .15 - px, y0 = s.y * H * 1.2 - py;
        const x = px + x0 * cr - y0 * sr, y = py + x0 * sr + y0 * cr - sc * H * .08;
        if (x < -2 || x > W + 2 || y < -2 || y > H * .9) continue;
        const tw = reduce ? .7 : .5 + .5 * Math.sin(t * s.f + s.p);
        const a = (.35 + .6 * tw) * night * (1 - y / (H * .95));
        ctx.fillStyle = `rgba(238,240,230,${a})`;
        if (s.s > 1.2) { ctx.shadowColor = 'rgba(238,240,230,.8)'; ctx.shadowBlur = 6; }
        ctx.beginPath(); ctx.arc(x, y, s.s * .8, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
      }
    } else if (light) {                                // by light: slow dust in the air
      for (let i = 0; i < 70; i++) {
        const s = STARS[i];
        const x = ((s.x + t * .004 * s.f) % 1) * W, y = ((s.y + Math.sin(t * .1 + s.p) * .01) % 1) * H;
        ctx.fillStyle = `rgba(53,107,49,${.1 * (.5 + .5 * Math.sin(t * s.f + s.p))})`;
        ctx.fillRect(x, y, 1.2, 1.2);
      }
    }
  }

  let last = 0, running = false, t0 = performance.now();
  function frame(now) {
    if (document.hidden) { running = false; return; }
    running = true;
    if (now - last > 33) { last = now; draw((now - t0) / 1000); }
    requestAnimationFrame(frame);
  }
  colors(); size();
  addEventListener('resize', () => { size(); if (reduce) draw(0); });
  new MutationObserver(() => { colors(); if (reduce) draw(0); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !running && !reduce) requestAnimationFrame(frame); });
  if (reduce) { draw(0); setInterval(() => draw(0), 60000); }
  else requestAnimationFrame(frame);

  window.SCSky = { hour(h) { forced = h === null || h === undefined ? null : ((h % 24) + 24) % 24; if (reduce) { curH = null; draw(0); } } };
})();
