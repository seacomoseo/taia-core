---
name: playwright-visual-checks
description: Run focused visual QA checks with Playwright screenshots for responsive, layout, interaction, and regression validation.
---

# Playwright Visual Checks

Use this skill to run targeted visual verification quickly and consistently, without building a full E2E suite.

## When to Use

- After UI/layout/styling changes.
- When a user reports responsive breakage (overflow, clipping, overlap, misalignment).
- Before finalizing frontend-heavy work.
- To produce visual evidence (before/after screenshots) for PRs or handoff.

## Inputs

1. Target URL(s): local, preview, or production.
2. Viewports/devices to validate (default matrix below if none provided).
3. Scope/focus area (full page, specific section, specific component).
4. Optional interaction flow (open menu, modal, carousel step, language switch, etc.).

## Tooling Constraints

- Allowed for visual capture/validation: Playwright CLI (`npx playwright ...`) with local Chromium.
- Forbidden for this skill: Antigravity-based visual capture flows.
- Do not silently switch tools; if Playwright is unavailable, report the blocker and required install step.

## Default Viewport Matrix

- Mobile: `390x844` (modern phone baseline)
- Tablet: `768x1024`
- Desktop: `1440x900`

If the issue is device-specific, add one exact viewport requested by the client/user.

## Process

### Step 1: Stabilize environment

1. Run local site if needed (`pnpm dev`) and verify URL loads.
2. Use deterministic URL and state (same language, same route, same data).
3. Prefer Chromium for baseline consistency unless browser-specific bug is suspected.

### Step 2: Capture baseline evidence

For each target viewport, capture:

1. Full-page screenshot.
2. Optional element-focused screenshot (problematic component).
3. If interaction is involved, capture states (before/open/after).

Example commands:

```bash
npx playwright screenshot --browser=chromium --viewport-size="390,844" --full-page "http://localhost:4321/componentes" "/tmp/visual/mobile-full.png"
npx playwright screenshot --browser=chromium --viewport-size="1440,900" --full-page "http://localhost:4321/componentes" "/tmp/visual/desktop-full.png"
```

### Step 3: Validate high-risk visual checks

Run at least these checks per viewport:

1. Horizontal overflow (`document.documentElement.scrollWidth > window.innerWidth`).
2. Component clipping/truncation (text, buttons, cards, controls).
3. Touch target viability on mobile (buttons not too small or overlapped).
4. Sticky/fixed elements not covering essential content.
5. Interactive controls are visually aligned and readable.

### Step 4: Validate interaction states (if applicable)

For components like menu, lightbox, carousel, dialogs, tabs:

1. Capture closed/default state.
2. Trigger interaction and capture open/active state.
3. Trigger secondary state (next/prev/error/empty where relevant).
4. Confirm no layout jump or viewport-width expansion after interaction.

### Step 5: Report findings with evidence

Produce concise findings linked to screenshots:

- Pass/Fail per viewport.
- Exact route.
- Exact issue location (component/section).
- Suggested fix with severity (`high`, `medium`, `low`).

## Good Practices

- Keep checks focused: validate what changed plus nearby impacted areas.
- Use the same viewport matrix across iterations for reliable comparison.
- Re-capture after each fix to avoid false positives.
- Avoid subjective language; describe observable behavior.
- When possible, include numeric evidence (viewport width, scrollWidth, element bounds).
- Do not block delivery on cosmetic nits unless requested or UX-critical.

## Anti-Patterns to Avoid

- Only checking desktop for mobile-reported bugs.
- Declaring "fixed" without new screenshots.
- Testing with stale cache/state and mixing old/new assets.
- Over-expanding scope into full QA when request is targeted.

## Output

1. Visual evidence files (recommended temporary path):
   - `/tmp/visual/<route>-<viewport>-<state>.png`
2. Optional persistent report when requested:
   - `/_context/qa/visual-check-YYYY-MM-DD.md`

Report template:

```markdown
# Visual Check Report

- Date: YYYY-MM-DD
- URL: ...
- Scope: ...

## Matrix
- 390x844: PASS/FAIL
- 768x1024: PASS/FAIL
- 1440x900: PASS/FAIL

## Findings
1. [severity] Issue summary
   - Evidence: /tmp/visual/...
   - Expected vs actual
   - Proposed fix
```

## Definition of Done

- [ ] Requested route(s) verified in at least mobile + desktop.
- [ ] Before/after evidence captured for affected interaction.
- [ ] Overflow/clipping/overlap checks completed.
- [ ] Findings documented with clear pass/fail status.
- [ ] If fixes were applied, verification screenshots confirm resolution.
