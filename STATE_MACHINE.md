# State Machine — Nutrition Scanner

## 1. Purpose

Prevent false-success states and make the analysis lifecycle explicit.

## 2. States

```text
CREATED
  ↓
INPUT_RECEIVED
  ↓
EXTRACTING
  ↓
EXTRACTED
  ↓
REVIEW_REQUIRED
  ↓
VALIDATING
  ↓
READY_FOR_ANALYSIS
  ↓
ANALYZING
  ↓
COMPLETED
```

Failure states:

```text
INPUT_INVALID
EXTRACTION_FAILED
VALIDATION_FAILED
CONFLICT_UNRESOLVED
ANALYSIS_FAILED
```

## 3. State Meaning

### CREATED

Session exists but no usable input has been accepted.

### INPUT_RECEIVED

1–4 images, text, or manual data have been accepted.

### EXTRACTING

AI extraction is in progress.

### EXTRACTED

Candidate structured data exists but has not yet been confirmed.

### REVIEW_REQUIRED

User can inspect/edit extracted data.

### VALIDATING

Backend validates schema, units, conflicts, and calculation prerequisites.

### READY_FOR_ANALYSIS

Canonical data is valid and no blocking conflict remains.

### ANALYZING

Deterministic calculations and AI explanations are being generated.

### COMPLETED

Neutral result is available.

## 4. Invalid Transitions

Examples:

- `EXTRACTION_FAILED → ANALYZING` is forbidden.
- `CONFLICT_UNRESOLVED → COMPLETED` is forbidden if the conflict affects displayed/calculated data.
- `VALIDATION_FAILED → COMPLETED` is forbidden.
- `INPUT_INVALID → EXTRACTING` is forbidden.
- AI explanation failure must not corrupt already validated source facts.

## 5. Partial Input

Partial input is valid.

Example:

```text
INPUT_RECEIVED
  ↓
EXTRACTED
  ↓
REVIEW_REQUIRED
  ↓
VALIDATING
  ↓
READY_FOR_ANALYSIS
  ↓
COMPLETED
```

The result may simply contain:

```text
Nutrition facts: available
Ingredients: not provided
Allergen declaration: not provided
```

Do not force the user to add more images.

## 6. Conflict Handling

If conflicting values are found:

```text
EXTRACTED
  ↓
REVIEW_REQUIRED
  ↓
CONFLICT_UNRESOLVED
```

The user must resolve the conflict before calculations dependent on that field can be finalized.

## 7. Retry

Retries are allowed only for transient infrastructure/API failures and must be bounded.

Retries must never be used to invent missing information or silently replace a failed extraction with a fabricated fallback.
