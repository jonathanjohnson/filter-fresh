import Script from "next/script";
import { faqSchema } from "@/lib/schema";

export const DEFAULT_FAQS = [
  {
    q: "Why only $75?",
    a: "We focus on one service, run lean routes, and skip the upsells. Most local outfits charge $130–$180 for the same job.",
  },
  {
    q: "Which filter types do you clean?",
    a: "Cartridge, DE, and sand filters. If you're not sure what you have, we can identify it on arrival.",
  },
  {
    q: "How long does it take?",
    a: "Most filters are cleaned, reinstalled, and pressure-checked in under an hour.",
  },
  {
    q: "How often should I have my filter cleaned?",
    a: "Cartridges: every 3–4 months. DE: every 4–6 months. Sand: backwash regularly and deep-clean annually.",
  },
  {
    q: "Do I need to be home?",
    a: "No, as long as the equipment pad is accessible. We send before/after photos and a written report.",
  },
];

export function Faq({ faqs = DEFAULT_FAQS }: { faqs?: typeof DEFAULT_FAQS }) {
  return (
    <section id="faq" className="container py-16">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
      <dl className="mt-8 space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-lg border bg-card p-6">
            <dt className="font-semibold">{f.q}</dt>
            <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
