import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const cache = new Map<string, Record<string, any>>()

export function getI18nBundle (lang: string, projectRoot = process.cwd()): Record<string, any> {
  const cacheKey = `${projectRoot}:${lang}`
  if (cache.has(cacheKey)) return cache.get(cacheKey) as Record<string, any>

  const filePath = path.join(projectRoot, 'content/globals', `${lang}.yml`)
  if (!fs.existsSync(filePath)) {
    cache.set(cacheKey, {})
    return {}
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  const data = (yaml.load(raw) as Record<string, any>) || {}
  cache.set(cacheKey, data)
  return data
}

export function t (lang: string, key: string, fallback = ''): string {
  const bundle = getI18nBundle(lang)
  const value = key.split('.').reduce((acc: any, part: string) => acc?.[part], bundle)
  if (typeof value === 'string' && value.trim() !== '') return value
  return fallback || key
}

export function localizePath (pathValue: string, lang: string, defaultLang: string): string {
  const normalized = pathValue ? (pathValue.startsWith('/') ? pathValue : `/${pathValue}`) : '/'
  if (lang === defaultLang) return normalized
  return normalized === '/' ? `/${lang}/` : `/${lang}${normalized}`
}
