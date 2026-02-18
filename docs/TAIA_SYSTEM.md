# TAIA System Documentation

## Vision

TAIA (Technical AI Agency) is an agentic system designed to act as a full-service partner:
1.  **Strategic Onboarding**: Digest raw client context (notes, PDFs, fragments) and fill strategic gaps.
2.  **Market Intelligence**: Automatic competitive analysis and SWOT (DAFO) generation.
3.  **Brand Identity**: Crafting professional voice, tone, and visual directions from scratch.
4.  **High-Performance Delivery**: PageSpeed 100/100/100/100 and SEO excellence as the default foundation.
5.  **Premium Presentation**: Delivering not just code, but a high-impact strategic summary that highlights project value.

## Architecture

```
taia-pilot/          # Demo project
│── content/         # CMS-editable content
│── components/      # Project components
│── layouts/         # Astro content layouts
│── uploads/         # CMS uploads
├── public/          # Build-time assets (favicons)
└── core/            # Reusable foundation like git submodule (from github.com/seacomoseo/taia-core)
    ├── src/
    │   ├── components/  # Primitive components (SeoHead, ResponsiveImage, etc.)
    │   ├── layouts/     # Base layouts (BaseLayout, PageLayout, CollectionLayout)
    │   ├── schemas/     # Zod schemas for content validation
    │   ├── scripts/     # CLI tools (validate, link-checker, lighthouse)
    │   └── utils/       # Shared utilities
    ├── docs/            # Agent documentation and rails
    └── agents/          # Agent system
        └── skills/      # Specialized agent skills
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
- CMS fields must mark i18n content (`i18n: true`) and technical fields (`i18n: 'duplicate'`)

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

### FaqAccordion and ReviewsList
Reusable trust components with optional Schema.org JSON-LD output.

### SmartVideo, LightboxGallery, Carousel
Progressive media primitives for video embeds and interactive galleries.

### AjaxForm and LeafletField
Progressive AJAX form flow with anti-spam guards, conditional fields, file previews, and map-based spatial input.

## Generated Technical Outputs

- `/sitemap.xml` generated from content and config.
- `/sitemap` human-readable site map page.
- `/robots.txt` served from `content/robots.txt` (with defaults if missing).
- `/llms.txt` served from `content/llms.txt` or generated fallback.
- `/_redirects` served from `content/redirects.yml` for Cloudflare Pages-compatible redirects.

## Contact Tracking

- Unified custom event: `contact` with payload `{ id, type, label }`.
- Development mode logs contact events to console.
- Production mode sends events to GA4 via `gtag` when configured.

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

## Agent Configuration

See `core/AGENTS.md` for the canonical agent policy and workflow.

Skills live in `core/agents/skills/`:
- **Discovery**: Project Intake, Competitive Analysis.
- **Strategy**: SWOT Analysis (DAFO), Marketing Strategy, SEO Strategy, Local SEO, Paid Ads.
- **Identity**: Brand Identity.
- **Development**: CMS Schema Generator, E-commerce MVP.
- **Quality**: Performance Audit, UX Review.
- **Delivery**: Delivery Presenter, PR Workflow, Skill Manager.
