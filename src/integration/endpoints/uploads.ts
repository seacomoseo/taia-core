import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import mime from 'mime-types'

export const GET: APIRoute = async ({ params }) => {
  const filePath = params.path
  if (!filePath) {
    return new Response('File not found', { status: 404 })
  }

  // Resolver ruta desde la raíz del proyecto -> uploads/
  const fullPath = path.join(process.cwd(), 'uploads', filePath)

  if (!fs.existsSync(fullPath)) {
    return new Response('File not found', { status: 404 })
  }

  const buffer = fs.readFileSync(fullPath)
  const contentType = mime.lookup(fullPath) || 'application/octet-stream'

  return new Response(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
