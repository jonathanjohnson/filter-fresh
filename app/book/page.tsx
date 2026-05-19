import type { Metadata } from "next";
import { LeadForm } from "@/components/sections/lead-form";

export const metadata: Metadata = {
  title: "Book a $75 pool filter cleaning",
  description: "Request a flat-rate $75 pool filter cleaning. Same-week scheduling across Temecula and San Diego County.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Book your $75 cleaning</h1>
        <p className="mt-2 text-muted-foreground">
          Drop your address and we'll text back to confirm a time — usually within an hour.
        </p>
        <div className="mt-8">
          <LeadForm sourcePage="/book" />
        </div>
      </div>
    </section>
  );
}
