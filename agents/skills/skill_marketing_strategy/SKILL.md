---
name: Marketing Strategy
description: Create comprehensive marketing plan with channels, budget, and KPIs
---

# Marketing Strategy Skill

Create a comprehensive marketing strategy that orchestrates all visibility efforts.

## When to Use

- Starting new project (after intake)
- Client needs visibility/growth plan
- Defining marketing channels and budget
- Creating integrated marketing approach
- Setting marketing KPIs and goals

## Inputs

1. **Project Intake**: Business info, goals, audience
2. **Brand Brief**: From Brand and Copy skill
3. **Budget Range**: Monthly/annual marketing budget
4. **Timeline**: Launch date and milestones

## Process

### Step 1: Marketing Audit

Assess current state:

```markdown
# Current Marketing State

## Existing Channels
- [ ] Website: [status]
- [ ] Google Business Profile: [status]
- [ ] Social Media: [platforms, followers]
- [ ] Email List: [size]
- [ ] Paid Ads: [platforms, spend]

## Current Results
- Monthly website visits:
- Conversion rate:
- Customer acquisition cost:
- Top traffic sources:

## Competitor Activity
- Where are competitors visible?
- What channels are they winning?
- What gaps exist?
```

### Step 2: Define Marketing Objectives

Use SMART framework. Output to `/_context/marketing/objectives.md`:

```markdown
# Marketing Objectives

## Primary Goal
[What is the main business outcome? e.g., Generate 50 qualified leads/month]

## SMART Objectives

### Objective 1: [Name]
- **Specific**: What exactly?
- **Measurable**: How tracked?
- **Achievable**: Why realistic?
- **Relevant**: How supports business?
- **Time-bound**: By when?

### Objective 2: [Name]
[Repeat structure]

## Key Performance Indicators (KPIs)

| KPI | Current | Target | Timeline |
|-----|---------|--------|----------|
| Website traffic | X | Y | 6 months |
| Conversion rate | X% | Y% | 3 months |
| Lead generation | X/month | Y/month | 6 months |
| Customer acquisition cost | €X | €Y | 12 months |
| Email subscribers | X | Y | 6 months |
```

### Step 3: Channel Strategy

Output to `/_context/marketing/channel-strategy.md`:

```markdown
# Channel Strategy

## Channel Selection Matrix

| Channel | Fit | Cost | Effort | Priority |
|---------|-----|------|--------|----------|
| SEO | high/med/low | €/month | hours/week | 1-5 |
| Local SEO | | | | |
| Google Ads | | | | |
| Meta Ads | | | | |
| Email Marketing | | | | |
| Social Organic | | | | |
| Content Marketing | | | | |
| Referrals | | | | |

## Selected Channels

### Primary Channels
1. **[Channel]**: [Why prioritized]
   - Budget: €X/month
   - Expected ROI: X
   - Owner: [who manages]

### Secondary Channels
1. **[Channel]**: [Why secondary]

### Future Channels (Phase 2)
1. **[Channel]**: [Why deferred]

## Channel Integration

How channels work together:
- SEO drives awareness → Email captures leads → Nurture → Convert
- Paid Ads test messaging → Winners inform organic content
- Social builds community → Email monetizes
```

### Step 4: Budget Allocation

Output to `/_context/marketing/budget.md`:

```markdown
# Marketing Budget

## Total Budget
- Monthly: €X
- Annual: €X

## Allocation by Channel

| Channel | Monthly € | % of Budget | Notes |
|---------|-----------|-------------|-------|
| Paid Ads (Google) | | | |
| Paid Ads (Meta) | | | |
| Content Creation | | | |
| Email Platform | | | |
| Tools/Software | | | |
| Freelancers | | | |
| **Total** | | 100% | |

## Budget by Quarter

| Quarter | Focus | Budget |
|---------|-------|--------|
| Q1 | Foundation building | €X |
| Q2 | Growth acceleration | €X |
| Q3 | Optimization | €X |
| Q4 | Scale winners | €X |

## ROI Expectations

| Channel | Investment | Expected Return | Timeframe |
|---------|------------|-----------------|-----------|
| SEO | €X | €X | 6-12 months |
| Paid Ads | €X | €X | Immediate |
| Email | €X | €X | 3-6 months |
```

### Step 5: Marketing Calendar

Output to `/_context/marketing/calendar.md`:

```markdown
# Marketing Calendar

## Monthly Recurring

| Week | Activity | Channel | Owner |
|------|----------|---------|-------|
| 1 | Blog post | SEO | |
| 1 | Newsletter | Email | |
| 2 | Blog post | SEO | |
| 2 | Social recap | Social | |
| 3 | Blog post | SEO | |
| 3 | Campaign review | Ads | |
| 4 | Blog post | SEO | |
| 4 | Monthly report | All | |

## Key Dates

| Date | Event | Campaign | Channels |
|------|-------|----------|----------|
| [date] | Product launch | Launch campaign | All |
| [date] | Holiday | Seasonal promo | Ads, Email |
| [date] | Industry event | PR push | Social, Email |

## Campaign Schedule

### Campaign: [Name]
- **Dates**: Start - End
- **Goal**: 
- **Channels**:
- **Budget**:
- **Assets needed**:
```

### Step 6: Measurement Framework

Output to `/_context/marketing/measurement.md`:

```markdown
# Measurement Framework

## Tracking Setup

### Required Tools
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Google Tag Manager
- [ ] Meta Pixel (if using Meta Ads)
- [ ] Email platform analytics

### Conversion Tracking
- [ ] Contact form submissions
- [ ] Phone clicks
- [ ] WhatsApp clicks
- [ ] Email clicks
- [ ] Purchases (if e-commerce)

## Reporting Cadence

| Report | Frequency | Metrics | Owner |
|--------|-----------|---------|-------|
| Dashboard check | Daily | Spend, leads | |
| Channel review | Weekly | Performance by channel | |
| Strategy review | Monthly | KPIs vs targets | |
| Deep dive | Quarterly | Full analysis | |

## Report Template

### Weekly Marketing Report

**Week of**: YYYY-MM-DD

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Website sessions | | | % |
| Leads generated | | | % |
| Cost per lead | €X | €X | % |
| Ad spend | €X | €X | % |

**Wins**:
- 

**Challenges**:
- 

**Next Week Focus**:
- 
```

## Outputs

1. `/_context/marketing/objectives.md` - SMART goals and KPIs
2. `/_context/marketing/channel-strategy.md` - Channel selection and integration
3. `/_context/marketing/budget.md` - Budget allocation
4. `/_context/marketing/calendar.md` - Marketing calendar
5. `/_context/marketing/measurement.md` - Tracking and reporting

## Definition of Done

- [ ] Current state audited
- [ ] SMART objectives defined
- [ ] Channels selected and prioritized
- [ ] Budget allocated by channel
- [ ] Calendar created
- [ ] Measurement framework in place
- [ ] All aligned with business goals
- [ ] Client/stakeholder approved

## Related Skills

This skill orchestrates:
- **SEO Strategy** → Organic search channel
- **Local SEO** → Local visibility
- **Paid Ads Strategy** → Paid channels
- **Content Marketing** → Content channel
- **Competitive Analysis** → Informs all channels

## Quick Start

For a new project:
1. Complete Project Intake first
2. Run Competitive Analysis
3. Create Marketing Strategy
4. Branch into specific channel skills as needed
