---
name: Competitive Analysis
description: Analyze competitors to identify strengths, weaknesses, and opportunities
---

# Competitive Analysis Skill

Analyze competitors to inform strategy and identify opportunities.

## When to Use

- Starting new project
- Entering new market
- Positioning or repositioning brand
- Planning marketing strategy
- Identifying content gaps
- Benchmarking performance

## Inputs

1. **Competitor URLs**: 3-5 main competitors
2. **Business Info**: From Project Intake
3. **Target Market**: Geography, audience

## Process

### Step 1: Identify Competitors

#### Direct Competitors
Same product/service, same market:
- Competitor 1: [URL]
- Competitor 2: [URL]
- Competitor 3: [URL]

#### Indirect Competitors
Different product, same need:
- Competitor 4: [URL]

#### Aspirational Competitors
Where you want to be:
- Competitor 5: [URL]

### Step 2: Website Analysis

For each competitor, analyze:

```markdown
# Competitor: [Name]
URL: [url]

## First Impressions
- Professional level: 1-10
- Clear value proposition: Yes/No
- Target audience evident: Yes/No
- Overall vibe: [describe]

## Homepage Analysis
- H1/Hero message:
- Primary CTA:
- Key benefits listed:
- Trust signals:

## Navigation/Structure
- Main menu items:
- Service/product pages:
- Blog/content hub:
- Contact accessibility:

## Content Quality
- Tone of voice:
- Content depth:
- Update frequency:
- Unique content types:

## Technical Observations
- Mobile responsive: Yes/No
- Page speed (perceived):
- Modern design: Yes/No
- Accessibility (basic):
```

### Step 3: SEO Analysis

Without paid tools, assess:

```markdown
# SEO Analysis: [Competitor]

## On-Page SEO
- Title tag:
- Meta description:
- H1 tag:
- URL structure:
- Internal linking:

## Content Strategy
- Blog posts (last 6 months):
- Topics covered:
- Content types (articles, guides, videos):
- Average content length:

## Local SEO (if applicable)
- Google Business Profile: Yes/No
- NAP consistency:
- Reviews count/rating:
- Local content:

## Estimated Authority
- Domain age (whois):
- Backlink indicators (mentions, press):
- Social proof (followers, engagement):
```

### Step 4: Social Media Analysis

```markdown
# Social Analysis: [Competitor]

## Platforms Present
| Platform | Profile | Followers | Active? |
|----------|---------|-----------|---------|
| Instagram | @handle | X | Yes/No |
| Facebook | /page | X | Yes/No |
| LinkedIn | /company | X | Yes/No |
| Twitter/X | @handle | X | Yes/No |
| YouTube | /channel | X | Yes/No |
| TikTok | @handle | X | Yes/No |

## Content Strategy
- Posting frequency:
- Content types:
- Engagement level:
- Community management:

## Paid Social
- Running ads: Yes/No
- Ad types observed:
- Messaging themes:
```

### Step 5: Pricing & Positioning

```markdown
# Pricing & Positioning: [Competitor]

## Pricing Structure
- Pricing visible: Yes/No
- Price range:
- Pricing model (hourly, project, subscription):
- Discounts/offers:

## Positioning
- Market position: Premium/Mid/Budget
- Key differentiators claimed:
- Target customer described as:
- Brand personality:

## Unique Selling Points
1. USP 1
2. USP 2
3. USP 3
```

### Step 6: SWOT Summary

Output to `/_context/competitive/competitor-[name].md` for each.

Then create `/_context/competitive/analysis-summary.md`:

```markdown
# Competitive Analysis Summary

**Date**: YYYY-MM-DD
**Industry**: [industry]
**Competitors Analyzed**: X

## Competitive Landscape

| Competitor | Position | Strength | Weakness |
|------------|----------|----------|----------|
| [Name 1] | Premium | Quality | Price |
| [Name 2] | Mid | Price | Service |
| [Name 3] | Budget | Accessibility | Quality |

## Key Findings

### Industry Standards
What all competitors do:
- Standard 1
- Standard 2
- Standard 3

### Differentiation Opportunities
What no one does well:
- Opportunity 1
- Opportunity 2
- Opportunity 3

### Threats
- Threat 1
- Threat 2

## Competitor Comparison Matrix

| Factor | Us | Comp 1 | Comp 2 | Comp 3 |
|--------|-----|--------|--------|--------|
| Price | | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Quality | | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Service | | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| Online Presence | | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Content | | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| Local SEO | | ⭐⭐ | ⭐ | ⭐⭐⭐ |

## Strategic Recommendations

### Position Against [Competitor 1]
- Highlight: [our advantage]
- Counter: [their strength]
- Message: [positioning statement]

### Content Gaps to Fill
1. Topic they don't cover: [topic]
2. Format they don't use: [format]
3. Audience they ignore: [segment]

### Quick Wins
1. [ ] Action 1 - Low effort, high impact
2. [ ] Action 2
3. [ ] Action 3

### Long-term Plays
1. [ ] Strategy 1
2. [ ] Strategy 2
```

## Outputs

1. `/_context/competitive/competitor-[name].md` - Individual analyses
2. `/_context/competitive/analysis-summary.md` - Consolidated findings

## Definition of Done

- [ ] 3-5 competitors identified
- [ ] Website analysis complete for each
- [ ] SEO analysis complete
- [ ] Social presence mapped
- [ ] Pricing/positioning understood
- [ ] Summary with actionable insights
- [ ] Opportunities and threats identified
- [ ] Recommendations prioritized

## Tools (Optional Enhancements)

If available, enhance with:
- **SEMrush/Ahrefs**: Keyword and backlink data
- **SimilarWeb**: Traffic estimates
- **Meta Ad Library**: Competitor ads
- **BuiltWith**: Technology stack
- **Wayback Machine**: Historical changes

## Quick Analysis Template

For rapid assessment:

```markdown
## [Competitor Name]
**URL**: 
**Position**: Premium / Mid / Budget
**Strength**: 
**Weakness**: 
**Opportunity for us**: 
```
