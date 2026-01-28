import { z } from 'zod'
import { seoSchema } from './seo'

/**
 * Post schema - for blog posts and articles
 */
export const postSchema = z.object({
  // Content
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().max(300, 'Excerpt should be under 300 characters').optional(),
  body: z.string().optional(),

  // SEO
  seo: seoSchema,

  // Media
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().optional(),

  // Taxonomy
  categories: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),

  // Author
  author: z.string().optional(),

  // Status
  draft: z.boolean().optional().default(false),

  // Dates
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),

  // Reading
  readingTime: z.number().int().positive().optional()
})

export type Post = z.infer<typeof postSchema>
