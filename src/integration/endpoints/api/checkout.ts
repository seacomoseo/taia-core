import type { APIRoute } from 'astro'
import Stripe from 'stripe'
import { ConfigService } from '../../../services/config-service'

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Get env from Cloudflare runtime (locals.runtime.env) or process.env (local dev)
    const env = (locals as any).runtime?.env || process.env
    const { STRIPE_SECRET_KEY, SITE_URL = 'http://localhost:4321' } = env
    const configService = new ConfigService(process.cwd())
    const defaultLang = configService.getDefaultLanguage()
    const stripeLocale = defaultLang === 'en' ? 'en' : 'es'
    const taiaConfig = configService.getTaiaConfig()
    const currency = typeof taiaConfig.currency === 'string' ? taiaConfig.currency : 'EUR'
    const stripeCurrency = currency.toLowerCase()
    const productsCollection = taiaConfig.collections.find((item) => item.id === 'products')
    const productsPrefix = productsCollection
      ? configService.getCollectionPrefix(productsCollection, defaultLang)
      : 'tienda'
    const shopBasePath = productsPrefix ? `/${productsPrefix}` : ''

    if (!STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: 'Stripe not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16' as any
    })

    const body = await request.json() as any
    const { items } = body

    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const lineItems = items.map((item: any) => {
      const lineItem: any = {
        price_data: {
          currency: stripeCurrency,
          product_data: {
            name: item.title
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      }

      if (item.image) {
        // Ensure image URL is absolute
        const imageUrl = item.image.startsWith('http') ? item.image : `${SITE_URL}${item.image}`
        lineItem.price_data.product_data.images = [imageUrl]
      }

      return lineItem
    })

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${SITE_URL}${shopBasePath}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}${shopBasePath}/cancel`,
      locale: stripeLocale as any
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Checkout error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
