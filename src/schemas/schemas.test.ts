import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import {
  seoSchema,
  pageSchema,
  postSchema,
  productSchema,
  categorySchema,
  getSchemaForType,
  validate
} from './index'
import { getSchemaFields } from './schema-org'

describe('SEO Schema', () => {
  it('validates correct SEO data', () => {
    const data = {
      title: 'Test Page Title',
      description: 'This is a test description for the page.'
    }
    const result = validate(seoSchema, data)
    expect(result.success).toBe(true)
  })

  it('rejects empty title', () => {
    const data = {
      title: '',
      description: 'Valid description'
    }
    const result = validate(seoSchema, data)
    expect(result.success).toBe(false)
  })

  it('warns about long title', () => {
    const data = {
      title: 'A'.repeat(65),
      description: 'Valid description'
    }
    const result = validate(seoSchema, data)
    expect(result.success).toBe(false)
  })

  it('warns about long description', () => {
    const data = {
      title: 'Valid title',
      description: 'D'.repeat(165)
    }
    const result = validate(seoSchema, data)
    expect(result.success).toBe(false)
  })
})

describe('Page Schema', () => {
  it('validates minimal page', () => {
    const data = {
      title: 'About Us',
      slug: 'about',
      seo: {
        title: 'About Us | My Site',
        description: 'Learn about our company and mission.'
      }
    }
    const result = validate(pageSchema, data)
    expect(result.success).toBe(true)
  })

  it('rejects page without slug', () => {
    const data = {
      title: 'About Us',
      seo: {
        title: 'About Us',
        description: 'Description'
      }
    }
    const result = validate(pageSchema, data)
    expect(result.success).toBe(false)
  })
})

describe('Post Schema', () => {
  it('validates blog post', () => {
    const data = {
      title: 'My First Post',
      slug: 'my-first-post',
      excerpt: 'A short excerpt',
      seo: {
        title: 'My First Post | Blog',
        description: 'Read about my first blog post.'
      },
      publishedAt: '2024-01-15'
    }
    const result = validate(postSchema, data)
    expect(result.success).toBe(true)
  })

  it('requires publishedAt date', () => {
    const data = {
      title: 'My Post',
      slug: 'my-post',
      seo: {
        title: 'Title',
        description: 'Description'
      }
    }
    const result = validate(postSchema, data)
    expect(result.success).toBe(false)
  })
})

describe('Product Schema', () => {
  it('validates product with required fields', () => {
    const data = {
      title: 'Cool Product',
      slug: 'cool-product',
      description: 'A really cool product you should buy.',
      price: 29.99,
      seo: {
        title: 'Cool Product | Shop',
        description: 'Buy our cool product today.'
      },
      images: [
        { src: '/images/product.jpg', alt: 'Cool product image' }
      ]
    }
    const result = validate(productSchema, data)
    expect(result.success).toBe(true)
  })

  it('rejects negative price', () => {
    const data = {
      title: 'Product',
      slug: 'product',
      description: 'Description',
      price: -10,
      seo: { title: 'Title', description: 'Desc' },
      images: [{ src: '/img.jpg', alt: 'Alt' }]
    }
    const result = validate(productSchema, data)
    expect(result.success).toBe(false)
  })

  it('requires at least one image', () => {
    const data = {
      title: 'Product',
      slug: 'product',
      description: 'Description',
      price: 10,
      seo: { title: 'Title', description: 'Desc' },
      images: []
    }
    const result = validate(productSchema, data)
    expect(result.success).toBe(false)
  })
})

describe('Category Schema', () => {
  it('validates category', () => {
    const data = {
      title: 'Electronics',
      slug: 'electronics',
      seo: {
        title: 'Electronics | Shop',
        description: 'Browse our electronics collection.'
      }
    }
    const result = validate(categorySchema, data)
    expect(result.success).toBe(true)
  })
})

describe('Schema Registry', () => {
  const getSettingsSchemaTypes = () => {
    const settingsPath = path.join(process.cwd(), 'content/config.yml')
    if (!fs.existsSync(settingsPath)) return []
    const raw = fs.readFileSync(settingsPath, 'utf8')
    const config = (yaml.load(raw) as Record<string, any>) || {}
    const collections = Array.isArray(config.collections) ? config.collections : []
    const singles = Array.isArray(config.singles) ? config.singles : []
    return [...collections, ...singles]
      .map((entry) => entry?.schemaType)
      .filter((value): value is string => typeof value === 'string')
  }

  it('maps schema types used in config.yml', () => {
    const schemaTypes = getSettingsSchemaTypes()
    if (!schemaTypes.length) return

    for (const schemaType of schemaTypes) {
      const schema = getSchemaForType(schemaType as any)
      expect(schema).not.toBeNull()
    }
  })

  it('keeps CMS fields aligned with schema definitions', () => {
    const getSchemaKeys = (schema: any) => {
      const shape = typeof schema?._def?.shape === 'function' ? schema._def.shape() : null
      return shape ? Object.keys(shape) : []
    }

    const schemaTypes = getSettingsSchemaTypes()
    if (!schemaTypes.length) return

    for (const schemaType of schemaTypes) {
      const schema = getSchemaForType(schemaType as any)
      if (!schema) continue
      const keys = getSchemaKeys(schema)
      const fields = getSchemaFields(schemaType as any)
      for (const field of fields) {
        expect(keys).toContain(field.name)
      }
    }
  })
})
