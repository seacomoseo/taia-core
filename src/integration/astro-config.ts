import type { AstroIntegration, AstroUserConfig } from 'astro'
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import astroBaseConfig from '../../configs/astro.base.mjs'

export interface TaiaAstroConfigOptions {
  projectRoot?: string
  adapter?: AstroIntegration
  integrations?: AstroIntegration[]
  output?: 'server' | 'static'
  srcDir?: string
  siteUrlOverride?: string
  useCloudflare?: boolean
}

function loadSettings (projectRoot: string): { siteUrl?: string } {
  const settingsPath = path.join(projectRoot, 'content/config.yml')
  if (!fs.existsSync(settingsPath)) return {}

  try {
    const raw = fs.readFileSync(settingsPath, 'utf8')
    const settings = yaml.load(raw)
    if (settings && typeof settings === 'object') {
      const siteUrl = typeof settings.siteUrl === 'string' ? settings.siteUrl.trim() : ''
      return siteUrl ? { siteUrl } : {}
    }
  } catch (error) {
    console.warn('Failed to load content/config.yml for site config', error)
  }

  return {}
}

export function createTaiaAstroConfig (options: TaiaAstroConfigOptions = {}) {
  const projectRoot = options.projectRoot ?? process.cwd()
  const settings = loadSettings(projectRoot)
  const resolvedSite = options.siteUrlOverride || settings.siteUrl
  const useCloudflare = options.useCloudflare !== false
  const resolvedAdapter = options.adapter ?? (useCloudflare ? cloudflare({
    platformProxy: {
      enabled: true
    },
    imageService: 'compile'
  }) : undefined)

  return defineConfig({
    ...astroBaseConfig,
    srcDir: options.srcDir ?? '.',
    output: options.output ?? 'server',
    ...(resolvedAdapter ? { adapter: resolvedAdapter } : {}),
    ...(options.integrations !== undefined ? { integrations: options.integrations } : {}),
    ...(resolvedSite ? { site: resolvedSite } : {})
  } as AstroUserConfig)
}
