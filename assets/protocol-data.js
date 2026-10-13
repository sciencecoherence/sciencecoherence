/* ═══════════════════════════════════════════════════════════════════════════
   THE PROTOCOL — data
   The daily architecture of Holographic Repolymerization, carried from
   documents/holographic-repolymerization.html (science-coherence-website).
   Titles, windows, compounds, doses and notes are the document's own words
   (its inline formulas written here as plain text).
   Hours are read on the Temporal Matrix clock face (assets/matrix-engine.js):
   anchored to the sun, 12:00 peak sun, 00:00 solar midnight.

   The pulsed (entheogenic) and as-needed strata are NOT scheduled here;
   they stay in the full document as written.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  /* Each window: id, start and end in Matrix-clock hours (end may pass 24),
     kind ('rest' | 'dose' | 'act' | 'meal' | 'mark'), and the phase it carries. */
  const WINDOWS = [
    { id: 'sleep1',  name: 'First sleep',   start: 20,   end: 24,   kind: 'rest', accent: 'violet', short: 'Sleep I',
      text: 'The first block concentrates early non-REM slow-wave sleep and the growth-hormone surge.' },
    { id: 'watch',   name: 'The watch',     start: 0,    end: 2,    kind: 'rest', accent: 'amber',  short: 'Watch',
      text: 'The waking interval between the two sleeps: dim, blue-free amber light, no screens; silent contemplation, journaling or stillness.' },
    { id: 'sleep2',  name: 'Second sleep',  start: 2,    end: 5,    kind: 'rest', accent: 'blue',   short: 'Sleep II',
      text: 'The second block concentrates REM sleep and theta rhythms, for memory consolidation and synaptic plasticity.' },
    { id: 'vehicle', name: 'Awakening elixir', start: 7, end: 7,    kind: 'dose', accent: 'amber',  short: '07:00', phase: 'vehicle' },
    { id: 'pre',     name: 'Pre-workout drink', start: 11, end: 11, kind: 'dose', accent: 'teal',   short: '11:00', phase: 'pre' },
    { id: 'train',   name: 'Fasted resistance training', start: 11, end: 13, kind: 'act', accent: 'rose', short: 'Training',
      text: 'Heavy resistance training in the fasted state, fuelled by circulating ketone bodies from the 07:00 vehicle.' },
    { id: 'post',    name: 'Post-workout drink', start: 13, end: 13, kind: 'dose', accent: 'teal',  short: '13:00', phase: 'post' },
    { id: 'omad',    name: 'OMAD',          start: 13.5, end: 15,   kind: 'meal', accent: 'green',  short: 'OMAD', phase: 'omad' },
    { id: 'cutoff',  name: 'Food cutoff',   start: 15,   end: 15,   kind: 'mark', accent: 'rose',   short: '15:00',
      text: 'Zero food or caloric snacks after 15:00: a five-hour digestion-free runway before the first sleep.' },
    { id: 'evening', name: 'Evening reset', start: 17,   end: 20,   kind: 'dose', accent: 'violet', short: 'Reset', phase: 'evening' }
  ];
  const PHASES = {
    "vehicle": {
      "label": "Phase 1",
      "title": "Awakening Elixir: NSI-189 Neurogenic Vehicle",
      "window": "07:00 · fasted",
      "accent": "amber",
      "vehicleLabel": "Vehicle",
      "vehicle": "100 mL raw organic virgin coconut oil",
      "compounds": [
        {
          "name": "NSI-189",
          "dose": "20–40 mg",
          "min": 20.0,
          "max": 40.0,
          "unit": "mg",
          "targets": "Hippocampal NSCs/NPCs, TrkB, CREB, Dentate Gyrus SGZ",
          "role": "Potent neurogenesis & synaptogenesis; expands hippocampal volume; upregulates BDNF/TrkB signaling and synaptic LTP; lipophilic synergy with coconut oil vehicle."
        }
      ],
      "note": "Phase 1 is strictly isolated to lipophilic NSI-189 in 100 mL coconut oil to preserve dry-fast autophagic and ketogenic kinetics with zero digestive drag. All mitochondrial powders and the Neuro-Vascular Triad are delivered at 11:00 in the Pre-Workout Drink (water only)."
    },
    "pre": {
      "label": "Pre-Workout",
      "title": "Pre-Workout Hydration & Microvascular Axis",
      "window": "11:00 · pre-workout",
      "accent": "rose",
      "vehicleLabel": "Vehicle",
      "vehicle": "500–750 mL fresh water only (zero calories/macronutrients)",
      "compounds": [
        {
          "name": "L-Citrulline",
          "dose": "3000–6000 mg",
          "min": 3000.0,
          "max": 6000.0,
          "unit": "mg",
          "targets": "ASS, ASL, eNOS axis",
          "role": "Bypasses splanchnic hepatic uptake; fuels systemic endothelial L-arginine pool for continuous nitric-oxide synthesis and maximal muscle hyperemia."
        },
        {
          "name": "ALCAR",
          "dose": "500–1000 mg",
          "min": 500.0,
          "max": 1000.0,
          "unit": "mg",
          "targets": "OCTN2, CACT, CrAT, GAP-43",
          "role": "Mitochondrial acetyl-CoA donor; fuels TCA flux; drives acetylcholine motor unit recruitment and fatty-acid β-oxidation."
        },
        {
          "name": "Na-R-ALA",
          "dose": "150–300 mg",
          "min": 150.0,
          "max": 300.0,
          "unit": "mg",
          "targets": "Keap1 / Nrf2, PDH, α-KGDH, Pol β Cys267",
          "role": "Nrf2/GPx4 activation; heavy-metal chelation; stimulates contraction-independent GLUT4 translocation; shields Pol β thiols under load."
        },
        {
          "name": "Tadalafil",
          "dose": "2.5–5 mg",
          "min": 2.5,
          "max": 5.0,
          "unit": "mg",
          "targets": "Phosphodiesterase-5 (PDE5)",
          "role": "Halts cGMP breakdown; synergizes with L-Citrulline to multiply eNOS vasodilation across working skeletal muscle, retinal microvessels, and fascia."
        }
      ],
      "note": "Baseline daily pre-workout hydration drink. Ingested in pure water immediately prior to resistance training to maximize hyperemia, cellular hydration, and motor unit recruitment. Creatine, Glycine, and TMG are delivered in the 13:00 Post-Workout Hydration Drink (water only) to drive cellular rehydration and phosphagen resaturation without pre-lift gastric heaviness or inhibitory sedation."
    },
    "post": {
      "label": "Post-Workout",
      "title": "Post-Workout Hydration & Muscular Recovery",
      "window": "13:00 · immediately post-workout",
      "accent": "teal",
      "vehicleLabel": "Vehicle",
      "vehicle": "500–750 mL fresh water only (zero calories/macronutrients)",
      "compounds": [
        {
          "name": "Creatine monohydrate",
          "dose": "5000 mg",
          "min": 5000.0,
          "max": 5000.0,
          "unit": "mg",
          "targets": "Creatine kinase (CK), CreaT (SLC6A8), nuclear PCr pool",
          "role": "Post-workout phosphagen saturation; rapid muscle uptake following contraction; restores cytosolic and nuclear ATP buffering without pre-lift gastric heaviness."
        },
        {
          "name": "TMG (Betaine)",
          "dose": "1500–2500 mg",
          "min": 1500.0,
          "max": 2500.0,
          "unit": "mg",
          "targets": "BHMT, SAMe methylome, gastric HCl & bile",
          "role": "Drives remethylation of homocysteine to methionine; cellular osmolyte; stimulates stomach acid (HCl) and bile synthesis in immediate preparation for OMAD fat digestion."
        },
        {
          "name": "Glycine (recovery split)",
          "dose": "3000–5000 mg",
          "min": 3000.0,
          "max": 5000.0,
          "unit": "mg",
          "targets": "Glutathione synthetase, collagen triplets (Gly-Pro-Hyp)",
          "role": "Supplies essential substrate for post-workout myofibrillar and fascial collagen remodeling; prevents protein glycation (AGEs); fuels glutathione synthesis right as systemic tissue repair initiates."
        }
      ],
      "note": "Post-workout hydration drink taken in pure water immediately upon cessation of training (13:00) to rehydrate contracting tissues, replenish the phosphagen pool, and stimulate digestive acid/bile secretion prior to the OMAD meal."
    },
    "omad": {
      "label": "Phase 2",
      "title": "The Longevity OMAD Ketogenic Meal",
      "window": "13:30 – 15:00 · OMAD window",
      "accent": "amber",
      "vehicleLabel": "Meal base",
      "vehicle": "pastured pork lard, bone marrow, squid, octopus, lisa fish",
      "compounds": [
        {
          "name": "Boron (glycinate)",
          "dose": "3–6 mg",
          "min": 3.0,
          "max": 6.0,
          "unit": "mg",
          "targets": "CD38 glycoprotein, SHBG",
          "role": "CD38 inhibition spares intracellular NAD⁺ for the SIRT6 heterochromatin lock. Cycle 2 weeks on / 1 week off."
        },
        {
          "name": "Astaxanthin",
          "dose": "6–12 mg",
          "min": 6.0,
          "max": 12.0,
          "unit": "mg",
          "targets": "Lipid bilayer, IKKβ, nuclear envelope",
          "role": "Transmembrane polar anchor; halts ¹O₂; shields exposed DNA bubbles and lipids from ferroptosis."
        },
        {
          "name": "Injuv® (low-MW HA)",
          "dose": "70–140 mg",
          "min": 70.0,
          "max": 140.0,
          "unit": "mg",
          "targets": "CD44, RHAMM, HAS2, HAS3",
          "role": "1–5 kDa hyaluronan oligomers; stimulates endogenous HAS2; fascial and nuclear EZ hydration."
        },
        {
          "name": "Gotu kola extract",
          "dose": "300–500 mg",
          "min": 300.0,
          "max": 500.0,
          "unit": "mg",
          "targets": "TGF-β/Smad2/3, TIMP-1/2, MAPK/ERK",
          "role": "Asiaticoside drives Type I/III collagen remodeling; caps MMPs; arrests paracrine SASP damage."
        },
        {
          "name": "White Jelly Mushroom",
          "dose": "500–1000 mg",
          "min": 500.0,
          "max": 1000.0,
          "unit": "mg",
          "targets": "Dectin-1 (CLEC7A), TLR4/MD-2, TrkB",
          "role": "Glucuronoxylomannan lattice; expands macro-scale H_3O₂⁻ EZ water; drives the microglial M2 switch."
        },
        {
          "name": "C3G (Cyanidin 3-Glucoside)",
          "dose": "250–500 mg",
          "min": 250.0,
          "max": 500.0,
          "unit": "mg",
          "targets": "Rhodopsin (11-cis-retinal), AMPK, GLUT4, nucleoplasm",
          "role": "Standardized anthocyanin; accelerates opsin regeneration and retinal photoprotection; activates AMPK; aqueous radical sink shielding uncoiled euchromatin during repair sweeps."
        }
      ],
      "note": ""
    },
    "evening": {
      "label": "Phase 3",
      "title": "Bedtime Somatic Reset & Mind Recoding",
      "window": "17:00 – 20:00 · Evening reset",
      "accent": "blue",
      "vehicleLabel": "Window",
      "vehicle": "Strictly Non-Caloric (Zero Food) closes the window; prepares for 20:00 sleep phase 1",
      "compounds": [
        {
          "name": "Glycine",
          "dose": "3000–5000 mg",
          "min": 3000.0,
          "max": 5000.0,
          "unit": "mg",
          "targets": "NMDA receptor (glycine site), preoptic area",
          "role": "Induces hypothermia via peripheral vasodilation; deepens slow-wave sleep architecture and sustains collagen synthesis."
        },
        {
          "name": "ND Ecklonia cava extract",
          "dose": "100–200 mg",
          "min": 100.0,
          "max": 200.0,
          "unit": "mg",
          "targets": "GABA-A-benzodiazepine site, dieckol",
          "role": "Polyphenolic phlorotannins; positive allosteric GABA-A modulation; expands non-REM delta power without tolerance."
        },
        {
          "name": "ND Tauromag® (ATA-Mg)",
          "dose": "350–700 mg",
          "min": 350.0,
          "max": 700.0,
          "unit": "mg",
          "targets": "Neuronal NMDA channels, GABA-A / GlyR",
          "role": "Magnesium acetyl taurate crosses the BBB; blocks glutamate excitotoxicity; delivers intracellular taurine to calm neural firing."
        },
        {
          "name": "ND Lemon balm extract",
          "dose": "300–500 mg",
          "min": 300.0,
          "max": 500.0,
          "unit": "mg",
          "targets": "GABA-transaminase (GABA-T)",
          "role": "Standardized rosmarinic acid; inhibits GABA-T degradation to sustain nocturnal inhibitory synaptic tone."
        },
        {
          "name": "Micro-dose melatonin",
          "dose": "0.3 mg",
          "min": 0.3,
          "max": 0.3,
          "unit": "mg",
          "targets": "MT1 / MT2 receptors, pineal axis",
          "role": "Directly rescues pineal AANAT suppression induced by daytime propranolol; restores circadian RPE phagocytic rhythm."
        },
        {
          "name": "Gotu kola (night split)",
          "dose": "200–300 mg",
          "min": 200.0,
          "max": 300.0,
          "unit": "mg",
          "targets": "GABA-T, nocturnal collagen remodeling",
          "role": "Mild GABA-T inhibition; leverages the nocturnal growth-hormone (GH) pulse for TGF-β-mediated ECM cross-linking."
        }
      ],
      "note": ""
    }
  };
  const SCALES = [
    { value: 0.8,  label: 'Low mass (50–64 kg)' },
    { value: 1,    label: 'Standard (65–80 kg)' },
    { value: 1.25, label: 'High mass (81–100+ kg)' }
  ];
  const MEDITATION = [
    { name: 'Ground State',       center: 963, accent: 'teal',
      text: 'Lengthen the spine and soften the gaze. Let the breath settle while the 963 Hz center serves as a simple sonic anchor; there is no state to force.' },
    { name: 'Clearing the Noise', center: 852, accent: 'blue',
      text: 'Picture static and unwanted signal activity receding. “Parasitic DNA” and LINE-1 are symbolic imagery here, not a claim that sound removes genetic material.' },
    { name: 'Coherent Blueprint', center: 741, accent: 'violet',
      text: 'Hold a clear organizing pattern in awareness. Notice steadiness, spacious attention, and continuity without assigning the image a biological effect.' },
    { name: 'Repolymerization',   center: 528, accent: 'rose',
      text: 'Imagine repair as patient reweaving: gaps closing, continuity returning, and structure becoming legible. This is contemplative imagery, not induced DNA synthesis.' },
    { name: 'Telomere Shelter',   center: 639, accent: 'amber',
      text: 'Picture each chromosome end sheltered and intact, with the telomere held inside a protective cap. Rest in continuity rather than striving for extension.' },
    { name: 'Integration & Seal', center: 432, accent: 'green',
      text: 'Let the sequence settle. Imagine renewed material integrated, unnecessary noise quiet, and the whole system returning gently to ordinary awareness.' }
  ];
  window.SCProtocol = { WINDOWS, PHASES, SCALES, MEDITATION };
})();
