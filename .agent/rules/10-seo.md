# SEO Rules

## Required for Every Page

1. **Title tag** - Unique, 1-60 characters
2. **Meta description** - Unique, 1-160 characters
3. **Canonical URL** - Self-referencing absolute URL
4. **H1** - Exactly one per page
5. **Open Graph tags** - og:title, og:description, og:image
6. **Twitter Card tags** - twitter:card, twitter:title, twitter:image

## Social Meta Tags

```html
<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description" />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:url" content="https://example.com/page/" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
```

## Schema Validation

All content must pass SEO schema:
```typescript
seoSchema.parse({
  title: 'Page Title', // max 60 chars
  description: 'Description', // max 160 chars
})
```

## Structured Data

Add JSON-LD for:
- Organization (homepage)
- WebPage (all pages)
- Article (blog posts)
- Product (e-commerce)
- LocalBusiness (if physical location)

## Multi-language (hreflang)

For international sites:
```html
<link rel="alternate" hreflang="es" href="https://example.com/es/page/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/page/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/page/" />
```

## Local SEO

For businesses with physical location:
- NAP (Name, Address, Phone) consistent across site
- Google Business Profile linked and verified
- LocalBusiness schema on contact/about page
- Location pages for multi-location businesses

## Indexing Control

Use `noindex: true` for:
- Admin pages
- Search results
- Draft content
- Thank you pages

## Internal Linking

- Run `pnpm taia:links` before deploy
- Zero broken links tolerated
- Use descriptive anchor text

## Sitemap/Robots

- Sitemap auto-generated
- Check robots.txt blocks admin/api

## Related Skills

- `skill_seo_strategy` - Keyword research, URL architecture, content planning
- `skill_local_seo` - Google Business Profile, citations, reviews
