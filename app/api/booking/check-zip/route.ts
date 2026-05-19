import { NextResponse } from "next/server";
import { getPublicServerSupabase } from "@/lib/supabase";
import { checkZipSchema } from "@/lib/booking";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = checkZipSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid ZIP" }, { status: 422 });
  }

  const { zip } = parsed.data;
  const supabase = getPublicServerSupabase();

  const zipRow = await supabase
    .from("zips")
    .select("zip, city_slug")
    .eq("zip", zip)
    .maybeSingle();
  if (zipRow.error) {
    console.error("check-zip lookup failed:", zipRow.error);
    return NextResponse.json({ error: "Lookup failed", detail: zipRow.error.message }, { status: 500 });
  }
  if (!zipRow.data) {
    return NextResponse.json({ in_service_area: false });
  }

  const city = await supabase
    .from("cities")
    .select("name")
    .eq("slug", zipRow.data.city_slug)
    .maybeSingle();

  return NextResponse.json({
    in_service_area: true,
    city_slug: zipRow.data.city_slug,
    city_name: city.data?.name ?? zipRow.data.city_slug,
  });
}
