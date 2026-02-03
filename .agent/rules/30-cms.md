---
trigger: always_on
---

# CMS Rules (Sveltia CMS)

## Configuration

CMS config is served dynamically at `/admin/config.yml` (fingerprinted).

## Collections

Standard collections:
- `pages` - Static pages
- `posts` - Blog content
- `products` - E-commerce items
- `categories` - Taxonomy
- `singles` - Individual pages (home, legal, etc.)
- `templates` - Astro templates editable as code
- `components` - Astro components editable as code
- `i18n` - Translatable strings per language
- `settings` - Site configuration

Collections and singles support `icon` metadata for CMS labels. Also only collections support `singular`.
Use `i18n: true` on translatable fields in CMS.

## Field Naming

- Use snake_case for field names
- Match Zod schema field names
- Provide helpful labels and hints

## i18n Fields

- Use `i18n: true` for translatable text fields
- Use `i18n: 'duplicate'` for technical fields (ids, prices, booleans, relations)

## Media

- Store in `/uploads/`
- Use relative paths in content
- Organize by type (blog, products, etc.)

## Validation

CMS validation should mirror Zod schemas:
- Required fields marked required
- String lengths match schema limits
- Patterns for slugs, dates, etc.

## Editing Experience

- Group related fields
- Provide preview
- Clear documentation in widgets
- Sensible defaults

## Schema Sync

When updating schemas:
1. Update Zod schema first
2. Update CMS config to match
3. Run `pnpm taia:validate` to check existing content

## Related Skills

- `skill_cms_schema_generator` - CMS setup and schema generation
