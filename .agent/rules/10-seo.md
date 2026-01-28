# SEO Rules

## Required for Every Page

1. **Title tag** - Unique, 1-60 characters
2. **Meta description** - Unique, 1-160 characters
3. **Canonical URL** - Self-referencing absolute URL
4. **H1** - Exactly one per page

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
