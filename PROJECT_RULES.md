# Project Rules — Nutrition Scanner

## 1. Read Before Editing

Before modifying code, the AI coding agent MUST read:

1. `README.md`
2. relevant project document(s)
3. `PROJECT_RULES.md`
4. `DECISIONS.md` when the change touches an existing decision

## 2. Learning Scope

This project is part of an automation-focused learning track.

Primary focus:
- n8n orchestration
- webhooks
- APIs
- AI workflow integration
- structured data transformation
- validation
- error handling

Do not turn the project into an unrelated full-stack/DevOps learning exercise.

## 3. No Silent Architecture Changes

Do not:

- introduce a new framework without approval
- replace or alter core orchestration roles without approval
- replace the database or storage layer without approval
- add a paid service without approval
- change the AI provider without approval
- change the canonical data schema without checking downstream impact

## 4. Facts-Not-Verdicts Rule

The application must not:

- score products
- rate healthiness
- declare products healthy/unhealthy
- prescribe serving amounts
- diagnose conditions
- give treatment advice

## 5. AI Boundary

AI may:

- extract
- normalize with validation
- explain
- summarize

AI must not be the authority for:

- arithmetic
- missing values
- package totals
- final data integrity
- health judgments

## 6. No Fabrication

Never use fallback values for missing label data.

Forbidden examples:

```text
missing sugar → 0
missing brand → guessed brand
missing serving count → assumed 1
missing ingredients → inferred ingredients
```

## 7. Conflict Policy

If two source images materially disagree:

- detect
- preserve both source values
- surface conflict
- require user resolution when necessary

Do not silently choose a winner.

## 8. Preserve Source Data

Do not overwrite raw extraction with normalized/calculated/explained data.

Keep conceptual layers separate:

```text
raw
→ normalized
→ calculated
→ explained
```

## 9. Relevance Over Completeness

Ingredient explanations must be short and contextual.

Do not build an encyclopedia inside the result page.

## 10. Scope Control

Do not implement future features during MVP because they are "easy."

Future ideas belong in:

- roadmap
- backlog
- decisions

not in unapproved MVP code.

## 11. Change Protocol

For a non-trivial change:

1. Explain the problem.
2. Identify affected components.
3. Trace ownership.
4. Propose the smallest safe change.
5. State schema/API impact.
6. Wait for approval if architecture or product scope changes.
7. Implement.
8. Test.
9. Review diff.
10. Report exactly what changed.

## 12. Do Not Rewrite Working Code Blindly

If existing behavior works:

> preserve it unless the requirement explicitly requires a change.

Do not perform broad refactors to solve a local problem.

## 13. Testing

After changes, run the narrowest relevant tests first, then the broader regression suite when appropriate.

Never declare success based only on "the app starts."

## 14. Free-First

Before introducing any paid dependency:

- explain why it is needed
- list free/local alternatives considered
- estimate recurring cost
- wait for explicit approval

## 15. Secrets

Never commit:

- API keys
- tokens
- passwords
- private URLs
- production credentials

## 16. Stop Condition

If implementation conflicts with a locked product decision or documented architecture:

> **STOP AND REPORT THE CONFLICT.**

Do not resolve it by silently changing the documentation or code.
