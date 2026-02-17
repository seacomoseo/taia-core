---
name: client-change-chatops
description: Process natural-language client change requests into scoped implementation tasks, safe code edits, and PR-ready output.
---

# Client Change ChatOps

Convert client chat requests into reliable engineering actions.

## When to Use

- Client requests website changes in natural language.
- You need a repeatable flow from request to implementation.

## Inputs

1. Client message.
2. Current project state and constraints.

## Process

1. Parse request into objective, scope, constraints, and acceptance criteria.
2. Restrict implementation scope to:
   - `content/`
   - `templates/`
   - `components/`
   - `uploads/`
3. Generate task breakdown and risk notes.
4. Implement changes and prepare PR summary.

## Outputs

1. `/_context/ops/change-requests/<timestamp>-request.md`
2. `/_context/ops/change-requests/<timestamp>-implementation-plan.md`
3. PR-ready change summary.

## Definition of Done

- [ ] Scope and acceptance criteria are explicit.
- [ ] Changes are limited to approved website surface.
- [ ] PR summary is clear and testable.
