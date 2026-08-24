# Architecture & Product Decisions

This file records decisions that should not be repeatedly re-litigated during implementation.

## ADR-001 — Product is a Label Scanner

**Status:** Accepted

The MVP analyzes food/product labels, not photos of prepared food.

**Reason:** Label data has explicit textual/numeric parameters and is more observable and testable. Food-photo analysis introduces large ambiguity in ingredient quantities and portion estimation.

---

## ADR-002 — Fully Web-Based MVP

**Status:** Accepted

The MVP is a responsive web application.

**Reason:** Lowest installation friction and broadest access. Native mobile apps are not required for MVP.

---

## ADR-003 — Primary User is Everyday Food Buyer

**Status:** Accepted

The product is designed first for general consumers who want to understand packaged-food labels.

Nutrition-aware/diet-oriented users are secondary.

---

## ADR-004 — Facts, Not Verdicts

**Status:** Accepted

No health score, rating, healthy/unhealthy verdict, or medical recommendation.

**Reason:** Product purpose is label understanding, not health judgment.

---

## ADR-005 — Relevance Over Completeness

**Status:** Accepted

Ingredient explanations are short and contextual.

**Reason:** Avoid turning the product into an encyclopedia.

---

## ADR-006 — User Controls Input Depth

**Status:** Accepted

User may provide 1–4 photos. The system processes whatever is provided and does not require additional photos.

---

## ADR-007 — Deterministic Calculations

**Status:** Accepted

Arithmetic and derived nutrition values are calculated by application code, not LLM output.

---

## ADR-008 — AI for Extraction and Explanation

**Status:** Accepted

AI is used for multimodal extraction and natural-language explanation, not as the source of authoritative calculations.

---

## ADR-009 — Groq as Initial AI Provider

**Status:** Accepted for MVP

Use existing Groq access, with `qwen/qwen3.6-27b` as the initial candidate.

**Reason:** Existing resource and multimodal/OCR/JSON capabilities. Provider/model status must be revalidated before production.

---

## ADR-010 — n8n as Core Orchestration Layer

**Status:** Accepted for MVP (Revised per CHANGELOG.md)

n8n serves as the core orchestration engine for the MVP request path, handling webhooks, input validation, AI calls, multi-image reconciliation, deterministic calculations, and response delivery. This supports the user's automation-focused learning and portfolio track.

---

## ADR-011 — Free-First

**Status:** Accepted

Minimize recurring cost and reuse existing resources.

Paid services require explicit approval.

---

## ADR-012 — Explicit Missing Data

**Status:** Accepted

The system reports unavailable information rather than inferring it.

---

## ADR-013 — Conflict Must Be Visible

**Status:** Accepted

Conflicting values across images cannot be silently resolved.

---

## ADR-014 — No Mandatory Account for First Scan

**Status:** Accepted for MVP planning

A first-time user should be able to experience the core value before account creation.

---

## ADR-015 — No Product Score

**Status:** Accepted

The application does not assign a numerical health/nutrition score.

---

## ADR-016 — Multi-Photo Package Analysis (Product Roadmap Vision) and MVP Single-Photo Intake (Technical Constraint)

**Status:** Accepted for MVP with Roadmap Vision Preserved

1. **Product Roadmap Vision**: The product vision retains support for multi-side food packaging analysis (1–4 images per session).
2. **MVP Implementation Constraint**: For the initial MVP, AI extraction uses 1 primary photo per analysis call (e.g. Nutrition Facts or Ingredients table) to ensure fast, reliable response times (< 3s observed target) and avoid provider rate limit throttling (Groq 8k TPM).
3. **Deferred Capability**: Multi-image batching and full-package multi-photo reconciliation are preserved in the roadmap and deferred to future phases when provider throughput or dedicated inference tiers permit.
