# Content Rails

Guidelines for creating effective, accessible, and SEO-friendly content.

## Content Structure

### Heading Hierarchy

Every page follows this structure:

```
H1: Page Title (exactly one per page)
├── H2: Main Section
│   ├── H3: Subsection
│   │   └── H4: Detail (rarely needed)
│   └── H3: Another Subsection
└── H2: Another Main Section
```

Rules:
- Never skip levels (no H1 → H3)
- Only one H1 per page
- Headings should be descriptive, not "Introduction"

### Page Types

#### Homepage
- Clear value proposition above the fold
- Primary CTA within first viewport
- Social proof (testimonials, logos)
- Overview of main offerings
- Secondary CTAs for exploration

#### Service/Product Pages
- Problem → Solution narrative
- Clear benefits (not just features)
- Pricing if applicable
- FAQ section
- Strong CTA

#### Blog Posts
- Engaging title (50-60 characters)
- Meta description that compels click
- Introduction that hooks reader
- Scannable subheadings
- Conclusion with CTA

#### Category/Collection Pages
- Brief description of the category
- Filtering options if many items
- Grid of items with key info
- Pagination for large collections

## Writing Guidelines

### Tone of Voice

| Aspect | Guidelines |
|--------|------------|
| Clarity | Simple sentences, avoid jargon |
| Directness | Active voice, second person (you/your) |
| Helpfulness | Focus on user benefit |
| Professionalism | Friendly but not overly casual |

### Call to Actions (CTAs)

Good CTAs are:
- **Specific**: "Get Your Free Quote" not "Submit"
- **Action-oriented**: Start with a verb
- **Urgent when appropriate**: "Start Today"
- **Visible**: Contrasting colors, clear buttons

Examples:
- ✅ "Schedule Your Free Consultation"
- ✅ "Add to Cart - €29.99"
- ✅ "Read the Full Guide"
- ❌ "Click Here"
- ❌ "Submit"
- ❌ "More Info"

### Readability

- **Paragraphs**: 2-4 sentences max
- **Sentences**: 15-20 words average
- **Words**: Prefer common over complex
- **Lists**: Use bullets for 3+ items
- **Bold**: Key terms and phrases only

## Accessibility

### Images

```markdown
<!-- Descriptive alt text -->
![Team members collaborating around a whiteboard](/images/team-collab.jpg)

<!-- Decorative images -->
<img src="divider.svg" alt="" role="presentation" />
```

### Links

```markdown
<!-- Good: Descriptive -->
Read our [complete guide to SEO optimization](/blog/seo-guide)

<!-- Bad: Non-descriptive -->
For more info, [click here](/blog/seo-guide)
```

### Forms

- Labels for every input
- Clear error messages
- Logical tab order
- Keyboard accessible

## Localization

### Language Codes

Use proper BCP 47 codes:
- `es` - Spanish
- `en` - English
- `fr` - French
- `de` - German

### Content Guidelines

- Avoid culture-specific idioms
- Use ISO date format (YYYY-MM-DD) internally
- Display dates in locale format to users
- Currency should match locale

## Content Types

### Pages Collection

```yaml
title: About Us
slug: about
template: default
seo:
  title: About Our Company | Brand Name
  description: Learn about our mission, team, and values.
showInNav: true
menuOrder: 2
```

### Posts Collection

```yaml
title: How to Optimize Your Website Speed
slug: optimize-website-speed
excerpt: Learn proven techniques to make your site faster.
publishedAt: 2024-01-15
author: Maria García
categories:
  - performance
  - guides
tags:
  - web-vitals
  - optimization
featuredImage: /images/blog/speed-optimization.jpg
featuredImageAlt: Graph showing website speed improvements
seo:
  title: Website Speed Optimization Guide | Blog
  description: Proven techniques to improve your website's loading time and Core Web Vitals.
```

### Products Collection

```yaml
title: Premium Widget Pro
slug: premium-widget-pro
description: Our most advanced widget with all features included.
price: 199.99
compareAtPrice: 249.99
currency: EUR
category: widgets
images:
  - src: /images/products/widget-pro-1.jpg
    alt: Premium Widget Pro front view
  - src: /images/products/widget-pro-2.jpg
    alt: Premium Widget Pro features closeup
inStock: true
featured: true
seo:
  title: Premium Widget Pro - Best Seller | Store
  description: Get our best-selling Premium Widget Pro. Advanced features, premium quality.
```

## Quality Checklist

Before publishing any content:

- [ ] Title is compelling and under 60 characters
- [ ] Meta description is under 160 characters
- [ ] Only one H1 on the page
- [ ] Headings follow proper hierarchy
- [ ] All images have descriptive alt text
- [ ] Links are descriptive (not "click here")
- [ ] CTAs are clear and action-oriented
- [ ] Content is scannable (short paragraphs, lists)
- [ ] No spelling or grammar errors
- [ ] Mobile preview looks good
- [ ] Related content is linked
