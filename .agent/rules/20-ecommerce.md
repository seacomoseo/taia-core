# E-commerce Rules

## Product Schema

Products must have:
- title
- slug
- description
- price (positive number)
- At least one image with alt text
- SEO meta

## Pricing

- Always store in cents/smallest unit
- Display with proper currency formatting
- Compare-at price optional
- Currency code required (EUR, USD, etc.)

## Checkout Flow

1. Cart stored in localStorage
2. Checkout creates Stripe Session server-side
3. Never trust client-side prices
4. Validate cart on server before checkout

## Security

- Server validates all prices
- No secret keys in client code
- HTTPS only
- CSP headers configured

## Stripe Integration

- Use Stripe Checkout (redirect flow)
- Test mode for development
- Webhook for order confirmation
- Handle edge cases (expired sessions, etc.)

## Inventory

Optional for MVP:
- `inStock` boolean
- `quantity` for actual tracking
- Prevent checkout of out-of-stock items
