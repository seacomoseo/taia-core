---
name: frontend-design
description: Create intentional, distinctive, production-grade frontend UI that avoids generic patterns and aligns to brand strategy.
---

# Frontend Design

Design and implement memorable interfaces with clear aesthetic direction.

## When to Use

- Building or redesigning pages/components.
- Translating brand and copy strategy into UI.

## Inputs

1. Brand identity and copy style docs.
2. Content requirements and template context.
3. Target device constraints.

## Process

1. Choose a deliberate design direction and document intent.
2. Define typography, color system, spacing, and interaction style.
3. Implement production-ready code with responsive behavior using Tailwind CSS utilities first.
4. Validate accessibility, readability, and performance.

## Quality Rules

- Avoid default AI-looking aesthetics and repetitive layout clichés.
- Prefer Tailwind classes before adding component-scoped CSS.
- Use expressive typography and coherent color systems.
- Use meaningful motion, not decorative noise.
- Keep implementation faithful to the chosen direction.

## Outputs

1. `/_context/design/ui-direction.md`
2. `/_context/design/component-guidelines.md`
3. Updated implementation files in `content/`, `templates/`, `components/`, and `uploads/` as needed.

## Definition of Done

- [ ] Visual direction is explicit and coherent.
- [ ] Desktop and mobile experience are validated.
- [ ] Accessibility and performance constraints are respected.
