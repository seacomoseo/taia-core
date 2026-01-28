---
name: PR Workflow
description: Standard PR creation with quality gates and checklists
---

# PR Workflow Skill

Create and manage Pull Requests following TAIA standards.

## When to Use

- Any code change
- Content updates
- Configuration changes
- Always before merging to main

## Process

### Step 1: Create Branch

```bash
# Format: type/short-description
git checkout -b feat/add-blog-section
git checkout -b fix/checkout-error
git checkout -b docs/update-readme
```

### Step 2: Make Changes

Follow relevant rules from `.agent/rules/`.

### Step 3: Run Quality Gates

```bash
# Must all pass before creating PR
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm taia:validate  # if content changed
pnpm taia:links     # if links changed
```

### Step 4: Commit Changes

```bash
# Format: type(scope): description
git add .
git commit -m "feat(blog): add article listing page"
```

Commit types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructure
- `test` - Tests
- `chore` - Maintenance

### Step 5: Push and Create PR

```bash
git push -u origin feat/add-blog-section
```

Create PR with this template:

```markdown
## Summary

Brief description of what this PR does and why.

## Changes

- [ ] Change 1
- [ ] Change 2
- [ ] Change 3

## Testing

### Automated
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds

### Manual Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested keyboard navigation

## Checklists

### SEO (if content changed)
- [ ] Titles unique and <60 chars
- [ ] Descriptions <160 chars
- [ ] Images have alt text
- [ ] Internal links valid

### Performance (if assets added)
- [ ] Images optimized (WebP)
- [ ] Images have dimensions
- [ ] No new render-blocking resources
- [ ] Lighthouse score maintained

### Accessibility
- [ ] Focus states visible
- [ ] Color contrast OK
- [ ] Labels on form inputs

## Screenshots/Recording

<!-- Add if UI changed -->

## Related Issues

Closes #X
```

### Step 6: Address Review Feedback

If changes requested:
1. Make changes
2. Commit with descriptive message
3. Re-run quality gates
4. Push

### Step 7: Merge

Once approved and all checks pass:
1. Squash and merge
2. Delete feature branch
3. Verify deploy succeeds
4. Smoke test production

## Quick PR Commands

```bash
# Create branch and push
git checkout -b feat/feature-name
# ... make changes ...
git add .
git commit -m "feat(scope): description"
git push -u origin feat/feature-name

# After feedback
git add .
git commit -m "fix: address review feedback"
git push
```

## CI Configuration

GitHub Actions workflow (`.github/workflows/ci.yml`):

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

## Definition of Done

- [ ] Branch created from main
- [ ] Changes committed with proper format
- [ ] All quality gates pass locally
- [ ] PR created with full description
- [ ] Checklists completed
- [ ] CI passes
- [ ] Review approved (if required)
- [ ] Merged via squash
- [ ] Branch deleted
- [ ] Deploy verified
