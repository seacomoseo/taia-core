import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { ConfigService } from './config-service'

interface RouteMaps {
  keyToRoute: Map<string, Map<string, string>>
  routeToKey: Map<string, Map<string, string>>
}

export class LanguageRouteService {
  private projectRoot: string
  private configService: ConfigService
  private defaultLang: string
  private languages: string[]

  constructor (projectRoot: string) {
    this.projectRoot = projectRoot
    this.configService = new ConfigService(projectRoot)
    const config = this.configService.getTaiaConfig()
    this.defaultLang = this.configService.getDefaultLanguage()
    this.languages = Array.from(new Set(config.languages || [this.defaultLang]))
  }

  getLanguages (): string[] {
    return this.languages
  }

  getDefaultLanguage (): string {
    return this.defaultLang
  }

  resolveLocalizedPath (currentPathname: string, currentLang: string, targetLang: string): string {
    const maps = this.getRouteMaps()
    const currentPath = this.normalizePath(currentPathname)
    const currentMap = maps.routeToKey.get(currentLang) || new Map<string, string>()
    const key = currentMap.get(currentPath)
    if (key) {
      const targetPath = maps.keyToRoute.get(targetLang)?.get(key)
      if (targetPath) return targetPath
    }

    const basePath = this.getBasePath(currentPath)
    return this.toLocalePath(basePath, targetLang)
  }

  private getCacheKey (): string {
    return `${this.projectRoot}:${this.defaultLang}:${this.languages.join(',')}`
  }

  private getRouteMaps (): RouteMaps {
    const cacheKey = this.getCacheKey()
    const globalCache = (globalThis as any).__taiaLangRouteCache || ((globalThis as any).__taiaLangRouteCache = new Map<string, RouteMaps>())
    const cached = globalCache.get(cacheKey)
    if (cached) return cached

    const built = this.buildRouteMaps()
    globalCache.set(cacheKey, built)
    return built
  }

  private buildRouteMaps (): RouteMaps {
    const config = this.configService.getTaiaConfig()
    const keyToRoute = new Map<string, Map<string, string>>()
    const routeToKey = new Map<string, Map<string, string>>()

    const setRoute = (locale: string, key: string, route: string) => {
      if (!keyToRoute.has(locale)) keyToRoute.set(locale, new Map())
      if (!routeToKey.has(locale)) routeToKey.set(locale, new Map())
      keyToRoute.get(locale)?.set(key, route)
      routeToKey.get(locale)?.set(route, key)
    }

    for (const locale of this.languages) {
      const langPrefix = locale === this.defaultLang ? '' : `/${locale}`

      for (const single of config.singles) {
        const slug = this.configService.getSingleSlug(single, locale)
        const route = slug ? this.normalizePath(`${langPrefix}/${slug}`) : this.normalizePath(langPrefix || '/')
        setRoute(locale, `single:${single.id}`, route)
      }

      const singleIndexPath = path.join(this.projectRoot, 'content', 'singles', `_index.${locale}.md`)
      if (fs.existsSync(singleIndexPath)) {
        const fm = this.readFrontmatter(singleIndexPath)
        const slug = typeof fm.slug === 'string' && fm.slug.trim() ? fm.slug.trim() : 'singles'
        setRoute(locale, 'single:_index', this.normalizePath(`${langPrefix}/${slug}`))
      }

      for (const col of config.collections) {
        const landing = this.configService.getCollectionSlug(col, locale)
        if (landing) setRoute(locale, `collection:${col.id}:_index`, this.normalizePath(`${langPrefix}/${landing}`))

        const folder = path.join(this.projectRoot, 'content', col.id)
        if (!fs.existsSync(folder)) continue

        const files = fs.readdirSync(folder).filter((file) => file.endsWith(`.${locale}.md`) || file.endsWith(`.${locale}.mdx`))
        for (const file of files) {
          if (file.startsWith('_index.')) continue
          const base = file.replace(new RegExp(`\\.${locale}\\.mdx?$`), '')
          const fm = this.readFrontmatter(path.join(folder, file))
          const slug = typeof fm.slug === 'string' && fm.slug.trim() ? fm.slug.trim() : base
          const prefix = this.configService.getCollectionPrefix(col, locale)
          const route = this.normalizePath(`${langPrefix}/${[prefix, slug].filter(Boolean).join('/')}`)
          setRoute(locale, `collection:${col.id}:${base}`, route)
        }
      }
    }

    return { keyToRoute, routeToKey }
  }

  private readFrontmatter (filePath: string): Record<string, any> {
    if (!fs.existsSync(filePath)) return {}
    const source = fs.readFileSync(filePath, 'utf8')
    const match = source.match(/^---\n([\s\S]*?)\n---/)
    return match ? ((yaml.load(match[1] || '') as Record<string, any>) || {}) : {}
  }

  private normalizePath (value: string): string {
    const normalized = value.replace(/\/+/g, '/')
    return normalized.replace(/\/$/, '') || '/'
  }

  private getBasePath (pathname: string): string {
    const normalized = this.normalizePath(pathname)
    if (normalized === '/') return '/'
    const parts = normalized.split('/').filter(Boolean)
    const first = parts[0]
    if (parts.length > 0 && first && this.languages.includes(first) && first !== this.defaultLang) {
      const rest = parts.slice(1).join('/')
      return rest ? `/${rest}` : '/'
    }
    return normalized
  }

  private toLocalePath (basePath: string, locale: string): string {
    if (locale === this.defaultLang) return this.normalizePath(basePath)
    if (basePath === '/') return `/${locale}`
    return this.normalizePath(`/${locale}${basePath}`)
  }
}
