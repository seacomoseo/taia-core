---
name: SEO Strategy
description: Keyword research, URL architecture, and content planning
---

# SEO Strategy Skill

Create comprehensive SEO strategy and content plan.

## When to Use

- Starting new site
- Planning content strategy
- Restructuring existing site
- Improving organic traffic

## Inputs

1. **Brand/Business Info**: From intake and brand skills
2. **Target Market**: Geography, language
3. **Competitors** (optional): Competitor URLs

## Process

### Step 1: Keyword Research

Without external tools, use heuristic approach:

1. List services/products
2. Identify user intent variations:
   - Informational: "how to X", "what is X"
   - Commercial: "best X", "X vs Y"
   - Transactional: "buy X", "X price"
3. Add location modifiers if local
4. Consider long-tail variations

Output to `/_taia/seo/keywords.md`:

```markdown
# Keyword Research

## Primary Keywords
| Keyword | Intent | Priority |
|---------|--------|----------|
| [keyword] | transactional | high |
| [keyword] | informational | medium |

## Long-tail Keywords
| Keyword | Intent | Target Page |
|---------|--------|-------------|
| [keyword] | informational | /blog/topic |

## Question Keywords
- How to [topic]?
- What is [topic]?
- Why [topic]?
```

### Step 2: URL Architecture

Design logical site structure:

Output to `/_taia/seo/site-structure.md`:

```markdown
# Site Structure

## URL Hierarchy

/                     # Home
├── /servicios/       # Services hub
│   ├── /servicios/servicio-1/
│   └── /servicios/servicio-2/
├── /productos/       # Products hub
│   ├── /productos/categoria-1/
│   │   └── /productos/categoria-1/producto-a/
│   └── /productos/categoria-2/
├── /blog/            # Blog hub
│   └── /blog/post-slug/
├── /sobre-nosotros/  # About
└── /contacto/        # Contact

## URL Rules
- All lowercase
- Hyphens for word separation
- No trailing numbers
- Max 3 levels deep
- Descriptive and keyword-rich
```

### Step 3: Content Plan

Output to `/_taia/seo/content-plan.md`:

```markdown
# Content Plan

## Pages Priority

### Immediate (Pre-launch)
| Page | Target Keyword | Template |
|------|---------------|----------|
| Home | [main keyword] | landing |
| Services | [services] | page |
| About | [brand] | page |
| Contact | [contact] | page |

### Phase 2 (Month 1-2)
| Page | Target Keyword | Type |
|------|---------------|------|
| Blog post 1 | [keyword] | post |
| Blog post 2 | [keyword] | post |

### Ongoing
- Weekly: 1 blog post
- Monthly: Review/update existing content

## Content Briefs

### [Page Name]
- **Target Keyword**: 
- **Word Count**: 
- **H1**: 
- **H2s**:
  - Section 1
  - Section 2
- **CTA**:
```

### Step 4: Internal Linking Strategy

Output to `/_taia/seo/internal-linking.md`:

```markdown
# Internal Linking Strategy

## Hub Pages
Pages that link to related content:
- /servicios/ → all service pages
- /blog/ → all posts
- /productos/ → category and product pages

## Contextual Links
- Blog posts link to relevant services
- Product pages link to related products
- Service pages link to case studies

## Link Equity Flow
Home → Hub Pages → Individual Pages

## Anchor Text Guidelines
- Use descriptive text
- Vary anchor text naturally
- Include keywords when appropriate
```

## Outputs

1. `/_taia/seo/keywords.md`
2. `/_taia/seo/site-structure.md`
3. `/_taia/seo/content-plan.md`
4. `/_taia/seo/internal-linking.md`

## Definition of Done

- [ ] Primary keywords identified
- [ ] URL structure defined
- [ ] All pages mapped to keywords
- [ ] Content calendar drafted
- [ ] Internal linking strategy documented
- [ ] Structure reviewed for SEO best practices
