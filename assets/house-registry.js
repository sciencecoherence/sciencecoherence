/* ==========================================================================
   THE HOUSE — the one registry of doors, rooms, secrets and dense linking.
   Every page of the new site reads this file. Change things here only.

   DOORS    hidden links. on: true shows the door, false removes it.
            Add ?doors=all to any address to preview every door.
   ROOMS    places that open in an overlay. A lock makes a room open only
            at certain Matrix moments; outside them the room shows when
            it will open. Room text is taken from the site's own writing.
   SECRETS  words typed anywhere on a page (not in a text field).
   GLOSS    where every known term becomes a door into its definition.
   MAP      the constellation of the house (press M, or the small ✧).
   ========================================================================== */
window.SC_HOUSE = {

  doors: {
    introduction: { on: false, page: 'index.html',           where: 'hover the black hole',       to: 'Always becoming' },
    matrix:       { on: true,  page: 'index.html',           where: 'the countdown clock',        to: 'temporal-matrix.html' },
    protocol:     { on: true,  page: 'temporal-matrix.html', where: 'the Matrix clock',           to: 'protocol.html' },
    'watch-star': { on: true,  page: 'protocol-matrix.html', where: 'one star, by night',         to: 'room:watch' },
    stilla:       { on: true,  page: 'protocol-matrix.html', where: 'the lived day, on Stilla',   to: 'room:stilla' },
    boundary:     { on: true,  page: 'protocol.html',        where: 'hold the sphere’s caption',  to: 'term:lex-holographic-principle' },
    /* the cleanse (protocol-pathogen.html) */
    'cleanse-clock': { on: true, page: 'temporal-matrix.html', where: 'the Matrix clock, in the hours of the cleanse', to: 'protocol-pathogen.html',
      windows: [
        { from: 7,     to: 8,     id: 'w1', name: 'Awakening activation & biofilm stripping' },
        { from: 12,    to: 13,    id: 'w2', name: 'Midday eradication & perfusion' },
        { from: 16,    to: 17,    id: 'w3', name: 'Targeted CNS heavy metal mobilization' },
        { from: 18.5,  to: 19.5,  id: 'w4', name: 'Evening pulse & hepatic drainage' },
        { from: 21.75, to: 22.25, id: 'w5', name: 'Bedtime luminal binding' }
      ] },
    chelation:    { on: true,  page: 'protocol.html',        where: 'the words “heavy-metal chelation”', to: 'protocol-pathogen.html#chelation',  word: 'heavy-metal chelation', within: '#protocol .body' },
    parasitic:    { on: true,  page: 'protocol.html',        where: 'the word “parasitic”',        to: 'protocol-pathogen.html#biophysics', word: 'parasitic', within: '#epigenetics .body' },
    /* the compound library (compounds.html) */
    regenesis:    { on: true,  page: 'protocol.html',        where: 'the words “neuro-somatic compounds”', to: 'compounds.html#master-protocol', word: 'neuro-somatic compounds', within: '#protocol .body' },
    triad:        { on: true,  page: 'protocol-pathogen.html', where: 'the words “starter triad”', to: 'compounds.html#register', word: 'starter triad', within: '#priming .body' }
  },

  rooms: {
    watch: {
      title: 'The watch', kicker: '00:00 – 02:00 · between the two sleeps', accent: 'amber',
      lock: { hours: [0, 2] },
      closed: 'This room is open only during the watch, from 00:00 to 02:00 on the Matrix clock.',
      html: `<div class="card" data-accent="teal">
      <div class="card-head"><h3 class="card-kicker">The Inter-Sleep Interval &amp; Adaptive Calibration</h3><span class="tag">The Watch · 00:00–02:00</span></div>
      <p>The two-hour waking interval between midnight and 02:00 represents a distinct neurochemical state termed <strong>the watch</strong>:</p>
      <ul class="list">
        <li><strong>Hyper-Calm Prolactin State.</strong> During this interval, pituitary prolactin remains elevated while daytime cortisol, epinephrine, and dopamine remain quiescent. The brain exists in an extraordinarily lucid, non-reactive state of parasympathetic quietude.</li>
        <li><strong>Nocturnal Contemplative Sanctuary.</strong> Kept under dim, indirect, blue-free amber/red illumination with zero digital screens, this window is utilized for silent contemplation, journaling, or stillness—bridging the two sleep architectures without triggering wakefulness anxiety.</li>
        <li><strong>Lived Empirical Calibration.</strong> <span class="dim">Operating parameter:</span> The exact boundaries of the two sleep blocks and waking window are designed as living reference coordinates. As direct somatic experience progresses in the physical environment, individual window timings will be continuously adjusted based on subjective vigilance, sleep architecture tracking, and metabolic comfort.</li>
      </ul>
    </div>`
    },
    stilla: {
      title: 'Stilla', kicker: 'The day of stillness', accent: 'green',
      lock: { weekday: 5 },
      closed: 'This room is open only on Stilla, the sixth day of the Matrix week.',
      source: 'day:5'
    },
    gate: {
      title: 'A gate', kicker: 'A passage rather than a season', accent: 'violet',
      lock: { gate: true },
      closed: 'This room is open only while the year passes through one of its five gates: Limen, Sedes, Nodus, Acus or Una.',
      source: 'sign:now'
    },
    recursion: {
      title: 'The recursion', kicker: '∇Φ → Λ → Ω → Δ', accent: 'lime',
      source: 'recursion'
    }
  },

  secrets: {
    /* no letter c: C opens the calendar on the Matrix page */
    words: { imagine: 'room:recursion', gate: 'room:gate', dorveille: 'room:watch' }
  },

  gloss: {
    'protocol.html':        ['.chapter .body'],
    'protocol-matrix.html': ['.read-on .col > p', '.card-inner', '.wd', '.med p'],
    'temporal-matrix.html': ['#read .col'],
    'library.html':         ['#prose', '.arch-body'],
    'protocol-pathogen.html': ['.chapter .body'],
    'compounds.html':       ['.chapter .body']
  },

  /* positions on the map, in percent of its field */
  map: {
    'page:index.html':           { x: 50, y: 10, label: 'The horizon' },
    'page:temporal-matrix.html': { x: 24, y: 34, label: 'The Temporal Matrix' },
    'page:protocol.html':        { x: 76, y: 34, label: 'The Protocol' },
    'page:protocol-matrix.html': { x: 50, y: 56, label: 'The day, live' },
    'room:watch':                { x: 22, y: 78, label: 'The watch' },
    'room:stilla':               { x: 78, y: 78, label: 'Stilla' },
    'room:gate':                 { x: 90, y: 14, label: 'A gate' },
    'room:recursion':            { x: 50, y: 88, label: 'The recursion' },
    'lexicon':                   { x: 10, y: 14, label: 'The lexicon' },
    'page:library.html':         { x: 9,  y: 50, label: 'The library' },
    'page:protocol-pathogen.html': { x: 91, y: 52, label: 'The cleanse' },
    'page:compounds.html':       { x: 64, y: 72, label: 'The compounds' }
  },
  links: [
    ['page:index.html', 'page:temporal-matrix.html'],
    ['page:temporal-matrix.html', 'page:protocol.html'],
    ['page:protocol.html', 'page:protocol-matrix.html'],
    ['page:temporal-matrix.html', 'page:protocol-matrix.html'],
    ['page:protocol-matrix.html', 'room:watch'],
    ['page:protocol-matrix.html', 'room:stilla'],
    ['page:protocol-matrix.html', 'room:recursion'],
    ['page:protocol.html', 'room:gate'],
    ['page:temporal-matrix.html', 'lexicon'],
    ['page:protocol.html', 'lexicon'],
    ['page:index.html', 'page:library.html'],
    ['page:library.html', 'page:protocol.html'],
    ['page:library.html', 'lexicon'],
    ['page:protocol.html', 'page:protocol-pathogen.html'],
    ['page:library.html', 'page:protocol-pathogen.html'],
    ['page:protocol.html', 'page:compounds.html'],
    ['page:protocol-matrix.html', 'page:compounds.html'],
    ['page:protocol-pathogen.html', 'page:compounds.html'],
    ['page:library.html', 'page:compounds.html']
  ]
};
