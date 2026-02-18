import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import { ConfigService } from '../../services/config-service'

export const GET: APIRoute = async () => {
  const projectRoot = process.cwd()
  const robotsPath = path.join(projectRoot, 'content', 'robots.txt')
  if (fs.existsSync(robotsPath)) {
    return new Response(fs.readFileSync(robotsPath, 'utf8'), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }

  const configService = new ConfigService(projectRoot)
  const siteUrl = configService.getTaiaConfig().siteUrl || ''
  const sitemapUrl = siteUrl ? `${siteUrl.replace(/\/$/, '')}/sitemap.xml` : '/sitemap.xml'

  const defaultRobots = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
    ''
  ].join('\n')

  return new Response(defaultRobots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
