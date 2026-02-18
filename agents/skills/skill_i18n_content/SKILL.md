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

1. **Languages**: List of locales from `content/config.yml`
2. **Collections**: List of collections and singles

## Process

### Step 1: Content Files

- Ensure every content file is suffixed with `.<lang>.md`
- Create `_index.<lang>.md` for each collection with `path` (no leading slash)
- Default language uses no URL prefix; others use `/<lang>/`

### Step 2: UI Strings

- Add `content/globals/<lang>.yml` files
- Use consistent keys across languages
- Store nav paths and labels per language

### Step 3: Wiring

- Use `@core/utils/i18n` helpers in layouts and components
- Pass `lang` down from the content router to layouts and UI

## Outputs

1. `content/globals/<lang>.yml` - UI strings per language
2. Use `cmsGlobals` exports in `*.astro` to describe lists/objects for CMS
3. Use `cmsFields` exports in layouts to add CMS fields tied to layout logic
4. `cmsGlobals`/`cmsFields` labels/hints are defined inline with `{ es, en }` objects (not in globals)
5. Core CMS label/hint translations live in `core/src/cms/i18n/<lang>.yml` using field-name keys
6. Lists should set `label_singular` (translated) when defined inline
7. Fields default to `required: false` unless explicitly set `true`
8. `content/<collection>/_index.<lang>.md` - Collection prefixes
9. `content/<collection>/*.{lang}.md` - Localized entries

## Definition of Done

- [ ] All collections have `_index.<lang>.md` files
- [ ] Content files include language suffixes
- [ ] UI strings exist for all languages
- [ ] Language-prefixed routes work for non-default locales
