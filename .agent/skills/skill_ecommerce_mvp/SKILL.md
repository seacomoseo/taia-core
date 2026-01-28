---
name: E-commerce MVP
description: Set up and validate e-commerce functionality
---

# E-commerce MVP Skill

Implement and validate minimum viable e-commerce.

## When to Use

- Setting up new store
- Adding products
- Testing checkout flow
- Debugging e-commerce issues

## Scope (MVP)

What's included:
- Product catalog from CMS
- Static product pages
- Cart with localStorage
- Stripe Checkout integration
- Success/cancel pages

What's NOT included (v1):
- Inventory management
- User accounts
- Order history
- Shipping calculation
- Complex variants

## Process

### Step 1: Set Up Product Schema

Ensure product schema exists in `src/schemas/product.ts`:

```typescript
export const productSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  currency: z.string().length(3).default('EUR'),
  images: z.array(z.object({
    src: z.string(),
    alt: z.string()
  })).min(1),
  category: z.string().optional(),
  inStock: z.boolean().default(true),
  seo: seoSchema
})
```

### Step 2: Create Sample Products

Create in `src/content/products/`:

```yaml
# product-name.md
---
title: Product Name
slug: product-name
description: Product description for listing pages.
price: 29.99
currency: EUR
images:
  - src: /images/products/product-1.jpg
    alt: Product front view
inStock: true
category: category-slug
seo:
  title: Product Name | Store
  description: Buy Product Name. High quality product with great features.
---

Full product description with markdown formatting.
```

### Step 3: Implement Cart

Create `src/lib/cart.ts`:

```typescript
export interface CartItem {
  slug: string
  title: string
  price: number
  quantity: number
  image: string
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

export function addToCart(item: Omit<CartItem, 'quantity'>): void {
  const cart = getCart()
  const existing = cart.find(i => i.slug === item.slug)
  if (existing) {
    existing.quantity++
  } else {
    cart.push({ ...item, quantity: 1 })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function removeFromCart(slug: string): void {
  const cart = getCart().filter(i => i.slug !== slug)
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function clearCart(): void {
  localStorage.removeItem('cart')
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0)
}
```

### Step 4: Create Checkout Worker

Create `functions/api/checkout.ts`:

```typescript
import Stripe from 'stripe'

interface Env {
  STRIPE_SECRET_KEY: string
  SITE_URL: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY)
  
  const { items } = await context.request.json()
  
  // IMPORTANT: Look up prices server-side, never trust client
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.title,
        images: [item.image]
      },
      unit_amount: Math.round(item.price * 100)
    },
    quantity: item.quantity
  }))
  
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${context.env.SITE_URL}/tienda/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${context.env.SITE_URL}/tienda/cancel`
  })
  
  return Response.json({ url: session.url })
}
```

### Step 5: Test Checkout Flow

1. Add product to cart
2. Click checkout button
3. Verify redirect to Stripe
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout
6. Verify redirect to success page

### Step 6: Validate Security

Checklist:
- [ ] Prices looked up server-side
- [ ] No secret keys in client code
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] Rate limiting on checkout endpoint

## Testing Commands

```bash
# Validate product content
pnpm taia:validate

# Test locally with Stripe CLI
stripe listen --forward-to localhost:8788/api/checkout

# Test build
pnpm build && pnpm preview
```

## Environment Variables

Required for Cloudflare:
- `STRIPE_SECRET_KEY` - Stripe secret key (use test key for dev)
- `SITE_URL` - Full site URL for redirects

## Stripe Test Cards

| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Decline |
| 4000 0000 0000 3220 | 3D Secure |

## Outputs

1. Valid product content
2. Working cart (localStorage)
3. Checkout Worker
4. Success/cancel pages
5. Test documentation

## Definition of Done

- [ ] Products pass schema validation
- [ ] Cart add/remove works
- [ ] Checkout creates Stripe session
- [ ] Stripe test payment succeeds
- [ ] Success page displays
- [ ] Cancel page works
- [ ] Security checklist passed
