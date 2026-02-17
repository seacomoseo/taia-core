---
name: skill-ops
description: Create, audit, version, and maintain the TAIA skills ecosystem with multi-agent compatibility and measurable quality.
---

# Skill Ops

Operate the complete lifecycle of skills in this repository.

## When to Use

- Creating new skills.
- Refactoring, merging, or deprecating skills.
- Auditing quality or overlaps.
- Migrating paths or compatibility layouts.

## Inputs

1. `core/AGENTS.md` policy.
2. Existing skills in `core/agents/skills/`.
3. New capability request or gap list.

## Process

### Step 1: Capability mapping

1. Build a map of requested outcomes.
2. Match each outcome to an existing skill or a gap.
3. Prefer updating existing skills before creating net-new ones.

### Step 2: Skill design

1. Keep each skill focused on one job.
2. Define unambiguous triggers in `description` and `When to Use`.
3. Define concrete outputs with fixed paths.

### Step 3: Quality audit

For each skill, verify:

- frontmatter has `name` and `description`
- process is actionable and ordered
- outputs are explicit
- DoD is measurable
- no critical overlap with another skill

### Step 4: Compatibility audit

1. Ensure canonical path is `core/agents/skills`.
2. Ensure root symlinks (`.agent`, `.agents`, `.claude`) point to `core/agents`.
3. Ensure references use canonical paths.

### Step 5: Version and changelog hygiene

1. Update `core/agents/manifest.yml` if domain scope changes.
2. Document major skill changes in PR body.

### Step 6: External patterns review

When improving skill quality, review and selectively adapt patterns from:

- Agent Skills specification and best practices
- Anthropic skills examples
- OpenAI Codex skills guidance
- OpenCode and VS Code skills compatibility guidance
- Marketing skills libraries for CRO/SEO/SEM structure

## Outputs

1. Updated or new skill files in `core/agents/skills/skill_*/SKILL.md`.
2. Optional audit report in `/_context/skills/audit-YYYY-MM-DD.md`.

## Definition of Done

- [ ] Capability map covers all requested outcomes.
- [ ] Skills are focused, non-duplicative, and triggerable.
- [ ] Compatibility paths are valid.
- [ ] Canonical policy alignment with `core/AGENTS.md` is preserved.
