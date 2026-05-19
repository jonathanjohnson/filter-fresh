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
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            Booking
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Book a $75 filter cleaning
          </h1>
          <p className="mt-3 text-muted-foreground">
            Five quick steps. We will text within 2 hours during business hours to
            confirm. Prefer to talk to a person?{" "}
            <a href={`tel:${PHONE_TEL}`} className="font-semibold text-primary hover:underline">
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
