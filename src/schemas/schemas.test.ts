import { describe, it, expect } from 'vitest'
import {
  seoSchema,
  pageSchema,
  postSchema,
  productSchema,
  categorySchema,
  validate
} from './index'

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
