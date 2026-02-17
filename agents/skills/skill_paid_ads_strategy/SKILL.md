---
name: Paid Ads Strategy
description: Plan and structure Google Ads and Meta Ads campaigns
---

# Paid Ads Strategy Skill

Plan effective paid advertising campaigns for Google and Meta platforms.

## When to Use

- Launching paid advertising
- Restructuring underperforming campaigns
- Planning ad budget allocation
- Creating campaign briefs
- Setting up conversion tracking

## Inputs

1. **Business Info**: From Project Intake
2. **Marketing Objectives**: From Marketing Strategy
3. **Budget**: Monthly ad spend
4. **Competitors**: From Competitive Analysis (for inspiration)

## Process

### Step 1: Define Advertising Goals

```markdown
# Paid Ads Objectives

## Primary Goal
- [ ] Brand Awareness (reach, impressions)
- [ ] Traffic (website visits)
- [ ] Leads (form submissions, calls)
- [ ] Sales (purchases, conversions)

## Conversion Actions
What counts as success:

| Action | Value | Priority |
|--------|-------|----------|
| Purchase | €XX | Primary |
| Lead form submit | €XX | Primary |
| Phone call | €XX | Primary |
| WhatsApp click | €XX | Secondary |
| Newsletter signup | €XX | Secondary |

## Target Metrics

| Metric | Target |
|--------|--------|
| Cost per click (CPC) | €X.XX |
| Click-through rate (CTR) | X% |
| Conversion rate | X% |
| Cost per acquisition (CPA) | €XX |
| Return on ad spend (ROAS) | X:1 |
```

### Step 2: Audience Definition

Output to `/_context/ads/audiences.md`:

```markdown
# Target Audiences

## Google Ads Audiences

### Search Intent
Keywords targeting users actively searching:
- [service] + [location]
- [product] + [modifier]
- [problem] + solution

### In-Market Segments
Users actively researching:
- [relevant Google segment]
- [relevant Google segment]

### Affinity Audiences
Users with related interests:
- [relevant affinity]
- [relevant affinity]

## Meta Ads Audiences

### Core Targeting

**Demographics**
- Age: XX-XX
- Gender: All / Male / Female
- Location: [cities/radius]
- Language: [languages]

**Interests**
- Interest 1
- Interest 2
- Interest 3

**Behaviors**
- Behavior 1
- Behavior 2

### Custom Audiences
- Website visitors (Pixel required)
- Customer list (email upload)
- Video viewers
- Instagram/Facebook engagers

### Lookalike Audiences
- LAL of customers (1-3%)
- LAL of leads (1-5%)
- LAL of high-value customers (1%)

## Audience Exclusions
Exclude to avoid wasted spend:
- Existing customers (if acquisition focus)
- Job seekers
- Competitors (if identifiable)
- Converted users (for acquisition campaigns)
```

### Step 3: Google Ads Campaign Structure

Output to `/_context/ads/google-ads-structure.md`:

```markdown
# Google Ads Structure

## Account Organization

```
Account: [Business Name]
├── Campaign: Search - Brand
│   └── Ad Group: Brand Terms
├── Campaign: Search - Services
│   ├── Ad Group: [Service 1]
│   ├── Ad Group: [Service 2]
│   └── Ad Group: [Service 3]
├── Campaign: Search - Location
│   ├── Ad Group: [City 1]
│   └── Ad Group: [City 2]
├── Campaign: Performance Max
│   └── Asset Group: Main
└── Campaign: Remarketing
    └── Ad Group: Website Visitors
```

## Campaigns Detail

### Campaign: Search - Brand
- **Type**: Search
- **Goal**: Capture brand searches
- **Budget**: €X/day (10-15% of total)
- **Bidding**: Maximize conversions

**Keywords**:
- [brand name]
- [brand name] + [service]
- [common misspellings]

### Campaign: Search - Services
- **Type**: Search
- **Goal**: Capture service intent
- **Budget**: €X/day (50-60% of total)
- **Bidding**: Target CPA €XX

**Ad Group: [Service 1]**
Keywords:
- [service] + [location]
- [service] near me
- best [service]
- [service] precio/presupuesto

### Campaign: Performance Max
- **Type**: Performance Max
- **Goal**: Multi-channel reach
- **Budget**: €X/day (20-30% of total)
- **Bidding**: Maximize conversions

## Keyword Match Types Strategy

| Match Type | Use For | Example |
|------------|---------|---------|
| Exact [keyword] | High-intent, proven | [fontanero madrid] |
| Phrase "keyword" | Intent clusters | "fontanero urgente" |
| Broad keyword | Discovery (with caution) | fontanero servicios |

## Negative Keywords

Add to all campaigns:
- gratis / free
- empleo / trabajo / jobs
- curso / formación
- qué es / what is
- [competitor names] (usually)
- DIY / cómo hacer
```

### Step 4: Meta Ads Campaign Structure

Output to `/_context/ads/meta-ads-structure.md`:

```markdown
# Meta Ads Structure

## Account Organization

```
Account: [Business Name]
├── Campaign: Conversions - Leads
│   ├── Ad Set: Interest Targeting
│   ├── Ad Set: Lookalike 1%
│   └── Ad Set: Retargeting
├── Campaign: Traffic - Blog
│   └── Ad Set: Broad Interests
└── Campaign: Awareness - Brand
    └── Ad Set: Local Reach
```

## Campaigns Detail

### Campaign: Conversions - Leads
- **Objective**: Leads / Conversions
- **Budget**: €X/day
- **Optimization**: Lead form / Website conversion

**Ad Set: Interest Targeting**
- Audience: [defined interests]
- Placements: Automatic (or Facebook Feed + Instagram Feed)
- Budget: €X/day

**Ad Set: Lookalike 1%**
- Audience: Lookalike of customers
- Budget: €X/day

**Ad Set: Retargeting**
- Audience: Website visitors 30 days, excluding converters
- Budget: €X/day

## Ad Creative Strategy

### Image/Video Specs
- Image: 1080x1080 (square) or 1080x1920 (stories)
- Video: 15-30 seconds, subtitled
- File size: <30MB

### Creative Types to Test
1. **Problem/Solution**: Show pain point, offer solution
2. **Testimonial**: Customer quote/video
3. **Before/After**: Visual transformation
4. **How-to**: Educational content
5. **Offer**: Promotion/discount

### Copy Framework

**Primary Text** (125 characters visible):
Hook → Benefit → CTA

Example:
"¿Cansado de [problema]? Descubre cómo [solución] puede [beneficio]. Solicita presupuesto gratis 👇"

**Headline** (40 characters):
Clear value proposition

**Description** (30 characters):
Supporting info or CTA

### A/B Testing Plan
- Week 1-2: Test audiences (same creative)
- Week 3-4: Test creatives (winning audience)
- Ongoing: Test copy, offers, formats
```

### Step 5: Budget Allocation

```markdown
# Ad Budget Allocation

## Total Monthly Budget: €X

### Platform Split

| Platform | Monthly | Daily | % |
|----------|---------|-------|---|
| Google Ads | €X | €X | 60% |
| Meta Ads | €X | €X | 40% |

### Google Ads Budget

| Campaign | Daily | Monthly | % |
|----------|-------|---------|---|
| Brand | €X | €X | 10% |
| Services | €X | €X | 55% |
| Performance Max | €X | €X | 25% |
| Remarketing | €X | €X | 10% |

### Meta Ads Budget

| Campaign | Daily | Monthly | % |
|----------|-------|---------|---|
| Conversions | €X | €X | 70% |
| Traffic | €X | €X | 20% |
| Awareness | €X | €X | 10% |

## Scaling Rules

**When to increase budget**:
- CPA below target for 7+ days
- Conversion rate stable
- Frequency < 3 (Meta)

**When to decrease/pause**:
- CPA 50%+ above target for 5+ days
- CTR dropping consistently
- Frequency > 5 (Meta)
```

### Step 6: Tracking Setup

```markdown
# Conversion Tracking Setup

## Google Ads

### Google Tag (gtag.js)
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-CONVERSION_ID');
</script>
```

### Conversion Actions to Create
- [ ] Lead form submission
- [ ] Phone call clicks
- [ ] WhatsApp clicks
- [ ] Purchase (if e-commerce)

## Meta Ads

### Meta Pixel
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### Standard Events
- Lead: Form submission
- Contact: WhatsApp/phone click
- Purchase: Completed sale

## Testing Checklist
- [ ] Submit test form, verify conversion fires
- [ ] Click phone/WhatsApp, verify event
- [ ] Complete test purchase, verify
- [ ] Check attribution in platform reports
```

## Outputs

1. `/_context/ads/objectives.md` - Goals and metrics
2. `/_context/ads/audiences.md` - Audience definitions
3. `/_context/ads/google-ads-structure.md` - Google campaign structure
4. `/_context/ads/meta-ads-structure.md` - Meta campaign structure
5. `/_context/ads/budget.md` - Budget allocation
6. `/_context/ads/tracking.md` - Conversion setup

## Definition of Done

- [ ] Clear objectives defined
- [ ] Target audiences documented
- [ ] Campaign structure planned
- [ ] Keywords researched (Google)
- [ ] Creative strategy outlined
- [ ] Budget allocated
- [ ] Tracking setup documented
- [ ] Ready for implementation

## Launch Checklist

### Pre-Launch
- [ ] Conversion tracking installed
- [ ] Test conversions working
- [ ] Billing set up
- [ ] Budgets confirmed
- [ ] Start/end dates set
- [ ] Negative keywords added

### Post-Launch (Week 1)
- [ ] Ads approved and running
- [ ] Conversions tracking correctly
- [ ] Search terms review (Google)
- [ ] Add negative keywords
- [ ] Check audience overlap (Meta)
- [ ] Daily budget pacing OK

## Optimization Cadence

| Timeframe | Actions |
|-----------|---------|
| Daily | Check spend, major issues |
| Weekly | Performance review, negative keywords, bid adjustments |
| Bi-weekly | Creative refresh, audience testing |
| Monthly | Strategy review, budget reallocation |
