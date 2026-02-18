import type { APIRoute } from 'astro'

const MIN_SUBMIT_MS = 1200

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData()
    const honeypot = String(formData.get('_website') || '').trim()
    if (honeypot !== '') {
      return json({ ok: false, error: 'SPAM_HONEYPOT' }, 400)
    }

    const startedAt = Number(String(formData.get('_startedAt') || '0'))
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_SUBMIT_MS) {
      return json({ ok: false, error: 'SPAM_FAST_SUBMIT' }, 400)
    }

    const consent = formData.get('consent')
    if (consent !== null && consent !== 'true' && consent !== 'on') {
      return json({ ok: false, error: 'CONSENT_REQUIRED' }, 400)
    }

    return json({ ok: true }, 200)
  } catch {
    return json({ ok: false, error: 'INVALID_FORM' }, 400)
  }
}

function json (body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
