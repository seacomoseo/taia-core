---
name: requirements-form
description: Build a structured client requirements form and normalize answers into an implementation-ready brief.
---

# Requirements Form

Convert fuzzy client intent into concrete, build-ready requirements.

## When to Use

- New project kickoff.
- Client has partial ideas but no structured brief.

## Inputs

1. Any initial context in `/_context/_init/`.
2. Business goals and constraints (if available).

## Process

1. Create a concise intake questionnaire with required and optional fields.
2. Group by sections: business, audience, offer, website, SEO/SEM, operations, legal.
3. Convert answers into normalized decisions and unresolved questions.
4. Produce a decision log and assumptions list.

## Outputs

1. `/_context/intake/requirements-form.md`
2. `/_context/intake/requirements-answers.md`
3. `/_context/intake/requirements-brief.md`

## Definition of Done

- [ ] Form covers business, website, SEO, SEM, and delivery constraints.
- [ ] Answers are transformed into actionable requirements.
- [ ] Open questions are explicitly listed.
