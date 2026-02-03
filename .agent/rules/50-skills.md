# Skills Usage Rules

## Overview

Skills are specialized guides for complex tasks. Located in `.agent/skills/`.

## When to Use Skills

| Trigger | Skill |
|---------|-------|
| New project, gathering requirements | `skill_project_intake` |
| Analyzing competitors | `skill_competitive_analysis` |
| Strategic DAFO/SWOT analysis | `skill_swot_analysis` |
| Creating Brand Identity Manual | `skill_brand_identity` |
| Planning marketing channels | `skill_marketing_strategy` |
| Keyword research, content planning | `skill_seo_strategy` |
| Google Business Profile setup | `skill_local_seo` |
| Google/Meta Ads planning | `skill_paid_ads_strategy` |
| Setting up CMS | `skill_cms_schema_generator` |
| Building e-commerce | `skill_ecommerce_mvp` |
| Reviewing user experience | `skill_ux_review` |
| Auditing performance | `skill_performance_audit` |
| Final project delivery presentation | `skill_delivery_presenter` |
| Making code changes | `skill_pr_workflow` |
| Creating/improving skills | `skill_skill_manager` |

## Skill Flow

### New Project Flow
```
1. Project Intake (Context Ingestion from /_context/_init/)
   ↓
   Cleanup & Reorganization of /_init/
   ↓
2. Competitive Analysis
   ↓
3. SWOT Analysis (DAFO)
   ↓
4. Brand Identity Manual + Logo proposals
   ↓
5. Marketing Strategy
   ├── SEO Strategy
   ├── Local SEO (if local business)
   └── Paid Ads Strategy (if budget)
   ↓
6. CMS Schema Generator / Development
   ↓
7. UX Review + Performance Audit
   ↓
8. Delivery Presenter (The "Wow" moment in /_context/delivery/)
   ↓
9. PR Workflow (Final merge)
```

### Ongoing Maintenance
```
Content changes → PR Workflow
Performance issues → Performance Audit
UX issues → UX Review
New skills needed → Skill Manager
```

## Output Directory

All strategic documents and client assets live in `/_context/`:

```
/_context/
├── _init/           # Raw client context (Ingestion ONLY. Cleaned after processing)
├── intake/          # Project Intake (Requirements, Brief)
├── competitive/     # Competitive Analysis
├── strategy/        # SWOT, Positioning, Main Goals
├── brand/           # Brand Identity (Manual, Tone, Visuals, Logos)
├── marketing/       # Marketing Strategy (Channels, Budget)
├── seo/             # SEO Strategy
├── local-seo/       # Local SEO
├── ads/             # Paid Ads Strategy
├── perf/            # Performance Audit
├── ux/              # UX Review
├── delivery/        # Final Presentation
└── skills/          # Skill Manager audits
```

## Skill Structure

Every skill has:
1. **When to Use** - Clear triggers
2. **Inputs** - What's needed to start
3. **Process** - Step-by-step instructions
4. **Outputs** - Expected deliverables
5. **Definition of Done** - Completion checklist

## Rules

1. **Read skill first** - Always read SKILL.md before executing
2. **Follow steps in order** - Skills are designed as workflows
3. **Complete DoD** - All Definition of Done items must pass
4. **Document outputs** - Save to `/_context/` directory
5. **Reference in PRs** - Link to skill outputs in PR descriptions

## Creating New Skills

Use `skill_skill_manager` to:
1. Create new skills following template
2. Audit existing skills
3. Improve skills based on usage

## Skill Quality Standards

Skills must have:
- [ ] Clear, specific description (for discoverability)
- [ ] Comprehensive "When to Use" triggers
- [ ] Actionable process steps
- [ ] Well-defined outputs with paths
- [ ] Measurable Definition of Done
- [ ] No overlap with other skills
