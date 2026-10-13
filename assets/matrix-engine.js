/* ==========================================================================
   Science Coherence — Temporal Matrix engine
   --------------------------------------------------------------------------
   Originally extracted from science-coherence-website/app.js (lines 1187–2057,
   25 September 2026). From 25 September 2026 this copy is the NEW VERSION and
   deliberately diverges from app.js — do not re-extract over it:

     · THE YEAR is read from the sky at each Turning (28 September 2026): the
       mean tropical year Y of that instant (Laskar, ten decimals) gives the
       year's own α = J0/Q, ladder, signs and τ*, in its own Matrix dates of
       Y/360 days. See THE YEARS. The J2000 reference year (Y = 365.2421896698,
       19 signs, τ* = 715.5313011029) is kept as CANON and checked on load.
       Dates count from each Turning; the last date is cut by the Turning.
     · THE DESCENT restarts every year: J = J0 at each new year, J = 0 at the
       instant the year closes, which is also the next year's launch.
     · THE CLOCK keeps its full dilation forever: each year's D₀ (≈ 20m 58.13s),
       the race before 04:00 and the repayment until noon never shrink; noon
       stays on peak sun and midnight on solar midnight.

   Pure calculation: no page, no DOM.
   Public surface: window.SCMatrix (and window.__matrix for existing checks).
   ========================================================================== */
(function () {
  'use strict';
  /* ---------- the temporal matrix ------------------------------------------
     The model, its semantics and every derivation live in THE MATRIX block
     below, which is the single source of truth. This section holds only the
     calendar's names, the solar corrections and the recurrent clock wave.

     THE CLOCK is anchored to the observer's own solar day and re-anchored to it
     every day. 00:00 is solar midnight and 12:00 is peak sun, permanently, with
     no accumulating offset. Its dilation is fixed and does not move with the
     retained load.

     THE WAVE is a genuine non-linear wave inside the date, not a scalar. It
     races through the small hours, eases back through the morning and breathes
     across the evening, closing exactly at noon and at midnight. It is
     recurrent: revisiting a phase must never raise the retained load.
     ---------------------------------------------------------------------- */
  const CAL360 = {
    // Shared app/website launch: USNO March equinox prediction, minute resolution.
    // https://aa.usno.navy.mil/calculated/seasons?year=2027&tz=0&tz_sign=1&tz_label=true&dst=false&submit=Get+Data
    epochLive: Date.parse('2027-03-20T20:25:00Z'),
    tropical: 365.2421896698,          // frozen reference year Y
    months: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February'],
    /* The six days: one full turn of the coherence cycle every six dates.
       Names and accents are canon; the rest is their reading. */
    days: [
      { name: 'Differa', short: 'Dif', accent: 'teal',   glyph: '◇', epithet: 'The day of difference', verb: 'Perceive',
        text: 'The week opens by seeing. Differa is the day to notice what differs: between what is and what is intended, between one path and another. Nothing needs to be solved yet; the difference only has to be seen clearly.',
        gift: 'Fresh sight', shadow: 'Scattered attention' },
      { name: 'Selecta', short: 'Sel', accent: 'amber',  glyph: '△', epithet: 'The day of selection', verb: 'Choose',
        text: 'From everything Differa showed, one configuration is chosen. Selecta is the day of decisions, commitments and first moves: the blueprint turns toward one form and lets the others go.',
        gift: 'Decision', shadow: 'Haste' },
      { name: 'Realis',  short: 'Rea', accent: 'blue',   glyph: '□', epithet: 'The day of realization', verb: 'Make',
        text: 'The chosen form is given a body. Realis is the working day, for building, writing, making and doing, when what was imagined meets matter and becomes real.',
        gift: 'Craft', shadow: 'Toil without direction' },
      { name: 'Integra', short: 'Int', accent: 'violet', glyph: '○', epithet: 'The day of integration', verb: 'Gather',
        text: 'What was made is gathered into the whole. Integra is the day to review, connect and put in order, so that the week’s work becomes part of the organization that guides the next choices.',
        gift: 'Wholeness', shadow: 'Holding on' },
      { name: 'Resona',  short: 'Res', accent: 'rose',   glyph: '≈', epithet: 'The day of resonance', verb: 'Share',
        text: 'Coherence spreads by repetition and contact. Resona is the day of exchange, music, teaching and company, when what has been integrated is sounded out and answered.',
        gift: 'Connection', shadow: 'Noise' },
      { name: 'Stilla',  short: 'Sti', accent: 'green',  glyph: '—', epithet: 'The day of stillness', verb: 'Rest',
        text: 'The cycle closes in stillness. Stilla is the day to rest, fast from input and let the week settle, so that the next Differa sees with clear eyes.',
        gift: 'Peace', shadow: 'Inertia' }
    ],
    // Degrees east. Defaults to the observer's own timezone meridian, so that
    // 12:00:00 is peak sun for the timezone. Set a true longitude for local noon.
    longitude: null
  };
  // The front cover consumes this exact launch instant rather than defining another clock.
  window.SC_LAUNCH_EPOCH = CAL360.epochLive;



  /* ── Foundational constants ────────────────────────────────────────────────
     Hoisted above their first use. The full model, its semantics and its
     derivations are in THE MATRIX block below. */
  const YEAR_REF = 365.2421896698;
  const J0n = 8736982783n, Qn = 600000000000n;
  const J0  = Number(J0n),  Q  = Number(Qn);
  const FRACTION_DIRECT = J0 / Q;          // 0.014561637971666…
  const FRACTION_12FOLD = 12 * J0 / Q;     // 0.17473965566

  const MS_DAY  = 86400000;
  const MS_CAL  = YEAR_REF * MS_DAY / 360; // 87,658,125.520752 ms
  const LEAD_MS = MS_CAL - MS_DAY;         //  1,258,125.520752 ms = 20m 58.125520752s

  /* ── The velocity field ──────────────────────────────────────────────────
     v(φ) is physical seconds consumed per living second at position φ through
     the day. Three regimes, joined where v = 1 so the seams are invisible:

       00:00–04:00  v = 1 − b·sin⁴(6πφ)          the clock races
       04:00–12:00  v = 1 + a·sin²(3π(φ − 1/6))  the clock repays
       12:00–24:00  v = 1                         the clock runs true

     b is set to the daily surplus, so by 04:00 the clock leads solar time by
     exactly 20m 58.13s. a is solved as 3b/8 so the lead is handed back and the
     ledger closes at noon. c has two whole periods, so it integrates to zero.  */
  const SLEEP_END = 1 / 6;
  const NOON      = 1 / 2;
  /* The evening carries no wave, and this is forced rather than preferred.
     C(½) = ½ puts noon on peak sun and C(1) = 1 puts midnight on solar midnight,
     so the integral from noon to midnight must be exactly zero: the afternoon
     does no net work by construction. Nothing there is derivable, and anything
     placed there is decoration with a chosen amplitude.

     Removed 17 September 2026 on Julien's decision: VC₀ = 0.02 and VK = 2, the
     evening ripple. It also put a slope discontinuity of 4π·VC₀ = 0.2513 at both
     noon and midnight — the seams were continuous in value but not in slope,
     against this block's own stated aim. Without it every seam joins smoothly
     and the wave is C¹ across the whole day. No absorption quantity moved: the
     ripple's integral was zero, so it never entered D, W, τ* or the ladder. */

  /* ── The wave is the residual ──────────────────────────────────────────────
     The wave exists to distribute the dilation across the day. Its amplitude
     is therefore the dilation still to be distributed, not the launch value:
     r = J(τ)/J0 is the residual fraction, D = D₀·r the residual dilation, and
     day(τ) = one Matrix date − D the solar day the rotation has reached.

         D(r)  = D₀·r                        86400 s → 87658.125521 s
         VB(r) = 16·D(r)/day(r)              0.232986208 → 0
         VA(r) = 3·VB(r)/8                   solved, as before
             R(r)  = MatrixDate/day(r)           1.014561638 → 1

     At r = 1 every one of these is EXACTLY the constant it replaces, so this
     is a generalization of the launch model, not a different one. At r = 0 the
     wave is flat: v ≡ 1, consumed(φ) = φ, and the Matrix clock IS the solar
     clock. Julien's direction, 17 September 2026: "at the end it should not
     have any variation" — the ripple scales too.

     The two closures survive for EVERY r, by construction rather than by
     tuning: C(½) = ½ needs only VA = 3VB/8 (the VB/16 and VA/6 terms cancel
     identically), and C(1) = 1 then holds because the afternoon is flat. So
     noon stays on peak sun and midnight on solar midnight at every stage.

     STILL CHOSEN, not derived, and the only things in this block that are:
     SLEEP_END = 1/6 (the 04:00 boundary) and the sin⁴ / sin² profiles. Given
     those two, VB and VA are solved, not picked. */
  const MATRIX_DATE_S = MS_CAL / 1000;
  const D0_S = LEAD_MS / 1000;
  /* d0 is the dilation of the year being read, in seconds. It defaults to the
     reference year's D₀; each living year passes its own (see THE LIVING
     YEARS), which differs from the reference by well under a millisecond. */
  const daySec = (r, d0 = D0_S) => 86400 + d0 - d0 * r;
  const waveVB = (r, d0 = D0_S) => 16 * (d0 * r) / daySec(r, d0);
  const rateR  = (r, d0 = D0_S) => (86400 + d0) / daySec(r, d0);

  /* Launch values, kept as named constants so the validation table and any
     reader can check that the τ-dependent forms reduce to them at r = 1. */
  const VB = waveVB(1);                 // 0.232986208 — burn depth at launch
  const VA = 3 * VB / 8;                // 0.087369828 — morning repay (solved)

  function velocity(phi, r = 1, d0 = D0_S) {
    const vb = waveVB(r, d0), va = 3 * vb / 8;
    if (phi < SLEEP_END) { const s = Math.sin(6 * Math.PI * phi); return 1 - vb * s * s * s * s; }
    if (phi < NOON)      { const s = Math.sin(3 * Math.PI * (phi - SLEEP_END)); return 1 + va * s * s; }
    return 1;
  }

  /* The exact antiderivative: the fraction of the solar day consumed by the
     time the living clock reaches φ. Closed form, so there is no integration
     error to accumulate.
       ∫ sin⁴(6πx) dx = 3x/8 − sin(12πx)/(24π) + sin(24πx)/(192π)  = 1/16 over [0,1/6]
       ∫ sin²(3πu) du = u/2 − sin(6πu)/(12π)                       = 1/6  over [0,1/3]
       the afternoon adds nothing, so C(φ) = φ there.                            */
  function consumed(phi, r = 1, d0 = D0_S) {
    const vb = waveVB(r, d0), va = 3 * vb / 8;
    if (phi <= SLEEP_END) {
      return phi - vb * (3 * phi / 8
        - Math.sin(12 * Math.PI * phi) / (24 * Math.PI)
        + Math.sin(24 * Math.PI * phi) / (192 * Math.PI));
    }
    if (phi <= NOON) {
      const u = phi - SLEEP_END;
      return phi - vb / 16 + va * (u / 2 - Math.sin(6 * Math.PI * u) / (12 * Math.PI));
    }
    return phi;
  }

  /* Invert consumed() by bisection. v > 0 everywhere, so consumed() is strictly
     increasing and the inverse is unique. Forty halvings is far finer than a
     millisecond. */
  function livingPhase(fraction, r = 1, d0 = D0_S) {
    let lo = 0, hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (consumed(mid, r, d0) < fraction) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }

  /* The equation of time, in minutes, split into the two effects that cause it.
     Obliquity is the tilt of the axis; eccentricity is the ellipse of the orbit.
     Accurate to roughly half a minute, which is well inside what a clock shows. */
  function equationOfTime(date = new Date()) {
    const start = Date.UTC(date.getFullYear(), 0, 1);
    const here  = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const n = Math.round((here - start) / MS_DAY) + 1;
    const b = 2 * Math.PI * (n - 81) / 365;
    const obliquity = 9.87 * Math.sin(2 * b);
    const eccentricity = -7.53 * Math.cos(b) - 1.5 * Math.sin(b);
    return { n, obliquity, eccentricity, total: obliquity + eccentricity };
  }

  /* Apparent solar time as a fraction of the day, plus the corrections that
     produced it. This is what the clock is anchored to: 0 is solar midnight,
     0.5 is peak sun. The local offset is applied explicitly. */
  function solarFraction(date = new Date(), longitude = CAL360.longitude) {
    const eot = equationOfTime(date);
    const meridian = -date.getTimezoneOffset() / 4;            // degrees east
    const correction = 4 * (longitude - meridian) + eot.total; // minutes
    const localMs = date.getTime() - date.getTimezoneOffset() * 60000;
    let ms = localMs + correction * 60000;
    ms = ((ms % MS_DAY) + MS_DAY) % MS_DAY;
    return { frac: ms / MS_DAY, correction, eot, meridian, civilMs: ((localMs % MS_DAY) + MS_DAY) % MS_DAY };
  }

  /* How far across the current inter-rung span a moment sits. The experiment
     starts at tau = 0, so while the launch state is held its span runs from
     tau = 0 — not from the launch entry at q = 1 — to the first hard rung, and
     every reading counts live from the first instant. */
  function spanFraction(tau, rung, next) {
    const a = rung === LAUNCH ? 0 : rung.tau, b = next ? next.tau : TAU_STAR;
    return b > a ? Math.min(1, Math.max(0, (tau - a) / (b - a))) : 1;
  }
  /* The live load. Exact at both ends of every span, never rising. */
  function liveLoad(tau, rung, next, absolute) {
    if (absolute || !next) return absolute ? 0 : rung.J;
    return rung.J + (next.J - rung.J) * spanFraction(tau, rung, next);
  }

  /* Where a given moment falls in the count, and where the clock stands.
     Every reading is taken inside the year that contains the moment, with that
     year's own Y, ladder, signs, date length and dilation. */
  function cal360(date = new Date(), longitude = CAL360.longitude) {
    const sol = solarFraction(date, longitude);
    const ms = getMatrixNow(date);
    const sinceLaunch = ms - getMatrixEpoch();
    const pending = sinceLaunch < 0;
    const cal = calendarAt(ms), c = cal.c, yr = cal.year;
    CURRENT = c;
    const yTau    = pending ? 0 : cal.yearTau;      // the descent restarts every year
    const within  = (cal.yearTau - cal.dayIndex) * yr.msCal;

    const rung = yr.retainedAt(yTau), next = yr.nextRungAt(yTau);
    const load = yr.loadAt(yTau), q = yr.qAt(yTau);

    /* The clock: this year's dilation, integrated as it is and kept forever.
       It races before 04:00 and repays by noon; 12:00 is peak sun. */
    const d0 = yr.d0;
    const uniform = sol.frac;
    const phi     = livingPhaseM(uniform, 1, d0);

    const dateLen = Math.min(1, yr.tauStar - cal.dayIndex) * yr.msCal;
    const toNext  = dateLen - within;
    const nextAt  = new Date(date.getTime() + toNext);
    const nextPhi = livingPhaseM(solarFraction(nextAt, longitude).frac, 1, d0);

    const sign = yr.signs[cal.sign];
    const toNextSignMs = (sign.end - cal.yearTau) * yr.msCal;
    const toNextYearMs = c.end - ms;
    const livingMs = phi * MS_DAY;
    const ss       = Math.floor(livingMs / 1000);

    return {
      ms, pending, within, absolute: false,
      /* Matrix dates since the launch, signed, summed in each year's own dates */
      calendarTau: c.datesBefore + cal.yearTau,
      /* the orbital calendar: 360 counted dates, twelve months of thirty */
      orbital: (() => { const x = c.datesBefore + cal.yearTau, o = orbitalAt(x);
        o.monthInfo = ORBITAL_MONTHS[o.month];
        o.toNextDateMs = msOfCalendarTau(Math.floor(x) + 1) - ms;
        return o; })(),
      tau: Math.max(0, c.datesBefore + cal.yearTau),
      launchAt: new Date(getMatrixEpoch()),
      toLaunchMs: Math.max(0, -sinceLaunch),

      /* the year being read */
      year: yr, cycleStart: c.start, cycleEnd: c.end, Y: yr.Y,
      cycle: cal.cycle, yearTau: cal.yearTau, yearFraction: cal.yearTau / yr.tauStar,
      dayIndex: cal.dayIndex, dateOfYear: cal.dateOfYear, datesPerYear: yr.datesPerYear,
      weekday: cal.weekday, week: cal.week, threshold: cal.threshold,
      sign: cal.sign, dateSign: cal.dateSign, dayInSign: cal.dayInSign,
      signProgress: (cal.yearTau - sign.start) / (sign.end - sign.start),
      toNextSignMs, nextSignAt: new Date(date.getTime() + toNextSignMs),
      toNextYearMs, nextYearAt: new Date(pending ? getMatrixEpoch() : c.end),

      toNextDateMs: toNext, nextDateAt: nextAt, nextDatePhase: nextPhi,

      /* the descent inside this year */
      q, rung, next,
      toNextTau: next ? Math.max(0, next.tau - yTau) : 0,
      rungLoad: rung.J, state: rung.state, accent: rung.accent,
      load, J0: yr.J0, Q: yr.Q,
      residualSec: load * 86400 / yr.Q,
      integration: 1 - load / yr.J0,
      loadFraction: load / yr.J0,
      rungFrom: rung === yr.launch ? 0 : rung.tau,
      rungTo:   next ? next.tau : yr.tauStar,
      rungProgress: yr.spanAt(yTau, rung, next),
      trajectory: Math.min(1, Math.max(0, yTau / yr.tauStar)),

      /* the clock */
      sol, phi, uniform,
      residualFraction: 1, dilationMs: yr.leadMs, d0,
      v: velocityM(phi, 1, d0), meanRate: rateR(1, d0),
      drift: livingMs - sol.frac * MS_DAY,
      regime: phi < SLEEP_END ? 'race' : phi < NOON ? 'repay' : 'true',
      h: Math.floor(ss / 3600) % 24, m: Math.floor(ss % 3600 / 60), s: ss % 60,
      mode: MATRIX_MODE
    };
  }


  /* ══════════════════════════════════════════════════════════════════════════
     THE MATRIX — final model. This block is the single source of truth.

     TWO COORDINATES, never conflated:

       tau — PHYSICAL MATRIX TIME. Elapsed time in the time-dilated 360-date
             Matrix calendar. The calendar continues indefinitely; there is no
             end of time and no stopping at closure.

       q   — INFORMATIONAL RECURRENCE DEPTH. The internal recurrence coordinate,
             running to Q. It is NOT a number of days and is never labelled one.

     The singular relation is active from launch — there is no delayed onset:

             dtau/dq = J_ret(q) / J0          from tau = 0, q = 0

     EXACT FOUNDATION
       Y     = 365.2421896698                  frozen reference
       E     = Y − 360 = 5.2421896698
       alpha = E/360 = 8,736,982,783 / 600,000,000,000   (irreducible)
       J0    = 8,736,982,783     Q = 600,000,000,000

     One Matrix date is Y/360 = 1.014561637971666…, so the Matrix clock dilation
     is fixed at 20 min 58.125520752 s and one complete Matrix date is
     24 h 20 min 58.125520752 s. D₀ and the Matrix date stay fixed at every stage.
     What changes is the RESIDUAL D(τ) = D₀·J/J0, the part of that dilation not yet
     closed: the solar day rises from 86400 s to meet the Matrix date as entropic
     energy is absorbed. Clock and integration are therefore one reading, not two —
     Julien's decision of 17 September 2026, canon §6.

     FRAMEWORK SEMANTICS (hypotheses under investigation, not established
     physics or genetics):
       Q is the total system capacity / total-energy coordinate — the complete
         normalised domain. Not joules; no physical unit conversion is claimed.
         If an elementary unit epsilon is ever derived, E_total = Q·epsilon.
       J is the unresolved / parasitic load, in the same normalised units.
       J0/Q      = 1.4561637971666…%   the direct initial fraction
       12·J0/Q   = 17.473965566%       the 12-fold Matrix-month translation,
                                       a cross-domain quantity — keep separate.

     Products such as q·J0 reach 5.2 × 10²¹, far past 2⁵³, so the recurrence is
     computed in BigInt; only display values become Numbers.
     ══════════════════════════════════════════════════════════════════════════ */

  /* ── Exact rational arithmetic on BigInt ───────────────────────────────── */
  const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b;
    while (b) { const r = a % b; a = b; b = r; } return a; };
  const fr = (n, d = 1n) => { if (d < 0n) { n = -n; d = -d; } const g = bgcd(n, d) || 1n; return { n: n / g, d: d / g }; };
  const frAdd = (x, y) => fr(x.n * y.d + y.n * x.d, x.d * y.d);
  const frNum = x => Number(x.n) / Number(x.d);

  /* ── The hard recurrence ladder ────────────────────────────────────────────
     Continued fraction of alpha = J0/Q. The convergent denominators are the
     hard rungs; with the numerators, J_i = |q_i·J0 − p_i·Q| exactly.
     Derived, never tabulated — the validation table is asserted against it.  */
  function recurrenceLadder() {
    const out = [];
    let num = J0n, den = Qn, h1 = 1n, h0 = 0n, k1 = 0n, k0 = 1n;
    while (true) {
      const a = num / den;
      const hn = a * h1 + h0; h0 = h1; h1 = hn;
      const kn = a * k1 + k0; k0 = k1; k1 = kn;
      let J = k1 * J0n - h1 * Qn; if (J < 0n) J = -J;
      out.push({ i: out.length, qn: k1, pn: h1, Jn: J, q: Number(k1), J: Number(J),
                 residual: Number(J) * 86400 / Q, integration: 1 - Number(J) / J0 });
      const r = num - a * den;
      if (r === 0n) break;
      num = den; den = r;
    }
    return out;
  }
  const LADDER = recurrenceLadder();
  const ABSOLUTE = LADDER[LADDER.length - 1];   // q = Q, J = 0
  /* The zeroth convergent is 0/1: q = 1 with J still J0. It is the LAUNCH
     state, not a reduction — the validation table lists it, and the instrument
     must not present it as a rung that integrated nothing. The hard rungs are
     LADDER[1 .. 19]; there are nineteen of them. */
  const LAUNCH = LADDER[0];
  const RUNGS  = LADDER.slice(1);

  /* One named state per rung — twenty in all, the launch state and the
     nineteen reductions. The name is the state the Matrix is IN while that
     rung is the retained one; it is a label for a rung, not a claim about a
     mechanism. The scale descends: the early names are about bulk collapse,
     the late ones about what is left. */
  const STATE_NAMES = [
    ['LAUNCH',        'amber'],   // q 1              J0, nothing integrated
    ['FIRST DESCENT', 'amber'],   // q 68             32.64%
    ['CLEAVAGE',      'amber'],   // q 69             67.36%
    ['COLLAPSE',      'violet'],  // q 206            97.92%
    ['SETTLING',      'violet'],  // q 3,159
    ['CONSOLIDATION', 'violet'],  // q 3,365
    ['REFINEMENT',    'violet'],  // q 9,889
    ['ATTENUATION',   'teal'],    // q 23,143
    ['TRACE',         'teal'],    // q 79,318
    ['RESIDUE',       'teal'],    // q 1,530,185
    ['REMNANT',       'teal'],    // q 1,609,503
    ['FILAMENT',      'teal'],    // q 3,139,688
    ['THREAD',        'blue'],    // q 70,682,639
    ['STRAND',        'blue'],    // q 73,822,327
    ['GRAIN',         'blue'],    // q 144,504,966
    ['MOTE',          'blue'],    // q 1,518,871,987
    ['SPECK',         'blue'],    // q 3,182,248,940
    ['GLINT',         'green'],   // q 26,976,863,507
    ['UNIT',          'green'],   // q 30,159,112,447  J = 1
    ['ABSOLUTE',      'green']    // q Q               J = 0
  ];
  LADDER.forEach((L, i) => { L.state = STATE_NAMES[i][0]; L.accent = STATE_NAMES[i][1]; });

  /* Framework-native orientations for following the recurrence. Authored on
     Julien's request, 2026-09-17. Names do not select or alter the thresholds.
     Internal state IDs remain stable for existing consumers. */
  const PHASE_GUIDES = [
    [
        "Imagination",
        "Open the field of possibility and imagine the coherent blueprint you intend to realize."
    ],
    [
        "Orientation",
        "Choose the configuration to carry forward; let the coherent blueprint orient the next selection."
    ],
    [
        "Discernment",
        "Distinguish what supports the selected configuration from what keeps it unresolved."
    ],
    [
        "Commitment",
        "Sustain the selected direction across recurrence so that realization can take form."
    ],
    [
        "Grounding",
        "Give the selected configuration a repeatable form that can enter the next cycle."
    ],
    [
        "Organization",
        "Arrange the relationships within that form so they support one another."
    ],
    [
        "Integration",
        "Carry what has been realized into the organization that guides subsequent selection."
    ],
    [
        "Attunement",
        "Attend to the remaining differences and adjust their relationships toward the coherent blueprint."
    ],
    [
        "Resonance",
        "Repeat the relationships that reinforce coherence across successive cycles."
    ],
    [
        "Coherence",
        "Hold the emerging configuration together so its parts remain mutually compatible."
    ],
    [
        "Embodiment",
        "Bring the coherent blueprint into the whole configuration being realized."
    ],
    [
        "Recursion",
        "Let the organization already retained guide renewed imagination and selection."
    ],
    [
        "Refinement",
        "Work with the smaller remaining differences while preserving what has already integrated."
    ],
    [
        "Continuity",
        "Carry the coherent relationships forward through repeated updates."
    ],
    [
        "Stability",
        "Sustain the organized form as further differences are absorbed."
    ],
    [
        "Clarity",
        "Make the remaining differences explicit so the next selection can address them precisely."
    ],
    [
        "Convergence",
        "Bring the remaining relationships toward a shared coherent configuration."
    ],
    [
        "Unity",
        "Sustain the configuration as a whole while the final trace of unresolved difference remains."
    ],
    [
        "Final Difference",
        "Attend to the last retained unit of entropic energy: J = 1 before complete absorption."
    ],
    [
        "Closure",
        "The entropic energy is zero. Retain the coherent organization as the calendar and recursive life continue."
    ]
];
  LADDER.forEach((L, i) => {
    L.phaseName = PHASE_GUIDES[i][0];
    L.phaseDescription = PHASE_GUIDES[i][1];
  });

  /* ── From the start of the experiment ─────────────────────────────────────
     J_ret is a staircase: J0 until the first rung that lowers it, then the
     value of the last rung passed. Integrating dtau = (J_ret/J0) dq exactly,
     piecewise, gives tau at every rung — and at q = Q gives the natural
     absorption point. It is not a chosen endpoint and is not rounded or
     calibrated to anything.                                                  */
  const STEPS = [{ q: 0, J: J0 }].concat(LADDER.map(L => ({ q: L.q, J: L.J })));

  (function mapRungsToMatrixTime() {
    let t = fr(0n);
    for (let i = 1; i < STEPS.length; i++) {
      const prev = STEPS[i - 1];
      const span = BigInt(STEPS[i].q) - BigInt(prev.q);
      t = frAdd(t, fr(span * BigInt(prev.J), J0n));
      STEPS[i].tauFr = t; STEPS[i].tau = frNum(t);
      const L = LADDER[i - 1]; L.tau = STEPS[i].tau; L.tauFr = t;
    }
  })();

  /* The natural absorption point, derived: 6251584658434 / 8736982783. */
  const TAU_STAR_FR = ABSOLUTE.tauFr;
  const TAU_STAR    = frNum(TAU_STAR_FR);        // ≈ 715.5313011029427

  /* ══════════════════════════════════════════════════════════════════════════
     THE YEARS — each one read from the sky at its own Turning
     (Julien's decision, 28 September 2026: "option 2", live from the launch)

     Every year repeats the founding derivation with the tropical year of its
     own moment. At each Turning the mean tropical year is read from Laskar's
     formula (Laskar 1986; T in Julian centuries from J2000.0, the instant used
     as TT), rounded to ten decimals:

         Y(T) = 365.2421896698 − 6.15359e-6 T − 7.29e-10 T² + 2.64e-10 T³

     and from that Y, exactly as from the reference Y:
         α = (Y − 360)/360 = J0/Q in lowest terms
         the continued fraction of α → the ladder → the signs (one per partial
         quotient) → τ*, the length of the year in its own Matrix dates
         one Matrix date = Y/360 days, D₀ = Y/360 − 1 day.
     The next Turning is this Turning + τ*·(Y/360). Cycle 1 opens at the launch
     and is itself read from the sky (Y at 20 March 2027, not the J2000 value).
     Cycles 0, −1, … before the launch are solved backwards the same way.

     Declared plainly: the structure of a year depends on the last decimals of
     a model value, finer than anything measured about the real year, and on the
     rounding rule (nearest, ten decimals). Both are choices.

     The reference year (Y = 365.2421896698, J2000) is still built below as
     CANON and still checked against the canon on every load; the live
     instrument no longer uses it.

     NAMES BY POSITION. The last sign of every year carries exactly J = 1 — true
     of any continued fraction in lowest terms — so it is always Monas, and the
     one before it always Una. The others take the positional sequence from
     Origo onward; years with more signs draw on the extension names.
     ══════════════════════════════════════════════════════════════════════════ */
  const REF_UNITS = 3652421896698n;                 // Y × 10¹⁰, the J2000 reference
  const TEN10 = 10000000000n, DEG360 = 360n * TEN10;
  function laskarYear(ms) {
    const T = (ms / 86400000 + 2440587.5 - 2451545) / 36525;
    return 365.2421896698 - 6.15359e-6 * T - 7.29e-10 * T * T + 2.64e-10 * T * T * T;
  }
  const yearUnitsAt = ms => BigInt(Math.round(laskarYear(ms) * 1e10));

  const TIDE_DEFS = [
    { name: 'The Kindling', accent: 'amber',  text: null },
    { name: 'The Forging',  accent: 'violet', text: 'What was chosen is committed, seated, organized and melted into one working form.' },
    { name: 'The Attuning', accent: 'teal',   text: 'The remaining differences are small enough to be heard, and the form is tuned to them.' },
    { name: 'The Refining', accent: 'blue',   text: 'Almost nothing is left to absorb; the work is precision, continuity and light.' },
    { name: 'The Stilling', accent: 'green',  text: 'Unity is held around the last unit of difference until the year closes at zero.' }
  ];

  /* [name, epithet, glyph, motto, text, gift, shadow, principle, guide] */
  const G = PHASE_GUIDES;
  const SIGN_HEAD = [
    ['Origo',   'The Seed-Field',     '◉', 'Everything that will be is first imagined whole.',
      'The year opens at full charge: nothing is absorbed yet and every configuration is still possible. Origo is the long held breath of the Kindling, the season in which the coherent blueprint is imagined before anything is chosen.',
      'Vision, spaciousness, the courage to begin', 'Possibility that never lands'],
    ['Limen',   'The First Gate',     '⊢', 'One turn, and the whole field faces a direction.',
      'The passage of orientation. The blueprint turns toward one configuration and away from all the others, and a large share of the year’s entropic energy leaves through this narrow door.',
      'Decisiveness', 'Haste'],
    ['Scissa',  'The Cleaver',        '⟋', 'What serves is kept; what keeps it unresolved is cut.',
      'The great separation. Scissa distinguishes what supports the chosen configuration from what holds it back, and by its end almost all of the year’s load is gone.',
      'Discernment, honest judgment', 'Severity'],
    ['Vortex',  'The Great Turning',  '◎', 'The choice is carried until it takes form.',
      'After the collapse comes the long commitment. Vortex sustains the selected direction date after date, turning it round and round until realization begins to hold its shape.',
      'Endurance, loyalty', 'Rigidity'],
    ['Sedes',   'The Seat',           '⊥', 'A form that can be repeated.',
      'The configuration finds its seat. What was committed receives a repeatable form, one that can enter every cycle that follows.',
      'Grounding, reliability', 'Settling for less'],
    ['Nexus',   'The Lattice',        '⋈', 'Each relation holds the others.',
      'The crystal of the year is laid down. Nexus arranges the relationships inside the form so that each supports the others, a lattice in which nothing stands alone.',
      'Organization, cooperation', 'Control'],
    ['Fornax',  'The Crucible',       '▽', 'What was realized is melted into what guides.',
      'The heat of integration. Fornax carries what has been realized into the organization itself, so that experience becomes the ground of every later choice.',
      'Integration, maturity', 'Consuming what is still alive'],
    ['Lyra',    'The Tuning',         '♮', 'Small differences, heard clearly.',
      'The remaining differences are now small enough to be heard. Lyra listens and adjusts relationships toward the blueprint, string by string, the way an instrument is tuned before it plays.',
      'Sensitivity, adjustment', 'Perfectionism'],
    ['Echo',    'The Returning Voice','≋', 'What is coherent is repeated until it sings alone.',
      'Echo repeats the relationships that reinforce coherence across cycle after cycle, until they sustain themselves without effort.',
      'Resonance, rhythm, practice', 'Repetition without listening'],
    ['Nodus',   'The Knot',           '⌘', 'The parts are tied so they stay compatible.',
      'Nodus ties the emerging configuration together so that its parts remain mutually compatible as the year moves on.',
      'Coherence, fidelity', 'Entanglement'],
    ['Corpus',  'The Body',           '⬡', 'The blueprint enters the whole.',
      'The coherent blueprint is no longer an idea held apart: Corpus brings it into the whole configuration being lived, into habits, places and flesh.',
      'Embodiment, presence', 'Heaviness'],
    ['Spira',   'The Spiral',         '⟳', 'Return to the seed, one turn higher.',
      'What has been retained now guides renewed imagination and selection: the spiral comes back to Origo’s question at a higher turn.',
      'Recursion, renewal, learning', 'Going round in circles'],
    ['Acus',    'The Needle',         '↓', 'The finest point, placed exactly.',
      'Acus works on the smallest remaining differences with a needle’s precision, without disturbing what has already integrated.',
      'Precision, care', 'Pettiness'],
    ['Filum',   'The Thread',         '∿', 'Continuity through every update.',
      'The thread runs on. Filum carries coherent relationships forward through repeated updates, so that nothing gained is lost in change.',
      'Continuity, patience', 'Monotony'],
    ['Petra',   'The Stone',          '■', 'The organized form, sustained.',
      'Petra sustains the organized form while the last differences are absorbed: a stone that the tide can no longer move.',
      'Stability, trust', 'Immobility'],
    ['Lumen',   'The Clear Light',    '✧', 'What remains is made explicit.',
      'In clear light the remaining differences become visible and nameable, so that the next selection can address them exactly.',
      'Clarity, honesty', 'Exposure'],
    ['Conflux', 'The Confluence',     '⋎', 'Many streams, one water.',
      'The remaining relationships flow toward one shared configuration, the way rivers meet before the sea.',
      'Convergence, reconciliation', 'Losing distinction']
  ].map((x, i) => x.concat(G[i]));
  /* Extension names, used only by years with more signs than the reference.
     Authored 28 September 2026; principles in the framework's language. */
  const SIGN_EXTRA = [
    ['Vela', 'The Sail', '▷', 'The form moves by itself now.',
      'With little left to absorb, the configuration begins to move under its own coherence. Vela is the season of effortless direction, when what has been built carries itself forward.',
      'Ease, momentum', 'Drift', 'Direction', 'Let what remains be carried by the coherence already built, as a sail is carried by the wind.'],
    ['Speculum', 'The Mirror', '◑', 'The whole sees itself.',
      'The configuration becomes able to see itself. Speculum reflects the whole back to its parts, so that the last differences are recognized from within.',
      'Self-knowledge', 'Self-absorption', 'Reflection', 'Look at the configuration as a whole and let it show what still differs.'],
    ['Clavis', 'The Key', '⊸', 'One turn opens what force could not.',
      'Some differences are dissolved not by effort but by the right small turn. Clavis is the season of the precise adjustment that releases what was held.',
      'Resolution, timing', 'Forcing', 'Resolution', 'Find the one adjustment that releases what is still held.'],
    ['Pons', 'The Bridge', '⌒', 'What stood apart is joined.',
      'The last separated parts are bridged to the whole. Pons connects what the year could not yet reach, so that nothing coherent stays isolated.',
      'Reconciliation', 'Compromise', 'Connection', 'Join what remains separate to the organization that already holds.'],
    ['Vena', 'The Vein', '∫', 'What is gained reaches every part.',
      'Coherence begins to circulate. Vena carries what has been integrated through the whole configuration, the way blood reaches the farthest cell.',
      'Vitality, sharing', 'Dispersion', 'Circulation', 'Let coherence circulate through every part of the configuration.'],
    ['Gemma', 'The Bud', '✳', 'The new forms inside the whole.',
      'Inside a configuration that holds, something new can form. Gemma is the bud of the next cycle, already present before the year has closed.',
      'Emergence, promise', 'Impatience', 'Emergence', 'Notice what is newly forming inside the stable configuration and give it room.'],
    ['Arcus', 'The Arc', '⌓', 'Tension, held in balance, bears weight.',
      'An arc stands because its forces answer one another. Arcus is the season of balance, when opposing tendencies are held so the whole can carry more.',
      'Poise', 'Stalemate', 'Balance', 'Keep the tensions of the configuration in balance so that it can bear weight.'],
    ['Stella', 'The Star', '✶', 'A fixed point to steer by.',
      'Stella is the fixed light by which the late year steers. The blueprint, now almost realized, becomes the point by which every remaining difference is oriented.',
      'Faith, orientation', 'Distance', 'Guidance', 'Hold the coherent blueprint in view as the fixed point that orients what remains.'],
    ['Silentium', 'The Silence', '∅', 'Less is added; more is heard.',
      'Almost nothing moves. Silentium asks for listening rather than action, so that the finest remaining differences can be heard at all.',
      'Attention', 'Withdrawal', 'Listening', 'Reduce what is added and listen for what the configuration still asks.'],
    ['Sal', 'The Salt', '◆', 'What is good is kept.',
      'Salt keeps what would otherwise be lost. Sal is the season of preservation, when what the year has integrated is made durable enough to pass through the Turning.',
      'Care, constancy', 'Hoarding', 'Preservation', 'Preserve what has been integrated so it keeps through the Turning.'],
    ['Aura', 'The Breath', '∘', 'The lightest touch is enough.',
      'At this depth the differences are as subtle as breath. Aura works with the lightest possible touch, since anything heavier would disturb what already holds.',
      'Grace', 'Vagueness', 'Subtlety', 'Work with the finest differences through the lightest touch.'],
    ['Limbus', 'The Hem', '⊏', 'The edge completes the form.',
      'The hem finishes the cloth. Limbus attends to the edges of the configuration, so that its form is complete before unity is held.',
      'Thoroughness', 'Fussiness', 'Completion', 'Finish the edges of the configuration so its form is whole.'],
    ['Quies', 'The Rest', '⌣', 'The whole settles into itself.',
      'Before the last time waves, the year settles. Quies lets every relationship come to rest in its place, so that unity can be held without strain.',
      'Repose', 'Sloth', 'Settling', 'Let the configuration settle into itself before the final traces are held.']
  ];
  const SIGN_UNA = ['Una', 'The One', '│', 'The whole, held as one.',
    'Una holds the configuration as a single whole while the final traces of unresolved difference remain inside it.',
    'Unity, wholeness', 'Forced sameness'].concat(G[17]);
  const SIGN_MONAS = ['Monas', 'The Last Unit', '•', 'A single unit carries the whole year.',
    'Every year ends the same way, by mathematical necessity: its last time wave carries a single unit of entropic energy, J = 1. The year’s entire work rests on this last difference, and the new year begins at the instant it is absorbed.',
    'Completion, humility', 'Clinging to the last thing'].concat(G[18]);
  const STATE_HEAD  = STATE_NAMES.slice(1, 17).map(x => x[0]);   // FIRST DESCENT … SPECK
  const STATE_EXTRA = ['FLICKER', 'EMBER', 'WISP', 'BREATH', 'HUSH', 'VEIL', 'DEW', 'POINT', 'SPARK', 'FROST', 'SHEEN', 'HAZE', 'FLECK'];
  function signProfile(i, N) {
    if (i === N - 1) return SIGN_MONAS;
    if (i === N - 2) return SIGN_UNA;
    const p = SIGN_HEAD.concat(SIGN_EXTRA)[i];
    return p || [`Wave ${i + 1}`, 'An unnamed time wave', '·', 'A further step of the descent.', 'This year holds more time waves than there are names; this one is read by its number and length alone.', '—', '—', 'Refinement', G[12][1]];
  }
  function stateName(i, N) {
    if (i === 0) return 'LAUNCH';
    if (i === N) return 'ABSOLUTE';
    if (i === N - 1) return 'UNIT';
    if (i === N - 2) return 'GLINT';
    return STATE_HEAD.concat(STATE_EXTRA)[i - 1] || `RUNG ${i}`;
  }
  /* Tides by depth of descent: x = ln(J0/J)/ln(J0) at the sign's opening; the
     last two signs are always the Stilling. The thresholds reproduce the
     reference year's five tides exactly (checked below). */
  function tideOf(i, N, J, J0y) {
    if (i >= N - 2) return 4;
    const x = Math.log(J0y / J) / Math.log(J0y);
    return x < .12 ? 0 : x < .28 ? 1 : x < .62 ? 2 : 3;
  }

  const YEAR_CACHE = new Map();
  function buildYear(units) {
    const key = String(units);
    if (YEAR_CACHE.has(key)) return YEAR_CACHE.get(key);
    const ex = units - DEG360, g = bgcd(ex, DEG360), j0n = ex / g, qn = DEG360 / g;
    const J0y = Number(j0n), Qy = Number(qn);
    /* the ladder: convergents of α = j0n/qn */
    const lad = [], quot = [];
    let num = j0n, den = qn, h1 = 1n, h0 = 0n, k1 = 0n, k0 = 1n;
    while (true) {
      const a = num / den; quot.push(Number(a));
      const hn = a * h1 + h0; h0 = h1; h1 = hn;
      const kn = a * k1 + k0; k0 = k1; k1 = kn;
      let J = k1 * j0n - h1 * qn; if (J < 0n) J = -J;
      lad.push({ i: lad.length, qn: k1, pn: h1, Jn: J, q: Number(k1), J: Number(J),
                 residual: Number(J) * 86400 / Qy, integration: 1 - Number(J) / J0y });
      const r = num - a * den;
      if (r === 0n) break;
      num = den; den = r;
    }
    /* τ at every rung: dτ/dq = J_ret/J0, from q = 0 */
    let t = fr(0n), pq = 0n, pJ = j0n;
    for (const L of lad) { t = frAdd(t, fr((L.qn - pq) * pJ, j0n)); L.tauFr = t; L.tau = frNum(t); pq = L.qn; pJ = L.Jn; }
    const N = lad.length - 1, tauStar = lad[N].tau;
    const msCal = Number(units) / 1e10 * MS_DAY / 360, leadMs = msCal - MS_DAY;
    const PQ = quot.slice(1);
    const signs = [];
    for (let i = 0; i < N; i++) {
      const p = signProfile(i, N), R0 = lad[i], R1 = lad[i + 1];
      const start = i === 0 ? 0 : R0.tau, end = R1.tau, tide = tideOf(i, N, R0.J, J0y);
      signs.push({ i, name: p[0], epithet: p[1], glyph: p[2], motto: p[3], text: p[4], gift: p[5], shadow: p[6],
        principle: p[7], guide: p[8], state: stateName(i, N), tide, accent: TIDE_DEFS[tide].accent,
        number: PQ[i], start, end, length: end - start, gate: end - start < 7,
        firstDate: Math.ceil(start - 1e-9), lastDate: Math.ceil(end - 1e-9) - 1,
        jFrom: R0.J, jTo: R1.J, charge: (R0.J - R1.J) / J0y });
    }
    /* A gate shorter than a date can open and close inside one date: it then
       holds no date of its own (dates = 0) and lives inside date `within`. */
    signs.forEach(S => { S.dates = Math.max(0, S.lastDate - S.firstDate + 1); S.within = S.dates ? null : Math.floor(S.start); });
    lad.forEach((L, i) => {
      L.state = stateName(i, N);
      L.accent = i < N ? signs[i].accent : 'green';
      L.phaseName = i < N ? signs[i].principle : G[19][0];
      L.phaseDescription = i < N ? signs[i].guide : G[19][1];
    });
    const kind = signs.filter(S => S.tide === 0);
    const kindShare = kind.reduce((a, S) => a + S.charge, 0);
    const tides = TIDE_DEFS.map((T, k) => ({ name: T.name, accent: T.accent,
      text: k === 0 ? `The year ignites. ${(kindShare * 100).toFixed(2)} % of the entropic energy is released in the first ${kind.length === 1 ? 'time wave' : ['', 'one', 'two', 'three', 'four', 'five', 'six'][kind.length] + ' time waves'}.` : T.text }));
    const turning = { name: 'The Turning', epithet: 'Closure and Launch', principle: G[19][0],
      text: G[19][1] + ' The same instant is the next year’s launch: the sky is read again, a new year is derived from it, and J returns to its new J₀.' };

    const RUNGSy = lad.slice(1), ABS = lad[N], LAU = lad[0];
    const retainedAt = y => { if (y >= tauStar) return ABS; let k = 0; for (let i = 0; i < lad.length; i++) if (y >= lad[i].tau) k = i; return lad[k]; };
    const nextRungAt = y => (y >= tauStar ? null : RUNGSy.find(L => L.tau > y) || null);
    const spanAt = (y, rung, next) => { const a = rung === LAU ? 0 : rung.tau, b = next ? next.tau : tauStar; return b > a ? Math.min(1, Math.max(0, (y - a) / (b - a))) : 1; };
    const loadAt = y => { const rung = retainedAt(y), next = nextRungAt(y); if (!next) return 0; return rung.J + (next.J - rung.J) * spanAt(y, rung, next); };
    const qAt = y => { if (y >= tauStar) return Qy; if (y <= 0) return 0;
      let k = -1; for (let i = 0; i < lad.length; i++) if (y >= lad[i].tau) k = i;
      const base = k < 0 ? 0 : lad[k].tau, q0 = k < 0 ? 0 : lad[k].q, J = k < 0 ? J0y : lad[k].J;
      return J ? q0 + (y - base) * (J0y / J) : Qy; };
    const signAt = y => { for (let i = signs.length - 1; i >= 0; i--) if (y >= signs[i].start) return i; return 0; };

    const Y = {
      units, Y: Number(units) / 1e10, Ystr: (units / TEN10) + '.' + String(units % TEN10).padStart(10, '0'),
      J0: J0y, Q: Qy, j0n, qn, alpha: J0y / Qy, ladder: lad, rungs: RUNGSy, launch: LAU, absolute: ABS,
      partialQuotients: PQ, tauStar, tauStarFr: ABS.tauFr, msCal, leadMs, d0: leadMs / 1000,
      msYear: tauStar * msCal, datesPerYear: Math.ceil(tauStar - 1e-9),
      signs, tides, turning,
      retainedAt, nextRungAt, spanAt, loadAt, qAt, signAt
    };
    YEAR_CACHE.set(key, Y);
    return Y;
  }
  const CANON = buildYear(REF_UNITS);

  /* ── The chain of years ────────────────────────────────────────────────── */
  const CYCLES = new Map();
  /* datesBefore: Matrix dates from the launch to this cycle's Turning, summed
     year by year in each year's own dates (negative before the launch). */
  function setCycle(k, start, year, end, datesBefore) {
    const c = { k, start, end: end === undefined ? start + year.msYear : end, year, Y: year.Y, datesBefore };
    CYCLES.set(k, c); return c;
  }
  function cycle(k) {
    k = Math.round(k);
    if (CYCLES.has(k)) return CYCLES.get(k);
    if (!CYCLES.has(1)) setCycle(1, CAL360.epochLive, buildYear(yearUnitsAt(CAL360.epochLive)), undefined, 0);
    if (k >= 1) {
      let j = k; while (!CYCLES.has(j)) j--;
      while (j < k) { const p = CYCLES.get(j); setCycle(j + 1, p.end, buildYear(yearUnitsAt(p.end)), undefined, p.datesBefore + p.year.tauStar); j++; }
    } else {
      let j = k; while (!CYCLES.has(j)) j++;
      while (j > k) {
        /* Solve backwards: the year that ENDS at this Turning is read at its
           own start, so iterate start → Y(start) → start until it settles. */
        const n = CYCLES.get(j);
        let s = n.start - n.year.msYear, y = null;
        for (let it = 0; it < 12; it++) {
          y = buildYear(yearUnitsAt(s));
          const s2 = n.start - y.msYear;
          if (Math.abs(s2 - s) < 1) { s = s2; break; }
          s = s2;
        }
        setCycle(j - 1, n.start - y.msYear, y, n.start, n.datesBefore - y.tauStar); j--;
      }
    }
    return CYCLES.get(k);
  }
  const AVG_YEAR_MS = 726 * MS_DAY;
  function cycleAt(ms) {
    let k = 1 + Math.floor((ms - CAL360.epochLive) / AVG_YEAR_MS), c = cycle(k);
    while (ms < c.start) c = cycle(--k);
    while (ms >= c.end) c = cycle(++k);
    return c;
  }

  /* The year the most recent reading fell in. Older consumers read M.SIGNS,
     M.TIDES, M.DATES_PER_YEAR and M.signAtYearTau right after cal360(); these
     getters give them the signs of that year. */
  let CURRENT = cycleAt(Date.now());
  const civilOfDate = (k, dayIndex) => { const c = cycle(k); return new Date(c.start + dayIndex * c.year.msCal); };
  const civilOfYearTau = (k, y) => { const c = cycle(k); return new Date(c.start + y * c.year.msCal); };


  /* ══════════════════════════════════════════════════════════════════════════
     THE ORBITAL CALENDAR (29 September 2026)
     One date, one degree. Beside the astral years, which are born from the sky
     at each Turning and hold their own time waves, the orbital calendar counts
     the revolution itself: 360 dates, twelve months of thirty, each month one
     twelfth of the orbit, thirty degrees. It counts the SAME Matrix dates as the
     astral calendar, continuously from the launch at the March equinox —
     calendarTau, summed in each year's own dates — and turns every 360 of them.
     Its date boundaries fall at whole counted degrees, so they do not coincide
     with the astral dates, which restart at every Turning.

     The months are named by the orbit's own geometry, not by any hemisphere's
     seasons: the sun's crossings of the equator, its northern and southern
     turns, and the Earth's farthest and nearest points (aphelion near 103°,
     perihelion near 283° of solar longitude). The counted degree runs up to
     about four degrees ahead of the sun's true longitude by early autumn and
     meets it again at the equinox, so each named event falls in or near its
     month rather than on a boundary.                                         */
  const ORBITAL_MONTHS = [
    { name: 'Ortiva',   epithet: 'The Rising',        glyph: '↑', accent: 'teal',
      text: 'The year of the orbit opens at the March equinox, as the sun crosses the equator northward. Ortiva is the first thirty degrees, the rising out of balance into a new direction.' },
    { name: 'Crescia',  epithet: 'The Growing',       glyph: '⌃', accent: 'teal',
      text: 'The sun climbs north day after day. Crescia is the steady growth of what the rising began.' },
    { name: 'Ascenda',  epithet: 'The Ascent',        glyph: '⋀', accent: 'amber',
      text: 'The last climb before the northern turn. Ascenda carries the year up to its highest declination.' },
    { name: 'Remota',   epithet: 'The Farthest',      glyph: '◯', accent: 'amber',
      text: 'Remota opens at the June solstice, the sun’s northern turn, and holds the aphelion, when the Earth is farthest from the sun and moves most slowly along its orbit.' },
    { name: 'Declina',  epithet: 'The Turning Down',  glyph: '⌄', accent: 'amber',
      text: 'The sun begins its return toward the equator. Declina is the first descent after the height.' },
    { name: 'Aequa',    epithet: 'The Approach to Balance', glyph: '⚖', accent: 'violet',
      text: 'The last thirty degrees before the September equinox. Aequa brings the year toward the balance of day and night.' },
    { name: 'Transa',   epithet: 'The Crossing',      glyph: '⤓', accent: 'violet',
      text: 'Transa opens at the September equinox, as the sun crosses the equator southward. The orbit passes into its second half.' },
    { name: 'Profunda', epithet: 'The Deepening',     glyph: '⌵', accent: 'violet',
      text: 'The sun moves deeper south. Profunda carries the crossing into the depth of the southern half.' },
    { name: 'Descensa', epithet: 'The Descent',       glyph: '⋁', accent: 'blue',
      text: 'The last descent before the southern turn. Descensa carries the year down to its lowest declination.' },
    { name: 'Proxima',  epithet: 'The Nearest',       glyph: '◉', accent: 'blue',
      text: 'Proxima opens at the December solstice, the sun’s southern turn, and holds the perihelion, when the Earth is nearest the sun and moves fastest along its orbit.' },
    { name: 'Resurga',  epithet: 'The Rising Again',  glyph: '⌃', accent: 'green',
      text: 'The sun turns back toward the equator. Resurga is the first return after the depth.' },
    { name: 'Redita',   epithet: 'The Return',        glyph: '↺', accent: 'green',
      text: 'The last thirty degrees of the orbit. Redita closes the revolution and returns the year to the equinox from which it rose.' }
  ];
  /* Where a counted date falls in the orbit. x = calendarTau (Matrix dates
     since the launch, signed). */
  function orbitalAt(x) {
    const yi = Math.floor(x / 360), deg = x - yi * 360, di = Math.min(359, Math.floor(deg));
    return { year: yi + 1, deg, dayIndex: di, month: Math.floor(di / 30), day: di % 30 + 1 };
  }
  /* The civil instant at which a counted Matrix date x is reached. */
  function msOfCalendarTau(x) {
    let k = 1 + Math.floor(x / 730), c = cycle(k);
    while (x < c.datesBefore) c = cycle(--k);
    while (x >= c.datesBefore + c.year.tauStar) c = cycle(++k);
    return c.start + (x - c.datesBefore) * c.year.msCal;
  }
  const civilOfOrbital = (year, dayIndex) => new Date(msOfCalendarTau((year - 1) * 360 + dayIndex));

  /* Where a moment falls: cycle, year, date, sign, week. Dates are counted from
     each year's Turning, so date 1 of every year is a Differa and the last
     date is cut short by the Turning (the threshold date). */
  function calendarAt(ms) {
    const c = cycleAt(ms), yr = c.year;
    let yearTau = (ms - c.start) / yr.msCal;
    if (yearTau < 0) yearTau = 0;
    if (yearTau >= yr.tauStar) yearTau = yr.tauStar - 1e-12;
    const dayIndex = Math.min(yr.datesPerYear - 1, Math.floor(yearTau));
    const sign = yr.signAt(yearTau), dateSign = yr.signAt(dayIndex);
    return { cycle: c.k, c, year: yr, yearTau, dayIndex, dateOfYear: dayIndex + 1,
             weekday: dayIndex % 6, week: Math.floor(dayIndex / 6) + 1,
             sign, dateSign, dayInSign: dayIndex - yr.signs[dateSign].firstDate + 1,
             threshold: dayIndex === yr.datesPerYear - 1 };
  }

  /* ── The retained staircase ────────────────────────────────────────────────
     Monotonically non-increasing. A later raw phase oscillation must never
     raise it. Past the absorption point the state is held permanently.       */
  function retainedAtTau(tau) {
    if (tau >= TAU_STAR) return ABSOLUTE;
    let k = 0;
    for (let i = 0; i < LADDER.length; i++) if (tau >= LADDER[i].tau) k = i;
    return LADDER[k];
  }
  function stepAtTau(tau) {
    let k = 0;
    for (let i = 0; i < STEPS.length; i++) if (STEPS[i].tau !== undefined ? tau >= STEPS[i].tau : true) k = i;
    return STEPS[k];
  }

  /* tau(q) — exact piecewise-linear, from launch. */
  function tauOfQ(q) {
    if (q >= Q) return TAU_STAR;
    let k = 0;
    for (let i = 0; i < STEPS.length; i++) if (q >= STEPS[i].q) k = i;
    const base = k === 0 ? 0 : STEPS[k].tau;
    return base + (q - STEPS[k].q) * (STEPS[k].J / J0);
  }

  /* q(tau) — the inverse the live Instrument needs. Clamped past absorption;
     never divides by J = 0. */
  function qOfTau(tau) {
    if (tau >= TAU_STAR) return Q;
    if (tau <= 0) return 0;
    const s = stepAtTau(tau);
    if (!s.J) return Q;
    const base = s.tau === undefined ? 0 : s.tau;
    return s.q + (tau - base) * (J0 / s.J);
  }

  /* Retained readings. J only falls; integration only rises. */
  const retainedJ           = tau => (tau >= TAU_STAR ? 0 : retainedAtTau(tau).J);
  const retainedResidualSec = tau => (tau >= TAU_STAR ? 0 : retainedAtTau(tau).residual);
  const retainedIntegration = tau => (tau >= TAU_STAR ? 1 : retainedAtTau(tau).integration);
  const isAbsolute          = tau => tau >= TAU_STAR;
  /* The launch state is never a target: the next rung is always a hard rung. */
  const nextRung            = tau => (tau >= TAU_STAR ? null : RUNGS.find(L => L.tau > tau) || null);

  /* ── The dilation wave ─────────────────────────────────────────────────────
     D₀ = 20m 58.125520752s is fixed; the wave's AMPLITUDE is the residual D(τ),
     so the clock runs flat against the sun at closure. See the wave block above
     for VB(r), VA(r), VC(r), R(r) and canon §6. The wave is
     recurrent: it may revisit a previous phase, and that recurrence must never
     raise J_ret. Wave recurrence is not restored unresolved load.

         v_M(φ) = R · v(φ),   R = 1 + alpha = 1.014561637971666…

     Its mean is R, so a Matrix date is 24h 20m 58.125520752s at every stage.
     C(½) = ½ and C(1) = 1, so 12:00 stays peak sun and 00:00 solar midnight. */
  const RATE_R = 1 + J0 / Q;            // R at launch; rateR(1) === this
  const velocityM = (phi, r = 1, d0 = D0_S) => rateR(r, d0) * velocity(phi, r, d0);
  function livingPhaseM(fraction, r = 1, d0 = D0_S) {
    let lo = 0, hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (consumed(mid, r, d0) < fraction) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }

  /* One scheduled epoch for every browser, app and screensaver. Older saved
     simulation epochs are ignored. Before launch the process has not begun;
     from launch it advances continuously. Civil timezone offsets never enter
     elapsed Matrix time. The independent daily solar clock remains live. */
  const MATRIX_MODE = 'live';
  const getMatrixEpoch = () => CAL360.epochLive;
  const resetMatrixEpoch = () => getMatrixEpoch(); // fixed epoch cannot be reset
  const getMatrixNow = (date = new Date()) => date.getTime();
  const getMatrixDayCount = (date = new Date()) =>
    Math.floor((getMatrixNow(date) - getMatrixEpoch()) / MS_CAL);

  /* ── Study mode ────────────────────────────────────────────────────────────
     A virtual moment fed to the same model. Nothing here is a second model:
     cal360() already takes the moment to read, so a study run is the ordinary
     instrument reading a clock that is not the wall clock. The live run is
     untouched — SIM.on is false everywhere except the Lab, and even there only
     once the reader asks for it.

     Rates run past 100× because the trajectory is long: τ* is 715.531301
     Matrix dates ≈ 1.99 civil years, so 100× still needs 7.3 days of watching,
     and the CLEAVAGE cascade at τ = 68 … 68.674 alone is 69 civil days. The
     jump control exists for the same reason. */
  /* ── The boundary's accumulated walk ───────────────────────────────────────
     S(τ) = ∫₀^τ D dτ′, in seconds: how far round the clock face the Matrix date
     boundary has travelled since launch. D is linear on every span, so each
     completed span contributes a trapezoid exactly and the open one closes in
     the same form — no numerical integration, nothing to accumulate error.

     It matters because it decides where the boundary STOPS. D → 0 freezes the
     boundary wherever it has got to, and it rests on midnight only if S(τ*) is
     a whole number of days. D₀ = 86400·α exactly, so one lap is 1/α dates and
     the walk in days is α·∫(J/J0)dτ. As implemented it is NOT a whole number:
     S(τ*) = 83510.762 s = 0.966560 day, 48 minutes short. Unresolved — see
     handoff/LOG.md; it is displayed rather than corrected, because correcting
     it by choosing an interpolation that lands on 86400 would be fitting a
     constant to close a pattern (canon §3). */
  function walkSeconds(tau) {
    if (!(tau > 0)) return 0;
    const cap = Math.min(tau, TAU_STAR);
    let s = 0, a = 0, Ja = J0;
    for (let i = 1; i < LADDER.length && a < cap; i++) {
      const b = LADDER[i].tau, Jb = LADDER[i].J;
      const e = Math.min(cap, b);
      const Je = b > a ? Ja + (Jb - Ja) * (e - a) / (b - a) : Jb;
      s += (e - a) * (Ja + Je) / 2;
      a = b; Ja = Jb;
    }
    return (LEAD_MS / 1000) * s / J0;
  }

  /* ── Where the turnover actually lands ─────────────────────────────────────
     walkSeconds() above measures the drift in SI seconds against a day frozen
     at 86400 s. That is what a wall clock in THIS world shows, because Earth
     has not slowed: the turnover moves 20m 58s later every date forever, which
     is exactly what the civil readout reports and exactly what it should.

     Under the postulate the solar day is not frozen — it is day(τ), rising to
     meet the Matrix date. The turnover's position in the day is then a count of
     ROTATIONS, not of fixed 86400s blocks:

         N(τ) = ∫₀^τ MatrixDate/day dτ′ = τ + ∫₀^τ D/day dτ′

     so its drift per date is R(τ) − 1 = D(τ)/day(τ), which goes to zero. The
     turnover stops moving and every Matrix date then begins at the same solar
     time forever. That is the reading that answers "it should fall on the same
     time at the end"; the civil one cannot, and is not wrong for failing to.

     D is linear on each span, so the integrand is smooth there and Simpson on
     each span is exact to rounding. A closed form exists but is not usable:
     it evaluates C·ln((C−Da)/(C−De))/slope − Δτ, and once D ≪ C the two logs
     agree to fifteen digits while their difference is divided by a slope of the
     same smallness — the cancellation destroyed the late spans and drove the
     total backwards. Quadrature here is the accurate choice, not the lazy one. */
  function walkLaps(tau) {
    if (!(tau > 0)) return 0;
    const C = MS_CAL / 1000, D0s = LEAD_MS / 1000, cap = Math.min(tau, TAU_STAR);
    const N = 64;
    let total = 0, a = 0, Ja = J0;
    for (let i = 1; i < LADDER.length && a < cap; i++) {
      const b = LADDER[i].tau, Jb = LADDER[i].J;
      const e = Math.min(cap, b);
      const dt = e - a;
      if (dt > 0) {
        /* D across [a, e], carried as the straight line liveLoad() draws */
        const D = x => { const J = b > a ? Ja + (Jb - Ja) * (x - a) / (b - a) : Jb; return D0s * J / J0; };
        const f = x => { const d = D(x); return d / (C - d); };
        const h = dt / N;
        let sum = 0;
        for (let k = 0; k < N; k++) {
          const x0 = a + k * h;
          sum += h * (f(x0) + 4 * f(x0 + h / 2) + f(x0 + h)) / 6;
        }
        total += sum;
      }
      a = b; Ja = Jb;
    }
    return total;
  }

  const SIM = { on: false, speed: 1, paused: false, atReal: 0, atVirtual: 0 };
  const SIM_SPEEDS = [1, 2, 3, 5, 10, 20, 100, 1000, 10000, 100000, 1000000];
  function simNow() {
    if (!SIM.on) return Date.now();
    if (SIM.paused) return SIM.atVirtual;
    return SIM.atVirtual + (Date.now() - SIM.atReal) * SIM.speed;
  }
  /* Re-anchor before every change, so the virtual moment never jumps when the
     rate changes or the run is paused. */
  function simAnchor(virtual) {
    SIM.atVirtual = virtual === undefined ? simNow() : virtual;
    SIM.atReal = Date.now();
  }
  function simEnter() { SIM.on = false; simAnchor(getMatrixEpoch()); SIM.on = true; SIM.paused = false; SIM.speed = 1; }
  function simExit()  { SIM.on = false; SIM.paused = false; SIM.speed = 1; }
  function simSetSpeed(x) { simAnchor(); SIM.speed = x; }
  function simSetPaused(p) { simAnchor(); SIM.paused = p; }
  function simJumpToTau(tau) { simAnchor(getMatrixEpoch() + tau * MS_CAL); }

  /* ── Development checks ────────────────────────────────────────────────────
     The specification's validation table, asserted against the derived model
     rather than substituted for it. Silent when everything holds.           */
  (function checkMatrix() {
    const f = [];
    const near = (x, y, tol, what) => { if (!(Math.abs(x - y) <= tol)) f.push(`${what}: ${x} vs ${y}`); };

    const EQ = [1,68,69,206,3159,3365,9889,23143,79318,1530185,1609503,3139688,70682639,
      73822327,144504966,1518871987,3182248940,26976863507,30159112447,600000000000];
    const gq = LADDER.map(L => L.q);
    if (gq.length !== EQ.length || gq.some((v, i) => v !== EQ[i])) f.push('ladder mismatch');

    const EJ = {1:8736982783,68:5885170756,69:2851812027,206:181546702,3159:128611497,
      3365:52935205,9889:22741087,23143:7453031,79318:381994,1530185:195145,1609503:186849,
      3139688:8296,70682639:4337,73822327:3959,144504966:378,1518871987:179,3182248940:20,
      26976863507:19,30159112447:1,600000000000:0};
    const ED = {1:1258.125520752,68:847.464588864,69:410.660931888,206:26.142725088,
      3159:18.520055568,3365:7.62266952,9889:3.274716528,23143:1.073236464,79318:0.055007136,
      1530185:0.02810088,1609503:0.026906256,3139688:0.001194624,70682639:0.000624528,
      73822327:0.000570096,144504966:0.000054432,1518871987:0.000025776,3182248940:0.00000288,
      26976863507:0.000002736,30159112447:0.000000144,600000000000:0};
    LADDER.forEach(L => {
      if (L.J !== EJ[L.q]) f.push(`J at q=${L.q}`);
      near(L.residual, ED[L.q], 1e-9, `residual q=${L.q}`);
      near(L.integration, 1 - EJ[L.q] / J0, 1e-15, `integration q=${L.q}`);
    });
    for (let i = 1; i < LADDER.length; i++)
      if (LADDER[i].J >= LADDER[i - 1].J) f.push(`J rose at rung ${i}`);

    /* twenty named states, one per rung, all distinct */
    if (new Set(LADDER.map(L => L.state)).size !== 20) f.push('state names not 20 and distinct');
    if (ABSOLUTE.state !== 'ABSOLUTE') f.push('the absorbing state is not named ABSOLUTE');

    /* the live descent: J0 at the start of the experiment, exact AT every hard
       rung, and it never rises */
    if (liveLoad(0, LAUNCH, nextRung(0), false) !== J0) f.push('live J at tau=0 is not J0');
    if (!(liveLoad(0.5, LAUNCH, nextRung(0.5), false) < J0)) f.push('live J does not move before tau=1');
    if (nextRung(0) !== RUNGS[0]) f.push('the first target is not the first hard rung');
    RUNGS.forEach((L, i) => {
      const at = liveLoad(L.tau, L, nextRung(L.tau), false);
      if (Math.abs(at - L.J) > 1e-6) f.push(`live J at rung ${i + 1}: ${at} vs ${L.J}`);
    });
    let pl = Infinity;
    for (let k = 0; k <= 72000; k++) {
      const t = k / 100;
      const r = retainedAtTau(t), nx = nextRung(t), ab = isAbsolute(t);
      const jl = liveLoad(t, r, nx, ab);
      if (jl > pl + 1e-9) { f.push(`live J rose at tau=${t}`); break; }
      if (jl < -1e-9) { f.push(`live J negative at tau=${t}`); break; }
      pl = jl;
    }
    if (liveLoad(TAU_STAR, ABSOLUTE, null, true) !== 0) f.push('live J not 0 at absorption');

    /* launch is the only entry that integrates nothing, and every hard rung
       strictly reduces the load */
    if (!(LAUNCH.q === 1 && LAUNCH.J === J0 && LAUNCH.integration === 0))
      f.push('launch state is not q=1, J=J0, I=0');
    if (RUNGS.length !== 19) f.push(`hard rungs: ${RUNGS.length} not 19`);
    if (RUNGS.some(L => L.J === J0 || L.integration <= 0))
      f.push('a hard rung reduces nothing');

    /* tau at every hard rung — singularity active from launch */
    const ET = {68:68.0,69:68.673593035739,206:113.391347139501,3159:174.752050750951,
      3365:177.784444088563,9889:217.311736976442,23143:251.809958454510,79318:299.729706818858,
      1530185:363.163789563805,1609503:364.935397851751,3139688:397.659914331435,
      70682639:461.793761840700,73822327:463.352289217279,144504966:495.380802349465,
      1518871987:554.841916883059,3182248940:588.920555010438,26976863507:643.389277584319,
      30159112447:650.309599091378,600000000000:715.531301102943};
    LADDER.forEach(L => { if (ET[L.q] !== undefined) near(L.tau, ET[L.q], 1e-8, `tau(q=${L.q})`); });
    near(TAU_STAR, 715.5313011029427, 1e-9, 'tau*');
    if (!(TAU_STAR_FR.n === 6251584658434n && TAU_STAR_FR.d === 8736982783n))
      f.push(`tau* is not 6251584658434/8736982783 (got ${TAU_STAR_FR.n}/${TAU_STAR_FR.d})`);
    near(tauOfQ(1), 1, 1e-12, 'tau(q=1)');

    /* the q=206 collapse */
    near(tauOfQ(206), 113.391347139501, 1e-8, 'tau at q=206');
    near(181546702 / J0, 0.020779107, 1e-9, 'J/J0 at q=206');
    near(113.391347139501 / TAU_STAR, 0.158471540, 1e-8, 'fraction of trajectory at q=206');

    /* the absorbing state is held, and nothing divides by J = 0 */
    [TAU_STAR, TAU_STAR + 1e-9, 800, 5000, 1e6].forEach(t => {
      if (qOfTau(t) !== Q) f.push(`q at tau=${t}`);
      if (retainedJ(t) !== 0) f.push(`J at tau=${t}`);
      if (retainedResidualSec(t) !== 0) f.push(`residual at tau=${t}`);
      if (retainedIntegration(t) !== 1) f.push(`integration at tau=${t}`);
      if (!isAbsolute(t)) f.push(`not absolute at tau=${t}`);
    });
    /* the turnover is always ahead, and never more than one Matrix date away */
    [0, 0.5, 3.0269, 137.5, 715.9].forEach(t => {
      const w = t * MS_CAL - Math.floor(t) * MS_CAL, r = MS_CAL - w;
      if (!(r > 0 && r <= MS_CAL + 1e-6)) f.push(`turnover out of range at tau=${t}`);
    });

    /* THE REFERENCE YEAR, built by the same builder the living years use,
       must be the canon exactly: its ladder, τ*, nineteen signs, names, tides
       and gates. */
    const C0 = CANON, CS = C0.signs;
    if (C0.J0 !== J0 || C0.Q !== Q) f.push('reference J0/Q');
    if (C0.ladder.length !== LADDER.length || C0.ladder.some((L, i) => L.q !== LADDER[i].q || L.J !== LADDER[i].J || Math.abs(L.tau - LADDER[i].tau) > 1e-9))
      f.push('reference ladder differs from the canon');
    if (C0.ladder.some((L, i) => L.state !== LADDER[i].state || L.accent !== LADDER[i].accent || L.phaseName !== LADDER[i].phaseName))
      f.push('reference state names, accents or principles differ from the canon');
    near(C0.tauStar, TAU_STAR, 1e-12, 'reference τ*');
    if (CS.length !== 19) f.push('reference signs are not nineteen');
    if (CS.map(S => S.name).join(',') !== 'Origo,Limen,Scissa,Vortex,Sedes,Nexus,Fornax,Lyra,Echo,Nodus,Corpus,Spira,Acus,Filum,Petra,Lumen,Conflux,Una,Monas') f.push('reference sign names');
    near(CS.reduce((a, S) => a + S.length, 0), TAU_STAR, 1e-9, 'signs sum to τ*');
    if (CS.reduce((a, S) => a + S.dates, 0) !== 716 || C0.datesPerYear !== 716) f.push('reference dates are not 716');
    if (C0.partialQuotients.join(',') !== '68,1,2,15,1,2,2,3,19,1,1,22,1,1,10,2,8,1,19') f.push('reference sign numbers');
    if (CS.filter(S => S.gate).map(S => S.i).join(',') !== '1,4,9,12,17') f.push('reference gates moved');
    if (CS.map(S => S.tide).join('') !== '0001111222223333344') f.push('reference tides moved');

    /* THE LIVING YEARS: every one closes at J = 1 then 0, its signs tile it,
       the chain has no gaps, and the backwards solution meets the launch. */
    for (let k = -3; k <= 12; k++) {
      const c = cycle(k), y = c.year, S = y.signs;
      if (S[S.length - 1].name !== 'Monas' || y.ladder[y.ladder.length - 2].J !== 1) f.push(`cycle ${k}: last sign is not Monas at J = 1`);
      if (S.length >= 2 && S[S.length - 2].name !== 'Una') f.push(`cycle ${k}: Una is not second to last`);
      near(S.reduce((a, x) => a + x.length, 0), y.tauStar, 1e-7, `cycle ${k}: signs tile τ*`);
      if (S.reduce((a, x) => a + x.dates, 0) !== y.datesPerYear) f.push(`cycle ${k}: sign dates`);
      if (S.some(x => x.dates < 0)) f.push(`cycle ${k}: negative date count`);
      if (Math.abs(cycle(k + 1).start - c.end) > 1e-3) f.push(`cycle ${k}: gap before the next Turning`);
      if (Math.abs(c.end - c.start - y.msYear) > 2) f.push(`cycle ${k}: length is not its own τ*`);
      for (let i = 1; i < y.ladder.length; i++) if (y.ladder[i].J >= y.ladder[i - 1].J) { f.push(`cycle ${k}: J rose`); break; }
    }
    if (cycle(1).start !== CAL360.epochLive) f.push('cycle 1 does not open at the launch');
    /* the orbital calendar: Ortiva 1 at the launch, 360 counted dates a year,
       and the civil inverse of the count lands where the count says */
    { const o = orbitalAt(0); if (o.year !== 1 || o.month !== 0 || o.day !== 1) f.push('orbital year 1 does not open on Ortiva 1 at the launch'); }
    { const o = orbitalAt(359.999); if (o.month !== 11 || o.day !== 30) f.push('orbital date 360 is not Redita 30'); }
    if (ORBITAL_MONTHS.length !== 12) f.push('orbital months are not twelve');
    [0, 1, 359.5, 360, 700.25, 1500, -3.5].forEach(x => {
      const ms = msOfCalendarTau(x), r = calendarAt(ms), back = r.c.datesBefore + r.yearTau;
      if (Math.abs(back - x) > 1e-6) f.push(`msOfCalendarTau(${x}) returns to ${back}`);
    });
    if (String(cycle(1).year.units) !== '3652421879950') f.push(`cycle 1 Y is ${cycle(1).year.Ystr}, expected 365.2421879950`);
    { const a = calendarAt(CAL360.epochLive); if (a.cycle !== 1 || a.dayIndex !== 0 || a.weekday !== 0 || a.sign !== 0) f.push('the launch is not Differa, Origo 1 of cycle 1'); }
    { const c2 = cycle(2), a = calendarAt(c2.start - 1), b = calendarAt(c2.start);
      if (a.cycle !== 1 || !a.threshold || b.cycle !== 2 || b.dayIndex !== 0) f.push('the Turning does not close one year and open the next'); }

    /* the inverse inverts, and no reading ever reverses */
    LADDER.forEach(L => { if (L.tau < TAU_STAR) near(qOfTau(L.tau), L.q, Math.max(1, L.q * 1e-6), `qOfTau(tau(q=${L.q}))`); });
    let pj = Infinity, pi = -Infinity, pq = -Infinity;
    for (let k = 0; k <= 8000; k++) {
      const t = k / 10, j = retainedJ(t), ii = retainedIntegration(t), qq = qOfTau(t);
      if (j > pj) { f.push(`retained J rose at tau=${t}`); break; }
      if (ii < pi) { f.push(`integration fell at tau=${t}`); break; }
      if (qq < pq) { f.push(`q went backwards at tau=${t}`); break; }
      pj = j; pi = ii; pq = qq;
    }

    /* frozen constants and the two fractions, kept distinct */
    near(MS_CAL, 87658125.520752, 1e-6, 'Matrix date (ms)');
    near(LEAD_MS / 1000, 1258.125520752, 1e-9, 'clock dilation (s)');
    near(FRACTION_DIRECT * 100, 1.4561637971666, 1e-10, 'J0/Q %');
    near(FRACTION_12FOLD * 100, 17.473965566, 1e-9, '12·J0/Q %');

    if (f.length) console.error('[matrix] checks failed:\n  ' + f.join('\n  '));
  })();

  const api = {
    /* the reference year (J2000, Y = 365.2421896698): canon, checked on load */
    LADDER, LAUNCH, RUNGS, ABSOLUTE, J0, Q, TAU_STAR, TAU_STAR_FR, MS_CAL, LEAD_MS, RATE_R,
    FRACTION_DIRECT, FRACTION_12FOLD, YEAR_REF, MS_DAY, SLEEP_END, NOON, CANON,
    recurrenceLadder, tauOfQ, qOfTau, retainedAtTau, nextRung, liveLoad, spanFraction,
    retainedJ, retainedResidualSec, retainedIntegration, isAbsolute,
    velocityM, livingPhaseM, equationOfTime, solarFraction,
    getMatrixEpoch, getMatrixDayCount, cal360, CAL360, mode: MATRIX_MODE,
    SIM, SIM_SPEEDS, simNow, simEnter, simExit, simSetSpeed, simSetPaused, simJumpToTau,
    simJumpTo: ms => simAnchor(ms),
    walkSeconds, walkLaps, daySec, waveVB, rateR, velocity, consumed, livingPhase,
    /* the living years */
    laskarYear, yearUnitsAt, buildYear, cycle, cycleAt, calendarAt, civilOfDate, civilOfYearTau,
    ORBITAL_MONTHS, orbitalAt, msOfCalendarTau, civilOfOrbital,
    TIDE_NAMES: TIDE_DEFS.map(T => T.name)
  };
  /* Year-dependent names: the year of the most recent cal360() reading. */
  Object.defineProperties(api, {
    SIGNS:             { get: () => CURRENT.year.signs, enumerable: true },
    WAVES:             { get: () => CURRENT.year.signs, enumerable: true },   // the astral time waves
    TIDES:             { get: () => CURRENT.year.tides, enumerable: true },
    TURNING:           { get: () => CURRENT.year.turning, enumerable: true },
    DATES_PER_YEAR:    { get: () => CURRENT.year.datesPerYear, enumerable: true },
    YEAR_DATES:        { get: () => CURRENT.year.tauStar, enumerable: true },
    MS_YEAR:           { get: () => CURRENT.year.msYear, enumerable: true },
    PARTIAL_QUOTIENTS: { get: () => CURRENT.year.partialQuotients, enumerable: true },
    YEAR:              { get: () => CURRENT.year, enumerable: true },
    signAtYearTau:     { get: () => CURRENT.year.signAt, enumerable: true }
  });

  window.SCMatrix = api;
  window.__matrix = window.__matrix || api;
})();
