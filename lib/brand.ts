import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

function pickFirstExisting(...candidates: string[]): string {
  for (const c of candidates) {
    if (fs.existsSync(path.join(PUBLIC_DIR, c.replace(/^\//, "")))) {
      return c;
    }
  }
  return candidates[candidates.length - 1];
}

// Use the customer PNG when it has been dropped in, fall back to the SVG
// placeholder so the layout never shows a broken image.
export const LOGO_SRC: string = pickFirstExisting("/logo.png", "/logo.svg");
