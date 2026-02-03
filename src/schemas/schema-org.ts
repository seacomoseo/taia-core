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
  label: string
  widget: string
  required?: boolean
  default?: any
  fields?: CMSField[]
  options?: any
  hint?: string
  pattern?: string[]
  multiple?: boolean
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
    { name: 'slug', label: 'Slug', widget: 'string', required: false, hint: 'Si vacío, se infiere del nombre del archivo', i18n: 'duplicate' },
    { name: 'title', label: 'Título', widget: 'string', required: true, i18n: true },
    { name: 'description', label: 'Descripción Corta', widget: 'text', required: true, hint: 'Usado para meta description', i18n: true },
    { name: 'image', label: 'Imagen Destacada', widget: 'image', required: false, i18n: 'duplicate' },
    { name: 'imageAlt', label: 'Alt de Imagen', widget: 'string', required: false, i18n: true }
  ]

  const seoFields: CMSField = {
    name: 'seo',
    label: 'SEO Avanzado',
    widget: 'object',
    collapsed: true,
    required: false,
    i18n: true,
    fields: [
      { name: 'title', label: 'Meta Title', widget: 'string', hint: 'Si vacío, usa el título principal', required: false, i18n: true },
      { name: 'description', label: 'Meta Description', widget: 'text', hint: 'Si vacío, usa la descripción principal', required: false, i18n: true },
      { name: 'canonical', label: 'Canonical URL', widget: 'string', required: false, i18n: 'duplicate' },
      { name: 'noindex', label: 'No Index', widget: 'boolean', default: false, required: false, i18n: 'duplicate' }
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
        { name: 'publishedAt', label: 'Fecha de Publicación', widget: 'datetime', required: true, i18n: 'duplicate' },
        { name: 'modifiedAt', label: 'Fecha de Modificación', widget: 'datetime', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'Product':
      return [
        ...commonFisrt,
        { name: 'images', label: 'Imágenes', widget: 'image', multiple: true, required: false, i18n: 'duplicate' },
        { name: 'price', label: 'Precio', widget: 'number', required: true, i18n: 'duplicate' },
        { name: 'compareAtPrice', label: 'Precio Comparado', widget: 'number', required: false, i18n: 'duplicate' },
        { name: 'currency', label: 'Moneda', widget: 'string', default: 'EUR', i18n: 'duplicate' },
        { name: 'sku', label: 'SKU', widget: 'string', i18n: 'duplicate' },
        { name: 'brand', label: 'Marca', widget: 'string', i18n: 'duplicate' },
        { name: 'gtin', label: 'GTIN', widget: 'string', required: false, i18n: 'duplicate' },
        { name: 'inStock', label: 'En Stock', widget: 'boolean', default: true, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'Service':
      return [
        ...commonFisrt,
        { name: 'provider', label: 'Proveedor', widget: 'string', i18n: 'duplicate' },
        { name: 'areaServed', label: 'Área de Servicio', widget: 'string', i18n: true },
        { name: 'serviceType', label: 'Tipo de Servicio', widget: 'string', i18n: true },
        { name: 'hoursAvailable', label: 'Horario Disponible', widget: 'string', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'Person':
      return [
        ...commonFisrt,
        { name: 'jobTitle', label: 'Cargo', widget: 'string', i18n: true },
        { name: 'email', label: 'Email', widget: 'string', i18n: 'duplicate' },
        { name: 'telephone', label: 'Teléfono', widget: 'string', i18n: 'duplicate' },
        { name: 'sameAs', label: 'Perfiles Sociales', widget: 'list', required: false, i18n: 'duplicate', fields: [{ name: 'url', label: 'URL', widget: 'string', i18n: 'duplicate' }] },
        ...commonLast
      ]
    case 'LocalBusiness':
    case 'Restaurant':
      return [
        ...commonFisrt,
        { name: 'images', label: 'Imágenes', widget: 'image', multiple: true, required: false, i18n: 'duplicate' },
        { name: 'address', label: 'Dirección', widget: 'string', i18n: true },
        { name: 'telephone', label: 'Teléfono', widget: 'string', i18n: 'duplicate' },
        { name: 'priceRange', label: 'Rango de Precios', widget: 'string', i18n: 'duplicate' },
        { name: 'openingHours', label: 'Horario', widget: 'string', i18n: 'duplicate' },
        { name: 'geo', label: 'Coordenadas', widget: 'object', required: false, i18n: 'duplicate', fields: [
          { name: 'latitude', label: 'Latitud', widget: 'number', i18n: 'duplicate' },
          { name: 'longitude', label: 'Longitud', widget: 'number', i18n: 'duplicate' }
        ] },
        ...commonLast
      ]
    case 'Organization':
      return [
        ...commonFisrt,
        { name: 'images', label: 'Imágenes', widget: 'image', multiple: true, required: false, i18n: 'duplicate' },
        { name: 'legalName', label: 'Nombre Legal', widget: 'string', required: false, i18n: 'duplicate' },
        { name: 'url', label: 'URL', widget: 'string', required: false, i18n: 'duplicate' },
        { name: 'logo', label: 'Logo', widget: 'image', required: false, i18n: 'duplicate' },
        { name: 'sameAs', label: 'Perfiles Sociales', widget: 'list', required: false, i18n: 'duplicate', fields: [{ name: 'url', label: 'URL', widget: 'string', i18n: 'duplicate' }] },
        ...commonLast
      ]
    case 'Event':
      return [
        ...commonFisrt,
        { name: 'startDate', label: 'Fecha de Inicio', widget: 'datetime', required: true, i18n: 'duplicate' },
        { name: 'endDate', label: 'Fecha de Fin', widget: 'datetime', required: false, i18n: 'duplicate' },
        { name: 'location', label: 'Ubicación', widget: 'string', i18n: true },
        { name: 'eventStatus', label: 'Estado del Evento', widget: 'string', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'FAQPage':
      return [
        ...commonFisrt,
        { name: 'questions', label: 'Preguntas', widget: 'list', i18n: true, fields: [
          { name: 'question', label: 'Pregunta', widget: 'string', i18n: true },
          { name: 'answer', label: 'Respuesta', widget: 'text', i18n: true }
        ] },
        ...commonLast
      ]
    case 'HowTo':
      return [
        ...commonFisrt,
        { name: 'steps', label: 'Pasos', widget: 'list', i18n: true, fields: [
          { name: 'name', label: 'Paso', widget: 'string', i18n: true },
          { name: 'text', label: 'Descripción', widget: 'text', i18n: true }
        ] },
        ...commonLast
      ]
    case 'Review':
      return [
        ...commonFisrt,
        { name: 'itemReviewed', label: 'Elemento Evaluado', widget: 'string', i18n: true },
        { name: 'reviewRating', label: 'Puntuación', widget: 'number', i18n: 'duplicate' },
        { name: 'reviewBody', label: 'Reseña', widget: 'text', i18n: true },
        ...commonLast
      ]
    case 'AggregateRating':
      return [
        ...commonFisrt,
        { name: 'ratingValue', label: 'Valoración', widget: 'number', i18n: 'duplicate' },
        { name: 'reviewCount', label: 'Número de Reseñas', widget: 'number', i18n: 'duplicate' },
        ...commonLast
      ]
    case 'JobPosting':
      return [
        ...commonFisrt,
        { name: 'employmentType', label: 'Tipo de Empleo', widget: 'string', i18n: 'duplicate' },
        { name: 'jobLocation', label: 'Ubicación', widget: 'string', i18n: true },
        { name: 'baseSalary', label: 'Salario Base', widget: 'string', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'Course':
      return [
        ...commonFisrt,
        { name: 'provider', label: 'Proveedor', widget: 'string', i18n: 'duplicate' },
        { name: 'educationalLevel', label: 'Nivel', widget: 'string', required: false, i18n: true },
        ...commonLast
      ]
    case 'WebSite':
      return [
        ...commonFisrt,
        { name: 'image', label: 'Imagen Destacada', widget: 'image', required: false, i18n: 'duplicate' },
        { name: 'imageAlt', label: 'Alt de Imagen', widget: 'string', required: false, i18n: true },
        { name: 'url', label: 'URL', widget: 'string', required: false, i18n: 'duplicate' },
        { name: 'potentialAction', label: 'Acción Potencial', widget: 'string', required: false, i18n: 'duplicate' },
        ...commonLast
      ]
    case 'ItemList':
      return [
        ...commonFisrt,
        { name: 'image', label: 'Imagen Destacada', widget: 'image', required: false, i18n: 'duplicate' },
        { name: 'imageAlt', label: 'Alt de Imagen', widget: 'string', required: false, i18n: true },
        { name: 'itemListElement', label: 'Elementos', widget: 'list', i18n: true, fields: [
          { name: 'name', label: 'Nombre', widget: 'string', i18n: true },
          { name: 'url', label: 'URL', widget: 'string', required: false, i18n: 'duplicate' }
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
