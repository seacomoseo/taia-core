import type { AstroIntegration } from 'astro'
import { ConfigService } from '../services/config-service'
import { generateFaviconAssets } from './utils/favicon-generator'
import fs from 'node:fs'
import path from 'node:path'

const VIRTUAL_CONTENT_CONFIG_ID = 'virtual:taia-content-config'
const RESOLVED_VIRTUAL_CONTENT_CONFIG_ID = `\0${VIRTUAL_CONTENT_CONFIG_ID}`

function toSafeVarName (value: string): string {
  return value.replace(/[^a-zA-Z0-9_]/g, '_')
}

function generateContentConfigModule (projectRoot: string): string {
  const configService = new ConfigService(projectRoot)
  const taiaConfig = configService.getTaiaConfig()
  const collections = taiaConfig.collections || []

  const collectionDefs = collections.map((collection) => {
    const varName = toSafeVarName(collection.id)
    return `const ${varName} = defineCollection({\n  schema: contentSchema,\n  loader: glob({\n    pattern: '**/*.md',\n    base: 'content/${collection.id}',\n    generateId: ({ entry, data }) => {\n      const base = entry.replace(/\\.mdx?$/, '')\n      const match = base.match(/^(.*)\\.([a-zA-Z-]+)$/)\n      const lang = match?.[2]\n      const baseName = match?.[1] ?? base\n      if (baseName.startsWith('_index')) return lang ? '_index.' + lang : '_index'\n      const normalizedBase = baseName.startsWith('_') ? baseName.slice(1) : baseName\n      const slug = typeof data?.slug === 'string' && data.slug.trim() ? data.slug.trim() : normalizedBase\n      return lang ? slug + '.' + lang : slug\n    }\n  })\n})`
  })

  const collectionExports = collections.map((collection) => {
    const varName = toSafeVarName(collection.id)
    return `  ${JSON.stringify(collection.id)}: ${varName},`
  })

  return [
    "import { z, defineCollection } from 'astro:content'",
    "import { glob } from 'astro/loaders'",
    '',
    'const seoSchema = z.object({',
    '  title: z.string().optional(),',
    '  description: z.string().optional(),',
    '  noindex: z.boolean().optional()',
    '})',
    '',
    'const contentSchema = z.object({',
    '  title: z.string().optional(),',
    '  description: z.string().optional(),',
    '  slug: z.string().optional(),',
    '  layout: z.string().optional(),',
    '  seo: seoSchema.optional()',
    '}).passthrough()',
    '',
    ...collectionDefs,
    "const singles = defineCollection({\n  schema: contentSchema,\n  loader: glob({\n    pattern: '**/*.md',\n    base: 'content/singles',\n    generateId: ({ entry, data }) => {\n      const base = entry.replace(/\\.mdx?$/, '')\n      const match = base.match(/^(.*)\\.([a-zA-Z-]+)$/)\n      const lang = match?.[2]\n      const baseName = match?.[1] ?? base\n      const normalizedBase = baseName.startsWith('_') ? baseName.slice(1) : baseName\n      const rawSlug = typeof data?.slug === 'string' ? data.slug.trim() : ''\n      const slug = rawSlug && rawSlug !== '/' ? rawSlug : normalizedBase\n      return lang ? slug + '.' + lang : slug\n    }\n  })\n})",
    "const globals = defineCollection({ type: 'data', schema: z.any() })",
    '',
    'export const collections = {',
    ...collectionExports,
    '  singles,',
    '  globals',
    '}',
    ''
  ].join('\n')
}

function taiaContentConfigPlugin (projectRoot: string) {
  return {
    name: 'taia-content-config',
    resolveId (id: string) {
      if (id === VIRTUAL_CONTENT_CONFIG_ID) return RESOLVED_VIRTUAL_CONTENT_CONFIG_ID
      return null
    },
    load (id: string) {
      if (id === RESOLVED_VIRTUAL_CONTENT_CONFIG_ID) {
        return generateContentConfigModule(projectRoot)
      }
      return null
    }
  }
}

function taiaOverridePlugin (projectRoot: string) {
  return {
    name: 'taia-overrides',
    enforce: 'pre' as const,
    resolveId (id: string) {
      const componentMatch = id.match(/^@core\/components\/(.+\.astro)$/)
      if (componentMatch?.[1]) {
        const projectComponentPath = path.join(projectRoot, 'components', componentMatch[1])
        if (fs.existsSync(projectComponentPath)) return projectComponentPath
      }

      const layoutMatch = id.match(/^@core\/layouts\/(.+\.astro)$/)
      if (layoutMatch?.[1]) {
        const projectLayoutPath = path.join(projectRoot, 'layouts', layoutMatch[1])
        if (fs.existsSync(projectLayoutPath)) return projectLayoutPath
      }

      return null
    }
  }
}

export interface TaiaCoreOptions {
  // Opciones futuras
}

export default function taiaCore (_options: TaiaCoreOptions = {}): AstroIntegration {
  return {
    name: 'taia-core',
    hooks: {
      'astro:config:setup': async ({ injectRoute, logger, updateConfig }) => {
        logger.info('Iniciando TAIA Core Integration')
        
        const configService = new ConfigService(process.cwd())

        await generateFaviconAssets(process.cwd(), configService.getTaiaConfig().faviconSource)

        updateConfig({
          vite: {
            plugins: [taiaOverridePlugin(process.cwd()), taiaContentConfigPlugin(process.cwd())]
          }
        })
        
        // 1. Rutas Prioritarias (Admin, Assets, APIs)
        
        // Admin & Config
        injectRoute({ pattern: '/admin/config.yml', entrypoint: './core/src/integration/endpoints/config-yml.ts' })
        injectRoute({ pattern: '/site.webmanifest', entrypoint: './core/src/integration/endpoints/webmanifest.ts' })
        injectRoute({ pattern: '/admin/chat', entrypoint: './core/src/integration/endpoints/chat.astro' })
        injectRoute({ pattern: '/admin', entrypoint: './core/src/integration/endpoints/cms-admin.astro' })
        injectRoute({ pattern: '/robots.txt', entrypoint: './core/src/integration/endpoints/robots-txt.ts' })
        injectRoute({ pattern: '/llms.txt', entrypoint: './core/src/integration/endpoints/llms-txt.ts' })
        injectRoute({ pattern: '/_redirects', entrypoint: './core/src/integration/endpoints/redirects.ts' })
        injectRoute({ pattern: '/sitemap.xml', entrypoint: './core/src/integration/endpoints/sitemap-xml.ts' })

        // Assets
        injectRoute({ pattern: '/uploads/[...path]', entrypoint: './core/src/integration/endpoints/uploads.ts' })

        // APIs
        // Chat siempre presente
        injectRoute({ pattern: '/api/chat', entrypoint: './core/src/integration/endpoints/api/chat.ts' })
        injectRoute({ pattern: '/api/form-submit', entrypoint: './core/src/integration/endpoints/api/form-submit.ts' })
        
        // Checkout condicional
        if (configService.hasProductCollection()) {
          logger.info('Inyectando API de Checkout')
          injectRoute({ pattern: '/api/checkout', entrypoint: './core/src/integration/endpoints/api/checkout.ts' })
        }


        // 2. Ruta de Contenido Catch-All (Última)
        // Maneja colecciones y páginas individuales (singles) dinámicamente
        logger.info('Inyectando Content Router Unificado')
        injectRoute({
            pattern: '/[...path]',
            entrypoint: './core/src/integration/pages/content-router.astro'
        })

      }
    }
  }
}
