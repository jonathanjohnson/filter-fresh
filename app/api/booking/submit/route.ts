import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";
import {
  CADENCE_LABELS,
  FILTER_LABELS,
  ISSUE_LABELS,
  LAST_CLEANED_LABELS,
  POOL_SIZE_LABELS,
  TIME_LABELS,
  priceForCadence,
  submitBookingSchema,
} from "@/lib/booking";
import {
  sendBookingConfirmationEmail,
  sendOperatorSms,
} from "@/lib/notifications";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = submitBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const input = parsed.data;
  const supabase = getServerSupabase();
  const price = priceForCadence(input.cadence);

  // 1) Lead row
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert({
      name: input.name,
      email: input.email || null,
      phone: input.phone,
      address: input.address,
      city: input.cityName,
      zip: input.zip,
      filter_type: input.filterType,
      message: buildLeadMessage(input),
      source_page: "/book",
    })
    .select("id")
    .single();

  if (leadError || !lead) {
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // 2) Pending booking row
  const notes = JSON.stringify({
    filter_type: input.filterType,
    pool_size: input.poolSize,
    last_cleaned: input.lastCleaned,
    issues: input.issues,
    time_preference: input.timePreference,
    date_start: input.dateStart,
    date_end: input.dateEnd,
    cadence: input.cadence,
    address: input.address,
    access_notes: input.accessNotes || null,
  });

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      lead_id: lead.id,
      status: "pending",
      total: price,
      notes,
    })
    .select("id")
    .single();

  if (bookingError || !booking) {
    return NextResponse.json({ error: "Could not save booking" }, { status: 500 });
  }

  // 3) Side-effect notifications (best-effort, do not block on failure)
  const dateRange = `${input.dateStart} to ${input.dateEnd}, ${TIME_LABELS[input.timePreference]}`;

  await Promise.allSettled([
    input.email
      ? sendBookingConfirmationEmail({
          to: input.email,
          name: input.name,
          city: input.cityName,
          price,
          dateRange,
          bookingId: booking.id,
        })
      : Promise.resolve({ sent: false, reason: "no email" }),
    sendOperatorSms(
      buildOperatorSms({
        name: input.name,
        phone: input.phone,
        city: input.cityName,
        zip: input.zip,
        cadence: CADENCE_LABELS[input.cadence],
        dateRange,
        bookingId: booking.id,
      })
    ),
  ]);

  return NextResponse.json(
    {
      ok: true,
      booking_id: booking.id,
      lead_id: lead.id,
      price,
    },
    { status: 201 }
  );
}

function buildLeadMessage(input: {
  filterType: keyof typeof FILTER_LABELS;
  poolSize: keyof typeof POOL_SIZE_LABELS;
  lastCleaned: keyof typeof LAST_CLEANED_LABELS;
  issues: Array<keyof typeof ISSUE_LABELS>;
  accessNotes?: string | "";
}): string {
  const issues = input.issues.map((i) => ISSUE_LABELS[i]).join(", ");
  const lines = [
    `Filter: ${FILTER_LABELS[input.filterType]}`,
    `Pool size: ${POOL_SIZE_LABELS[input.poolSize]}`,
    `Last cleaned: ${LAST_CLEANED_LABELS[input.lastCleaned]}`,
    `Issues: ${issues || "none"}`,
  ];
  if (input.accessNotes) lines.push(`Access: ${input.accessNotes}`);
  return lines.join("\n");
}

function buildOperatorSms(args: {
  name: string;
  phone: string;
  city: string;
  zip: string;
  cadence: string;
  dateRange: string;
  bookingId: string;
}): string {
  return [
    `New booking: ${args.name}`,
    `${args.city} ${args.zip} | ${args.phone}`,
    `${args.cadence}`,
    `Window: ${args.dateRange}`,
    `ID: ${args.bookingId.slice(0, 8)}`,
  ].join("\n");
}
