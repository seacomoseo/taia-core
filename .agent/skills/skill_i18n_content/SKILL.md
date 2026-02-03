---
name: i18n Content Model
description: Set up multilingual content files and UI strings
---

# i18n Content Model Skill

Define and maintain multilingual content and translatable UI strings.

## When to Use

- Adding a new language
- Migrating content to language-suffixed files
- Creating or updating translatable UI strings

## Inputs

1. **Languages**: List of locales from `content/settings.yml`
2. **Collections**: List of collections and singles

## Process

### Step 1: Content Files

- Ensure every content file is suffixed with `.<lang>.md`
- Create `_index.<lang>.md` for each collection with `path` (no leading slash)
- Default language uses no URL prefix; others use `/<lang>/`

### Step 2: UI Strings

- Add `content/i18n/<lang>.yml` files
- Use consistent keys across languages
- Store nav paths and labels per language

### Step 3: Wiring

- Use `@core/utils/i18n` helpers in templates and components
- Pass `lang` down from the content router to templates and UI

## Outputs

1. `content/i18n/<lang>.yml` - UI strings per language
2. `content/<collection>/_index.<lang>.md` - Collection prefixes
3. `content/<collection>/*.{lang}.md` - Localized entries

## Definition of Done

- [ ] All collections have `_index.<lang>.md` files
- [ ] Content files include language suffixes
- [ ] UI strings exist for all languages
- [ ] Language-prefixed routes work for non-default locales
