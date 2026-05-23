/**
 * Idempotent seed for public.zips. Reads supabase/seed/zips.json and bulk inserts
 * via the service-role client. Re-running this script does not duplicate rows
 * thanks to onConflict: "zip" + ignoreDuplicates.
 *
 * Run:
 *   node --env-file=.env.local --import=tsx supabase/seed/seed-zips.ts
 * or:
 *   pnpm tsx supabase/seed/seed-zips.ts   # if you have tsx installed
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to be set.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type ZipRow = {
  zip: string;
  city: string;
  county: string;
  region: string;
  in_service_area: boolean;
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running."
    );
  }

  const seedPath = path.join(process.cwd(), "supabase", "seed", "zips.json");
  const raw = fs.readFileSync(seedPath, "utf8");
  const rows: ZipRow[] = JSON.parse(raw);

  console.log(`Seeding ${rows.length} ZIP rows from ${seedPath}…`);

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase
    .from("zips")
    .upsert(rows, { onConflict: "zip", ignoreDuplicates: true });

  if (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }

  const { count, error: countError } = await supabase
    .from("zips")
    .select("zip", { count: "exact", head: true });
  if (countError) {
    console.error("Count check failed:", countError);
    process.exit(1);
  }

  console.log(`Done. zips table now contains ${count} rows.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
