---
name: Performance Audit
description: Audit site performance and implement optimizations
---

# Performance Audit Skill

Analyze and optimize site performance for Core Web Vitals.

## When to Use

- Before launch
- Performance degradation detected
- Adding new features
- Periodic audits

## Inputs

1. **Site URL**: Production or preview URL
2. **Budget Targets**: (defaults in PERFORMANCE_RAILS.md)

## Process

### Step 1: Run Lighthouse

```bash
pnpm taia:lighthouse https://site-url.com
```

Record results in `/_taia/perf/audit-YYYY-MM-DD.md`.

### Step 2: Analyze Results

Check each metric against targets:

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Performance | ≥90 | ? | ✅/❌ |
| Accessibility | 100 | ? | ✅/❌ |
| Best Practices | 100 | ? | ✅/❌ |
| SEO | 100 | ? | ✅/❌ |
| LCP | ≤2500ms | ? | ✅/❌ |
| CLS | ≤0.1 | ? | ✅/❌ |
| TBT | ≤200ms | ? | ✅/❌ |

### Step 3: Identify Issues

Common issues checklist:

#### Images
- [ ] Missing width/height
- [ ] Not using WebP
- [ ] Not lazy-loaded
- [ ] Too large (>200KB hero, >100KB content)
- [ ] Missing srcset

#### Fonts
- [ ] Missing font-display
- [ ] Too many font files
- [ ] Not preloaded
- [ ] Large font files

#### JavaScript
- [ ] Render-blocking scripts
- [ ] Large bundle size
- [ ] Unused JavaScript
- [ ] Third-party bloat

#### CSS
- [ ] Render-blocking CSS
- [ ] Large CSS files
- [ ] Unused CSS
- [ ] @import usage

### Step 4: Create Report

Output to `/_taia/perf/audit-YYYY-MM-DD.md`:

```markdown
# Performance Audit Report

**Date**: YYYY-MM-DD
**URL**: https://site.com
**Tool**: Lighthouse v11.x

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Performance | X | ≥90 | ✅/❌ |
| ...

## Core Web Vitals

| Vital | Value | Target | Status |
|-------|-------|--------|--------|
| LCP | Xms | ≤2500ms | ✅/❌ |
| CLS | X | ≤0.1 | ✅/❌ |
| TBT | Xms | ≤200ms | ✅/❌ |

## Issues Found

### High Priority
1. **[Issue]**: Description and impact
   - **Fix**: Specific solution
   - **Estimated Impact**: +X points

### Medium Priority
1. **[Issue]**: Description
   - **Fix**: Solution

### Low Priority
1. **[Issue]**: Description

## Resource Breakdown

| Type | Count | Size | Notes |
|------|-------|------|-------|
| Images | X | XKB | |
| JavaScript | X | XKB | |
| CSS | X | XKB | |
| Fonts | X | XKB | |
| **Total** | | XKB | Target <1MB |

## Recommendations

1. [ ] High-priority fix 1
2. [ ] High-priority fix 2
3. [ ] Medium-priority fix 1
```

### Step 5: Implement Fixes

For automated fixes:

1. Create branch `perf/optimization-YYYY-MM-DD`
2. Apply fixes in order of impact
3. Re-run Lighthouse after each fix
4. Create PR with:
   - Before/after scores
   - Changes made
   - Link to full report

## Commands

```bash
# Run Lighthouse locally
pnpm taia:lighthouse http://localhost:4321

# Run on production
pnpm taia:lighthouse https://production-url.com

# Run with specific settings
npx lighthouse https://url --only-categories=performance
```

## Outputs

1. `/_taia/perf/audit-YYYY-MM-DD.md` - Full report
2. PR with optimizations (if applicable)

## Definition of Done

- [ ] Lighthouse audit completed
- [ ] All metrics recorded
- [ ] Issues categorized by priority
- [ ] Fixes implemented for high-priority
- [ ] Re-audit shows improvement
- [ ] All targets met (or justification provided)

## Quick Wins

Common fixes with high impact:

1. **Add image dimensions** - Fixes CLS
2. **Convert to WebP** - Reduces image size 30-50%
3. **Lazy load images** - Improves initial load
4. **Preload hero image** - Improves LCP
5. **font-display: swap** - Fixes text visibility
6. **Defer third-party scripts** - Reduces TBT
