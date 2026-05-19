import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";
import { waitlistSchema } from "@/lib/booking";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from("waitlist").insert({
    email: parsed.data.email,
    zip: parsed.data.zip,
  });

  if (error) {
    return NextResponse.json({ error: "Could not save waitlist entry" }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
