import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book a $75 pool filter cleaning",
  description:
    "Five-step booking for a flat-rate $75 pool filter cleaning. Same-week scheduling across Temecula and San Diego County.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="ff-section">
      <div className="ff-container max-w-[820px]">
        <div className="mb-8">
          <div className="ff-eyebrow">Booking</div>
          <h1 className="ff-h1 mt-3">Book a $75 filter clean.</h1>
          <p className="ff-body-lg mt-3 max-w-[560px]">
            Five quick steps. We&rsquo;ll text within an hour during business hours to confirm.
            Prefer to talk to a person?{" "}
            <a
              href={`tel:${PHONE_TEL}`}
              className="ff-mono font-semibold text-ff-brand-deep hover:underline"
            >
              Call {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>
        <BookingFlow />
      </div>
    </section>
  );
}
