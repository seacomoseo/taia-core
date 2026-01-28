# Performance Rails

Guidelines for achieving optimal Core Web Vitals and page speed.

## Performance Targets

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Lighthouse Performance | ≥ 90 | < 50 blocks deploy |
| LCP (Largest Contentful Paint) | ≤ 2.5s | > 4s fails |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | > 0.25 fails |
| TBT (Total Blocking Time) | ≤ 200ms | > 600ms fails |
| FCP (First Contentful Paint) | ≤ 1.8s | > 3s fails |

## Images

### Format Selection

| Use Case | Format |
|----------|--------|
| Photos | WebP (fallback JPEG) |
| Graphics/logos | SVG |
| Icons | SVG or icon font |
| Animations | WebP or CSS |

### Optimization Rules

1. **Always specify dimensions**
   ```html
   <img src="photo.jpg" width="800" height="600" alt="Description" />
   ```

2. **Use srcset for responsive images**
   ```html
   <img 
     src="photo-800.webp" 
     srcset="photo-400.webp 400w, photo-800.webp 800w, photo-1200.webp 1200w"
     sizes="(max-width: 600px) 100vw, 800px"
     alt="Description"
   />
   ```

3. **Lazy load below-fold images**
   ```html
   <img src="photo.jpg" loading="lazy" decoding="async" />
   ```

4. **Eager load critical images**
   ```html
   <img src="hero.jpg" loading="eager" fetchpriority="high" />
   ```

### Size Limits

| Context | Max Size |
|---------|----------|
| Hero image | 200KB |
| Content image | 100KB |
| Thumbnail | 30KB |
| Total page images | 500KB |

## Fonts

### Best Practices

1. **Limit font families** - Max 2 families per site
2. **Limit weights** - Only load what you use
3. **Use font-display: swap**
   ```css
   @font-face {
     font-family: 'Custom Font';
     font-display: swap;
     src: url('/fonts/custom.woff2') format('woff2');
   }
   ```

4. **Preload critical fonts**
   ```html
   <link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" crossorigin />
   ```

5. **Prefer system fonts when possible**
   ```css
   font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
   ```

## CSS

### Critical CSS

1. Inline critical CSS in `<head>`
2. Load non-critical CSS asynchronously
3. Keep critical CSS under 14KB

### Avoid

- `@import` (blocks rendering)
- Unused CSS (tree-shake or remove)
- Complex selectors (keep specificity low)
- `!important` (except for utilities)

### Responsive Design

```css
/* Mobile-first */
.component { /* base mobile styles */ }

@media (min-width: 768px) {
  .component { /* tablet styles */ }
}

@media (min-width: 1024px) {
  .component { /* desktop styles */ }
}
```

## JavaScript

### General Rules

1. **Minimize JS** - Question every script
2. **Defer non-critical JS**
   ```html
   <script src="analytics.js" defer></script>
   ```

3. **Use modules**
   ```html
   <script type="module" src="app.js"></script>
   ```

### What NOT to do

- No render-blocking scripts in `<head>`
- No jQuery (use vanilla JS)
- No large frameworks for simple sites
- No inline onclick handlers

### Third-Party Scripts

| Script Type | Loading Strategy |
|-------------|-----------------|
| Analytics | Defer, load after interaction |
| Chat widgets | Load on user intent |
| Social embeds | Lazy load on scroll |
| Ads | Lazy load |

## Caching

### Cloudflare Headers

```
# Static assets (1 year)
Cache-Control: public, max-age=31536000, immutable

# HTML (revalidate always)
Cache-Control: public, max-age=0, must-revalidate

# API responses (no cache)
Cache-Control: private, no-store
```

## Compression

Enabled by default on Cloudflare:
- Brotli (preferred)
- Gzip (fallback)

## Preloading

```html
<!-- Critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/hero.webp" as="image" />

<!-- Preconnect to third parties -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://analytics.example.com" />
```

## Build Optimization

Astro handles most optimizations automatically:

- ✅ HTML minification
- ✅ CSS minification
- ✅ Dead code elimination
- ✅ Asset fingerprinting
- ✅ Image optimization (with @astrojs/image)

## Testing

Run before every deploy:

```bash
# Build and preview
pnpm build && pnpm preview

# Run Lighthouse
pnpm taia:lighthouse http://localhost:4321

# Test with real throttling
# Use Chrome DevTools with Slow 4G preset
```

## Performance Checklist

- [ ] All images have explicit width/height
- [ ] Images are in modern formats (WebP/AVIF)
- [ ] Hero image is preloaded
- [ ] Fonts use font-display: swap
- [ ] No render-blocking resources
- [ ] Third-party scripts are deferred
- [ ] Total page weight < 1MB
- [ ] Lighthouse Performance ≥ 90
- [ ] Core Web Vitals pass
