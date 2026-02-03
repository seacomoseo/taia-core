---
name: Local SEO
description: Optimize for local search with Google Business Profile and local citations
---

# Local SEO Skill

Optimize local search presence for businesses serving specific geographic areas.

## When to Use

- Business serves local customers
- Setting up Google Business Profile
- Improving local search rankings
- Managing online reviews
- Building local citations
- Creating location-specific content

## Inputs

1. **Business Info**: Name, address, phone (NAP)
2. **Service Areas**: Geographic coverage
3. **Categories**: Business categories
4. **Current GBP Status**: New or existing

## Process

### Step 1: NAP Audit

Standardize business information:

```markdown
# NAP Standard

## Official Business Information

**Business Name**: [Exact legal/trading name]
**Address**: 
  Street: [street address]
  City: [city]
  State/Province: [state]
  Postal Code: [code]
  Country: [country]
**Phone**: [+XX XXX XXX XXX format]
**Website**: [https://domain.com]

## Variations to Avoid
- ❌ [Common misspelling]
- ❌ [Abbreviated version]
- ❌ [Old address]
- ❌ [Old phone number]

## NAP Consistency Check

| Source | Name | Address | Phone | Status |
|--------|------|---------|-------|--------|
| Website | ✅/❌ | ✅/❌ | ✅/❌ | |
| GBP | | | | |
| Facebook | | | | |
| Instagram | | | | |
| Yellow Pages | | | | |
| Industry Dir 1 | | | | |
| Industry Dir 2 | | | | |
```

### Step 2: Google Business Profile Setup/Optimization

Output to `/_context/local-seo/gbp-optimization.md`:

```markdown
# Google Business Profile Optimization

## Basic Information
- [ ] Business name (exact, no keywords stuffed)
- [ ] Primary category selected
- [ ] Secondary categories (up to 9)
- [ ] Address verified
- [ ] Phone number correct
- [ ] Website URL set
- [ ] Business hours complete
- [ ] Holiday hours added

## Categories

**Primary**: [main category]
**Secondary**:
1. [category]
2. [category]
3. [category]

## Description
[Write 750-character description with keywords naturally included]

## Attributes
Select all applicable:
- [ ] Payment methods
- [ ] Accessibility features
- [ ] Amenities
- [ ] Service options
- [ ] Health & safety

## Photos Strategy

### Required Photos
- [ ] Logo (square, transparent bg)
- [ ] Cover photo (landscape, 1080x608)
- [ ] Interior (3-5 photos)
- [ ] Exterior (2-3 photos)
- [ ] Team (2-3 photos)
- [ ] Products/services (5-10 photos)

### Photo Guidelines
- Minimum 720px width
- Well-lit, in focus
- No stock photos
- Geotagged when possible
- Descriptive filenames (city-service-business.jpg)

## Services/Products
List all services with descriptions:

| Service | Description | Price (optional) |
|---------|-------------|------------------|
| [service] | [description] | €XX |

## Posts Strategy

Weekly posting schedule:
- **Monday**: Tip/educational content
- **Wednesday**: Service highlight
- **Friday**: Behind the scenes/team

Post types to rotate:
- Updates
- Offers
- Events
- Products
```

### Step 3: Review Strategy

```markdown
# Review Strategy

## Current State
- Total reviews: X
- Average rating: X.X
- Review velocity: X/month

## Goals
- Target reviews: X (minimum 20-50 for credibility)
- Target rating: 4.5+
- Monthly new reviews: X

## Review Generation Tactics

### Ask Timing
Best moments to request:
1. After successful project completion
2. When customer expresses satisfaction
3. At key milestones

### Request Methods
- [ ] Email follow-up template
- [ ] SMS with direct link
- [ ] QR code in office/invoice
- [ ] Verbal ask with instruction card

### Review Link
Direct link: https://search.google.com/local/writereview?placeid=[PLACE_ID]

Short link: [create bit.ly or similar]

## Response Templates

### Positive Review Response
"[Name], ¡muchas gracias por tu reseña! Nos alegra mucho [specific mention]. 
Fue un placer trabajar contigo. ¡Te esperamos pronto!"

### Neutral Review Response
"Gracias por tu feedback, [Name]. Valoramos tu opinión y nos encantaría 
saber más sobre cómo podemos mejorar. ¿Podrías contactarnos en [email]?"

### Negative Review Response
"[Name], lamentamos que tu experiencia no haya sido la esperada. 
Esto no refleja nuestro estándar habitual. Por favor, contáctanos en 
[email] para resolver esto personalmente."

## Response Guidelines
- Respond within 24-48 hours
- Personalize each response
- Mention specifics when possible
- Keep professional, never defensive
- Take issues offline
```

### Step 4: Local Citations

Output to `/_context/local-seo/citations.md`:

```markdown
# Citation Building Plan

## Tier 1: Essential (High Authority)
- [ ] Google Business Profile
- [ ] Apple Maps
- [ ] Bing Places
- [ ] Facebook Business
- [ ] LinkedIn Company

## Tier 2: Aggregators
- [ ] Yelp
- [ ] Yellow Pages
- [ ] Foursquare

## Tier 3: Industry-Specific
Identify directories for [industry]:
- [ ] [Industry directory 1]
- [ ] [Industry directory 2]
- [ ] [Industry directory 3]

## Tier 4: Local
- [ ] Local chamber of commerce
- [ ] Local business associations
- [ ] Local news/media
- [ ] Local event sponsors

## Spain-Specific Citations
- [ ] Páginas Amarillas
- [ ] QDQ
- [ ] Infoisinfo
- [ ] Vulka
- [ ] 11870

## Citation Tracking

| Directory | URL | Status | NAP Correct | Last Updated |
|-----------|-----|--------|-------------|--------------|
| [name] | [url] | Created/Claimed/Pending | ✅/❌ | YYYY-MM-DD |
```

### Step 5: Local Content Strategy

```markdown
# Local Content Strategy

## Location Pages

If multiple service areas, create pages:

### Structure
/[servicio]-[ciudad]/

Example:
- /fontanero-madrid/
- /fontanero-barcelona/
- /fontanero-valencia/

### Page Template
- H1: [Servicio] en [Ciudad]
- Intro: Local-focused opening
- Services: What you offer in that area
- Why choose us: Local expertise
- Testimonials: From that area
- FAQ: Location-specific questions
- CTA: Contact with local number if applicable
- Map: Embedded Google Map
- Structured Data: LocalBusiness schema

## Local Blog Topics
- "[Service] en [City]: Guía completa"
- "Mejores [products] en [City]"
- "Cómo elegir [service] en [neighborhood]"
- "[Seasonal topic] en [City]"
- Local event coverage
- Community involvement posts

## Local Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "image": "[logo-url]",
  "telephone": "[phone]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[street]",
    "addressLocality": "[city]",
    "postalCode": "[code]",
    "addressCountry": "[country]"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[lat]",
    "longitude": "[lng]"
  },
  "openingHoursSpecification": [...],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[X.X]",
    "reviewCount": "[XX]"
  }
}
```
```

### Step 6: Tracking & Reporting

```markdown
# Local SEO Tracking

## Key Metrics

| Metric | Current | Target | Source |
|--------|---------|--------|--------|
| GBP views | | | GBP Insights |
| GBP searches | | | GBP Insights |
| Direction requests | | | GBP Insights |
| Phone calls | | | GBP Insights |
| Website clicks | | | GBP Insights |
| Reviews (count) | | | GBP |
| Reviews (rating) | | | GBP |
| Local pack rankings | | | Manual search |

## Monthly Checklist

- [ ] Respond to all reviews
- [ ] Post 4+ GBP updates
- [ ] Check NAP consistency
- [ ] Add new photos
- [ ] Update hours if needed
- [ ] Monitor ranking for key terms
- [ ] Check for and fix duplicate listings
```

## Outputs

1. `/_context/local-seo/nap-standard.md` - Standardized NAP
2. `/_context/local-seo/gbp-optimization.md` - GBP setup guide
3. `/_context/local-seo/review-strategy.md` - Review management
4. `/_context/local-seo/citations.md` - Citation building plan
5. `/_context/local-seo/local-content.md` - Content strategy

## Definition of Done

- [ ] NAP standardized and documented
- [ ] GBP fully optimized
- [ ] Photo strategy implemented
- [ ] Review process established
- [ ] Tier 1 & 2 citations created
- [ ] Local schema implemented
- [ ] Location pages created (if multi-location)
- [ ] Monthly tracking in place

## Common Issues

### Duplicate Listings
Search for and merge/remove duplicates:
- "Business Name" city
- Phone number search
- Address variations

### Category Selection
Choose most specific category first:
- ❌ "Company" (too generic)
- ✅ "Plumber" (specific)

### Service Area Business
If no storefront:
- Hide address
- Set service area radius
- Verify via postcard to home/PO box
