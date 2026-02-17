---
name: Brand Identity
description: Generate brand identity, manual, and logo proposals
---

# Brand Identity Skill

Define and document a comprehensive Brand Identity: Visual direction, Tone of Voice, Personas, Messaging Pillars, and Logo Proposals.

## When to Use

- After Project Intake and SWOT Analysis.
- When the client lacks a professional brand manual.
- When the client does NOT have a logo or wants a refresh.
- To ensure consistency across web, social, and ads.

## Inputs

1. **Brief Summary**: From `skill_project_intake`.
2. **SWOT Analysis**: From `skill_swot_analysis`.
3. **Raw Assets**: Existing logos or photos (if any).

## Process

### Step 1: Define Brand Core

Analyze the "why" and "how". Output to `/_context/brand/1-identity.md`:
- **Identity Essence**: The core "spirit".
- **Mission**: Practical goal.
- **Vision**: Long-term dream.
- **Values**: Ethical filters for decisions.

### Step 2: Visual & Strategic Direction

Define the visual foundations. Output to `/_context/brand/2-visual-direction.md`:
- **Color Palette Strategy**: HSL values and psychological reasoning.
- **Typography Direction**: Font types (Serif, Sans, etc.) and hierarchy rules.
- **Photography Style**: Keywords for image selection/generation.

### Step 3: Logo Generation (If missing)

If no logo exists in the `/_context/_init/`:
- **Prompt Engineering**: Create 3 distinct DALL-E/Imagen prompts based on the Identity Essence.
- **Execution**: Run `generate_image` for each prompt.
- **Output**: Save generated logos to `/_context/brand/logos/proposal-[1-3].png`.
- **Reasoning**: Document the concept behind each proposal in `/_context/brand/2-visual-direction.md`.

### Step 4: Tone of Voice & Copywriting

Output to `/_context/brand/3-copy-manual.md`:
- **Tone Profile**: (e.g., Professional yet witty).
- **Writing Rails**: Explicit "Do" and "Don't" list.
- **Vocabulary**: Words to use, words to avoid.
- **Micro-copy Examples**: Button text, error messages, success states.

### Step 5: Persona & Messaging

Output to `/_context/brand/4-personas-messaging.md`:
- **Buyer Personas**: At least 2 detailed profiles.
- **Messaging Pillars**: 3-4 key arguments.
- **Elevator Pitch**: The 30-second explanation.
- **Tagline Variations**: Short, catchy options.

## Outputs

1. `/_context/brand/1-identity.md` - Core brand philosophy.
2. `/_context/brand/2-visual-direction.md` - Colors, typography, and logo concepts.
3. `/_context/brand/logos/*.png` - Generated logo proposals (if applicable).
4. `/_context/brand/3-copy-manual.md` - Guidelines and rules for all text.
5. `/_context/brand/4-personas-messaging.md` - Target and value proposition.

## Definition of Done

- [ ] Brand manual is professional and coherent with raw context.
- [ ] At least 3 logo proposals generated (if missing in context).
- [ ] Tone of voice includes specific "Do's and Don'ts".
- [ ] Visual direction provides clear HSL colors.
- [ ] At least 2 distinct personas identified.
- [ ] Messaging pillars directly address the SWOT "Opportunities".

