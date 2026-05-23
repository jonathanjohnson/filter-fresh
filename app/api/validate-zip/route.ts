import { NextResponse } from "next/server";
import { validateZip } from "@/lib/zip-validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("zip" in body)) {
    return NextResponse.json(
      { error: "Body must be an object with a `zip` field" },
      { status: 400 }
    );
  }

  try {
    const result = await validateZip((body as { zip: unknown }).zip);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[/api/validate-zip] unhandled error:", err);
    return NextResponse.json(
      { error: "ZIP lookup failed" },
      { status: 500 }
    );
  }
}
