# TAIA Core - Agent Guide

This file is the canonical source of truth for agent behavior across this project.

## Scope

- Main editable website surface for delivery tasks:
  - `../content/`
  - `../layouts/`
  - `../components/`
  - `../uploads/`
- Core logic, reusable contracts, and system behavior live in `core/`.

## Base Stack

- Framework: Astro.
- CMS: Sveltia CMS.
- Styling: Tailwind CSS (via `@tailwindcss/vite`).
- Prefer Tailwind utility classes in layouts/components; use custom CSS only when utilities are insufficient.

## Instruction Precedence

1. Direct user request
2. This `core/AGENTS.md`
3. Relevant skill instructions in `core/agents/skills/*/SKILL.md`
4. Reference docs in `core/docs/*`

If instructions conflict, follow the higher level and document tradeoffs.

## Standards

- Use StandardJS style (2 spaces, single quotes, no semicolons).
- Code and internal technical docs in English.
- Client-facing deliverables in `/_context/` in Spanish by default.
- Avoid overengineering; prefer simple, reversible decisions.

## Content and CMS Contract

- Site settings source: `../content/config.yml`.
- Collections and singles are declared in `../content/config.yml`.
- Collection routes use `../content/<collection>/_index.<lang>.md` with `path` and `slug`.
- Home page source: `../content/singles/_home.<lang>.md`.
- CMS config endpoint: `/admin/config.yml`.
- Collection metadata:
  - `singular` and `icon` supported for collections
  - `icon` supported for singles

## i18n Contract

- Runtime translatable strings: `../content/globals/<lang>.yml`.
- CMS locale switch: `cmsLocale` in `../content/config.yml` (`es` or `en`).
- `cmsGlobals` and `cmsFields` labels/hints must be inline objects: `{ es, en }`.
- Core built-in CMS labels/hints live in `core/src/cms/i18n/<lang>.yml` and use field-name keys.
- Field default behavior: `required: false` unless explicitly `true`.

## Delivery Workflow

- Default branch policy: work via PRs, not direct pushes to `main`.
- Quality gates before merge:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm taia:validate`
  - `pnpm taia:links`
  - `pnpm taia:lighthouse <url>` when performance-impacting changes are involved

## Performance and SEO Targets

- Lighthouse targets: Performance >= 90, Accessibility 100, Best Practices 100, SEO 100.
- CWV targets: LCP <= 2.5s, CLS <= 0.1, TBT <= 200ms.

## Agent Skills System

- Canonical skills directory: `core/agents/skills/`.
- Compatibility symlinks at repository root should point to `./core/agents`:
  - `./.agent`
  - `./.agents`
  - `./.claude`
- Each skill lives in `skill_*/SKILL.md` and must define:
  - clear trigger conditions (when to use)
  - required inputs
  - deterministic process
  - explicit outputs with file paths
  - measurable definition of done

## Skills Usage Best Practices

- Load only the skills relevant to the current task.
- Prefer composable skills over giant all-in-one skills.
- Keep skill instructions action-oriented and testable.
- If a repeated workflow appears 3+ times, create or improve a skill.
- Use `skill_skill_ops` as the meta-skill for skill creation, audits, versioning, and deprecation.

## Multi-Agent Compatibility Guidance

- Keep skill names lowercase and underscore-separated in folder names (`skill_*`).
- Keep SKILL frontmatter concise and trigger-oriented.
- Avoid tool-specific hard dependencies in generic skills.
- Put optional scripts/resources inside each skill folder and reference them from `SKILL.md`.
- Treat `core/docs/*` as reference rails, not policy overrides.

## Documentation Policy

- `core/AGENTS.md` is policy.
- `core/agents/skills/*` are executable playbooks.
- `core/docs/*` are reference rails and deep context.
- `core/docs/IMPLEMENTATION_STACK.md` documents Astro + Sveltia + Tailwind setup details.
- Update all affected layers when system behavior changes.

## Core Change Tracking Protocol

When a request modifies `core/` behavior, evaluate and update this triad:

1. Policy changes -> `core/AGENTS.md`
2. Workflow/playbook changes -> `core/agents/skills/*/SKILL.md`
3. Reference/rails changes -> `core/docs/*`

Additionally, create a short traceability entry in `core/docs/CORE_CHANGELOG.md` including:

- date
- change id/title
- impacted paths
- why the change was made
- follow-up required (if any)
