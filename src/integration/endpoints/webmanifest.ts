import type { APIRoute } from 'astro'
import { ConfigService } from '../../services/config-service'
import mime from 'mime-types'

export const GET: APIRoute = async () => {
  const configService = new ConfigService(process.cwd())
  const taiaConfig = configService.getTaiaConfig()

  const faviconSource = taiaConfig.faviconSource || ''
  const iconType = mime.lookup(faviconSource) || ''
  const isSvg = iconType === 'image/svg+xml' || faviconSource.endsWith('.svg')

  const manifest = {
    name: taiaConfig.siteName,
    short_name: taiaConfig.siteName,
    start_url: '/',
    display: 'standalone',
    background_color: taiaConfig.backgroundColor,
    theme_color: taiaConfig.themeColor,
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      },
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png'
      },
      ...(isSvg
        ? [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
        : [])
    ]
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json'
    }
  })
}
