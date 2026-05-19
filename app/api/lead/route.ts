import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";
import { leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const lead = parsed.data;
  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: lead.name,
      email: lead.email || null,
      phone: lead.phone,
      address: lead.address || null,
      city: lead.city || null,
      zip: lead.zip || null,
      filter_type: lead.filter_type ?? null,
      message: lead.message || null,
      source_page: lead.source_page ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
}
