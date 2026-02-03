import type { APIRoute } from 'astro'
import { ConfigService } from '../../services/config-service'
import fs from 'node:fs'
import path from 'node:path'
import mime from 'mime-types'

const PNG_SIZE = 192

export const GET: APIRoute = async ({ request }) => {
  const configService = new ConfigService(process.cwd())
  const taiaConfig = configService.getTaiaConfig()

  const sourcePath = resolveFaviconPath(taiaConfig.faviconSource)
  if (!sourcePath || !fs.existsSync(sourcePath)) {
    return new Response('Favicon not found', { status: 404 })
  }

  const buffer = fs.readFileSync(sourcePath)
  const sourceType = mime.lookup(sourcePath) || 'application/octet-stream'
  const urlPath = new URL(request.url).pathname

  if (urlPath.endsWith('.svg')) {
    if (sourceType !== 'image/svg+xml') {
      return new Response('Favicon not found', { status: 404 })
    }
    return buildResponse(buffer, 'image/svg+xml')
  }

  if (urlPath.endsWith('.png')) {
    if (sourceType === 'image/png') {
      return buildResponse(buffer, 'image/png')
    }
    const pngBuffer = await convertToPng(buffer)
    if (pngBuffer) return buildResponse(pngBuffer, 'image/png')
    return buildResponse(buffer, sourceType)
  }

  if (urlPath.endsWith('.ico')) {
    if (sourceType === 'image/x-icon') {
      return buildResponse(buffer, 'image/x-icon')
    }
    const icoBuffer = await convertToIco(buffer)
    if (icoBuffer) return buildResponse(icoBuffer, 'image/x-icon')
    return buildResponse(buffer, sourceType)
  }

  return buildResponse(buffer, sourceType)
}

function resolveFaviconPath (faviconSource?: string): string | null {
  if (!faviconSource) return null
  const normalized = faviconSource.replace(/^\//, '')
  return path.join(process.cwd(), normalized)
}

function buildResponse (buffer: Buffer, contentType: string): Response {
  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}

async function convertToPng (buffer: Buffer): Promise<Buffer | null> {
  try {
    const sharp = (await import('sharp')).default
    return await sharp(buffer, { density: 512 })
      .resize(PNG_SIZE, PNG_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
  } catch (error) {
    console.warn('Favicon PNG conversion failed', error)
    return null
  }
}

async function convertToIco (buffer: Buffer): Promise<Buffer | null> {
  try {
    const pngToIco = (await import('png-to-ico')).default
    const pngBuffer = await convertToPng(buffer)
    if (!pngBuffer) return null
    return await pngToIco(pngBuffer)
  } catch (error) {
    console.warn('Favicon ICO conversion failed', error)
    return null
  }
}
