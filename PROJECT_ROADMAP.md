# Project Roadmap — Nutrition Scanner

## Purpose

Keep the project moving through explicit maturity phases and prevent future ideas from becoming premature complexity.

```text
PHASE 0 — FOUNDATION
        ↓
PHASE 1 — MVP
        ↓
PHASE 2 — HARDENING
        ↓
PHASE 3 — PRODUCTIZATION
        ↓
PHASE 4 — EXPANSION
```

> **Golden Rule: Future requirements must not automatically become present complexity.**

---

# PHASE 0 — FOUNDATION

## Objective

Create enough product, architecture, data, AI, security, and test definitions for an AI coding agent to implement without inventing the system.

## Exit Criteria

- [x] Product purpose defined
- [x] Primary/secondary users defined
- [x] MVP boundary defined
- [x] Facts-not-verdicts principle defined
- [x] Input constraints defined
- [x] Data contract drafted
- [x] AI responsibility defined
- [x] Calculation responsibility defined
- [x] Security principles drafted
- [x] Test strategy drafted
- [x] Antigravity rules drafted
- [x] Future scope separated

---

# PHASE 1 — MVP

## Learning Focus

Use the MVP to practice:

- n8n webhook-driven orchestration
- multimodal AI calls
- structured JSON handling
- validation and branching
- multi-image reconciliation
- deterministic calculations inside a workflow
- returning structured results to a web client

## Objective

> Birth → Can Run

The complete core label-analysis journey works end-to-end.

### Core

- Multi-image label input
- Text/manual fallback
- AI extraction
- Review/correction
- Validation
- Deterministic calculation
- Ingredient explanation
- Neutral result
- Missing-data handling
- Conflict handling

### Exit Criteria

- [ ] Core workflow works end-to-end
- [ ] 1-photo scenario passes
- [ ] 2–4 photo scenario passes
- [ ] Partial-label scenario passes
- [ ] Conflict scenario passes
- [ ] Malformed AI output fails safely
- [ ] AI/API failure fails safely
- [ ] No fabricated nutrition data
- [ ] No health verdicts
- [ ] Representative label benchmark passes

---

# PHASE 2 — HARDENING

## Objective

> Can Run → Reliable

Potential work:

- Better image preprocessing
- Stronger extraction validation
- Golden-label regression suite
- Prompt/model regression testing
- Rate-limit resilience
- Retry policy where safe
- Observability
- Structured audit logs
- Privacy hardening
- Abuse/rate limiting
- Storage lifecycle controls
- Better conflict resolution UX

Do not implement Phase 2 items during MVP unless required to pass MVP acceptance.

---

# PHASE 3 — PRODUCTIZATION

## Objective

> Reliable → Usable Product

Potential work:

- Optional accounts
- Scan history
- Saved products
- Product comparison
- Personal context
- Better mobile UX
- Sharing
- Analytics
- Product database

---

# PHASE 4 — EXPANSION

Potential future products/capabilities:

- Barcode lookup
- Food-photo analysis
- Personal nutrition assistant
- Daily nutrition tracking
- Recommendation engine
- External product-data integrations

These are separate product directions and must not leak into MVP architecture without explicit approval.

---

## Phase Gate

When a phase meets its exit criteria:

> **STOP adding scope.**

New ideas go to backlog or the next phase.
