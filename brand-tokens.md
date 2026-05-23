# Filter Fresh Pools — Pool Day Design System

Source of truth for the visual system. Pairs with `tailwind.config.ts` and `app/globals.css`.

## Colors (OKLCH source of truth)

OKLCH values mirror exactly into both `tailwind.config.ts` and the `:root` block in `app/globals.css`. Hex approximations are for tools that cannot read OKLCH.

| Token | OKLCH | Hex approx | Tailwind utility |
| --- | --- | --- | --- |
| `--ff-brand` | `oklch(54% 0.13 232)` | `#0d7eb8` | `bg-ff-brand`, `text-ff-brand` |
| `--ff-brand-deep` | `oklch(38% 0.11 235)` | `#075180` | `bg-ff-brand-deep`, `text-ff-brand-deep` |
| `--ff-brand-tint` | `oklch(96% 0.025 232)` | `#e9f4fb` | `bg-ff-brand-tint` |
| `--ff-brand-soft` | `oklch(92% 0.045 232)` | `#d4e9f6` | `bg-ff-brand-soft` |
| `--ff-ink` | `oklch(22% 0.025 240)` | `#1a2533` | `text-ff-ink` |
| `--ff-ink-2` | `oklch(40% 0.02 240)` | `#4b5868` | `text-ff-ink-2` |
| `--ff-ink-3` | `oklch(58% 0.015 240)` | `#7c8696` | `text-ff-ink-3` |
| `--ff-line` | `oklch(88% 0.01 240)` | `#dcdfe4` | `border` (default) |
| `--ff-line-2` | `oklch(94% 0.008 240)` | `#ecedf1` | `border-ff-line-2` |
| `--ff-bg` | `oklch(98% 0.006 95)` | `#fbfaf6` | `bg-ff-bg` (warm cream) |
| `--ff-paper` | `#ffffff` | `#ffffff` | `bg-ff-paper` (cards) |
| `--ff-accent` | `oklch(86% 0.14 92)` | `#f4d04a` | `text-ff-accent` (sunny highlight, sparingly) |
| `--ff-accent-deep` | `oklch(70% 0.16 65)` | `#cc8a2c` | star icons |
| `--ff-success` | `oklch(62% 0.13 158)` | `#1e9f6e` | `text-ff-success` |
| `--ff-danger` | `oklch(58% 0.18 25)` | `#d34a3a` | `text-ff-danger` |

The semantic aliases (`primary`, `accent`, `background`, `foreground`, `card`, `muted`, etc.) all resolve to one of the ff-* tokens via Tailwind theme mappings, so existing shadcn-style utilities continue to work.

## Typography

Loaded via `next/font/google` in `app/layout.tsx`:

| Role | Family | Weights | Use |
| --- | --- | --- | --- |
| Sans | Plus Jakarta Sans | 400 / 500 / 600 / 700 / 800 | UI, body, headings |
| Serif | Newsreader (italic) | 400 / 500 | Italic editorial moments inside displays — never set whole bodies in serif |
| Mono | JetBrains Mono | 400 / 500 / 600 | Prices, ZIPs, PSI numbers, timestamps |

### Type ramp (component utilities in `globals.css`)

| Class | Size / line / tracking / weight | Use |
| --- | --- | --- |
| `.ff-display` | clamp 48–72 / 0.96 / -0.035em / 700 (`.serif` flips inner span to italic) | Hero headlines |
| `.ff-h1` | clamp 36–48 / 1.02 / -0.028em / 700 | Section h1 |
| `.ff-h2` | clamp 26–36 / 1.08 / -0.022em / 700 | Section h2 |
| `.ff-h3` | 24 / 1.15 / -0.015em / 600 | Card titles |
| `.ff-h4` | 18 / 1.25 / -0.01em / 600 | Step / row titles |
| `.ff-body-lg` | 19 / 1.5 / 0 / 400 (`color: ink-2`) | Hero subhead |
| `.ff-body` | 16 / 1.55 / 0 / 400 (`color: ink-2`) | Default body |
| `.ff-small` | 13 / 1.45 / 0 / 400 (`color: ink-3`) | Captions |
| `.ff-eyebrow` | 11 / 0.14em / uppercase / 600 (brand-deep) | Section eyebrows |
| `.ff-mono` | inherit size, tabular figures | Prices, ZIP, PSI |

## Radii

| Token | Value | Use |
| --- | --- | --- |
| `rounded-sm` | 8px | Inputs, small chips |
| `rounded-lg` | 14px | Default cards |
| `rounded-2xl` | 22px | Hero cards, mobile artboards |
| `rounded-pill` | 9999px | Buttons, pills |

## Shadows

| Token | Definition | Use |
| --- | --- | --- |
| `shadow-sm` | layered hairline + 1px | Default surfaces |
| `shadow-md` | + 8px diffuse | Hover, dropdowns |
| `shadow-lg` | + 24px diffuse | Hero cards, final-CTA glass card, big price card |
| `shadow-glow` | 6px brand glow | Logo mark only |

## Buttons (`.ff-btn`)

- Pill-shaped, `border-radius: 999px`.
- Heights: 36 (sm) / 48 (default) / 56 (lg).
- Padding: `0 14px` / `0 22px` / `0 28px`.
- Font weights and sizes: 13 / 15 / 16, all 600.
- `--primary` brand fill with glow; `--ghost` white bg with line border; `--text` chrome-less.
- `:active` translates Y by 1px (no transition).

Use the `Button` component or the `.ff-btn` utility directly.

## Pills (`.ff-pill`)

Brand-soft background, brand-deep text, 12px / 600 / +0.01em tracking, 5/11 padding, 6px round dot prefix. Variants via `data-tone="accent"` (sunny yellow tint) or `data-tone="ink"` (neutral).

Use the `Pill` component.

## Cards (`.ff-card`)

White (`bg-ff-paper`), 1px `--ff-line` border, 14px radius, `shadow-sm`. Add `.padded` for 28px internal padding.

## Sections (`.ff-section`)

96/64 padding desktop, 36/22 mobile (via `clamp`). Modifiers:
- `.tint` — `bg-ff-brand-tint` for alternating sections.
- `.deep` — dark navy (`bg-ff-ink`) with light text; flips `.ff-body`, `.ff-eyebrow`.

## Italic-serif headline emphasis

The motif used everywhere: short emphasis words ("Always.", "No upsells.", "Keep them.", "$75") flip from sans 700 to serif italic 400. In JSX: wrap with `<span className="serif">` inside `.ff-display`, or use `font-serif font-normal italic` Tailwind classes.

## Mono usage rule

Only for prices, ZIPs, PSI, and timestamps. Do not use for body, navigation, or labels.

## No emoji except `☀` in the footer

Everything else is inline SVG or text.

## Animation

All transitions use `cubic-bezier(0.2, 0.7, 0.3, 1)` (exposed as `ease-pool` in Tailwind and `--ease-pool` in CSS).

- Button hover: `background 0.15s`; active: `translateY(1px)` instant.
- Card hover (links): tint background fade 0.15s.
- How-it-works progress bar: `width 0.45s` ease-pool.
- Accordion: `max-height 0.3s, opacity 0.25s, margin 0.2s`.

## TOC anchor offsets

Use `scroll-margin-top: 90px` on h2/h3 with ids — already set in `globals.css`. Do not use `scrollIntoView`.

## Audit checklist before merging UI

- No inline hex outside `tailwind.config.ts` and `globals.css`.
- No references to the retired token families (`primary-navy`, `primary-blue`, `cta-gradient`, `marine-*`, `splash-*`, `fresh-*`, `citrus-*`).
- All "Filter Fresh" mentions in copy and metadata are "Filter Fresh Pools".
- Buttons use `Button` or `.ff-btn`. Cards use `.ff-card`. Pills use `Pill` or `.ff-pill`.
- Italic-serif emphasis is present on hero displays and key callouts.
- Mono used only for prices/ZIP/PSI/timestamps.
