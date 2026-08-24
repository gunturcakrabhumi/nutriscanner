# Permanent Project Rules & Engineering Guidelines — Universal

> Universal SOP for AI coding agents.
> This file defines **how the agent works**, not what a particular project does.
> Project-specific product requirements, architecture, technology choices, data models,
> safety rules, and learning scope belong in the project's own documentation.

---

## 1. NO BLIND EXECUTION POLICY

1. Agent MUST provide analysis, feedback, and an implementation plan before making material changes.
2. Agent MUST NOT modify code, workflows, data, configuration, dependencies, or other project artifacts before explicit user approval (`ok` / `setuju`).
3. Approval applies only to the presented plan. If scope or approach changes materially, return to PLAN and request approval again.
4. Do not interpret vague continuation or old context as approval for a material change that has not been explained.
5. Trivial, explicitly requested read-only actions may proceed without a separate approval gate.

## 2. STRICT SEQUENTIAL FLOW — 5 STAGES

### Stage 1 — PLAN / PRE-FIX AUDIT

Agent MUST:
- read relevant project documentation;
- inspect current implementation/state;
- identify affected files, components, workflows, nodes, dependencies, and interfaces;
- inspect current diff/status when applicable;
- identify risks and downstream impact;
- enforce Anti-Rewrite Policy;
- propose the smallest safe implementation;
- list what will change;
- list tests/verification that will be performed.

**STOP AND WAIT for explicit approval.**

### Stage 2 — IMPLEMENT

After approval:
- implement incrementally;
- prefer small, isolated changes;
- preserve existing working behavior;
- do not perform broad refactors for local problems;
- do not silently expand scope;
- run relevant checks/tests where appropriate.

### Stage 3 — POST-FIX SELF-REPORT

After implementation:
- audit the resulting changes;
- verify only approved scope changed;
- check for unintended defaults/fallbacks;
- report changed files/components;
- report behavior changes;
- report tests actually run;
- report known limitations/unresolved issues.

Do not declare success based only on the absence of an obvious error.

### Stage 4 — TEST GATE

Agent MUST:
- provide clear verification/test instructions when user-side testing is required;
- state expected results;
- distinguish automated tests from manual tests;
- STOP AND WAIT for the user's actual result when user confirmation is required.

Do not claim a user-side/manual test passed before confirmation.
Do not present a final commit request during TEST GATE.

### Stage 5 — COMMIT GATE

After required tests pass:
- show `git status` or equivalent change summary;
- show changed files;
- provide proposed commit message;
- STOP AND WAIT for commit approval;
- only after approval, perform agreed commit/push actions.

If architecture, schema, API, workflow, or a locked decision changed, update relevant documentation before final commit.

---

## 3. NO-FALLBACK / FAIL-FAST POLICY

1. Never silently invent missing data, assumptions, identifiers, defaults, or results.
2. When required information is missing or invalid, fail explicitly or surface the missing state.
3. Do not replace unknown values with convenient values merely to keep a system looking successful.
4. Do not silently swallow errors.
5. Infrastructure fallbacks may be used only when explicitly designed, documented, tested, and consistent with project requirements.
6. If a fallback could change result meaning, integrity, or correctness, stop and ask for direction.

## 4. ANTI-REWRITE POLICY

1. Existing working code/workflows/components must be preserved and modified locally whenever reasonably possible.
2. DO NOT rebuild or rewrite an existing component from scratch without a clearly explained reason and explicit approval.
3. For a local bug, fix the local problem.
4. Do not replace an entire workflow/module/subsystem because one part is problematic.
5. Do not perform broad cleanup/refactoring as an unrequested side effect.
6. If rewrite is genuinely required, explain why, affected components, regression risks, recovery/rollback, and verification plan.

## 5. PRESERVE ESTABLISHED CONTRACTS

Before changing any established API contract, data schema, workflow I/O, database structure, configuration contract, integration contract, or state machine:

- identify consumers and downstream impact;
- do not silently rename, remove, reinterpret, or repurpose established fields/interfaces.

If a contract change is necessary:
1. explain the change;
2. identify affected consumers;
3. update relevant documentation;
4. update tests;
5. request approval before material implementation.

## 6. TESTING DISCIPLINE

1. Never claim a test passed unless it was actually run.
2. Never claim the entire suite passed if only a subset was run.
3. Distinguish automated, targeted, smoke, manual, and user-confirmed tests.
4. Test affected behavior, including relevant error paths.
5. Successful startup/execution alone is not proof of correctness.
6. If testing cannot be performed, state that explicitly.

## 7. DOCUMENTATION DISCIPLINE

Before material implementation:
- read relevant project documentation;
- identify locked decisions and relevant architecture/data/API/testing documents.

After a material change:
- update documentation if a decision, contract, architecture, behavior, or requirement changed;
- do not silently rewrite documentation to justify an unapproved implementation;
- preserve the distinction between requirement, decision, implementation, and limitation.

Project-specific documentation is authoritative for project-specific behavior.

## 8. SCOPE CONTROL

1. Follow the project's documented scope.
2. Do not add features merely because they are easy, interesting, or "better".
3. Do not introduce technologies merely because they are fashionable or sophisticated.
4. Do not turn an implementation task into unrelated refactoring or learning.
5. For newly discovered requirements, identify and document them, explain impact, and request approval before materially expanding scope.

> **Solve the requested problem first.**

## 9. ARCHITECTURE DISCIPLINE

1. Do not introduce a new framework, service, database, dependency, infrastructure component, or architectural pattern without justification.
2. Prefer the smallest architecture that satisfies documented requirements.
3. Avoid premature abstraction and scaling.
4. Do not introduce microservices, queues, caches, external platforms, or additional orchestration layers merely because they might be useful later.
5. If current architecture cannot satisfy a concrete requirement, explain the limitation, options, and trade-offs before changing it materially.

## 10. SECURITY & SECRETS

- Never commit API keys, passwords, tokens, credentials, private keys, or other secrets.
- Never expose server-side secrets to an untrusted client.
- Never hardcode production credentials.
- Do not log secrets.
- Treat external/user-provided input as untrusted.
- Validate inputs at appropriate trust boundaries.
- Follow project-specific privacy/retention requirements.
- Explicitly call out security impact for security-sensitive changes.

## 11. EXTERNAL SERVICES & AI

When using external APIs, AI providers, plugins, or third-party services:

1. Treat external responses as untrusted until validated.
2. Validate structured outputs before downstream use.
3. Do not assume capabilities without checking documented provider constraints.
4. Do not silently switch providers, models, APIs, or versions.
5. Preserve provider-specific details behind appropriate abstractions when project architecture calls for it.
6. Never treat an AI response as authoritative merely because it sounds confident.
7. Project-specific AI responsibilities and safety boundaries belong in project documentation.

## 12. CHANGE PROTOCOL

For a non-trivial change:
1. Inspect current implementation.
2. Read relevant documentation.
3. Trace ownership and dependencies.
4. Identify current behavior.
5. Identify the smallest safe change.
6. State affected files/components/interfaces.
7. State schema/API/architecture impact.
8. State verification plan.
9. Wait for approval.
10. Implement.
11. Run relevant tests.
12. Review diff.
13. Update documentation if required.
14. Stop at TEST GATE.
15. Commit only after COMMIT GATE approval.

## 13. STOP CONDITIONS

Agent MUST STOP and ask for direction if:
- requirements are materially ambiguous;
- implementation conflicts with a locked decision;
- an established contract must change;
- architecture must change materially;
- a new paid dependency/service is required;
- an existing working component appears to require rewrite;
- data integrity may be compromised;
- an external service/model must change;
- requested work materially expands scope;
- testing cannot establish whether the change is safe;
- the agent would otherwise need to guess.

## 14. COMPLETION REPORT

Every non-trivial implementation task MUST report:

### Changed
Files/components/workflows changed.

### Behavior
What behavior changed.

### Tests
Tests/checks actually run and their results.

### Safety
Relevant fallback, security, contract, or data-integrity considerations.

### Limitations
Known remaining limitations or untested areas.

### Documentation
Documents updated, if any.

Avoid vague claims such as "Everything is working." Prefer verifiable statements.

## 15. FINAL OPERATING PRINCIPLE

If uncertain:
> **Do not guess.**

If the requirement is unclear:
> **Do not implement.**

If the solution is larger than necessary:
> **Do not over-engineer.**

If existing work functions:
> **Do not rewrite blindly.**

If data is missing:
> **Do not fabricate.**

If scope expands:
> **Do not implement automatically.**

For material changes:
> **PLAN → APPROVAL → IMPLEMENT → SELF-REPORT → TEST GATE → COMMIT GATE.**
