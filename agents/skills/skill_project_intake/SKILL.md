---
name: Project Intake
description: Gather client requirements through structured questions and checklist
---

# Project Intake Skill

Generate and manage project requirements gathering, including context ingestion and cleanup.

## When to Use

- Starting a new project.
- Client provides raw materials in `/_context/init/` or `/_context/_init/`.
- Need to identify and fill gaps in project requirements.

## Inputs

1. **Client Brief**: Any existing information about the project.
2. **Initial Context**: A directory `/_context/init/` (preferred) or `/_context/_init/` containing raw files, notes, or branding.
3. **Project Type**: website, e-commerce, blog, landing page.

## Process

### Step 1: Raw Context Ingestion

If `/_context/init/` or `/_context/_init/` exists, analyze every file to build a comprehensive base:
- **Scan** the available init directory.
- **Read** text files, notes, and extract information from structured documents.
- **Identify** gaps: What is here? What is missing? (Branding? SWOT? USP?).
- **Summarize** findings in `/_context/intake/raw-context-summary.md`.

### Step 2: Cleanup & Reorganization

Once the information has been ingested and summarized:
- **Move** useful assets (like logos or confirmed photos) to their respective folders (e.g., `/_context/brand/logos/`).
- **Archive or Delete** redundant, temporary or excessively heavy files from the init directory that do not contribute to the final project.
- **Goal**: Leave the project structure clean and focused on action items.

### Step 3: Analyze Information Gaps

Compare the raw context with the requirements for a high-performance, agency-grade site.
- Is there a clear USP?
- Is there an audience profile?
- Are there SEO keywords?
- Is there a visual style?

### Step 4: Generate Targeted Questions

Create questions in `/_context/intake/questions.md`:

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

Create `/_context/intake/assets-needed.md`:

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

1. `/_context/intake/raw-context-summary.md` - Analysis of provided materials.
2. `/_context/intake/questions.md` - Prioritized questions.
3. `/_context/intake/assets-needed.md` - Asset checklist.
4. `/_context/intake/brief-summary.md` - Consolidated project brief.

## Definition of Done

- [ ] All files in `/_context/init/` or `/_context/_init/` processed.
- [ ] Initialization folder cleaned or reorganized as appropriate.
- [ ] Information gaps clearly identified.
- [ ] Critical questions prioritized for client.
- [ ] Asset checklist reflects missing raw materials.
- [ ] Brief summary provides a solid foundation for Strategy skills.
