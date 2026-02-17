# TAIA Agent System

This directory is the canonical multi-agent compatibility root.

- Skills live in `core/agents/skills/`.
- Root compatibility symlinks should point here:
  - `.agent -> ./core/agents`
  - `.agents -> ./core/agents`
  - `.claude -> ./core/agents`

Skill authoring standard:

- One folder per skill (`skill_*`).
- Required file: `SKILL.md`.
- Required frontmatter fields: `name`, `description`.
- Required sections: When to Use, Inputs, Process, Outputs, Definition of Done.

Use `skill_skill_ops` to create, audit, and improve the skill ecosystem.
