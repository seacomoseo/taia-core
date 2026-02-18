import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { ConfigService } from '../../services/config-service'

interface RouteEntry {
  loc: string
  lastmod?: string | undefined
}

export const GET: APIRoute = async () => {
  const configService = new ConfigService(process.cwd())
  const config = configService.getTaiaConfig()
  const baseUrl = (config.siteUrl || '').replace(/\/$/, '')
  const defaultLang = configService.getDefaultLanguage()

  const routes = new Map<string, RouteEntry>()

  const addRoute = (urlPath: string, lastmod?: string) => {
    const normalized = urlPath.startsWith('/') ? urlPath : `/${urlPath}`
    const loc = baseUrl ? `${baseUrl}${normalized}` : normalized
    routes.set(loc, { loc, lastmod })
  }

  for (const lang of config.languages) {
    const langPrefix = lang === defaultLang ? '' : `/${lang}`

    for (const single of config.singles) {
      const slug = configService.getSingleSlug(single, lang)
      addRoute(`${langPrefix}/${slug}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/')
    }

    for (const col of config.collections) {
      const folder = path.join(process.cwd(), 'content', col.id)
      if (!fs.existsSync(folder)) continue

      const landing = configService.getCollectionSlug(col, lang)
      if (landing) addRoute(`${langPrefix}/${landing}`.replace(/\/+/g, '/'))

      const entries = fs.readdirSync(folder).filter((file) => /\.mdx?$/.test(file) && !file.startsWith('_index.'))
      for (const file of entries) {
        if (!file.endsWith(`.${lang}.md`) && !file.endsWith(`.${lang}.mdx`)) continue
        const filePath = path.join(folder, file)
        const source = fs.readFileSync(filePath, 'utf8')
        const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/)
        const frontmatter = frontmatterMatch ? (yaml.load(frontmatterMatch[1] || '') as Record<string, any>) : {}
        const rawSlug = typeof frontmatter?.slug === 'string' && frontmatter.slug.trim()
          ? frontmatter.slug.trim()
          : file.replace(/\.[a-zA-Z-]+\.mdx?$/, '')
        const prefix = configService.getCollectionPrefix(col, lang)
        const urlPath = `/${[langPrefix.replace(/^\//, ''), prefix, rawSlug].filter(Boolean).join('/')}`
        addRoute(urlPath, typeof frontmatter?.updatedAt === 'string' ? frontmatter.updatedAt : undefined)
      }
    }
  }

  const urlsXml = Array.from(routes.values())
    .map((route) => {
      const lastmod = route.lastmod ? `<lastmod>${new Date(route.lastmod).toISOString()}</lastmod>` : ''
      return `<url><loc>${escapeXml(route.loc)}</loc>${lastmod}</url>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}

function escapeXml (value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
