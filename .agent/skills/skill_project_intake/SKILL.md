---
name: Project Intake
description: Gather client requirements through structured questions and checklist
---

# Project Intake Skill

Generate and manage project requirements gathering.

## When to Use

- Starting a new project
- Client provides incomplete brief
- Need to identify gaps in requirements

## Inputs

1. **Client Brief** (optional): Any existing information about the project
2. **Project Type**: website, e-commerce, blog, landing page

## Process

### Step 1: Analyze Existing Information

Review any provided brief and identify:
- What information is complete
- What information is missing
- What needs clarification

### Step 2: Generate Questions

Create questions in `/_taia/intake/questions.md`:

```markdown
# Project Intake Questions

## Business
- [ ] What is your business name?
- [ ] What industry/sector are you in?
- [ ] What is your unique value proposition?
- [ ] Who are your main competitors?

## Target Audience
- [ ] Who is your primary customer?
- [ ] What problems do you solve for them?
- [ ] What age range, location, interests?

## Goals
- [ ] What are the main goals for this site?
- [ ] What actions should visitors take?
- [ ] How will you measure success?

## Content
- [ ] Do you have existing content?
- [ ] Do you have brand guidelines?
- [ ] Do you have photos/videos?
- [ ] Who will write content going forward?

## Technical
- [ ] Do you have a domain?
- [ ] Do you have existing hosting?
- [ ] Do you need e-commerce?
- [ ] Do you need a CMS?

## Timeline & Budget
- [ ] When do you need to launch?
- [ ] What is your budget range?
- [ ] Are there any hard deadlines?
```

### Step 3: Create Asset Checklist

Create `/_taia/intake/assets-needed.md`:

```markdown
# Assets Needed

## Brand
- [ ] Logo (SVG preferred)
- [ ] Brand colors (hex codes)
- [ ] Typography/fonts
- [ ] Brand guidelines PDF

## Images
- [ ] Team photos
- [ ] Product photos
- [ ] Office/location photos
- [ ] Stock photo preferences

## Content
- [ ] About company text
- [ ] Service descriptions
- [ ] Product information
- [ ] Testimonials
- [ ] Case studies

## Technical
- [ ] Domain access
- [ ] Existing analytics
- [ ] Social media accounts
- [ ] Email marketing tool
```

## Outputs

1. `/_taia/intake/questions.md` - Prioritized questions
2. `/_taia/intake/assets-needed.md` - Asset checklist
3. `/_taia/intake/brief-summary.md` - Summary of known info

## Definition of Done

- [ ] All critical questions identified
- [ ] Questions organized by priority
- [ ] Asset checklist complete
- [ ] Summary of current knowledge written
- [ ] Next steps defined
