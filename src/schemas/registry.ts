import type { z } from 'zod'
import { categorySchema } from './category'
import { pageSchema } from './page'
import { postSchema } from './post'
import { productSchema } from './product'
import { SchemaOrgType } from './schema-org'

type SchemaRegistry = Record<SchemaOrgType, z.ZodSchema | null>

export const schemaRegistry: SchemaRegistry = {
  WebSite: pageSchema,
  WebPage: pageSchema,
  Article: postSchema,
  BlogPosting: postSchema,
  NewsArticle: postSchema,
  ProfilePage: pageSchema,
  AboutPage: pageSchema,
  ContactPage: pageSchema,
  FAQPage: pageSchema,
  HowTo: pageSchema,
  Event: pageSchema,
  Organization: pageSchema,
  Service: pageSchema,
  Product: productSchema,
  Brand: pageSchema,
  CollectionPage: categorySchema,
  ItemList: pageSchema,
  BreadcrumbList: pageSchema,
  LocalBusiness: pageSchema,
  Restaurant: pageSchema,
  Place: pageSchema,
  Person: pageSchema,
  Review: pageSchema,
  AggregateRating: pageSchema,
  SoftwareApplication: pageSchema,
  VideoObject: pageSchema,
  ImageObject: pageSchema,
  JobPosting: pageSchema,
  Course: pageSchema
}

export function getSchemaForType (type: SchemaOrgType): z.ZodSchema | null {
  return schemaRegistry[type] || null
}
