import { z } from 'zod'
import { seoSchema } from './seo'

/**
 * Product schema - for e-commerce products
 */
export const productSchema = z.object({
  // Content
  title: z.string().min(1, 'Product title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Product description is required'),
  body: z.string().optional(),

  // SEO
  seo: seoSchema,

  // Pricing
  price: z.number().positive('Price must be positive'),
  compareAtPrice: z.number().positive().optional(),
  currency: z.string().length(3).optional().default('EUR'),

  // Media
  images: z.array(z.object({
    src: z.string(),
    alt: z.string()
  })).min(1, 'At least one image is required'),

  // Inventory
  sku: z.string().optional(),
  inStock: z.boolean().optional().default(true),
  quantity: z.number().int().nonnegative().optional(),

  // Taxonomy
  category: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),

  // Variants (optional for MVP)
  variants: z.array(z.object({
    name: z.string(),
    options: z.array(z.string())
  })).optional(),

  // Status
  draft: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),

  // Dates
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
})

export type Product = z.infer<typeof productSchema>
