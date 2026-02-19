import type { APIRoute } from 'astro'
import { ConfigService } from '../../services/config-service'
import { SitemapService, type SitemapNode } from '../../services/sitemap-service'
import { LanguageRouteService } from '../../services/language-route-service'

interface RouteEntry {
  loc: string
  lastmod?: string | undefined
  alternates: Array<{ hreflang: string; href: string }>
}

export const GET: APIRoute = async ({ url }) => {
  const configService = new ConfigService(process.cwd())
  const sitemapService = new SitemapService(process.cwd())
  const routeService = new LanguageRouteService(process.cwd())
  const config = configService.getTaiaConfig()
  const baseUrl = (config.siteUrl || url.origin).replace(/\/$/, '')
  const defaultLang = configService.getDefaultLanguage()
  const languages = Array.from(new Set(config.languages || [defaultLang]))

  const indexableByLang = new Map<string, Set<string>>()
  const lastmodByLang = new Map<string, Map<string, string>>()

  const collectNodes = (node: SitemapNode | undefined, target: SitemapNode[]) => {
    if (node) target.push(node)
  }

  for (const lang of languages) {
    const model = sitemapService.buildModel(lang)
    const nodes: SitemapNode[] = []
    collectNodes(model.singlesIndex, nodes)
    nodes.push(...model.singles)
    for (const group of model.groups) {
      collectNodes(group.node, nodes)
      nodes.push(...group.children)
    }

    const indexable = new Set<string>()
    const lastmodMap = new Map<string, string>()
    for (const node of nodes) {
      if (node.noindex) continue
      indexable.add(node.path)
      if (node.lastmod) lastmodMap.set(node.path, node.lastmod)
    }
    indexableByLang.set(lang, indexable)
    lastmodByLang.set(lang, lastmodMap)
  }

  const routes = new Map<string, RouteEntry>()

  const addRoute = (lang: string, urlPath: string, lastmod?: string) => {
    const normalized = urlPath.startsWith('/') ? urlPath : `/${urlPath}`
    const loc = baseUrl ? `${baseUrl}${normalized}` : normalized
    const alternates = languages
      .map((targetLang) => {
        const targetPath = routeService.resolveLocalizedPath(normalized, lang, targetLang)
        if (!indexableByLang.get(targetLang)?.has(targetPath)) return null
        return {
          hreflang: targetLang,
          href: `${baseUrl}${targetPath}`
        }
      })
      .filter(Boolean) as Array<{ hreflang: string; href: string }>

    const xDefaultPath = routeService.resolveLocalizedPath(normalized, lang, defaultLang)
    if (indexableByLang.get(defaultLang)?.has(xDefaultPath)) {
      alternates.push({ hreflang: 'x-default', href: `${baseUrl}${xDefaultPath}` })
    } else {
      const firstAlternate = alternates[0]
      if (firstAlternate) {
        alternates.push({ hreflang: 'x-default', href: firstAlternate.href })
      }
    }

    routes.set(loc, {
      loc,
      ...(lastmod ? { lastmod } : {}),
      alternates
    })
  }

  for (const lang of languages) {
    const paths = Array.from(indexableByLang.get(lang) || [])
    const lastmodMap = lastmodByLang.get(lang) || new Map<string, string>()
    for (const routePath of paths) {
      addRoute(lang, routePath, lastmodMap.get(routePath))
    }
  }

  const urlsXml = Array.from(routes.values())
    .sort((a, b) => a.loc.localeCompare(b.loc))
    .map((route) => {
      const lastmod = route.lastmod ? `<lastmod>${escapeXml(route.lastmod)}</lastmod>` : ''
      const alternateLinks = route.alternates
        .filter((alt, index, all) => all.findIndex((candidate) => candidate.hreflang === alt.hreflang) === index)
        .sort((a, b) => a.hreflang.localeCompare(b.hreflang))
        .map((alt) => `<xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`)
        .join('')
      return `<url><loc>${escapeXml(route.loc)}</loc>${lastmod}${alternateLinks}</url>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlsXml}</urlset>`

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
