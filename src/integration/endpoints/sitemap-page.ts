import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { ConfigService } from '../../services/config-service'

export const GET: APIRoute = async () => {
  const configService = new ConfigService(process.cwd())
  const config = configService.getTaiaConfig()
  const defaultLang = configService.getDefaultLanguage()

  const routes: Array<{ title: string; path: string }> = []

  for (const col of config.collections) {
    const folder = path.join(process.cwd(), 'content', col.id)
    if (!fs.existsSync(folder)) continue

    const collectionSlug = configService.getCollectionSlug(col, defaultLang)
    if (collectionSlug) {
      routes.push({ title: col.label, path: `/${collectionSlug}` })
    }

    const files = fs.readdirSync(folder).filter((file) => file.endsWith(`.${defaultLang}.md`) || file.endsWith(`.${defaultLang}.mdx`))
    for (const file of files) {
      if (file.startsWith('_index.')) continue
      const source = fs.readFileSync(path.join(folder, file), 'utf8')
      const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/)
      const frontmatter = frontmatterMatch ? (yaml.load(frontmatterMatch[1] || '') as Record<string, any>) : {}
      const title = typeof frontmatter?.title === 'string' ? frontmatter.title : file
      const slug = typeof frontmatter?.slug === 'string' && frontmatter.slug.trim()
        ? frontmatter.slug.trim()
        : file.replace(/\.[a-zA-Z-]+\.mdx?$/, '')
      const prefix = configService.getCollectionPrefix(col, defaultLang)
      routes.push({ title, path: `/${[prefix, slug].filter(Boolean).join('/')}` })
    }
  }

  for (const single of config.singles) {
    const slug = configService.getSingleSlug(single, defaultLang)
    routes.push({ title: single.label, path: slug ? `/${slug}` : '/' })
  }

  const unique = new Map<string, { title: string; path: string }>()
  for (const item of routes) unique.set(item.path, item)

  const listItems = Array.from(unique.values())
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((item) => `<li><a href="${item.path}">${escapeHtml(item.title)}</a> <code>${item.path}</code></li>`)
    .join('')

  const html = `<!doctype html><html lang="${defaultLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mapa del sitio</title><style>body{font-family:Manrope,Segoe UI,sans-serif;margin:0;background:#f4f3ef;color:#172033}main{max-width:920px;margin:0 auto;padding:2rem 1rem}h1{font-family:Fraunces,serif}ul{padding-left:1.2rem}li{margin:.45rem 0}a{color:#8f3322}code{font-size:.8rem;color:#5d6982}</style></head><body><main><h1>Mapa del sitio</h1><ul>${listItems}</ul></main></body></html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  })
}

function escapeHtml (value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
