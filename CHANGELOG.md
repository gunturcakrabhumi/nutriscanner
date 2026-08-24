# Changelog — Nutrition Scanner

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

- Automation-focused learning/portfolio constraint
- n8n as MVP orchestration layer
- Web client → n8n webhook architecture
- n8n responsibility boundaries
- Product vision
- Target users
- Label-scanner positioning
- Facts-not-verdicts principle
- Fully web-based MVP definition
- 1–4 image input constraint
- Text/manual input fallback
- Core user journey
- MVP feature boundary
- Canonical data model
- State machine
- AI responsibilities
- Groq/Qwen integration direction
- Deterministic calculation rules
- Security baseline
- Test strategy
- Antigravity engineering rules
- Architecture/product decision log
- Roadmap

### Revised

- Reversed the earlier decision to exclude n8n from the core request path. n8n is now intentionally part of the MVP architecture because the project belongs to the user's current automation learning track.

### Explicitly Deferred

- Product comparison
- Accounts/history
- Barcode lookup
- Product database
- Personal nutrition profile
- Daily tracking
- Food-photo analysis
- Health scoring
- Recommendation engine

## Documentation Rule

Every implementation phase should update this changelog when:

- a locked decision changes
- MVP scope changes
- architecture changes
- a major safety boundary changes
- a major model/provider changes
