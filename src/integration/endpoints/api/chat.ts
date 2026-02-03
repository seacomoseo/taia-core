import type { APIRoute } from 'astro'
import { ConfigService } from '../../../services/config-service'

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const env = (locals as any).runtime?.env || process.env
    const { GEMINI_API_KEY, CLOUDFLARE_AI } = env

    const body = await request.json() as { message: string }
    const { message } = body

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!GEMINI_API_KEY && !CLOUDFLARE_AI) {
      return new Response(
        JSON.stringify({
          response: 'No LLM provider configured. Please set GEMINI_API_KEY or enable Cloudflare AI.',
          error: 'No LLM configured'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const configService = new ConfigService(process.cwd())
    const defaultLang = configService.getDefaultLanguage()

    const systemPrompt = defaultLang === 'en'
      ? `You are TAIA, an AI assistant that helps edit website content.
Respond in English. Be helpful, concise, and clear.`
      : `You are TAIA, an AI assistant that helps edit website content.
Respond in Spanish. Be helpful, concise, and clear.`

    let assistantResponse: string

    if (GEMINI_API_KEY) {
      assistantResponse = await callGemini(GEMINI_API_KEY, systemPrompt, message)
    } else {
      assistantResponse = 'Error: No LLM provider available.'
    }

    return new Response(
      JSON.stringify({ response: assistantResponse }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Chat API error:', err)
    return new Response(
      JSON.stringify({ error: 'Failed to process message' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function callGemini (apiKey: string, systemPrompt: string, userMessage: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { text: userMessage }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    }
  )

  const data = (await response.json()) as any

  if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text
  }

  throw new Error('Invalid Gemini response')
}
