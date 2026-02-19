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
