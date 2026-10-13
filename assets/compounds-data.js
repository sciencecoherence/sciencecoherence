/* ==========================================================================
   THE REGENESIS COMPOUND LIBRARY — all of its information, in one file.
   compounds.html is only the page; everything it says lives here.

   SC_COMPOUNDS.compounds   one entry per compound, in register order:
     card fields   kicker, standard, bullets (three), field (the speculative reading)
     placement     dose, window, layers (0–4), inProtocol (the Protocol's own dose)
     monograph     subtitle, description, note, facts, sections [{id, label, title, summary, html}]
   SC_COMPOUNDS.groups      the filter of the extracts
   SC_DOCUMENTS             the page's own chapters (doctrine, the day, synergy,
                            nuance, register); the two empty .cmp-grid blocks are
                            filled with the compound cards.

   Loaded after assets/glossary.js on any page, it also makes every compound a
   word the house can explain, opening its monograph on compounds.html.
   Edit freely: text is HTML; keep "$" for math only.
   ========================================================================== */
window.SC_COMPOUNDS = {
 "layers": [
  {
   "code": "L0",
   "name": "The intracellular substrate",
   "accent": "green",
   "what": "Microtubule lattice, mitochondria, membranes and the matrix they sit in"
  },
  {
   "code": "L1",
   "name": "The molecular clock",
   "accent": "amber",
   "what": "CLOCK/BMAL1, ultradian hormone pulses, the NF-κB and HPA rhythms"
  },
  {
   "code": "L2",
   "name": "The cellular network",
   "accent": "teal",
   "what": "Gap junctions, synapses, receptor fields and bioelectric coupling"
  },
  {
   "code": "L3",
   "name": "The organismic field",
   "accent": "violet",
   "what": "Biophotonic emission, phase memory, structured water and long-range coherence"
  },
  {
   "code": "L4",
   "name": "The chronobiological interface",
   "accent": "blue",
   "what": "Retina, melanopsin, the solar day and the geomagnetic envelope"
  }
 ],
 "groups": [
  {
   "id": "foundation",
   "label": "Layer Zero",
   "accent": "green"
  },
  {
   "id": "neural",
   "label": "Neural growth & plasticity",
   "accent": "teal"
  },
  {
   "id": "network",
   "label": "Network balance & mood",
   "accent": "violet"
  },
  {
   "id": "drive",
   "label": "Drive, growth & hormonal rhythm",
   "accent": "rose"
  },
  {
   "id": "metabolic",
   "label": "Metabolic partitioning",
   "accent": "amber"
  },
  {
   "id": "matrix",
   "label": "Cytoprotection & matrix",
   "accent": "green"
  }
 ],
 "compounds": [
  {
   "slug": "glycine",
   "name": "Glycine",
   "aliases": [
    "Glycine"
   ],
   "case": false,
   "stratum": "foundation",
   "group": "foundation",
   "kicker": "Structural matrix / collagen",
   "standard": "Amino acid — G",
   "bullets": [
    "Primary collagen precursor — every third residue of the triple helix.",
    "Methionine buffering — prevents hyperhomocysteinemia under a meat-heavy diet.",
    "Phase II conjugation, glutathione, and the thermal descent into sleep."
   ],
   "field": "The metabolic glue — the informational adhesive that keeps the extracellular matrix structurally coherent.",
   "motto": "The structural anchor",
   "category": "Structural matrix · collagen",
   "accent": "green",
   "layers": [
    0,
    1
   ],
   "dose": "3–5 g × 2",
   "window": "13:00 · Evening reset",
   "inProtocol": true,
   "subtitle": "Collagen backbone, glutathione substrate, methyl-buffer and the thermal trigger of slow-wave sleep",
   "description": "Glycine as Layer Zero substrate: every third residue of collagen, the rate-limiting partner of glutathione, the disposal route for excess methyl groups, and the inhibitory signal that drops core temperature into the first sleep.",
   "note": "Glycine is carried by the Protocol itself, twice a day: in the 13:00 post-workout drink and in the 17:00–20:00 evening reset. The doses here are the Protocol’s. The archive’s single 15 g evening dose is superseded.",
   "facts": [
    {
     "value": "3–5 g",
     "label": "Post-workout split"
    },
    {
     "value": "3–5 g",
     "label": "Evening split"
    },
    {
     "value": "L0 · L1",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Structural Anchor",
     "summary": "Glycine as substrate, not stimulus.",
     "html": "<p class=\"doc-lede\">The simplest amino acid carries the heaviest structural load. Glycine occupies every third position of the collagen triple helix, supplies the glutathione the cell spends against oxidative pressure, absorbs the methyl surplus of a meat-dominant diet, and, taken at dusk, opens the skin’s vascular beds so that core heat can leave the body before the first sleep.</p><div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>Aminoacetic acid, the only achiral amino acid. Endogenous synthesis from serine and threonine covers roughly a third of the daily demand of an adult; the remainder must arrive as substrate. Muscle meat is glycine-poor relative to skin, tendon, cartilage and bone, so a diet built on muscle and organ tissue without connective tissue runs a structural deficit that the body pays for in collagen turnover and glutathione reserve.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "The Glycine Deficit and the Ground State",
     "summary": "What glycine restores, and on which layer of the hierarchy.",
     "html": "<p>The target state is a full glycine pool at Layer Zero: collagen synthesis unthrottled, glutathione regenerated at the rate it is spent, and the methionine:glycine ratio of the diet brought back into balance. Glycine is not a signal laid over the system. It is part of the ground on which signals become possible.</p><div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Structural matrix</h3><span class=\"tag\">L0</span></div>\n  <p>Collagen is <strong>(Gly–X–Y)<sub>n</sub></strong>: glycine’s single hydrogen side chain is the only residue small enough to sit at the centre of the triple helix. Every fascial sheet, tendon, vessel wall and the extracellular matrix around neurons is built on this repeat.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Redox substrate</h3><span class=\"tag\">L0</span></div>\n  <p>Glutathione is γ-glutamyl-cysteinyl-<strong>glycine</strong>. When glycine is short, glutathione synthase stalls and the cell loses the reducing capacity that protects the tubulin lattice from carbonylation.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Methyl balance</h3><span class=\"tag\">L0</span></div>\n  <p>Glycine N-methyltransferase (GNMT) transfers surplus methyl groups from S-adenosylmethionine onto glycine, forming sarcosine. This is the liver’s release valve when methionine intake runs high.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Thermal gate of sleep</h3><span class=\"tag\">L1</span></div>\n  <p>Glycine acts on NMDA receptors in the suprachiasmatic nucleus to dilate peripheral vessels. Core temperature falls, and the drop is the physical trigger for slow-wave sleep.</p>\n</div>\n</div><p>Read on the five-layer hierarchy, glycine acts at <strong>L0</strong>, where it provides material, and at <strong>L1</strong>, where it times the nightly descent that consolidates the day.</p>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Two splits, both in water, both carried by the Protocol.",
     "html": "<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Post-Workout</span><h3>Recovery split</h3><p class=\"phase-window\">13:00 · immediately after training</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">Glycine (recovery split)</th><td><span class=\"dose\">3000–5000 mg</span></td><td>Glutathione synthetase, collagen triplets (Gly-Pro-Hyp)</td><td>Supplies collagen substrate as mechanical strain ceases; fuels glutathione synthesis as tissue repair begins.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Kept out of the 11:00 pre-workout drink: central glycine-receptor inhibition would sedate the lift.</p>\n</article><article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 3</span><h3>Sleep split</h3><p class=\"phase-window\">17:00–20:00 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Strictly non-caloric</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">Glycine</th><td><span class=\"dose\">3000–5000 mg</span></td><td>NMDA receptor (glycine site), preoptic area</td><td>Peripheral vasodilation lowers core temperature; deepens slow-wave sleep; sustains nocturnal collagen synthesis.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Taken 30–60 minutes before 20:00 so that the temperature drop meets the first sleep.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"green\">Form</th><td>Free-form glycine powder</td><td>Sweet, neutral, fully soluble; no excipients needed.</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Daily total</th><td>6–10 g</td><td>Covers the connective-tissue deficit of a muscle-dominant diet.</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Cadence</th><td>Daily, no cycling</td><td>A substrate, not a receptor drug: there is no tolerance to manage.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "From Powder to Collagen, Glutathione and Sleep",
     "summary": "The pathway, step by step.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.1 Absorption</h3>\n  <p>Glycine crosses the intestinal epithelium on PAT1 and the GlyT transporters and reaches peak plasma levels within about an hour in water. Taken without food, it does not compete with the other amino acids of a meal.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.2 Collagen assembly</h3>\n  <p>Fibroblasts and fasciacytes, signalled by the mechanical strain of training, translate procollagen chains in which glycine fills every third position. Prolyl hydroxylase, vitamin C-dependent, stabilises the helix. Without glycine the chains misfold and are degraded in the ER.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.3 Glutathione regeneration</h3>\n  <p>Glutamate-cysteine ligase forms γ-glutamylcysteine; glutathione synthetase adds glycine. With cysteine supplied by the raw substrate, glycine availability sets the rate of the final step.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.4 Thermal descent</h3>\n  <p>In the SCN, glycine co-activates NMDA receptors and triggers vasodilation in the hands and feet. Heat leaves through the skin, core temperature falls by fractions of a degree, and sleep latency shortens while slow-wave depth increases.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Observed outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"violet\">Sleep architecture</th><td>Core-temperature fall via peripheral vasodilation</td><td>Faster sleep onset; deeper slow-wave recovery</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Detoxification</th><td>Phase II glycine conjugation (hippurate, bile acids)</td><td>Clearance of benzoates and xenobiotics</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Glutathione</th><td>Rate-limiting substrate with cysteine and glutamate</td><td>Restored intracellular reducing capacity</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Methyl load</th><td>GNMT: SAM + glycine → sarcosine</td><td>Excess methionine flux disposed of without homocysteine build-up</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Metabolic Glue of the Field",
     "summary": "Glycine in the language of the framework.",
     "html": "<p>The biophotonic field propagates through tissue that holds its shape. Collagen fibres, sheathed in structured water, are the long waveguides of the body: aligned, periodic, piezoelectric. A glycine deficit does not show itself as an acute symptom. It shows itself as matrix that is rebuilt slightly less precisely each turnover cycle — the slow phase drift the framework describes at Node 4 of the coherence feedback loop.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Glycine is the informational adhesive of the extracellular matrix: the residue that lets a protein become a lattice. Supplying it is how the substrate keeps the geometry the field depends on.</p></div><div class=\"plain\" data-accent=\"teal\"><p class=\"plain-title\">Field note</p><p>At high doses, glycine is reported to produce a heavy, grounded calm that counterweights the dopaminergic drive of the morning stack. It is inhibitory in the brainstem and spinal cord, not a GABA agonist, and its calm has a different texture: physical rather than sedative.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How glycine sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>TMG</strong> and glycine share the 13:00 drink: one donates methyl groups, the other absorbs the surplus.</li><li><strong>Gotu kola</strong> and <strong>Injuv</strong> signal the matrix to rebuild; glycine supplies the residue they build with.</li><li><strong>Taurine</strong> and glycine together set the inhibitory floor of the evening reset.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Daytime doses above 5 g can sedate: keep glycine out of the pre-workout window.</li><li>Rare gastrointestinal looseness at large single doses: split rather than stack.</li><li>Clozapine and other NMDA-active medicines: discuss with the prescriber.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#taurine\">Taurine</a> <a class=\"button\" href=\"#tmg\">TMG</a> <a class=\"button\" href=\"#gotukola\">Gotu kola</a> <a class=\"button\" href=\"#sleep\">Sleep architecture</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "taurine",
   "name": "Taurine",
   "aliases": [
    "Taurine"
   ],
   "case": false,
   "stratum": "foundation",
   "group": "foundation",
   "kicker": "Cellular stability / osmolyte",
   "standard": "Conditionally essential amino acid",
   "bullets": [
    "Primary intracellular osmolyte — cell volume and membrane-potential fidelity.",
    "Mitochondrial stabiliser — tRNA modification and cristae integrity.",
    "Bile-acid conjugation partner; glycinergic and GABAergic calm."
   ],
   "field": "The cellular phase stabilizer — holds the membrane charge gradient, the physical substrate of field coherence at the cell boundary.",
   "motto": "The cellular stabilizer",
   "category": "Cellular stability · osmolyte",
   "accent": "teal",
   "layers": [
    0,
    2
   ],
   "dose": "1–3 g",
   "window": "13:00 · Post-workout drink",
   "inProtocol": false,
   "subtitle": "Osmolyte, bile-acid partner, mitochondrial translator and inhibitory modulator of the electrically active tissues",
   "description": "Taurine holds cell volume, membrane potential and mitochondrial translation steady in the tissues that oscillate hardest: brain, heart and retina.",
   "note": "Free taurine sits in the 13:00 drink, thirty minutes before OMAD, where it rehydrates trained muscle and conjugates the bile that will meet the meal. Its evening role is already covered by the Protocol’s Tauromag® (magnesium acetyl taurate, 350–700 mg) in the evening reset.",
   "facts": [
    {
     "value": "1–3 g",
     "label": "Free taurine"
    },
    {
     "value": "13:00",
     "label": "Window"
    },
    {
     "value": "L0 · L2",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Cellular Stabilizer",
     "summary": "The most abundant free amino acid in the excitable tissues.",
     "html": "<p class=\"doc-lede\">Taurine is never built into proteins, and that is its point. It stays free in the cytoplasm of the tissues with the highest electrical traffic — retina, heart, brain, skeletal muscle — and holds their water, their charge and their mitochondrial machinery steady while everything around it oscillates.</p><div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>2-aminoethanesulfonic acid: a sulfonic, not carboxylic, amino acid. Synthesised from cysteine through cysteine dioxygenase and cysteinesulfinate decarboxylase, a pathway whose capacity falls with age and under heavy androgenic and training load. Raw heart, shellfish and dark fish meat are the richest dietary sources. Plasma taurine declines with age across species, and restoring it extends healthspan in animal models.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Holding the Charge Gradient",
     "summary": "Volume, voltage and translation fidelity.",
     "html": "<p>The target is a cell whose volume and membrane potential do not drift under metabolic load. Every shift of water across a membrane changes ion concentration and therefore voltage; taurine, as an organic osmolyte, absorbs those shifts so that the bioelectric map stays legible.</p><div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Osmotic buffer</h3><span class=\"tag\">L0</span></div>\n  <p>Cells export or import taurine to defend their volume without moving the charged ions that set membrane potential.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Mitochondrial translation</h3><span class=\"tag\">L0</span></div>\n  <p>Taurine is built into mitochondrial tRNAs as 5-taurinomethyluridine. Without it, codon reading falters and respiratory-chain proteins are mistranslated.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Bile conjugation</h3><span class=\"tag\">L0</span></div>\n  <p>The liver conjugates bile acids to taurine, forming taurocholic and taurochenodeoxycholic acid: more soluble, better emulsifiers of dietary fat.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Inhibitory tone</h3><span class=\"tag\">L2</span></div>\n  <p>Taurine activates glycine receptors and extrasynaptic GABA-A receptors, lowering neuronal excitability without sedation.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "One daily split, placed before the meal.",
     "html": "<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Post-Workout</span><h3>Osmotic and biliary priming</h3><p class=\"phase-window\">13:00 · immediately after training</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Taurine (free form)</th><td><span class=\"dose\">1000–3000 mg</span></td><td>TauT (SLC6A6), bile-acid CoA:amino acid N-acyltransferase</td><td>Restores intracellular volume in trained muscle; loads the taurine pool for bile conjugation thirty minutes before OMAD.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">Creatine · TMG · Glycine</th><td><span class=\"dose\">Protocol doses</span></td><td>See their monographs</td><td>The drink taurine joins.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Evening taurine arrives through the Protocol’s Tauromag® in the evening reset. Free taurine is not doubled there.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Form</th><td>Free-form taurine powder</td><td>Neutral taste, fully soluble.</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">High-stress variant</th><td>Up to 3 g at 13:00 on heavy training days</td><td>Heart and muscle draw down taurine under load.</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Cadence</th><td>Daily</td><td>A conditionally essential substrate; no receptor tolerance.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "Four Mechanisms, One Effect",
     "summary": "How taurine steadies the oscillators.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.1 Uptake</h3>\n  <p>The taurine transporter TauT concentrates taurine 100- to 400-fold inside cells against the plasma gradient, coupled to sodium and chloride.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.2 Volume regulation</h3>\n  <p>When cells swell, volume-regulated anion channels release taurine; when they shrink, TauT draws it back. Water follows without the membrane potential being sacrificed.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.3 tRNA modification</h3>\n  <p>MTO1 and GTPBP3 install taurine on the wobble uridine of mitochondrial tRNA-Leu(UUR) and tRNA-Lys. Correct decoding keeps complexes I and IV intact and limits electron leak.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.4 Calcium handling</h3>\n  <p>In cardiac and skeletal muscle, taurine modulates sarcoplasmic calcium release and uptake, stabilising contraction rhythm under stress.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Observed outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Central nervous system</th><td>Glycine-receptor and GABA-A agonism</td><td>Lower anxiety; fewer caffeine jitters</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Mitochondria</th><td>tRNA taurine modification; matrix pH buffering</td><td>Steadier energy; less ROS leakage</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Heart and vessels</th><td>Calcium signalling; endothelial support</td><td>Lower resting heart rate under stress</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Fat digestion</th><td>Taurine conjugation of bile acids</td><td>Better absorption of fats and vitamins A, D, E, K</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Calm Water",
     "summary": "Taurine in the language of the framework.",
     "html": "<p>A membrane potential is only information if it is held. Taurine is what holds it while the cell is pushed — the phase stabiliser at the cell boundary. The framework names the cell membrane as Node 1 and Node 2 of the coherence feedback loop: the electrical environment in which the tubulin lattice assembles. Taurine keeps that environment quiet.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>The retina carries the body’s highest taurine concentration. That is not a coincidence for a molecule that protects the tissue where light is turned into rhythm. Taurine belongs beside Saffron, C3G and Astaxanthin in the visual axis of the library.</p></div><div class=\"plain\" data-accent=\"teal\"><p class=\"plain-title\">Field note</p><p>Taurine is reported to smooth the sympathetic edge of high-androgen states — the safety brake under TRIBUGEN’s drive — allowing focus without irritability.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How taurine sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Glycine</strong>: together they set the inhibitory floor.</li><li><strong>TUDCA</strong> is itself a taurine conjugate; free taurine keeps the conjugation pool full.</li><li><strong>C3G</strong> and <strong>Black Ginger</strong> shift water with nutrient partitioning; taurine protects cell volume through the shift.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>On an empty stomach, large doses can loosen the bowel.</li><li>Lithium and antihypertensives: taurine can modestly lower blood pressure; discuss with the prescriber.</li><li>Do not double taurine in the evening: Tauromag® already delivers it.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#glycine\">Glycine</a> <a class=\"button\" href=\"#tudca\">TUDCA</a> <a class=\"button\" href=\"#saffron\">Saffron</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "tmg",
   "name": "TMG",
   "aliases": [
    "TMG",
    "Trimethylglycine",
    "Betaine"
   ],
   "case": true,
   "stratum": "foundation",
   "group": "foundation",
   "kicker": "Methylation sentinel",
   "standard": "Trimethylglycine — betaine anhydrous",
   "bullets": [
    "Direct methyl donor — remethylates homocysteine through BHMT.",
    "Osmotic cytoprotection and hepatic lipid export.",
    "Spares SAM for creatine synthesis and epigenetic maintenance."
   ],
   "field": "The methylation sentinel — keeps the DNA methylation code written precisely under high metabolic flux.",
   "motto": "The methylation sentinel",
   "category": "Methylation sentinel",
   "accent": "amber",
   "layers": [
    0,
    1
   ],
   "dose": "1.5–2.5 g",
   "window": "13:00 · Post-workout drink",
   "inProtocol": true,
   "subtitle": "Betaine anhydrous: the methyl reservoir that recycles homocysteine, spares SAM for the epigenome and primes the gut for the meal",
   "description": "TMG keeps the methylation economy solvent under heavy protein turnover: homocysteine remethylated, SAM preserved for DNA and neurotransmitters, stomach acid and bile primed for OMAD.",
   "note": "TMG is carried by the Protocol in the 13:00 post-workout drink. The dose is the Protocol’s; the archive’s 3 g morning dose is superseded.",
   "facts": [
    {
     "value": "1.5–2.5 g",
     "label": "Dose"
    },
    {
     "value": "13:00",
     "label": "Window"
    },
    {
     "value": "L0 · L1",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Methylation Sentinel",
     "summary": "A glycine carrying three methyl groups.",
     "html": "<p class=\"doc-lede\">Every methylation in the body — of DNA, of histones, of dopamine on its way out, of guanidinoacetate on its way to creatine — spends a methyl group from S-adenosylmethionine. TMG is a reservoir of three of them, delivered through a pathway that does not depend on folate or B12.</p><div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>N,N,N-trimethylglycine, betaine anhydrous. Present in beetroot, spinach and shellfish; synthesised endogenously from choline in the mitochondria of liver and kidney. It is both a methyl donor and an organic osmolyte.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Solvency of the Methyl Economy",
     "summary": "Keeping homocysteine low and SAM available.",
     "html": "<p>The target is a low and stable homocysteine, a full SAM pool and a high SAM:SAH ratio — the condition in which methyltransferases work and the epigenetic code is written precisely. A high-methionine diet floods the cycle; TMG keeps it moving in the right direction.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Homocysteine sink</h3><span class=\"tag\">L0</span></div>\n  <p>Betaine-homocysteine methyltransferase (BHMT) transfers one methyl group from betaine to homocysteine, regenerating methionine.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Epigenetic fidelity</h3><span class=\"tag\">L1</span></div>\n  <p>A preserved SAM pool feeds DNMT1 maintenance methylation. The framework calls epigenetic silencing second-order decoherence; methyl supply is its precondition.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Osmolyte</h3><span class=\"tag\">L0</span></div>\n  <p>Betaine protects proteins and cells against osmotic and thermal stress, notably in liver and kidney.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "In water, after training, before the meal.",
     "html": "<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Post-Workout</span><h3>Methyl priming</h3><p class=\"phase-window\">13:00 · immediately after training</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">TMG (Betaine)</th><td><span class=\"dose\">1500–2500 mg</span></td><td>BHMT, SAMe methylome, gastric HCl and bile</td><td>Remethylates homocysteine; cellular osmolyte; stimulates stomach acid and bile ahead of OMAD.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Taken with Creatine 5 g: exogenous creatine spares the SAM that endogenous creatine synthesis would consume, and TMG refills what remains.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"amber\">Form</th><td>Betaine anhydrous powder</td><td>Not betaine HCl, which is a digestive acidifier, not a methyl donor at this dose.</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Cadence</th><td>Daily</td><td>Matches the daily methionine load of the meal.</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Ceiling</th><td>Stay at or under 2.5 g</td><td>Higher daily intakes raise LDL cholesterol in trials.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The Two Remethylation Routes",
     "summary": "Why TMG matters when folate is not enough.",
     "html": "<p>Homocysteine has two routes back to methionine. The folate route, through methionine synthase, needs 5-methyltetrahydrofolate and B12 in every tissue. The betaine route, through BHMT, is concentrated in liver and kidney and needs only betaine. Under heavy methionine intake, the betaine route carries a large share of the flux.</p><div class=\"formula\">$$\\text{Betaine} + \\text{Homocysteine} \\xrightarrow{\\text{BHMT}} \\text{Dimethylglycine} + \\text{Methionine}$$</div><div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.1 Methyl return</h3>\n  <p>Methionine is re-activated to SAM by MAT. Each SAM donates a methyl and becomes SAH, which is hydrolysed back to homocysteine. TMG closes the loop.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.2 Creatine cost</h3>\n  <p>Guanidinoacetate methyltransferase consumes a large share of all SAM-derived methyl groups to make creatine. Exogenous creatine plus TMG relieves that drain.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.3 Digestive priming</h3>\n  <p>Betaine supports gastric acid and bile output; thirty minutes before OMAD, this readies the gut for a dense fat and protein load.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.4 Hepatic lipotropy</h3>\n  <p>Methyl supply sustains phosphatidylcholine synthesis by PEMT, which the liver needs to export fat as VLDL instead of storing it.</p>\n</div>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Logistics of the Code",
     "summary": "TMG in the language of the framework.",
     "html": "<p>The framework names epigenetic imprinting as the second-order mechanism of decoherence: a cell locked in noise methylates and silences the very genes that let it couple to its neighbours. Methylation is not good or bad; it is precise or imprecise. TMG does not write the code. It keeps the ink supplied so that the code is written where it should be and nowhere else.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>High-androgen protocols and sustained cognitive output are reported to drain methyl groups quickly, producing a lethargic, low-mood “methyl crash”. The 13:00 TMG dose sits under that drain.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How TMG sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Creatine</strong>: methyl sparing from both directions.</li><li><strong>Glycine</strong>: absorbs methyl surplus through GNMT, the counter-weight to TMG.</li><li><strong>Saffron</strong>: neurotransmitter synthesis and clearance depend on methylation.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Above roughly 4 g a day, LDL rises: stay within the Protocol range.</li><li>Known overmethylation, or MTHFR variants with symptoms of overstimulation: reduce and observe.</li><li>Homocystinuria (CBS deficiency) is a medical indication, managed only by a clinician.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#creatine\">Creatine</a> <a class=\"button\" href=\"#glycine\">Glycine</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "creatine",
   "name": "Creatine",
   "aliases": [
    "Creatine",
    "Creatine monohydrate"
   ],
   "case": false,
   "stratum": "foundation",
   "group": "foundation",
   "kicker": "ATP buffer / energy system",
   "standard": "Creatine monohydrate — micronised",
   "bullets": [
    "Phosphocreatine circuit — instantaneous ATP regeneration.",
    "Intracellular pH buffer under peak glycolytic load.",
    "Neuroprotective — sustains neuronal ATP under cognitive load."
   ],
   "field": "The oscillator buffer — the time crystal keeps its phase through high-demand cycles.",
   "motto": "The oscillator buffer",
   "category": "ATP buffer · energy system",
   "accent": "green",
   "layers": [
    0
   ],
   "dose": "5 g",
   "window": "13:00 · Post-workout drink",
   "inProtocol": true,
   "subtitle": "The phosphocreatine shuttle: instantaneous ATP for muscle, neurons and the coherence machinery itself",
   "description": "Creatine keeps the cell’s ATP charge from collapsing under sudden demand — in muscle at the bar, in neurons under cognitive load, and in the nuclear repair machinery.",
   "note": "Creatine is carried by the Protocol in the 13:00 post-workout drink at 5 g. The archive’s 8 g morning dose is superseded; 5 g daily reaches full muscle saturation within about four weeks.",
   "facts": [
    {
     "value": "5 g",
     "label": "Dose"
    },
    {
     "value": "13:00",
     "label": "Window"
    },
    {
     "value": "L0",
     "label": "Layer"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Oscillator Buffer",
     "summary": "An energy reserve measured in milliseconds.",
     "html": "<p class=\"doc-lede\">ATP is spent faster than mitochondria can make it the instant a muscle fires or a neural circuit bursts. Creatine kinase bridges the gap: phosphocreatine hands its phosphate to ADP in a single step, and the cell’s energy charge holds while the slower machinery catches up.</p><div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>Methyl-guanidinoacetic acid. Synthesised in kidney (AGAT) and liver (GAMT) from arginine, glycine and a methyl group from SAM; about 95% of the body’s pool sits in skeletal muscle, the rest in brain, heart and testes. Raw meat and fish supply 1–2 g a day; supplementation of 5 g saturates muscle stores, and the brain pool rises more slowly and less.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Energy Charge Under Load",
     "summary": "Why coherence costs ATP.",
     "html": "<p>The framework’s Layer Zero is the microtubule lattice held in Fröhlich condensation — a coherent vibrational mode maintained only because metabolic energy is pumped in faster than heat can scatter it. Coherence is not free. Every phase-locked process, from the lattice to the ion pumps that hold membrane voltage, draws on the same ATP charge. The target state is a charge that does not dip when demand spikes.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"rose\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Muscle</h3><span class=\"tag\">L0</span></div>\n  <p>Phosphocreatine powers the first 10 seconds of maximal effort and the recovery between sets.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Brain</h3><span class=\"tag\">L0</span></div>\n  <p>Neurons use the CK shuttle to move energy from mitochondria to synapses; brain creatine rises with supplementation, most in under-slept or under-fed states.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Nucleus</h3><span class=\"tag\">L0</span></div>\n  <p>A nuclear PCr pool supports the ATP-hungry steps of chromatin remodelling and DNA ligation during repair.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "After the lift, in water.",
     "html": "<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Post-Workout</span><h3>Phosphagen resaturation</h3><p class=\"phase-window\">13:00 · immediately after training</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">Creatine monohydrate</th><td><span class=\"dose\">5000 mg</span></td><td>Creatine kinase (CK), CreaT (SLC6A8), nuclear PCr pool</td><td>Post-workout phosphagen saturation; rapid muscle uptake following contraction; restores cytosolic and nuclear ATP buffering.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Post-contraction muscle up-regulates CreaT transporter activity. Placing creatine after the lift, not before, also spares the stomach during training.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"green\">Form</th><td>Creatine monohydrate, micronised</td><td>The form with the full weight of evidence; other salts add cost, not effect.</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Loading</th><td>None</td><td>Daily 5 g saturates in about four weeks without the water shift of loading.</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Hydration</th><td>The 500–750 mL vehicle is the minimum</td><td>Creatine draws water into muscle cells.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The Phosphocreatine Circuit",
     "summary": "Spatial and temporal energy buffering.",
     "html": "<div class=\"formula\">$$\\text{PCr} + \\text{ADP} + \\text{H}^+ \\underset{}{\\overset{\\text{CK}}{\\rightleftharpoons}} \\text{Cr} + \\text{ATP}$$</div><div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.1 Temporal buffer</h3>\n  <p>At rest, mitochondrial CK charges creatine into phosphocreatine. Under load, cytosolic CK reverses the reaction in microseconds, holding ATP:ADP high while glycolysis and oxidative phosphorylation accelerate.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.2 Spatial shuttle</h3>\n  <p>Phosphocreatine diffuses faster than ATP. It carries high-energy phosphate from the mitochondrial membrane to myofibrils and synapses, where it is converted back at the point of use.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.3 Proton buffer</h3>\n  <p>The forward reaction consumes a proton: creatine buffers the acidity of intense glycolysis.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.4 Osmotic signal</h3>\n  <p>Intracellular creatine draws water into the cell; cell swelling is itself an anabolic signal for protein synthesis.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Observed outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Brain energetics</th><td>Brain creatine rises with supplementation</td><td>Less mental fatigue; resilience to sleep loss</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Muscle</th><td>PCr resaturation; cell volumisation</td><td>More repetitions; faster recovery between sets</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\">Neuroprotection</th><td>Mitochondrial membrane potential maintained</td><td>Resistance to excitotoxic stress</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Uninterrupted Supply",
     "summary": "Creatine in the language of the framework.",
     "html": "<p>A time crystal held by metabolic drive decoheres the moment the drive falters. Creatine is the buffer that keeps the drive from faltering when demand spikes: during the lift, during a sprint of thought, during the nuclear repair sweeps of the night. It is the condition under which the biological time crystal keeps its phase through high-demand cycles.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Creatine is reported to blunt the cognitive cost of a short night. The neural battery holds when recovery has not — a reserve, not a licence to under-sleep.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How creatine sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>TMG</strong>: methyl sparing — exogenous creatine relieves the SAM drain of endogenous synthesis.</li><li><strong>Glycine</strong> shares the drink and the recovery window.</li><li><strong>ErinaMAX</strong> and the morning stack spend the energy creatine buffers.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Serum creatinine rises with creatine: a lab artefact, but tell whoever reads your kidney panel.</li><li>Existing kidney disease: only with a nephrologist.</li><li>Water: never reduce the vehicle volume.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#tmg\">TMG</a> <a class=\"button\" href=\"#glycine\">Glycine</a> <a class=\"button\" href=\"#oakg\">OAKG</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "oakg",
   "name": "OAKG",
   "aliases": [
    "OAKG",
    "Ornithine alpha-ketoglutarate",
    "Ornithine α-ketoglutarate"
   ],
   "case": true,
   "stratum": "foundation",
   "group": "foundation",
   "kicker": "Ammonia clearance / TCA",
   "standard": "Ornithine α-ketoglutarate — 2:1",
   "bullets": [
    "Dual ammonia trap — urea cycle and glutamate synthesis.",
    "TCA anaplerosis — α-ketoglutarate refills the Krebs cycle.",
    "Arginine, citrulline and proline precursor; anti-catabolic."
   ],
   "field": "The signal clarifier — removes one of the strongest sources of temporal decoherence in the high-throughput carnivore state.",
   "motto": "The signal clarifier",
   "category": "Ammonia clearance · TCA",
   "accent": "blue",
   "layers": [
    0,
    2
   ],
   "dose": "1–3 g",
   "window": "13:00 · Post-workout drink",
   "inProtocol": false,
   "subtitle": "Ornithine α-ketoglutarate: a two-sided ammonia trap that also refills the Krebs cycle and spares lean tissue",
   "description": "OAKG clears the neurotoxic ammonia of a high-protein meal through two routes at once and feeds the TCA cycle, arginine and proline pools on the way.",
   "note": "Placed in the 13:00 drink, thirty minutes ahead of OMAD, so that the urea cycle is primed before the protein load arrives — the archive’s “30 minutes pre-meal” instruction, on the current clock.",
   "facts": [
    {
     "value": "1–3 g",
     "label": "Dose"
    },
    {
     "value": "13:00",
     "label": "Window"
    },
    {
     "value": "L0 · L2",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Signal Clarifier",
     "summary": "Removing ammonia before it reaches the brain.",
     "html": "<p class=\"doc-lede\">Every gram of protein that is burned rather than built releases nitrogen. Free ammonia crosses the blood–brain barrier, is fixed by astrocytes into glutamine, swells them and disturbs neurotransmission. The fog that follows a heavy protein load is partly chemical. OAKG intercepts it at two points.</p><div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>A salt of two molecules of L-ornithine with one of α-ketoglutarate. Ornithine is the carrier of the urea cycle; α-ketoglutarate is a Krebs-cycle intermediate and the acceptor of free ammonia in glutamate synthesis. Used clinically in burns, trauma and post-surgical catabolism to protect lean mass.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Nitrogen Without Noise",
     "summary": "A raw high-protein diet, metabolised cleanly.",
     "html": "<p>The target is low blood and brain ammonia after the one meal, a full TCA cycle, and lean tissue preserved through the fasted hours. In the framework’s terms, ammonia is noise injected at Layer 2: it depolarises astrocytes, the cells that regulate the potassium and glutamate environment of every synapse.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Urea cycle</h3><span class=\"tag\">L0</span></div>\n  <p>Ornithine accepts carbamoyl phosphate to form citrulline, the first committed step of turning ammonia into excretable urea.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Ammonia fixation</h3><span class=\"tag\">L0</span></div>\n  <p>α-ketoglutarate takes up free ammonia through glutamate dehydrogenase, forming glutamate and then glutamine.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Network clarity</h3><span class=\"tag\">L2</span></div>\n  <p>Lower astrocytic glutamine load keeps their volume and potassium buffering intact.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Before the protein, not with it.",
     "html": "<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Post-Workout</span><h3>Urea-cycle priming</h3><p class=\"phase-window\">13:00 · thirty minutes before OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">OAKG</th><td><span class=\"dose\">1000–3000 mg</span></td><td>Ornithine transcarbamylase, glutamate dehydrogenase, TCA</td><td>Primes the urea cycle for the incoming protein load; replenishes α-ketoglutarate.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">Creatine · TMG · Glycine</th><td><span class=\"dose\">Protocol doses</span></td><td>See their monographs</td><td>The drink OAKG joins.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">1 g is the baseline; up to 3 g on days of the heaviest protein intake or the hardest training.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"blue\">Form</th><td>OAKG powder (2:1)</td><td>Dissolves in the drink; slightly sour.</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\">Cadence</th><td>Daily with the meal day</td><td>Matches the daily nitrogen load.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The Dual Trap",
     "summary": "Both halves of the salt work.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">3.1 Ornithine → citrulline</h3>\n  <p>In liver mitochondria, ornithine transcarbamylase combines ornithine with carbamoyl phosphate, itself built from ammonia. More ornithine, more capacity.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">3.2 α-KG → glutamate → glutamine</h3>\n  <p>Glutamate dehydrogenase and glutamine synthetase fix free ammonia onto the α-ketoglutarate skeleton in muscle and brain.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.3 Anaplerosis</h3>\n  <p>α-ketoglutarate refills a Krebs cycle drained of intermediates by amino-acid oxidation, sustaining NADH supply to the respiratory chain.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.4 Arginine, proline, NO</h3>\n  <p>Ornithine converts toward citrulline and arginine, the substrate of nitric oxide synthase, and toward proline, a collagen residue.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Observed outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"amber\">Hormonal floor</th><td>High-dose OAKG stimulates GH and insulin release</td><td>Fullness; faster tissue repair</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Muscle sparing</th><td>Glutamine supply from α-KG reduces muscle protein breakdown</td><td>Lean mass held through fasting</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Vascular flow</th><td>Arginine and proline precursors</td><td>Nitric oxide drive; connective tissue strength</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Clearing the Static",
     "summary": "OAKG in the language of the framework.",
     "html": "<p>The framework treats a high-throughput carnivore metabolism as a powerful engine with a specific exhaust. Ammonia is that exhaust, and it is neurotoxic noise at the exact layer — the astrocyte–synapse network — where phase-locking between cells is negotiated. OAKG does not add signal. It lowers the noise floor so that the signals already present are heard.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Biohackers report that clearing ammonia lets the morning stack — TRIBUGEN, Cognance — express itself with clean edges instead of a heavy-headed afternoon.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How OAKG sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Glycine</strong> and OAKG’s proline supply reinforce collagen from two residues.</li><li><strong>Agmatine</strong>, decarboxylated arginine, shares OAKG’s nitric-oxide axis.</li><li><strong>Creatine</strong> shares the arginine pool; OAKG keeps it supplied.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>A history of herpes outbreaks: the ornithine–arginine axis can favour viral replication; keep to 1 g or omit.</li><li>Advanced liver or kidney disease: only with a clinician.</li><li>Large doses on an empty stomach can cause cramping.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#agmatine\">Agmatine</a> <a class=\"button\" href=\"#creatine\">Creatine</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "sleep",
   "name": "Sleep Architecture",
   "aliases": [
    "Sleep architecture",
    "master update cycle"
   ],
   "case": false,
   "stratum": "foundation",
   "group": "foundation",
   "kicker": "Sleep architecture / recovery",
   "standard": "The master update cycle — nightly",
   "bullets": [
    "Glymphatic clearance of tau, β-amyloid and metabolic waste.",
    "Memory consolidation through ripple–spindle–slow-oscillation coupling.",
    "The largest growth-hormone pulse of the twenty-four hours."
   ],
   "field": "The re-crystallization window — the time crystal releases accumulated noise and re-anchors all five layers to a coherent baseline.",
   "motto": "The master update cycle",
   "category": "Sleep architecture · recovery",
   "accent": "violet",
   "layers": [
    1,
    4
   ],
   "dose": "Sequence",
   "window": "14:00 → 20:00",
   "inProtocol": true,
   "subtitle": "The nightly sequence that sets the cortisol floor, drops core temperature, cools inflammation and opens REM — on the Matrix clock",
   "description": "Sleep as the re-crystallization window: an executable nightly sequence from 14:00 to the first sleep at 20:00, built from the library and the Protocol’s evening reset.",
   "note": "The archive’s nocturnal execution protocol counted backwards from bedtime. On the current day, bedtime is the first sleep at 20:00 on the Matrix clock, so every step is re-anchored to it. The compounds of the Protocol’s evening reset are kept exactly as written.",
   "facts": [
    {
     "value": "T−6 h",
     "label": "Cortisol floor"
    },
    {
     "value": "T−2 h",
     "label": "Thermal drop"
    },
    {
     "value": "T−45 min",
     "label": "Circuit breakers"
    },
    {
     "value": "20:00",
     "label": "First sleep"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Master Update Cycle",
     "summary": "Sleep is not rest. It is where the day is written down.",
     "html": "<p class=\"doc-lede\">Days build oscillatory load; nights erase entropy. Every intervention in this library depends on sleep for its translation into lasting coherence, because sleep is when the brain clears its waste, consolidates memory, releases its largest pulse of growth hormone, and resets its phase relationships to baseline.</p><div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">The architecture</h3>\n  <p>The Protocol runs biphasic sleep: a first block from 20:00 to 24:00 rich in slow-wave sleep and the growth-hormone surge; the watch from 00:00 to 02:00, an awake, dim, blue-free interval of high prolactin and low cortisol; and a second block from 02:00 to 05:00 rich in REM and theta. This monograph builds the descent into the first block.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "What the Night Must Achieve",
     "summary": "Four conditions for the update to run.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Glymphatic clearance</h3><span class=\"tag\">L1</span></div>\n  <p>During slow-wave sleep the interstitial space widens and cerebrospinal fluid washes tau, β-amyloid and metabolic waste from the brain.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Memory consolidation</h3><span class=\"tag\">L2</span></div>\n  <p>Hippocampal sharp-wave ripples phase-lock to cortical slow oscillations and thalamic spindles: the three-layer coupling the framework names as the temporal architecture of neural re-coherence.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Anabolic pulse</h3><span class=\"tag\">L1</span></div>\n  <p>The largest growth-hormone secretion of the 24 hours arrives in the first slow-wave cycle.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Phase reset</h3><span class=\"tag\">L4</span></div>\n  <p>Without light, food or movement, peripheral clocks re-align to the central clock. The field discharges accumulated noise.</p>\n</div>\n</div><p>Each of these needs the same preconditions: a low cortisol floor, a falling core temperature, a quiet inflammatory signal and a balanced excitatory circuit. The sequence below builds them in that order.</p>"
    },
    {
     "id": "master-protocol",
     "label": "The Night",
     "title": "The Nocturnal Execution Sequence",
     "summary": "From the cortisol floor at 14:00 to the first sleep at 20:00.",
     "html": "<article class=\"phase\" data-accent=\"amber\" id=\"w1\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">T − 6 h</span><h3>The cortisol floor</h3><p class=\"phase-window\">14:00 · inside the OMAD window</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Taken with the meal</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Ashwagandha (KSM-66)</th><td><span class=\"dose\">300–600 mg</span></td><td>HPA axis, cortisol output</td><td>Blunts the evening cortisol rise six hours ahead. Taken at night, it can carry a mild cholinergic lift that disturbs sleep onset.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">By nightfall the stress hormones have cleared; the neuro-chemical floor is flat and quiet.</p>\n</article><article class=\"phase\" data-accent=\"rose\" id=\"w2\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">T − 2 h</span><h3>Thermal drop and systemic cooling</h3><p class=\"phase-window\">18:00 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Water</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Andrographis</th><td><span class=\"dose\">400 mg</span></td><td>NF-κB p50, IL-6, TNF-α</td><td>Systemic coolant: quenches the inflammatory signalling that keeps the core hot after a dense raw meal.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Deep sleep needs core temperature to fall by one to two degrees. The thermic effect of a raw fat and protein meal works against that; Andrographis works against the heat.</p>\n</article><article class=\"phase\" data-accent=\"violet\" id=\"w3\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">T − 45 min</span><h3>Circuit breakers and the REM primer</h3><p class=\"phase-window\">19:15 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Water</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">Glycine</th><td><span class=\"dose\">3000–5000 mg</span></td><td>NMDA glycine site, preoptic area</td><td>Peripheral vasodilation flushes core heat outward: the mechanical trigger of slow-wave sleep.</td></tr>\n<tr><th scope=\"row\">Agmatine sulfate</th><td><span class=\"dose\">250 mg</span></td><td>NMDA receptor, imidazoline sites</td><td>Clamps excitatory glutamate; stops the spinning mind.</td></tr>\n<tr><th scope=\"row\">Nigella sativa (10% TQ)</th><td><span class=\"dose\">200 mg</span></td><td>Acetylcholinesterase, GABA tone</td><td>Primes the cholinergic drive of the second-block REM while GABA tone keeps the body still.</td></tr>\n</tbody></table></div>\n</article><article class=\"phase\" data-accent=\"blue\" id=\"w4\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 3</span><h3>The Protocol’s evening reset</h3><p class=\"phase-window\">17:00–20:00 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Strictly non-caloric</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">ND Ecklonia cava extract</th><td><span class=\"dose\">100–200 mg</span></td><td>GABA-A benzodiazepine site</td><td>Expands non-REM delta power without tolerance.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">ND Tauromag® (ATA-Mg)</th><td><span class=\"dose\">350–700 mg</span></td><td>NMDA channels, GABA-A / GlyR</td><td>Magnesium and taurine into neurons; calms firing.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">ND Lemon balm extract</th><td><span class=\"dose\">300–500 mg</span></td><td>GABA-transaminase</td><td>Sustains nocturnal GABA tone.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">Micro-dose melatonin</th><td><span class=\"dose\">0.3 mg</span></td><td>MT1 / MT2</td><td>Restores the pineal signal.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">Gotu kola (night split)</th><td><span class=\"dose\">200–300 mg</span></td><td>GABA-T, collagen remodelling</td><td>Rides the nocturnal GH pulse.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">The sequence above is layered into the evening reset; nothing in it carries calories.</p>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "Four Gates, in Order",
     "summary": "Why the order matters.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Gate 1 · Cortisol</h3>\n  <p>Cortisol is the wake signal of the morning and the brake of the evening. Its clearance takes hours, which is why the anchor is at T−6 h, not at bedtime.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Gate 2 · Heat</h3>\n  <p>Raw protein carries a high thermic effect. Inflammatory cytokines raise the hypothalamic set point. Cooling the signal at T−2 h lets the set point fall.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">Gate 3 · Vasodilation</h3>\n  <p>Glycine opens the distal skin vessels; heat leaves through hands and feet. Sleep onset follows the slope of the core-temperature fall.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Gate 4 · Circuits</h3>\n  <p>With body cooled and cortisol low, excitatory loops are clamped (agmatine, magnesium) and inhibitory tone is lifted (Ecklonia, lemon balm, taurine). The cholinergic primer is held for the REM of the second block.</p>\n</div>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Re-Crystallization Window",
     "summary": "Sleep in the language of the framework.",
     "html": "<p>During slow-wave and REM sleep the biological time crystal undergoes its nightly phase transition: accumulated informational noise is released, and the five nested layers are re-anchored to a coherent baseline. The framework calls sleep depth and architecture a direct readout of the organism’s coherence state. It is also the window in which every other input of this library becomes structure — or is lost.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Sleep architecture is the coherence metric of the neural temporal system: the ratio of slow-wave to REM, the precision of ultradian cycling. These are readings from the same hierarchy as heart-rate variability and circadian amplitude.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Light, Food and the Watch",
     "summary": "What the compounds cannot do alone.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">Non-negotiables</h3>\n  <ul class=\"list\"><li>No food after 15:00: digestion keeps the core hot.</li><li>Amber or red light only after sunset; no screens.</li><li>A cool, dark room: the thermal descent needs somewhere to go.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Cautions</h3>\n  <ul class=\"list\"><li>Agmatine and Nigella: see their monographs for medication interactions.</li><li>Withhold the sequence’s NMDA agents on ketamine days.</li><li>Sedative medicines: discuss the evening stack with the prescriber.</li></ul>\n</div>\n</div><aside class=\"callout\" data-accent=\"amber\"><p>The watch, 00:00–02:00, is part of the architecture, not a failure of it. Stay in dim amber light, stay still, and let the second sleep come.</p></aside><p class=\"cmp-links\"><a class=\"button\" href=\"#glycine\">Glycine</a> <a class=\"button\" href=\"#ashwagandha\">Ashwagandha</a> <a class=\"button\" href=\"#andrographis\">Andrographis</a> <a class=\"button\" href=\"#agmatine\">Agmatine</a> <a class=\"button\" href=\"#nigella\">Nigella sativa</a> <a class=\"button\" href=\"#ecklonia\">Ecklonia cava</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "erinamax",
   "name": "ErinaMAX™",
   "aliases": [
    "ErinaMAX",
    "Erinamax"
   ],
   "case": false,
   "stratum": "extract",
   "group": "neural",
   "kicker": "Neuroplasticity / NGF",
   "standard": "Liquid-culture mycelium — 0.5% erinacine A",
   "bullets": [
    "Direct erinacine A delivery across the blood–brain barrier.",
    "Stimulates endogenous nerve growth factor synthesis.",
    "Neurosteroid modulation — the pregnenolone / progesterone axis."
   ],
   "field": "Intensifies REM-cycle vividity; triggers real-time mental sharpening and biophotonic signal amplification.",
   "motto": "The growth signal",
   "category": "Neuroplasticity · NGF",
   "accent": "teal",
   "layers": [
    0,
    2
   ],
   "dose": "500 mg",
   "window": "11:00 · Pre-workout drink",
   "inProtocol": false,
   "subtitle": "Liquid-culture Lion’s Mane mycelium standardized to 0.5% erinacine A: nerve growth factor, neurosteroids and the kappa-opioid interface",
   "description": "ErinaMAX delivers the erinacines — the mycelial diterpenoids that reach the brain and induce nerve growth factor — without the grain starch that buries them in ordinary mycelium powders.",
   "note": "A library compound, not part of the Protocol’s daily baseline. It rides in the 11:00 pre-workout drink (water only, fasted): the liquid-culture process makes its erinacines accessible without food, and the drink already carries the neuro-vascular triad that perfuses the brain.",
   "facts": [
    {
     "value": "500 mg",
     "label": "Dose"
    },
    {
     "value": "11:00",
     "label": "Window"
    },
    {
     "value": "L0 · L2",
     "label": "Layers"
    },
    {
     "value": "8–12 wk",
     "label": "Rebuild block"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Growth Signal",
     "summary": "Mycelium, not fruiting body.",
     "html": "<p class=\"doc-lede\">The fruiting body of Lion’s Mane carries hericenones; the mycelium carries erinacines. Only the erinacines have been shown to cross the blood–brain barrier and induce nerve growth factor in the brain itself. ErinaMAX is the mycelium, grown in broth instead of on grain, so that what reaches the capsule is fungus and not starch.</p><div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Hericium erinaceus</em> mycelium, liquid-fermented, filtered and freeze-dried; standardized to 0.5% erinacine A. Conventional mycelium is grown on rice or oats and harvested with the substrate attached, so that 60–90% of the powder can be inert starch. Liquid culture removes that ballast: in the framework’s language, it lowers the noise floor of the substrate.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Repatterning the Neural Lattice",
     "summary": "Repair first, stimulation second.",
     "html": "<p>The target is a nervous system that rebuilds: neurite outgrowth, myelin repair and synaptic remodelling under a strong NGF signal. Neurons maintain the longest, most energy-expensive microtubule networks in the body, and NGF signalling through TrkA is what drives their extension. ErinaMAX belongs to the rebuild, re-pattern and recovery tier — burnout, slowed learning, nervous-system wear — not to emergency output.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Erinacine A</h3><span class=\"tag\">L0</span></div>\n  <p>Induces NGF synthesis in astrocytes; NGF binds TrkA and drives neurite outgrowth.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Erinacine S</h3><span class=\"tag\">L0</span></div>\n  <p>Associated with neurosteroid accumulation (pregnenolone, progesterone axis) and axon regeneration in animal work.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Erinacine E</h3><span class=\"tag\">L2</span></div>\n  <p>A selective kappa-opioid receptor agonist: a lever on stress, irritation and neuropathic signalling.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Fasted, in water, before training.",
     "html": "<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Pre-Workout</span><h3>Neurotrophic loading</h3><p class=\"phase-window\">11:00 · fasted, before training</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">ErinaMAX™</th><td><span class=\"dose\">500 mg</span></td><td>NGF / TrkA, neurosteroid synthesis, KOR</td><td>Induces nerve growth factor; supports neurite outgrowth and repair.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">The Protocol’s pre-workout drink</th><td><span class=\"dose\">Protocol doses</span></td><td>See the Protocol: L-Citrulline, ALCAR, Na-R-ALA, Tadalafil</td><td>Citrulline and tadalafil perfuse the brain the erinacines are travelling to.</td></tr>\n</tbody></table></div>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Standardization</th><td>0.5% erinacine A, liquid culture</td><td>Grain-free mycelial biomass.</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Cadence</th><td>Daily for 8–12 weeks, then 2–4 weeks off</td><td>Matches a rebuild phase; the off weeks let the system show what has been kept.</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">With food</th><td>Not needed</td><td>The erinacines are accessible without a fat vehicle.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "From Erinacine to Neurite",
     "summary": "The signalling chain.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.1 Barrier crossing</h3>\n  <p>Erinacine A, a cyathane diterpenoid, is small and lipophilic enough to reach the brain parenchyma after oral intake in animal studies.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.2 NGF induction</h3>\n  <p>In astrocytes, erinacines up-regulate NGF gene expression. NGF is secreted and binds TrkA on cholinergic and sensory neurons.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.3 TrkA cascade</h3>\n  <p>TrkA autophosphorylates and signals through PI3K–Akt (survival) and Ras–MAPK/ERK (growth), driving tubulin polymerisation at the growth cone.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.4 Repair lanes</h3>\n  <p>Neurosteroid synthesis (erinacine S) supports myelin and axon regeneration; KOR agonism (erinacine E) shapes the stress and pain landscape.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Compound</th><th>Target</th><th>Primary effect</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Erinacine A</th><td>TrkA via NGF</td><td>Nerve growth factor; neurite outgrowth</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\">Erinacine S</th><td>Neurosteroid synthesis</td><td>Pregnenolone / progesterone axis; regeneration</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Erinacine E</th><td>Kappa-opioid receptor</td><td>Neuropathic and stress signalling</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Reducing Cognitive Entropy",
     "summary": "ErinaMAX in the language of the framework.",
     "html": "<p>A system that is under-slept, over-driven or chemically noisy does not only become tired. It becomes temporally disordered. Neuroplasticity, in the framework, is the continuous repolymerisation of the neural microtubule lattice, and NGF is the signal that tells that lattice where to extend. ErinaMAX is a repair-facing input at Layer 0, whose effect shows up at Layer 2 as cleaner learning and steadier networks.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Many users report a perceptible sharpening within the first hour. It is not instant neurogenesis; it suggests a fast signalling component riding alongside the slow repair.</p></div><div class=\"plain\" data-accent=\"teal\"><p class=\"plain-title\">Field note</p><p>Vivid, structured, memorable dreams recur in the reports — the nightly maintenance cycle intensified. Pair ErinaMAX with the sleep architecture rather than treating it as a floating nootropic.</p></div><div class=\"plain\" data-accent=\"amber\"><p class=\"plain-title\">Field note</p><p>The lock-and-key stack: ErinaMAX initiates the NGF signal; an 8:1 fruiting-body extract, rich in hericenones, prepares the receiving surface.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How ErinaMAX sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Cognance</strong> directs plasticity; ErinaMAX supplies the growth.</li><li><strong>Gotu kola</strong> builds the matrix new neurites extend through.</li><li><strong>Injuv</strong> hydrates the perineuronal environment the new connections settle in.</li><li>The Protocol’s NSI-189 at 07:00 drives hippocampal neurogenesis by another route: two growth signals, hours apart.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>NGF-sensitive conditions, including any history of NGF-responsive tumours: do not use.</li><li>Mushroom allergy: avoid.</li><li>Pregnancy and breastfeeding: not studied.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#cognance\">Cognance</a> <a class=\"button\" href=\"#gotukola\">Gotu kola</a> <a class=\"button\" href=\"#injuv\">Injuv</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "cognance",
   "name": "Cognance™",
   "aliases": [
    "Cognance"
   ],
   "case": false,
   "stratum": "extract",
   "group": "neural",
   "kicker": "Creative catalyst / 5-HT2A",
   "standard": "Bacopa monnieri — ebelin lactone",
   "bullets": [
    "5-HT2A modulation, described by its maker as positive allosteric.",
    "Muscarinic M1 support for memory encoding.",
    "Lowers the threshold of creative flow and lateral association."
   ],
   "field": "Perceptual brightening and creative social fluidity — a clean divergent-thinking enhancer.",
   "motto": "The creative catalyst",
   "category": "Creative catalyst · 5-HT2A",
   "accent": "violet",
   "layers": [
    2,
    3
   ],
   "dose": "100 mg",
   "window": "11:00 · Pre-workout drink",
   "inProtocol": false,
   "subtitle": "Bacopa monnieri standardized for ebelin lactone: 5-HT2A and M1 modulation for flexible, lateral, mood-bright cognition",
   "description": "Cognance turns Bacopa from a slow, sedating memory herb into a bright, flexible-thinking extract by concentrating its ebelin lactone fraction.",
   "note": "A library compound for creative and learning blocks. It rides in the 11:00 drink, so that its morning brightening meets the work of the day. It is a serotonergic modulator: read the interactions before use.",
   "facts": [
    {
     "value": "100 mg",
     "label": "Dose"
    },
    {
     "value": "11:00",
     "label": "Window"
    },
    {
     "value": "L2 · L3",
     "label": "Layers"
    },
    {
     "value": "5 on / 2 off",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Creative Catalyst",
     "summary": "Bacopa, re-read.",
     "html": "<p class=\"doc-lede\">Classic Bacopa extracts are standardized to bacosides and act slowly, often with a heavy, sedating edge. Cognance concentrates a different fraction: ebelin lactone, the aglycone the bacosides become in the body, which binds the receptors of flexible thought — 5-HT2A and muscarinic M1.</p><div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Bacopa monnieri</em> extract (Nootropics Depot Cognance™), standardized for its ebelin lactone yield. Ebelin lactone forms when bacoside glycosides are hydrolysed; in binding studies it shows affinity for 5-HT2A and M1 receptors that the parent bacosides lack.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Plasticity With Direction",
     "summary": "Lowering the threshold of flow.",
     "html": "<p>The target is cognitive flexibility: the ability of distributed networks to re-associate, to leave a habitual groove and find a new connection. 5-HT2A is the receptor most tied to that state and to rapid structural plasticity in cortical neurons. Cognance raises its sensitivity rather than forcing it, and supports the cholinergic encoding that keeps what is found.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">5-HT2A</h3><span class=\"tag\">L2</span></div>\n  <p>Modulation lowers the threshold for divergent thinking and creative flow.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Muscarinic M1</h3><span class=\"tag\">L2</span></div>\n  <p>Cholinergic support for attention and memory encoding.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Mood</h3><span class=\"tag\">L3</span></div>\n  <p>A bright, social, emotionally fluid baseline without stimulant edge.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Morning, fasted.",
     "html": "<article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Pre-Workout</span><h3>Creative loading</h3><p class=\"phase-window\">11:00 · fasted</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Cognance™</th><td><span class=\"dose\">100 mg</span></td><td>5-HT2A, muscarinic M1</td><td>Initiates the day’s flexible, bright cognitive state.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">The Protocol’s pre-workout drink</th><td><span class=\"dose\">Protocol doses</span></td><td>See the Protocol: L-Citrulline, ALCAR, Na-R-ALA, Tadalafil</td><td>The drink Cognance joins.</td></tr>\n</tbody></table></div>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"violet\">Cadence</th><td>5 days on / 2 days off</td><td>Serotonergic modulators keep their edge when the receptor field is allowed to rest.</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\">Use case</th><td>Creative, learning and writing blocks</td><td>Not a daily baseline.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "From Glycoside to Receptor",
     "summary": "The chain of conversion.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.1 Hydrolysis</h3>\n  <p>Bacoside glycosides are cleaved in the gut and liver to jujubogenin and pseudojujubogenin aglycones, then to ebelin lactone.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.2 Receptor binding</h3>\n  <p>Ebelin lactone binds 5-HT2A and M1 sites. Nootropics Depot describes its action at 5-HT2A as positive allosteric modulation: it amplifies serotonin’s own signal rather than replacing it.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.3 Network effect</h3>\n  <p>5-HT2A activation on layer-5 pyramidal neurons increases cortical desynchronisation and the range of associations available.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.4 Encoding</h3>\n  <p>M1 support preserves acetylcholine-dependent attention and memory formation, so that flexibility does not become drift.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Subjective outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"violet\">5-HT2A receptor</th><td>Positive allosteric modulation (as described)</td><td>Creative thinking; lateral problem solving</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Muscarinic M1</th><td>Acetylcholine support</td><td>Memory consolidation; attention span</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Mood / serotonin</th><td>Receptor sensitivity</td><td>Emotional resilience; social fluidity</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Architect of New Pathways",
     "summary": "Cognance in the language of the framework.",
     "html": "<p>Growth without direction is not coherence. ErinaMAX supplies the signal for new neurites; Cognance biases where they settle — toward flexible, associative pathways rather than the old grooves of a default configuration. In the framework’s philosophy of operating with intention, this is the chemistry of revising the operating system rather than running it.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Users describe a subtle perceptual brightening — colours more saturated, empathy more available — that matches the visual depth reported with Saffron. A dual stack for retinal and neural brightening.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How Cognance sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>ErinaMAX</strong>: growth signal plus direction.</li><li><strong>PanaMAX</strong> keeps the HPA axis steady under the brightening.</li><li><strong>Nigella sativa</strong> adds acetylcholinesterase inhibition for encoding.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>SSRIs, SNRIs, MAOIs, triptans, lithium: do not combine.</li><li>Ayahuasca and other entheogenic days in the Protocol’s pulsed strata: withhold for at least 48 hours either side.</li><li>Bacopa can slow the heart and loosen the bowel; thyroid medication users should monitor.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#erinamax\">ErinaMAX</a> <a class=\"button\" href=\"#panamax\">PanaMAX</a> <a class=\"button\" href=\"#saffron\">Saffron</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "ecklonia",
   "name": "Ecklonia cava",
   "aliases": [
    "Ecklonia cava",
    "Ecklonia",
    "Dieckol"
   ],
   "case": false,
   "stratum": "extract",
   "group": "network",
   "kicker": "Vascular fluidity / GABA-A",
   "standard": "Marine phlorotannins — dieckol",
   "bullets": [
    "GABA-A benzodiazepine-site modulation — deeper non-REM delta sleep.",
    "eNOS up-regulation for sustained cerebrovascular dilation.",
    "Lipid-soluble phlorotannins with long plasma persistence."
   ],
   "field": "Vascular lubricant that clears metabolic sludge from neural networks and amplifies signal transmission velocity.",
   "motto": "The marine sleep deepener",
   "category": "Vascular fluidity · GABA-A",
   "accent": "blue",
   "layers": [
    2,
    1
   ],
   "dose": "100–200 mg",
   "window": "17:00–20:00 · Evening reset",
   "inProtocol": true,
   "subtitle": "Brown-algae phlorotannins standardized for dieckol: GABA-A sleep depth, endothelial nitric oxide and long-lived antioxidant cover",
   "description": "Ecklonia cava’s lipophilic phlorotannins deepen slow-wave sleep at the GABA-A benzodiazepine site, open the vessels through eNOS and stay in circulation far longer than land polyphenols.",
   "note": "Ecklonia cava is carried by the Protocol in the evening reset, for sleep depth. The archive placed it in the morning for circulation; its long persistence carries the vascular effect into the night either way, and the evening placement is the current one.",
   "facts": [
    {
     "value": "100–200 mg",
     "label": "Dose"
    },
    {
     "value": "Evening",
     "label": "Window"
    },
    {
     "value": "L1 · L2",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Marine Sleep Deepener",
     "summary": "Polyphenols made by the sea.",
     "html": "<p class=\"doc-lede\">Phlorotannins exist only in brown algae: oligomers of phloroglucinol, built to protect kelp in cold, high-light water. Dieckol, the principal one in <em>Ecklonia cava</em>, binds the brain’s benzodiazepine site, opens the vessels and keeps its antioxidant cover long after land polyphenols have cleared.</p><div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Ecklonia cava</em>, a perennial brown alga of the coasts of Korea and Japan; extract standardized for dieckol (Nootropics Depot). Marine phlorotannins are markedly more lipophilic than terrestrial polyphenols and persist in plasma for hours rather than minutes.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Delta Power Without Tolerance",
     "summary": "Deeper non-REM, clearer vessels.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Sleep depth</h3><span class=\"tag\">L1</span></div>\n  <p>Positive allosteric modulation of GABA-A at the benzodiazepine site increases non-REM delta power and shortens sleep latency — in animal and human studies, without the tolerance of benzodiazepines.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Vascular tone</h3><span class=\"tag\">L2</span></div>\n  <p>Up-regulation of endothelial nitric oxide synthase and protection of endothelium from oxidative and glycative damage.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Cholinergic support</h3><span class=\"tag\">L2</span></div>\n  <p>Acetylcholinesterase inhibition in vitro; preservation of acetylcholine for the REM of the second sleep.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Glycaemic smoothing</h3><span class=\"tag\">L0</span></div>\n  <p>α-glucosidase inhibition flattens glucose excursions — of minor relevance in a ketogenic day.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "In the evening reset, as the Protocol writes it.",
     "html": "<article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 3</span><h3>Bedtime somatic reset</h3><p class=\"phase-window\">17:00–20:00 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Strictly non-caloric</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">ND Ecklonia cava extract</th><td><span class=\"dose\">100–200 mg</span></td><td>GABA-A benzodiazepine site, dieckol</td><td>Positive allosteric GABA-A modulation; expands non-REM delta power without tolerance.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Taken with the rest of the evening reset; see the Sleep architecture monograph for the full sequence.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"blue\">Standardization</th><td>Dieckol-standardized phlorotannins</td><td>Dieckol carries the GABA-A and vascular activity.</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\">Cadence</th><td>Daily</td><td>No tolerance reported at the GABA-A site.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "Two Systems, One Molecule",
     "summary": "How dieckol acts.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">3.1 The benzodiazepine site</h3>\n  <p>Dieckol and related phlorotannins bind the interface of α and γ subunits of GABA-A. Chloride currents in response to GABA lengthen; cortical neurons hyperpolarise into the slow, synchronous firing of deep sleep. Flumazenil, a benzodiazepine antagonist, blocks the effect.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.2 Endothelium</h3>\n  <p>Phlorotannins activate eNOS through the PI3K–Akt pathway, increase nitric oxide output and protect the vessel wall from advanced glycation and oxidative injury.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.3 Persistence</h3>\n  <p>Higher lipid solubility gives the phlorotannins longer plasma persistence than catechins or flavonols: protection that lasts through the night.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.4 Barrier</h3>\n  <p>The same lipophilicity lets dieckol reach the brain, where it acts on GABA-A directly.</p>\n</div>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Lubricating the Network",
     "summary": "Ecklonia in the language of the framework.",
     "html": "<p>Slow-wave sleep is phase-locked low-frequency oscillation across the whole neocortex — the most coherent state the brain enters. Ecklonia deepens it at its receptor without dulling it. In the archive’s language it is the vascular lubricant that clears metabolic sludge from neural networks; in the current day it is also the hand that lowers the network into its deepest synchrony.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Dieckol is reported to support hair density through DKK-1 inhibition and IGF-1 signalling; users stacking Ecklonia with Gotu kola report better hair vitality.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How Ecklonia sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Glycine</strong> drops core heat; Ecklonia deepens the sleep the drop opens.</li><li><strong>Agmatine</strong> modulates nitric oxide; Ecklonia keeps the vessels resilient to the flow.</li><li>Tauromag® and lemon balm in the same reset stack the inhibitory tone.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Antihypertensives: additive blood-pressure lowering.</li><li>Benzodiazepines, Z-drugs, alcohol: additive sedation.</li><li>Iodine-sensitive thyroid conditions: use iodine-controlled extracts only.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#sleep\">Sleep architecture</a> <a class=\"button\" href=\"#glycine\">Glycine</a> <a class=\"button\" href=\"#gotukola\">Gotu kola</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "gotukola",
   "name": "Gotu kola",
   "aliases": [
    "Gotu kola",
    "Centella asiatica",
    "Centella"
   ],
   "case": false,
   "stratum": "extract",
   "group": "neural",
   "kicker": "Neural architecture / collagen",
   "standard": "Centella asiatica — triterpenes",
   "bullets": [
    "Type I and III collagen synthesis — the neural and connective matrix.",
    "Acetylcholinesterase inhibition for memory consolidation.",
    "GABAergic modulation for calm focus without sedation."
   ],
   "field": "Infrastructure builder — constructs the collagenous scaffold upon which ErinaMAX can wire new dendritic architecture.",
   "motto": "The infrastructure builder",
   "category": "Neural architecture · collagen",
   "accent": "green",
   "layers": [
    0,
    2
   ],
   "dose": "300–500 mg + 200–300 mg",
   "window": "OMAD · Evening reset",
   "inProtocol": true,
   "subtitle": "Centella asiatica triterpenes: Type I and III collagen, MMP capping, calm alertness and the matrix in which neurons rewire",
   "description": "Gotu kola’s asiaticoside and madecassoside build and protect the extracellular matrix — skin, fascia, vessel wall and the neural scaffold — while lending a calm, alert tone.",
   "note": "Gotu kola is carried by the Protocol in two splits: with OMAD (the main dose) and in the evening reset (the night split, timed to the nocturnal growth-hormone pulse). The doses here are the Protocol’s.",
   "facts": [
    {
     "value": "300–500 mg",
     "label": "OMAD split"
    },
    {
     "value": "200–300 mg",
     "label": "Night split"
    },
    {
     "value": "L0 · L2",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Infrastructure Builder",
     "summary": "Matrix for the body and the brain.",
     "html": "<p class=\"doc-lede\">Neurons do not wire in empty space. They extend through an extracellular matrix whose stiffness, hydration and composition decide where a connection can hold. Gotu kola builds that matrix — and the matching one in skin, fascia and vessel wall — while it caps the enzymes that tear it down.</p><div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Centella asiatica</em>, the herb of longevity of Ayurvedic and Chinese medicine. Extract standardized for triterpenes: asiaticoside and madecassoside, with their aglycones asiatic and madecassic acid.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Matrix Built, Matrix Protected",
     "summary": "Two sides of tissue integrity.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Build</h3><span class=\"tag\">L0</span></div>\n  <p>Asiaticoside activates TGF-β/Smad2/3 signalling in fibroblasts and drives Type I and III collagen synthesis.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Protect</h3><span class=\"tag\">L0</span></div>\n  <p>Induction of TIMP-1/2 caps matrix metalloproteinases, including MMP-9, the collagenase of the senescent secretome.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Calm alertness</h3><span class=\"tag\">L2</span></div>\n  <p>Mild GABA-transaminase inhibition and acetylcholinesterase inhibition: focus without over-excitation.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Microcirculation</h3><span class=\"tag\">L2</span></div>\n  <p>Strengthens capillary walls and venous tone; less heaviness, better peripheral flow.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Two splits, as the Protocol writes them.",
     "html": "<article class=\"phase\" data-accent=\"green\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 2</span><h3>Matrix split</h3><p class=\"phase-window\">13:30–15:00 · OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> The meal: raw animal fat and protein</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">Gotu kola extract</th><td><span class=\"dose\">300–500 mg</span></td><td>TGF-β/Smad2/3, TIMP-1/2, MAPK/ERK</td><td>Asiaticoside drives Type I/III collagen remodelling; caps MMPs; arrests paracrine SASP damage.</td></tr>\n</tbody></table></div>\n</article><article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 3</span><h3>Night split</h3><p class=\"phase-window\">17:00–20:00 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Strictly non-caloric</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">Gotu kola (night split)</th><td><span class=\"dose\">200–300 mg</span></td><td>GABA-T, nocturnal collagen remodelling</td><td>Mild GABA-T inhibition; uses the nocturnal growth-hormone pulse for TGF-β-mediated matrix cross-linking.</td></tr>\n</tbody></table></div>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "From Triterpene to Fibre",
     "summary": "The pathway.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.1 Absorption</h3>\n  <p>Asiaticoside and madecassoside are hydrolysed toward their aglycones, which are absorbed and distributed to skin, vessel and brain.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.2 TGF-β signalling</h3>\n  <p>Smad2/3 phosphorylation in fibroblasts increases procollagen transcription; fibres are assembled with glycine and proline supplied by the substrate.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.3 TIMP induction</h3>\n  <p>TIMP-1 and TIMP-2 bind active MMPs; collagen made is collagen kept.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.4 Neural effects</h3>\n  <p>BDNF up-regulation and acetylcholinesterase inhibition support memory and verbal fluency; GABA-T inhibition steadies tone.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Observed outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Brain</th><td>Acetylcholinesterase inhibition; BDNF</td><td>Memory retention; verbal fluency</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Connective tissue</th><td>Type I collagen stimulation</td><td>Skin texture; tendon resilience</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\">Circulation</th><td>Capillary and venous support</td><td>Less leg heaviness; peripheral flow</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Deep Architecture",
     "summary": "Gotu kola in the language of the framework.",
     "html": "<p>ErinaMAX gives the signal for new neurites; Gotu kola gives them somewhere to go. The framework’s Node 4 — morphogenetic repair fidelity — is about exactly this: whether the next turnover cycle rebuilds tissue at the same precision or slightly worse. Gotu kola raises the fidelity of the rebuild, and its night split places that work inside the hours when the body is building.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>The internal parallel of an external balm: what myrrh and frankincense do for skin from outside, Gotu kola does from inside, and it is reported to raise the effect of topical GHK-Cu by supplying the collagen signal at the same time.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How Gotu kola sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Glycine</strong> supplies the residue; Gotu kola the signal.</li><li><strong>Injuv</strong> hydrates the matrix Gotu kola builds.</li><li><strong>CistaMAX</strong> silences the SASP that Gotu kola’s TIMPs block downstream.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Rare hepatotoxicity reports: stop at any sign of liver strain.</li><li>Sedatives: additive calm.</li><li>Pregnancy: avoid.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#erinamax\">ErinaMAX</a> <a class=\"button\" href=\"#injuv\">Injuv</a> <a class=\"button\" href=\"#glycine\">Glycine</a> <a class=\"button\" href=\"#cistamax\">CistaMAX</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "agmatine",
   "name": "Agmatine sulfate",
   "aliases": [
    "Agmatine",
    "Agmatine sulfate"
   ],
   "case": false,
   "stratum": "extract",
   "group": "network",
   "kicker": "Neuromodulator / NOS",
   "standard": "Decarboxylated arginine — sulfate form",
   "bullets": [
    "Selective NOS modulation — nNOS and iNOS clamped.",
    "NMDA receptor antagonism for neuroprotection and tolerance reset.",
    "Imidazoline receptor agonism for metabolic modulation."
   ],
   "field": "The receptor reset mechanism — clears down-regulated receptor landscapes and restores baseline sensitivity.",
   "motto": "The receptor reset",
   "category": "Neuromodulator · NOS",
   "accent": "teal",
   "layers": [
    2
   ],
   "dose": "250 mg",
   "window": "19:15 · Evening reset",
   "inProtocol": false,
   "subtitle": "Decarboxylated arginine: NMDA clamp, imidazoline agonist, nitric-oxide modulator and the circuit breaker of the evening",
   "description": "Agmatine is the signalling molecule arginine becomes: stored in neurons, released on activity, it clamps glutamate storms, modulates nitric oxide and restores receptor sensitivity.",
   "note": "A library compound placed in the evening reset, forty-five minutes before the first sleep: away from protein (it competes with arginine for transport) and at the moment the circuits need to slow.",
   "facts": [
    {
     "value": "250 mg",
     "label": "Dose"
    },
    {
     "value": "19:15",
     "label": "Window"
    },
    {
     "value": "L2",
     "label": "Layer"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Receptor Reset",
     "summary": "Not a precursor: a signal.",
     "html": "<p class=\"doc-lede\">Arginine is the substrate; agmatine is the message. Formed by arginine decarboxylase, stored in synaptic vesicles and released on depolarisation, agmatine acts on several receptor families at once — and the pattern of those actions is a brake on excitation that leaves the system more sensitive afterwards, not less.</p><div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>4-aminobutylguanidine sulfate. Endogenous in brain, gut and plasma; cleared by agmatinase. Its levels rise under stress, as if the body were building its own shield.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Circuits Slowed, Receptors Restored",
     "summary": "Excitation balanced at the network layer.",
     "html": "<div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">NMDA clamp</h3><span class=\"tag\">L2</span></div>\n  <p>Blocks the NMDA channel pore, preventing glutamate storms and excitotoxic calcium entry.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">NOS modulation</h3><span class=\"tag\">L2</span></div>\n  <p>Inhibits neuronal and inducible NOS, the isoforms tied to excitotoxicity and inflammation.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Imidazoline / α2</h3><span class=\"tag\">L2</span></div>\n  <p>Agonism at imidazoline I1/I2 and α2-adrenergic receptors: lower sympathetic tone; support for insulin sensitivity.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Late evening, no food near it.",
     "html": "<article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 3</span><h3>The circuit breaker</h3><p class=\"phase-window\">19:15 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Water; strictly non-caloric</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Agmatine sulfate</th><td><span class=\"dose\">250 mg</span></td><td>NMDA receptor, imidazoline I1/I2, nNOS/iNOS</td><td>Clamps excitatory glutamate; halts thought loops; deepens the descent into sleep.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Taken with Glycine 3–5 g and the rest of the evening reset.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Form</th><td>Agmatine sulfate</td><td>Stable salt; 250 mg is a precise stacking unit.</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Protein distance</th><td>At least 4 hours after OMAD</td><td>Arginine and agmatine compete for the same transporters.</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Ketamine days</th><td>Withhold</td><td>Two NMDA antagonists on the same night is an unmanaged stack.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "Four Receptor Families",
     "summary": "The pattern of a single molecule.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.1 NMDA</h3>\n  <p>Agmatine binds within the NMDA channel and reduces calcium influx during sustained glutamate exposure: neuroprotection and a quieter cortex.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.2 Nitric oxide</h3>\n  <p>Inhibition of nNOS and iNOS reduces peroxynitrite and inflammatory NO; endothelial flow is preserved.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.3 Tolerance</h3>\n  <p>By damping NMDA–NOS signalling, the cascade that down-regulates receptors under repeated stimulation, agmatine is reported to prevent and reverse tolerance to opioids and some stimulants.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.4 mTOR</h3>\n  <p>In animal models, agmatine activates mTOR-dependent synaptogenesis and produces fast antidepressant-like effects — the same pathway as ketamine, by a gentler route.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>System</th><th>Benefit</th><th>Primary mechanism</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Neuroprotection</th><td>Protects neurons from glutamate and oxidative stress</td><td>NMDA antagonism</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\">Mood</th><td>Rapid antidepressant-like effects in animal models</td><td>mTOR signalling</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Pain</th><td>Relief in neuropathic pain; less central sensitisation</td><td>NOS inhibition; opioid synergy</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Clearing the Receptor Landscape",
     "summary": "Agmatine in the language of the framework.",
     "html": "<p>A receptor field that has been pushed for weeks becomes a flattened landscape: down-regulated, deaf to its own signals. Agmatine is the reset mechanism that lets the landscape recover its relief. At night, when Layer 2 is supposed to fall into synchrony, it removes the excitatory static that keeps neurons firing out of phase.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Agmatine production rises under stress. Supplementing it is giving the body the shield it was already trying to build — a blunting of the neuro-destructive arm of chronic cortisol.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How agmatine sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Saffron</strong>: two NMDA antagonists at modest doses for a calm, anti-rumination evening.</li><li><strong>Glycine</strong> and Tauromag® complete the inhibitory floor.</li><li><strong>CistaMAX</strong>: agmatine’s NO modulation supports the nutrient delivery of the matrix.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>SSRIs, MAOIs: discuss with the prescriber.</li><li>Ketamine days in the Protocol’s pulsed strata: withhold.</li><li>Blood-pressure medication: additive lowering through α2 and imidazoline sites.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#saffron\">Saffron</a> <a class=\"button\" href=\"#sleep\">Sleep architecture</a> <a class=\"button\" href=\"#oakg\">OAKG</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "saffron",
   "name": "Saffron",
   "aliases": [
    "Saffron",
    "Crocus sativus",
    "Crocin",
    "Safranal"
   ],
   "case": false,
   "stratum": "extract",
   "group": "network",
   "kicker": "Mood / serotonin",
   "standard": "Crocus sativus — 7.5% crocins · 1% safranal",
   "bullets": [
    "Selective reuptake inhibition across serotonin, dopamine, norepinephrine.",
    "NMDA receptor antagonism for glutamate-mediated stress mitigation.",
    "Vision preservation via retinal oxygenation and photoreceptor support."
   ],
   "field": "Eliminates doom-spiraling loops; enhances visual saturation and color depth perception (RGB field amplification).",
   "motto": "The anti-doom molecule",
   "category": "Mood · serotonin · vision",
   "accent": "amber",
   "layers": [
    2,
    4
   ],
   "dose": "30 mg",
   "window": "Evening reset",
   "inProtocol": false,
   "subtitle": "Crocus sativus standardized to 7.5% crocins and 1% safranal: the big three neurotransmitters, NMDA balance and retinal light",
   "description": "Saffron supports serotonin, dopamine and noradrenaline together, clamps glutamate at the NMDA receptor and protects the retina — the interface where light becomes rhythm.",
   "note": "A library compound for the evening reset. The Protocol names saffron’s crocetin in its inflammasome blockade (5.3); the daily 30 mg dose here supplies it.",
   "facts": [
    {
     "value": "30 mg",
     "label": "Dose"
    },
    {
     "value": "Evening",
     "label": "Window"
    },
    {
     "value": "L2 · L4",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Anti-Doom Molecule",
     "summary": "A spice with clinical weight.",
     "html": "<p class=\"doc-lede\">Thirty milligrams of standardized saffron has matched first-line antidepressants in several randomized trials of mild to moderate depression. Its pharmacology explains why: it acts on all three monoamines, quiets glutamate, and keeps the retina — where the day enters the body — supplied and protected.</p><div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Crocus sativus</em> stigma extract standardized to 7.5% crocins and 1% safranal. Crocins are water-soluble carotenoid glycosides, converted in the gut to crocetin; safranal is the volatile aldehyde of the aroma, formed from picrocrocin.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Stable Mood, Clear Sight",
     "summary": "The neurotransmitter floor and the retinal interface.",
     "html": "<div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Monoamines</h3><span class=\"tag\">L2</span></div>\n  <p>Reuptake inhibition at serotonin, dopamine and noradrenaline transporters: a floor under all three.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Glutamate</h3><span class=\"tag\">L2</span></div>\n  <p>NMDA antagonism protects against excitotoxic burnout; sigma-1 interactions link to plasticity.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Retina</h3><span class=\"tag\">L4</span></div>\n  <p>Crocetin raises retinal oxygenation and protects photoreceptors; flicker sensitivity improves in trials.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "The Goldilocks dose.",
     "html": "<article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 3</span><h3>The anti-doom state</h3><p class=\"phase-window\">17:00–20:00 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Water; strictly non-caloric</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Saffron extract (7.5% crocins)</th><td><span class=\"dose\">30 mg</span></td><td>SERT, DAT, NET, NMDA, retina</td><td>Stabilises the neurotransmitter floor for the night; ends catastrophising loops.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">For sleep, 30–60 minutes before 20:00 uses safranal’s muscle-relaxant tone.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"amber\">Dose</th><td>30 mg</td><td>Effective in trials; well below the dizziness of high-dose safranal (above 100 mg).</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Cadence</th><td>Daily for 8 weeks or longer</td><td>Mood effects build over two to six weeks.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The Triple Mechanism",
     "summary": "Three pillars.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.1 Reuptake</h3>\n  <p>Crocins and safranal inhibit the reuptake of serotonin, dopamine and noradrenaline — rare in a botanical, and without the blunting of synthetic reuptake inhibitors at this dose.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.2 NMDA and sigma-1</h3>\n  <p>Crocin antagonises NMDA signalling, protecting against glutamate excitotoxicity; sigma-1 agonism is reported. The combination is shared with fast-acting clinical mood interventions.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.3 BDNF and VEGF</h3>\n  <p>Consistent use raises BDNF and VEGF in animal models: neurotrophic and angiogenic support.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.4 Inflammasome</h3>\n  <p>Crocetin scavenges cytosolic radicals and keeps TXNIP bound to thioredoxin, blocking NLRP3 assembly — the role the Protocol gives it.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Category</th><th>Benefit</th><th>Evidence level</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"amber\">Mood</th><td>Lower anxiety and depressive symptoms</td><td>High: randomized trials</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\">Vision</th><td>Retinal protection; flicker sensitivity; acuity</td><td>High in macular studies</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Appetite</th><td>Fewer snacking episodes; less emotional hunger</td><td>Moderate</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Sexual health</th><td>Libido; SSRI-induced dysfunction</td><td>Moderate</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Colour Depth",
     "summary": "Saffron in the language of the framework.",
     "html": "<p>Layer 4 is where light becomes time: melanopsin and the photoreceptors that couple the organism to the solar day. Saffron works on both ends of that coupling — the retina that receives the light and the monoamine networks that turn the day into mood. It belongs to the visual axis of the library, with C3G, Astaxanthin and Taurine.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Users report a more saturated world: colours deeper, contrast richer — an RGB field amplification consistent with improved retinal oxygenation.</p></div><div class=\"plain\" data-accent=\"amber\"><p class=\"plain-title\">Field note</p><p>The anti-doom effect: the end of worst-case spiralling, linked to HPA modulation and lower salivary cortisol.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How saffron sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Agmatine</strong> and saffron lower CNS excitability together.</li><li><strong>CistaMAX</strong>: saffron’s serotonergic floor balances its growth-hormone drive.</li><li><strong>Astaxanthin</strong> and <strong>C3G</strong> complete the clarity triad of the retina.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>SSRIs, SNRIs, MAOIs: do not combine without the prescriber.</li><li>Entheogenic days in the pulsed strata: withhold 48 hours either side.</li><li>Pregnancy: high doses are uterotonic; avoid.</li><li>Bipolar disorder: monoaminergic agents can tip mood.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#agmatine\">Agmatine</a> <a class=\"button\" href=\"#c3g\">C3G</a> <a class=\"button\" href=\"#astaxanthin\">Astaxanthin</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "tribugen",
   "name": "TRIBUGEN™",
   "aliases": [
    "TRIBUGEN",
    "Tribugen",
    "Tribulus terrestris",
    "Tribulus"
   ],
   "case": false,
   "stratum": "extract",
   "group": "drive",
   "kicker": "Androgen drive / dopamine",
   "standard": "Tribulus terrestris — high-protodioscin matrix",
   "bullets": [
    "Androgen-receptor up-regulation in brain and skeletal muscle.",
    "Dopaminergic focus with a subtle MAO-B inhibition floor.",
    "CNS motor-unit recruitment for explosive neuromuscular power."
   ],
   "field": "Induces the social-dominance neurological state — CNS-driven strength gains mediated by androgen-receptor density.",
   "motto": "The drive matrix",
   "category": "Androgen drive · dopamine",
   "accent": "rose",
   "layers": [
    1,
    2
   ],
   "dose": "1 capsule",
   "window": "11:00 · Pre-workout drink",
   "inProtocol": false,
   "subtitle": "High-protodioscin Tribulus with fenugreek and Dioscorea: androgen-receptor density, dopaminergic drive and motor-unit recruitment",
   "description": "TRIBUGEN works on androgen utilisation rather than production: receptor density in brain and muscle, dopaminergic focus and the CNS drive that fires more motor units.",
   "note": "A library compound for training days. It belongs in the 11:00 drink, before the lift, where its motor-unit recruitment is used at once. The capsule is the manufacturer’s serving; follow its label.",
   "facts": [
    {
     "value": "1 cap",
     "label": "Dose"
    },
    {
     "value": "11:00",
     "label": "Window"
    },
    {
     "value": "L1 · L2",
     "label": "Layers"
    },
    {
     "value": "5 on / 2 off",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Drive Matrix",
     "summary": "Why most Tribulus failed.",
     "html": "<p class=\"doc-lede\">For decades, Tribulus was dismissed as placebo because generic extracts were standardized to “total saponins”, a number that says nothing about protodioscin. TRIBUGEN concentrates the compound that interacts with androgen signalling and adds two other protodioscin and diosgenin sources.</p><div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>A matrix of <em>Tribulus terrestris</em> (high protodioscin), fenugreek (<em>Trigonella foenum-graecum</em>, protodioscin-rich saponins) and <em>Dioscorea nipponica</em> (diosgenin, a steroidal sapogenin). Nootropics Depot formulation.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Utilisation, Not Production",
     "summary": "Receptor sensitivity in brain and muscle.",
     "html": "<div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"rose\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Androgen receptor</h3><span class=\"tag\">L1</span></div>\n  <p>Protodioscin increases androgen-receptor immunoreactivity in brain regions tied to motivation (animal data): the same hormones, heard more clearly.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Dopamine</h3><span class=\"tag\">L2</span></div>\n  <p>Support for dopaminergic tone: the “want to do” of a focused morning.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Motor units</h3><span class=\"tag\">L2</span></div>\n  <p>CNS drive recruits more motor units: strength rises before muscle does.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Before the lift.",
     "html": "<article class=\"phase\" data-accent=\"rose\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Pre-Workout</span><h3>CNS activation</h3><p class=\"phase-window\">11:00 · fasted, before training</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">TRIBUGEN™</th><td><span class=\"dose\">1 capsule</span></td><td>Androgen receptor, dopaminergic tone, motor units</td><td>Drive and recruitment for the 11:00–13:00 session.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">The Protocol’s pre-workout drink</th><td><span class=\"dose\">Protocol doses</span></td><td>See the Protocol: L-Citrulline, ALCAR, Na-R-ALA, Tadalafil</td><td>The drink TRIBUGEN joins.</td></tr>\n</tbody></table></div>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"rose\">Cadence</th><td>Training days, 5 on / 2 off</td><td>Receptor-facing compounds hold their effect with rest days.</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Onset</th><td>Felt within 2–3 days</td><td>Utilisation acts faster than production.</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Brake</th><td>If irritability rises, reduce frequency</td><td>Drive without grounding becomes aggression.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The Dopamine–Androgen Axis",
     "summary": "A bridge between endocrine and nervous systems.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.1 Protodioscin</h3>\n  <p>A furostanol saponin; in animal studies it raises DHEA and androgen-receptor density.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.2 Diosgenin</h3>\n  <p>A steroidal sapogenin from Dioscorea: a structural relative of steroid precursors that feeds steroidogenic signalling.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.3 Dopamine</h3>\n  <p>Up-regulation of tyrosine hydroxylase is reported, and a subtle MAO-B inhibition at high protodioscin levels: dopamine made and kept.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.4 Nitric oxide</h3>\n  <p>Protodioscin stimulates NOS in vascular tissue: fullness and flow.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Effect</th><th>Mechanism</th><th>Subjective outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"rose\">Drive</th><td>AR sensitivity in prefrontal circuits</td><td>The “want to do”; social dominance</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Focus</th><td>Tyrosine hydroxylase up-regulation</td><td>Clean, sharp focus without caffeine jitter</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Vascularity</th><td>NOS activation</td><td>Fullness; peripheral flow</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Drive, Held in Phase",
     "summary": "TRIBUGEN in the language of the framework.",
     "html": "<p>The framework counts the ultradian hormone pulses — GH, LH, cortisol — among the nested oscillators of Layer 1. TRIBUGEN does not add hormone to those pulses. It makes each pulse land on more receptors. Drive that outruns its grounding is decoherence; that is why the library pairs it with PanaMAX, Taurine and Ashwagandha.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Biohackers describe it as stronger than Tongkat Ali and faster, because it works on utilisation: the brain becomes better at firing the muscle it already has.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How TRIBUGEN sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>PanaMAX</strong> smooths aggression into calm confidence.</li><li><strong>CistaMAX</strong> adds growth-hormone drive to androgen drive.</li><li><strong>Taurine</strong> and <strong>Ashwagandha</strong> keep sympathetic tone grounded.</li><li><strong>TMG</strong> covers the methyl cost of high dopaminergic output.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Hormone-sensitive conditions (prostate, breast): do not use.</li><li>Fenugreek lowers blood glucose and can interact with anticoagulants.</li><li>MAOIs and entheogenic days: withhold.</li><li>Pregnancy: avoid.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#panamax\">PanaMAX</a> <a class=\"button\" href=\"#cistamax\">CistaMAX</a> <a class=\"button\" href=\"#ashwagandha\">Ashwagandha</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "blackginger",
   "name": "Black Ginger",
   "aliases": [
    "Black Ginger",
    "Kaempferia parviflora"
   ],
   "case": false,
   "stratum": "extract",
   "group": "metabolic",
   "kicker": "Metabolic / PDE5",
   "standard": "Kaempferia parviflora — 10% 5,7-DMF",
   "bullets": [
    "AMPK activation for whole-body fuel efficiency.",
    "Natural PDE5 inhibition for peripheral and cerebral flow.",
    "Mitochondrial biogenesis through SIRT1 / PGC-1α."
   ],
   "field": "Muscle density and hardness — the infinite gas tank, carried by sustained AMPK drive.",
   "motto": "The infinite gas tank",
   "category": "Metabolic · PDE5 · AMPK",
   "accent": "violet",
   "layers": [
    0,
    2
   ],
   "dose": "100 mg",
   "window": "13:00 · Post-workout drink",
   "inProtocol": false,
   "subtitle": "Kaempferia parviflora standardized to 10% 5,7-dimethoxyflavone: AMPK, SIRT1/PGC-1α, brown fat and natural PDE5 inhibition",
   "description": "Black Ginger improves how the cell uses fuel rather than forcing its release: AMPK and SIRT1 drive, mitochondrial biogenesis, brown-fat thermogenesis and PDE5-mediated flow.",
   "note": "A library compound with one hard rule: Black Ginger inhibits PDE5, and the Protocol’s 11:00 drink already carries tadalafil, a PDE5 inhibitor. The two are not stacked. Black Ginger runs only on days when tadalafil is withheld, in the 13:00 drink thirty minutes before OMAD.",
   "facts": [
    {
     "value": "100 mg",
     "label": "Dose"
    },
    {
     "value": "13:00",
     "label": "Window"
    },
    {
     "value": "L0 · L2",
     "label": "Layers"
    },
    {
     "value": "Off-tadalafil days",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Infinite Gas Tank",
     "summary": "Not culinary ginger.",
     "html": "<p class=\"doc-lede\">Black Ginger is a different plant from culinary ginger: a Thai rhizome whose purple-black interior is dense with polymethoxyflavones. It does not push energy out of the cell the way caffeine does. It improves how the cell uses fuel, so that the tank does not seem to empty.</p><div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Kaempferia parviflora</em> rhizome extract standardized to 10% 5,7-dimethoxyflavone (5,7-DMF). Human trials show improved physical fitness and grip strength in older adults and modest improvements in erectile function.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Fuel Use, Flow and Partitioning",
     "summary": "Two pillars.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">AMPK switch</h3><span class=\"tag\">L0</span></div>\n  <p>Activates AMPK, the cell’s energy sensor, mimicking the metabolic signature of exercise and fasting.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Mitochondria</h3><span class=\"tag\">L0</span></div>\n  <p>SIRT1 and PGC-1α activation drive mitochondrial biogenesis.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">PDE5</h3><span class=\"tag\">L2</span></div>\n  <p>Inhibits PDE5, raising cGMP and nitric oxide-driven flow in peripheral and cerebral vessels.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Brown fat</h3><span class=\"tag\">L0</span></div>\n  <p>Activates brown adipose thermogenesis.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Pre-meal, and never with tadalafil.",
     "html": "<article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Post-Workout</span><h3>Pre-meal metabolic engine</h3><p class=\"phase-window\">13:00 · thirty minutes before OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Black Ginger (10% 5,7-DMF)</th><td><span class=\"dose\">100 mg</span></td><td>AMPK, SIRT1/PGC-1α, PDE5</td><td>Prepares mitochondrial networks for the high-throughput fuel of OMAD.</td></tr>\n<tr><th scope=\"row\">TUDCA · C3G</th><td><span class=\"dose\">See monographs</span></td><td>ER stress, partitioning</td><td>The pre-meal stack Black Ginger belongs to.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Only on days the Protocol’s tadalafil is withheld.</p>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"rose\">Tadalafil days</th><td>Do not take</td><td>Two PDE5 inhibitors stack hypotension.</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\">Cadence</th><td>Off-tadalafil days only</td><td>A rotational compound, not a baseline.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "Substrate Utilisation",
     "summary": "How 5,7-DMF acts.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.1 AMPK</h3>\n  <p>5,7-DMF raises AMPK phosphorylation in muscle; glucose uptake and fatty-acid oxidation increase.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.2 SIRT1 / PGC-1α</h3>\n  <p>Deacetylation of PGC-1α by SIRT1 switches on mitochondrial biogenesis genes.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.3 PDE5</h3>\n  <p>Polymethoxyflavones inhibit PDE5; cGMP persists; smooth muscle relaxes.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.4 Calcium</h3>\n  <p>Modulation of calcium handling in muscle fibres is linked to grip strength and explosive output.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Benefit</th><th>Science</th><th>Real-world effect</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"green\">Mitochondrial biogenesis</th><td>PGC-1α and SIRT1</td><td>Endurance; long-term energy</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Body recomposition</th><td>Brown adipose activity</td><td>Thermogenesis</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Power</th><td>Muscle calcium signalling</td><td>Grip strength; explosive power</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\">Vitality</th><td>Blood flow; dopamine</td><td>Confidence; drive; sexual function</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Clean Energy",
     "summary": "Black Ginger in the language of the framework.",
     "html": "<p>The framework names energetic inefficiency as the third consequence of decoherence: phase-locked oscillators share energy; desynchronised ones do not. Black Ginger does not borrow energy from tomorrow. It improves the efficiency of today’s fuel — which is why users describe a tank that does not empty rather than a buzz.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>A smooth, non-jittery confidence — the confidence molecule — and a muscle hardness and vascularity that last through the day rather than only the workout.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How Black Ginger sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>C3G</strong> shuttles glucose into muscle while Black Ginger burns it cleanly.</li><li><strong>TUDCA</strong> covers ER stress during the partitioning.</li><li>NAD⁺ support pairs with its SIRT1 drive.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Tadalafil, sildenafil and other PDE5 inhibitors: never together.</li><li>Nitrates: contraindicated.</li><li>Antihypertensives: additive lowering; monitor.</li></ul>\n</div>\n</div><div class=\"warning\"><h3 class=\"card-kicker\">The tadalafil rule</h3><p>The Protocol’s 11:00 drink contains tadalafil 2.5–5 mg. Black Ginger is a PDE5 inhibitor. On any day tadalafil is taken, Black Ginger is not.</p></div><p class=\"cmp-links\"><a class=\"button\" href=\"#c3g\">C3G</a> <a class=\"button\" href=\"#tudca\">TUDCA</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "cistamax",
   "name": "CistaMAX™",
   "aliases": [
    "CistaMAX",
    "Cistanche"
   ],
   "case": false,
   "stratum": "extract",
   "group": "drive",
   "kicker": "Growth / hormonal",
   "standard": "Cistanche tubulosa — CO₂ supercritical matrix",
   "bullets": [
    "Up-regulates the steroidogenic enzymes StAR and CYP11A1.",
    "Ghrelin-receptor agonism — an endogenous growth-hormone pulse.",
    "Acteoside keeps NF-κB out of the nucleus: the senescent secretome silenced."
   ],
   "field": "The hard-gainer solution — anabolic drive without the CNS edge of conventional secretagogues.",
   "motto": "The calm anabolic",
   "category": "Growth · hormonal · anti-SASP",
   "accent": "amber",
   "layers": [
    1,
    0
   ],
   "dose": "½–1 capsule",
   "window": "13:30–15:00 · OMAD",
   "inProtocol": true,
   "subtitle": "Cistanche tubulosa triple-extract matrix: steroidogenic enzymes, ghrelin-receptor growth-hormone pulse, gut–brain axis and the acteoside lock on NF-κB",
   "description": "CistaMAX drives anabolic signalling without the edge of secretagogues and, through acteoside, silences the senescent secretome upstream of the nucleus.",
   "note": "The Protocol uses CistaMAX at half a standard dose (about 250–325 mg) as its high-acteoside anti-SASP agent. The full capsule belongs to deliberate growth phases. Taken with the fat of OMAD, which carries the CO₂-extracted fraction.",
   "facts": [
    {
     "value": "½ cap",
     "label": "Anti-SASP dose"
    },
    {
     "value": "1 cap",
     "label": "Growth phase"
    },
    {
     "value": "L0 · L1",
     "label": "Layers"
    },
    {
     "value": "OMAD",
     "label": "Window"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Calm Anabolic",
     "summary": "A single plant, three extracts.",
     "html": "<p class=\"doc-lede\">No single extract captures Cistanche. Its phenylethanoid glycosides split between water-soluble and lipid-soluble fractions, and its polysaccharides act in the gut. CistaMAX recombines them — and the result is anabolic drive that feels calm rather than edgy.</p><div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Cistanche tubulosa</em>, a parasitic desert plant of Chinese medicine. The matrix combines a high-potency extract standardized for echinacoside and acteoside, a supercritical CO₂ extract rich in acteoside (verbascoside), and full-spectrum powder for polysaccharides. The archive source also lists low-dose micronized pregnenolone and DHEA as primers, and Primavie® shilajit; read the label of the batch in hand.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Anabolism and Silence",
     "summary": "Two targets in one compound.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Steroidogenesis</h3><span class=\"tag\">L1</span></div>\n  <p>Up-regulates StAR and CYP11A1, the enzymes that move cholesterol into the mitochondria and cut it to pregnenolone.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Growth-hormone pulse</h3><span class=\"tag\">L1</span></div>\n  <p>Ghrelin-receptor (GHS-R1a) agonism triggers endogenous GH release.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">SASP silence</h3><span class=\"tag\">L0</span></div>\n  <p>Acteoside halts IκBα phosphorylation: NF-κB and AP-1 stay out of the nucleus; IL-6, IL-8 and pro-MMP-9 are not transcribed.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Gut–brain</h3><span class=\"tag\">L0</span></div>\n  <p>Expands Bacteroides and Parabacteroides; supports serotonin precursor synthesis in the gut.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "With the fat of the meal.",
     "html": "<article class=\"phase\" data-accent=\"green\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 2</span><h3>Anti-SASP and anabolic support</h3><p class=\"phase-window\">13:30–15:00 · OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> The meal: raw animal fat and protein</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">CistaMAX™ (half dose)</th><td><span class=\"dose\">250–325 mg</span></td><td>IκBα, NF-κB p65, AP-1, pro-MMP-9 Cys73</td><td>The Protocol’s anti-SASP agent: acteoside silences the senescent secretome.</td></tr>\n<tr><th scope=\"row\">CistaMAX™ (growth phase)</th><td><span class=\"dose\">1 capsule</span></td><td>StAR, CYP11A1, GHS-R1a</td><td>Full matrix for deliberate anabolic blocks.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">The fat of OMAD carries the lipid-soluble acteoside fraction.</p>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The Push and the Lock",
     "summary": "Hormonal priming and inflammatory silence.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.1 Enzymatic push</h3>\n  <p>Cistanche up-regulates the rate-limiting steroidogenic steps; the hormonal primers in the formula supply substrate to the enzymes it has woken.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.2 Ghrelin receptor</h3>\n  <p>GHS-R1a agonism produces a GH pulse and appetite: the hard-gainer’s ally.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.3 The cysteine-switch lock</h3>\n  <p>Acteoside’s catechols trap hydroxyl and peroxynitrite radicals, preventing oxidation of Cys73 on pro-MMP-9 and locking its zinc cleft inactive.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.4 Neurotrophic</h3>\n  <p>Up-regulation of BDNF and GDNF, in synergy with ALCAR and Na-R-ALA of the Protocol.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Benefit</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"amber\">Testosterone</th><td>Steroidogenic enzyme up-regulation</td><td>Libido, strength, recovery</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Growth hormone</th><td>GHS-R1a agonism</td><td>Appetite, tissue repair, vibrant mood</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Gut</th><td>Bacteroides modulation</td><td>Lower inflammation; serotonin precursors</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Inflammation</th><td>IκBα phosphorylation blocked</td><td>NF-κB and SASP silenced</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Energy Without the Jagged Edge",
     "summary": "CistaMAX in the language of the framework.",
     "html": "<p>The senescent cell is decoherence made contagious: its secretome pushes neighbours into the same state. CistaMAX’s acteoside cuts the transcriptional root of that broadcast. Its growth-hormone pulse, meanwhile, is a Layer 1 ultradian rhythm made stronger, not replaced.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>The calm-aggression paradox: testosterone support without irritability, attributed to the simultaneous GH rise, which has a calming, anti-anxiety character.</p></div><div class=\"plain\" data-accent=\"amber\"><p class=\"plain-title\">Field note</p><p>A colour brightening, more grounded than saffron’s, is reported — attributed to acteoside’s retinal protection.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How CistaMAX sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Gotu kola</strong> caps MMP-9 downstream; CistaMAX locks it upstream.</li><li><strong>Ashwagandha</strong> lowers the cortisol resistance to its anabolic signal.</li><li><strong>TRIBUGEN</strong> for receptor drive; <strong>PanaMAX</strong> for HPA resilience.</li><li><strong>Glycine</strong> at night meets its GH pulse with collagen substrate.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Hormone-sensitive conditions: the DHEA and pregnenolone primers rule it out.</li><li>Pregnancy and breastfeeding: avoid.</li><li>Appetite rises: plan the meal, not snacks.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#gotukola\">Gotu kola</a> <a class=\"button\" href=\"#ashwagandha\">Ashwagandha</a> <a class=\"button\" href=\"#tribugen\">TRIBUGEN</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "c3g",
   "name": "C3G",
   "aliases": [
    "C3G",
    "Cyanidin-3-glucoside",
    "Cyanidin 3-glucoside"
   ],
   "case": true,
   "stratum": "extract",
   "group": "metabolic",
   "kicker": "Partitioning / AMPK",
   "standard": "Cyanidin-3-glucoside — black rice",
   "bullets": [
    "GLUT4 translocation to the muscle membrane for glucose shuttling.",
    "AMPK-driven mitochondrial biogenesis; SIRT6 activation.",
    "Rhodopsin regeneration for low-light vision."
   ],
   "field": "Physically remodels adipocyte morphology; sharper scotopic vision through rhodopsin regeneration.",
   "motto": "The keystone polyphenol",
   "category": "Partitioning · AMPK · vision",
   "accent": "violet",
   "layers": [
    0,
    4
   ],
   "dose": "250–500 mg",
   "window": "13:30–15:00 · OMAD",
   "inProtocol": true,
   "subtitle": "Cyanidin-3-glucoside from black rice: SIRT6, PGC-1α, AMPK-driven nutrient partitioning and the regeneration of rhodopsin",
   "description": "C3G tells fuel to go to muscle rather than fat, activates the genome guardian SIRT6, builds mitochondria, and regenerates the pigment of night vision.",
   "note": "C3G is carried by the Protocol with OMAD, at 250–500 mg. The archive placed it in a pre-meal stack; the Protocol’s placement with the meal is the current one.",
   "facts": [
    {
     "value": "250–500 mg",
     "label": "Dose"
    },
    {
     "value": "OMAD",
     "label": "Window"
    },
    {
     "value": "L0 · L4",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Keystone Polyphenol",
     "summary": "Purple force.",
     "html": "<p class=\"doc-lede\">One anthocyanin, many switches. C3G signals across metabolism, genome maintenance, mitochondria and the retina — the reason the archive called it the keystone polyphenol.</p><div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>Cyanidin-3-O-glucoside, standardized from black rice (Nootropics Depot, 125 mg capsules). The most abundant anthocyanin in nature; deep purple at the pH of the stomach. It colours what it touches.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Partitioning, Longevity, Sight",
     "summary": "Three targets.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">SIRT6</h3><span class=\"tag\">L0</span></div>\n  <p>Cyanidin activates SIRT6, the guardian of the genome: double-strand break repair, telomere maintenance and the H3K9 heterochromatin lock the Protocol builds with boron.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">PGC-1α</h3><span class=\"tag\">L0</span></div>\n  <p>Signals the building of new mitochondria, not only the efficiency of the old.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Nutrient shuttle</h3><span class=\"tag\">L0</span></div>\n  <p>AMPK activation and GLUT4 translocation send glucose into muscle; lipoprotein lipase is inhibited in fat and supported in muscle.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Rhodopsin</h3><span class=\"tag\">L4</span></div>\n  <p>Accelerates the regeneration of rhodopsin: faster dark adaptation, sharper low-light vision.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "With the meal, as the Protocol writes it.",
     "html": "<article class=\"phase\" data-accent=\"green\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 2</span><h3>The longevity meal</h3><p class=\"phase-window\">13:30–15:00 · OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> The meal: raw animal fat and protein</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">C3G (Cyanidin 3-Glucoside)</th><td><span class=\"dose\">250–500 mg</span></td><td>Rhodopsin (11-cis-retinal), AMPK, GLUT4, nucleoplasm</td><td>Opsin regeneration and retinal photoprotection; AMPK; an aqueous radical sink shielding uncoiled euchromatin during repair sweeps.</td></tr>\n</tbody></table></div>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "Signals Across Compartments",
     "summary": "The pathway, step by step.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.1 AMPK and GLUT4</h3>\n  <p>AMPK activation translocates GLUT4 to the muscle membrane: glucose enters muscle independently of insulin.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.2 LPL modulation</h3>\n  <p>Lipoprotein lipase is suppressed in adipose and favoured in muscle, redirecting dietary fat toward oxidation.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.3 SIRT6</h3>\n  <p>Cyanidin binds SIRT6 and raises its deacetylase activity on histone H3K9 — the repair-and-silence mark.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">3.4 Rhodopsin</h3>\n  <p>Cyanidin glycosides speed the regeneration of rhodopsin after bleaching in rod outer segments.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Pathway</th><th>Action</th><th>Experience</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"violet\">MAO</th><td>Subtle, reversible MAO-A and MAO-B inhibition (in vitro)</td><td>Persistent mood brightening</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">Cerebral blood flow</th><td>eNOS / nitric oxide support</td><td>Less mental friction; faster processing</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Neurotrophic</th><td>ERK/CREB/BDNF signalling</td><td>Memory; neuroplasticity</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Remodelled Set Point",
     "summary": "C3G in the language of the framework.",
     "html": "<p>C3G works at both ends of the hierarchy: in the nucleus, where SIRT6 keeps the epigenetic code from second-order decoherence, and in the retina, where Layer 4 couples the organism to the light of the day. Between them it changes where fuel goes — a set point remodelled over months, not a stimulus felt in an hour.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>The hunger paradox: some users feel a surge of hunger with high energy and full muscles, attributed to glucose being shuttled into muscle so efficiently that the brain asks for more.</p></div><div class=\"plain\" data-accent=\"blue\"><p class=\"plain-title\">Field note</p><p>The visual sharpness effect: brighter colours and better night vision, from rhodopsin regeneration.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How C3G sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Black Ginger</strong>: SIRT1 beside SIRT6; fuel burned and fuel partitioned.</li><li><strong>TUDCA</strong> covers ER stress during partitioning.</li><li><strong>Astaxanthin</strong> and <strong>Saffron</strong>: the retinal clarity triad.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>MAO inhibition (in vitro): caution with MAOIs and on entheogenic days.</li><li>Diabetes medication: glucose disposal increases.</li><li>It stains: purple output is expected.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#blackginger\">Black Ginger</a> <a class=\"button\" href=\"#astaxanthin\">Astaxanthin</a> <a class=\"button\" href=\"#tudca\">TUDCA</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "andrographis",
   "name": "Andrographis",
   "aliases": [
    "Andrographis",
    "Andrographis paniculata",
    "Andrographolide"
   ],
   "case": false,
   "stratum": "extract",
   "group": "matrix",
   "kicker": "Immune sentinel / NF-κB",
   "standard": "Andrographis paniculata — andrographolides",
   "bullets": [
    "Covalent NF-κB modulation and COX-2 inhibition without full suppression.",
    "Liver and gut-barrier support through glutathione and bile flow.",
    "SIRT1 pathway interaction for longevity signalling."
   ],
   "field": "Metabolic coolant — blunts the inflammatory load of high-throughput protein metabolism.",
   "motto": "The metabolic coolant",
   "category": "Immune sentinel · NF-κB",
   "accent": "rose",
   "layers": [
    1,
    0
   ],
   "dose": "400 mg",
   "window": "18:00 · Evening reset",
   "inProtocol": false,
   "subtitle": "Andrographis paniculata standardized for andrographolides: covalent NF-κB modulation, systemic cooling, liver and gut-barrier support",
   "description": "Andrographis cools inflammatory signalling without suppressing immunity: andrographolide binds NF-κB covalently, lowers the cytokines that hold the core hot, and supports bile flow and glutathione.",
   "note": "A library compound placed at 18:00, two hours before the first sleep, as the systemic coolant of the sleep architecture. In the pathogen cleanse it already serves as part of the starter triad; do not double it when both run.",
   "facts": [
    {
     "value": "400 mg",
     "label": "Dose"
    },
    {
     "value": "18:00",
     "label": "Window"
    },
    {
     "value": "L0 · L1",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Metabolic Coolant",
     "summary": "The king of bitters.",
     "html": "<p class=\"doc-lede\">Traditional texts say Andrographis “clears heat”. The modern reading is precise: andrographolide binds the p50 subunit of NF-κB and reduces the transcription of the cytokines that raise the hypothalamic set point. The heat it clears is inflammatory signalling.</p><div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Andrographis paniculata</em>, standardized for andrographolides (diterpene lactones), with neoandrographolide and deoxyandrographolide. Clinical trials support its use in upper respiratory infections.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Inflammation Modulated, Not Suppressed",
     "summary": "A quieter ultradian oscillator.",
     "html": "<p>NF-κB is not a switch; it oscillates, with a period near 100 minutes — one of the nested rhythms of Layer 1. Chronic inflammatory pressure flattens that rhythm into a constant hum. Andrographis lowers the hum without silencing the immune response.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"rose\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">NF-κB</h3><span class=\"tag\">L1</span></div>\n  <p>Selective modulation of NF-κB and COX-2.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Liver and gut</h3><span class=\"tag\">L0</span></div>\n  <p>Raises glutathione and bile flow; supports Phase I/II conjugation.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">SIRT1</h3><span class=\"tag\">L0</span></div>\n  <p>Interaction with the SIRT1 longevity pathway.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Two hours before the first sleep.",
     "html": "<article class=\"phase\" data-accent=\"rose\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">T − 2 h</span><h3>Systemic cooling</h3><p class=\"phase-window\">18:00 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Water; strictly non-caloric</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Andrographis extract</th><td><span class=\"dose\">400 mg</span></td><td>NF-κB p50 Cys62, COX-2, IL-6, TNF-α</td><td>Quenches the inflammatory signalling that keeps the core hot after a dense raw meal.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Part of the Sleep architecture sequence. The archive’s pre-meal variant (15–30 minutes before eating) remains an option when inflammatory load from training is the target.</p>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "A Covalent Brake",
     "summary": "The pathway, step by step.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.1 Covalent binding</h3>\n  <p>Andrographolide’s α,β-unsaturated lactone forms a covalent adduct with the reduced Cys62 of NF-κB p50, blocking its binding to DNA.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.2 Cytokines</h3>\n  <p>IL-6, TNF-α and IL-1β transcription falls; the hypothalamic set point relaxes.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.3 Liver</h3>\n  <p>Glutathione synthesis and bile secretion rise; Phase II conjugation accelerates.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.4 Gut barrier</h3>\n  <p>Reduced mucosal inflammation supports tight-junction integrity.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Subjective feel</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"rose\">Immune system</th><td>Modulates NF-κB and cytokine production</td><td>Resilience to seasonal stressors; faster recovery</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Joints</th><td>COX-2 inhibition</td><td>Smoother movement; less exercise soreness</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Liver and gut</th><td>Glutathione and bile flow</td><td>Cleaner digestion</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Clearing the Background Noise",
     "summary": "Andrographis in the language of the framework.",
     "html": "<p>Inflammation is noise on every channel at once. By lowering the inflammatory background, Andrographis lets the other oscillators be heard — the reason users describe a cognitive clarity it was never designed to give, a fog lifted that they did not know was there.</p>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How Andrographis sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Glycine</strong>: the two heat sinks of the evening.</li><li><strong>Nigella sativa</strong>: the immune fortress.</li><li><strong>TUDCA</strong> and <strong>C3G</strong>: the systemic shield around the meal.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Autoimmune disease and immunosuppressants: do not use without the specialist.</li><li>Pregnancy, or trying to conceive: avoid.</li><li>Allergic reactions, including rare anaphylaxis: stop at once.</li><li>Anticoagulants and antihypertensives: additive effects.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#sleep\">Sleep architecture</a> <a class=\"button\" href=\"#nigella\">Nigella sativa</a> <a class=\"button\" href=\"#tudca\">TUDCA</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "astaxanthin",
   "name": "Astaxanthin",
   "aliases": [
    "Astaxanthin"
   ],
   "case": false,
   "stratum": "extract",
   "group": "matrix",
   "kicker": "Antioxidant / mitochondria",
   "standard": "Haematococcus pluvialis — xanthophyll",
   "bullets": [
    "Spans the full membrane bilayer — singlet-oxygen quenching.",
    "Crosses the blood–brain and blood–retinal barriers.",
    "Blocks IKKβ upstream of NF-κB; induces Nrf2."
   ],
   "field": "The biophotonic antenna — enhances light transduction in the mitochondrial matrix and the retinal coherence fields.",
   "motto": "The red sentinel",
   "category": "Membrane shield · mitochondria",
   "accent": "rose",
   "layers": [
    0,
    3,
    4
   ],
   "dose": "6–12 mg",
   "window": "13:30–15:00 · OMAD",
   "inProtocol": true,
   "subtitle": "Haematococcus pluvialis xanthophyll: the membrane-spanning antioxidant that guards lipids, the nuclear envelope, the retina and the skin",
   "description": "Astaxanthin spans the lipid bilayer from one face to the other, quenching singlet oxygen and lipid radicals where other antioxidants cannot reach, and blocks IKKβ upstream of inflammation.",
   "note": "Astaxanthin is carried by the Protocol with OMAD at 6–12 mg: highly lipophilic, it needs the fat of the meal.",
   "facts": [
    {
     "value": "6–12 mg",
     "label": "Dose"
    },
    {
     "value": "OMAD",
     "label": "Window"
    },
    {
     "value": "L0 · L3 · L4",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Red Sentinel",
     "summary": "An antioxidant shaped like a membrane.",
     "html": "<p class=\"doc-lede\">Most antioxidants live on one side of a membrane. Astaxanthin is the length of one: a rigid carotenoid backbone with a polar ring at each end, it spans the bilayer and protects both its faces and its interior at once.</p><div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>A xanthophyll carotenoid from the microalga <em>Haematococcus pluvialis</em>, the pigment that colours salmon and flamingos. Among the most potent singlet-oxygen quenchers measured, and unlike β-carotene it does not become a pro-oxidant at high concentration.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Pristine Membranes",
     "summary": "Where the lattice is assembled.",
     "html": "<p>The framework makes the cell membrane the electrical environment in which the tubulin lattice assembles (Node 2), and names oxidative carbonylation of tubulin as one of the four failure modes of the Layer 0 time crystal. Astaxanthin defends both: the lipids from peroxidation and the cytoplasm from the radicals that would carbonylate the lattice.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Membranes</h3><span class=\"tag\">L0</span></div>\n  <p>Halts lipid peroxidation chain reactions; shields DNA bubbles and lipids from ferroptosis.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Retina</h3><span class=\"tag\">L4</span></div>\n  <p>Crosses the blood–retinal barrier; protects photoreceptors; eases accommodation fatigue.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Field</h3><span class=\"tag\">L3</span></div>\n  <p>Membrane order is the cavity of the biophotonic field; astaxanthin keeps the cavity intact.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "With the fat of the meal.",
     "html": "<article class=\"phase\" data-accent=\"green\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 2</span><h3>The longevity meal</h3><p class=\"phase-window\">13:30–15:00 · OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> The meal: raw animal fat and protein</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">Astaxanthin</th><td><span class=\"dose\">6–12 mg</span></td><td>Lipid bilayer, IKKβ, nuclear envelope</td><td>Transmembrane polar anchor; halts singlet oxygen; shields exposed DNA and lipids from ferroptosis.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">The high end, 12 mg, for months of strong equatorial sun.</p>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "Across the Bilayer",
     "summary": "The pathway, step by step.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.1 Orientation</h3>\n  <p>The polar ionone rings anchor at the two membrane surfaces; the polyene chain crosses the hydrophobic core.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.2 Quenching</h3>\n  <p>Singlet oxygen and lipid peroxyl radicals are neutralised by the conjugated chain, which dissipates the energy as heat.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.3 IKKβ</h3>\n  <p>Astaxanthin inhibits IKKβ phosphorylation, keeping NF-κB in the cytoplasm and blocking NLRP3 priming.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.4 Cardiolipin</h3>\n  <p>Protects mitochondrial cardiolipin from oxidation, preventing mPTP opening and NLRP3 assembly.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Subjective outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"blue\">Visual system</th><td>Blood–retinal barrier crossing; photoreceptor protection</td><td>Less eye strain; better accommodation</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Mitochondria</th><td>ROS neutralised within the electron transport chain</td><td>Endurance; faster recovery</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Skin</th><td>MMP inhibition; UV protection</td><td>Internal sunscreen; elasticity</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Biophotonic Antenna",
     "summary": "Astaxanthin in the language of the framework.",
     "html": "<p>A coherent biophotonic field needs an intact optical cavity. Astaxanthin keeps the lipid walls of that cavity unoxidised, and in the retina — Layer 4 — it protects the hardware through which the solar day enters. The archive called it the guard of the electrical and structural boundaries; in the five-layer reading it spans three of them.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>At 12 mg, users in equatorial light report a longer time in the sun before reddening: a raised minimal erythemal dose.</p></div><div class=\"plain\" data-accent=\"rose\"><p class=\"plain-title\">Field note</p><p>The matrix guard: while Gotu kola and Injuv rebuild the dermal matrix, astaxanthin keeps the new collagen from rusting.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How astaxanthin sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Saffron</strong> and <strong>C3G</strong>: the visual clarity triad.</li><li><strong>Injuv</strong> and <strong>Gotu kola</strong>: matrix built, matrix guarded.</li><li>Na-R-ALA of the Protocol: GPx4 and astaxanthin close the ferroptosis door from two sides.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Very safe; chronic high doses can tint the skin faintly orange.</li><li>Shellfish or algae allergy: check the source.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#saffron\">Saffron</a> <a class=\"button\" href=\"#c3g\">C3G</a> <a class=\"button\" href=\"#injuv\">Injuv</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "nigella",
   "name": "Nigella sativa",
   "aliases": [
    "Nigella sativa",
    "Nigella",
    "Black seed",
    "Thymoquinone"
   ],
   "case": false,
   "stratum": "extract",
   "group": "neural",
   "kicker": "Metabolic / thymoquinone",
   "standard": "Nigella sativa — 10% thymoquinone",
   "bullets": [
    "Thymoquinone activates Nrf2 and suppresses NF-κB concurrently.",
    "Acetylcholinesterase inhibition inside a rising GABA floor: calm focus.",
    "Antimicrobial and antifungal enforcement of the microbiome boundary."
   ],
   "field": "The ancient coherence restorer — the remedy for everything except death itself.",
   "motto": "The panacea protocol",
   "category": "Cholinergic engine · thymoquinone",
   "accent": "amber",
   "layers": [
    2,
    0
   ],
   "dose": "200 mg",
   "window": "OMAD · or 19:15",
   "inProtocol": false,
   "subtitle": "Black seed extract standardized to 10% thymoquinone: acetylcholine and GABA together, Nrf2, immune vigilance and the respiratory tree",
   "description": "Nigella sativa raises acetylcholine and GABA at the same time — a calm, sharp focus — while thymoquinone activates Nrf2, cools inflammation and patrols the microbial boundary.",
   "note": "A library compound. Its default place is OMAD, where fat carries thymoquinone. In the sleep architecture it moves to 19:15 as the REM primer. The cleanse uses black seed oil in its starter triad; if both run, do not double.",
   "facts": [
    {
     "value": "200 mg",
     "label": "Dose"
    },
    {
     "value": "OMAD",
     "label": "Window"
    },
    {
     "value": "L0 · L2",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Panacea Protocol",
     "summary": "The remedy for everything but death.",
     "html": "<p class=\"doc-lede\">The old line about black seed — a remedy for everything except death — reads today as pleiotropy. Thymoquinone and thymohydroquinone act on memory, inflammation, immunity, metabolism and breath. The common thread is that they raise signal while lowering noise.</p><div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Nigella sativa</em> seed extract standardized to 10% thymoquinone (Nootropics Depot, 200 mg capsules). Thymohydroquinone, its reduced form, carries the acetylcholinesterase inhibition.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Calm Focus",
     "summary": "Cholinergic drive inside a GABA envelope.",
     "html": "<div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Cholinergic engine</h3><span class=\"tag\">L2</span></div>\n  <p>Acetylcholinesterase inhibition floods synapses with acetylcholine; α7 nicotinic and M1 muscarinic receptors open the gate to long-term potentiation.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">GABA tone</h3><span class=\"tag\">L2</span></div>\n  <p>Brain GABA rises at the same time: drive without jitter.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Nrf2 / NF-κB</h3><span class=\"tag\">L0</span></div>\n  <p>Thymoquinone activates Nrf2 and suppresses NF-κB: antioxidant enzymes up, inflammatory cytokines down.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "With fat by default; before sleep as the REM primer.",
     "html": "<article class=\"phase\" data-accent=\"amber\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 2</span><h3>Systemic shield</h3><p class=\"phase-window\">13:30–15:00 · OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> The meal: raw animal fat and protein</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Nigella sativa (10% TQ)</th><td><span class=\"dose\">200 mg</span></td><td>AChE, Nrf2, NF-κB, macrophages</td><td>Absorbed with fat; daytime cholinergic and anti-inflammatory cover.</td></tr>\n</tbody></table></div>\n</article><article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">T − 45 min</span><h3>REM primer (variant)</h3><p class=\"phase-window\">19:15 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> Water; strictly non-caloric</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Nigella sativa (10% TQ)</th><td><span class=\"dose\">200 mg</span></td><td>AChE, GABA tone</td><td>Primes the cholinergic drive of the second sleep’s REM; GABA keeps the body still.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">One placement per day, not both.</p>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The LTP Loop",
     "summary": "From enzyme to plasticity.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.1 AChE inhibition</h3>\n  <p>Thymohydroquinone inhibits acetylcholinesterase; acetylcholine persists in the cleft.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.2 Receptor activation</h3>\n  <p>α7 nicotinic and M1 muscarinic receptors respond; glutamate release follows.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.3 LTP</h3>\n  <p>AMPA–NMDA cooperation drives long-term potentiation: the physical mechanism of learning.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.4 Immune patrol</h3>\n  <p>Macrophage and neutrophil phagocytosis increase; antimicrobial and antifungal action holds the microbial boundary.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Pathway</th><th>Action</th><th>Experience</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">GABAergic tone</th><td>Raises brain GABA</td><td>Calm focus</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Immune defence</th><td>Phagocyte stimulation</td><td>Fewer seasonal illnesses</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Lipid partitioning</th><td>Lower LDL; less adipocyte differentiation</td><td>Leaner baseline</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\">Respiratory flow</th><td>Bronchodilation; lung antioxidant</td><td>Deeper breathing</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Signal Up, Noise Down",
     "summary": "Nigella in the language of the framework.",
     "html": "<p>A drug that raises acetylcholine usually raises tension with it. Nigella raises the inhibitory floor at the same moment, so that the gain of the network rises without its noise. In the night, the same pairing primes REM — the theta-rich state of the second sleep, where the day’s learning is written down — without breaking through into waking.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>The zen-like hyperfocus: clear, sharp, physically relaxed — the anecdote that recurs in every community that uses it.</p></div><div class=\"plain\" data-accent=\"amber\"><p class=\"plain-title\">Field note</p><p>The inflammatory soup neutraliser: cooling the cytokine milieu around over-worked joints.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How Nigella sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Cognance</strong> and <strong>ErinaMAX</strong>: the neuroplasticity stack.</li><li><strong>Andrographis</strong>: the immune fortress.</li><li>Curcumin and magnesium for joint inflammation.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Anticoagulants: thymoquinone has anti-platelet action.</li><li>Diabetes and blood-pressure medication: additive lowering.</li><li>Cholinergic drugs and anticholinergics: interaction.</li><li>Pregnancy: avoid concentrated extracts.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#cognance\">Cognance</a> <a class=\"button\" href=\"#andrographis\">Andrographis</a> <a class=\"button\" href=\"#sleep\">Sleep architecture</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "tudca",
   "name": "TUDCA",
   "aliases": [
    "TUDCA",
    "Tauroursodeoxycholic acid"
   ],
   "case": true,
   "stratum": "extract",
   "group": "matrix",
   "kicker": "Cytoprotection / ER stress",
   "standard": "Tauroursodeoxycholic acid",
   "bullets": [
    "Endoplasmic-reticulum stress resolution — the unfolded protein response reset.",
    "Blocks Bax translocation: the apoptotic cascade stays off.",
    "Biliary integrity and gut-barrier tight-junction support."
   ],
   "field": "The metabolic eraser — T4 → T3 conversion in brown fat; cellular decision-making fidelity restored.",
   "motto": "The chemical chaperone",
   "category": "Cytoprotection · ER stress",
   "accent": "green",
   "layers": [
    0
   ],
   "dose": "250 mg",
   "window": "13:00 · Post-workout drink",
   "inProtocol": false,
   "subtitle": "Tauroursodeoxycholic acid: protein folding under stress, the mitochondrial Bax gate, bile flow, insulin sensitivity and the T4 → T3 conversion",
   "description": "TUDCA helps proteins fold when the endoplasmic reticulum is overloaded, blocks the mitochondrial trigger of apoptosis, thins bile, and improves insulin signalling.",
   "note": "A library compound placed in the 13:00 drink, thirty minutes before OMAD — the archive’s pre-meal position on the current clock. During the pathogen cleanse it moves to 07:00 as part of the starter triad; the cleanse governs when it runs.",
   "facts": [
    {
     "value": "250 mg",
     "label": "Dose"
    },
    {
     "value": "13:00",
     "label": "Window"
    },
    {
     "value": "L0",
     "label": "Layer"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Chemical Chaperone",
     "summary": "Folding under load.",
     "html": "<p class=\"doc-lede\">A cell under metabolic stress makes proteins faster than its endoplasmic reticulum can fold them. Misfolded proteins accumulate, the unfolded protein response fires, and if it cannot resolve the load, it orders the cell to die. TUDCA stabilises folding and quiets that order.</p><div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>The taurine conjugate of ursodeoxycholic acid: a hydrophilic bile acid, abundant in bear bile, now synthesised. It crosses the blood–brain barrier and has been studied in liver disease, diabetes and neurodegeneration.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Proteins That Hold Their Shape",
     "summary": "The geometry of Layer 0.",
     "html": "<p>The tubulin lattice is a folded-protein lattice. Every coherent structure at Layer 0 assumes that proteins reach and keep their correct geometry. TUDCA’s target is a quiet unfolded-protein response: PERK, IRE1 and ATF6 silent, folding capacity ahead of demand.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">ER stress</h3><span class=\"tag\">L0</span></div>\n  <p>Chaperone action resolves the unfolded protein response.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Mitochondrial shield</h3><span class=\"tag\">L0</span></div>\n  <p>Prevents Bax translocation to mitochondria: the apoptotic trigger stays off.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Insulin</h3><span class=\"tag\">L0</span></div>\n  <p>Reduced ER stress in liver and muscle restores insulin signalling.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Thirty minutes before the meal.",
     "html": "<article class=\"phase\" data-accent=\"green\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Post-Workout</span><h3>Metabolic insurance</h3><p class=\"phase-window\">13:00 · thirty minutes before OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">TUDCA</th><td><span class=\"dose\">250 mg</span></td><td>ER chaperone, Bax, BSEP, JNK</td><td>Resolves ER stress ahead of the nutrient load; thins bile for fat digestion.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">The cleanse’s priming phase uses 250–500 mg at 07:00. When the cleanse runs, follow it.</p>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "Four Protections",
     "summary": "The pathway, step by step.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.1 Folding</h3>\n  <p>TUDCA stabilises protein conformation and reduces aggregation, lowering PERK and IRE1 activation.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.2 Bax gate</h3>\n  <p>It blocks Bax translocation to the mitochondrial membrane, preventing cytochrome c release.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.3 Bile</h3>\n  <p>A hydrophilic bile acid thins bile and activates the bile-salt export pump; biliary drainage improves.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.4 JNK</h3>\n  <p>Inhibition of JNK signalling protects neurons and insulin receptor substrate from stress phosphorylation.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>System</th><th>Mechanism</th><th>Potential benefit</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Brain</th><td>JNK inhibition</td><td>Protection against neuro-inflammation and synaptic loss</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\">Eyes</th><td>Photoreceptor preservation</td><td>Retinal protection from light-induced damage</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Gut</th><td>Tight-junction support</td><td>Barrier integrity</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Metabolism</th><td>Type 2 deiodinase activation in brown fat (animal data)</td><td>More active thyroid hormone (T4 → T3)</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Cellular Decision-Making Fidelity",
     "summary": "TUDCA in the language of the framework.",
     "html": "<p>Apoptosis is a decision. Under ER stress the decision is taken in noise, and healthy cells are lost to a signal meant for broken ones. TUDCA restores the fidelity of that decision. The archive called it the metabolic eraser; in the five-layer reading it is the guardian of protein geometry at Layer 0.</p>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How TUDCA sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>C3G</strong> and <strong>Black Ginger</strong>: partitioning with chaperone cover.</li><li><strong>Taurine</strong> keeps the conjugation pool full.</li><li><strong>Andrographis</strong>: the systemic shield.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Biliary obstruction or acute gallbladder disease: only with a physician.</li><li>Loose stools at higher doses.</li><li>Not a licence for alcohol: protection is not permission.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#c3g\">C3G</a> <a class=\"button\" href=\"#blackginger\">Black Ginger</a> <a class=\"button\" href=\"#taurine\">Taurine</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "injuv",
   "name": "Injuv®",
   "aliases": [
    "Injuv",
    "Low-MW hyaluronic acid",
    "hyaluronan"
   ],
   "case": false,
   "stratum": "extract",
   "group": "matrix",
   "kicker": "Deep hydration / ECM",
   "standard": "Low-molecular-weight hyaluronic acid",
   "bullets": [
    "Low-MW hyaluronan absorbed through the intestine.",
    "Replenishes dermal matrix, synovial fluid and vitreous humour.",
    "Signals CD44 and wakes endogenous HAS2."
   ],
   "field": "Internal blue balm — the structural water layer of the extracellular matrix, through which the biophotonic field propagates.",
   "motto": "The hydration matrix",
   "category": "Deep hydration · matrix",
   "accent": "blue",
   "layers": [
    0,
    3
   ],
   "dose": "70–140 mg",
   "window": "13:30–15:00 · OMAD",
   "inProtocol": true,
   "subtitle": "Low-molecular-weight hyaluronic acid: absorbed oligomers that signal CD44, wake endogenous HAS2 and hydrate skin, joint, fascia and the neural matrix",
   "description": "Injuv’s enzymatically sheared hyaluronan is small enough to be absorbed and signals the body to build its own: the hydrated, structured-water matrix of skin, joints and the brain.",
   "note": "Injuv is carried by the Protocol with OMAD at 70–140 mg. The archive’s morning fasted placement is superseded.",
   "facts": [
    {
     "value": "70–140 mg",
     "label": "Dose"
    },
    {
     "value": "OMAD",
     "label": "Window"
    },
    {
     "value": "L0 · L3",
     "label": "Layers"
    },
    {
     "value": "Daily",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Hydration Matrix",
     "summary": "Small enough to be a signal.",
     "html": "<p class=\"doc-lede\">Most oral hyaluronic acid is too large to cross the gut and acts as fibre. Injuv is sheared enzymatically into oligomers small enough to be absorbed, and at that size hyaluronan stops being bulk and becomes a message: build more.</p><div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p>Low-molecular-weight hyaluronic acid derived from rooster comb, standardized for oral absorption. Hyaluronan is the polysaccharide backbone of skin dermis, synovial fluid, vitreous humour — and of the brain’s extracellular matrix, which contains almost no fibrillar collagen.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Water, Structured",
     "summary": "The aqueous architecture of the matrix.",
     "html": "<div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Dermis and joint</h3><span class=\"tag\">L0</span></div>\n  <p>Replenishes glycosaminoglycans; restores synovial viscosity.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Neural matrix</h3><span class=\"tag\">L0</span></div>\n  <p>Hyaluronan is the backbone of perineuronal nets, which decide when a circuit is plastic and when it locks a memory.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Structured water</h3><span class=\"tag\">L3</span></div>\n  <p>Hyaluronan binds a thousand times its weight in water, ordering it into a hydration jacket around fibres and chromatin.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "With the meal, as the Protocol writes it.",
     "html": "<article class=\"phase\" data-accent=\"green\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 2</span><h3>The longevity meal</h3><p class=\"phase-window\">13:30–15:00 · OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> The meal: raw animal fat and protein</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\">Injuv® (low-MW HA)</th><td><span class=\"dose\">70–140 mg</span></td><td>CD44, RHAMM, HAS2, HAS3</td><td>1–5 kDa hyaluronan oligomers; stimulates endogenous HAS2; fascial and nuclear exclusion-zone hydration.</td></tr>\n</tbody></table></div>\n</article>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "From Oligomer to Matrix",
     "summary": "The pathway, step by step.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">3.1 Absorption</h3>\n  <p>Low-molecular-weight hyaluronan is taken up in the gut and distributed to skin and joints in tracer studies.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">3.2 CD44</h3>\n  <p>Oligomers bind CD44 on fibroblasts and fasciacytes, activating FAK/ERK signalling.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.3 HAS2</h3>\n  <p>Transcription of HAS2 and HAS3 rises: the body builds its own high-molecular-weight hyaluronan.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.4 Microglia</h3>\n  <p>In the brain, CD44 signalling on astrocytes and microglia moderates inflammatory activation.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Subjective outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Neural matrix</th><td>Perineuronal net backbone</td><td>Stabilised new memory pathways</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\">Blood–brain barrier</th><td>Microglial modulation</td><td>Less brain fog</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\">Skin</th><td>GAG replenishment</td><td>Plumpness; hydration from inside</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\">Joints</th><td>Synovial viscosity</td><td>Smoother articulation</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Internal Balm",
     "summary": "Injuv in the language of the framework.",
     "html": "<p>The biophotonic field does not propagate through dry matter. It propagates through hydrated, ordered tissue — structured water around fibres, around membranes, around chromatin. Injuv sustains that aqueous architecture: the structural water layer of the field.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Bricks and mortar: collagen gives the bricks, Injuv the mortar. Users report an inner glow after two to four weeks, attributed to how light travels through a re-hydrated dermis.</p></div><div class=\"plain\" data-accent=\"blue\"><p class=\"plain-title\">Field note</p><p>Used after heavy stress or physical sparring to “soften” the brain’s shock-absorbing gel and clear the heavy-headed feeling.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How Injuv sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"blue\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>Gotu kola</strong>: collagen built into a hydrated matrix.</li><li><strong>Glycine</strong>: the residue of the bricks.</li><li><strong>Astaxanthin</strong> guards the new matrix from oxidation.</li><li>Topical GHK-Cu: the signal from outside, the substrate from inside.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Avian protein allergy: avoid.</li><li>Very well tolerated otherwise.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#gotukola\">Gotu kola</a> <a class=\"button\" href=\"#astaxanthin\">Astaxanthin</a> <a class=\"button\" href=\"#erinamax\">ErinaMAX</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "ashwagandha",
   "name": "Ashwagandha",
   "aliases": [
    "Ashwagandha",
    "KSM-66",
    "Withania somnifera"
   ],
   "case": false,
   "stratum": "extract",
   "group": "drive",
   "kicker": "Grounding shield / HPA",
   "standard": "KSM-66 — 5% withanolides",
   "bullets": [
    "Systemic HPA-axis cortisol modulation — the stress-load dampener.",
    "Supports the DHEA and testosterone baseline.",
    "GABA-mimetic activity for deep recovery and sleep."
   ],
   "field": "The biological shock absorber for high-androgen protocols — prevents temporal decoherence from cortisol-driven oscillator disruption.",
   "motto": "The grounding wire",
   "category": "Grounding · HPA axis",
   "accent": "amber",
   "layers": [
    1
   ],
   "dose": "300–600 mg",
   "window": "14:00 · OMAD",
   "inProtocol": false,
   "subtitle": "KSM-66 root extract, 5% withanolides: cortisol rhythm, androgen floor, thyroid conversion and the afternoon anchor of sleep",
   "description": "Ashwagandha raises the floor of stress tolerance: cortisol output falls, testosterone and DHEA hold, and the evening is cleared for sleep when it is taken six hours ahead.",
   "note": "A library compound placed at 14:00, inside the OMAD window — six hours before the first sleep, as the sleep architecture requires. Taken at bedtime it can carry a mild stimulating edge that disturbs sleep onset.",
   "facts": [
    {
     "value": "300–600 mg",
     "label": "Dose"
    },
    {
     "value": "14:00",
     "label": "Window"
    },
    {
     "value": "L1",
     "label": "Layer"
    },
    {
     "value": "8 on / 2 off wk",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Grounding Wire",
     "summary": "A shock absorber for the HPA axis.",
     "html": "<p class=\"doc-lede\">A high-drive protocol makes demands on the stress axis every day. Ashwagandha does not block the response; it raises the floor beneath it, so that the same load produces less cortisol and the cortisol curve keeps its shape — high in the morning, low at night.</p><div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Withania somnifera</em> root extract, KSM-66, standardized to 5% withanolides. Randomized trials at 300–600 mg show lower serum cortisol, lower perceived stress, better sleep and modest rises in testosterone.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "The Cortisol Rhythm",
     "summary": "Layer 1, protected.",
     "html": "<p>Cortisol is not the enemy; a flat cortisol curve is. The framework names a continuously elevated, flattened cortisol profile as the signature of trauma encoded in the field. The target is amplitude: a clean morning peak and a quiet evening floor.</p><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">HPA axis</h3><span class=\"tag\">L1</span></div>\n  <p>Lower cortisol output under load; a restored curve.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Androgen floor</h3><span class=\"tag\">L1</span></div>\n  <p>Supports DHEA and testosterone; the cortisol-to-testosterone ratio improves.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">GABA mimicry</h3><span class=\"tag\">L1</span></div>\n  <p>Withanolides act at GABA-A sites: groundedness and deeper recovery.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Six hours before the first sleep.",
     "html": "<article class=\"phase\" data-accent=\"amber\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">T − 6 h</span><h3>The cortisol floor</h3><p class=\"phase-window\">14:00 · inside the OMAD window</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> With the meal</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">Ashwagandha (KSM-66)</th><td><span class=\"dose\">300–600 mg</span></td><td>HPA axis, GABA-A, steroidogenesis</td><td>Clears the day’s cortisol accumulation ahead of the evening.</td></tr>\n</tbody></table></div>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"amber\">Cadence</th><td>8 weeks on, 2 weeks off</td><td>Keeps thyroid and hormonal effects observable.</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Not at bedtime</th><td>Move to 14:00</td><td>A mild cholinergic lift at night can delay sleep.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The Withanolide Engine",
     "summary": "The pathway, step by step.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.1 HPA modulation</h3>\n  <p>Withanolides dampen hypothalamic CRH and pituitary ACTH responses; adrenal cortisol output falls.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.2 GABA-A</h3>\n  <p>GABA-mimetic action at the receptor promotes calm and sleep quality.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">3.3 Steroidogenesis</h3>\n  <p>With less cortisol competing for precursors and less HPA suppression of the gonadal axis, testosterone and DHEA hold.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.4 Thyroid</h3>\n  <p>T4 and T3 rise in trials: support for conversion, and a reason for caution in hyperthyroidism.</p>\n</div>\n</div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Target</th><th>Mechanism</th><th>Subjective outcome</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"amber\">HPA axis</th><td>Cortisol suppression and regulation</td><td>Less social friction and anxiety</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Endocrine</th><td>DHEA and testosterone support</td><td>Recovery; androgenic drive</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">GABA</th><td>GABA-mimetic</td><td>Restorative sleep; groundedness</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "The Shock Absorber",
     "summary": "Ashwagandha in the language of the framework.",
     "html": "<p>Acute stress is a controlled, self-correcting decoherence event; recovery restores phase within hours. The danger is when recovery does not come and the emergency configuration becomes the resting state. Ashwagandha keeps recovery coming. It is the grounding wire of the high-androgen stack: drive that does not become irritability, intensity that does not become a flattened curve.</p>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How Ashwagandha sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>TRIBUGEN</strong>: drive with a healthy cortisol-to-testosterone ratio.</li><li><strong>CistaMAX</strong>: anabolic signals in low metabolic resistance.</li><li><strong>TUDCA</strong>: thyroid conversion from two angles.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>Hyperthyroidism and thyroid medication: monitor or avoid.</li><li>Autoimmune disease: discuss with the specialist.</li><li>Rare liver injury reports: stop at any sign.</li><li>Pregnancy: avoid. Sedatives: additive.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#sleep\">Sleep architecture</a> <a class=\"button\" href=\"#tribugen\">TRIBUGEN</a> <a class=\"button\" href=\"#panamax\">PanaMAX</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  },
  {
   "slug": "panamax",
   "name": "PanaMAX™",
   "aliases": [
    "PanaMAX"
   ],
   "case": false,
   "stratum": "extract",
   "group": "drive",
   "kicker": "Energy / adaptogen",
   "standard": "Panax ginseng root + leaf — Schisandra complex",
   "bullets": [
    "Balanced root and leaf ginsenosides for full-spectrum action.",
    "Schisandra-driven bioavailability and hepatoprotection.",
    "Cortisol regulation and HPA-axis resilience."
   ],
   "field": "Stress-proof focus architecture — smooths stimulant jitter; the sustained throughput of a calibrated operator.",
   "motto": "The stress-proof operator",
   "category": "Energy · adaptogen",
   "accent": "teal",
   "layers": [
    1,
    2
   ],
   "dose": "1 capsule",
   "window": "11:00 · Pre-workout drink",
   "inProtocol": false,
   "subtitle": "Panax ginseng root and leaf with Schisandra: balanced ginsenosides, bioavailability unlocked, HPA resilience without stimulant jitter",
   "description": "PanaMAX pairs calming root and lifting leaf ginsenosides and uses Schisandra to make them bioavailable: steady throughput under pressure.",
   "note": "A library compound for high-demand weeks, placed in the 11:00 drink. Schisandra inhibits CYP3A4, the enzyme that clears tadalafil: on PanaMAX days, use the low end of the Protocol’s tadalafil range or skip it.",
   "facts": [
    {
     "value": "1 cap",
     "label": "Dose"
    },
    {
     "value": "11:00",
     "label": "Window"
    },
    {
     "value": "L1 · L2",
     "label": "Layers"
    },
    {
     "value": "In cycles",
     "label": "Cadence"
    }
   ],
   "sections": [
    {
     "id": "overview",
     "label": "Overview",
     "title": "The Stress-Proof Operator",
     "summary": "Root, leaf and the berry that unlocks them.",
     "html": "<p class=\"doc-lede\">Ginsenosides are notoriously hard to absorb, and root and leaf carry different ones. PanaMAX takes both and adds Schisandra, whose lignans keep the gut and liver from destroying them first. The result is a long, even throughput that does not end in a crash.</p><div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Identity</h3>\n  <p><em>Panax ginseng</em> root (40% ginsenosides), <em>Panax ginseng</em> leaf (7% ginsenosides) and <em>Schisandra chinensis</em> (3% schisandrins). Nootropics Depot formulation.</p>\n</div>"
    },
    {
     "id": "objective",
     "label": "Biophysical Objective",
     "title": "Throughput Under Pressure",
     "summary": "The calibrated operator.",
     "html": "<div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">HPA regulation</h3><span class=\"tag\">L1</span></div>\n  <p>Moderates the cortisol response to acute stress.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Nitric oxide</h3><span class=\"tag\">L2</span></div>\n  <p>Improves blood flow and oxygen delivery: clean wakefulness.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Neuroprotection</h3><span class=\"tag\">L2</span></div>\n  <p>Lower oxidative stress in hippocampal neurons; memory under fatigue.</p>\n</div>\n</div>"
    },
    {
     "id": "parameters",
     "label": "Exact Parameters",
     "title": "Dose, Window and Vehicle",
     "summary": "Morning, fasted, in cycles.",
     "html": "<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Pre-Workout</span><h3>Stress shield</h3><p class=\"phase-window\">11:00 · fasted</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Operational role</th></tr></thead><tbody>\n<tr><th scope=\"row\">PanaMAX™</th><td><span class=\"dose\">1 capsule</span></td><td>HPA axis, eNOS, hippocampus</td><td>CNS activation with HPA shielding for the working day.</td></tr>\n<tr class=\"triad\"><th scope=\"row\">The Protocol’s pre-workout drink</th><td><span class=\"dose\">Protocol doses</span></td><td>See the Protocol: L-Citrulline, ALCAR, Na-R-ALA, Tadalafil</td><td>Tadalafil at the low end on PanaMAX days.</td></tr>\n</tbody></table></div>\n</article><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Parameter</th><th>Value</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"teal\">Cadence</th><td>In cycles: 3–6 weeks on, 1–2 off; or during high-stress weeks</td><td>Adaptogens keep their effect when used against load.</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Tadalafil</th><td>Low end or skip on PanaMAX days</td><td>Schisandra slows its clearance through CYP3A4.</td></tr>\n</tbody></table>\n</div>"
    },
    {
     "id": "mechanism",
     "label": "Mechanism of Action",
     "title": "The Three-Way Synergy",
     "summary": "Who does what.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">3.1 Root</h3>\n  <p>Rb-group ginsenosides: the calming, restorative foundation.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">3.2 Leaf</h3>\n  <p>Re- and Rg-group ginsenosides: the immediate lift.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <h3 class=\"card-kicker\">3.3 Schisandra</h3>\n  <p>Schisandrins inhibit CYP3A4 and P-glycoprotein in gut and liver, raising ginsenoside bioavailability and duration — and that of other drugs cleared the same way.</p>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">3.4 HPA</h3>\n  <p>Ginsenosides modulate glucocorticoid signalling and HPA feedback: pressure without panic.</p>\n</div>\n</div>"
    },
    {
     "id": "coherence",
     "label": "The Coherence Reading",
     "title": "Stimulant Smoothing",
     "summary": "PanaMAX in the language of the framework.",
     "html": "<p>Excitation borrowed from tomorrow’s reserve is decoherence on credit. PanaMAX does the opposite: it widens the range of load over which the stress oscillator returns cleanly to baseline. The archive called it stress-proof focus architecture — the sustained throughput of a calibrated operator.</p><div class=\"plain\" data-accent=\"violet\"><p class=\"plain-title\">Field note</p><p>Users report a baseline shift — long weeks that do not end in burnout by Friday — rather than a daily spike.</p></div>"
    },
    {
     "id": "nuance",
     "label": "Execution Nuance",
     "title": "Synergies, Limits and Order",
     "summary": "How PanaMAX sits beside the rest of the library.",
     "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Synergy</h3>\n  <ul class=\"list\"><li><strong>TRIBUGEN</strong>: calm, dominant confidence.</li><li><strong>ErinaMAX</strong>: the morning NGF loading.</li><li><strong>CistaMAX</strong>: the brain–body stack.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <h3 class=\"card-kicker\">Limits</h3>\n  <ul class=\"list\"><li>CYP3A4 drugs, including tadalafil: Schisandra raises their levels.</li><li>Warfarin and anticoagulants: ginseng interacts.</li><li>Diabetes medication: additive glucose lowering.</li><li>Insomnia if taken late.</li></ul>\n</div>\n</div><p class=\"cmp-links\"><a class=\"button\" href=\"#tribugen\">TRIBUGEN</a> <a class=\"button\" href=\"#erinamax\">ErinaMAX</a> <a class=\"button\" href=\"#ashwagandha\">Ashwagandha</a> <a class=\"button\" href=\"#register\">All compounds</a></p>"
    }
   ]
  }
 ]
};

window.SC_DOCUMENTS = (window.SC_DOCUMENTS || []).concat([{
 "id": "regenesis-compound-library",
 "title": "The Regenesis Compound Library",
 "subtitle": "Substrate architecture and standardized extracts for the re-crystallization of the biological time crystal",
 "category": "protocol",
 "type": "Compound library",
 "version": "1.1",
 "date": "2026-10-08",
 "tone": "teal",
 "description": "Twenty-three compounds and the sleep architecture, read through the five-layer time-crystalline hierarchy and placed on the Protocol’s day: foundational substrate, standardized extracts, synergy, interactions and the register.",
 "note": "This library records the compounds the author uses around the Protocol and their placement on its day. Compounds already in the Protocol keep the Protocol’s doses and windows. Each monograph follows the same order: biophysical objective, exact parameters, mechanism of action, the coherence reading, and execution nuance.",
 "facts": [
  {
   "value": "23",
   "label": "Compounds"
  },
  {
   "value": "L0–L4",
   "label": "Nested layers"
  },
  {
   "value": "2",
   "label": "Strata"
  },
  {
   "value": "4",
   "label": "Daily windows"
  }
 ],
 "kind": "document",
 "sections": [
  {
   "id": "overview",
   "num": "0",
   "label": "Overview",
   "title": "The Compound Library",
   "summary": "",
   "html": "<p class=\"doc-lede\">Health is not the absence of disease. It is the active maintenance of phase-lock fidelity across the body’s nested oscillatory hierarchy. The compounds catalogued here are not drugs for symptoms. They are coherence inputs: substrate the time crystal is built from, and signals that re-anchor oscillators that have drifted.</p><div class=\"card-grid cols-3 doc-index\"><a class=\"card index-card\" href=\"#doctrine\" data-accent=\"green\"><span class=\"index-num\">01</span><h3>The Coherence Hypothesis</h3><p>The five nested layers, the three pillars, and where a compound enters the loop.</p></a><a class=\"card index-card\" href=\"#foundations\" data-accent=\"green\"><span class=\"index-num\">02</span><h3>Layer Zero · Substrate</h3><p>Glycine, Taurine, TMG, Creatine, OAKG and the sleep architecture: the ground state.</p></a><a class=\"card index-card\" href=\"#extracts\" data-accent=\"teal\"><span class=\"index-num\">03</span><h3>Standardized Extracts</h3><p>Seventeen botanical and marine signals, grouped by what they restore.</p></a><a class=\"card index-card\" href=\"#master-protocol\" data-accent=\"amber\"><span class=\"index-num\">04</span><h3>The Day</h3><p>Every compound on the Protocol’s windows: 11:00, 13:00, OMAD and the evening reset.</p></a><a class=\"card index-card\" href=\"#synergy\" data-accent=\"violet\"><span class=\"index-num\">05</span><h3>Synergy &amp; Nuance</h3><p>What unlocks what, the interactions with the Protocol, and the rules of cycling.</p></a><a class=\"card index-card\" href=\"#register\" data-accent=\"rose\"><span class=\"index-num\">06</span><h3>The Register</h3><p>Every compound in one table: function, layers, window, dose and stratum.</p></a></div>"
  },
  {
   "id": "doctrine",
   "num": "1",
   "label": "The Coherence Hypothesis",
   "title": "Coherence Inputs for a Time-Crystalline Body",
   "summary": "Why a supplement is read by the layer it acts on, not by the symptom it touches.",
   "html": "<p>A living system is not like a time crystal; it is one. Its order is expressed in time — in oscillators that keep their phase against thermal noise — as rigorously as a quartz lattice expresses order in space. Disease is the loss of that phase, propagating upward from the intracellular substrate. Regeneration is not chemical correction. It is re-crystallization: giving the organism the conditions under which it re-establishes its own coherent ground state.</p><h3 class=\"sub-head\">The five nested layers</h3><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Layer</th><th>What oscillates</th><th>Compounds that act here</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"green\">L0 · The intracellular substrate</th><td>Microtubule lattice, mitochondria, membranes and the matrix they sit in</td><td><a href=\"#glycine\">Glycine</a>, <a href=\"#taurine\">Taurine</a>, <a href=\"#tmg\">TMG</a>, <a href=\"#creatine\">Creatine</a>, <a href=\"#oakg\">OAKG</a>, <a href=\"#erinamax\">ErinaMAX™</a>, <a href=\"#gotukola\">Gotu kola</a>, <a href=\"#blackginger\">Black Ginger</a>, <a href=\"#cistamax\">CistaMAX™</a>, <a href=\"#c3g\">C3G</a>, <a href=\"#andrographis\">Andrographis</a>, <a href=\"#astaxanthin\">Astaxanthin</a>, <a href=\"#nigella\">Nigella sativa</a>, <a href=\"#tudca\">TUDCA</a>, <a href=\"#injuv\">Injuv®</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">L1 · The molecular clock</th><td>CLOCK/BMAL1, ultradian hormone pulses, the NF-κB and HPA rhythms</td><td><a href=\"#glycine\">Glycine</a>, <a href=\"#tmg\">TMG</a>, <a href=\"#sleep\">Sleep Architecture</a>, <a href=\"#ecklonia\">Ecklonia cava</a>, <a href=\"#tribugen\">TRIBUGEN™</a>, <a href=\"#cistamax\">CistaMAX™</a>, <a href=\"#andrographis\">Andrographis</a>, <a href=\"#ashwagandha\">Ashwagandha</a>, <a href=\"#panamax\">PanaMAX™</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\">L2 · The cellular network</th><td>Gap junctions, synapses, receptor fields and bioelectric coupling</td><td><a href=\"#taurine\">Taurine</a>, <a href=\"#oakg\">OAKG</a>, <a href=\"#erinamax\">ErinaMAX™</a>, <a href=\"#cognance\">Cognance™</a>, <a href=\"#ecklonia\">Ecklonia cava</a>, <a href=\"#gotukola\">Gotu kola</a>, <a href=\"#agmatine\">Agmatine sulfate</a>, <a href=\"#saffron\">Saffron</a>, <a href=\"#tribugen\">TRIBUGEN™</a>, <a href=\"#blackginger\">Black Ginger</a>, <a href=\"#nigella\">Nigella sativa</a>, <a href=\"#panamax\">PanaMAX™</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\">L3 · The organismic field</th><td>Biophotonic emission, phase memory, structured water and long-range coherence</td><td><a href=\"#cognance\">Cognance™</a>, <a href=\"#astaxanthin\">Astaxanthin</a>, <a href=\"#injuv\">Injuv®</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\">L4 · The chronobiological interface</th><td>Retina, melanopsin, the solar day and the geomagnetic envelope</td><td><a href=\"#sleep\">Sleep Architecture</a>, <a href=\"#saffron\">Saffron</a>, <a href=\"#c3g\">C3G</a>, <a href=\"#astaxanthin\">Astaxanthin</a></td></tr>\n</tbody></table>\n</div><div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Phase-lock, measured</h3>\n  <p>Coherence at any one layer has a precise meaning: the degree to which a population of oscillators shares a phase. For N oscillators with phases θ<sub>j</sub>, the Kuramoto order parameter is</p><div class=\"formula\">$$r\\,e^{i\\psi} = \\frac{1}{N}\\sum_{j=1}^{N} e^{i\\theta_j}, \\qquad 0 \\le r \\le 1$$</div><p>r = 0 is noise; r = 1 is a single voice. Above a critical coupling strength, coupled oscillators lock spontaneously. A coherence input either strengthens coupling or removes the noise that holds r down. The opening picture of this page draws exactly that.</p>\n</div><h3 class=\"sub-head\">The three pillars</h3><div class=\"card-grid cols-3\">\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">I · Purity</h3><span class=\"tag\">Substrate integrity</span></div>\n  <p>Lower the noise floor. Inputs are chosen for their active architecture: liquid-culture mycelium over grain-grown, supercritical CO₂ over solvent, standardized markers over vague totals. Thermal damage above 42 °C is a disqualifier for food and a question to ask of every extract.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">II · Rhythm</h3><span class=\"tag\">Temporal precision</span></div>\n  <p>The dose is the rhythm. Each compound is timed to its window — fasted before training, after training, with the fat of the meal, or in the descent to sleep — and cycled so that receptor fields do not flatten.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">III · Resonance</h3><span class=\"tag\">Field integration</span></div>\n  <p>The target state is self-sustaining oscillation across all five layers, phase-locked to the solar day. Compounds serve that state; light, sleep, raw substrate, cold and movement build it.</p>\n</div>\n</div><div class=\"card\" data-accent=\"green\">\n  <h3 class=\"card-kicker\">Substrate before signal</h3>\n  <p>The coherence feedback loop runs substrate → membrane composition → lattice coherence → biophotonic field → repair fidelity → membrane composition, and it has no stable middle: it is always moving toward more coherence or less. No signal downstream of the substrate can hold the loop on the right side while the substrate keeps degrading it. That is why the library has two strata, and why Layer Zero comes first.</p>\n</div>"
  },
  {
   "id": "foundations",
   "num": "2",
   "label": "Layer Zero",
   "title": "Substrate Architecture",
   "summary": "Amino acids, methyl donors, energy cofactors and the nightly update: the preconditions for every other input.",
   "html": "<p>Before any extract can exert its effect, the substrate must be intact. A methylation deficit, a glycine shortage or a depleted creatine pool creates noise no extract can overcome. These are not interventions; they are the preconditions for intervention — permanent daily inputs, carried by the day’s windows rather than timed to acute ones.</p><div class=\"cmp-grid\" data-stratum=\"foundation\"></div><h3 class=\"sub-head\">The substrate synergy map</h3><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Compound</th><th>Role in the architecture</th><th>Unlocks</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"green\"><a href=\"#glycine\">Glycine</a></th><td>Structural matrix: the collagen scaffold; methionine buffering; Phase II conjugation.</td><td><a href=\"#gotukola\">Gotu kola</a>, <a href=\"#erinamax\">ErinaMAX™</a>, <a href=\"#injuv\">Injuv®</a>, <a href=\"#tmg\">TMG</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\"><a href=\"#taurine\">Taurine</a></th><td>Cellular stabiliser: cell volume, mitochondrial translation, inhibitory tone, bile.</td><td><a href=\"#ashwagandha\">Ashwagandha</a>, <a href=\"#tudca\">TUDCA</a>, <a href=\"#astaxanthin\">Astaxanthin</a>, <a href=\"#c3g\">C3G</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\"><a href=\"#tmg\">TMG</a></th><td>Methylation sentinel: homocysteine recycled, SAM spared for the epigenome.</td><td><a href=\"#glycine\">Glycine</a>, <a href=\"#creatine\">Creatine</a>, <a href=\"#saffron\">Saffron</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"green\"><a href=\"#creatine\">Creatine</a></th><td>ATP buffer: instantaneous energy for the coherence machinery.</td><td><a href=\"#blackginger\">Black Ginger</a>, <a href=\"#tribugen\">TRIBUGEN™</a>, <a href=\"#erinamax\">ErinaMAX™</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\"><a href=\"#oakg\">OAKG</a></th><td>Ammonia scavenger: the protein engine’s exhaust removed; TCA refilled.</td><td><a href=\"#agmatine\">Agmatine sulfate</a>, <a href=\"#ecklonia\">Ecklonia cava</a>, <a href=\"#glycine\">Glycine</a></td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\"><a href=\"#sleep\">Sleep Architecture</a></th><td>The master update cycle: where the day is consolidated or discarded.</td><td>Every compound</td></tr>\n</tbody></table>\n</div>"
  },
  {
   "id": "extracts",
   "num": "3",
   "label": "Standardized Extracts",
   "title": "The Signal Layer",
   "summary": "Seventeen botanical and marine coherence inputs, grouped by what they restore.",
   "html": "<p>Extracts deliver signalling molecules at a concentration food does not reach: nerve growth factor induction, androgen-receptor sensitivity, membrane-spanning antioxidant cover, nutrient partitioning. Each one is read by its layer and placed by its mechanism. Open any card for its full monograph: objective, parameters, mechanism, coherence reading and nuance.</p><div class=\"cmp-filter\" role=\"group\" aria-label=\"Filter by function\"></div><div class=\"cmp-grid\" data-stratum=\"extract\"></div>"
  },
  {
   "id": "master-protocol",
   "num": "4",
   "label": "The Day",
   "title": "Placement on the Protocol Day",
   "summary": "Four windows on the Temporal Matrix clock, each carrying the compounds its physiology calls for.",
   "html": "<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">The day the library lives in</h3>\n  <p>The archive timed these compounds to a day that no longer exists: fasted morning at 06:00, pre-meal at 12:00, post-meal evening at 19:00. The current day is the Protocol’s — anchored to the sun on the Temporal Matrix clock, with training at 11:00, one meal at 13:30 and no food after 15:00. Every compound is placed here in the window that matches its mechanism. Rows marked as the Protocol’s keep the Protocol’s own doses; the others are the library’s.</p>\n</div>\n<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Pre-Workout</span><h3>Pre-workout drink · Neural loading</h3><p class=\"phase-window\">11:00 · Pre-workout drink</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> fasted · 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Role</th></tr></thead><tbody>\n<tr><th scope=\"row\"><a href=\"#erinamax\">ErinaMAX™</a></th><td><span class=\"dose\">500 mg</span></td><td>NGF / TrkA</td><td>The growth signal.</td></tr>\n<tr><th scope=\"row\"><a href=\"#cognance\">Cognance™</a></th><td><span class=\"dose\">100 mg</span></td><td>5-HT2A, M1</td><td>The creative catalyst.</td></tr>\n<tr><th scope=\"row\"><a href=\"#tribugen\">TRIBUGEN™</a></th><td><span class=\"dose\">1 capsule</span></td><td>Androgen receptor, motor units</td><td>The drive matrix.</td></tr>\n<tr><th scope=\"row\"><a href=\"#panamax\">PanaMAX™</a></th><td><span class=\"dose\">1 capsule</span></td><td>HPA axis, eNOS</td><td>The stress-proof operator.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Water only, fasted, before training. The Protocol’s own drink (L-Citrulline, ALCAR, Na-R-ALA, Tadalafil) is unchanged; these ride with it on the days they are used.</p>\n</article>\n<article class=\"phase\" data-accent=\"teal\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Post-Workout</span><h3>Post-workout drink · Substrate and pre-meal priming</h3><p class=\"phase-window\">13:00 · Post-workout drink</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> immediately after training · 500–750 mL fresh water only</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#creatine\">Creatine</a></th><td><span class=\"dose\">5000 mg</span></td><td>CK, CreaT, PCr pool</td><td>The oscillator buffer · the Protocol’s.</td></tr>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#tmg\">TMG</a></th><td><span class=\"dose\">1500–2500 mg</span></td><td>BHMT, SAMe</td><td>The methylation sentinel · the Protocol’s.</td></tr>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#glycine\">Glycine</a></th><td><span class=\"dose\">3000–5000 mg</span></td><td>Glutathione, collagen</td><td>The structural anchor · the Protocol’s.</td></tr>\n<tr><th scope=\"row\"><a href=\"#taurine\">Taurine</a></th><td><span class=\"dose\">1000–3000 mg</span></td><td>TauT, bile conjugation</td><td>The cellular stabilizer.</td></tr>\n<tr><th scope=\"row\"><a href=\"#oakg\">OAKG</a></th><td><span class=\"dose\">1000–3000 mg</span></td><td>Urea cycle, TCA</td><td>The signal clarifier.</td></tr>\n<tr><th scope=\"row\"><a href=\"#tudca\">TUDCA</a></th><td><span class=\"dose\">250 mg</span></td><td>ER chaperone, BSEP</td><td>The chemical chaperone.</td></tr>\n<tr><th scope=\"row\"><a href=\"#blackginger\">Black Ginger</a></th><td><span class=\"dose\">100 mg</span></td><td>AMPK, PDE5 · off-tadalafil days only</td><td>The infinite gas tank.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Thirty minutes before OMAD: the substrate layer is refilled and the gut, liver and urea cycle are primed for the meal.</p>\n</article>\n<article class=\"phase\" data-accent=\"green\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 2</span><h3>OMAD · With the fat of the meal</h3><p class=\"phase-window\">13:30–15:00 · OMAD</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> the one meal · raw animal fat and protein</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#astaxanthin\">Astaxanthin</a></th><td><span class=\"dose\">6–12 mg</span></td><td>Lipid bilayer, IKKβ</td><td>The red sentinel · the Protocol’s.</td></tr>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#injuv\">Injuv®</a></th><td><span class=\"dose\">70–140 mg</span></td><td>CD44, HAS2</td><td>The hydration matrix · the Protocol’s.</td></tr>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#gotukola\">Gotu kola</a></th><td><span class=\"dose\">300–500 mg</span></td><td>TGF-β/Smad, TIMP</td><td>The infrastructure builder · the Protocol’s.</td></tr>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#c3g\">C3G</a></th><td><span class=\"dose\">250–500 mg</span></td><td>Rhodopsin, AMPK</td><td>The keystone polyphenol · the Protocol’s.</td></tr>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#cistamax\">CistaMAX™</a></th><td><span class=\"dose\">250–325 mg</span></td><td>IκBα, NF-κB, SASP</td><td>The calm anabolic · the Protocol’s.</td></tr>\n<tr><th scope=\"row\"><a href=\"#nigella\">Nigella sativa</a></th><td><span class=\"dose\">200 mg</span></td><td>AChE, Nrf2</td><td>The panacea protocol.</td></tr>\n<tr><th scope=\"row\"><a href=\"#ashwagandha\">Ashwagandha</a></th><td><span class=\"dose\">300–600 mg</span></td><td>HPA axis · at 14:00</td><td>The grounding wire.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">The lipophilic compounds ride the meal’s fat. Ashwagandha is taken at 14:00, six hours before the first sleep.</p>\n</article>\n<article class=\"phase\" data-accent=\"violet\">\n  <header class=\"phase-head\">\n    <div><span class=\"phase-num\">Phase 3</span><h3>Evening reset · The descent</h3><p class=\"phase-window\">17:00–20:00 · Evening reset</p></div>\n    <p class=\"phase-vehicle\"><strong>Vehicle</strong> strictly non-caloric · closes into the first sleep at 20:00</p>\n  </header>\n  <div class=\"table-scroll\"><table class=\"data compounds\"><thead><tr><th>Compound</th><th>Dose</th><th>Target</th><th>Role</th></tr></thead><tbody>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#glycine\">Glycine</a></th><td><span class=\"dose\">3000–5000 mg</span></td><td>NMDA glycine site, preoptic area</td><td>The structural anchor · the Protocol’s.</td></tr>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#ecklonia\">Ecklonia cava</a></th><td><span class=\"dose\">100–200 mg</span></td><td>GABA-A benzodiazepine site</td><td>The marine sleep deepener · the Protocol’s.</td></tr>\n<tr class=\"triad\"><th scope=\"row\"><a href=\"#gotukola\">Gotu kola</a></th><td><span class=\"dose\">200–300 mg</span></td><td>Night split · GABA-T</td><td>The infrastructure builder · the Protocol’s.</td></tr>\n<tr><th scope=\"row\"><a href=\"#andrographis\">Andrographis</a></th><td><span class=\"dose\">400 mg</span></td><td>NF-κB · at 18:00</td><td>The metabolic coolant.</td></tr>\n<tr><th scope=\"row\"><a href=\"#saffron\">Saffron</a></th><td><span class=\"dose\">30 mg</span></td><td>Monoamines, NMDA</td><td>The anti-doom molecule.</td></tr>\n<tr><th scope=\"row\"><a href=\"#agmatine\">Agmatine sulfate</a></th><td><span class=\"dose\">250 mg</span></td><td>NMDA, imidazoline · at 19:15</td><td>The receptor reset.</td></tr>\n</tbody></table></div>\n  <p class=\"phase-foot\">Strictly non-caloric. Tauromag®, lemon balm and micro-dose melatonin complete the Protocol’s reset; see Sleep architecture for the order.</p>\n</article>\n<aside class=\"callout\" data-accent=\"amber\"><p>Highlighted rows are carried by the Protocol itself. The rest are library strata: used in blocks, on training days, or in rotation, as each monograph sets out. Nothing here is added to the Protocol’s 07:00 vehicle, which stays isolated to NSI-189 in coconut oil.</p></aside>"
  },
  {
   "id": "synergy",
   "num": "5",
   "label": "Synergy",
   "title": "Synergy Architecture",
   "summary": "Compounds are chosen in pairs and triads that close each other’s gaps.",
   "html": "<div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"teal\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">The neural rebuild</h3><span class=\"tag\">11:00 → OMAD</span></div>\n  <p><a href=\"#erinamax\">ErinaMAX™</a> gives the growth signal, <a href=\"#cognance\">Cognance™</a> biases where it settles, <a href=\"#gotukola\">Gotu kola</a> and <a href=\"#injuv\">Injuv®</a> build and hydrate the matrix new neurites extend into, and <a href=\"#creatine\">Creatine</a> buffers the energy the repair spends.</p>\n</div>\n<div class=\"card\" data-accent=\"amber\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">The partitioning shield</h3><span class=\"tag\">13:00 → OMAD</span></div>\n  <p><a href=\"#c3g\">C3G</a> and <a href=\"#blackginger\">Black Ginger</a> send fuel to muscle and burn it cleanly; <a href=\"#tudca\">TUDCA</a> keeps the endoplasmic reticulum folding under the load; <a href=\"#oakg\">OAKG</a> clears the nitrogen; <a href=\"#taurine\">Taurine</a> defends cell volume through the shift.</p>\n</div>\n<div class=\"card\" data-accent=\"blue\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">The visual clarity triad</h3><span class=\"tag\">L4</span></div>\n  <p><a href=\"#saffron\">Saffron</a> oxygenates the retina, <a href=\"#c3g\">C3G</a> regenerates rhodopsin, <a href=\"#astaxanthin\">Astaxanthin</a> protects the photoreceptors; <a href=\"#taurine\">Taurine</a> is the retina’s own most abundant stabiliser. Layer 4 is where light becomes time.</p>\n</div>\n<div class=\"card\" data-accent=\"rose\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">Drive, grounded</h3><span class=\"tag\">L1</span></div>\n  <p><a href=\"#tribugen\">TRIBUGEN™</a> raises androgen-receptor drive; <a href=\"#panamax\">PanaMAX™</a> and <a href=\"#ashwagandha\">Ashwagandha</a> keep the HPA axis steady beneath it; <a href=\"#cistamax\">CistaMAX™</a> adds a calm growth-hormone pulse; <a href=\"#tmg\">TMG</a> covers the methyl cost.</p>\n</div>\n<div class=\"card\" data-accent=\"green\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">The anti-SASP lock</h3><span class=\"tag\">L0 · L1</span></div>\n  <p><a href=\"#cistamax\">CistaMAX™</a>’s acteoside silences NF-κB upstream; <a href=\"#astaxanthin\">Astaxanthin</a> blocks IKKβ; <a href=\"#gotukola\">Gotu kola</a> caps MMP-9 downstream; <a href=\"#andrographis\">Andrographis</a> cools the cytokines that remain.</p>\n</div>\n<div class=\"card\" data-accent=\"violet\">\n  <div class=\"card-head\"><h3 class=\"card-kicker\">The descent</h3><span class=\"tag\">14:00 → 20:00</span></div>\n  <p><a href=\"#ashwagandha\">Ashwagandha</a> at 14:00, <a href=\"#andrographis\">Andrographis</a> at 18:00, then <a href=\"#glycine\">Glycine</a>, <a href=\"#agmatine\">Agmatine sulfate</a> and <a href=\"#ecklonia\">Ecklonia cava</a> as the circuit breakers. See <a href=\"#sleep\">Sleep Architecture</a>.</p>\n</div>\n</div>"
  },
  {
   "id": "nuance",
   "num": "6",
   "label": "Execution Nuance",
   "title": "Interactions, Cycling and Limits",
   "summary": "The rules that keep a library from becoming noise.",
   "html": "<div class=\"warning\"><h3 class=\"card-kicker\">Interactions with the Protocol</h3><p>Black Ginger is a PDE5 inhibitor: never on the days the 11:00 drink carries tadalafil. PanaMAX’s Schisandra slows the clearance of tadalafil through CYP3A4: use the low end of its range or skip it on PanaMAX days. Agmatine and Saffron act at the NMDA receptor: withhold them on ketamine days. Cognance, Saffron, C3G and TRIBUGEN touch serotonergic or MAO pathways: withhold them for at least 48 hours either side of the entheogenic days of the pulsed strata, as the Protocol does with its own compounds.</p></div><div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Situation</th><th>Compounds to avoid or review</th><th>Reason</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"rose\">SSRIs, SNRIs, MAOIs, lithium</th><td><a href=\"#cognance\">Cognance™</a>, <a href=\"#saffron\">Saffron</a>, <a href=\"#agmatine\">Agmatine sulfate</a>, <a href=\"#c3g\">C3G</a>, <a href=\"#tribugen\">TRIBUGEN™</a></td><td>Serotonergic and monoaminergic overlap.</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Anticoagulants</th><td><a href=\"#nigella\">Nigella sativa</a>, <a href=\"#panamax\">PanaMAX™</a>, <a href=\"#andrographis\">Andrographis</a>, <a href=\"#tribugen\">TRIBUGEN™</a></td><td>Anti-platelet action; ginseng–warfarin interaction.</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Blood-pressure medication</th><td><a href=\"#ecklonia\">Ecklonia cava</a>, <a href=\"#agmatine\">Agmatine sulfate</a>, <a href=\"#blackginger\">Black Ginger</a>, <a href=\"#taurine\">Taurine</a></td><td>Additive lowering.</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Thyroid disease</th><td><a href=\"#ashwagandha\">Ashwagandha</a>, <a href=\"#ecklonia\">Ecklonia cava</a></td><td>T4/T3 changes; iodine content of algae.</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Hormone-sensitive conditions</th><td><a href=\"#tribugen\">TRIBUGEN™</a>, <a href=\"#cistamax\">CistaMAX™</a></td><td>Androgen-receptor drive; DHEA and pregnenolone primers.</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">NGF-sensitive conditions</th><td><a href=\"#erinamax\">ErinaMAX™</a></td><td>Nerve growth factor induction.</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\">Autoimmune disease, immunosuppressants</th><td><a href=\"#andrographis\">Andrographis</a>, <a href=\"#ashwagandha\">Ashwagandha</a></td><td>Immune modulation.</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\">Pregnancy and breastfeeding</th><td>All extracts</td><td>Not studied, or known to be unsafe.</td></tr>\n</tbody></table>\n</div><div class=\"card-grid cols-2\">\n<div class=\"card\" data-accent=\"amber\">\n  <h3 class=\"card-kicker\">Cycling</h3>\n  <ul class=\"list\"><li>Substrate (Glycine, Taurine, TMG, Creatine, OAKG): daily, no cycling.</li><li>Receptor-facing extracts (Cognance, TRIBUGEN): 5 days on, 2 off.</li><li>Rebuild blocks (ErinaMAX): 8–12 weeks, then 2–4 weeks off.</li><li>Adaptogens (Ashwagandha, PanaMAX): in cycles, against load.</li></ul>\n</div>\n<div class=\"card\" data-accent=\"teal\">\n  <h3 class=\"card-kicker\">Introduction</h3>\n  <ul class=\"list\"><li>One new compound at a time, three to five days apart.</li><li>Substrate first, signal second.</li><li>Watch sleep: it is the first readout of whether an input is coherent.</li></ul>\n</div>\n</div><aside class=\"callout\" data-accent=\"amber\"><p>This is the author’s own library, recorded as he uses it. It is not medical advice. Several compounds act on hormones, blood pressure, clotting, thyroid and mood, and interact with medicines. Anyone considering any part of it should do so with a qualified clinician who knows their history.</p></aside>"
  },
  {
   "id": "register",
   "num": "7",
   "label": "The Register",
   "title": "The Register",
   "summary": "Every compound, its function, its layers, its window and its dose.",
   "html": "<div class=\"table-scroll\">\n<table class=\"data\">\n<thead><tr><th>Compound</th><th>Function</th><th>Layers</th><th>Window</th><th>Dose</th><th>Stratum</th></tr></thead><tbody>\n<tr><th scope=\"row\" data-accent=\"green\"><a href=\"#glycine\">Glycine</a></th><td>Structural matrix · collagen</td><td>L0 · L1</td><td>13:00 · Evening reset</td><td>3–5 g × 2</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\"><a href=\"#taurine\">Taurine</a></th><td>Cellular stability · osmolyte</td><td>L0 · L2</td><td>13:00 · Post-workout drink</td><td>1–3 g</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\"><a href=\"#tmg\">TMG</a></th><td>Methylation sentinel</td><td>L0 · L1</td><td>13:00 · Post-workout drink</td><td>1.5–2.5 g</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\"><a href=\"#creatine\">Creatine</a></th><td>ATP buffer · energy system</td><td>L0</td><td>13:00 · Post-workout drink</td><td>5 g</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\"><a href=\"#oakg\">OAKG</a></th><td>Ammonia clearance · TCA</td><td>L0 · L2</td><td>13:00 · Post-workout drink</td><td>1–3 g</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\"><a href=\"#sleep\">Sleep Architecture</a></th><td>Sleep architecture · recovery</td><td>L1 · L4</td><td>14:00 → 20:00</td><td>Sequence</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\"><a href=\"#erinamax\">ErinaMAX™</a></th><td>Neuroplasticity · NGF</td><td>L0 · L2</td><td>11:00 · Pre-workout drink</td><td>500 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\"><a href=\"#cognance\">Cognance™</a></th><td>Creative catalyst · 5-HT2A</td><td>L2 · L3</td><td>11:00 · Pre-workout drink</td><td>100 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\"><a href=\"#ecklonia\">Ecklonia cava</a></th><td>Vascular fluidity · GABA-A</td><td>L2 · L1</td><td>17:00–20:00 · Evening reset</td><td>100–200 mg</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\"><a href=\"#gotukola\">Gotu kola</a></th><td>Neural architecture · collagen</td><td>L0 · L2</td><td>OMAD · Evening reset</td><td>300–500 mg + 200–300 mg</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\"><a href=\"#agmatine\">Agmatine sulfate</a></th><td>Neuromodulator · NOS</td><td>L2</td><td>19:15 · Evening reset</td><td>250 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\"><a href=\"#saffron\">Saffron</a></th><td>Mood · serotonin · vision</td><td>L2 · L4</td><td>Evening reset</td><td>30 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\"><a href=\"#tribugen\">TRIBUGEN™</a></th><td>Androgen drive · dopamine</td><td>L1 · L2</td><td>11:00 · Pre-workout drink</td><td>1 capsule</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\"><a href=\"#blackginger\">Black Ginger</a></th><td>Metabolic · PDE5 · AMPK</td><td>L0 · L2</td><td>13:00 · Post-workout drink</td><td>100 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\"><a href=\"#cistamax\">CistaMAX™</a></th><td>Growth · hormonal · anti-SASP</td><td>L1 · L0</td><td>13:30–15:00 · OMAD</td><td>½–1 capsule</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"violet\"><a href=\"#c3g\">C3G</a></th><td>Partitioning · AMPK · vision</td><td>L0 · L4</td><td>13:30–15:00 · OMAD</td><td>250–500 mg</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\"><a href=\"#andrographis\">Andrographis</a></th><td>Immune sentinel · NF-κB</td><td>L1 · L0</td><td>18:00 · Evening reset</td><td>400 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"rose\"><a href=\"#astaxanthin\">Astaxanthin</a></th><td>Membrane shield · mitochondria</td><td>L0 · L3 · L4</td><td>13:30–15:00 · OMAD</td><td>6–12 mg</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\"><a href=\"#nigella\">Nigella sativa</a></th><td>Cholinergic engine · thymoquinone</td><td>L2 · L0</td><td>OMAD · or 19:15</td><td>200 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"green\"><a href=\"#tudca\">TUDCA</a></th><td>Cytoprotection · ER stress</td><td>L0</td><td>13:00 · Post-workout drink</td><td>250 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"blue\"><a href=\"#injuv\">Injuv®</a></th><td>Deep hydration · matrix</td><td>L0 · L3</td><td>13:30–15:00 · OMAD</td><td>70–140 mg</td><td>Protocol</td></tr>\n<tr><th scope=\"row\" data-accent=\"amber\"><a href=\"#ashwagandha\">Ashwagandha</a></th><td>Grounding · HPA axis</td><td>L1</td><td>14:00 · OMAD</td><td>300–600 mg</td><td>Library</td></tr>\n<tr><th scope=\"row\" data-accent=\"teal\"><a href=\"#panamax\">PanaMAX™</a></th><td>Energy · adaptogen</td><td>L1 · L2</td><td>11:00 · Pre-workout drink</td><td>1 capsule</td><td>Library</td></tr>\n</tbody></table>\n</div>"
  }
 ]
}]);

/* every compound becomes a word the house can explain. A compound already
   defined elsewhere (the glossary, a document's lexicon) keeps that
   definition and gains the link to its monograph instead. */
(function () {
  'use strict';
  var PAGE = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  var HERE = PAGE === 'compounds.html';
  var CODES = ['L0', 'L1', 'L2', 'L3', 'L4'];
  var extra = window.SC_EXTRA_TERMS || [];
  var known = [];
  ((window.SC_GLOSSARY && window.SC_GLOSSARY.terms) || []).concat(extra).forEach(function (t) {
    (t.aliases || [t.term]).forEach(function (a) { known.push([String(a).toLowerCase(), t]); });
  });
  window.SC_COMPOUNDS.compounds.forEach(function (c) {
    var link = [(HERE ? '' : 'compounds.html') + '#' + c.slug, 'Open the monograph'];
    var free = c.aliases.filter(function (a) {
      var hit = known.filter(function (k) { return k[0] === a.toLowerCase(); })[0];
      if (hit && !hit[1].link) hit[1].link = link;
      return !hit;
    });
    if (!free.length) return;
    extra.push({ id: 'compound-' + c.slug, term: c.name, category: 'Compound · ' + c.kicker, aliases: free, 'case': c['case'],
      motto: c.motto.charAt(0).toUpperCase() + c.motto.slice(1), desc: c.description, accent: c.accent,
      meta: c.dose + ' · ' + c.window + ' · ' + c.layers.map(function (n) { return CODES[n]; }).join(' '),
      extra: [['Function', c.category], ['Stratum', c.inProtocol ? 'In the Protocol' : 'The library']], link: link });
  });
  window.SC_EXTRA_TERMS = extra;
})();
