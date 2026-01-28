# TAIA System Documentation

## Vision

TAIA (Technical AI Agency) is an agentic web development system designed for:

1. **High Performance**: PageSpeed 100/100/100/100 as the default
2. **SEO Excellence**: Every page optimized for search from day one
3. **Accessibility First**: WCAG 2.1 AA compliance built-in
4. **Agent-Friendly**: Clear guardrails that let AI agents make confident changes
5. **Cost-Effective**: Built on free tiers (Cloudflare Pages, Workers)

## Architecture

```
taia-core/               # Reusable foundation
├── src/
│   ├── components/      # Primitive components (SeoHead, ResponsiveImage, etc.)
│   ├── layouts/         # Base layouts (BaseLayout, PageLayout, CollectionLayout)
│   ├── schemas/         # Zod schemas for content validation
│   ├── scripts/         # CLI tools (validate, link-checker, lighthouse)
│   └── utils/           # Shared utilities
├── docs/                # Agent documentation and rails
└── .agent/              # Antigravity configuration
    ├── rules/           # Repository rules
    └── skills/          # Specialized agent skills

taia-pilot/              # Demo project
├── vendor/taia-core/    # Git submodule
├── src/
│   ├── content/         # CMS-editable content
│   ├── pages/           # Astro pages
│   └── lib/             # Project-specific code
├── functions/           # Cloudflare Workers
└── public/admin/        # Sveltia CMS
```

## Core Principles

### 1. Static by Default
- All pages are pre-rendered at build time
- No client-side JavaScript unless absolutely necessary
- Workers only for dynamic operations (checkout, auth, chat)

### 2. Content Contract
- All content must pass schema validation
- Minimum SEO fields enforced (title < 60 chars, description < 160 chars)
- Products require at least one image
- No broken internal links allowed

### 3. Performance Budget
| Metric | Target |
|--------|--------|
| Performance Score | ≥ 90 |
| Accessibility Score | 100 |
| Best Practices Score | 100 |
| SEO Score | 100 |
| LCP | ≤ 2500ms |
| CLS | ≤ 0.1 |
| TBT | ≤ 200ms |

### 4. Agent Guardrails
- Every change creates a Pull Request (never direct push to main)
- Quality gates must pass before merge
- Clear documentation for every decision
- Skills for common tasks (intake, branding, SEO, UX)

## Quality Gates

Run all checks before deployment:

```bash
pnpm lint          # Code style (StandardJS + TypeScript)
pnpm typecheck     # Type checking
pnpm test          # Schema tests
pnpm taia:validate # Content validation
pnpm taia:links    # Link checking
pnpm build         # Build verification
pnpm taia:lighthouse http://localhost:4321  # Performance audit
```

## Workflow

1. **Planning**: Analyze requirements, create plan
2. **Branch**: Create feature branch from main
3. **Implement**: Make changes following rails
4. **Validate**: Run quality gates locally
5. **PR**: Open Pull Request with checklist
6. **Review**: Automated checks + human review
7. **Merge**: Only after all checks pass
8. **Deploy**: Automatic via Cloudflare Pages

## Key Components

### SeoHead
Complete SEO meta tags with Open Graph, Twitter Cards, JSON-LD.

### ResponsiveImage
Optimized images with srcset, lazy loading, explicit dimensions for CLS.

### SmartLink
Auto-detects internal/external links, accessibility announcements.

### SectionShell
Consistent spacing and responsive containers.

### Content Schemas
Zod validation for pages, posts, products, categories.

## Extension Points

Projects consuming taia-core can:

1. Override CSS custom properties for theming
2. Extend schemas with additional fields
3. Add project-specific components
4. Create custom layouts using BaseLayout

## Related Documentation

- [SEO Rails](./SEO_RAILS.md) - SEO best practices and requirements
- [Performance Rails](./PERFORMANCE_RAILS.md) - Performance optimization guide
- [Content Rails](./CONTENT_RAILS.md) - Content guidelines and structure
