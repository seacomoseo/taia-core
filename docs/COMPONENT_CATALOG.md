# Core Component Catalog

Reusable UI primitives available from `@core/components/*`.

## Navigation and links

- `Header` and `Footer` - core default chrome components (overridable from project components).
- `SmartLink` - internal/external logic, obfuscation options (`obfuscate`, `obfuscateOutsideHome`), email action UX.
- `LanguageSwitcher` - reusable language switcher with desktop pills and compact variant for footer.
- `MaterialIcon` - Material Symbols wrapper with self-hosted font support.

## Content and structure

- `SectionShell` - spacing/container shell.
- `CollectionList` - render collection entries by language.
- `TableOfContents` - heading-driven in-page TOC.
- `FaqAccordion` - FAQ accordion with optional JSON-LD.
- `ReviewsList` - reviews/ratings block with optional JSON-LD.
- Markdown shortcodes via remark plugin:
  - `{{sitemap_tree}}` injects the generated sitemap tree.
  - `[[Button label]](/url)` marks link as `is-button` class.
  - `[Button label](/url){.is-button .is-button-primary}` adds custom classes to the same link.

## Media

- `ResponsiveImage` - AVIF/WebP + fallback + image JSON-LD.
- `SmartVideo` - local/YouTube/Vimeo embeds with privacy-friendly defaults.
- `LightboxGallery` - modal gallery with navigation and zoom interactions.
- `Carousel` - generic scroll carousel controls.

## Contact and forms

- `FloatingContactButton` - floating CTA action group.
- `AjaxForm` - progressive form submit with anti-spam guards and conditional UX hooks.
- `LeafletField` - map input for point/radius/polygon values.

## Accessibility and layout baseline

- `SeoHead`, `SkipLink`, `FocusOutlines`, `BaseLayout`, `PageLayout`, `CollectionLayout`.
