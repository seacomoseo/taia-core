import { z } from 'zod'
import { seoSchema } from './seo'

/**
 * Category schema - for product/post categories
 */
export const categorySchema = z.object({
  // Content
  title: z.string().min(1, 'Category title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),

  // SEO
  seo: seoSchema,

  // Media
  image: z.string().optional(),
  imageAlt: z.string().optional(),

  // Hierarchy
  parent: z.string().optional(),
  order: z.number().int().optional().default(0),

  // Status
  draft: z.boolean().optional().default(false)
})

export type Category = z.infer<typeof categorySchema>
