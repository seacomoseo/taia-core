---
name: Brand and Copy
description: Generate brand brief, tone of voice, personas, and messaging
---

# Brand and Copy Skill

Create foundational brand and copywriting assets.

## When to Use

- New project without brand guidelines
- Refreshing existing brand
- Need consistent messaging across site

## Inputs

1. **Project Brief**: Business info from intake
2. **Competitors** (optional): List of competitor sites
3. **Existing Brand** (optional): Any current brand assets

## Process

### Step 1: Research

Analyze:
- Business model and value proposition
- Target audience characteristics
- Competitor positioning
- Industry trends

### Step 2: Create Brand Brief

Output to `/_taia/brand/brand-brief.md`:

```markdown
# Brand Brief

## Brand Essence
One sentence that captures the brand.

## Mission
Why the business exists.

## Vision
Where the business is going.

## Values
- Value 1: Description
- Value 2: Description
- Value 3: Description

## Brand Personality
Describe as if the brand were a person.

## Differentiators
What makes this brand unique.
```

### Step 3: Define Tone of Voice

Output to `/_taia/brand/tone-of-voice.md`:

```markdown
# Tone of Voice

## Core Attributes
- **Attribute 1** (not opposite): Description
- **Attribute 2** (not opposite): Description
- **Attribute 3** (not opposite): Description

## Writing Guidelines

### Do
- Write in active voice
- Use "you" and "your"
- Keep sentences short

### Don't
- Use jargon
- Be overly formal
- Make vague claims

## Examples

### Headlines
- ✅ "Get your project done faster"
- ❌ "We offer expedited project solutions"

### Body Copy
- ✅ "You'll save 10 hours every week."
- ❌ "Our solution provides time savings benefits."
```

### Step 4: Create Buyer Personas

Output to `/_taia/brand/personas.md`:

```markdown
# Buyer Personas

## Primary Persona: [Name]

**Demographics**
- Age: 
- Location:
- Role:
- Income:

**Goals**
- Goal 1
- Goal 2

**Pain Points**
- Pain 1
- Pain 2

**How We Help**
- Solution 1
- Solution 2

**Preferred Channels**
- Channel 1
- Channel 2

---

## Secondary Persona: [Name]
(Repeat structure)
```

### Step 5: Define Messaging Pillars

Output to `/_taia/brand/messaging.md`:

```markdown
# Messaging Pillars

## Pillar 1: [Name]
**Key Message**: One sentence.
**Supporting Points**:
- Point A
- Point B
- Point C
**Proof Points**: Evidence, stats, testimonials.

## Pillar 2: [Name]
(Repeat structure)

## Pillar 3: [Name]
(Repeat structure)

---

## Elevator Pitch
30-second summary of what the business does.

## Tagline Options
- Option 1
- Option 2
- Option 3
```

## Outputs

1. `/_taia/brand/brand-brief.md`
2. `/_taia/brand/tone-of-voice.md`
3. `/_taia/brand/personas.md`
4. `/_taia/brand/messaging.md`

## Definition of Done

- [ ] Brand brief complete
- [ ] Tone of voice defined with examples
- [ ] At least 2 personas created
- [ ] 3 messaging pillars defined
- [ ] Elevator pitch written
- [ ] All aligned with project goals
