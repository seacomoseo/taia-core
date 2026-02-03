---
name: Skill Manager
description: Create, audit, and improve TAIA agent skills
---

# Skill Manager Skill

Create, audit, and continuously improve TAIA agent skills.

## When to Use

- Creating a new skill
- Auditing existing skills for quality
- Standardizing skill formats
- Improving skill effectiveness based on usage
- Onboarding new capabilities

## Process

### Step 1: Skill Creation

#### 1.1 Define Core Elements

Before writing, answer:
- **What problem does this skill solve?**
- **When should it be triggered?**
- **What inputs does it need?**
- **What outputs does it produce?**
- **How do we know it's done?**

#### 1.2 Use Standard Template

```markdown
---
name: [Skill Name]
description: [One-line description for quick identification]
---

# [Skill Name] Skill

[2-3 sentence overview of what this skill does.]

## When to Use

- Trigger scenario 1
- Trigger scenario 2
- Trigger scenario 3

## Inputs

1. **[Input 1]**: Description
2. **[Input 2]** (optional): Description

## Process

### Step 1: [Action Name]

[Detailed instructions with code blocks, examples, commands]

### Step 2: [Action Name]

[Continue with clear, actionable steps]

## Outputs

1. `[path/to/output1]` - Description
2. `[path/to/output2]` - Description

## Definition of Done

- [ ] Measurable criterion 1
- [ ] Measurable criterion 2
- [ ] Measurable criterion 3

## Troubleshooting

### [Common Issue 1]
Solution...

### [Common Issue 2]
Solution...
```

#### 1.3 Naming Conventions

- Folder: `skill_[name]` (lowercase, underscores)
- File: `SKILL.md` (always uppercase)
- Name in frontmatter: Title Case
- Description: Concise, action-oriented

### Step 2: Skill Audit

#### 2.1 Quality Checklist

For each skill, verify:

**Structure**
- [ ] Has proper YAML frontmatter (name, description)
- [ ] Has clear "When to Use" section
- [ ] Process has numbered, actionable steps
- [ ] Outputs are explicitly listed
- [ ] Has "Definition of Done" checklist

**Content Quality**
- [ ] Description matches actual functionality
- [ ] Steps are specific enough to follow
- [ ] Code examples are correct and tested
- [ ] Output paths use `/_context/` convention
- [ ] No placeholder content left in

**Triggers**
- [ ] "When to Use" covers common scenarios
- [ ] Description contains key trigger words
- [ ] No overlap/conflict with other skills

#### 2.2 Run Audit Command

```bash
# List all skills
ls -la core/.agent/skills/

# Check each SKILL.md exists
for dir in core/.agent/skills/skill_*/; do
  if [ -f "${dir}SKILL.md" ]; then
    echo "✅ ${dir}SKILL.md"
  else
    echo "❌ Missing: ${dir}SKILL.md"
  fi
done
```

### Step 3: Skill Improvement

#### 3.1 Identify Improvement Opportunities

After using a skill, note:
- What was unclear?
- What steps were missing?
- What could be automated?
- What examples would help?

#### 3.2 Update Process

1. Document the issue
2. Draft improvement
3. Test by running through skill manually
4. Update SKILL.md
5. Update description if scope changed

### Step 4: Skill Ecosystem Review

#### 4.1 Coverage Analysis

Verify skills cover the full project lifecycle:

| Phase | Skills | Gap? |
|-------|--------|------|
| Intake | Project Intake | ✅ |
| Strategy | SEO Strategy, Marketing Strategy | ✅ |
| Branding | Brand and Copy | ✅ |
| Development | CMS Schema, E-commerce MVP | ✅ |
| Quality | Performance Audit, UX Review | ✅ |
| Workflow | PR Workflow | ✅ |
| Meta | Skill Manager | ✅ |

#### 4.2 Dependency Mapping

Document which skills feed into others:

```
Project Intake
    ↓
Brand and Copy ← Competitive Analysis
    ↓
SEO Strategy ← Marketing Strategy
    ↓
CMS Schema Generator
    ↓
E-commerce MVP (if needed)
    ↓
UX Review + Performance Audit
    ↓
PR Workflow (for all changes)
```

## Outputs

1. New skill files in `core/.agent/skills/skill_[name]/SKILL.md`
2. Audit report in `/_context/skills/audit-YYYY-MM-DD.md`
3. Improvement PRs when updates needed

## Definition of Done

### For New Skills
- [ ] Follows standard template
- [ ] All sections complete
- [ ] Examples tested
- [ ] Description is clear and triggerable
- [ ] No overlap with existing skills

### For Audits
- [ ] All skills reviewed
- [ ] Issues documented
- [ ] Priority improvements identified
- [ ] High-priority fixes implemented

### For Improvements
- [ ] Issue clearly identified
- [ ] Fix tested manually
- [ ] SKILL.md updated
- [ ] Change committed via PR

## Skill Registry

Current TAIA skills:

| Skill | Purpose | Phase |
|-------|---------|-------|
| Project Intake | Gather requirements | Discovery |
| Brand and Copy | Create brand assets | Strategy |
| SEO Strategy | Plan SEO & content | Strategy |
| Marketing Strategy | Plan channels & campaigns | Strategy |
| Competitive Analysis | Analyze competitors | Strategy |
| Local SEO | Optimize for local search | Strategy |
| Paid Ads Strategy | Plan paid campaigns | Strategy |
| CMS Schema Generator | Set up content types | Development |
| i18n Content Model | Multilingual content and UI strings | Development |
| E-commerce MVP | Set up store | Development |
| UX Review | Review user experience | Quality |
| Performance Audit | Audit & optimize speed | Quality |
| PR Workflow | Standard PR process | Workflow |
| Skill Manager | Manage skills | Meta |
