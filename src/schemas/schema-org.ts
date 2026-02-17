import { z } from 'zod'

export const SchemaOrgType = z.enum([
  'WebSite',
  'WebPage',
  'Article',
  'BlogPosting',
  'NewsArticle',
  'ProfilePage',
  'AboutPage',
  'ContactPage',
  'FAQPage',
  'HowTo',
  'Event',
  'Organization',
  'Service',
  'Product',
  'Brand',
  'CollectionPage',
  'ItemList',
  'BreadcrumbList',
  'LocalBusiness',
  'Restaurant',
  'Place',
  'Person',
  'Review',
  'AggregateRating',
  'SoftwareApplication',
  'VideoObject',
  'ImageObject',
  'JobPosting',
  'Course'
])

export type SchemaOrgType = z.infer<typeof SchemaOrgType>

export interface CMSField {
  name: string
  label: string | Record<string, string>
  widget: string
  required?: boolean
  default?: any
  fields?: CMSField[]
  options?: any
  hint?: string | Record<string, string>
  label_singular?: string | Record<string, string>
  pattern?: string[]
  multiple?: boolean
  allow_add?: boolean
  i18n?: boolean | 'duplicate'
  collection?: string
  search_fields?: string[]
  value_field?: string
  display_fields?: string[]
  file?: string
  field?: CMSField
  collapsed?: boolean // Sveltia specific
  minimize_collapsed?: boolean
  summary?: string // Sveltia specific
}

/**
 * Retorna los campos básicos según el tipo de Schema.org
 */
export function getSchemaFields (type: SchemaOrgType): CMSField[] {
  const baseFields: CMSField[] = [
    { name: 'slug', label: 'slug', widget: 'string', required: true, hint: 'slug', i18n: true },
    { name: 'title', label: 'title', widget: 'string', required: true, i18n: true },
    { name: 'description', label: 'description', widget: 'text', required: false, hint: 'description', i18n: true },
    { name: 'image', label: 'image', widget: 'image', required: false, i18n: 'duplicate' },
    { name: 'imageAlt', label: 'imageAlt', widget: 'string', required: false, i18n: true }
  ]

  const seoFields: CMSField = {
    name: 'seo',
    label: 'seo',
    hint: 'seo',
    widget: 'object',
    collapsed: true,
    required: false,
    i18n: true,
    fields: [
      { name: 'title', label: 'title', widget: 'string', hint: 'seoTitle', required: false, i18n: true },
      { name: 'description', label: 'description', widget: 'text', hint: 'seoDescription', required: false, i18n: true },
      { name: 'canonical', label: 'canonical', widget: 'string', required: false, i18n: 'duplicate' },
      { name: 'noindex', label: 'noindex', widget: 'boolean', default: false, required: false, i18n: 'duplicate' }
    ]
  }

  const commonFisrt = baseFields
  const commonLast = [seoFields]

  switch (type) {
    case 'Article':
    case 'BlogPosting':
    case 'NewsArticle':
      return [
        ...commonFisrt,
        { name: 'publishedAt', label: 'publishedAt', widget: 'datetime', required: true, i18n: 'duplicate' },
        { name: 'modifiedAt', label: 'modifiedAt', widget: 'datetime', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'Product':
      return [
        ...commonFisrt,
        { name: 'images', label: 'images', widget: 'image', multiple: true, required: false, i18n: 'duplicate' },
        { name: 'price', label: 'price', widget: 'number', required: true, i18n: 'duplicate' },
        { name: 'compareAtPrice', label: 'compareAtPrice', widget: 'number', required: false, i18n: 'duplicate' },
        { name: 'sku', label: 'sku', widget: 'string', i18n: 'duplicate' },
        { name: 'brand', label: 'brand', widget: 'string', i18n: 'duplicate' },
        { name: 'gtin', label: 'gtin', widget: 'string', required: false, i18n: 'duplicate' },
        { name: 'inStock', label: 'inStock', widget: 'boolean', default: true, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'Service':
      return [
        ...commonFisrt,
        { name: 'provider', label: 'provider', widget: 'string', i18n: 'duplicate' },
        { name: 'areaServed', label: 'areaServed', widget: 'string', i18n: true },
        { name: 'serviceType', label: 'serviceType', widget: 'string', i18n: true },
        { name: 'hoursAvailable', label: 'hoursAvailable', widget: 'string', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'Person':
      return [
        ...commonFisrt,
        { name: 'jobTitle', label: 'jobTitle', widget: 'string', i18n: true },
        { name: 'email', label: 'email', widget: 'string', i18n: 'duplicate' },
        { name: 'telephone', label: 'telephone', widget: 'string', i18n: 'duplicate' },
        { name: 'sameAs', label: 'sameAs', widget: 'list', required: false, i18n: 'duplicate', fields: [{ name: 'url', label: 'url', widget: 'string', i18n: 'duplicate' }] },
        ...commonLast
      ]
    case 'LocalBusiness':
    case 'Restaurant':
      return [
        ...commonFisrt,
        { name: 'images', label: 'images', widget: 'image', multiple: true, required: false, i18n: 'duplicate' },
        { name: 'address', label: 'address', widget: 'string', i18n: true },
        { name: 'telephone', label: 'telephone', widget: 'string', i18n: 'duplicate' },
        { name: 'priceRange', label: 'priceRange', widget: 'string', i18n: 'duplicate' },
        { name: 'openingHours', label: 'openingHours', widget: 'string', i18n: 'duplicate' },
        { name: 'geo', label: 'geo', widget: 'object', required: false, i18n: 'duplicate', fields: [
          { name: 'latitude', label: 'latitude', widget: 'number', i18n: 'duplicate' },
          { name: 'longitude', label: 'longitude', widget: 'number', i18n: 'duplicate' }
        ] },
        ...commonLast
      ]
    case 'Organization':
      return [
        ...commonFisrt,
        { name: 'images', label: 'images', widget: 'image', multiple: true, required: false, i18n: 'duplicate' },
        { name: 'legalName', label: 'legalName', widget: 'string', required: false, i18n: 'duplicate' },
        { name: 'url', label: 'url', widget: 'string', required: false, i18n: 'duplicate' },
        { name: 'logo', label: 'logo', widget: 'image', required: false, i18n: 'duplicate' },
        { name: 'sameAs', label: 'sameAs', widget: 'list', required: false, i18n: 'duplicate', fields: [{ name: 'url', label: 'url', widget: 'string', i18n: 'duplicate' }] },
        ...commonLast
      ]
    case 'Event':
      return [
        ...commonFisrt,
        { name: 'startDate', label: 'startDate', widget: 'datetime', required: true, i18n: 'duplicate' },
        { name: 'endDate', label: 'endDate', widget: 'datetime', required: false, i18n: 'duplicate' },
        { name: 'location', label: 'location', widget: 'string', i18n: true },
        { name: 'eventStatus', label: 'eventStatus', widget: 'string', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'FAQPage':
      return [
        ...commonFisrt,
        { name: 'questions', label: 'questions', widget: 'list', i18n: true, fields: [
          { name: 'question', label: 'question', widget: 'string', i18n: true },
          { name: 'answer', label: 'answer', widget: 'text', i18n: true }
        ] },
        ...commonLast
      ]
    case 'HowTo':
      return [
        ...commonFisrt,
        { name: 'steps', label: 'steps', widget: 'list', i18n: true, fields: [
          { name: 'name', label: 'name', widget: 'string', i18n: true },
          { name: 'text', label: 'text', widget: 'text', i18n: true }
        ] },
        ...commonLast
      ]
    case 'Review':
      return [
        ...commonFisrt,
        { name: 'itemReviewed', label: 'itemReviewed', widget: 'string', i18n: true },
        { name: 'reviewRating', label: 'reviewRating', widget: 'number', i18n: 'duplicate' },
        { name: 'reviewBody', label: 'reviewBody', widget: 'text', i18n: true },
        ...commonLast
      ]
    case 'AggregateRating':
      return [
        ...commonFisrt,
        { name: 'ratingValue', label: 'ratingValue', widget: 'number', i18n: 'duplicate' },
        { name: 'reviewCount', label: 'reviewCount', widget: 'number', i18n: 'duplicate' },
        ...commonLast
      ]
    case 'JobPosting':
      return [
        ...commonFisrt,
        { name: 'employmentType', label: 'employmentType', widget: 'string', i18n: 'duplicate' },
        { name: 'jobLocation', label: 'jobLocation', widget: 'string', i18n: true },
        { name: 'baseSalary', label: 'baseSalary', widget: 'string', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'Course':
      return [
        ...commonFisrt,
        { name: 'provider', label: 'provider', widget: 'string', i18n: 'duplicate' },
        { name: 'educationalLevel', label: 'educationalLevel', widget: 'string', required: false, i18n: true },
        ...commonLast
      ]
    case 'WebSite':
      return [
        ...commonFisrt,
        { name: 'image', label: 'image', widget: 'image', required: false, i18n: 'duplicate' },
        { name: 'imageAlt', label: 'imageAlt', widget: 'string', required: false, i18n: true },
        { name: 'url', label: 'url', widget: 'string', required: false, i18n: 'duplicate' },
        { name: 'potentialAction', label: 'potentialAction', widget: 'string', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'ItemList':
      return [
        ...commonFisrt,
        { name: 'image', label: 'image', widget: 'image', required: false, i18n: 'duplicate' },
        { name: 'imageAlt', label: 'imageAlt', widget: 'string', required: false, i18n: true },
        { name: 'itemListElement', label: 'itemListElement', widget: 'list', i18n: true, fields: [
          { name: 'name', label: 'name', widget: 'string', i18n: true },
          { name: 'url', label: 'url', widget: 'string', required: false, i18n: 'duplicate' }
        ] },
        ...commonLast
      ]
    default:
      return [
        ...commonFisrt,
        ...commonLast
      ]
  }
}
