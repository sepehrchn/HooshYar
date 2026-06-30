# Phase 4 — Content & CMS Integration

## CMS decision implemented

Phase 4 uses a git-based MDX content system instead of a hosted CMS.

Reason:

- No external CMS account or API keys are currently available.
- Phase 0 selected local structured content / MDX-ready architecture by default.
- The project can still migrate to Sanity or Contentful later because content loading is isolated in `lib/content.ts`.

## Content locations

```txt
content/
├── blog/
│   ├── en/*.mdx
│   └── fa/*.mdx
├── case-studies/
│   ├── en/*.mdx
│   └── fa/*.mdx
└── placeholders/
```

## Rendering pipeline

- Frontmatter parsing: `gray-matter`
- MDX rendering: `next-mdx-remote/rsc`
- Typed content helpers: `lib/content.ts`
- MDX display component: `components/content/mdx-content.tsx`

## Pages connected to MDX

- `/[locale]/work`
- `/[locale]/work/[slug]`
- `/[locale]/blog`
- `/[locale]/blog/[slug]`

## Placeholder status

The MDX files currently contain placeholder content because real launch content has not been provided yet.

To publish a real case study, provide:

- Matching EN/FA MDX files with the same slug
- Client/project title
- Summary
- Service category
- Challenge
- Solution
- Hoosh Yar role
- Visual assets/screenshots
- Metrics/results
- Approval status for public use

To publish a real blog post, provide:

- Matching EN/FA MDX files with the same slug
- Title
- Summary
- Date
- Tags
- Body content

## Future CMS migration

If a hosted CMS becomes preferred in a later pass, replace the filesystem reads in `lib/content.ts` with Sanity/Contentful queries while keeping the page/component contracts stable.
