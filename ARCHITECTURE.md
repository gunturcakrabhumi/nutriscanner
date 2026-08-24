# Architecture — Nutrition Scanner

## 1. Status

**Foundation proposal.**

This document defines architectural boundaries and responsibilities. Exact framework/provider choices remain subject to implementation validation unless explicitly marked as locked.

## 2. Core Architecture

n8n is the **MVP orchestration layer**.

```text
                    WEB CLIENT
                       │
                       │ HTTP
                       ▼
                 n8n WEBHOOK
                       │
        ┌──────────────┼───────────────┐
        ▼              ▼               ▼
   Image Intake    Text Intake    Manual Intake
        │              │               │
        └──────────────┼───────────────┘
                       ▼
                Validation / Routing
                       │
                       ▼
                 Groq / Qwen AI
                       │
                       ▼
              Extraction Validation
                       │
                       ▼
             Reconciliation / Merge
                       │
                       ▼
              Canonical Product Data
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
     Nutrition Calculations   Ingredient Analysis
             │                   │
             └─────────┬─────────┘
                       ▼
                 Explanation AI
                       │
                       ▼
                n8n Response
                       │
                       ▼
                    WEB UI
```

The architecture is intentionally **automation-centric**, not a full-stack architecture exercise.

## 3. Recommended Initial Shape

Keep the implementation deliberately simple:

- lightweight responsive web client
- n8n as the orchestration/backend workflow layer
- Groq API for multimodal extraction/explanation
- deterministic calculation logic inside n8n Code nodes or small helper logic
- minimal persistence only if the MVP actually requires it

Do not introduce a separate custom backend service unless a concrete requirement demonstrates that n8n cannot reasonably handle the responsibility.

## 4. Why n8n Is Deliberately Included

This project is part of an **automation-focused learning and portfolio track**.

n8n is therefore not merely an incidental tool. It is the orchestration layer through which the user is intentionally learning:

- webhook-driven workflows
- API integration
- multimodal AI orchestration
- structured data transformation
- validation
- branching
- error handling
- response delivery

The product should still remain technically sensible. n8n should not be forced into responsibilities it cannot reasonably handle.

## 5. Component Responsibilities

### Frontend

Responsible for:

- image selection/camera capture
- 1–4 image constraint
- upload progress
- extracted-data review
- editing
- result presentation
- error presentation

Frontend must not own authoritative calculations.

### Backend

Responsible for:

- request validation
- image handling
- orchestration
- AI calls
- schema validation
- reconciliation
- deterministic calculations
- explanation generation
- persistence if enabled

### AI Provider

Responsible for:

- visual extraction
- OCR/document understanding
- ingredient interpretation
- concise natural-language explanation

AI is not authoritative for arithmetic or missing data.

### Calculation Engine

Responsible for:

- unit conversion
- serving calculations
- package calculations
- derived percentages where explicitly defined

### Database

Responsible for:

- analysis metadata
- canonical extracted data
- processing state
- optional audit records

Persistent image storage is optional and should be minimized.

## 6. n8n Workflow Responsibilities

The main n8n workflow should own:

- webhook intake
- input validation
- image count validation
- AI calls
- JSON parsing
- schema validation
- multi-image reconciliation
- deterministic calculations
- explanation generation
- structured response to the web client

Keep workflow nodes modular and named by responsibility.

A suggested high-level workflow:

```text
Webhook
  ↓
Validate Input
  ↓
Normalize Input
  ↓
Extract Label Data
  ↓
Validate AI Output
  ↓
Reconcile Images
  ↓
User Review / Confirmation Boundary
  ↓
Canonical Data
  ↓
Calculate
  ↓
Explain
  ↓
Respond
```

The exact interaction pattern for the user-review step may use a second webhook or session-based continuation.

## 7. AI Call Strategy

User allows 1–4 photos.

The current Groq model documentation indicates `qwen/qwen3.6-27b` supports image inputs and JSON mode. The model-specific documentation currently lists a maximum of 3 input images per request. Therefore:

```text
1–3 images → one extraction request
4 images   → batch into 3 + 1, then reconcile
```

Do not assume four images can be sent to the model in one request.

## 8. Provider Abstraction

The application should expose an internal AI interface such as:

```text
extractLabel(images) -> ExtractionResult
explainLabel(canonicalData) -> ExplanationResult
```

The implementation may initially use Groq, but business logic must not depend on provider-specific response shapes.

## 9. Free-First Constraint

Preferred order:

1. Existing/free resources
2. Local computation
3. Existing Groq access
4. Free-tier infrastructure
5. Paid service only after explicit approval

No paid dependency may be introduced silently.

## 10. Failure Philosophy

No silent fallback for authoritative data.

Examples:

- OCR failure → explicit extraction error
- malformed JSON → validation failure
- conflicting values → unresolved conflict
- missing serving count → no package calculation
- missing ingredient image → ingredient information unavailable

Do not invent a value to keep the UI looking successful.

## 11. Future Scalability

Keep boundaries clean enough that later versions can add:

- authentication
- history
- product comparison
- barcode lookup
- alternate AI providers

without rewriting the extraction/calculation core.
