---
name: Delivery Presenter
description: Generate a premium "Final Presentation" summarizing strategy and execution
---

# Delivery Presenter Skill

Aggregate all strategic and technical work into a high-impact presentation for the client.

## When to Use

- When the website is ready for final review.
- To demonstrate the "worth" of the investment.
- To provide a clear roadmap for the client's marketing future.

## Inputs

1. **Context Summary**: From `skill_project_intake`.
2. **SWOT Analysis**: From `skill_swot_analysis`.
3. **Brand Identity**: From `skill_brand_identity`.
4. **Marketing Strategy**: From `skill_marketing_strategy`.
5. **SEO & Performance Reports**: From `skill_seo_strategy` and `skill_performance_audit`.

## Process

### Step 1: Synthesize the Journey

Create a narrative that shows:
- **Where they were**: (Raw context, identified gaps).
- **Where they are now**: (New brand, high-performance site).
- **Where they will go**: (Marketing roadmap, growth).

### Step 2: Generate the Presentation

Output to `/_context/delivery/presentation.md`:

```markdown
# [Project Name] - Strategic Delivery

## 01. The Foundation
> "We turned raw ideas into a professional engine."
- Summary of the transformation.
- Highlight: Gaps filled.

## 02. Strategic Edge (SWOT)
- Primary Strength identified.
- The "Gap" we are closing in the market.
- **USP**: Our North Star.

## 03. Brand Soul
- Voice and Personality.
- Visual Direction (Palette & Typography).
- Who we are talking to (Personas).

## 04. Tactical Growth (Marketing)
- Selected Channels (Why).
- Budget Allocation.
- Timeline of wins.

## 05. Technical Excellence
- **Lighthouse Scores**: 100/100/100/100.
- Mobile experience.
- Automated SEO rails.

## 06. The Future
- Next steps for month 1.
- Long-term vision.
```

### Step 3: "Wow" Visualizations

Include:
- Screenshots of the lighthouse scores.
- Mockups of the new identity.
- Table comparison showing Before vs After (Strategic level).

## Outputs

1. `/_context/delivery/presentation.md` - The strategic summary.
2. `/_context/delivery/delivery-package.zip` (manual instruction) - Zip of all `/_context/` documents for the client.

## Definition of Done

- [ ] Presentation follows a high-impact narrative.
- [ ] All strategic documents are correctly referenced.
- [ ] Technical scores are highlighted.
- [ ] Future roadmap is included.
- [ ] The tone is professional and "premium".
