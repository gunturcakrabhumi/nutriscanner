# Changelog — Nutrition Scanner

## [0.2.2] — MVP Intake Optimization & Groq Vision Inference Acceleration

### Added
- **Data Provenance Tracking on Review UI**: Visual badges on the web Review screen distinguishing *AI-extracted data*, *User-provided data*, and *User-edited data*.
- **Direct Output Optimization for Groq Multimodal AI**: Added `reasoning_effort: "none"` to `qwen/qwen3.6-27b` chat payload, eliminating internal reasoning token bloat and cutting inference latency down to ~1.3 seconds without truncation.
- **Workflow Validation & Cleaning Scripts**: Added `scripts/clean_workflow.js` and `scripts/test_workflow_syntax.js` for automated syntax auditing.

### Changed
- **Intake Flow Optimization**: Aligned MVP intake pipeline with technical constraints (1 primary label photo per analysis call) while preserving multi-image packaging support in the product vision roadmap (ADR-016).
- **Fail-Fast Error Handling**: Retried Groq completions with clear user-facing error indicators and retry buttons on the web UI.

## [0.2.1] — Targeted Fix (Batch Reconciliation & Fail-Fast Hardening)

### Fixed

- **Adaptive Batching Execution**: Updated `workflows/NutriScanner_Main_Orchestrator.json` so `Prepare Groq Request` emits all batches as individual items, guaranteeing 4 photos are processed across 2 batches (3+1) without dropping images.
- **Multi-Batch Reconciliation**: Added multi-batch extraction aggregator and conflict detection in `Deterministic Calculation & Reconciler` using `$input.all()`.
- **Fail-Fast Error Handling**: Completely deleted mock product data (`handleFallbackExtraction`) from `public/app.js`, replacing it with explicit failure toasts and retry capability.
- **Energy Normalization Order**: Fixed pipeline sequence so kJ is normalized to kcal before package energy calculation.
- **Default Values Audit**: Removed implicit unit/basis defaults (`|| 'g'`, `|| 'per_serving'`) from canonical models.
- **Test Suite Expansion**: Added comprehensive automated test suite covering T1 through T10 in `tests/deterministic_calculations.test.js`.

## [0.2.0] — Phase 1 MVP Implementation

### Added

- Semantic responsive Web Client in `public/` (`index.html`, `styles.css`, `app.js`) with 1–4 image upload, camera snapshot progressive enhancement, text paste, manual fallback, interactive review screen, and neutral fact-based result display.
- Core n8n main orchestration workflow in `workflows/NutriScanner_Main_Orchestrator.json` (ID: `UTvWKzqViPqUerKk`) with webhook intake, input validation, adaptive batching, Groq multimodal AI caller, schema validation, and deterministic calculations.
- Review confirmation n8n workflow in `workflows/NutriScanner_Review_Confirm.json` (ID: `GZF0qkTtfacpGsbd`).
- Automated deterministic unit test suite in `tests/deterministic_calculations.test.js` covering T08, T21, T22, T24.

### Revised

- Synchronized `DECISIONS.md` (ADR-010 and ADR-016) and `PROJECT_RULES.md` to confirm n8n as core orchestrator and decouple business rule (1–4 images) from provider batching.
- Corrected deterministic calculation formula to `nutrient amount per serving * servings per container`.

## [0.1.0] — Foundation Draft

### Added
- Initial project architecture and specifications.
