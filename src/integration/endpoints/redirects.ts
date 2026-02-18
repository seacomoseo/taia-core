import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

interface RedirectRule {
  from: string
  to: string
  type?: number
}

export const GET: APIRoute = async () => {
  const filePath = path.join(process.cwd(), 'content', 'redirects.yml')
  if (!fs.existsSync(filePath)) {
    return new Response('', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = (yaml.load(raw) as { redirects?: RedirectRule[] } | RedirectRule[] | null) || null
  const redirects = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.redirects)
      ? parsed.redirects
      : []

  const body = redirects
    .filter((rule) => rule && typeof rule.from === 'string' && typeof rule.to === 'string')
    .map((rule) => `${rule.from} ${rule.to} ${Number(rule.type) || 301}`)
    .join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
