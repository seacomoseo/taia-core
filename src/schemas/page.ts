import { z } from 'zod'
import { seoSchema } from './seo'

/**
 * Page schema - for static pages (home, about, contact, services, etc.)
 */
export const pageSchema = z.object({
  // Content
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  body: z.string().optional(),

  // SEO
  seo: seoSchema,

  // Layout
  template: z.enum(['default', 'landing', 'minimal']).optional().default('default'),

  // Status
  draft: z.boolean().optional().default(false),

  // Dates
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),

  // Navigation
  menuOrder: z.number().int().optional(),
  showInNav: z.boolean().optional().default(true),
  parent: z.string().optional()
})

export type Page = z.infer<typeof pageSchema>
