


### Project Memory 1
**Purpose & context**

Xavier is building **Science Coherence**, a design-forward website organized around three branches: **Regenesis** (biological optimization and holistic regeneration), **Cosmos** (biophysics and theoretical systems), and **Ethos** (philosophy of being and harmonious living). The central thesis is that the human body functions as a "biological computer" optimizable through rigorous, evidence-grounded practice across these disciplines.

A governing content constraint applies across all work: copy and content must remain grounded in observable biology and empirically anchored science. Speculative cosmology (dark matter, cosmic microwave background, black holes, holographic principle) is out of scope. Where theoretical extensions appear, they are labeled as "Working Models" to preserve the site's analytical register.

**Current state**

Active development is on `cosmos.html`, a sophisticated page covering cosmological and biological science principles. Sections built or updated include:

- **Cosmological Framework** — four numbered principle cards (recently updated: Principle 01 → Solar Radiation & Photobiology; Principle 03 → Geomagnetic Field & Magnetoreception)
- **Morphogenetic Fields** — a new section exploring bioelectric and biophotonic field coherence, anchored in Michael Levin's bioelectric morphogenetic field work and Fritz-Albert Popp's biophoton coherence measurements; the environmental feedback loop extension is labeled as a Working Model
- **Frequency & Field Theory** — restructured as a "Nested Frequency Hierarchy" building upward from the morphogenetic foundation; biophotons removed (now covered in the morphogenetic section), replaced with a Cardiac EM Field / HRV entry; wave diagram updated to read Cardiac ~1 Hz → Schumann ~7.8 Hz → 40 Hz+

A complete portal page copy document has also been produced covering Hero, Manifesto Strip, Branches, Methodology, Featured Content, Retreat Center, Community, Final CTA, and Footer sections. Featured article titles in the Featured Content section are placeholders pending real published content.

**On the horizon**

- HTML build of the portal page, pending copy approval
- Continued development of `regenesis.html` and `ethos.html` (existing files in the project)

**Key learnings & principles**

- **Empirical anchoring is non-negotiable**: theoretical extensions are acceptable but must be clearly scoped and labeled to preserve the site's analytical credibility
- **Section architecture should build progressively**: new sections should extend prior content rather than reset framing (e.g., Frequency & Field reframed as a hierarchy building on morphogenetic foundations)
- **Redundancy across sections should be actively managed**: when a new section covers a concept in depth, prior sections should be updated to remove overlap and maintain coherence
- **Scientific mechanisms should be specified at the right depth**: Xavier intervenes precisely to scope which mechanisms serve as anchors, avoiding unnecessary technical elaboration

**Approach & patterns**

Xavier works iteratively and concisely — approving proposals with brief confirmations and trusting Claude to execute without further specification. He demonstrates strong conceptual ownership of the theoretical framework and intervenes precisely when needed. The preferred workflow is: Claude reviews existing code/copy first to internalize established tone, register, and architecture before producing anything new.

**Tools & resources**

- Project files located at `/mnt/project/` (HTML files: `index.html`, `regenesis.html`, `cosmos.html`, `ethos.html`)
- Outputs saved to `/mnt/user-data/outputs/`
- Effective file navigation pattern: grep with class name patterns to locate copy-bearing elements, then sed for precise range extraction

---

### Project Memory 2

**Purpose & context**

Xavier (Julien Xavier Steff) is building out a multi-document theoretical framework under the banner of the **Science Coherence Institute**. The work spans two interconnected intellectual projects:

1. **The Ethos of Being** — a theoretical physics/philosophy framework modeling reality as a self-actualizing recursion, formalized in LaTeX and presented via a multi-page website ("Cohera").
2. **Time-Crystalline Biology (TCB)** — a biological extension of the framework, arguing that dietary and environmental decoherence compounds over a lifetime through feedback mechanisms, with implications for regeneration and consciousness.

Both projects are authored works intended for publication and public presentation. Xavier has strong standards for internal consistency, symbolic precision, and prose quality — the original _Ethos of Being_ was rebuilt from scratch after finding a prior AI-assisted draft incoherent and stylistically flat.

**Current state**

- **TCB paper**: At v5 (29 pages, 17 sections), with the most recent addition being §14b — the Coherence Feedback Loop — which formalizes the compounding mechanism via four nodes, two stable attractors, and an epigenetic amplifier across three timescales.
- **TCB website** (`time-crystalline-biology.html`): Fully built as a standalone single-file HTML site using the Cohera design system with a biophotonic teal accent (`#3a9488`). Mirrors the paper's three-axis structure. Recently updated to reference v5 and had two UI elements removed (abstract meta column, keyword tags block).
- **Cosmos page** (`cosmos.html`): Node 05 ("Consciousness as Phase") was recently corrected to establish a rigorous three-tier hierarchy — Consciousness (phase condition, no self-reference required) → Self-Awareness (reflexive closure) → Awakening (coherence equilibrium within a self-aware system) — with strict logical containment (III ⊂ II ⊂ I).
- **Index page** (`index.html`): Notation unified around Λ (coherence selection); Resonant Interconnection section added based on sections 7.1–7.2 of the corrected paper; phase-locking equation finalized as Ω(∆Ψ_A + ∆Ψ_B) ≈ 1.

**On the horizon**

- `ethos.html` was queued for the next round of changes at the end of one session.
- The Cosmos and Regenesis pages exist but were deemed not yet ready for navigation-level linking.
- Ongoing expansion of both the TCB and Ethos websites as the framework develops.

**Key learnings & principles**

- **Website is the authoritative source** for notation decisions, not the PDF. When the PDF and site conflict, the site wins and the PDF is updated to match.
- **Symbolic precision is non-negotiable**: Λ (not Σ) for coherence selection; Ω(∆Ψ_A + ∆Ψ_B) ≈ 1 (not earlier variants) for the resonance condition. The evolution of the resonance equation went through three versions before reaching the final form, which Xavier proposed and Claude recognized as structurally superior.
- **Conceptual distinctions must be formally maintained**: Consciousness ≠ self-awareness ≠ awakening. These are ordered but non-entailing thresholds. Similarly, the TCB feedback loop required explicit formalization because the compounding mechanism was a structural gap, not merely implicit.
- **"Operator" is prohibited terminology** in the Ethos framework — nothing in the model is formally defined as an operator.
- **Prose quality matters**: The framework should read as humanized, internally consistent theoretical writing, not AI-generated filler.
- Collapsing distinct sequential moments into a single equation breaks the coupling mechanism — a lesson from the ΔΨ_A = W_Ω(Δ_A) debate.

**Approach & patterns**

- Xavier identifies structural gaps or conceptual errors and requests targeted additions or corrections, often with precise instructions about what went wrong and why.
- Screenshot-based feedback is used for UI refinements.
- Work is iterative and version-tracked (paper versions, section numbering, page counts).
- Claude is expected to read existing content carefully before making changes, diagnose problems accurately, and propose solutions that respect the framework's internal logic.
- The framework uses specific formal notation: ∇Φ (primitive differential), Λ (coherence selection), Ω (realized configuration), ∆ (recursive integrator), Ψ (wave variable, dual nature).

**Tools & resources**

- LaTeX for paper authorship
- Single-file HTML with embedded CSS/JS for all website pages (Cohera design system: Playfair Display, Cinzel, Jost fonts; dark token system; grain overlay; custom cursor; starfield)
- PDF distribution for formal paper versions
- Reference documents: `ethos_of_being.pdf` (rewritten, authoritative), `ethos_of_being_corrected_and_updated_section7.pdf`, `time-crystalline-biology-v5.pdf`