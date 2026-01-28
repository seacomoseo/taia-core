---
name: CMS Schema Generator
description: Generate Sveltia CMS config and Zod schemas
---

# CMS Schema Generator Skill

Create and maintain CMS configuration aligned with Zod schemas.

## When to Use

- Setting up new CMS
- Adding new content types
- Modifying existing collections
- Ensuring schema consistency

## Inputs

1. **Content Types**: List of collections needed
2. **Existing Schemas** (optional): Zod schemas to mirror

## Process

### Step 1: Define Collections

Standard collections:
- `pages` - Static pages
- `posts` - Blog articles
- `products` - E-commerce items
- `categories` - Taxonomy
- `settings` - Site config

### Step 2: Generate Zod Schema

For each collection, create/update schema in `src/schemas/`:

```typescript
// src/schemas/[collection].ts
import { z } from 'zod'
import { seoSchema } from './seo'

export const collectionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  // ... other fields
  seo: seoSchema
})

export type Collection = z.infer<typeof collectionSchema>
```

### Step 3: Generate CMS Config

Map Zod types to CMS widgets:

| Zod Type | CMS Widget |
|----------|------------|
| z.string() | string |
| z.string().max(N) | string (with maxLength) |
| z.boolean() | boolean |
| z.number() | number |
| z.coerce.date() | datetime |
| z.enum([...]) | select |
| z.array(z.string()) | list |
| z.object({...}) | object |

### Step 4: Create config.yml

Output to `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: owner/repo
  branch: main

media_folder: public/images
public_folder: /images

collections:
  - name: pages
    label: Pages
    folder: src/content/pages
    create: true
    slug: "{{slug}}"
    fields:
      - { name: title, label: Title, widget: string }
      - { name: slug, label: Slug, widget: string }
      - { name: body, label: Body, widget: markdown }
      - name: seo
        label: SEO
        widget: object
        collapsed: true
        fields:
          - { name: title, label: Title, widget: string, hint: "Max 60 chars" }
          - { name: description, label: Description, widget: text, hint: "Max 160 chars" }
          - { name: noindex, label: Noindex, widget: boolean, default: false }

  - name: posts
    label: Blog Posts
    folder: src/content/posts
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { name: title, label: Title, widget: string }
      - { name: slug, label: Slug, widget: string }
      - { name: publishedAt, label: Published, widget: datetime }
      - { name: excerpt, label: Excerpt, widget: text }
      - { name: featuredImage, label: Image, widget: image, required: false }
      - { name: body, label: Body, widget: markdown }
      - name: categories
        label: Categories
        widget: relation
        collection: categories
        value_field: slug
        search_fields: [title]
        multiple: true
      - name: seo
        label: SEO
        widget: object
        collapsed: true
        fields:
          - { name: title, label: Title, widget: string }
          - { name: description, label: Description, widget: text }

  - name: products
    label: Products
    folder: src/content/products
    create: true
    slug: "{{slug}}"
    fields:
      - { name: title, label: Title, widget: string }
      - { name: slug, label: Slug, widget: string }
      - { name: description, label: Description, widget: text }
      - { name: price, label: Price, widget: number, value_type: float }
      - { name: compareAtPrice, label: Compare Price, widget: number, required: false }
      - name: images
        label: Images
        widget: list
        fields:
          - { name: src, label: Image, widget: image }
          - { name: alt, label: Alt Text, widget: string }
      - { name: category, label: Category, widget: relation, collection: categories, value_field: slug }
      - { name: inStock, label: In Stock, widget: boolean, default: true }
      - { name: body, label: Body, widget: markdown }
      - name: seo
        label: SEO
        widget: object
        collapsed: true
        fields:
          - { name: title, label: Title, widget: string }
          - { name: description, label: Description, widget: text }

  - name: categories
    label: Categories
    folder: src/content/categories
    create: true
    slug: "{{slug}}"
    fields:
      - { name: title, label: Title, widget: string }
      - { name: slug, label: Slug, widget: string }
      - { name: description, label: Description, widget: text, required: false }
```

### Step 5: Validate Consistency

After generating:

1. Run `pnpm taia:validate` to ensure schemas match
2. Test CMS by creating sample content
3. Verify content files parse correctly

## Outputs

1. `src/schemas/*.ts` - Zod schema files
2. `public/admin/config.yml` - CMS configuration
3. `public/admin/index.html` - CMS entry point

## Definition of Done

- [ ] Zod schemas created for all collections
- [ ] CMS config mirrors Zod schemas
- [ ] Field hints/validation match
- [ ] Test content creates valid files
- [ ] `pnpm taia:validate` passes

## Troubleshooting

### Schema Mismatch
If CMS content doesn't validate:
1. Check field names match exactly
2. Verify required/optional alignment
3. Check array vs single value

### Widget Selection
When unsure which widget:
1. Start with `string`
2. Use `text` for multi-line
3. Use `markdown` for rich content
4. Use `object` for nested data
