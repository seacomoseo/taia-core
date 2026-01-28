# CMS Rules (Sveltia CMS)

## Configuration

CMS config lives at `/public/admin/config.yml`.

## Collections

Standard collections:
- `pages` - Static pages
- `posts` - Blog content
- `products` - E-commerce items
- `categories` - Taxonomy
- `settings` - Site configuration

## Field Naming

- Use snake_case for field names
- Match Zod schema field names
- Provide helpful labels and hints

## Media

- Store in `/public/images/`
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
