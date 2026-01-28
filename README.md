# TAIA Core

Reusable foundation for high-performance, SEO-optimized Astro websites.

## Features

- 🚀 **Performance-first**: Targets 100/100/100/100 Lighthouse scores
- 🔍 **SEO-ready**: Complete meta tags, JSON-LD, sitemap support
- ♿ **Accessible**: WCAG 2.1 AA compliant components
- 📝 **Content validation**: Zod schemas for type-safe content
- 🤖 **Agent-friendly**: Clear guardrails and documentation

## Installation

### As a submodule (recommended)

```bash
git submodule add https://github.com/your-org/taia-core.git vendor/taia-core
```

### As npm package (future)

```bash
pnpm add taia-core
```

## Components

| Component | Description |
|-----------|-------------|
| `SeoHead` | Complete SEO meta, OG, Twitter, JSON-LD |
| `ResponsiveImage` | Optimized images with srcset |
| `SmartLink` | Auto internal/external detection |
| `SectionShell` | Consistent layout wrapper |
| `SkipLink` | Accessibility skip navigation |
| `FocusOutlines` | Keyboard focus styles |

## Layouts

| Layout | Use Case |
|--------|----------|
| `BaseLayout` | Root HTML shell |
| `PageLayout` | Single pages |
| `CollectionLayout` | Lists/archives with pagination |

## Schemas

Zod schemas for content validation:

```typescript
import { pageSchema, postSchema, productSchema } from 'taia-core/schemas'
```

## CLI Tools

```bash
pnpm taia:validate          # Validate content against schemas
pnpm taia:links             # Check for broken internal links
pnpm taia:lighthouse <url>  # Run Lighthouse with budgets
```

## Quality Gates

```bash
pnpm lint          # ESLint (StandardJS + TypeScript)
pnpm typecheck     # TypeScript check
pnpm test          # Vitest tests
pnpm build         # Build verification
```

## Performance Targets

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| TBT | ≤ 200ms |

## Documentation

- [TAIA System](./docs/TAIA_SYSTEM.md) - Architecture overview
- [SEO Rails](./docs/SEO_RAILS.md) - SEO guidelines
- [Performance Rails](./docs/PERFORMANCE_RAILS.md) - Performance optimization
- [Content Rails](./docs/CONTENT_RAILS.md) - Content structure

## Agent Skills

Located in `.agent/skills/`:

| Skill | Purpose |
|-------|---------|
| `skill_project_intake` | Gather requirements |
| `skill_brand_and_copy` | Brand and messaging |
| `skill_seo_strategy` | Keyword research and URL architecture |
| `skill_ux_review` | UX and accessibility audit |
| `skill_performance_audit` | Lighthouse testing |
| `skill_cms_schema_generator` | CMS configuration |
| `skill_pr_workflow` | Pull request standards |
| `skill_ecommerce_mvp` | E-commerce setup |

## License

MIT
