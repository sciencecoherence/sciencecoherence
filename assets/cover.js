/* =============================================================================
   Science Coherence — Opening cover script
   Equinox countdown · ICS invite · field canvas · motion control
   ============================================================================= */

(() => {
  'use strict';

  const root = document.querySelector('.opening-cover');
  if (!root) return;

  const FALLBACK_EPOCH = Date.UTC(2027, 2, 20, 20, 25, 0);
  const epoch = (typeof window.SC_LAUNCH_EPOCH === 'number' && Number.isFinite(window.SC_LAUNCH_EPOCH))
    ? window.SC_LAUNCH_EPOCH
    : FALLBACK_EPOCH;

  const units = {
    days: root.querySelector('[data-countdown="days"]'),
    hours: root.querySelector('[data-countdown="hours"]'),
    minutes: root.querySelector('[data-countdown="minutes"]'),
    seconds: root.querySelector('[data-countdown="seconds"]')
  };
  const statusEl = root.querySelector('#cover-launch-status');
  const openedEl = root.querySelector('#cover-opened');
  const motionBtn = root.querySelector('#cover-motion');
  const canvas = root.querySelector('#coherence-field');
  const scrollBtn = root.querySelector('#cover-scroll-btn');
  const topBtn = root.querySelector('#cover-top-btn');
  const calButtons = [
    root.querySelector('#cover-add-cal'),
    root.querySelector('#cover-hero-cal')
  ].filter(Boolean);

  const epochEl = root.querySelector('.cover-epoch');
  if (epochEl && Number.isFinite(epoch)) {
    const d = new Date(epoch);
    epochEl.textContent =
      new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d)
      + ' · '
      + new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'UTC' }).format(d)
      + ' UTC';
    epochEl.title = 'Local: ' + d.toLocaleString();
  }

  function tickCountdown() {
    const remaining = Math.max(0, Math.ceil((epoch - Date.now()) / 1000));
    const d = Math.floor(remaining / 86400);
    const h = Math.floor((remaining % 86400) / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;

    if (units.days) units.days.textContent = String(d).padStart(3, '0');
    if (units.hours) units.hours.textContent = String(h).padStart(2, '0');
    if (units.minutes) units.minutes.textContent = String(m).padStart(2, '0');
    if (units.seconds) units.seconds.textContent = String(s).padStart(2, '0');

    const opened = remaining === 0;
    if (statusEl) statusEl.textContent = opened ? 'The opening' : 'Opening in';
    if (openedEl) openedEl.hidden = !opened;
  }

  tickCountdown();
  setInterval(tickCountdown, 1000);

  function downloadICS() {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Science Coherence//Opening 2027//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:opening-20270320-${Date.now()}@sciencecoherence.org`,
      `DTSTAMP:${stamp}`,
      'DTSTART:20270320T202500Z',
      'DTEND:20270320T220000Z',
      'SUMMARY:Science Coherence — The Opening',
      'DESCRIPTION:Science Coherence opening and the start of Temporal Matrix absorption.\\nImagination becomes reality.\\nhttps://sciencecoherence.org',
      'LOCATION:https://sciencecoherence.org',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'science-coherence-opening-2027.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  calButtons.forEach(btn => btn.addEventListener('click', downloadICS));

  if (scrollBtn) {
    scrollBtn.addEventListener('click', e => {
      e.preventDefault();
      const story = root.querySelector('#cover-story');
      if (story) story.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (topBtn) {
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const brandLink = root.querySelector('.cover-brand');
  if (brandLink) {
    brandLink.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const skipLink = root.querySelector('.cover-skip');
  if (skipLink) {
    skipLink.addEventListener('click', e => {
      e.preventDefault();
      const mainEl = root.querySelector('#cover-main');
      if (mainEl) {
        mainEl.focus();
        mainEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let raf = 0;
  let w = 0;
  let h = 0;
  let last = 0;
  let phase = 0;
  let targetX = 0;
  let targetY = 0;
  let ptrX = 0;
  let ptrY = 0;

  const STAR_COUNT = 90;
  const stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: ((Math.sin(i * 127.1 + 1.2) * 43758.5453) % 1 + 1) % 1,
      y: ((Math.sin(i * 311.7 + 3.4) * 15731.731) % 1 + 1) % 1,
      r: i % 11 === 0 ? 1.4 : (i % 4 === 0 ? 1.0 : 0.55),
      base: i % 6 === 0 ? 0.38 : 0.14,
      speed: 0.55 + (i % 7) * 0.28,
      offset: (i * 0.37) % (Math.PI * 2)
    });
  }

  function resize() {
    if (!canvas.parentElement) return;
    const box = canvas.parentElement.getBoundingClientRect();
    w = box.width;
    h = box.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
  }

  function draw() {
    if (!ctx || !w || !h) return;
    ctx.clearRect(0, 0, w, h);

    ptrX += (targetX - ptrX) * 0.05;
    ptrY += (targetY - ptrY) * 0.05;

    const mobile = w <= 720;
    const cx = w * (mobile ? 0.72 : 0.76) + ptrX * 18;
    const cy = h * 0.48 + ptrY * 14;
    const core = Math.min(w * 0.26, h * 0.34);

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, core * 1.45);
    glow.addColorStop(0, 'rgba(110, 231, 183, 0.08)');
    glow.addColorStop(0.45, 'rgba(84, 180, 140, 0.03)');
    glow.addColorStop(1, 'rgba(5, 10, 8, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < STAR_COUNT; i++) {
      const s = stars[i];
      const pulse = Math.sin(phase * s.speed + s.offset);
      const alpha = Math.max(0.04, s.base + pulse * 0.12);
      ctx.fillStyle = `rgba(216, 245, 145, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.x * w + ptrX * 6 * s.r, s.y * h + ptrY * 6 * s.r, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'screen';
    const rings = 12;
    for (let j = 0; j < rings; j++) {
      const t = j / rings;
      const radius = core * (0.42 + t * 0.9);
      const alpha = (0.025 + (1 - t) * 0.055) * (1 + Math.sin(phase * 0.7 + j) * 0.15);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(phase * 0.025 + j * 0.1);
      ctx.scale(1, 0.44);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167, 243, 208, ${alpha.toFixed(3)})`;
      ctx.lineWidth = j % 3 === 0 ? 0.8 : 0.45;
      ctx.stroke();

      if (j % 3 === 0) {
        const ang = (phase * (0.28 + (1 - t) * 0.4) + j * 1.618) % (Math.PI * 2);
        ctx.beginPath();
        ctx.arc(Math.cos(ang) * radius, Math.sin(ang) * radius, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(238, 255, 180, 0.75)';
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function frame(now) {
    raf = 0;
    if (paused || !ctx) return;
    if (now - last >= 32) {
      phase += Math.min((now - last) / 1000, 0.055);
      last = now;
      draw();
    }
    raf = requestAnimationFrame(frame);
  }

  function syncAnimation() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (!paused && ctx) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  function updateMotionButton() {
    if (!motionBtn) return;
    motionBtn.setAttribute('aria-pressed', String(paused));
    motionBtn.textContent = paused ? 'Motion' : 'Pause';
  }

  if (motionBtn) {
    motionBtn.addEventListener('click', () => {
      paused = !paused;
      updateMotionButton();
      syncAnimation();
    });
  }

  reducedMotion.addEventListener('change', () => {
    paused = reducedMotion.matches;
    updateMotionButton();
    syncAnimation();
  });

  window.addEventListener('pointermove', e => {
    if (paused) return;
    targetX = (e.clientX / window.innerWidth) - 0.5;
    targetY = (e.clientY / window.innerHeight) - 0.5;
  }, { passive: true });

  window.addEventListener('resize', resize, { passive: true });
  if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
    new ResizeObserver(resize).observe(canvas.parentElement);
  }

  resize();
  updateMotionButton();
  syncAnimation();
})();
