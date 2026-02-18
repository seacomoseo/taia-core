import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { ConfigService } from '../../services/config-service'

export const GET: APIRoute = async () => {
  const root = process.cwd()
  const staticPath = path.join(root, 'content', 'llms.txt')
  if (fs.existsSync(staticPath)) {
    return new Response(fs.readFileSync(staticPath, 'utf8'), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }

  const configService = new ConfigService(root)
  const config = configService.getTaiaConfig()
  const defaultLang = configService.getDefaultLanguage()
  const siteName = config.siteName || 'Site'
  const lines: string[] = [
    `# ${siteName}`,
    '',
    '## Pages'
  ]

  const collectMarkdownFiles = (dir: string): string[] => {
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
      .filter((file) => /\.mdx?$/.test(file))
      .map((file) => path.join(dir, file))
  }

  for (const col of config.collections) {
    const dir = path.join(root, 'content', col.id)
    const files = collectMarkdownFiles(dir).filter((file) => !path.basename(file).startsWith('_index.'))
    for (const file of files) {
      const langMatch = file.match(/\.([a-zA-Z-]+)\.mdx?$/)
      const lang = langMatch?.[1] || defaultLang
      if (lang !== defaultLang) continue

      const raw = fs.readFileSync(file, 'utf8')
      const match = raw.match(/^---\n([\s\S]*?)\n---/)
      const frontmatter = match ? (yaml.load(match[1] || '') as Record<string, any>) : {}
      const llms = (frontmatter?.llms || {}) as Record<string, any>
      if (llms.hide === true) continue

      const title = llms.title || frontmatter?.title || path.basename(file)
      const description = llms.description || frontmatter?.description || ''
      const slug = typeof frontmatter?.slug === 'string' && frontmatter.slug.trim()
        ? frontmatter.slug.trim()
        : path.basename(file).replace(/\.[a-zA-Z-]+\.mdx?$/, '')
      const prefix = configService.getCollectionPrefix(col, defaultLang)
      const url = `/${[prefix, slug].filter(Boolean).join('/')}`
      lines.push(`- ${title}: ${url}${description ? ` - ${description}` : ''}`)
    }
  }

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
