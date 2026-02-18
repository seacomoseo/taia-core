---
name: legal-compliance-web
description: Ensure legal pages, consent UX, and data capture behavior are compliant for brochure and ecommerce websites.
---

# Legal Compliance Web

Use this skill to add a legal baseline into TAIA website delivery.

## When to Use

- New website setup before launch.
- Adding forms, analytics, cookies, or ecommerce.
- Expanding into regulated/localized markets.

## Inputs

1. Project country/region and target market.
2. Business model (brochure, lead-gen, ecommerce).
3. Data processing flows (forms, analytics, payment, CRM).

## Process

1. Determine mandatory legal pages by market and business model.
2. Create/update required pages in `content/singles/` or `content/pages/`.
3. Ensure forms collect consent where required and include purpose wording.
4. Gate non-essential tracking until consent where regulation requires it.
5. Verify cookie, privacy, legal notice, and returns/refunds pages are discoverable.

## Outputs

1. `/_context/legal/compliance-checklist.md`
2. `/_context/legal/data-processing-map.md`
3. Required legal page content entries in `content/`.
4. Consent/tracking behavior notes for implementation in `core`/project layouts.

## Definition of Done

- [ ] Mandatory legal pages exist and are linked from footer/header where appropriate.
- [ ] Form consent language and handling match data usage.
- [ ] Tracking behavior is documented for dev/prod and consent state.
- [ ] Ecommerce projects include returns/refund policy page.
