import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_TEL, PRICE_DISPLAY } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";
const RECURRING_PRICE_DISPLAY = "$65";

export const metadata: Metadata = {
  title: "Pricing | $75 Flat Pool Filter Cleaning | Filter Fresh",
  description:
    "Filter Fresh charges $75 flat per pool filter cleaning. Half what full-service pool companies bill for the same work. Here is exactly why, with a side-by-side comparison and a recurring discount to $65.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | $75 Flat Pool Filter Cleaning | Filter Fresh",
    description:
      "$75 flat per cleaning, $65 on a recurring quarterly schedule. The full math behind the price.",
    url: "/pricing",
  },
};

/* -------------------------------------------------------------------------- */
/* Schema                                                                     */
/* -------------------------------------------------------------------------- */

function pricingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/pricing#service`,
    name: "Pool Filter Cleaning",
    serviceType: "Pool Filter Cleaning",
    provider: { "@id": `${SITE_URL}#business` },
    offers: [
      {
        "@type": "Offer",
        name: "One-time pool filter cleaning",
        price: "75.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/book`,
      },
      {
        "@type": "Offer",
        name: "Recurring pool filter cleaning, quarterly cadence",
        price: "65.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/book`,
        eligibleCustomerType: "https://schema.org/Enumeration",
      },
    ],
  };
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PricingPage() {
  const crumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Pricing", url: `${SITE_URL}/pricing` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(PRICING_FAQS)),
        }}
      />

      <Hero />
      <Included />
      <Comparison />
      <WhyCheaper />
      <Limits />
      <Recurring />
      <PricingFaq />
      <FinalCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. Hero                                                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="ff-stamp">Pricing</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {PRICE_DISPLAY}. One filter. One price. No upsells.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground md:text-xl">
          The local market charges $125 to $225 for the same job. We charge {PRICE_DISPLAY}. The
          rest of this page is the math behind that gap, in plain English, with no apologies.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book my filter clean
          </Link>
          <Link
            href="#included"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            See what is included
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. What's included at $75                                                  */
/* -------------------------------------------------------------------------- */

function Included() {
  const items = [
    "Full filter pull and visual inspection",
    "Commercial filter degreaser soak (TSP-free, biodegradable)",
    "Hand rinse of every cartridge or DE grid",
    "Manifold and o-ring inspection, with replacement o-rings if needed",
    "Multiport valve check on sand systems",
    "Pressure test and clean PSI baseline logged on the filter housing",
    "Before and after photographs sent to your phone",
    "Written inspection report with anything we found",
    "Fresh DE charge included on DE systems",
    "Same flat rate for cartridge, DE, and sand. We do not upcharge by filter type.",
  ];
  return (
    <section id="included" className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            What {PRICE_DISPLAY} actually buys
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Every visit, every filter type, every time
          </h2>
          <p className="mt-5 text-muted-foreground">
            The list below is what shows up at your equipment pad. It does not change by neighborhood,
            by filter brand, or by how loaded the element is when we get there.
          </p>
          <ul className="mt-8 grid gap-2 md:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex gap-3 rounded-md border bg-card p-3 text-sm">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Comparison table                                                        */
/* -------------------------------------------------------------------------- */

function Comparison() {
  const rows: Array<{
    label: string;
    us: string;
    fullService: string;
    chain: string;
  }> = [
    {
      label: "Price",
      us: `${PRICE_DISPLAY} flat`,
      fullService: "$150 to $200",
      chain: "$125 to $175",
    },
    {
      label: "Specialist or generalist",
      us: "Specialist (filters only)",
      fullService: "Generalist (weekly route)",
      chain: "Mixed, technician rotation",
    },
    {
      label: "Time on site",
      us: "45 to 60 minutes",
      fullService: "20 to 30 min (rinse only)",
      chain: "30 to 45 minutes",
    },
    {
      label: "Contract required",
      us: "No",
      fullService: "Often yes",
      chain: "Sometimes",
    },
    {
      label: "One-time visits allowed",
      us: "Yes",
      fullService: "Rarely",
      chain: "Yes",
    },
    {
      label: "Recurring option",
      us: `${RECURRING_PRICE_DISPLAY} on quarterly cadence`,
      fullService: "Bundled into monthly service",
      chain: "Membership or app subscription",
    },
    {
      label: "Upsell pressure",
      us: "None",
      fullService: "Common",
      chain: "High, especially chemicals",
    },
    {
      label: "Inspection report",
      us: "Included",
      fullService: "Verbal at best",
      chain: "Sometimes",
    },
    {
      label: "Photos of work",
      us: "Every visit",
      fullService: "No",
      chain: "Sometimes",
    },
    {
      label: "Parts markup",
      us: "At cost",
      fullService: "20 to 40 percent",
      chain: "30 to 50 percent",
    },
  ];

  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          Side by side
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Filter Fresh vs the rest of the local market
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Same job, three different business models. The price gap is structural, not promotional.
        </p>
        <div className="mt-8 overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 md:px-6">What you get</th>
                <th className="px-4 py-3 text-foreground md:px-6">Filter Fresh</th>
                <th className="px-4 py-3 md:px-6">Full-service pool company</th>
                <th className="px-4 py-3 md:px-6">Big-box service chain</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((r) => (
                <tr key={r.label}>
                  <td className="px-4 py-3 font-medium md:px-6">{r.label}</td>
                  <td className="px-4 py-3 font-semibold text-marine-700 md:px-6">{r.us}</td>
                  <td className="px-4 py-3 text-muted-foreground md:px-6">{r.fullService}</td>
                  <td className="px-4 py-3 text-muted-foreground md:px-6">{r.chain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Why we can charge less                                                  */
/* -------------------------------------------------------------------------- */

function WhyCheaper() {
  const reasons = [
    {
      title: "We only do filters",
      body: "One service, learned cold and repeated thousands of times. Throughput per hour is higher than a generalist's, which means a lower price still covers our costs. Specialization is the entire economic engine here.",
    },
    {
      title: "Route density",
      body: "We schedule by ZIP code and direction of travel, not by what is convenient for the customer. Less drive time per job means less labor cost per job. We pass that math through to you.",
    },
    {
      title: "No chemical inventory",
      body: "We do not stock chlorine, shock, algaecide, or balancers. We do not have a chemical retail margin to defend. That is also why we do not handle weekly chemistry. The two go together.",
    },
    {
      title: "No equipment sales",
      body: "We are not selling pumps, heaters, salt cells, or automation systems. There is no commission to build into our pricing. If you need new equipment, we will refer you to a tech we trust at no markup.",
    },
    {
      title: "No franchise fees, no membership platform",
      body: "We are an independent local operator. There is no national chain taking a percentage of every invoice, and no software-as-a-service membership layer that requires marketing spend to keep churn down.",
    },
  ];
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            Why we can charge less
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Five structural reasons, not a promotion
          </h2>
          <p className="mt-5 text-muted-foreground">
            This price is not a loss leader. It is what filter cleaning costs when you strip out
            every line item that does not directly serve the filter.
          </p>
          <ol className="mt-8 space-y-4">
            {reasons.map((r, i) => (
              <li key={r.title} className="rounded-lg border bg-card p-5">
                <div className="font-display text-sm font-bold tracking-wide text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 font-semibold">{r.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. When you need more than just filter cleaning                            */
/* -------------------------------------------------------------------------- */

function Limits() {
  const referrals = [
    {
      need: "Weekly chemistry, brushing, vacuuming",
      who: "A route service technician in your ZIP. We will text you the names of two we work alongside and trust.",
    },
    {
      need: "Pump or motor failure",
      who: "Pool equipment specialist. Most can swap a motor in a single visit. We can recommend one with fair labor rates.",
    },
    {
      need: "Heater not firing",
      who: "Heater tech. Gas valves, ignition assemblies, and control boards are their own world.",
    },
    {
      need: "Salt cell replacement or cleaning",
      who: "Pool equipment specialist or your heater tech. Cells run $400 to $900 plus labor, and we are not the ones to install them.",
    },
    {
      need: "Plaster, tile, or coping work",
      who: "Pool remodeler. Multi-day work that needs scaffolding and dust control.",
    },
  ];
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          When you need more than filter cleaning
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Who to call for everything we will not touch
        </h2>
        <p className="mt-5 text-muted-foreground">
          Doing one job well is the only reason we can hold this price. If you need any of the
          work below, ask us by text and we will share two or three names per category. We do not
          take referral fees in either direction. Honest recommendations are part of how a
          specialist business stays trusted.
        </p>
        <ul className="mt-8 space-y-3">
          {referrals.map((r) => (
            <li
              key={r.need}
              className="grid gap-1 rounded-lg border bg-card p-5 md:grid-cols-[260px_1fr] md:gap-6"
            >
              <div className="font-semibold">{r.need}</div>
              <div className="text-sm text-muted-foreground">{r.who}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Recurring discount                                                      */
/* -------------------------------------------------------------------------- */

function Recurring() {
  const points = [
    "Same service, same flat rate logic, lower price.",
    "Quarterly cadence, roughly every 90 days. We send a reminder text 7 days before the next visit.",
    "Billed after each cleaning. No prepayment, no membership card, no app.",
    "Cancel any time by replying STOP to the appointment text. No fee, no friction.",
    "Annual saving of $40 vs the one-time rate, or about $10 per visit.",
  ];
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 shadow-pop md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-primary">
                Recurring schedule
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                {RECURRING_PRICE_DISPLAY} per clean on a quarterly cadence
              </h2>
              <p className="mt-4 text-muted-foreground">
                Most filters need service every three months. If yours does, lock in
                {" "}{RECURRING_PRICE_DISPLAY} per visit. It is a discount for letting us plan the
                route in advance, nothing more.
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="font-display text-5xl font-bold tabular-nums">
                {RECURRING_PRICE_DISPLAY}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                Per visit, quarterly
              </div>
            </div>
          </div>
          <ul className="mt-8 grid gap-2 text-sm">
            {points.map((p) => (
              <li key={p} className="flex gap-3 rounded-md border bg-background p-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/book" className={buttonVariants({ size: "lg" })}>
              Start a quarterly schedule
            </Link>
            <Link
              href="/book"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Or book a one-time {PRICE_DISPLAY} visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. FAQ on pricing concerns                                                 */
/* -------------------------------------------------------------------------- */

const PRICING_FAQS = [
  {
    q: "Is $75 too good to be true?",
    a: "No. It is what filter cleaning actually costs when the business doing it has no overhead beyond one truck, one technician, and one service. The reasons we can charge less are listed above and they are structural, not promotional. We will not raise the price on the truck, we will not add line items, and we will not charge a trip fee. The number you booked at is the number on the invoice.",
  },
  {
    q: "Why are you cheaper than my current pool company?",
    a: "Two reasons. First, your current company runs a route business and bundles filter cleaning into a monthly service plan that covers chemicals, chemistry checks, brushing, vacuuming, equipment monitoring, and office staff. Second, full-service pricing tends to be sticky once it is set. There is no incentive to break out the filter clean as a smaller line item. We have only one line item, so we have to be honest about its cost.",
  },
  {
    q: "Do you upcharge for DE filters?",
    a: "No. Cartridge, DE, and sand are all $75. DE takes us longer because we pull the grid set by hand. It does not cost you more. The flat-rate model means we eat the variance and you do not have to do mental math when you book.",
  },
  {
    q: "Are there any add-on costs?",
    a: "Two scenarios where you pay separately. First, a replacement o-ring kit if your air bleed or gauge is leaking and we need to seal it. Second, a sand bed media swap if your sand has channeled. Both are at our cost with no markup. Everything else in the service is included in $75 or $65, depending on which plan you booked.",
  },
  {
    q: "Do you take credit cards?",
    a: "Yes. Card on file when you book, or tap to pay on the truck when we finish. We do not require deposits and we do not charge until the job is done. If you prefer Zelle or check, that is fine too.",
  },
];

function PricingFaq() {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          Pricing FAQ
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Direct answers to the questions we hear before every first booking
        </h2>
        <dl className="mt-8 space-y-4">
          {PRICING_FAQS.map((f) => (
            <div key={f.q} className="rounded-lg border bg-card p-6">
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. CTA                                                                     */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-pop md:p-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {PRICE_DISPLAY} one time. {RECURRING_PRICE_DISPLAY} every quarter.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Same-week availability is the standard. Pick a time online, or call and a person will
          pick up.
        </p>
        <a
          href={`tel:${PHONE_TEL}`}
          className="mt-6 inline-block font-display text-3xl font-bold tracking-tight tabular-nums md:text-4xl"
        >
          {PHONE_DISPLAY}
        </a>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book my filter clean
          </Link>
          <Link
            href="/pool-filter-cleaning"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Read the full service guide
          </Link>
        </div>
      </div>
    </section>
  );
}
