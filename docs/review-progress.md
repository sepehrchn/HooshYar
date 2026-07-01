# Hoosh Yar — Review Progress

> Track page-by-page review and completion status.

---

## Pages Checklist

### 1. Home (Landing) ✅ COMPLETE

- [x] Hero section with video frame placeholder
- [x] 4 moto cards with animated gradient border (cyan → violet → magenta)
- [x] Scroll-snap sections for all page previews
- [x] Trust/stats bar with animated counters
- [x] Services overview section
- [x] Featured work grid (case study placeholders)
- [x] Process timeline teaser
- [x] Pricing preview cards
- [x] Contact form section
- [x] Footer
- [x] Responsive layout (mobile/tablet/desktop)
- [x] RTL support for Farsi
- [x] Reduced motion support
- [x] Accessibility basics (skip link, focus states)

**Notes:**
- Animated gradient border on moto cards completed (4s loop, 2px stroke)
- Hero video placeholder ready for real asset

---

### 2. About ✅ COMPLETE

- [x] Hero statement with gradient text
- [x] Origin story section (two-column layout)
- [x] Three differentiator cards with animated gradient borders
- [x] Four principle cards (flat glass tiles)
- [x] Stats bar with animated counters
- [x] Final CTA section
- [x] Responsive layout (mobile/tablet/desktop)
- [x] RTL support for Farsi
- [x] Reduced motion support
- [x] Scroll reveal animations

**Status:** Complete

**Notes:**
- Reused moto-card-animated-border animation for differentiator cards
- All sections use existing design tokens and glass-morphism style
- Secondary CTA links to /services as specified

---

### 3. Services ✅ COMPLETE

- [x] Page hero section
- [x] Service cards (AI, Automation, Web Dev)
- [x] Service detail sections
- [x] Responsive layout
- [x] RTL support
- [x] Reduced motion support

**Status:** Complete

---

### 4. Work / Portfolio ✅ COMPLETE

- [x] Embedded portfolio section with id="portfolio" anchor
- [x] Section header matching Services/About style (gradient title, bold headline, muted subhead)
- [x] 6-card grid layout (3 cols row 1, 3 cols row 2)
- [x] Uniform card structure with image slideshow
- [x] Real project images loaded from /public/works/[project-slug]/
- [x] All images optimized (600px, 70% quality, 18-57KB per image)
- [x] Auto-advancing slideshow for multi-image projects (3s interval)
- [x] Static display for single-image projects (no controls)
- [x] Manual navigation (arrows and dots) for multi-image projects
- [x] Category tags with accent colors (cyan/violet/magenta)
- [x] Project titles and descriptions
- [x] Tech tag chips
- [x] Demo buttons (when applicable)
- [x] Staggered fade-up entrance animation (100ms delay between cards)
- [x] Animated gradient borders matching service cards
- [x] Responsive layout (mobile/tablet/desktop)
- [x] RTL support for Farsi
- [x] Reduced motion support

**Status:** Complete

**Notes:**
- All 6 projects included: Telegram Bot, Ariana B2B, Armco, AI Outreach, Portfolio OS, FORMA Studio
- Real images loaded and optimized (total ~530KB, down from 25MB+)
- Portfolio OS has no demo link
- Ariana B2B demo: https://arianasepehr.vercel.app
- FORMA Studio demo: https://adart-alpha.vercel.app
- Section header uses GradientText component matching About section
- All images verified and displaying correctly

---

### 5. Process

- [ ] Page hero section
- [ ] Timeline/reveal animation
- [ ] Step-by-step process cards
- [ ] Responsive layout
- [ ] RTL support
- [ ] Reduced motion support

**Status:** Pending review

---

### 6. Pricing

- [ ] Page hero section
- [ ] Pricing tier cards (custom quote model)
- [ ] CTA section
- [ ] Responsive layout
- [ ] RTL support
- [ ] Reduced motion support

**Status:** Pending review

---

### 7. Contact

- [ ] Page hero section
- [ ] Contact form with validation
- [ ] API endpoint ready
- [ ] Before-you-send guidance card
- [ ] Responsive layout
- [ ] RTL support
- [ ] Reduced motion support

**Status:** Pending review

---

### 8. Blog (Optional)

- [ ] Blog listing page
- [ ] Individual blog post template (MDX-powered)
- [ ] Responsive layout
- [ ] RTL support

**Status:** Placeholder only — pending content

---

## Global Components

- [x] Navigation (sticky, glass effect, language switch)
- [x] Footer
- [x] Custom cursor glow
- [x] Neural background
- [x] Smooth scroll provider (Lenis)
- [x] Skip link (accessibility)

---

## Assets Pending

| Asset | Status | Location |
|-------|--------|----------|
| Logo | Missing | Expected: `assets/incoming/hoosh-yar-logo-source.svg` |
| Hero video | Placeholder | Expected: `public/media/hero-video.mp4` |
| Case studies | Placeholder | `content/case-studies/{en,fa}/*.mdx` |
| Real copy (EN/FA) | Placeholder | `content/placeholders/site-content.json` |

---

## Deployment Checklist

- [ ] Connect repo to Vercel
- [ ] Configure custom domain + SSL
- [ ] Set environment variables:
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_TO_EMAIL`
  - [ ] `CONTACT_FROM_EMAIL` (optional)
- [ ] Set up analytics
- [ ] Final production smoke test

---

## Review History

| Date | Page | Changes |
|------|------|---------|
| 2026-07-01 | Portfolio | Refinement: Fixed header styling (gradient text), added 6th project (FORMA), updated Ariana demo link, loaded real images from /public/works/ |
| 2026-07-01 | Portfolio | Complete build: embedded section with 5 project cards, image slideshows, animated borders, responsive grid |
| 2026-07-01 | About | Complete rebuild: hero statement, origin story, differentiators, principles, stats, CTA |
| 2026-07-01 | Services | Fixed خدمات gradient (RTL direction), centered final CTA text |
| 2026-07-01 | Services | Marked complete after review |
| 2026-06-30 | Home | Added animated gradient border to moto cards |
| 2026-06-30 | Home | Marked complete after review |

---

*Last updated: 2026-07-01*
