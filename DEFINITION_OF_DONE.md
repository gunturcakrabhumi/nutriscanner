# Definition of Done — Nutrition Scanner MVP

The MVP is considered complete only when all applicable criteria below are satisfied.

## Product

- [ ] Product remains a label scanner, not a food-photo advisor.
- [ ] Facts-not-verdicts principle is preserved.
- [ ] No score/rating exists.
- [ ] No health verdict exists.
- [ ] User remains the final decision maker.

## Input

- [ ] 1 image works.
- [ ] 2 images work.
- [ ] 3 images work.
- [ ] 4 images work through model-compatible batching.
- [ ] 5th image is rejected.
- [ ] Text input works.
- [ ] Manual input works.

## Extraction

- [ ] Nutrition facts extract reliably on benchmark labels.
- [ ] Ingredients extract reliably.
- [ ] Serving data is preserved.
- [ ] Units are preserved.
- [ ] Source image attribution works.
- [ ] Missing values remain missing.
- [ ] Conflicts are detected.

## Calculation

- [ ] Per-package calculation is deterministic.
- [ ] No package calculation occurs without required inputs.
- [ ] Original declared values remain intact.
- [ ] Unit conversion is tested.

## Explanation

- [ ] Ingredient explanations are concise.
- [ ] Summary is neutral.
- [ ] No unsupported health claims.
- [ ] No encyclopedic output.

## Reliability

- [ ] Malformed AI output fails safely.
- [ ] AI timeout fails safely.
- [ ] Rate-limit behavior is explicit.
- [ ] Model unavailability is explicit.
- [ ] No false success.
- [ ] No silent fallback values.

## Security

- [ ] API key is server-side.
- [ ] Image validation exists.
- [ ] Size/type limits exist.
- [ ] Sensitive raw data is not unnecessarily logged.
- [ ] Prompt injection in label text does not alter system instructions.

## Engineering

- [ ] Relevant tests pass.
- [ ] Git diff reviewed.
- [ ] No unapproved paid dependency introduced.
- [ ] No unapproved architecture rewrite.
- [ ] Documentation updated for material decisions.
