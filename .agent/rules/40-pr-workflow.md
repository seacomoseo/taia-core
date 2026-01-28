# PR Workflow Rules

## Branch Naming

Format: `type/short-description`

Examples:
- `feat/add-blog-section`
- `fix/checkout-error`
- `docs/update-readme`

## PR Title

Format: `type(scope): description`

Same as commit message format.

## PR Description Template

```markdown
## Summary
Brief description of changes.

## Changes
- List of changes made

## Testing
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds
- [ ] Manual testing completed

## SEO Checklist
- [ ] Titles unique and under 60 chars
- [ ] Descriptions under 160 chars
- [ ] Images have alt text

## Performance
- [ ] No new render-blocking resources
- [ ] Images optimized
- [ ] Lighthouse score maintained

## Accessibility
- [ ] Keyboard navigable
- [ ] Focus states visible
- [ ] Color contrast OK
```

## Merge Requirements

1. All CI checks pass
2. At least one approval (if team)
3. No merge conflicts
4. Squash and merge

## Post-Merge

1. Delete feature branch
2. Verify deploy succeeded
3. Smoke test production
