# Marketing Rules

## Tracking & Analytics

### Required Setup
- [ ] Google Analytics 4 installed
- [ ] Google Search Console verified
- [ ] Google Tag Manager (optional but recommended)
- [ ] Meta Pixel (if running Meta Ads)

### Conversion Tracking
Every site must track:
1. **Contact forms** - Form submission events
2. **Phone clicks** - `tel:` link clicks
3. **WhatsApp clicks** - WhatsApp link clicks
4. **Email clicks** - `mailto:` link clicks
5. **Purchases** - E-commerce transactions (if applicable)

### UTM Parameters
Use consistently:
```
?utm_source=google&utm_medium=cpc&utm_campaign=brand
?utm_source=facebook&utm_medium=paid&utm_campaign=leads
?utm_source=newsletter&utm_medium=email&utm_campaign=promo
```

## Google Business Profile

### Required for Local Business
- [ ] Profile claimed and verified
- [ ] NAP (Name, Address, Phone) consistent with website
- [ ] All business info complete
- [ ] Categories selected (primary + secondaries)
- [ ] Photos uploaded (logo, cover, interior, exterior)
- [ ] Business hours set
- [ ] Services/products listed

### Ongoing
- Respond to reviews within 48 hours
- Post updates weekly
- Add new photos monthly

## Social Meta Tags

Every page must have:

```html
<!-- Open Graph -->
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description" />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:url" content="https://example.com/page/" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
```

### OG Image Requirements
- Size: 1200x630px
- Format: JPG or PNG
- Max size: 300KB
- Include brand elements

## Paid Advertising

### Before Running Ads
- [ ] Conversion tracking verified
- [ ] Landing pages optimized (Performance 90+)
- [ ] Privacy policy published
- [ ] Contact info visible
- [ ] Clear CTAs on landing pages

### Ad Landing Pages
Must have:
- H1 matching ad headline
- Clear value proposition
- Trust signals (reviews, logos)
- Single focused CTA
- Fast load time (LCP < 2.5s)
- Mobile optimized

### Don't
- Send ads to homepage (create dedicated landing pages)
- Use clickbait that doesn't match content
- Ignore mobile experience
- Run ads without conversion tracking

## Email Marketing

### Compliance
- [ ] GDPR consent checkbox on forms
- [ ] Unsubscribe link in all emails
- [ ] Physical address in footer
- [ ] Honor unsubscribes within 10 days

### Forms
- Double opt-in recommended
- Clear value proposition for signing up
- Minimal required fields
- Confirmation message after submit

## DNS & Technical

### Email Deliverability
Configure for domain:
- [ ] SPF record
- [ ] DKIM record
- [ ] DMARC record

### Verification
Create placeholder files in `/public/`:
- `google*.html` - Google verification
- `BingSiteAuth.xml` - Bing verification
- `.well-known/` - Various verifications

## Related Skills

For implementation details:
- `skill_marketing_strategy` - Overall marketing plan
- `skill_local_seo` - Google Business Profile setup
- `skill_paid_ads_strategy` - Google/Meta Ads setup
