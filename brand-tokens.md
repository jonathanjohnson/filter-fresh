# Filter Fresh Pools — Brand Tokens

Quick reference. Every token below is the single source of truth and must be referenced via Tailwind utilities or CSS variables. **Do not paste hex into components.**

- **Tailwind config:** `tailwind.config.ts`
- **CSS variables:** `app/globals.css`
- **Component reference:** `DESIGN_SYSTEM.md`

---

## Color tokens

### Brand

| Token | Hex | RGB | HSL | Tailwind utility |
| --- | --- | --- | --- | --- |
| primary-navy | `#0F2A57` | `15, 42, 87` | `217 70% 20%` | `bg-primary-navy`, `text-primary-navy`, `border-primary-navy` |
| primary-blue | `#1565D8` | `21, 101, 216` | `215 83% 47%` | `bg-primary-blue`, `text-primary-blue` |
| primary-blue-light | `#2E8AE6` | `46, 138, 230` | `209 79% 54%` | `bg-primary-blue-light`, `text-primary-blue-light` |
| accent-sky | `#7FB8F0` | `127, 184, 240` | `209 80% 72%` | `bg-accent-sky`, `text-accent-sky` |
| accent-splash | `#B8DAF5` | `184, 218, 245` | `208 76% 84%` | `bg-accent-splash`, `text-accent-splash` |

### Neutrals

| Token | Hex | Tailwind utility |
| --- | --- | --- |
| neutral-white | `#FFFFFF` | `bg-neutral-white` (or `bg-background`) |
| neutral-off-white | `#F7FAFD` | `bg-neutral-off-white` (or `bg-secondary`) |
| neutral-soft-blue | `#EAF2FB` | `bg-neutral-soft-blue` (or `bg-muted`) |

### Text

| Token | Hex | Tailwind utility |
| --- | --- | --- |
| text-primary | `#1A1F2E` | `text-foreground` |
| text-secondary | `#4A5568` | `text-muted-foreground` |
| text-muted | `#718096` | `text-subtle` |

### Semantic

| Token | Hex | Tailwind utility |
| --- | --- | --- |
| semantic-success | `#10B981` | `bg-success`, `text-success` |
| semantic-warning | `#F59E0B` | `bg-warning`, `text-warning` |
| semantic-error | `#EF4444` | `bg-destructive`, `text-destructive` |

### Semantic role mapping

Use the role tokens in components. They resolve to brand colors via CSS variables in `globals.css`.

| Role | Resolves to |
| --- | --- |
| `bg-primary` | primary-navy `#0F2A57` |
| `bg-accent` | primary-blue `#1565D8` |
| `bg-background` | neutral-white `#FFFFFF` |
| `bg-secondary` | neutral-off-white `#F7FAFD` |
| `bg-muted` | neutral-soft-blue `#EAF2FB` |
| `text-foreground` | text-primary `#1A1F2E` |
| `text-muted-foreground` | text-secondary `#4A5568` |
| `text-subtle` | text-muted `#718096` |
| `ring` (focus ring) | primary-blue `#1565D8` |

---

## Gradients

Defined as CSS variables in `globals.css`. Use as Tailwind background utilities.

| Token | Definition | Tailwind utility |
| --- | --- | --- |
| gradient-cta | `linear-gradient(135deg, #1565D8 0%, #2E8AE6 100%)` | `bg-cta-gradient` |
| gradient-hero-overlay | `linear-gradient(180deg, rgba(15,42,87,0.85), rgba(15,42,87,0.4) 60%, rgba(15,42,87,0))` | `bg-hero-overlay` |

The cta gradient is the canonical primary-button background. Do not hand-roll new gradients in components.

---

## Typography

| Role | Family | Weights | Loaded by | Notes |
| --- | --- | --- | --- | --- |
| Display (h1, h2, h3, h4) | **Sora** | 700, 800 | `next/font/google` in `app/layout.tsx` | Never italic. The logo owns the italic. |
| Body | **Inter** | 400, 500, 600 | `next/font/google` in `app/layout.tsx` | Normal letter spacing. |

### Letter spacing (applied by the type scale)

| Element | Tracking |
| --- | --- |
| h1 | `-0.02em` |
| h2 | `-0.015em` |
| h3 | `-0.015em` |
| body | normal |
| uppercase labels | `+0.05em` (Tailwind `tracking-wide`) |

---

## Radii

| Use | Token | Pixels |
| --- | --- | --- |
| Pills (buttons, badges) | `rounded-pill` | 9999px |
| Cards | `rounded-2xl` | 16px |
| Form inputs, small surfaces | `rounded-md` | 8px |

---

## Shadows

| Use | Token | Definition |
| --- | --- | --- |
| Default surfaces | `shadow-sm` / `shadow` | navy-tinted 1px and 3px |
| **Cards (default)** | `shadow-card` | `0 1px 3px rgba(15,42,87,0.06), 0 8px 24px rgba(15,42,87,0.04)` |
| Cards on hover | `shadow-card-hover` | `0 4px 10px rgba(15,42,87,0.08), 0 16px 32px rgba(15,42,87,0.06)` |
| Emphasis cards (pricing, final CTA) | `shadow-card-pop` | `0 4px 14px rgba(15,42,87,0.10), 0 24px 48px rgba(15,42,87,0.08)` |
| Primary button hover | `shadow-btn-hover` | `0 8px 20px rgba(21,101,216,0.35)` (primary-blue glow) |

---

## Component contracts

### Primary button

- `bg-cta-gradient` (background)
- `text-white`
- `rounded-pill` (9999px)
- Height: `h-12` (48px) default, `h-14` (56px) lg, `h-10` (40px) sm
- Padding: `px-8` (32px) default, `px-5` (20px) sm
- `font-semibold`
- Hover: `shadow-btn-hover`, `brightness-105`
- Source: `components/ui/button.tsx → variant="default"`

### Secondary button (outline)

- `bg-card` (white)
- `text-primary-navy`
- `border-[1.5px] border-primary-navy`
- Same `rounded-pill`, sizing, weight as primary
- Hover: `bg-muted`
- Source: `components/ui/button.tsx → variant="outline"`

### Card

- `bg-card` (white)
- `rounded-2xl`
- `border` (resolves to `neutral-soft-blue`)
- `shadow-card`
- Padding: `p-6` for compact cards, `p-8` for spacious
- Convenience: `.ff-card` utility in `globals.css`

### Pill badges

- **Stamp** (`.ff-stamp`): `bg-accent-sky/30 text-primary-navy rounded-pill`, uppercase, `letter-spacing: 0.05em`. Use for hero "$75 FLAT" badge.
- **Tag** (`.ff-tag`): `bg-muted text-primary-navy rounded-pill`, smaller padding, uppercase, +0.05em tracking. Use for cadence chips and tier labels.

### Section backgrounds

Alternate body sections between:

- Default: `bg-background` (neutral-white)
- Alt: `bg-secondary` (neutral-off-white)
- Emphasis (pricing comparison, etc.): `bg-muted` (neutral-soft-blue)

Convenience helpers: `.ff-section-alt` and `.ff-section-emphasis`.

---

## Brand name and tagline

- **Brand name:** `Filter Fresh Pools`. Use the full name everywhere (LocalBusiness schema, meta titles, headers, footer, alt text, body copy). Casual abbreviation to "Filter Fresh" is not used.
- **Tagline:** `Clean Filter. Clearer Water. Healthier Pool.` Title case, three sentences, terminal periods.
- **Where it appears:** footer brand block (primary placement), hero subhead under the H1 (homepage), and as a recurring signature wherever a brand block needs a one-line summary.

---

## Audit checklist

Before merging any UI change, confirm:

- No inline hex values in `app/` or `components/`.
- No references to old brand class names (`fresh-*`, `citrus-*`, `marine-*`, `splash-*`).
- All "Filter Fresh" mentions in body copy and metadata are "Filter Fresh Pools".
- Buttons use `Button` from `components/ui/button.tsx` (pill, gradient, navy outline).
- Cards use `rounded-2xl` and `shadow-card`, not ad-hoc shadows.
- Headings are display-weight (700+) and never italic.
