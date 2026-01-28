# SEO Rails

Guidelines for maintaining excellent SEO across all TAIA projects.

## Required SEO Fields

Every page MUST have:

| Field | Requirements |
|-------|--------------|
| Title | 1-60 characters, unique per page |
| Description | 1-160 characters, compelling and accurate |
| Canonical URL | Absolute URL, self-referencing by default |
| Language | Valid BCP 47 code (es, en, etc.) |

## Page Title Format

```
{Page Title} | {Site Name}
```

Examples:
- `Servicios de Desarrollo Web | Mi Empresa`
- `Cómo Elegir un Framework Frontend | Blog`
- `Producto Premium X | Tienda`

## Meta Description

- Describe the page content accurately
- Include primary keyword naturally
- End with a call to action when appropriate
- Don't duplicate across pages

## Canonical URLs

Always use absolute URLs:
```html
<link rel="canonical" href="https://example.com/about/" />
```

Rules:
- Self-referencing canonicals for unique pages
- Point duplicates to the main version
- Include trailing slash consistently

## Indexing Control

Use `noindex` appropriately:

| Page Type | Index? |
|-----------|--------|
| Main content | Yes |
| Search results | No |
| Filter pages | No (or use canonical to main) |
| Draft/preview | No |
| Thank you pages | No |
| Login/admin | No |

## Hreflang (Multi-language)

For international sites:
```html
<link rel="alternate" hreflang="es" href="https://example.com/es/about/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/about/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about/" />
```

## Sitemap

Auto-generated sitemap must include:
- All indexable pages
- Last modification date
- Change frequency (monthly for static, weekly for blog)
- Priority (1.0 for home, 0.8 for main pages, 0.6 for posts)

Exclude:
- noindex pages
- Drafts
- Admin pages

## Robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml

Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
```

## Structured Data (JSON-LD)

Required for:

### Organization (homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png"
}
```

### WebPage (all pages)
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Meta description"
}
```

### Article (blog posts)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post Title",
  "datePublished": "2024-01-15",
  "author": { "@type": "Person", "name": "Author" }
}
```

### Product (e-commerce)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "EUR"
  }
}
```

## Heading Structure

Every page must have:
- Exactly ONE `<h1>` (the main page title)
- Proper hierarchy (h2, h3, h4 - no skipping)
- Descriptive headings (not "Section 1")

## Image SEO

All images must have:
- Descriptive `alt` text
- Explicit `width` and `height`
- Descriptive filenames (not `IMG_001.jpg`)

## Internal Linking

- Use descriptive anchor text (not "click here")
- Link to related content
- Ensure no orphan pages
- Run link checker before deploy

## 404 Page

Custom 404 page must:
- Return HTTP 404 status
- Provide helpful navigation
- Match site design
- Not be indexed (noindex)

## Checklist Before Deploy

- [ ] All pages have unique titles and descriptions
- [ ] Canonical URLs are correct
- [ ] Sitemap is valid and complete
- [ ] Robots.txt allows search engines
- [ ] Structured data validates (test with Google)
- [ ] No broken internal links
- [ ] All images have alt text
- [ ] Heading structure is correct
