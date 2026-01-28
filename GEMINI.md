# TAIA Core

## Global Rules

**Code Style**: StandardJS (no semicolons, 2 spaces, single quotes). All code in English.

**Quality First**: SEO, Performance, and Accessibility are mandatory, not optional.

**PR Policy**: Never push to main. Always create PR with quality gates passing.

## Quick Commands

```bash
pnpm lint          # Check code style
pnpm typecheck     # TypeScript check
pnpm test          # Run tests
pnpm taia:validate # Validate content
pnpm taia:links    # Check internal links
pnpm taia:lighthouse <url>  # Performance audit
```

## Targets

- Lighthouse: 90+ Performance, 100 A11y/BP/SEO
- LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms

## Documentation

- [TAIA System](./docs/TAIA_SYSTEM.md) - Architecture and vision
- [SEO Rails](./docs/SEO_RAILS.md) - SEO requirements
- [Performance Rails](./docs/PERFORMANCE_RAILS.md) - Speed optimization
- [Content Rails](./docs/CONTENT_RAILS.md) - Content guidelines

## Agent Rules

See `.agent/rules/` for detailed rules on:
- Global standards (`00-global.md`)
- SEO (`10-seo.md`)
- Performance (`11-performance.md`)
- Accessibility (`12-accessibility.md`)
- E-commerce (`20-ecommerce.md`)
- CMS (`30-cms.md`)
- PR Workflow (`40-pr-workflow.md`)

## Skills

See `.agent/skills/` for specialized tasks.
