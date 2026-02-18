---
name: astro-sveltia-tailwind
description: Apply TAIA's base implementation conventions for Astro, Sveltia CMS, and Tailwind CSS in new or existing website work.
---

# Astro Sveltia Tailwind

Use this skill to keep implementation consistent with the project's core stack conventions.

## When to Use

- Creating new pages, layouts, or components.
- Refactoring website UI.
- Setting up a fresh client copy of TAIA.

## Inputs

1. `core/AGENTS.md`.
2. Current layouts/components/content structure.

## Process

1. Keep CMS/content edits in `content/`, `layouts/`, `components/`, and `uploads/`.
2. Keep CMS schema behavior aligned with Sveltia conventions already defined in core.
3. Build UI with Tailwind utility classes first.
4. Only introduce custom CSS when utility classes cannot express a needed behavior.
5. Preserve accessibility, SEO, and performance rails.
6. Prefer reusable core components before creating project-specific duplicates (links, media, FAQ, reviews, TOC, galleries, forms, maps).

## Outputs

1. Updated implementation in the website surface.
2. Optional context note in `/_context/` when architecture decisions are non-obvious.

## Definition of Done

- [ ] Astro patterns are preserved.
- [ ] Sveltia-editable structures remain compatible.
- [ ] Tailwind-first styling is applied consistently.
- [ ] No regressions in accessibility/SEO/performance rails.
