import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSupabase } from "@/lib/supabase";
import { sanitizeZip } from "@/lib/zip-validation";

export const runtime = "nodejs";

const inputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().email(),
  zip: z.string().min(1),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const zip = sanitizeZip(parsed.data.zip);
  if (zip === null) {
    return NextResponse.json(
      { error: "ZIP must be a valid 5-digit code" },
      { status: 400 }
    );
  }

  try {
    const supabase = getServerSupabase();
    const { error } = await supabase.from("leads_outside_area").insert({
      name: parsed.data.name.trim(),
      email: parsed.data.email,
      zip,
    });
    if (error) {
      console.error("[/api/leads-outside-area] insert error:", error);
      return NextResponse.json(
        { error: "Could not save signup" },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[/api/leads-outside-area] unhandled error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
