# MVP Scope — Nutrition Scanner

## 1. MVP Objective

Build the smallest complete product that proves the core loop:

> **Provide label → extract → review → calculate → explain → decide.**

## 2. MUST HAVE

### Input

- [ ] Upload/capture 1–4 images
- [ ] Accept pasted label text
- [ ] Manual data entry fallback
- [ ] Reject more than 4 images for one analysis session

### Extraction

- [ ] Product name when visible
- [ ] Brand when visible
- [ ] Serving size
- [ ] Servings per container when visible
- [ ] Standard nutrition fields
- [ ] Additional nutrition fields when present
- [ ] Raw ingredients text
- [ ] Parsed ingredient items
- [ ] Explicit allergen declaration when visible
- [ ] Source-image attribution
- [ ] Field-level confidence/quality signal where supported

### Review

- [ ] Display extracted data before final analysis
- [ ] User can edit extracted fields
- [ ] User can confirm the dataset
- [ ] Conflicting values are surfaced

### Processing

- [ ] Normalize units
- [ ] Preserve original values
- [ ] Calculate per-package values only when mathematically supported
- [ ] Preserve ingredient order
- [ ] Detect missing information
- [ ] Prevent unresolved conflicts from entering dependent calculations

### Explanation

- [ ] Brief ingredient function explanations
- [ ] Neutral label summary
- [ ] Relevant factual observations
- [ ] Clear missing-information indicators

### Web UX

- [ ] Mobile-friendly
- [ ] Desktop-friendly
- [ ] No mandatory account for first scan
- [ ] Clear loading/error states
- [ ] Result remains understandable without technical terminology

## 3. SHOULD NOT BE MVP

- [ ] Account system
- [ ] Scan history
- [ ] Product database
- [ ] Barcode lookup
- [ ] Product comparison
- [ ] Personal nutrition profile
- [ ] Daily food log
- [ ] Notifications
- [ ] Community features
- [ ] Admin dashboard
- [ ] Public API

## 4. NEVER ADD TO MVP

- Healthy/unhealthy score
- Nutrition score
- Medical diagnosis
- Medical treatment recommendation
- Prescribed serving/dose
- Food-photo calorie estimation
- Weight-loss coaching
- Automatic health verdict
- Ingredient fearmongering
- Encyclopedic ingredient pages

## 5. MVP Acceptance Criteria

A valid MVP demonstration must show:

```text
1 photo
  ↓
Extraction
  ↓
Review
  ↓
Analysis
  ↓
Result

and

2–4 photos
  ↓
Cross-image reconciliation
  ↓
Analysis
  ↓
Result

and

Partial label
  ↓
Partial result
  ↓
Missing information clearly identified
```

## 6. MVP Finish Line

The MVP is complete when the core workflow works end-to-end on a representative set of real-world Indonesian packaged-food labels and the failure suite passes without false success or silent invention.
