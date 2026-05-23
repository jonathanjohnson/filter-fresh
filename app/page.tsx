import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { getAllCities, getCitiesByTier, type City } from "@/lib/cities";
import { faqSchema, homepageBusinessSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_TEL, PRICE_DISPLAY } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Pool Filter Cleaning, $75 Flat | Filter Fresh Pools",
  description:
    "Pool filter cleaning specialists serving Temecula through all of San Diego County. Cartridge, DE, and sand filters cleaned, inspected, and pressure-tested for a flat $75. Half the price of full-service pool companies.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pool Filter Cleaning, $75 Flat | Filter Fresh Pools",
    description:
      "Cartridge, DE, and sand filters cleaned, inspected, and pressure-tested for a flat $75. Serving Temecula through San Diego County.",
    url: "/",
  },
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const allCities = getAllCities();
  const tier1 = getCitiesByTier(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageBusinessSchema(allCities)),
        }}
      />

      <Hero />
      <TrustStrip />
      <Difference />
      <Included />
      <FilterTypes />
      <AreaSection cities={tier1} />
      <Process />
      <Comparison />
      <Reviews />
      <FaqSection />
      <FinalCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="ff-stamp">{PRICE_DISPLAY} flat. No upsells.</span>
        <h1 className="mt-5 text-4xl font-bold md:text-5xl lg:text-6xl">
          Pool filter cleaning, {PRICE_DISPLAY} flat. By people who only clean pool filters.
        </h1>
        <p className="mt-4 font-display text-base font-bold tracking-tight text-primary-navy md:text-lg">
          Clean Filter. Clearer Water. Healthier Pool.
        </p>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Cartridge, DE, and sand filters cleaned, inspected, and pressure-tested. Serving Temecula
          through every city in San Diego County. Most jobs done in under an hour.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book my filter clean
          </Link>
          <Link
            href="#service-area"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            See if we serve your area
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Trust strip                                                                */
/* -------------------------------------------------------------------------- */

function TrustStrip() {
  const items = [
    { label: "Local since", value: "2023" },
    { label: "Filters cleaned", value: "1,400+" },
    { label: "Google rating", value: "4.9 / 5" },
    { label: "Service area", value: "Temecula to San Diego" },
  ];
  return (
    <section className="border-y bg-secondary/40">
      <div className="container py-6">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-center md:grid-cols-4">
          {items.map((item) => (
            <li key={item.label}>
              <div className="font-display text-lg font-bold tracking-tight tabular-nums">
                {item.value}
              </div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. The $75 Difference                                                      */
/* -------------------------------------------------------------------------- */

function Difference() {
  const pillars = [
    {
      title: "Specialist focus",
      body: "One service done a thousand times beats five services done a few. We have seen every filter housing made since 2005.",
    },
    {
      title: "No upsell pressure",
      body: "We are not trying to win you on a $400 monthly contract. The visit ends when the filter is back together and the system holds pressure.",
    },
    {
      title: "Tight routes, low overhead",
      body: "One truck, one technician, one job. We do not stock parts inventory or carry a chemical retail markup. That savings goes to you.",
    },
  ];
  return (
    <section className="container py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            The $75 difference
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            How we charge half what a full-service pool company charges
          </h2>
          <p className="mt-5 text-muted-foreground">
            Full-service pool companies price a filter clean as part of a bigger contract. Recurring
            routes, weekly chemical service, parts inventory, two-person trucks. That overhead has
            to land somewhere, and it lands on a $150 to $200 filter clean.
          </p>
          <p className="mt-3 text-muted-foreground">
            We run one service. No contracts, no add-ons, no while-we-are-here pitches. That is the
            entire math behind {PRICE_DISPLAY}.
          </p>
        </div>
        <ul className="space-y-4">
          {pillars.map((p) => (
            <li
              key={p.title}
              className="rounded-lg border bg-card p-5"
            >
              <div className="font-semibold">{p.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. What's Included                                                         */
/* -------------------------------------------------------------------------- */

function Included() {
  const steps = [
    {
      n: "01",
      title: "Degreaser soak",
      body: "Every cartridge or grid set goes into a commercial filter degreaser. Sunscreen, lotions, body oils, and biofilm release at the fiber level. A hose alone does not do this.",
    },
    {
      n: "02",
      title: "Deep clean",
      body: "High-pressure rinse, pleat by pleat, by hand. DE grids get the same attention. Sand laterals get inspected and rinsed before the bed is rebuilt.",
    },
    {
      n: "03",
      title: "Inspection",
      body: "We look at every element for tears, broken bands, collapsed cores, and pleat damage. You get photographs of anything that needs your attention.",
    },
    {
      n: "04",
      title: "Pressure test",
      body: "System back on, lid sealed, air bled. We log the new clean baseline PSI so you have a number to watch over the next 90 days.",
    },
    {
      n: "05",
      title: "Manifold check",
      body: "DE manifolds, top heads, and bottom hubs inspected for hairline cracks. We tell you what needs replacing and offer to order parts at our cost.",
    },
  ];
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            What is included
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            What {PRICE_DISPLAY} actually buys
          </h2>
          <p className="mt-4 text-muted-foreground">
            Five steps, every visit. Hose-and-rinse competitors stop after step two. We do the
            entire list whether you ask us to or not.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-lg border bg-card p-5"
            >
              <div className="font-display text-sm font-bold tracking-wide text-primary">
                {s.n}
              </div>
              <div className="mt-2 font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Filter Types We Service                                                 */
/* -------------------------------------------------------------------------- */

function FilterTypes() {
  const types = [
    {
      name: "Cartridge filters",
      tagline: "Most common in California pools",
      body: "Pentair Clean & Clear, Hayward SwimClear, Sta-Rite, Jandy, and the rest. Single, two, three, and four-element systems. We recommend a full re-pleat at 3 to 5 years and tell you the truth when yours has another season in it.",
      cadence: "Clean every 3 to 4 months",
    },
    {
      name: "DE filters",
      tagline: "Best filtration, fussiest service",
      body: "Diatomaceous earth grids pulled by hand, soaked, rinsed, and inspected. Torn grids and cracked manifolds are caught before they cost you DE in the pool. Fresh charge of DE included on completion.",
      cadence: "Clean every 4 to 6 months",
    },
    {
      name: "Sand filters",
      tagline: "Lowest maintenance until they are not",
      body: "Standard backwash and rinse, plus a chemical sand cleanse on schedule. If the bed has channeled or the laterals are damaged, we will rebed the filter with fresh #20 silica sand at our cost.",
      cadence: "Deep clean once a year",
    },
  ];
  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          Filter types we service
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Cartridge, DE, and sand. All three, same flat rate.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Not sure what you have? Tell us the brand on the housing, or send a photo when you book.
          We will identify it before we roll out.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {types.map((t) => (
          <article
            key={t.name}
            className="flex flex-col rounded-lg border bg-card p-6"
          >
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {t.tagline}
            </div>
            <h3 className="mt-2 text-xl font-semibold">{t.name}</h3>
            <p className="mt-3 flex-1 text-sm text-muted-foreground">{t.body}</p>
            <div className="mt-4 ff-tag">
              {t.cadence}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Service Area                                                            */
/* -------------------------------------------------------------------------- */

function AreaSection({ cities }: { cities: City[] }) {
  const byCounty = cities.reduce<Record<string, City[]>>((acc, c) => {
    (acc[c.county] ??= []).push(c);
    return acc;
  }, {});

  return (
    <section id="service-area" className="border-t bg-secondary/30">
      <div className="container py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            Service area
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            From Temecula to the South Bay
          </h2>
          <p className="mt-4 text-muted-foreground">
            We cover south Riverside County and every corner of San Diego County. Tap your city to
            see local availability and book.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {Object.entries(byCounty).map(([county, list]) => (
            <div key={county}>
              <div className="font-semibold">{county}</div>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {list
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="text-foreground hover:text-primary"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Not seeing your city? Call {PHONE_DISPLAY} and ask. We work the edges of our area on
          request when the route makes sense.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. How It Works                                                            */
/* -------------------------------------------------------------------------- */

function Process() {
  const steps = [
    {
      n: 1,
      title: "Book",
      body: "Pick a date online or text us. We confirm by text inside an hour during business hours.",
    },
    {
      n: 2,
      title: "We come out",
      body: "One technician, one truck. We pull, soak, clean, inspect, reinstall, and pressure-test.",
    },
    {
      n: 3,
      title: "Sparkling filter",
      body: "Before and after photos, an inspection report, and your new clean PSI baseline. Paid on completion.",
    },
  ];
  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          How it works
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Three steps from booked to done
        </h2>
      </div>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="rounded-lg border bg-card p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
              {s.n}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Comparison                                                              */
/* -------------------------------------------------------------------------- */

function Comparison() {
  const rows = [
    { label: "Filter cleaning price", us: `${PRICE_DISPLAY} flat`, them: "$150 to $200" },
    { label: "Contract required", us: "No", them: "Often yes" },
    { label: "Upsells on visit", us: "None", them: "Common" },
    { label: "Time spent on filter", us: "45 to 60 minutes", them: "20 to 30 minutes (rinse only)" },
    { label: "Inspection report", us: "Included", them: "Rarely" },
    { label: "Before and after photos", us: "Every visit", them: "No" },
    { label: "Service window", us: "1 hour text confirm", them: "2 to 4 hour window" },
    { label: "Parts markup", us: "At cost", them: "20 to 40 percent" },
  ];
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            Specialist vs generalist
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Why Filter Fresh Pools beats a full-service pool company
          </h2>
          <p className="mt-4 text-muted-foreground">
            If you already have a weekly pool service you love, keep them. Add us for the filter
            clean and put $75 back in your pocket every quarter.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-lg border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 md:px-6">What you get</th>
                <th className="px-4 py-3 text-foreground md:px-6">Filter Fresh Pools</th>
                <th className="px-4 py-3 md:px-6">Typical pool company</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((r) => (
                <tr key={r.label}>
                  <td className="px-4 py-3 font-medium md:px-6">{r.label}</td>
                  <td className="px-4 py-3 font-semibold text-primary-navy md:px-6">{r.us}</td>
                  <td className="px-4 py-3 text-muted-foreground md:px-6">{r.them}</td>
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
/* 7. Reviews                                                                 */
/* -------------------------------------------------------------------------- */

function Reviews() {
  const reviews = [
    {
      quote:
        "Showed up on time, pulled my Pentair cartridges out, soaked them, brought them back so clean they looked new. Two pool companies before this just hosed them off. Worth every dollar.",
      name: "Marcus L.",
      city: "Temecula",
    },
    {
      quote:
        "I had a DE filter that nobody wanted to touch because grids are a pain. These guys took it apart on the driveway, cleaned every grid, recharged the DE, and were done in under an hour.",
      name: "Jennifer K.",
      city: "Carlsbad",
    },
    {
      quote:
        "Honest, fast, no upsell pitch. They told me my manifold has another season in it and not to bother replacing yet. First pool tech in five years who didn't try to sell me something extra.",
      name: "Priya S.",
      city: "Encinitas",
    },
    {
      quote:
        "Booked online Sunday night, got a text Monday morning, cleaned Tuesday. Sand backwash on one pool and a cartridge clean on the other. $150 for both. The last guy charged me $400.",
      name: "David R.",
      city: "San Diego",
    },
    {
      quote:
        "Best seventy-five bucks I've spent on the pool this year. Came out for a single cartridge clean and the photos came through to my phone before they had even left the property.",
      name: "Lisa M.",
      city: "Murrieta",
    },
    {
      quote:
        "Asked about a contract and they said they don't do those. Refreshing. Will be using them again in the spring.",
      name: "Tom W.",
      city: "Escondido",
    },
  ];
  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          What customers say
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Real reviews from real pools
        </h2>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <li key={i} className="flex flex-col rounded-lg border bg-card p-6">
            <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {r.name}, {r.city}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. FAQ                                                                     */
/* -------------------------------------------------------------------------- */

const HOMEPAGE_FAQS = [
  {
    q: "How long does a pool filter cleaning take?",
    a: "Most jobs are 45 minutes to an hour, start to finish. DE filters with a full grid pull sometimes run to 75 minutes. Sand backwashes are quicker.",
  },
  {
    q: "How often should I have my pool filter cleaned?",
    a: "Cartridges every 3 to 4 months. DE grids every 4 to 6 months. Sand should be backwashed weekly and given a chemical clean once a year. We will tell you what your specific filter needs based on PSI and visible condition.",
  },
  {
    q: "Do I need to be home for the appointment?",
    a: "No. As long as the equipment pad is accessible and we know about pets and gate codes, we can complete the job without you. You get photos and a written inspection report.",
  },
  {
    q: "What happens if my filter is damaged?",
    a: "We inspect everything as we go. If we find tears, broken bands, or cracked manifolds, you get photos and an honest cost. We do not mark up parts and we do not pressure you to do the work today.",
  },
  {
    q: "Do you sell filter cartridges or parts?",
    a: "Only if you ask. We can order any major brand at our cost and install on a follow-up visit. We do not stock parts on the truck, which is part of how we keep the flat $75 rate.",
  },
  {
    q: "What cities do you cover?",
    a: "Temecula, Murrieta, Menifee, Wildomar, Lake Elsinore, Canyon Lake, and every city in San Diego County. If you are within roughly 60 miles of central San Diego, we serve you.",
  },
  {
    q: "Do you offer service contracts or memberships?",
    a: "No. Every visit is a single transaction. If you want a reminder when your next clean is due, we will send a text. No contract, no auto-charge, no membership.",
  },
  {
    q: "How do I pay?",
    a: "Card on file when you book, or tap to pay on the truck. We do not require deposits and we do not charge until the job is finished.",
  },
];

function FaqSection() {
  return (
    <section id="faq" className="border-t bg-secondary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOMEPAGE_FAQS)) }}
      />
      <div className="container py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            Frequently asked
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Questions worth answering before you book
          </h2>
        </div>
        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {HOMEPAGE_FAQS.map((f) => (
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
/* 9. Final CTA                                                               */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-card-pop md:p-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Book a {PRICE_DISPLAY} filter clean
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Pick a time online, or pick up the phone. Same-week availability most of the year, with
          next-day slots open more often than you would expect.
        </p>
        <a
          href={`tel:${PHONE_TEL}`}
          className="mt-6 inline-block font-display text-3xl font-bold tracking-tight text-foreground tabular-nums md:text-4xl"
        >
          {PHONE_DISPLAY}
        </a>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book my filter clean
          </Link>
          <Link
            href="#service-area"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            See if we serve your area
          </Link>
        </div>
      </div>
    </section>
  );
}
