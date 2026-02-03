# TAIA Core - Global Rules

## Code Standards

### Style
- **StandardJS**: No semicolons, 2 spaces indentation, single quotes
- **TypeScript**: Strict mode, explicit types for exports
- **Language**: All code and internal documentation in English.
- **User Artifacts**: All artifacts (`task.md`, `implementation_plan.md`, `walkthrough.md`) MUST be in Spanish.
- **Deliverables**: All client-facing outputs in `/_context/` MUST be in Spanish by default.
- **Naming**: camelCase for variables/functions, PascalCase for components/types.

### File Organization
```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── schemas/        # Zod validation schemas
├── scripts/        # CLI tools
└── utils/          # Shared utilities
```

### Commit Messages
Format: `type(scope): description`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(seo): add JSON-LD support for products`
- `fix(images): correct srcset generation`
- `docs(rails): update performance budgets`

## Quality Gates

All changes must pass:
1. `pnpm lint` - No linting errors
2. `pnpm typecheck` - No type errors
3. `pnpm test` - All tests pass
4. `pnpm build` - Build succeeds

## Pull Request Policy

1. **Never push directly to main**
2. Create feature branch from main
3. Open PR with description and checklist
4. Wait for CI checks to pass
5. Request review for significant changes

## No Overengineering

- Start simple, add complexity only when needed
- Prefer composition over inheritance
- Avoid premature abstraction
- Document non-obvious decisions in code comments

## Dependencies

- Minimize external dependencies
- Prefer built-in APIs over libraries
- Any new dependency requires justification
- Keep bundle size minimal

## TAIA Outputs Directory

All strategic documents and client assets live in `/_context/`:

```
/_context/
├── _init/        # Raw client context (Ingestion ONLY. Cleaned after processing)
├── intake/       # Project requirements & brief
├── competitive/  # Competitor analysis
├── strategy/     # SWOT, Positioning, Main Goals
├── brand/        # Brand assets & Logo proposals
├── marketing/    # Marketing strategy
├── seo/          # SEO planning
├── ads/          # Paid ads strategy
├── perf/         # Performance audits
├── ux/           # UX reviews
└── delivery/     # Final summary presentation
```

## Skills

Use specialized skills for complex tasks:
- See `.agent/skills/` for available skills
- See `.agent/rules/50-skills.md` for usage guide
- Always read SKILL.md before executing
