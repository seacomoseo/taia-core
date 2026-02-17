// Export all schemas
// Validation utilities
import type { z } from 'zod'

export { seoSchema, type SeoData, type JsonLd } from './seo'
export { pageSchema, type Page } from './page'
export { postSchema, type Post } from './post'
export { productSchema, type Product } from './product'
export { categorySchema, type Category } from './category'
export { schemaRegistry, getSchemaForType } from './registry'

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: z.ZodError['errors'] }

/**
 * Validate data against a schema
 */
export function validate<T> (
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, errors: result.error.errors }
}

/**
 * Format validation errors for display
 */
export function formatErrors (errors: z.ZodError['errors']): string {
  return errors
    .map(err => `  - ${err.path.join('.')}: ${err.message}`)
    .join('\n')
}
