# Filter Fresh — Brand Identity & Design System

> **The clean filter experts.** We do one thing better and cheaper than anyone else. $75 flat, half the price of the full-service guys.

This document is the source of truth for how Filter Fresh looks, reads, and feels. It pairs with `tailwind.config.ts` and `app/globals.css` — every token here is wired to a CSS variable so designers and engineers stay in sync.

---

## 1. Logo direction

**Tone:** service-trade, not spa. Closer to Jiffy Lube than a Hilton pool deck.

### 1.1 Wordmark (primary)

- **Setting:** "Filter Fresh" in **Space Grotesk SemiBold (600)**, set tight: `letter-spacing: -0.025em`.
- **Case:** Title case in product UI. **ALL CAPS** in monogram lockups and stamped marks (`letter-spacing: 0.08em`).
- **Color:** ink-950 on light, fresh-500 on dark; never use a gradient.
- **Clear space:** at least the height of the lowercase "i" on every side.

### 1.2 Symbol (optional)

A **square stamp containing the monogram `FF`**, treated like a tradesperson's certification stamp:

```
┌────────┐
│  FF    │  ← Space Grotesk 700, ALL CAPS, ink-950 on fresh-500
│  ░░░░  │  ← 3-line "pleat" accent, hairline thickness
└────────┘
```

The three short horizontal hairlines under the FF read as **filter pleats** without being literal. The mark is square (1:1), 8px corner radius, may be reproduced as ink-950 stamp on white when single-color reproduction is required.

### 1.3 Things we don't do

- ❌ Water droplets, swimmer silhouettes, palm trees, pool kidney shapes
- ❌ Generic blue gradients (Bondi → Pool Cyan)
- ❌ Script or "luxury" serifs
- ❌ Inflated logos with steam, sparkle, or "shine" effects

---

## 2. Color system

Brand sits on two anchors: **Fresh** (clean, alive, confidently not pool-blue) and **Citrus** (the service-trade orange that signals "fair price, fast work"). Neutrals warm-leaning so we never look corporate-cold.

### 2.1 Brand

| Token | Hex | RGB | HSL | Use |
|---|---|---|---|---|
| `fresh-500` (primary) | `#15C26B` | `21, 194, 107` | `147 80% 42%` | Buttons, links, brand surfaces |
| `fresh-600` | `#0FA259` | `15, 162, 89`  | `147 83% 35%` | Hover/active primary |
| `fresh-700` | `#0C8047` | `12, 128, 71`  | `147 83% 27%` | Success states, deep accents |
| `fresh-100` | `#CFF6DD` | `207, 246, 221`| `145 76% 89%` | Soft surfaces, badge backgrounds |
| `citrus-500` (accent) | `#FF6A1F` | `255, 106, 31`| `17 100% 56%` | Price callouts, "Book now" emphasis |
| `citrus-600` | `#E55613` | `229, 86, 19`  | `17 85% 49%` | Hover/active accent |
| `citrus-100` | `#FFDEC6` | `255, 222, 198`| `26 100% 89%` | Pricing card glow, badge tint |

### 2.2 Neutrals — Ink

Warm-leaning so the site reads "clean garage" not "cold lobby".

| Token | Hex | RGB | HSL |
|---|---|---|---|
| `ink-50`  | `#F6F8F7` | `246, 248, 247` | `150 9% 97%` |
| `ink-100` | `#ECF0EE` | `236, 240, 238` | `150 8% 93%` |
| `ink-200` | `#DDE4DF` | `221, 228, 223` | `144 10% 88%` |
| `ink-300` | `#C1CBC4` | `193, 203, 196` | `144 9% 78%` |
| `ink-400` | `#9CAAA2` | `156, 170, 162` | `147 8% 64%` |
| `ink-500` | `#7A8A80` | `122, 138, 128` | `147 7% 51%` |
| `ink-600` | `#5C6B61` | `92, 107, 97`   | `144 8% 39%` |
| `ink-700` | `#3E4B43` | `62, 75, 67`    | `141 9% 27%` |
| `ink-800` | `#2A332E` | `42, 51, 46`    | `140 10% 18%` |
| `ink-900` | `#1B221E` | `27, 34, 30`    | `141 11% 12%` |
| `ink-950` | `#0F1411` | `15, 20, 17`    | `144 14% 7%`  |

### 2.3 Semantic

| Token | Hex | RGB | HSL | Meaning |
|---|---|---|---|---|
| `success` | `#0F8E50` | `15, 142, 80`  | `147 80% 31%` | Booking confirmed, lead saved |
| `warning` | `#F59E0B` | `245, 158, 11` | `38 92% 50%`  | "We're booked through Thursday" |
| `destructive` | `#DC1F4B` | `220, 31, 75` | `348 83% 49%` | Form errors, canceled bookings |
| `info` | `#1B221E` | `27, 34, 30` | `141 11% 12%` | Use ink-900 — we don't have a "blue" |

> **Note on info:** we deliberately do not have a blue. Informational UI uses ink-900 with a citrus or fresh accent stripe. This is part of the brand differentiator.

### 2.4 Tailwind config snippet

The full config lives in [`tailwind.config.ts`](./tailwind.config.ts). Key portion:

```ts
colors: {
  // Semantic — bound to CSS variables in app/globals.css
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary:     { DEFAULT: "hsl(var(--primary))",     foreground: "hsl(var(--primary-foreground))" },
  accent:      { DEFAULT: "hsl(var(--accent))",      foreground: "hsl(var(--accent-foreground))" },
  success:     { DEFAULT: "hsl(var(--success))",     foreground: "hsl(var(--success-foreground))" },
  warning:     { DEFAULT: "hsl(var(--warning))",     foreground: "hsl(var(--warning-foreground))" },
  destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },

  // Brand scales — one-off use; prefer semantic above
  fresh:  { 50: "#E9FBF1", 100: "#CFF6DD", 500: "#15C26B", 600: "#0FA259", 700: "#0C8047", 900: "#08482A" },
  citrus: { 50: "#FFF1E8", 100: "#FFDEC6", 500: "#FF6A1F", 600: "#E55613", 900: "#5C2107" },
  ink:    { 50: "#F6F8F7", 100: "#ECF0EE", 500: "#7A8A80", 700: "#3E4B43", 900: "#1B221E", 950: "#0F1411" },
},
```

---

## 3. Typography

Two families. No third.

| Role | Family | Why |
|---|---|---|
| **Display** | **Space Grotesk** (500 / 600 / 700) | Geometric grotesque with a friendly, almost mechanical character. Reads confident at hero size, doesn't go "luxury serif" at small caps. |
| **Body** | **Inter** (400 / 500 / 600) | Neutral, optimized for screen, holds up at 14–15px on mobile where most leads will read it. |

Mobile sizing is enforced in `tailwind.config.ts → fontSize` — body never goes below 15px (`text-sm`), and headings keep tight tracking so they stay punchy on a 360px screen.

### 3.1 Scale

| Class | Size / line-height | Tracking | Use |
|---|---|---|---|
| `text-6xl` | 60 / 63 | -0.03em | Marketing hero only |
| `text-5xl` | 48 / 52 | -0.025em | Page H1 |
| `text-4xl` | 36 / 40 | -0.02em | City page H1, big stats |
| `text-3xl` | 30 / 36 | -0.015em | Section H2 |
| `text-2xl` | 24 / 32 | -0.01em | Card titles, sub-section H3 |
| `text-xl` | 20 / 28 | 0 | Lead-in paragraphs |
| `text-lg` | 18 / 27 | 0 | Long-form body |
| `text-base` | 16 / 25 | 0 | Default body |
| `text-sm` | 15 / 22 | 0 | **Floor for mobile body.** Captions, meta. |
| `text-xs` | 13 / 18 | 0.01em | UI chrome only, never paragraphs |

### 3.2 Rules

- Headings: `font-display`, `font-semibold` or `font-bold`. Never light weights.
- Body: `font-sans`, weight 400 default, 500 for UI emphasis, 600 for inline links inside paragraphs.
- Price callouts ($75): `font-display`, `font-bold`, tabular figures via `font-feature-settings: "tnum"`.
- Avoid italics except for legal microcopy.

---

## 4. Component tokens

All components live in `components/ui/*`. The tokens below are what those primitives compose to.

### 4.1 Buttons

| Variant | Background | Text | Border | Hover | Use |
|---|---|---|---|---|---|
| `default` (primary) | `bg-primary` (fresh-500) | `text-primary-foreground` (white) | none | `bg-primary/90` | Lead CTA |
| `accent` | `bg-accent` (citrus-500) | white | none | `bg-citrus-600` | **Book now** / pricing-attached CTAs |
| `outline` | transparent | `text-foreground` | `border-input` (ink-200) | `bg-accent/10` | Secondary actions |
| `ghost` | transparent | `text-foreground` | none | `bg-secondary` | In-card actions |
| `destructive` | `bg-destructive` | white | none | `bg-destructive/90` | Cancel booking |

Sizes:

| Size | Height | Padding | Radius | Font |
|---|---|---|---|---|
| `sm` | 36px (h-9)  | px-3  | rounded-md | text-sm / 600 |
| `default` | 40px (h-10) | px-4  | rounded-md | text-sm / 600 |
| `lg` | 48px (h-12) | px-6  | rounded-md | text-base / 600 |
| `icon` | 40 × 40 | — | rounded-md | — |

Focus ring on every variant: `ring-2 ring-ring ring-offset-2`. Disabled: 50% opacity, no pointer events. No box-shadow on default buttons — clean and flat reads "service trade", not "spa".

### 4.2 Cards

```text
bg-card                  (#FFFFFF)
text-card-foreground     (ink-950)
border border-border     (ink-200)
rounded-lg               (10px)
shadow-sm                (warm 1px shadow)
padding: 24px (desktop) / 20px (mobile)
```

**Pricing card** — special treatment: add `shadow-pop` (a 6px fresh-500 bottom shadow), no other shadow. It's the "stamped" effect that says service trade.

```html
<div class="rounded-lg border border-border bg-card p-6 shadow-pop">
  <div class="text-sm uppercase tracking-wide text-ink-500">Flat rate</div>
  <div class="font-display text-5xl font-bold">$75</div>
</div>
```

### 4.3 Form inputs

```text
height:           40px (h-10)
padding:          px-3 py-2
background:       bg-background
border:           border-input (ink-200) — hairline
border-radius:    rounded-md
font:             text-sm (15px)
placeholder:      text-muted-foreground (ink-500 at ~60% perceived)
focus:            ring-2 ring-ring (fresh-500) ring-offset-2, no border color change
disabled:         opacity-50, cursor-not-allowed
error:            border-destructive, helper text in text-destructive
```

Labels: `text-sm font-medium`, sit 8px above the input, never inside (we want fast scanning on mobile).

### 4.4 Badges

Three badge styles cover the whole site:

| Style | Background | Text | Border | Use |
|---|---|---|---|---|
| **Service-area tag** | `bg-card` | `text-ink-700` | `border border-border` | City chips in footer, neighborhood lists |
| **Tier tag** | `bg-fresh-100` | `text-fresh-700` | none | "Tier 1" / "Same-week service" indicators |
| **Price stamp** (`.ff-stamp`) | `bg-ink-950` | `text-background` | `border-ink-900` | "$75 FLAT" callout above hero, in-card pricing emphasis |
| **Warning** | `bg-warning/15` | `text-warning` | none | "Booked through Thursday" |
| **Success** | `bg-success/15` | `text-success` | none | "Confirmed" booking status |

All badges: `rounded-md`, `px-2.5 py-1`, `text-xs font-semibold`, uppercase tracking for `.ff-stamp` only.

---

## 5. Voice & tone

### 5.1 Personality dial

|  | We are | We are **not** |
|---|---|---|
| Tone | Confident, plain-spoken, faintly dry | Cute, hypey, exclamation-heavy |
| Detail | Specific (filter types, minutes, dollars) | Vague ("premium", "experience") |
| Stance | Specialist proud of doing one thing | Full-service generalist |
| Style | Sentence fragments are fine. Periods earn it. | Stacked adjectives. "Crystal-clear sparkling waters." |

### 5.2 Rules

1. **Lead with the number.** $75 and minutes beat adjectives.
2. **Name the thing.** Cartridge, DE, sand — not "your filter system".
3. **Short sentences.** If it doesn't read aloud in one breath, cut it.
4. **No water poetry.** No "crystal clear," "sparkling," "refreshing oasis."
5. **Comparisons are fair.** "Half the price" — we can say it, we mean it. Don't trash-talk competitors by name.
6. **Active voice.** "We disassemble it" not "It will be disassembled."
7. **Contractions are fine.** "We'll", "you're", "don't."

### 5.3 Example headlines

1. **"$75. Done in 45 minutes. That's the whole pitch."**
2. **"Half the price. Twice the focus."**
3. **"We only clean filters. So we clean them better."**
4. **"Your pool tech charges $150 for this. We charge $75."**
5. **"Pool filters. Cleaned. By people who actually want to."**

### 5.4 Example body copy

1. *"We disassemble your filter, deep-clean every pleat, and put it back. You get before-and-after photos. Most jobs take under an hour."*
2. *"Cartridge, DE, or sand — flat $75. No trip charge. No 'while we're here' upsell. No surprises on the invoice."*
3. *"Specialists, not generalists. One service means we're faster — and faster means we can charge less without cutting corners."*
4. *"We serve from Temecula through every corner of San Diego County. If it's got a filter, we'll clean it. If it doesn't, we'll tell you so."*
5. *"Book online and you'll get a text back within an hour. Most jobs scheduled within the same week — sometimes the same day."*

---

## 6. Implementation map

| Concern | File |
|---|---|
| Color tokens (CSS variables) | `app/globals.css` |
| Tailwind theme + scales + fonts | `tailwind.config.ts` |
| Font loading | `app/layout.tsx` (Inter + Space Grotesk via `next/font/google`) |
| Button / Input / Label / Select / Textarea primitives | `components/ui/*` |
| Branded sections (Hero, Pricing, FAQ, etc.) | `components/sections/*` |
| Schema markup | `lib/schema.ts` |

When the brand evolves, change the CSS variables and the brand scales in `tailwind.config.ts` — nothing else. Every component is referenced through semantic tokens.
