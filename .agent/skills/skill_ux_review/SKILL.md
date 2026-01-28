---
name: UX Review
description: Review page structure, hierarchy, CTAs, and accessibility
---

# UX Review Skill

Analyze and improve user experience across the site.

## When to Use

- Before launch review
- After content is added
- Improving conversion rates
- Accessibility audit

## Inputs

1. **Site URL or Pages**: Pages to review
2. **Goals**: What users should do
3. **Target Audience**: From personas

## Process

### Step 1: Page-by-Page Review

For each key page, analyze:

#### Structure
- [ ] Clear visual hierarchy
- [ ] Logical content flow
- [ ] Proper use of whitespace
- [ ] Mobile-responsive layout

#### Headings
- [ ] Single H1
- [ ] Proper hierarchy (no skipped levels)
- [ ] Descriptive headings
- [ ] Scannable structure

#### CTAs
- [ ] Primary CTA above fold
- [ ] Clear action text
- [ ] Visible button styling
- [ ] Logical placement

#### Accessibility
- [ ] Color contrast passes
- [ ] Focus states visible
- [ ] Alt text on images
- [ ] Form labels present
- [ ] Keyboard navigable

### Step 2: Create Report

Output to `/_taia/ux/review-report.md`:

```markdown
# UX Review Report

**Date**: YYYY-MM-DD
**Pages Reviewed**: X

## Executive Summary
Brief overview of findings.

## Page Reviews

### [Page Name]
**URL**: /path/

#### ✅ What's Working
- Point 1
- Point 2

#### ⚠️ Issues Found
| Issue | Severity | Recommendation |
|-------|----------|----------------|
| [issue] | high/med/low | [fix] |

#### Recommendations
1. Specific action
2. Specific action

---

## Site-Wide Issues

### Navigation
- Issue and recommendation

### Mobile Experience
- Issue and recommendation

### Accessibility
- Issue and recommendation

## Priority Actions

### High Priority
1. [ ] Action 1
2. [ ] Action 2

### Medium Priority
1. [ ] Action 1
2. [ ] Action 2

### Nice to Have
1. [ ] Action 1
```

### Step 3: Generate Fix PR

If fixes are straightforward:

1. Create branch `fix/ux-improvements`
2. Implement high-priority fixes
3. Create PR with:
   - Summary of changes
   - Before/after if visual
   - Link to full review

## Outputs

1. `/_taia/ux/review-report.md` - Full analysis
2. PR with fixes (if applicable)

## Definition of Done

- [ ] All key pages reviewed
- [ ] Issues categorized by severity
- [ ] Accessibility checked
- [ ] Mobile experience reviewed
- [ ] Actionable recommendations provided
- [ ] Priority fixes implemented (if scope allows)

## Accessibility Checklist

Reference this for each page:

- [ ] All images have alt text
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Focus indicators visible
- [ ] Forms have labels
- [ ] Error messages are clear
- [ ] Skip link present
- [ ] Headings are semantic
- [ ] Link text is descriptive
- [ ] Touch targets ≥ 44px
- [ ] No auto-playing media
