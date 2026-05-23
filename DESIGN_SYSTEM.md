# Filter Fresh — Brand Identity & Design System

> **Clean filter. Clearer water. Healthier pool.** $75 flat pool filter cleaning across Temecula and San Diego County.

This document is the source of truth for how Filter Fresh looks, reads, and feels. It pairs with `tailwind.config.ts` and `app/globals.css` — every token here is wired to a CSS variable so designers and engineers stay in sync.

> **Brand update.** The identity originally shipped with a fresh-green primary and a citrus accent, positioned closer to a service-trade vibe than a pool brand. The customer-supplied logo took the brand in a different direction: a circular badge featuring a sand-filter illustration, the wordmark "Filter Fresh Pools," a deep navy "Filter," a bright-blue gradient "Fresh," a navy script "Pools," and the tagline "CLEAN FILTER. CLEARER WATER. HEALTHIER POOL." The color system in this document and in code has been rebuilt to match.

---

## 1. Logo

The customer logo is the canonical mark. It contains a sand-filter illustration inside a double blue ring, the wordmark "Filter Fresh Pools," and the tagline. Use it as a single locked artwork — do not separate the mark from the wordmark or recolor it.

### 1.1 Files

- **Production PNG.** Save to `public/logo.png`. Used by the header, footer, and any inline brand placement. Recommended export is a 512x512 transparent PNG.
- **Favicon.** Save the same artwork to `public/icon.png` at 512x512. The Next.js App Router auto-detects favicons from `app/icon.png` first, then falls back to `public/icon.png`.
- **Open Graph image.** Save a 1200x630 version at `app/opengraph-image.png` for social-share cards.
- **Fallback placeholder.** `public/logo.svg` ships in the repo as a marine-navy "FF" monogram. Code uses the helper `LOGO_SRC` from `lib/brand.ts`, which prefers `/logo.png` and falls back to `/logo.svg` so the layout never shows a broken image.

### 1.2 Sizing in the UI

| Context | Pixel size | Notes |
| --- | --- | --- |
| Header | 44x44 | Sticky bar, paired with optional "Filter Fresh" text on `sm+` widths |
| Footer | 36x36 | Paired with "Filter Fresh" text |
| Hero / marketing | 80x80 to 120x120 | Use only when the page is brand-centric |

### 1.3 Clear space and don'ts

- Clear space on every side equal to the height of the lowercase "i" in "Filter."
- Do not place on busy photographic backgrounds without a white or marine-navy plate behind the badge.
- Do not stretch, rotate, or recolor the logo.
- Do not extract the sand-filter illustration from the badge for use as a standalone icon.

---

## 2. Color system

The palette is pulled directly from the logo: a deep marine navy from the "Filter" wordmark, a bright splash blue from the "Fresh" gradient and water mark, and a cool gray neutral ladder.

### 2.1 Brand

| Token | Hex | RGB | HSL | Use |
|---|---|---|---|---|
| `marine-500` (primary) | `#1A3D8F` | `26, 61, 143` | `219 70% 33%` | Buttons, links, primary surfaces, the "Filter" wordmark |
| `marine-600` | `#143075` | `20, 48, 117` | `220 71% 27%` | Hover and active primary |
| `marine-700` | `#10245C` | `16, 36, 92` | `220 70% 21%` | Deep accents, headings on dark backgrounds |
| `marine-100` | `#C7D6EB` | `199, 214, 235` | `213 49% 85%` | Tinted badges, soft surfaces |
| `splash-400` (accent) | `#2E8FE5` | `46, 143, 229` | `208 78% 54%` | Focus rings, "Fresh" wordmark, secondary CTAs |
| `splash-500` | `#1A78D6` | `26, 120, 214` | `210 79% 47%` | Hover and active accent |
| `splash-100` | `#C5E1F7` | `197, 225, 247` | `207 79% 87%` | Light splash backgrounds, info banners |

### 2.2 Neutrals — Ink

Cool gray-blue scale that sits naturally with marine and splash.

| Token | Hex | HSL |
|---|---|---|
| `ink-50`  | `#F4F7FB` | `213 45% 97%` |
| `ink-100` | `#E6ECF3` | `213 33% 93%` |
| `ink-200` | `#CBD5E1` | `213 27% 84%` |
| `ink-300` | `#94A3B8` | `215 20% 65%` |
| `ink-400` | `#64748B` | `215 19% 47%` |
| `ink-500` | `#475569` | `215 19% 35%` |
| `ink-600` | `#334155` | `215 25% 27%` |
| `ink-700` | `#1E293B` | `215 28% 17%` |
| `ink-800` | `#0F172A` | `222 47% 11%` |
| `ink-900` | `#0B1220` | `222 50% 9%` |
| `ink-950` | `#060A14` | `222 56% 6%` |

### 2.3 Semantic

| Token | Hex | HSL | Use |
|---|---|---|---|
| `success` | `#1F9A5A` | `147 65% 35%` | Booking confirmed, lead saved |
| `warning` | `#F59E0B` | `38 92% 50%` | "Booked through Thursday" |
| `destructive` | `#DC2626` | `0 70% 50%` | Errors, cancellations |

### 2.4 Tailwind config snippet

The full config lives in [`tailwind.config.ts`](./tailwind.config.ts). Key portion:

```ts
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary:     { DEFAULT: "hsl(var(--primary))",     foreground: "hsl(var(--primary-foreground))" },
  accent:      { DEFAULT: "hsl(var(--accent))",      foreground: "hsl(var(--accent-foreground))" },

  marine:  { 100: "#C7D6EB", 500: "#1A3D8F", 600: "#143075", 700: "#10245C", 900: "#06112E" },
  splash:  { 100: "#C5E1F7", 400: "#2E8FE5", 500: "#1A78D6", 700: "#114F94" },
  ink:     { 50: "#F4F7FB", 100: "#E6ECF3", 500: "#475569", 700: "#1E293B", 900: "#0B1220", 950: "#060A14" },
},
```

CSS variables in `app/globals.css`:

```css
--primary: 219 70% 33%;   /* marine-500 */
--accent: 208 78% 54%;    /* splash-400 */
--background: 210 30% 98%;
--foreground: 224 50% 10%;
--ring: 208 78% 54%;
```

---

## 3. Typography

Unchanged from the original system. Two families, no third.

| Role | Family | Why |
|---|---|---|
| **Display** | **Space Grotesk** (500 / 600 / 700) | Geometric grotesque with a friendly, mechanical character. Confident at hero, sturdy at small caps. |
| **Body** | **Inter** (400 / 500 / 600) | Neutral, optimized for screen, holds up at 14 to 15px on mobile. |

The scale, line-height, and tracking tokens in `tailwind.config.ts → fontSize` are unchanged. Mobile body never goes below 15px.

---

## 4. Component tokens

All UI primitives in `components/ui/*` resolve to the semantic tokens above, so the brand pivot rolls through without touching components.

### 4.1 Buttons

| Variant | Background | Text | Use |
|---|---|---|---|
| `default` (primary) | `bg-primary` (marine-500) | white | Primary CTAs (Book my filter clean) |
| `accent` | `bg-accent` (splash-400) | white | Secondary CTAs or callouts |
| `outline` | transparent | `text-foreground` | Tertiary actions |
| `ghost` | transparent | `text-foreground` | In-card buttons |
| `destructive` | `bg-destructive` | white | Cancel actions |

Sizes (height, padding, radius) unchanged from the original system.

### 4.2 Cards

- `bg-card` (#FFFFFF), `text-card-foreground`, `border-border` (ink-200), `rounded-lg`, `shadow-sm`.
- **Pricing card / Final CTA card:** use `shadow-pop`, which is a 6px marine-500 bottom shadow. It mirrors the stamped look of the logo's outer ring.

### 4.3 Form inputs

- 40px height, `border-input`, `bg-background`, 15px font.
- Focus state: `ring-2 ring-ring ring-offset-2` (splash-400 focus ring against the white background).
- Error state: `border-destructive`, helper text in `text-destructive`.

### 4.4 Badges

| Style | Background | Text | Use |
|---|---|---|---|
| **Service-area tag** | `bg-card` | `text-ink-700` | City chips in footer, neighborhood lists |
| **Tier tag** | `bg-marine-100` | `text-marine-700` | "Tier 1," "Same-week service" |
| **Price stamp** (`.ff-stamp`) | `bg-marine-950` | `text-background` | "$75 FLAT" callout above hero, in-card pricing emphasis |
| **Warning** | `bg-warning/15` | `text-warning` | "Booked through Thursday" |
| **Success** | `bg-success/15` | `text-success` | "Confirmed" booking status |

---

## 5. Voice and tone

Unchanged from the original system: confident, plain-spoken, faintly dry. Lead with the number. No water poetry beyond what is on the logo tagline. No em dashes, no emojis.

### 5.1 Example headlines

1. **"$75. One filter. One price. No upsells."**
2. **"Pool filter cleaning, $75 flat. By people who only clean pool filters."**
3. **"Clean filter. Clearer water. Healthier pool."**
4. **"Half the price. Twice the focus."**
5. **"We only clean filters. So we clean them better."**

### 5.2 Example body copy

1. *"We disassemble your filter, deep-clean every pleat, and put it back. You get before-and-after photos. Most jobs take under an hour."*
2. *"Cartridge, DE, or sand — flat $75. No trip charge. No upsell. No surprises on the invoice."*
3. *"Specialists, not generalists. One service means we are faster, and faster means we can charge less without cutting corners."*
4. *"We serve from Temecula through every corner of San Diego County. If it has a filter, we will clean it."*
5. *"Book online and you will get a text back within an hour. Most jobs scheduled within the same week."*

---

## 6. Implementation map

| Concern | File |
|---|---|
| Color tokens (CSS variables) | `app/globals.css` |
| Tailwind theme, brand scales, fonts | `tailwind.config.ts` |
| Logo source resolution (PNG with SVG fallback) | `lib/brand.ts` |
| Header + footer logo placement | `components/sections/site-header.tsx`, `components/sections/site-footer.tsx` |
| Production logo (drop here) | `public/logo.png` |
| Favicon (drop here) | `public/icon.png` or `app/icon.png` |
| Open Graph image (drop here) | `app/opengraph-image.png` |
| Component primitives | `components/ui/*` |
| Branded sections (Hero, Pricing, FAQ, etc.) | `components/sections/*`, `app/page.tsx`, `app/pricing/page.tsx` |
