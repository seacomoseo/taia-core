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

## Content Model

- `content/settings.yml` defines collections, singles, icons and singular labels
- `content/<collection>/_index.<lang>.md` provides `path` (children prefix) and `slug` (collection page)
- `content/singles/_home.<lang>.md` defines the homepage
- CMS fields use `i18n: true` for translatable content and `i18n: 'duplicate'` for technical fields

## Agent Rules

See `.agent/rules/` for detailed guidelines:
- `00-global.md` - Standards & Context directory `/_context/`
- `10-seo.md` - Technical SEO & Social Meta
- `11-performance.md` - Budgets & Vitals
- `12-accessibility.md` - WCAG 2.1 AA
- `21-marketing.md` - Tracking, Ads & Local
- `50-skills.md` - Full Agency Workflow

## Skills: The Agency Workflow

See `.agent/skills/` for the step-by-step process:

1.  **Discovery**: `Project Intake` (Inmediate context digestion), `Competitive Analysis`.
2.  **Strategy**: `SWOT Analysis (DAFO)`, `Marketing Strategy`, `SEO Strategy`.
3.  **Branding**: `Brand Identity` (Full identity & copy manual).
4.  **Execution**: `CMS Schema Generator`, `E-commerce MVP`, `PR Workflow`.
5.  **Audit**: `Performance Audit`, `UX Review`.
6.  **Wow**: `Delivery Presenter` (The premium strategic summary).
