# Implementation Stack

Canonical website stack for TAIA projects:

- Astro
- Sveltia CMS
- Tailwind CSS (v4 via `@tailwindcss/vite`)

## Tailwind Setup

1. Install dependencies:

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

2. Register the Vite plugin in Astro config.

3. Import Tailwind once from a global stylesheet:

```css
@import 'tailwindcss';
```

4. Ensure the stylesheet is imported by the root layout.

## Implementation Rules

- Prefer Tailwind utility classes for layouts/components.
- Keep custom CSS for cases where utilities are insufficient.
- Keep CMS-editable website work inside:
  - `content/`
  - `layouts/`
  - `components/`
  - `uploads/`
