# Filter Fresh Pools — static assets

## Logo

Save the brand logo here as both:

- `public/logo.png` — used by the header and footer. Recommended export: 512x512 PNG with transparent or white background.
- `public/icon.png` — used as the favicon (Next.js App Router auto-detects `app/icon.png` first, then falls back here). 512x512 works for all favicon sizes.

Until you drop in the production files, the site falls back to `public/logo.svg`, a marine-navy "FF" monogram placeholder. The header and footer reference `/logo.png` first and `/logo.svg` as a fallback path, so a missing `logo.png` does not break the layout.

To swap in your PNG:

1. Save the actual logo as `public/logo.png` (and `public/icon.png` if you want it as a favicon).
2. No code changes needed; the components already reference `/logo.png`.

## Open Graph image

If you want a custom Open Graph image (the social card that shows up when the site is shared), save it as `app/opengraph-image.png` at 1200x630. Next.js picks it up automatically.
