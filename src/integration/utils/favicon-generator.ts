import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import mime from 'mime-types'

const PNG_SIZE = 192
const require = createRequire(import.meta.url)

export async function generateFaviconAssets (projectRoot: string, faviconSource?: string): Promise<void> {
  if (!faviconSource) return

  const sourcePath = path.join(projectRoot, faviconSource.replace(/^\//, ''))
  if (!fs.existsSync(sourcePath)) return

  const publicDir = path.join(projectRoot, 'public')
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })

  const buffer = fs.readFileSync(sourcePath)
  const sourceType = mime.lookup(sourcePath) || ''
  const isSvg = sourceType === 'image/svg+xml' || sourcePath.endsWith('.svg')

  if (isSvg) {
    fs.writeFileSync(path.join(publicDir, 'favicon.svg'), buffer)
  }

  const pngBuffer = await convertToPng(buffer)
  if (pngBuffer) {
    fs.writeFileSync(path.join(publicDir, 'favicon.png'), pngBuffer)
    const icoBuffer = await convertToIco(pngBuffer)
    if (icoBuffer) {
      fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer)
    }
  } else {
    if (sourceType === 'image/png') {
      fs.writeFileSync(path.join(publicDir, 'favicon.png'), buffer)
    }
    if (sourceType === 'image/x-icon') {
      fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buffer)
    }
  }
}

async function convertToPng (buffer: Buffer): Promise<Buffer | null> {
  try {
    const sharp = require('sharp')
    return await sharp(buffer, { density: 512 })
      .resize(PNG_SIZE, PNG_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
  } catch (error) {
    console.warn('Favicon PNG conversion failed', error)
    return null
  }
}

async function convertToIco (pngBuffer: Buffer): Promise<Buffer | null> {
  try {
    const pngToIco = require('png-to-ico')
    return await pngToIco(pngBuffer)
  } catch (error) {
    console.warn('Favicon ICO conversion failed', error)
    return null
  }
}
