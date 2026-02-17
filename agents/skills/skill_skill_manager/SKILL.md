---
name: skill-manager
description: Legacy alias skill. Use this when asked to create, audit, or improve TAIA skills. Delegates to skill-ops.
---

# Skill Manager

This skill is kept for backward compatibility.

## When to Use

- A prompt asks for `skill_skill_manager` specifically.
- Existing workflows still reference Skill Manager.

## Process

1. Load and follow `core/agents/skills/skill_skill_ops/SKILL.md`.
2. Apply all governance, template, and audit rules from Skill Ops.
3. If naming or structure conflicts are found, follow `core/AGENTS.md`.

## Outputs

1. Any output defined by Skill Ops.

## Definition of Done

- [ ] Skill Ops instructions were used as canonical.
- [ ] No legacy-only rules were introduced.
