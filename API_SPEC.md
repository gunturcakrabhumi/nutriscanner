# API Specification — Nutrition Scanner

## 1. Status

Initial contract. Exact framework syntax is not locked.

## 2. Core Endpoint

### POST `/api/analyze`

Accepts either:

- 1–4 images
- pasted label text
- manual structured data

The request must contain at least one valid input source.

### Response lifecycle

Prefer asynchronous processing if real-world latency becomes significant.

Conceptual synchronous response:

```json
{
  "session_id": "string",
  "status": "review_required",
  "extraction": {}
}
```

## 3. Review Endpoint

### POST `/api/analyze/{session_id}/confirm`

Accepts user-confirmed/corrected canonical data.

Response:

```json
{
  "session_id": "string",
  "status": "analyzing"
}
```

## 4. Result Endpoint

### GET `/api/analyze/{session_id}`

Returns:

- state
- canonical data
- calculated values
- explanations
- missing information
- conflicts

## 5. Error Contract

Errors should be structured:

```json
{
  "error": {
    "code": "EXTRACTION_FAILED",
    "message": "The label could not be extracted reliably.",
    "retryable": false
  }
}
```

Suggested error codes:

- `INVALID_INPUT`
- `TOO_MANY_IMAGES`
- `UNSUPPORTED_IMAGE`
- `IMAGE_TOO_LARGE`
- `EXTRACTION_FAILED`
- `AI_TIMEOUT`
- `AI_RATE_LIMIT`
- `AI_UNAVAILABLE`
- `INVALID_AI_OUTPUT`
- `VALIDATION_FAILED`
- `CONFLICT_UNRESOLVED`
- `ANALYSIS_FAILED`
- `INTERNAL_ERROR`

## 6. Security

- API keys remain server-side.
- Client cannot submit trusted calculation results.
- Server validates every canonical value.
- Uploaded files are treated as untrusted.

## 7. Idempotency

If a request is retried by the client, the backend should avoid duplicate analysis where practical.

Exact idempotency strategy is a Phase 1 implementation detail.
