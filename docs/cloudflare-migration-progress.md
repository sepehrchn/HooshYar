# Hoosh Yar — Cloudflare Migration Progress

**Target domain:** `https://hooshyar.sepehr.homes`  
**Adapter:** `@opennextjs/cloudflare` (OpenNext) — **not** `@cloudflare/next-on-pages`  
**Deploy target:** Cloudflare **Workers** (via Wrangler / Workers Builds)  
**Project start:** July 3, 2026  
**Last updated:** July 3, 2026 at 6:19 PM (UTC+4)  
**GitHub repo:** https://github.com/sepehrchn/HooshYar  
**Deploy path:** Option A — Git-connected Workers (auto-deploy on push)

---

## Overall progress: 3 / 13 steps complete (~23%)

```
Step  1  Install OpenNext + Wrangler          ████████████████████████████████ 100%  ✅ AI
Step  2  Local build compatibility           ████████████████████████████████ 100%  ⚠️ Mixed
Step  3  GitHub + secrets excluded           ████████████████████████████████ 100%  ✅ AI
Step  4  Create Cloudflare Worker (Git)      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  🔴 User
Step  5  Environment variables               ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  🔴 User
Step  6  First deploy (.workers.dev)         ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  🔴 User
Step  7  Smoke test on preview URL           ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  🔴 User
Step  8  Migrate Vercel KV → Cloudflare KV   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  ⚠️ Mixed
Step  9  Redeploy + verify KV                 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  🔴 User
Step 10  Point subdomain                      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  🔴 User
Step 11  Verify live domain                   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  🔴 User
Step 12  Production hardening                 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  ⚠️ Mixed
Step 13  Confirm auto-deploy pipeline         ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  🔴 User
```

**Legend:** ✅ Done by AI · 🔴 User action required · ⚠️ Mixed (AI + user)

---

## Architecture decision log

| Decision | Choice | Reason |
|----------|--------|--------|
| Adapter | `@opennextjs/cloudflare@1.20.1` | Project uses Next.js 16.2.10; `@cloudflare/next-on-pages` only supports ≤ 15.5.2 |
| Deploy surface | **Cloudflare Workers** | OpenNext’s recommended path; not classic Pages + static output dir |
| Middleware file | `middleware.ts` (not `proxy.ts`) | OpenNext 1.20.1 does not support Next.js 16 Node `proxy.ts`; Edge middleware still works |
| R2 incremental cache | Not configured yet | `migrate` could not auto-setup cache; optional for first deploy |

---

## Step 1 — Install OpenNext adapter and tooling

**Status:** ✅ Done by AI  
**Completed:** July 3, 2026

### What was done
- Installed `@opennextjs/cloudflare@1.20.1` (dependency)
- Installed `wrangler@4.107.0` (devDependency)
- Ran `npx opennextjs-cloudflare migrate` to scaffold config

### Packages added
```json
"dependencies": {
  "@opennextjs/cloudflare": "^1.20.1"
},
"devDependencies": {
  "wrangler": "^4.107.0"
}
```

### Scripts added (`package.json`)
| Script | Command |
|--------|---------|
| `preview` | `opennextjs-cloudflare build && opennextjs-cloudflare preview` |
| `deploy` | `opennextjs-cloudflare build && opennextjs-cloudflare deploy` |
| `upload` | `opennextjs-cloudflare build && opennextjs-cloudflare upload` |
| `cf-typegen` | `wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts` |

### Files created / updated by migrate
| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Worker name, entry point, assets, compatibility flags |
| `open-next.config.ts` | OpenNext Cloudflare adapter config |
| `.dev.vars` | Local dev: `NEXTJS_ENV=development` |
| `public/_headers` | Cache headers for `/_next/static/*` |
| `next.config.mjs` | Added `initOpenNextCloudflareForDev()` |
| `.gitignore` | Added `.open-next`, `.wrangler`, `.dev.vars*` |

### `wrangler.jsonc` summary
```jsonc
{
  "main": ".open-next/worker.js",
  "name": "hoosh-yar-web",
  "compatibility_date": "2026-07-03",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": { "directory": ".open-next/assets", "binding": "ASSETS" },
  "services": [{ "binding": "WORKER_SELF_REFERENCE", "service": "hoosh-yar-web" }],
  "images": { "binding": "IMAGES" }
}
```

### User action
None.

---

## Step 2 — Local build compatibility check

**Status:** ⚠️ Mixed — AI fixed one blocker; local preview verified  
**Completed:** July 3, 2026

### Build commands run
```bash
npx opennextjs-cloudflare build    # ✅ exit 0
npx opennextjs-cloudflare preview  # ✅ http://localhost:8787
```

### Local smoke test results
| Route | HTTP | Notes |
|-------|------|-------|
| `/` | 307 → `/fa` | Locale routing OK |
| `/en`, `/fa` | 200 | |
| `/admin/login` | 200 | |
| `/admin` | 307 → login | Auth middleware OK |
| `/api/auth/providers` | 200 | NextAuth OK |
| `/robots.txt` | 200 | |

### Incompatibilities found and resolution

| Issue | Severity | Resolution | Owner |
|-------|----------|------------|-------|
| `proxy.ts` (Next.js 16 Node middleware) | **Build blocker** | Renamed to `middleware.ts` | ✅ AI |
| `app/api/auth/[...nextauth]/route.ts` — bcrypt, `Buffer.from()` | None | Works via `nodejs_compat` | No change |
| `middleware.ts` — `getToken` (next-auth/jwt) | None | Edge middleware; verified | No change |
| `@vercel/kv` in `lib/kv/index.ts` | Deferred | Step 8 migration | Pending |
| `fs` / `path` in server code (`hero-section.tsx`, `lib/content.ts`, `api/chat/route.ts`) | None | OK with Node runtime + `nodejs_compat` | No change |
| `export const runtime = "edge"` anywhere | None | Not present | No change |
| MDX package copy warnings during bundle | Non-blocking | Build completed | Monitor |

### Non-blocking warnings (unchanged / cosmetic)
- `turbopack.root` vs `outputFileTracingRoot` mismatch
- `metadataBase` not set (OG images default to localhost)
- Next.js deprecation: prefer `proxy.ts` over `middleware.ts` (ignored until OpenNext supports `proxy.ts`)

### Code change applied
- `proxy.ts` → `middleware.ts` (rename only; same logic)

### User action
None (unless you want to revert to `proxy.ts` before OpenNext adds support — not recommended).

---

## Step 3 — Verify repo is pushed to GitHub, secrets excluded

**Status:** ✅ Done by AI  
**Completed:** July 3, 2026

### Checks performed
- [x] `.env.local` in `.gitignore` — confirmed
- [x] `.dev.vars` in `.gitignore` — confirmed (`git check-ignore`)
- [x] No `.env.local` or `.dev.vars` tracked in git
- [x] `.env.example` tracked — placeholders only, no real secrets
- [x] Migration files committed as one commit
- [x] Pushed to https://github.com/sepehrchn/HooshYar
- [x] Disk space healthy before push (~8.7 GB free)

### Commit
`chore: migrate to Cloudflare Workers via OpenNext`

### User must (Step 4 — next)
Connect Cloudflare Workers to **sepehrchn/HooshYar** (see Step 4 below). AI will not touch the dashboard until you confirm.

---

## Step 4 — Create Cloudflare Worker project (Git)

**Status:** 🔴 User action required  
**Not started**

### Important: Workers, not classic Pages

Do **not** create a Pages project with:
- Output directory: `.vercel/output/static`
- Build command: `npx @cloudflare/next-on-pages`

### Correct dashboard flow (Option A — chosen)
1. **Workers & Pages** → **Create** → **Worker** → **Connect to Git**
2. Select repo: **sepehrchn/HooshYar** — https://github.com/sepehrchn/HooshYar
3. **Build command:** `npx opennextjs-cloudflare build`
4. **Deploy command:** `npx opennextjs-cloudflare deploy` (enables auto-deploy on every push to production branch)
5. Do **not** click deploy / save until Step 5 env vars are ready (or expect auth/KV/chatbot to fail until vars are added)
6. Confirm disk space is healthy (~5 GB+ free) before triggering Step 6 build in dashboard

### Alternative (no Git yet)
```bash
npm run deploy
```

---

## Step 5 — Environment variables

**Status:** 🔴 User action required  
**Not started**

Add in Cloudflare dashboard → Worker → **Settings** → **Variables and Secrets** (names only — never commit values):

| Variable | Notes |
|----------|-------|
| `ADMIN_USERNAME` | Admin login |
| `ADMIN_PASSWORD_HASH` or `ADMIN_PASSWORD_HASH_BASE64` | App reads base64 variant if set (see auth route) |
| `NEXTAUTH_SECRET` | Session signing |
| `NEXTAUTH_URL` | Set to `https://hooshyar.sepehr.homes` for production |
| `GROQ_API_KEY` | Chatbot |
| `KV_REST_API_URL` | Temporary — Vercel KV until Step 8 |
| `KV_REST_API_TOKEN` | Temporary — Vercel KV until Step 8 |

After Step 8, replace KV REST vars with a **KV namespace binding** (see Step 8).

---

## Step 6 — First deploy to preview URL

**Status:** 🔴 User action required  
**Not started**

### Expected preview URL format
`https://hoosh-yar-web.<account>.workers.dev` (exact subdomain depends on worker name / account)

### User must
- Trigger build/deploy from dashboard or run `npm run deploy`
- If build fails, paste build log for diagnosis

---

## Step 7 — Full smoke test on preview URL

**Status:** 🔴 User action required  
**Not started**

### Manual test checklist
- [ ] Home scroll (all sections)
- [ ] Language switch (EN / FA)
- [ ] Contact form submission
- [ ] Admin login
- [ ] Admin dashboard loads

Report pass/fail per area; AI fixes code bugs only.

---

## Step 8 — Migrate storage: Vercel KV → Cloudflare KV

**Status:** ⚠️ Mixed — not started  
**Intent unchanged; mechanics updated for Workers bindings**

### AI will do
- Rewrite `lib/kv/index.ts` and any direct `@vercel/kv` usage to Cloudflare KV bindings (`env.KV.get()`, `env.KV.put()`, etc.)
- Add KV binding to `wrangler.jsonc`
- Remove dependency on `KV_REST_API_URL` / `KV_REST_API_TOKEN`

### User must do (dashboard)
1. **Workers & Pages** → **KV** → **Create namespace**
2. Worker → **Settings** → **Bindings** → add KV namespace
3. Binding variable name: **`KV`** (confirm with AI at implementation time)

### Files still using `@vercel/kv` (pre-migration)
- `lib/kv/index.ts`
- `lib/content/loader.ts`
- `app/api/admin/settings/route.ts`

---

## Step 9 — Redeploy and verify KV migration

**Status:** 🔴 User action required  
**Not started**

### User must test after redeploy
- [ ] `/admin/content` edit → saves and reflects on public site
- [ ] Leads logging (contact form)
- [ ] Chatbot session logging

---

## Step 10 — Point subdomain

**Status:** 🔴 User action required  
**Not started**

### User must
1. Worker → **Settings** → **Domains & Routes** → **Add** → `hooshyar.sepehr.homes`
2. Domain `sepehr.homes` is already on Cloudflare — DNS + SSL should auto-provision
3. SSL activation typically within minutes (up to ~24h in edge cases)

---

## Step 11 — Verify live domain

**Status:** 🔴 User action required  
**Not started**

### User must
- Visit `https://hooshyar.sepehr.homes`
- Confirm SSL padlock
- Re-run full site + admin tests on production URL

---

## Step 12 — Production hardening

**Status:** ⚠️ Mixed — not started

### AI will do
- Guide bcrypt hash generation for a real admin password (user runs hash locally — do not paste password in chat)

### User must
- [ ] Update `ADMIN_PASSWORD_HASH` in Cloudflare env vars
- [ ] Confirm `NEXTAUTH_URL` = `https://hooshyar.sepehr.homes`
- [ ] Verify `robots.txt` blocks `/admin` on live domain
- [ ] Test Demo Mode toggle live before client demos

---

## Step 13 — Confirm auto-deploy pipeline

**Status:** 🔴 User action required  
**Not started**

### User must
- Make a trivial commit + push
- Confirm Cloudflare auto-triggers a new deploy

---

## Operational notes

### Local development
```bash
npm run dev       # Next.js dev server (with OpenNext dev integration)
npm run preview   # Build + Wrangler local preview (Workers runtime)
npm run deploy    # Build + deploy to Cloudflare
```

### Disk space incident (July 3, 2026)
Machine hit **100% disk** during first `npm install` (`ENOSPC`). Resolved by clearing npm cache and removing `.next`. If builds fail with copy errors, free disk space before redeploying.

### Secrets policy
- Never commit `.env.local` or `.dev.vars` with real secrets
- Never paste production secrets into chat
- Enter secrets only in Cloudflare dashboard

### Out of scope for this migration
- Public-facing design / content changes
- Admin feature changes (except KV adapter rewrite in Step 8)

---

## Changelog

| Date | Step | Update |
|------|------|--------|
| 2026-07-03 | 1 | Installed OpenNext + Wrangler; ran `migrate`; scaffold complete |
| 2026-07-03 | 2 | Build passes; `proxy.ts` → `middleware.ts`; local preview smoke test OK |
| 2026-07-03 | — | Progress file created |
| 2026-07-03 | 3 | Committed + pushed to sepehrchn/HooshYar; secrets excluded |

---

## Next action

**Step 4 (user):** Connect Git-connected Worker in Cloudflare dashboard to **sepehrchn/HooshYar** — do not deploy yet. Confirm when done; then Step 5 env vars.
