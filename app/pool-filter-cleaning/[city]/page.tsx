import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { getNearestCities } from "@/lib/cities";
import {
  getAllExtendedCitySlugs,
  getExtendedCity,
  type ExtendedCity,
} from "@/lib/cities-extended";
import {
  breadcrumbSchema,
  faqSchema,
  homepageBusinessSchema,
  servicePageSchema,
} from "@/lib/schema";
import { getTestimonialsForArea, type Testimonial } from "@/lib/testimonials";
import { PHONE_DISPLAY, PHONE_TEL, PRICE_DISPLAY } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";

type Params = { city: string };

/* -------------------------------------------------------------------------- */
/* SSG                                                                        */
/* -------------------------------------------------------------------------- */

export function generateStaticParams(): Params[] {
  return getAllExtendedCitySlugs().map((city) => ({ city }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const c = getExtendedCity(params.city);
  if (!c) return {};
  const title = `Pool Filter Cleaning in ${c.name}, CA | $75 Flat | Filter Fresh Pools`;
  const description = `Specialist pool filter cleaning in ${c.name}. Cartridge, DE, and sand systems serviced for a flat $75. ${c.climate_note.split(".").slice(0, 1).join(".")}.`;
  return {
    title,
    description,
    alternates: { canonical: `/pool-filter-cleaning/${c.slug}` },
    openGraph: {
      title,
      description,
      url: `/pool-filter-cleaning/${c.slug}`,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function CityServicePage({ params }: { params: Params }) {
  const c = getExtendedCity(params.city);
  if (!c) notFound();

  const neighbors = getNearestCities(c.slug, c.lat, c.lng, 4);
  const areaSlugs = [c.slug, ...neighbors.map((n) => n.slug)];
  const testimonials = getTestimonialsForArea(areaSlugs).slice(0, 3);

  const crumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Pool Filter Cleaning", url: `${SITE_URL}/pool-filter-cleaning` },
    {
      name: c.name,
      url: `${SITE_URL}/pool-filter-cleaning/${c.slug}`,
    },
  ]);

  // City-scoped LocalBusiness with this single City as areaServed,
  // plus a city-scoped Service offer at $75.
  const business = homepageBusinessSchema([
    {
      slug: c.slug,
      name: c.name,
      county: c.county,
      tier: c.tier,
      lat: c.lat,
      lng: c.lng,
      population: c.population,
      neighborhoods: c.neighborhoods,
      zips: c.zips,
    },
  ]);
  const service = servicePageSchema([
    {
      slug: c.slug,
      name: c.name,
      county: c.county,
      tier: c.tier,
      lat: c.lat,
      lng: c.lng,
      population: c.population,
      neighborhoods: c.neighborhoods,
      zips: c.zips,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs(c))) }}
      />

      <Header city={c} />
      <WhyHere city={c} />
      <Neighborhoods city={c} />
      <ServiceSummary />
      <PricingCallout city={c} />
      <Zips city={c} />
      <Reviews testimonials={testimonials} city={c} />
      <MapBlock city={c} />
      <FaqBlock city={c} />
      <Cta city={c} neighbors={neighbors} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Header                                                            */
/* -------------------------------------------------------------------------- */

function Header({ city: c }: { city: ExtendedCity }) {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          {c.county} service area
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Pool Filter Cleaning in {c.name}, CA
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          {c.name} sits near {c.local_landmark}, and the local mix of weather and
          landscape is rough on pool filters. {c.climate_note.split(".")[0]}. We
          service cartridge, DE, and sand systems across all of {c.name} for a flat{" "}
          {PRICE_DISPLAY}, including a degreaser soak, hand rinse, full inspection, and a
          pressure test before we leave.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book a {PRICE_DISPLAY} cleaning in {c.name}
          </Link>
          <a
            href={`tel:${PHONE_TEL}`}
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Why filter cleaning matters in this city                          */
/* -------------------------------------------------------------------------- */

function WhyHere({ city: c }: { city: ExtendedCity }) {
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            Why it matters in {c.name}
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            What the local climate and landscape do to your filter
          </h2>
          <p className="mt-5 text-muted-foreground">
            Filter cleaning is a maintenance task everywhere in California. In{" "}
            {c.name} it is a higher-priority maintenance task than most homeowners
            realize.
          </p>
          <p className="mt-4 text-muted-foreground">{c.climate_note}</p>
          <p className="mt-4 text-muted-foreground">{c.pool_density_note}</p>
          <p className="mt-4 text-muted-foreground">
            Peak filter loading season in {c.name} runs May through October, with a
            secondary pollen-driven spike from late January through April. Cartridge
            pressure climbs 3 to 5 PSI above clean baseline within six to eight weeks
            during those windows. DE systems load faster still because the same fine
            particulate that gets through a coarse strainer ends up packed into the
            grid fabric. Sand filters look fine on a backwash but channel earlier in
            inland air than they do on the coast.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Neighborhoods                                                     */
/* -------------------------------------------------------------------------- */

function Neighborhoods({ city: c }: { city: ExtendedCity }) {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          Neighborhoods we cover
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Service across every {c.name} subdivision
        </h2>
        <p className="mt-5 text-muted-foreground">
          Filter Fresh Pools runs a regular route through {c.name}. The neighborhoods below
          are where we service the most pools. If you live outside this list but
          inside city limits, ask. We routinely take jobs anywhere within {c.name},
          and we hold the same flat {PRICE_DISPLAY} rate across every address.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          {c.neighborhoods.map((n) => (
            <li
              key={n}
              className="rounded-md border bg-card px-3 py-2 text-foreground"
            >
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Service summary with link to main guide                           */
/* -------------------------------------------------------------------------- */

function ServiceSummary() {
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            What a Filter Fresh Pools visit looks like
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            The {PRICE_DISPLAY} service, briefly
          </h2>
          <p className="mt-5 text-muted-foreground">
            We pull every cartridge, DE grid, or open the sand multiport, depending on
            your system. Elements go into a commercial filter degreaser. We hand
            rinse, inspect the manifold, replace worn o-rings, reassemble, pressure
            test, and log a clean PSI baseline on a sticker on the housing. Most
            visits are done in 45 to 60 minutes. DE systems run closer to 75 because
            we pull the grid set rather than relying on a backwash.
          </p>
          <p className="mt-4 text-muted-foreground">
            For the full step-by-step breakdown across cartridge, DE, and sand
            systems, including the equipment-damage math behind why you do not want
            to defer this, read our{" "}
            <Link
              href="/pool-filter-cleaning"
              className="font-semibold text-primary hover:underline"
            >
              complete pool filter cleaning guide
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Pricing callout                                                   */
/* -------------------------------------------------------------------------- */

function PricingCallout({ city: c }: { city: ExtendedCity }) {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 shadow-card-pop md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-primary">
              {c.name} pricing
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              {PRICE_DISPLAY} flat. Half the local going rate.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Full-service pool companies serving {c.name} typically bill a filter
              clean at $150 to $200 as part of a weekly route, or $130 to $170 as a
              one-off visit. Filter Fresh Pools charges {PRICE_DISPLAY} flat regardless of
              filter type, address, or how loaded the element is. No trip charges,
              no contracts, no membership.
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="font-display text-5xl font-bold tabular-nums">
              {PRICE_DISPLAY}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
              Flat rate, all of {c.name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: ZIPs                                                              */
/* -------------------------------------------------------------------------- */

function Zips({ city: c }: { city: ExtendedCity }) {
  return (
    <section className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          ZIP codes served
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          We cover every {c.name} ZIP code. If your address sits on the border with a
          neighboring city, send the full address when you book and we will route it
          correctly.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          {c.zips.map((z) => (
            <li
              key={z}
              className="rounded-md border bg-card px-3 py-1 font-mono text-foreground"
            >
              {z}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Reviews filtered to area                                          */
/* -------------------------------------------------------------------------- */

function Reviews({
  testimonials,
  city: c,
}: {
  testimonials: Testimonial[];
  city: ExtendedCity;
}) {
  if (testimonials.length === 0) return null;
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            Reviews from {c.name} and nearby
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            What local customers say
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <li
                key={i}
                className="flex flex-col rounded-lg border bg-card p-6"
              >
                <blockquote className="flex-1 text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t.name}, {t.city}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Map                                                               */
/* -------------------------------------------------------------------------- */

function MapBlock({ city: c }: { city: ExtendedCity }) {
  const src = `https://www.google.com/maps?q=${c.lat},${c.lng}&z=11&output=embed`;
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          Service area map
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Centered on {c.name}, roughly 25 miles in every direction
        </h2>
        <div className="mt-6 overflow-hidden rounded-lg border bg-card">
          <iframe
            title={`Service map for ${c.name}`}
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full md:h-[420px]"
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Service radius covers all of {c.name} and surrounding {c.county} cities.
          For addresses outside this radius we still take the call. We will tell you
          honestly if it makes route sense or recommend a trusted operator closer to
          you.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: FAQ                                                               */
/* -------------------------------------------------------------------------- */

function faqs(c: ExtendedCity) {
  const hood = c.neighborhoods[0];
  const hood2 = c.neighborhoods[1] ?? c.neighborhoods[0];
  return [
    {
      q: `How often should I clean my pool filter in ${c.name}?`,
      a: `Cartridge filters every 3 to 4 months in normal conditions, every 6 to 8 weeks during the ${c.name} peak season from May through October. DE systems every 4 to 6 months, faster if your yard is heavy on pollen sources. Sand should be backwashed when PSI rises 8 to 10 PSI above clean baseline and given a chemical cleanse once a year.`,
    },
    {
      q: `Why does my ${c.name} pool filter clog faster than my friend's coastal pool?`,
      a: `Inland and gap-funnel locations like ${c.name} pick up more fine particulate than coastal pools. Decomposed-granite landscaping, pollen from oak and eucalyptus, and dust during Santa Ana events all push faster filter loading than a pool five miles closer to the ocean. Your friend is not doing anything different. The air is.`,
    },
    {
      q: `Do you service ${hood} and ${hood2}?`,
      a: `Yes. ${hood} and ${hood2} are two of the most common neighborhoods on our ${c.name} route. We hold the same flat ${PRICE_DISPLAY} rate across every ${c.name} address.`,
    },
    {
      q: `Do I have to be home for the appointment in ${c.name}?`,
      a: `No. As long as the equipment pad is accessible and we know about gate codes and pets, we can complete the job without you. You get before-and-after photos to your phone and a written inspection report by text or email.`,
    },
  ];
}

function FaqBlock({ city: c }: { city: ExtendedCity }) {
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-primary">
            {c.name} questions
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Local FAQ
          </h2>
          <dl className="mt-8 space-y-4">
            {faqs(c).map((f) => (
              <div key={f.q} className="rounded-lg border bg-card p-6">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: CTA + neighbor links                                              */
/* -------------------------------------------------------------------------- */

function Cta({
  city: c,
  neighbors,
}: {
  city: ExtendedCity;
  neighbors: { slug: string; name: string }[];
}) {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-card-pop md:p-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Book a {PRICE_DISPLAY} cleaning in {c.name}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Same-week scheduling is the standard. Pick a time online, or call and a
          person will pick up.
        </p>
        <a
          href={`tel:${PHONE_TEL}`}
          className="mt-6 inline-block font-display text-3xl font-bold tracking-tight tabular-nums md:text-4xl"
        >
          {PHONE_DISPLAY}
        </a>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book {c.name} service
          </Link>
          <Link
            href="/pool-filter-cleaning"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Read the full service guide
          </Link>
        </div>
        <div className="mt-10 text-left">
          <div className="text-sm font-semibold">Nearby cities we cover</div>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {neighbors.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/${n.slug}`}
                  className="rounded-full border bg-background px-3 py-1 text-muted-foreground hover:text-primary"
                >
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
