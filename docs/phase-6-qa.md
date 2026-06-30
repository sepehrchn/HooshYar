# Phase 6 — Pre-Launch QA

## Scope from README

- Cross-browser testing
- RTL layout QA for all Farsi pages
- Form submission testing
- SEO basics: meta tags, OG images, sitemap.xml, robots.txt
- Lighthouse performance/accessibility audit

## Implemented in this phase

- Localized metadata baseline in `app/[locale]/layout.tsx`
- Dynamic `sitemap.xml` in `app/sitemap.ts`
- `robots.txt` in `app/robots.ts`
- Generated Open Graph image in `app/opengraph-image.tsx`
- Extracted contact validation into `lib/contact-validation.ts`
- Contact API now reuses shared validation logic
- Added this QA checklist/report

## Manual QA checklist before deployment

### Browser/device matrix

- Chrome latest — desktop
- Safari latest — desktop
- Firefox latest — desktop
- iOS Safari — mobile
- Android Chrome — mobile

### Core route smoke test

Test both `/en` and `/fa`:

- `/`
- `/about`
- `/services`
- `/work`
- `/work/placeholder-ai-operations`
- `/process`
- `/pricing`
- `/contact`
- `/blog`
- `/blog/ai-workflows-coming-soon`

### RTL QA

For every `/fa` route:

- `html dir="rtl"` is present
- Navigation order feels natural
- Text alignment is readable
- Cards do not overflow on mobile
- Form fields and select are usable
- CTA hover/focus states remain visible

### Form QA

- Submit empty form: should show validation errors / block submission
- Submit invalid email: API returns validation error
- Submit valid demo payload without env vars: API returns placeholder success
- Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optional `CONTACT_FROM_EMAIL`
- Submit valid payload again: email should arrive at configured inbox

### SEO QA

- `/robots.txt` loads
- `/sitemap.xml` loads
- `/opengraph-image` loads
- View source/head on `/en` and `/fa` includes localized title, description, OG, and Twitter metadata
- `/sitemap.xml` includes localized alternates for route discovery
- Social preview should use generated OG image until real OG art is provided

### Lighthouse QA target

Run against production or local preview:

- Performance: aim 90+
- Accessibility: aim 95+
- Best Practices: aim 95+
- SEO: aim 95+

Known factors that can affect score until later phases:

- Hero video is still placeholder; real video must be compressed and poster-backed
- Logo/OG art are generated placeholders
- Content is placeholder and may affect SEO quality until finalized

## Commands used for automated validation

```sh
npm run lint
npm run typecheck
npm run build
```

## Automated smoke test results

A bounded local production server smoke test was run after `npm run build`.

Passed:

- `GET /en` → `200 text/html`
- `GET /fa` → `200 text/html`
- `GET /robots.txt` → `200 text/plain`
- `GET /sitemap.xml` → `200 application/xml`
- `GET /opengraph-image` → `200 image/png`
- `POST /api/contact` with valid demo payload and no email env vars → `200 placeholder success`
- `POST /api/contact` with invalid email → `422 validation error`

## Browser automation status

`agent-browser` is not installed in this environment (`agent-browser: command not found`), so automated cross-browser interaction testing could not be run here. Manual browser QA remains required using the checklist above.

## Environment variables for launch QA

```txt
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
CONTACT_FROM_EMAIL=...
```
