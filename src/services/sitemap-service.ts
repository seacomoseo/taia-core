import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { ConfigService } from './config-service'
import { getSchemaFields } from '../schemas/schema-org'

export interface SitemapNode {
  title: string
  path: string
  noindex: boolean
  lastmod?: string
  sortOrder?: number
  sortDate?: number
}

export interface SitemapGroup {
  title: string
  node?: SitemapNode
  children: SitemapNode[]
}

export interface SitemapModel {
  lang: string
  defaultLang: string
  languages: string[]
  singlesIndex?: SitemapNode
  singles: SitemapNode[]
  groups: SitemapGroup[]
}

export function renderSitemapTreeHtml (model: SitemapModel, labels?: { singles?: string }): string {
  const renderNode = (node: SitemapNode): string => {
    if (!node.noindex) {
      return `<a href="${escapeHtml(node.path)}">${escapeHtml(node.title)}</a>`
    }
    const payload = Buffer.from(node.path).toString('base64').split('').reverse().join('')
    return `<a data-obf="${payload}">${escapeHtml(node.title)}</a>`
  }

  const singles = model.singles
    .map((node) => `<li>${renderNode(node)}</li>`)
    .join('')

  const groups = model.groups
    .map((group) => {
      const heading = group.node
        ? `<h2>${renderNode(group.node)}</h2>`
        : `<h2>${escapeHtml(group.title)}</h2>`
      const children = group.children
        .map((child) => `<li>${renderNode(child)}</li>`)
        .join('')
      return `<section>${heading}${children ? `<ul>${children}</ul>` : ''}</section>`
    })
    .join('')

  const singlesHeading = model.singlesIndex
    ? `<h2>${renderNode(model.singlesIndex)}</h2>`
    : `<h2>${escapeHtml(labels?.singles || 'Pages')}</h2>`
  return `${singlesHeading}<ul>${singles}</ul>${groups}`
}

export function renderSinglesTreeHtml (model: SitemapModel, labels?: { singles?: string }): string {
  const renderNode = (node: SitemapNode): string => {
    if (!node.noindex) return `<a href="${escapeHtml(node.path)}">${escapeHtml(node.title)}</a>`
    const payload = Buffer.from(node.path).toString('base64').split('').reverse().join('')
    return `<a data-obf="${payload}">${escapeHtml(node.title)}</a>`
  }

  const heading = model.singlesIndex
    ? `<h2>${renderNode(model.singlesIndex)}</h2>`
    : `<h2>${escapeHtml(labels?.singles || 'Pages')}</h2>`

  const items = model.singles
    .map((node) => `<li>${renderNode(node)}</li>`)
    .join('')

  return `${heading}<ul>${items}</ul>`
}

export class SitemapService {
  private projectRoot: string
  private configService: ConfigService

  constructor (projectRoot: string) {
    this.projectRoot = projectRoot
    this.configService = new ConfigService(projectRoot)
  }

  buildModel (requestedLang?: string): SitemapModel {
    const config = this.configService.getTaiaConfig()
    const defaultLang = this.configService.getDefaultLanguage()
    const lang = requestedLang && config.languages.includes(requestedLang)
      ? requestedLang
      : defaultLang
    const langPrefix = lang === defaultLang ? '' : `/${lang}`

    const singles: SitemapNode[] = []
    const groups: SitemapGroup[] = []
    const singlesIndex = this.getSinglesIndex(lang, langPrefix)

    for (const single of config.singles) {
      const slug = this.configService.getSingleSlug(single, lang)
      const singlePath = path.join(this.projectRoot, 'content', 'singles', `${single.id}.${lang}.md`)
      const frontmatter = this.readFrontmatter(singlePath)
      const singleLastmod = this.getLastmod(frontmatter)
      singles.push({
        title: typeof frontmatter?.title === 'string' ? frontmatter.title : single.label,
        path: slug ? this.normalizeRoute(`${langPrefix}/${slug}`) : this.normalizeRoute(langPrefix || '/'),
        noindex: this.isNoindex(frontmatter),
        ...(singleLastmod ? { lastmod: singleLastmod } : {})
      })
    }

    for (const col of config.collections) {
      const folder = path.join(this.projectRoot, 'content', col.id)
      if (!fs.existsSync(folder)) continue

      const indexPath = path.join(folder, `_index.${lang}.md`)
      const indexFrontmatter = this.readFrontmatter(indexPath)
      const landingLastmod = this.getLastmod(indexFrontmatter)
      const groupTitle = typeof indexFrontmatter?.title === 'string' ? indexFrontmatter.title : col.label
      const landingSlug = this.configService.getCollectionSlug(col, lang)
      const landingNode = landingSlug
        ? {
            title: groupTitle,
            path: this.normalizeRoute(`${langPrefix}/${landingSlug}`),
            noindex: this.isNoindex(indexFrontmatter),
            ...(landingLastmod ? { lastmod: landingLastmod } : {})
          }
        : undefined

      const files = fs.readdirSync(folder).filter((file) => file.endsWith(`.${lang}.md`) || file.endsWith(`.${lang}.mdx`))
      const children: SitemapNode[] = []

      for (const file of files) {
        if (file.startsWith('_index.')) continue
        const frontmatter = this.readFrontmatter(path.join(folder, file))
        const slug = typeof frontmatter?.slug === 'string' && frontmatter.slug.trim()
          ? frontmatter.slug.trim()
          : file.replace(/\.[a-zA-Z-]+\.mdx?$/, '')
        const entryPrefix = this.configService.getCollectionPrefix(col, lang)

        const dateValue = this.getNodeDate(frontmatter)
        const entryLastmod = this.getLastmod(frontmatter)
        children.push({
          title: typeof frontmatter?.title === 'string' ? frontmatter.title : file,
          path: this.normalizeRoute(`${langPrefix}/${[entryPrefix, slug].filter(Boolean).join('/')}`),
          noindex: this.isNoindex(frontmatter),
          ...(entryLastmod ? { lastmod: entryLastmod } : {}),
          ...(typeof frontmatter?.order === 'number' ? { sortOrder: frontmatter.order } : {}),
          ...(typeof dateValue === 'number' ? { sortDate: dateValue } : {})
        })
      }

      this.sortNodes(children, this.hasDateField(col.schemaType || 'WebPage'))

      if (landingNode) {
        groups.push({ title: groupTitle, node: landingNode, children })
      } else {
        groups.push({ title: groupTitle, children })
      }
    }

    return {
      lang,
      defaultLang,
      languages: config.languages,
      ...(singlesIndex ? { singlesIndex } : {}),
      singles,
      groups
    }
  }

  private getSinglesIndex (lang: string, langPrefix: string): SitemapNode | undefined {
    const filePath = path.join(this.projectRoot, 'content', 'singles', `_index.${lang}.md`)
    if (!fs.existsSync(filePath)) return undefined
    const frontmatter = this.readFrontmatter(filePath)
    const slug = typeof frontmatter?.slug === 'string' && frontmatter.slug.trim()
      ? frontmatter.slug.trim()
      : 'singles'
    const singlesIndexLastmod = this.getLastmod(frontmatter)
    return {
      title: typeof frontmatter?.title === 'string' ? frontmatter.title : 'Pages',
      path: this.normalizeRoute(`${langPrefix}/${slug}`),
      noindex: this.isNoindex(frontmatter),
      ...(singlesIndexLastmod ? { lastmod: singlesIndexLastmod } : {})
    }
  }

  private getLastmod (frontmatter: Record<string, any>): string | undefined {
    const candidates = [frontmatter?.updatedAt, frontmatter?.modifiedAt, frontmatter?.publishedAt, frontmatter?.date, frontmatter?.startDate]
    const raw = candidates.find((value) => typeof value === 'string' || value instanceof Date)
    if (!raw) return undefined
    const value = new Date(raw)
    if (Number.isNaN(value.getTime())) return undefined
    return value.toISOString()
  }

  private hasDateField (schemaType: string): boolean {
    const fields = getSchemaFields((schemaType as any) || 'WebPage')
    return fields.some((field) => field.widget === 'datetime' || /date/i.test(field.name))
  }

  private sortNodes (nodes: SitemapNode[], useDate: boolean): void {
    if (useDate) {
      nodes.sort((a, b) => (b.sortDate || 0) - (a.sortDate || 0))
      return
    }

    nodes.sort((a, b) => {
      const aOrder = this.extractOrder(a)
      const bOrder = this.extractOrder(b)
      if (aOrder !== bOrder) return aOrder - bOrder
      return a.path.localeCompare(b.path)
    })
  }

  private extractOrder (node: SitemapNode): number {
    return typeof node.sortOrder === 'number' ? node.sortOrder : 0
  }

  private getNodeDate (frontmatter: Record<string, any>): number | undefined {
    const candidates = [frontmatter?.publishedAt, frontmatter?.startDate, frontmatter?.date, frontmatter?.modifiedAt]
    const raw = candidates.find((value) => typeof value === 'string' || value instanceof Date)
    if (!raw) return undefined
    const value = new Date(raw).getTime()
    return Number.isFinite(value) ? value : undefined
  }

  private readFrontmatter (filePath: string): Record<string, any> {
    if (!fs.existsSync(filePath)) return {}
    const source = fs.readFileSync(filePath, 'utf8')
    const match = source.match(/^---\n([\s\S]*?)\n---/)
    return match ? ((yaml.load(match[1] || '') as Record<string, any>) || {}) : {}
  }

  private normalizeRoute (raw: string): string {
    const normalized = `/${raw}`.replace(/\/+/g, '/')
    return normalized.replace(/\/$/, '') || '/'
  }

  private isNoindex (frontmatter: Record<string, any>): boolean {
    return Boolean(frontmatter?.seo && typeof frontmatter.seo === 'object' && frontmatter.seo.noindex === true)
  }
}

function escapeHtml (value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
