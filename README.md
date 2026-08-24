# Nutrition Scanner

> A fact-based, web-based food label interpretation tool.
>
> **Core principle: Facts, not verdicts.**

## 1. Product Summary

Nutrition Scanner helps everyday food buyers understand what is written on packaged-food labels.

A user can provide 1–4 photos of a label, paste label text, or enter data manually. The system extracts available information, lets the user review/correct the extraction, performs deterministic calculations, explains ingredients briefly and contextually, and presents a neutral summary.

The product does **not** decide whether a product is healthy or unhealthy.

## 2. Core User Journey

```text
Open Web App
    ↓
Provide 1–4 label photos / text / manual data
    ↓
AI extraction
    ↓
Review & correct extracted data
    ↓
Validation + normalization
    ↓
Deterministic calculations
    ↓
Ingredient explanations
    ↓
Neutral result
    ↓
User decides
```

## 3. Product Boundaries

### In scope for MVP

- Fully web-based experience
- 1–4 label images per analysis session
- Text/paste input
- Manual input fallback
- Multimodal extraction
- Nutrition Facts extraction
- Serving information
- Ingredient parsing
- Allergen information when explicitly available
- Missing-information reporting
- Conflict detection across images
- User correction before final analysis
- Per-serving and per-package calculations where inputs permit
- Unit normalization
- Short, neutral ingredient explanations
- Short neutral summary

### Explicitly out of scope

- Food-photo calorie estimation
- Healthy/unhealthy classification
- Nutrition score or rating
- Medical diagnosis
- Treatment advice
- Personalized diet coaching
- Safe-serving prescriptions
- Meal planning
- Social/community features
- Product catalog/database as a primary product
- Barcode lookup
- Automatic product recommendations

## 4. AI Provider

Primary candidate: Groq using `qwen/qwen3.6-27b`.

The model supports image input, OCR/document understanding, JSON mode, and multilingual processing. Current Groq documentation identifies the model as a preview model, so provider/model status must be checked before production deployment.

## 5. Engineering & Learning Philosophy

This project is part of an **automation-focused learning and portfolio track**.

- n8n is the core orchestration engine for the MVP.
- The web application is the user-facing interface.
- AI extracts and explains; deterministic logic calculates.
- User-provided label data is the source of truth.
- Missing information is represented explicitly, never invented.
- Conflicting values are surfaced, never silently resolved.
- Raw extraction is preserved for debugging/audit.
- Paid services are not introduced without explicit approval.
- Unrelated engineering scope should not expand merely because it is technically interesting.
- Documentation is the source of product/architecture intent; code is the implementation.

## 6. Documentation Map

- `PROJECT_BRIEF.md` — product foundation
- `PROJECT_ROADMAP.md` — maturity phases and gates
- `MVP_SCOPE.md` — strict MVP boundary
- `ARCHITECTURE.md` — proposed technical architecture
- `DATA_SCHEMA.md` — canonical data contract
- `STATE_MACHINE.md` — analysis state lifecycle
- `AI_SPEC.md` — AI responsibilities and contracts
- `SECURITY.md` — privacy and security requirements
- `TEST_CASES.md` — acceptance and failure tests
- `PROJECT_RULES.md` — mandatory engineering/Antigravity rules
- `DECISIONS.md` — architecture/product decisions
- `CHANGELOG.md` — documentation and implementation history

## 7. Current Phase

**Phase 0 — Foundation**

The project is ready to move from product definition into implementation planning after the documentation pack is reviewed.

## 8. Source References

Regulatory context should be verified against current official BPOM material. The current project baseline references PerBPOM No. 10 Tahun 2026 tentang Informasi Nilai Gizi pada Label Pangan Olahan.

AI provider details should be verified against current Groq documentation before implementation and release.
