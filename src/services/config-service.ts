import crypto from 'node:crypto'
import yaml from 'js-yaml'
import YAML from 'yaml'
import fs from 'node:fs'
import path from 'node:path'
import { getSchemaFields, SchemaOrgType as SchemaOrgTypeEnum, type SchemaOrgType as SchemaOrgTypeValue } from '../schemas/schema-org'

export type { SchemaOrgTypeValue as SchemaOrgType }

export interface CollectionConfig {
  id: string
  label: string
  singular?: string
  icon?: string
  schemaType: SchemaOrgTypeValue
  template?: string
  folder?: string
  taxonomyOf?: string[]
}

export interface SingleConfig {
  id: string
  label: string
  icon?: string
  schemaType: SchemaOrgTypeValue
  template?: string
  file?: string
}

export interface TaiaConfig {
  siteUrl?: string
  siteName: string
  description: string
  themeColor: string
  backgroundColor: string
  faviconSource: string
  email?: string
  ga4Id?: string
  languages: string[]
  collections: CollectionConfig[]
  singles: SingleConfig[]
}

export class ConfigService {
  private configPath: string
  private projectRoot: string

  constructor (projectRoot: string) {
    this.projectRoot = projectRoot
    this.configPath = path.join(projectRoot, 'content/settings.yml')
  }

  getTaiaConfig (): TaiaConfig {
    if (!fs.existsSync(this.configPath)) {
      return {
        siteUrl: '',
        siteName: 'TAIA Project',
        description: 'Built with TAIA Core',
        themeColor: '#000000', // Sane defaults
        backgroundColor: '#ffffff',
        faviconSource: 'public/favicon.svg',
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
    if (frontmatter && Object.prototype.hasOwnProperty.call(frontmatter, 'path')) {
      return this.normalizePathSegment(frontmatter.path || '')
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
      if (Object.prototype.hasOwnProperty.call(frontmatter, 'path')) {
        return this.normalizePathSegment(frontmatter.path || '')
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

  getTemplates (): string[] {
    const dir = path.join(this.projectRoot, 'templates')
    return this.listAstroFiles(dir)
  }

  getComponents (): string[] {
    const dir = path.join(this.projectRoot, 'components')
    return this.listAstroFiles(dir)
  }

  getCmsConfigFingerprint (): string {
    const hash = crypto.createHash('sha256')
    if (fs.existsSync(this.configPath)) {
      hash.update(fs.readFileSync(this.configPath, 'utf8'))
    }

    const templateFiles = this.getTemplates().map((name) => path.join(this.projectRoot, 'templates', `${name}.astro`))
    const componentFiles = this.getComponents().map((name) => path.join(this.projectRoot, 'components', `${name}.astro`))

    for (const filePath of [...templateFiles, ...componentFiles]) {
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

    const templateNames = this.getTemplates()
    const componentNames = this.getComponents()

    const templateRelationField = {
      name: 'template',
      label: 'Plantilla',
      widget: 'relation',
      collection: 'templates',
      search_fields: ['slug'],
      value_field: '{{slug}}',
      display_fields: ['slug'],
      required: false,
      i18n: 'duplicate'
    }

    const iconField = {
      name: 'icon',
      label: 'Icono (Material Symbols)',
      widget: 'string',
      required: false,
      hint: 'Nombre del icono, ej: home, article, storefront',
      i18n: 'duplicate'
    }

    const taxonomyOfField = {
      name: 'taxonomyOf',
      label: 'Taxonomía de',
      widget: 'list',
      allow_add: true,
      required: false,
      hint: 'IDs de colecciones relacionadas (ej: posts, products)',
      field: { name: 'collectionId', label: 'Colección', widget: 'string' },
      i18n: 'duplicate'
    }

    // Generar colecciones dinámicas
    for (const col of taiaConfig.collections) {
      const folder = col.folder || `content/${col.id}`
      
      const fields = [
        ...getSchemaFields(col.schemaType),
        { name: 'body', label: 'Contenido', widget: 'markdown', i18n: true }
      ]

      const taxonomyTargets = Array.isArray(col.taxonomyOf) ? col.taxonomyOf : []
      for (const target of taxonomyTargets) {
        fields.push({
          name: `related_${target}`,
          label: `Relacionados con ${target}`,
          widget: 'relation',
          collection: target,
          search_fields: ['title', 'slug'],
          value_field: '{{slug}}',
          display_fields: ['title', 'slug'],
          multiple: true,
          required: false,
          i18n: 'duplicate'
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
        fields: fields
      })
    }

    // Generar colección de singles
    if (taiaConfig.singles.length > 0) {
      config.collections.push({
        name: 'singles',
        label: 'Páginas Individuales',
        icon: 'file_open',
        i18n: true,
        editor: { preview: false },
        files: taiaConfig.singles.map((page) => {
          // Inferir archivo base con idioma por defecto
          const underscoredFile = `content/singles/_${page.id}.${defaultLang}.md`
          const defaultFile = `content/singles/${page.id}.${defaultLang}.md`
          const file = page.file || (fs.existsSync(path.join(this.projectRoot, underscoredFile)) ? underscoredFile : defaultFile)
          
          return {
            name: page.id,
            label: page.label,
            file: `${file}.{{locale}}.md`,
            i18n: true,
            editor: { preview: false },
            icon: page.icon,
            thumbnail: ['image', 'images.*'],
            fields: [
              ...getSchemaFields(page.schemaType),
              { name: 'body', label: 'Contenido', widget: 'markdown', i18n: true }
            ]
          }
        })
      })
    }

    if (templateNames.length > 0) {
      config.collections.push({
        name: 'templates',
        label: 'Plantillas',
        folder: 'templates',
        icon: 'castle',
        create: true,
        slug: '{{slug}}',
        extension: 'astro',
        format: 'raw',
        editor: { preview: false },
        fields: [
          { name: 'body', label: 'Código', widget: 'code', output_code_only: true }
        ]
      })
    }

    if (componentNames.length > 0) {
      config.collections.push({
        name: 'components',
        label: 'Componentes',
        folder: 'components',
        icon: 'brick',
        create: true,
        slug: '{{slug}}',
        extension: 'astro',
        format: 'raw',
        editor: { preview: false },
        fields: [
          { name: 'body', label: 'Código', widget: 'code', output_code_only: true }
        ]
      })
    }
    
    // Configuración editable
    config.collections.push({
      name: 'settings',
      label: 'Configuración',
      icon: 'settings',
      i18n: true,
      files: [
        {
          name: 'general',
          label: 'General',
          icon: 'build',
          file: 'content/settings.yml',
          i18n: false,
          editor: { preview: false },
          fields: [
            { name: 'siteUrl', label: 'URL del Sitio', widget: 'string', required: false, hint: 'https://example.com', i18n: 'duplicate' },
            { name: 'siteName', label: 'Nombre del Sitio', widget: 'string', i18n: true },
            { name: 'description', label: 'Descripción', widget: 'text', i18n: true },
            { name: 'themeColor', label: 'Color del Tema', widget: 'string', i18n: 'duplicate' },
            { name: 'backgroundColor', label: 'Color de Fondo', widget: 'string', i18n: 'duplicate' },
            { name: 'faviconSource', label: 'Favicon', widget: 'image', hint: 'Ruta relativa, ej: public/favicon.svg', i18n: 'duplicate' },
            { name: 'email', label: 'Email', widget: 'string', required: false, i18n: 'duplicate' },
            { name: 'phone', label: 'Teléfono', widget: 'string', required: false, i18n: 'duplicate' },
            { name: 'address', label: 'Dirección', widget: 'text', required: false, i18n: true },
            { name: 'ga4Id', label: 'Google Analytics 4 ID', widget: 'string', required: false, hint: 'G-XXXXXXXXXX', i18n: 'duplicate' },
            {
              name: 'languages',
              label: 'Idiomas',
              label_singular: 'Idioma',
              widget: 'list',
              default: ['es'],
              hint: 'Código de idioma [ISO-639-1](https://es.wikipedia.org/wiki/ISO_639-1) + Variante Regional opcional [ISO 3166-1](https://es.wikipedia.org/wiki/ISO_3166-1)',
              collapsed: true,
              minimize_collapsed: true,
              field: [
                { name: 'lang', label: 'Idioma', widget: 'string', i18n: true }
              ]
            },
            { 
              name: 'collections', 
              label: 'Colecciones', 
              widget: 'list',
              collapsed: true,
              minimize_collapsed: true,
              fields: [
                { name: 'id', label: 'ID', widget: 'string', i18n: 'duplicate' },
                { name: 'label', label: 'Etiqueta', widget: 'string', i18n: true },
                { name: 'singular', label: 'Singular', widget: 'string', required: false, i18n: true },
                iconField,
                { name: 'schemaType', label: 'Tipo Schema', widget: 'select',  options: availableSchemas, i18n: 'duplicate' },
                templateRelationField,
                taxonomyOfField
              ]
            },
            { 
              name: 'singles', 
              label: 'Páginas Individuales', 
              widget: 'list',
              collapsed: true,
              minimize_collapsed: true,
              fields: [
                { name: 'id', label: 'ID', widget: 'string', i18n: 'duplicate' },
                { name: 'label', label: 'Etiqueta', widget: 'string', i18n: true },
                iconField,
                { name: 'schemaType', label: 'Tipo Schema', widget: 'select',  options: availableSchemas, i18n: 'duplicate'  },
                templateRelationField
              ]
            }
          ]
        },
        {
          name: 'i18n',
          label: 'Textos (i18n)',
          icon: 'tune',
          file: 'content/i18n/{{locale}}.yml',
          i18n: true,
          editor: { preview: false },
          fields: [
            { name: 'postCard', label: 'Tarjeta de Publicación', widget: 'object', i18n: true, fields: [
              { name: 'by', label: 'Por', widget: 'string', i18n: true }
            ] }
          ]
        }
      ]
    })

    return YAML.stringify(config, {
      indent: 2,
      indentSeq: false,
      blockQuote: 'literal',
      defaultKeyType: 'PLAIN',
      defaultStringType: 'PLAIN',
      lineWidth: 0
    })
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
