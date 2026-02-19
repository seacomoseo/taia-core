# Core Change Log

Short traceability log for behavior changes inside `core/`.

## 2026-02-17 - Core change tracking protocol

- Change: formalized core change tracking triad (policy + skills + docs)
- Impacted paths:
  - `core/AGENTS.md`
  - `core/agents/skills/skill_skill_ops/SKILL.md`
  - `core/docs/CORE_CHANGELOG.md`
- Why: ensure requests that affect `core/` are consistently documented and auditable.
- Follow-up: apply this protocol for every future `core/` behavior update.

## 2026-02-17 - Reusable advanced UI primitives (phase 3)

- Change: expanded core component system with advanced link/media/content primitives and stronger layout/component reuse guidance.
- Impacted paths:
  - `core/src/components/SmartLink.astro`
  - `core/src/components/ResponsiveImage.astro`
  - `core/src/components/CollectionList.astro`
  - `core/src/components/TableOfContents.astro`
  - `core/src/components/FaqAccordion.astro`
  - `core/src/components/ReviewsList.astro`
  - `core/src/components/SmartVideo.astro`
  - `core/src/components/LightboxGallery.astro`
  - `core/src/components/Carousel.astro`
  - `core/src/components/FloatingContactButton.astro`
  - `core/src/components/MaterialIcon.astro`
  - `core/src/components/index.ts`
  - `core/agents/skills/skill_astro_sveltia_tailwind/SKILL.md`
  - `core/docs/TAIA_SYSTEM.md`
- Why: provide reusable building blocks for higher UX/SEO quality across many projects while reducing per-project duplicated implementation.
- Follow-up: add AJAX forms, Leaflet field inputs, legal/cookies automation, and contact event tracking in the next phases.

## 2026-02-17 - AJAX forms and spatial input foundation (phase 4)

- Change: added reusable AJAX form primitives and backend endpoint, plus Leaflet-based spatial input support.
- Impacted paths:
  - `core/src/components/AjaxForm.astro`
  - `core/src/components/LeafletField.astro`
  - `core/src/integration/endpoints/api/form-submit.ts`
  - `core/src/integration/taia-core.ts`
  - `core/src/components/index.ts`
  - `core/docs/TAIA_SYSTEM.md`
- Why: provide reusable form UX with anti-spam baseline and map data capture required by service/product lead flows.
- Follow-up: add server adapters for email/CRM delivery, legal consent persistence, and richer anti-abuse/rate limiting.

## 2026-02-17 - Technical SEO output and contact tracking foundation (phase 5)

- Change: added generated endpoints for `robots.txt`, `llms.txt`, `_redirects`, `sitemap.xml`, and HTML sitemap page; added GA4 contact event bridge with dev-console fallback.
- Impacted paths:
  - `core/src/integration/endpoints/robots-txt.ts`
  - `core/src/integration/endpoints/llms-txt.ts`
  - `core/src/integration/endpoints/redirects.ts`
  - `core/src/integration/endpoints/sitemap-xml.ts`
  - `core/src/integration/endpoints/sitemap-page.ts`
  - `core/src/layouts/BaseLayout.astro`
  - `core/src/components/SmartLink.astro`
  - `core/src/components/AjaxForm.astro`
  - `core/src/integration/taia-core.ts`
- Why: centralize technical output required by SEO/hosting and standardize contact measurement in GA4-compatible format.
- Follow-up: add legal/cookie consent gating to tracking and optional CMP integration.

## 2026-02-17 - CMS-managed style and routing source files

- Change: added CMS-editable `styles.yml`, `redirects.yml`, `robots.txt`, and `llms.txt` sources and runtime style token injection.
- Impacted paths:
  - `core/src/services/config-service.ts`
  - `core/src/layouts/BaseLayout.astro`
  - `core/src/styles/tailwind.css`
  - `core/src/cms/i18n/en.yml`
  - `core/src/cms/i18n/es.yml`
  - `content/styles.yml`
  - `content/redirects.yml`
  - `content/robots.txt`
  - `content/llms.txt`
- Why: make design and routing behavior configurable from content/CMS with reusable defaults.
- Follow-up: extend style model with spacing/radius/motion tokens and validate values.

## 2026-02-19 - Collection entryPrefix contract and globals label localization

- Change: replaced collection `_index` route prefix key from `path` to `entryPrefix` and improved CMS globals field labels using localized values from `content/globals/<lang>.yml`.
- Impacted paths:
  - `core/src/services/config-service.ts`
  - `core/AGENTS.md`
  - `core/agents/skills/skill_i18n_content/SKILL.md`
- Why: avoid naming ambiguity and improve CMS authoring UX in multilingual projects.
- Follow-up: optionally migrate single-page route key naming in a future breaking release for full consistency.

## 2026-02-19 - Reusable GitHub Actions workflow in core

- Change: added reusable CI/deploy workflow in core and prepared pilot to consume it.
- Impacted paths:
  - `core/.github/workflows/astro-cloudflare-reusable.yml`
- Why: centralize pipeline logic in core for easier maintenance across multiple projects.
- Follow-up: version workflows with tags/SHAs in consumers and add release notes for workflow changes.

## 2026-02-19 - Sitemap HTML UX and noindex-aware obfuscated links

- Change: redesigned `/sitemap` HTML output with language switch, grouped hierarchy by collection, and obfuscated links for pages marked `seo.noindex`.
- Impacted paths:
  - `core/src/integration/endpoints/sitemap-page.ts`
  - `components/Footer.astro`
- Why: improve sitemap usability for humans, keep a clean hierarchy, and reduce authority transfer from noindex links in the human-facing map.
- Follow-up: optionally add dedicated translated labels from globals for collection/single section titles.

## 2026-02-19 - Localized sitemap routing and core chrome defaults

- Change: sitemap page now serves both `/sitemap` and `/<lang>/sitemap`, with a nested tree structure (singles first) and neutral styling for noindex entries; added core `Header`/`Footer` components and wired them into core default layout.
- Impacted paths:
  - `core/src/integration/endpoints/sitemap-page.ts`
  - `core/src/integration/taia-core.ts`
  - `core/src/components/Header.astro`
  - `core/src/components/Footer.astro`
  - `core/src/layouts/default.astro`
  - `core/src/components/index.ts`
  - `core/docs/COMPONENT_CATALOG.md`
- Why: improve URL consistency and provide reusable baseline chrome in core while keeping sitemap UX clean and hierarchical.
- Follow-up: optionally expose sitemap title/subtitle through `content/globals/*` for full runtime copy control.

## 2026-02-19 - Sitemap as content page with shared model

- Change: moved human sitemap rendering to content page flow (`pages` collection/layout) using shared core model logic.
- Impacted paths:
  - `core/src/services/sitemap-service.ts`
  - `core/src/integration/endpoints/sitemap-page.ts`
  - `layouts/page.astro`
  - `content/pages/sitemap.es.md`
  - `content/pages/sitemap.en.md`
- Why: allow full CMS-driven customization (title, slug, seo, body) while keeping a centralized generation model.
- Follow-up: optionally cache sitemap model in memory during long-lived runtime processes.

## 2026-02-19 - Markdown shortcode engine for sitemap and button links

- Change: added markdown shortcode processing with `{{sitemap_tree}}` and button-style markdown links using `[[Label]](/url)`.
- Impacted paths:
  - `core/src/markdown/remark-shortcodes.ts`
  - `core/src/integration/astro-config.ts`
  - `core/src/styles/tailwind.css`
  - `content/pages/sitemap.es.md`
  - `content/pages/sitemap.en.md`
- Why: keep sitemap placement/content editable from markdown while preserving static build performance and reusable syntax.
- Follow-up: add more shortcodes under the same engine with a strict token registry.

## 2026-02-19 - Markdown heading and shortcode styling policy

- Change: removed shortcode-specific visual styling so shortcode output inherits markdown base styles; enforced no literal Markdown H1 policy in agent guidance and added build-time safeguard converting heading depth 1 to 2.
- Impacted paths:
  - `core/src/markdown/remark-shortcodes.ts`
  - `core/src/styles/tailwind.css`
  - `core/AGENTS.md`
  - `content/**/*.md` (existing h1 normalized to h2)
- Why: keep content rendering consistent with layout-driven H1 ownership and avoid hidden style coupling in shortcode output.
- Follow-up: optionally add markdown lint checks for heading depth in CI.

## 2026-02-19 - Reusable language switcher in header/footer

- Change: introduced `LanguageSwitcher` core component and integrated it into both core and pilot header/footer for consistent multi-language navigation UX.
- Impacted paths:
  - `core/src/components/LanguageSwitcher.astro`
  - `core/src/components/Header.astro`
  - `core/src/components/Footer.astro`
  - `components/Header.astro`
  - `components/Footer.astro`
  - `core/src/components/index.ts`
  - `core/docs/COMPONENT_CATALOG.md`
- Why: provide a reusable, discoverable language navigation pattern without duplicating logic across projects.
- Follow-up: add optional language-specific slug mapping when localized routes diverge beyond prefix changes.

## 2026-02-19 - Shared localized route mapping for switcher and hreflang

- Change: extracted localized route resolution into `LanguageRouteService`, reused it in `LanguageSwitcher`, and added automatic hreflang/x-default alternates in `BaseLayout`.
- Impacted paths:
  - `core/src/services/language-route-service.ts`
  - `core/src/components/LanguageSwitcher.astro`
  - `core/src/layouts/BaseLayout.astro`
- Why: prevent locale switch 404s on translated slugs and keep language switch + SEO alternate tags consistent from a single mapping source.
- Follow-up: optionally cache generated route maps by content hash instead of process lifetime in long-running runtimes.

## 2026-02-19 - XML sitemap indexability and hreflang optimization

- Change: updated XML sitemap generation to exclude `seo.noindex` pages, add `xhtml:link` hreflang alternates per URL, include `x-default`, and output stable sorted entries with absolute URLs.
- Impacted paths:
  - `core/src/integration/endpoints/sitemap-xml.ts`
  - `core/src/services/sitemap-service.ts`
- Why: align sitemap output with indexable canonicals only and strengthen multilingual discovery with route-safe alternate mapping.
- Follow-up: split into sitemap index files if URL volume grows near protocol limits.
