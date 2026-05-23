# Filter Fresh Pools

$75 flat-rate pool filter cleaning, Temecula through San Diego County. SEO-first Next.js site with programmatic city pages and a Supabase-backed lead flow.

## Stack

- Next.js 14 (App Router, SSG + ISR) on Vercel
- Tailwind CSS + shadcn/ui primitives
- Supabase (Postgres) for leads, bookings, and city/ZIP data
- TypeScript end to end
- JSON-LD schema baked into every page type (`Organization`/`LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`)

## Project layout

```
app/
  layout.tsx              # root layout, Organization schema
  page.tsx                # homepage (hero, pricing, FAQ, area)
  [city]/page.tsx         # programmatic city pages (SSG)
  book/page.tsx           # standalone booking flow
  api/lead/route.ts       # POST /api/lead — validates + writes to Supabase
  sitemap.ts, robots.ts   # SEO endpoints
components/
  ui/                     # shadcn primitives (button, input, label, textarea, select)
  sections/               # hero, pricing, how-it-works, faq, service-area, lead-form, header, footer
lib/
  supabase.ts             # browser + server clients, Database types
  cities.ts               # loads JSON, lookups by slug/zip/tier
  schema.ts               # JSON-LD generators
  validation.ts           # Zod schema for /api/lead
  utils.ts                # cn, phone formatter, PRICE constant
content/
  cities/cities.json      # canonical city dataset (Tier 1 at launch)
  zips/zips.json          # ZIP -> city slug mapping
supabase/
  migrations/0001_init.sql
```

## Build sequence

1. **Install & run locally**
   ```bash
   pnpm install   # or npm/yarn
   cp .env.example .env.local
   # fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
   pnpm dev
   ```

2. **Provision Supabase**
   - Create a project at supabase.com.
   - Run `supabase/migrations/0001_init.sql` against it (Supabase Dashboard → SQL Editor, or `supabase db push` if you wire up the CLI).
   - Copy the project URL, anon key, and service role key into `.env.local` and Vercel.
   - Optional: seed `cities` from `content/cities/cities.json` if you want DB-backed lookups in addition to the static file.

3. **Seed city data** (single source of truth)
   - The canonical list lives in `content/cities/cities.json`. The static site reads from this file at build time, so adding/removing a city only requires editing the JSON and redeploying.
   - The `cities` table mirrors the same shape for future admin tooling / dynamic queries.

4. **Programmatic city pages**
   - `app/[city]/page.tsx` calls `generateStaticParams()` from `lib/cities.ts`, producing one statically rendered route per city in the JSON.
   - `dynamicParams = false` means unknown slugs 404 (no surprise pages indexed).
   - Each page emits `Service`, `BreadcrumbList`, and `FAQPage` JSON-LD.
   - To launch a new city: add an entry to `content/cities/cities.json`, add its ZIPs to `content/zips/zips.json`, redeploy.

5. **Lead capture**
   - `LeadForm` (client component) posts JSON to `/api/lead`.
   - The route validates with Zod, then writes to `public.leads` using the **service role** key (server-only). RLS on `leads`/`bookings` blocks all anonymous access.
   - Wire follow-up automation (SMS confirm, Slack ping, Calendar invite) by extending the route handler.

6. **Bookings**
   - Schema is in place (`public.bookings`, FK to `leads`, status enum, $75 default total). The booking UI is the next milestone — for v1 every lead is hand-confirmed and a booking row is created server-side.

7. **Deploy to Vercel**
   - Connect the repo. Add the three env vars from `.env.example`.
   - First deploy will SSG every city page + sitemap automatically.

## City tiers

- **Tier 1** (launch, 30 cities): the high-population / high-pool-density cities across south Riverside County (Temecula corridor) and all of San Diego County. **Note:** the original brief referenced "[paste Tier 1 list]" — no list was actually pasted, so `content/cities/cities.json` ships with a sensible default Tier 1 set. Edit that file to match the real list; nothing else needs to change.
- **Tier 2** (next 30): add entries with `"tier": 2`. They'll start appearing in the sitemap and the full service-area list automatically, with lower sitemap priority.

## Pricing

`PRICE` and `PRICE_DISPLAY` constants live in `lib/utils.ts`. The migration also defaults `bookings.total` to `75.00`. Change all three if pricing ever shifts.

## SEO checklist

- [x] `metadataBase` set on root layout
- [x] Per-page canonical URLs
- [x] Sitemap + robots
- [x] `LocalBusiness` schema (root)
- [x] `Service` + `BreadcrumbList` schema per city
- [x] `FAQPage` schema on home + every city
- [ ] Real OG images (placeholder for now)
- [ ] Google Business Profile + city-specific landing alignment

## Scripts

- `pnpm dev` — local dev
- `pnpm build` — production build (SSG runs here)
- `pnpm start` — serve production build
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — Next/ESLint
