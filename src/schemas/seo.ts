import { z } from 'zod'

/**
 * Base SEO schema - minimum required SEO fields
 */
export const seoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(60, 'Title should be under 60 characters'),
  description: z.string().min(1, 'Description is required').max(160, 'Description should be under 160 characters'),
  canonical: z.string().url().optional(),
  noindex: z.boolean().optional().default(false),
  nofollow: z.boolean().optional().default(false),
  image: z.string().optional(),
  imageAlt: z.string().optional()
})

/**
 * JSON-LD structured data types
 */
export const jsonLdSchema = z.record(z.unknown())

export type SeoData = z.infer<typeof seoSchema>
export type JsonLd = z.infer<typeof jsonLdSchema>
