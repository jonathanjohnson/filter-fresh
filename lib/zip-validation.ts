import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicServerSupabase, type Database } from "@/lib/supabase";

export type ZipValidationResult =
  | {
      status: "in_service_area";
      zip: string;
      city: string;
      county: string;
      region: string;
    }
  | { status: "out_of_service_area"; zip: string }
  | { status: "invalid_format" };

/**
 * Sanitize a raw ZIP input.
 *  - Coerce to string, trim
 *  - If the input contains a decimal point (e.g. "92592.0" from CSV/Excel),
 *    drop everything from the dot onward before stripping non-digits.
 *    This avoids "92592.0" becoming "925920" under a naive digit-strip.
 *  - Strip remaining non-digit characters (handles "92-592", " 92592 ")
 *  - Must be exactly 5 digits AND not "00000" (structurally invalid US ZIP).
 *
 * Returns the sanitized 5-digit string, or null if it is not a valid ZIP format.
 */
export function sanitizeZip(input: unknown): string | null {
  if (input == null) return null;
  let s = String(input).trim();
  if (s === "") return null;
  const dot = s.indexOf(".");
  if (dot >= 0) s = s.slice(0, dot);
  s = s.replace(/\D/g, "");
  if (s.length !== 5) return null;
  if (s === "00000") return null;
  return s;
}

/**
 * Validate a ZIP code against the service area in Supabase.
 *
 * The Supabase client is injectable so tests can pass a mock. In production
 * callers omit it and the public (anon) server client is used. The zips table
 * has a public-read RLS policy so the anon key is sufficient.
 */
export async function validateZip(
  input: unknown,
  client: SupabaseClient<Database> = getPublicServerSupabase()
): Promise<ZipValidationResult> {
  const zip = sanitizeZip(input);
  if (zip === null) {
    return { status: "invalid_format" };
  }

  try {
    // Use .select().eq() and inspect the array so PostgREST's "no rows" case
    // (empty array, not null) is handled explicitly.
    const { data, error } = await client
      .from("zips")
      .select("zip, city, county, region, in_service_area")
      .eq("zip", zip)
      .limit(1);

    if (error) {
      console.error("[validateZip] Supabase error for input", input, ":", error);
      throw error;
    }

    const rows = data ?? [];
    if (rows.length === 0) {
      return { status: "out_of_service_area", zip };
    }

    const row = rows[0];
    if (row.in_service_area !== true) {
      return { status: "out_of_service_area", zip };
    }

    return {
      status: "in_service_area",
      zip: row.zip,
      city: row.city,
      county: row.county,
      region: row.region,
    };
  } catch (err) {
    console.error("[validateZip] unexpected error for input", input, ":", err);
    throw err;
  }
}
