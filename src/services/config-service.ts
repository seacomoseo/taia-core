import crypto from 'node:crypto'
import yaml from 'js-yaml'
import YAML from 'yaml'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import { getSchemaFields, SchemaOrgType as SchemaOrgTypeEnum, type SchemaOrgType as SchemaOrgTypeValue, type CMSField } from '../schemas/schema-org'

export type { SchemaOrgTypeValue as SchemaOrgType }

interface CmsTranslations {
  labels: Record<string, string>
  hints: Record<string, string>
  collections?: Record<string, string>
  files?: Record<string, string>
}

export interface CollectionConfig {
  id: string
  label: string
  singular?: string
  icon?: string
  schemaType: SchemaOrgTypeValue
  layout?: string
  folder?: string
  taxonomyOf?: string[]
}

export interface SingleConfig {
  id: string
  label: string
  icon?: string
  schemaType: SchemaOrgTypeValue
  layout?: string
  file?: string
}

export interface TaiaConfig {
  siteUrl?: string
  siteName: string
  description: string
  themeColor: string
  backgroundColor: string
  currency?: string
  faviconSource: string
  cmsLocale?: string
  email?: string
  ga4Id?: string
  languages: string[]
  collections: CollectionConfig[]
  singles: SingleConfig[]
}

export interface StylesConfig {
  colors?: {
    accent?: string
    text?: string
    background?: string
  }
  typography?: {
    heading?: string
    body?: string
  }
}

export class ConfigService {
  private configPath: string
  private projectRoot: string

  constructor (projectRoot: string) {
    this.projectRoot = projectRoot
    this.configPath = path.join(projectRoot, 'content/config.yml')
  }

  getTaiaConfig (): TaiaConfig {
    if (!fs.existsSync(this.configPath)) {
      return {
        siteUrl: '',
        siteName: 'TAIA Project',
        description: 'Built with TAIA Core',
        themeColor: '#000000', // Sane defaults
        backgroundColor: '#ffffff',
        currency: 'EUR',
        faviconSource: 'public/favicon.svg',
        cmsLocale: 'es',
        languages: ['es'],
        collections: [],
        singles: []
      }
    }
    const content = fs.readFileSync(this.configPath, 'utf8')
    const config = (yaml.load(content) as Record<string, unknown>) || {}

    const collections = Array.isArray(config.collections)
      ? (config.collections as any[]).map((c) => ({ ...c, id: c.id || c.name }))
      : []
    const singles = Array.isArray(config.singles)
      ? (config.singles as any[]).map((s) => ({ ...s, id: s.id || s.name }))
      : []

    const languages = Array.isArray(config.languages) && config.languages.length > 0
      ? config.languages
      : ['es']

    return {
      ...config,
      languages,
      collections,
      singles
    } as TaiaConfig
  }
  
  getDefaultLanguage(): string {
    const config = this.getTaiaConfig()
    return config.languages[0] || 'es'
  }

  getStylesConfig (): StylesConfig {
    const stylesPath = path.join(this.projectRoot, 'content/styles.yml')
    if (!fs.existsSync(stylesPath)) return {}
    try {
      const raw = fs.readFileSync(stylesPath, 'utf8')
      const data = (yaml.load(raw) as StylesConfig) || {}
      return data
    } catch {
      return {}
    }
  }

  getCmsLocale(): string {
    const config = this.getTaiaConfig()
    const cmsLocale = typeof config.cmsLocale === 'string' ? config.cmsLocale : 'es'
    return cmsLocale === 'en' ? 'en' : 'es'
  }

  hasProductCollection (): boolean {
    const config = this.getTaiaConfig()
    return config.collections.some(c => c.schemaType === 'Product')
  }

  // Helper para leer frontmatter sin dependencias extra
  private readFrontmatter(filePath: string): any {
    if (!fs.existsSync(filePath)) return null
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const match = content.match(/^---\n([\s\S]*?)\n---/)
      if (match) {
        return yaml.load(match[1] || '')
      }
    } catch (e) {
      console.warn(`Error reading frontmatter from ${filePath}`, e)
    }
    return null
  }

  getCollectionPrefix (col: CollectionConfig, lang?: string): string {
    const resolvedLang = lang || this.getDefaultLanguage()
    const indexName = `_index.${resolvedLang}.md`
    const folder = col.folder || path.join('content', col.id)
    const indexPath = path.join(this.projectRoot, folder, indexName)

    const frontmatter = this.readFrontmatter(indexPath)
    if (frontmatter && Object.prototype.hasOwnProperty.call(frontmatter, 'entryPrefix')) {
      return this.normalizePathSegment(frontmatter.entryPrefix || '')
    }

    return this.normalizePathSegment(col.id)
  }

  getCollectionSlug (col: CollectionConfig, lang?: string): string {
    const resolvedLang = lang || this.getDefaultLanguage()
    const indexName = `_index.${resolvedLang}.md`
    const folder = col.folder || path.join('content', col.id)
    const indexPath = path.join(this.projectRoot, folder, indexName)

    const frontmatter = this.readFrontmatter(indexPath)
    if (frontmatter) {
      if (Object.prototype.hasOwnProperty.call(frontmatter, 'slug')) {
        const rawSlug = this.stripLocaleSuffix(frontmatter.slug || '')
        if (rawSlug === '' || rawSlug === '/') {
          const title = typeof frontmatter.title === 'string' ? frontmatter.title.trim() : ''
          return title ? this.slugify(title) : this.normalizePathSegment(col.id)
        }
        return this.normalizePathSegment(rawSlug)
      }
      if (Object.prototype.hasOwnProperty.call(frontmatter, 'entryPrefix')) {
        return this.normalizePathSegment(frontmatter.entryPrefix || '')
      }
    }

    return this.normalizePathSegment(col.id)
  }

  getSingleSlug (single: SingleConfig, lang?: string): string {
    const resolvedLang = lang || this.getDefaultLanguage()
    const normalizedSingleId = single.id.replace(/^_/, '')
    const underscoredFile = `content/singles/_${single.id}.${resolvedLang}.md`
    const defaultFile = `content/singles/${single.id}.${resolvedLang}.md`
    const file = single.file || (fs.existsSync(path.join(this.projectRoot, underscoredFile)) ? underscoredFile : defaultFile)
    const filePath = path.join(this.projectRoot, file)

    const frontmatter = this.readFrontmatter(filePath)
    if (frontmatter) {
      if (Object.prototype.hasOwnProperty.call(frontmatter, 'path')) {
        return this.normalizePathSegment(frontmatter.path || '')
      }
      if (Object.prototype.hasOwnProperty.call(frontmatter, 'slug')) {
        const normalizedSlug = this.stripLocaleSuffix(frontmatter.slug || '')
        if (normalizedSlug === '' || normalizedSlug === '/') {
          if (normalizedSingleId === 'home') return ''
          const title = typeof frontmatter.title === 'string' ? frontmatter.title.trim() : ''
          return title ? this.slugify(title) : this.normalizePathSegment(normalizedSingleId)
        }
        if (normalizedSlug === 'home' || normalizedSlug === '/') return ''
        return this.normalizePathSegment(normalizedSlug)
      }
    }

    return this.normalizePathSegment(normalizedSingleId)
  }

  getSingleEntrySlug (single: SingleConfig, lang?: string): string {
    const resolvedLang = lang || this.getDefaultLanguage()
    const underscoredBase = `_${single.id}`
    const underscoredFile = path.join(this.projectRoot, 'content/singles', `${underscoredBase}.${resolvedLang}.md`)
    if (fs.existsSync(underscoredFile)) return `${underscoredBase}.${resolvedLang}`
    return `${single.id}.${resolvedLang}`
  }

  getLayouts (): string[] {
    const dir = path.join(this.projectRoot, 'layouts')
    return this.listAstroFiles(dir)
  }

  getComponents (): string[] {
    const dir = path.join(this.projectRoot, 'components')
    return this.listAstroFiles(dir)
  }

  private getLayoutFields (layoutName?: string): CMSField[] {
    if (!layoutName) return []
    const filePath = path.join(this.projectRoot, 'layouts', `${layoutName}.astro`)
    if (!fs.existsSync(filePath)) return []
    const source = fs.readFileSync(filePath, 'utf8')
    const fields = this.extractExportedValue(source, 'cmsFields')
    if (!Array.isArray(fields)) return []
    return fields.filter((field) => field && typeof field === 'object' && typeof field.name === 'string')
  }

  private mergeCmsFields (baseFields: CMSField[], extraFields: CMSField[]): CMSField[] {
    if (!extraFields.length) return baseFields
    const seen = new Set(baseFields.map((field) => field.name))
    const merged = [...baseFields]
    for (const field of extraFields) {
      if (!field || typeof field.name !== 'string') continue
      if (seen.has(field.name)) continue
      seen.add(field.name)
      const normalized = this.normalizeProjectField(field, [field.name])
      merged.push(this.applyCmsFieldDefaults(normalized, true))
    }
    return merged
  }

  getCmsConfigFingerprint (): string {
    const hash = crypto.createHash('sha256')
    if (fs.existsSync(this.configPath)) {
      hash.update(fs.readFileSync(this.configPath, 'utf8'))
    }

    const layoutFiles = this.getLayouts().map((name) => path.join(this.projectRoot, 'layouts', `${name}.astro`))
    const componentFiles = this.getComponents().map((name) => path.join(this.projectRoot, 'components', `${name}.astro`))

    for (const filePath of [...layoutFiles, ...componentFiles]) {
      if (fs.existsSync(filePath)) {
        hash.update(filePath)
        hash.update(fs.readFileSync(filePath, 'utf8'))
      }
    }

    return hash.digest('hex').slice(0, 12)
  }

  generateConfigYml (): string {
    const taiaConfig = this.getTaiaConfig()
    const defaultLang = this.getDefaultLanguage()
    const cmsLocale = this.getCmsLocale()
    const cmsTranslations = this.getCmsTranslations(cmsLocale)
    
    const config: any = {
      backend: {
        name: 'github',
        repo: 'owner/repo',
        branch: 'main'
      },
      media_folder: 'uploads', 
      public_folder: '/uploads',
      media_libraries: {
        default: {
          config: {
            max_file_size: 512000000,
            slugify_filename: true,
            folder_support: true,
            transformations: {
              raster_image: {
                format: 'webp',
                quality: 85,
                width: 2048,
                height: 2048
              },
              svg: {
                optimize: false
              }
            }
          }
        }
      },
      slug: {
        encoding: 'ascii',
        clean_accents: true,
        sanitize_replacement: '-'
      },
      output: {
        omit_empty_optional_fields: true,
        encode_file_path: true,
        yaml: {
          quote: 'none',
          indent_size: 2,
          indent_sequences: false
        }
      },
      i18n: {
        structure: 'multiple_files',
        locales: taiaConfig.languages,
        default_locale: defaultLang
      },
      collections: []
    }

    const availableSchemas = SchemaOrgTypeEnum.options

    const layoutNames = this.getLayouts()
    const componentNames = this.getComponents()

    const layoutRelationField: CMSField = {
      name: 'layout',
      label: 'layout',
      widget: 'relation',
      collection: 'layouts',
      search_fields: ['slug'],
      value_field: '{{slug}}',
      display_fields: ['slug'],
      required: false,
      i18n: 'duplicate'
    }

    const iconField: CMSField = {
      name: 'icon',
      label: 'icon',
      widget: 'string',
      required: false,
      hint: 'icon',
      i18n: 'duplicate'
    }

    const taxonomyOfField: CMSField = {
      name: 'taxonomyOf',
      label: 'taxonomyOf',
      label_singular: 'collection',
      widget: 'list',
      allow_add: true,
      required: false,
      hint: 'taxonomyOf',
      field: { name: 'collectionId', label: 'collectionId', widget: 'string' },
      i18n: 'duplicate'
    }

    const taxonomyRelations: Array<{ target: string; field: any }> = []

    // Generar colecciones dinámicas
    for (const col of taiaConfig.collections) {
      const folder = col.folder || `content/${col.id}`
      
      const fields = [
        ...getSchemaFields(col.schemaType),
        { name: 'body', label: 'body', widget: 'markdown', i18n: true }
      ]
      if (!this.hasSchemaDateField(col.schemaType)) {
        fields.splice(1, 0, {
          name: 'order',
          label: 'order',
          widget: 'number',
          default: 0,
          required: false,
          hint: 'order',
          i18n: 'duplicate'
        })
      }
      const layoutFields = this.getLayoutFields(col.layout)
      const mergedFields = this.mergeCmsFields(fields, layoutFields)

    const taxonomyTargets = Array.isArray(col.taxonomyOf) ? col.taxonomyOf : []
    for (const target of taxonomyTargets) {
      taxonomyRelations.push({
        target,
        field: {
          name: col.id,
          label: col.label,
          widget: 'relation',
          collection: col.id,
          search_fields: ['title', 'slug'],
          value_field: '{{slug}}',
          display_fields: ['title'],
          multiple: true,
          required: false,
          i18n: 'duplicate'
        }
      })
    }

      config.collections.push({
        name: col.id,
        label: col.label,
        label_singular: col.singular || col.label,
        folder: folder,
        create: true,
        i18n: true,
        editor: { preview: false },
        slug: '{{slug}}.{{locale}}.md', // Se usará lógica de idioma con la extensión
        icon: col.icon,
        thumbnail: ['image', 'images.*'],
        fields: mergedFields
      })
    }

    for (const relation of taxonomyRelations) {
      const targetCollection = config.collections.find((existing: any) => existing.name === relation.target)
      if (targetCollection) {
        targetCollection.fields.push(relation.field)
      }
    }

    config.collections.push({ divider: true })

    // Generar colección de singles
    if (taiaConfig.singles.length > 0) {
      config.collections.push({
        name: 'singles',
        label: 'singles',
        icon: 'file_open',
        i18n: true,
        editor: { preview: false },
        files: taiaConfig.singles.map((page) => {
          const layoutFields = this.getLayoutFields(page.layout)
          const fields = this.mergeCmsFields([
            ...getSchemaFields(page.schemaType),
            { name: 'body', label: 'body', widget: 'markdown', required: false, i18n: true }
          ], layoutFields)

          return {
            name: page.id,
            label: page.label,
            file: `content/singles/${page.id}.{{locale}}.md`,
            i18n: true,
            editor: { preview: false },
            icon: page.icon,
            thumbnail: ['image', 'images.*'],
            fields: fields
          }
        })
      })
    }

    config.collections.push({ divider: true })

    if (layoutNames.length > 0) {
      config.collections.push({
        name: 'layouts',
        label: 'layouts',
        label_singular: 'layout',
        folder: 'layouts',
        icon: 'castle',
        create: true,
        slug: '{{slug}}',
        extension: 'astro',
        format: 'raw',
        editor: { preview: false },
        fields: [
          { name: 'body', label: 'code', widget: 'code', output_code_only: true }
        ]
      })
    }

    if (componentNames.length > 0) {
      config.collections.push({
        name: 'components',
        label: 'components',
        label_singular: 'component',
        folder: 'components',
        icon: 'brick',
        create: true,
        slug: '{{slug}}',
        extension: 'astro',
        format: 'raw',
        editor: { preview: false },
        fields: [
          { name: 'body', label: 'code', widget: 'code', output_code_only: true }
        ]
      })
    }
    
    const globalsFields = this.buildGlobalsFields(cmsLocale)

    config.collections.push({ divider: true })

    // Configuración editable
    config.collections.push({
      name: 'settings',
      label: 'settings',
      icon: 'settings',
      i18n: true,
      files: [
        {
          name: 'general',
          label: 'general',
          icon: 'build',
          file: 'content/config.yml',
          i18n: false,
          editor: { preview: false },
          fields: [
            { name: 'siteUrl', label: 'siteUrl', widget: 'string', required: false, hint: 'siteUrl' },
            { name: 'siteName', label: 'siteName', widget: 'string' },
            { name: 'description', label: 'description', widget: 'text' },
            { name: 'themeColor', label: 'themeColor', widget: 'string' },
            { name: 'backgroundColor', label: 'backgroundColor', widget: 'string' },
            { name: 'currency', label: 'currency', widget: 'string', default: 'EUR' },
            { name: 'faviconSource', label: 'faviconSource', widget: 'image', hint: 'faviconSource' },
            { name: 'email', label: 'email', widget: 'string', required: false },
            { name: 'phone', label: 'phone', widget: 'string', required: false },
            { name: 'address', label: 'address', widget: 'text', required: false },
            { name: 'ga4Id', label: 'ga4Id', widget: 'string', required: false, hint: 'ga4Id' },
            {
              name: 'languages',
              label: 'languages',
              label_singular: 'lang',
              widget: 'list',
              default: ['es'],
              hint: 'languages',
              collapsed: true,
              minimize_collapsed: true,
              field: [
                { name: 'lang', label: 'lang', widget: 'string' }
              ]
            },
            {
              name: 'cmsLocale',
              label: 'cmsLocale',
              widget: 'select',
              options: [
                { label: '🇪🇸 ES', value: 'es' },
                { label: '🇬🇧 EN', value: 'en' }
              ],
              default: 'es',
            },
            { 
              name: 'collections', 
              label: 'collections', 
              label_singular: 'collection',
              widget: 'list',
              collapsed: true,
              minimize_collapsed: true,
              fields: [
                { name: 'id', label: 'id', widget: 'string' },
                { name: 'label', label: 'label', widget: 'string' },
                { name: 'singular', label: 'singular', widget: 'string', required: false },
                iconField,
                { name: 'schemaType', label: 'schemaType', widget: 'select',  options: availableSchemas },
                layoutRelationField,
                taxonomyOfField
              ]
            },
            { 
              name: 'singles', 
              label: 'singles', 
              label_singular: 'single',
              widget: 'list',
              collapsed: true,
              minimize_collapsed: true,
              fields: [
                { name: 'id', label: 'id', widget: 'string' },
                { name: 'label', label: 'label', widget: 'string' },
                iconField,
                { name: 'schemaType', label: 'schemaType', widget: 'select',  options: availableSchemas  },
                layoutRelationField
              ]
            }
          ]
        },
        {
          name: 'globals',
          label: 'globals',
          icon: 'dictionary',
          file: 'content/globals/{{locale}}.yml',
          i18n: true,
          editor: { preview: false },
          fields: globalsFields
        },
        {
          name: 'styles',
          label: 'styles',
          icon: 'palette',
          file: 'content/styles.yml',
          i18n: false,
          editor: { preview: false },
          fields: [
            {
              name: 'colors',
              label: 'colors',
              widget: 'object',
              fields: [
                { name: 'accent', label: 'accent', widget: 'string', required: false },
                { name: 'text', label: 'text', widget: 'string', required: false },
                { name: 'background', label: 'background', widget: 'string', required: false }
              ]
            },
            {
              name: 'typography',
              label: 'typography',
              widget: 'object',
              fields: [
                { name: 'heading', label: 'heading', widget: 'string', required: false },
                { name: 'body', label: 'body', widget: 'string', required: false }
              ]
            }
          ]
        },
        {
          name: 'redirects',
          label: 'redirects',
          icon: 'alt_route',
          file: 'content/redirects.yml',
          i18n: false,
          root: true,
          editor: { preview: false },
          fields: [
            {
              name: 'items',
              label: 'redirects',
              label_singular: 'redirect',
              widget: 'list',
              collapsed: true,
              minimize_collapsed: true,
              fields: [
                { name: 'from', label: 'from', widget: 'string' },
                { name: 'to', label: 'to', widget: 'string' },
                { name: 'type', label: 'type', widget: 'number', default: 301, required: false }
              ]
            }
          ]
        },
        {
          name: 'robots',
          label: 'robots',
          icon: 'smart_toy',
          file: 'content/robots.txt',
          i18n: false,
          format: 'raw',
          editor: { preview: false },
          fields: [
            { name: 'body', label: 'code', widget: 'code', output_code_only: true }
          ]
        },
        {
          name: 'llms',
          label: 'llms',
          icon: 'network_intel_node',
          file: 'content/llms.txt',
          i18n: false,
          format: 'raw',
          editor: { preview: false },
          fields: [
            { name: 'body', label: 'code', widget: 'code', output_code_only: true }
          ]
        }
      ]
    })

    const localizedConfig = this.localizeCmsConfig(config, cmsTranslations, cmsLocale)

    return YAML.stringify(localizedConfig, {
      indent: 2,
      indentSeq: false,
      blockQuote: 'literal',
      defaultKeyType: 'PLAIN',
      defaultStringType: 'PLAIN',
      lineWidth: 0
    })
  }

  private getCmsTranslations (locale: string): CmsTranslations {
    const cmsLocale = locale === 'en' ? 'en' : 'es'
    const translationsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'cms', 'i18n')
    const filePath = path.join(translationsDir, `${cmsLocale}.yml`)

    if (!fs.existsSync(filePath)) {
      return { labels: {}, hints: {} }
    }

    const raw = fs.readFileSync(filePath, 'utf8')
    const data = (yaml.load(raw) as CmsTranslations) || { labels: {}, hints: {} }
    return {
      labels: data.labels || {},
      hints: data.hints || {},
      collections: data.collections || {},
      files: data.files || {}
    }
  }

  private hasSchemaDateField (schemaType?: string): boolean {
    const fields = getSchemaFields((schemaType || 'WebPage') as any)
    return fields.some((field) => field.widget === 'datetime' || /date/i.test(field.name))
  }

  private localizeCmsConfig (config: any, translations: CmsTranslations, cmsLocale: string): any {
    const localizeCollection = (collection: any) => {
      const localized = { ...collection }
      if (localized.name && translations.collections?.[localized.name]) {
        localized.label = translations.collections?.[localized.name]
      } else if (localized.label) {
        localized.label = this.localizeCmsLabel(localized.label, translations)
      }

      if (localized.name && translations.collections?.[`${localized.name}.singular`]) {
        localized.label_singular = translations.collections?.[`${localized.name}.singular`]
      } else if (localized.label_singular) {
        localized.label_singular = this.localizeCmsLabel(localized.label_singular, translations)
      }
      if (Array.isArray(localized.fields)) {
        localized.fields = localized.fields.map((field: CMSField) => this.localizeCmsField(field, translations, cmsLocale))
      }
      if (Array.isArray(localized.files)) {
        localized.files = localized.files.map((file: any) => {
          const fileKey = localized.name && file.name ? `${localized.name}.${file.name}` : null
          const fileLabel = fileKey && translations.files?.[fileKey]
            ? translations.files?.[fileKey]
            : (file.label ? this.localizeCmsLabel(file.label, translations) : file.label)

          return {
            ...file,
            label: fileLabel,
            fields: Array.isArray(file.fields)
              ? file.fields.map((field: CMSField) => this.localizeCmsField(field, translations, cmsLocale))
              : file.fields
          }
        })
      }
      return localized
    }

    return {
      ...config,
      collections: config.collections.map(localizeCollection)
    }
  }

  private localizeCmsLabel (value: string, translations: CmsTranslations): string {
    return translations.labels[value] || value
  }

  private localizeCmsHint (value: string, translations: CmsTranslations): string {
    return translations.hints[value] || value
  }

  private localizeCmsField (field: CMSField, translations: CmsTranslations, cmsLocale: string): CMSField {
    const localized: CMSField = { ...field }
    const labelIsObject = typeof localized.label === 'object' && localized.label !== null
    const hintIsObject = typeof localized.hint === 'object' && localized.hint !== null
    const singularIsObject = typeof localized.label_singular === 'object' && localized.label_singular !== null

    const localizedLabel = this.resolveLocalizedValue(localized.label, cmsLocale)
    const localizedHint = this.resolveLocalizedValue(localized.hint, cmsLocale)
    const localizedSingular = this.resolveLocalizedValue(localized.label_singular, cmsLocale)

    if (labelIsObject) localized.label = localizedLabel || Object.values(localized.label as Record<string, string>)[0] || ''
    if (hintIsObject && localizedHint) localized.hint = localizedHint
    if (singularIsObject && localizedSingular) localized.label_singular = localizedSingular

    const hasLocalizedLabel = labelIsObject
    const hasLocalizedHint = hintIsObject

    if (!hasLocalizedLabel && localized.name) {
      const labelKey = localized.name
      if (translations.labels[labelKey]) {
        localized.label = translations.labels[labelKey]
      } else if (typeof localized.label === 'string') {
        localized.label = this.localizeCmsLabel(localized.label, translations)
      }
      if (!hasLocalizedHint) {
        if (translations.hints[labelKey]) {
          localized.hint = translations.hints[labelKey]
        } else if (typeof localized.hint === 'string') {
          localized.hint = this.localizeCmsHint(localized.hint, translations)
        }
      }

      const singularLabel = translations.labels[`${labelKey}.singular`]
      if (!localizedSingular && singularLabel) {
        localized.label_singular = singularLabel
      }
    } else if (!hasLocalizedLabel) {
      if (typeof localized.label === 'string') localized.label = this.localizeCmsLabel(localized.label, translations)
      if (!hasLocalizedHint && typeof localized.hint === 'string') localized.hint = this.localizeCmsHint(localized.hint, translations)
    }

    if (typeof localized.label_singular === 'string') {
      const singularTranslation = translations.labels[localized.label_singular]
      if (singularTranslation) localized.label_singular = singularTranslation
    }
    if (localized.fields) {
      localized.fields = localized.fields.map((nested) => this.localizeCmsField(nested, translations, cmsLocale))
    }
    if (localized.field) {
      localized.field = this.localizeCmsField(localized.field, translations, cmsLocale)
    }
    return localized
  }

  private buildGlobalsFields (_cmsLocale: string): CMSField[] {
    const sources = [
      ...this.getLayouts().map((name) => path.join(this.projectRoot, 'layouts', `${name}.astro`)),
      ...this.getComponents().map((name) => path.join(this.projectRoot, 'components', `${name}.astro`))
    ]

    const shape: Record<string, any> = {}
    const localizedLabels = {
      es: this.flattenGlobalsLabels('es'),
      en: this.flattenGlobalsLabels('en')
    }

    for (const filePath of sources) {
      if (!fs.existsSync(filePath)) continue
      const source = fs.readFileSync(filePath, 'utf8')
      const keys = this.extractTranslationKeys(source)
      for (const key of keys) {
        this.setShapeValue(shape, key.split('.'), 'string')
      }

      const cmsGlobals = this.extractExportedValue(source, 'cmsGlobals')
      if (cmsGlobals && typeof cmsGlobals === 'object') {
        this.mergeShape(shape, cmsGlobals)
      }
    }

    return this.shapeToFields(shape, [], localizedLabels)
  }

  private extractTranslationKeys (source: string): string[] {
    const keys = new Set<string>()
    const regex = /\bt\s*\(\s*[^,]+,\s*['"`]([^'"`]+)['"`]/g
    let match: RegExpExecArray | null
    while ((match = regex.exec(source)) !== null) {
      if (match[1]) keys.add(match[1])
    }
    return Array.from(keys)
  }

  private extractExportedValue (source: string, exportName: string): any | null {
    const exportRegex = new RegExp(`export\\s+const\\s+${exportName}\\s*=`, 'm')
    const match = exportRegex.exec(source)
    if (!match) return null

    const startIndex = match.index + match[0].length
    const slice = source.slice(startIndex)
    const firstTokenMatch = /[\[{]/.exec(slice)
    if (!firstTokenMatch) return null

    const tokenIndex = startIndex + (firstTokenMatch.index || 0)
    const valueText = this.extractBalancedExpression(source, tokenIndex)
    if (!valueText) return null

    try {
      return vm.runInNewContext(`(${valueText})`, {})
    } catch (error) {
      console.warn(`Failed to parse ${exportName} in ${this.projectRoot}`, error)
      return null
    }
  }

  private extractBalancedExpression (source: string, startIndex: number): string | null {
    const opening = source[startIndex]
    if (opening !== '{' && opening !== '[') return null
    const closing = opening === '{' ? '}' : ']'
    let depth = 0
    let inString: string | null = null
    let escaped = false

    for (let i = startIndex; i < source.length; i++) {
      const char = source[i]
      if (escaped) {
        escaped = false
        continue
      }
      if (char === '\\') {
        escaped = true
        continue
      }
      if (inString) {
        if (char === inString) inString = null
        continue
      }
      if (char === '"' || char === '\'' || char === '`') {
        inString = char
        continue
      }
      if (char === opening) depth += 1
      if (char === closing) {
        depth -= 1
        if (depth === 0) return source.slice(startIndex, i + 1)
      }
    }

    return null
  }

  private setShapeValue (target: Record<string, any>, pathParts: string[], value: any): void {
    if (pathParts.length === 0) return
    const [head, ...rest] = pathParts
    if (!head) return
    if (rest.length === 0) {
      target[head] = target[head] ?? value
      return
    }
    if (!target[head] || typeof target[head] !== 'object' || Array.isArray(target[head])) {
      target[head] = {}
    }
    this.setShapeValue(target[head], rest, value)
  }

  private mergeShape (target: Record<string, any>, source: any): void {
    if (!source || typeof source !== 'object') return
    for (const [key, value] of Object.entries(source)) {
      if (Array.isArray(value)) {
        target[key] = value
      } else if (value && typeof value === 'object') {
        if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
          target[key] = {}
        }
        this.mergeShape(target[key], value)
      } else {
        target[key] = value
      }
    }
  }

  private shapeToFields (shape: Record<string, any>, pathParts: string[], localizedLabels: { es: Record<string, string>; en: Record<string, string> }): CMSField[] {
    return Object.entries(shape).map(([key, value]) => {
      const fieldPath = [...pathParts, key]
      const pathKey = fieldPath.join('.')
      const label = {
        es: localizedLabels.es[pathKey] || this.humanizeKey(key),
        en: localizedLabels.en[pathKey] || this.humanizeKey(key)
      }

      if (Array.isArray(value)) {
        const itemShape = value[0] ?? 'string'
        if (itemShape && typeof itemShape === 'object' && !Array.isArray(itemShape)) {
          return this.applyCmsFieldDefaults({
            name: key,
            label,
            widget: 'list',
            fields: this.shapeToFields(itemShape, fieldPath, localizedLabels),
            i18n: true
          }, true)
        }
        return this.applyCmsFieldDefaults({
          name: key,
          label,
          widget: 'list',
          field: this.buildFieldFromValue('item', itemShape, fieldPath, localizedLabels),
          i18n: true
        }, true)
      }

      if (value && typeof value === 'object') {
        if ('widget' in value) {
          const field = value as CMSField
          return this.applyCmsFieldDefaults({
            ...field,
            name: field.name || key,
            label: field.label || label
          }, true)
        }
        return this.applyCmsFieldDefaults({
          name: key,
          label,
          widget: 'object',
          fields: this.shapeToFields(value, fieldPath, localizedLabels),
          i18n: true
        }, true)
      }

      return this.buildFieldFromValue(key, value, fieldPath, localizedLabels)
    })
  }

  private buildFieldFromValue (name: string, value: any, pathParts: string[], localizedLabels: { es: Record<string, string>; en: Record<string, string> }): CMSField {
    if (value && typeof value === 'object' && 'widget' in value) {
      const field = value as CMSField
      const normalized = this.normalizeProjectField(field, pathParts)
      const pathKey = pathParts.join('.')
      return this.applyCmsFieldDefaults({
        ...normalized,
        name: normalized.name || name,
        label: normalized.label || {
          es: localizedLabels.es[pathKey] || this.humanizeKey(name),
          en: localizedLabels.en[pathKey] || this.humanizeKey(name)
        }
      }, true)
    }

    const widget = this.resolveWidget(value)
    const pathKey = pathParts.join('.')
    return this.applyCmsFieldDefaults({
      name,
      label: {
        es: localizedLabels.es[pathKey] || this.humanizeKey(name),
        en: localizedLabels.en[pathKey] || this.humanizeKey(name)
      },
      widget,
      i18n: true
    }, true)
  }

  private flattenGlobalsLabels (locale: string): Record<string, string> {
    const filePath = path.join(this.projectRoot, 'content', 'globals', `${locale}.yml`)
    if (!fs.existsSync(filePath)) return {}

    try {
      const raw = fs.readFileSync(filePath, 'utf8')
      const data = (yaml.load(raw) as Record<string, any>) || {}
      const result: Record<string, string> = {}
      this.flattenObjectStrings(data, [], result)
      return result
    } catch {
      return {}
    }
  }

  private flattenObjectStrings (value: any, pathParts: string[], target: Record<string, string>): void {
    if (Array.isArray(value)) return
    if (!value || typeof value !== 'object') return
    for (const [key, nested] of Object.entries(value)) {
      const nextPath = [...pathParts, key]
      if (typeof nested === 'string') {
        target[nextPath.join('.')] = nested
      } else if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
        this.flattenObjectStrings(nested, nextPath, target)
      }
    }
  }

  private humanizeKey (key: string): string {
    return key
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^./, (value) => value.toUpperCase())
  }

  private applyCmsFieldDefaults (field: CMSField, enforceI18n = false): CMSField {
    const normalized: CMSField = { ...field }
    if (normalized.required === undefined) normalized.required = false
    if (normalized.widget === 'list') {
      if (normalized.collapsed === undefined) normalized.collapsed = true
      if (normalized.minimize_collapsed === undefined) normalized.minimize_collapsed = true
      if (normalized.label_singular === undefined && normalized.label) {
        normalized.label_singular = normalized.label
      }
    }
    if (normalized.widget === 'object') {
      if (normalized.collapsed === undefined) normalized.collapsed = true
    }
    if (enforceI18n) {
      normalized.i18n = this.resolveI18nForWidget(normalized.widget)
    }
    if (normalized.fields) {
      normalized.fields = normalized.fields.map((nested) => this.applyCmsFieldDefaults(nested, enforceI18n))
    }
    if (normalized.field) {
      normalized.field = this.applyCmsFieldDefaults(normalized.field, enforceI18n)
    }
    return normalized
  }

  private resolveI18nForWidget (widget?: string): boolean | 'duplicate' {
    const translatableWidgets = new Set(['string', 'text', 'markdown', 'object', 'list'])
    if (widget && translatableWidgets.has(widget)) return true
    return 'duplicate'
  }

  private resolveWidget (value: any): string {
    const normalized = typeof value === 'string' ? value.toLowerCase() : ''
    if (['text', 'markdown', 'number', 'boolean', 'string'].includes(normalized)) {
      return normalized
    }
    return 'string'
  }

  private resolveLocalizedValue (value: string | Record<string, string> | undefined, cmsLocale: string): string | undefined {
    if (!value) return undefined
    if (typeof value === 'string') return value
    if (value[cmsLocale]) return value[cmsLocale]
    if (value.es) return value.es
    if (value.en) return value.en
    const fallback = Object.values(value)[0]
    return typeof fallback === 'string' ? fallback : undefined
  }

  private normalizeProjectField (field: CMSField, pathParts: string[]): CMSField {
    const normalized: CMSField = { ...field }
    const fallbackLabel = { es: normalized.name || pathParts[pathParts.length - 1] || 'field', en: normalized.name || pathParts[pathParts.length - 1] || 'field' }

    if (typeof normalized.label === 'string') {
      normalized.label = { es: normalized.label, en: normalized.label }
    } else if (!normalized.label) {
      normalized.label = fallbackLabel
    }

    if (typeof normalized.hint === 'string') {
      normalized.hint = { es: normalized.hint, en: normalized.hint }
    }

    if (typeof normalized.label_singular === 'string') {
      normalized.label_singular = { es: normalized.label_singular, en: normalized.label_singular }
    }

    if (normalized.fields) {
      normalized.fields = normalized.fields.map((nested) => this.normalizeProjectField(nested, [...pathParts, nested.name || 'item']))
    }
    if (normalized.field) {
      normalized.field = this.normalizeProjectField(normalized.field, [...pathParts, normalized.field.name || 'item'])
    }
    return normalized
  }

  private normalizePathSegment (value: string): string {
    if (!value || value === '/') return ''
    return value.replace(/^\/+/, '').replace(/\/+$/, '')
  }

  private slugify (value: string): string {
    return value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  private stripLocaleSuffix (value: string): string {
    if (!value) return ''
    const { languages } = this.getTaiaConfig()
    const match = value.match(/^(.*)\.([a-zA-Z-]+)$/)
    const matchLang = match?.[2]
    if (matchLang && languages.includes(matchLang)) return match?.[1] || value
    return value
  }

  private listAstroFiles (dir: string): string[] {
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
      .filter((file) => file.endsWith('.astro'))
      .map((file) => file.replace(/\.astro$/, ''))
      .sort()
  }
}
