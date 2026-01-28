# Performance Rules

## Targets

- Lighthouse Performance ≥ 90
- LCP ≤ 2.5s
- CLS ≤ 0.1
- TBT ≤ 200ms

## Images

1. Always specify width/height
2. Use WebP format
3. Add `loading="lazy"` for below-fold
4. Add `fetchpriority="high"` for hero
5. Max sizes: hero 200KB, content 100KB

## Fonts

1. Max 2 font families
2. Use `font-display: swap`
3. Preload critical fonts
4. Prefer system fonts when possible

## JavaScript

1. Zero render-blocking JS
2. Use `defer` or `type="module"`
3. No jQuery
4. Lazy load third-party scripts

## CSS

1. Inline critical CSS
2. Keep under 14KB
3. No `@import`
4. Mobile-first approach

## Testing

Run before deploy:
```bash
pnpm taia:lighthouse http://localhost:4321
```

Fails if any budget is exceeded.
