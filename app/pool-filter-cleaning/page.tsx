import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { getAllCities, getCitiesByTier } from "@/lib/cities";
import {
  breadcrumbSchema,
  faqSchema,
  servicePageSchema,
} from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_TEL, PRICE_DISPLAY } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";

export const metadata: Metadata = {
  title: "Pool Filter Cleaning: A Specialist's Complete Guide | Filter Fresh Pools",
  description:
    "What pool filter cleaning is, how it works for cartridge, DE, and sand systems, when to do it, and why a $75 flat-rate clean prevents thousands of dollars in equipment damage. Serving Temecula through San Diego County.",
  alternates: { canonical: "/pool-filter-cleaning" },
  openGraph: {
    title: "Pool Filter Cleaning, $75 Flat | Filter Fresh Pools",
    description:
      "Specialist guide to cartridge, DE, and sand filter cleaning. Process, timing, signs, and pricing.",
    url: "/pool-filter-cleaning",
  },
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PoolFilterCleaningPage() {
  const allCities = getAllCities();
  const tier1 = getCitiesByTier(1);

  const crumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Pool Filter Cleaning", url: `${SITE_URL}/pool-filter-cleaning` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicePageSchema(allCities)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(SERVICE_FAQS)) }}
      />

      <Header />
      <WhyItMatters />
      <CartridgeProcess />
      <DeProcess />
      <SandService />
      <Cadence />
      <SignsNow />
      <WhatIncluded />
      <WhatWeWontDo />
      <BookingCta cities={tier1} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable building blocks                                                   */
/* -------------------------------------------------------------------------- */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-semibold uppercase tracking-wide text-primary">
      {children}
    </div>
  );
}

function Paa({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border-l-4 border-primary bg-secondary/40 p-5">
      <div className="text-sm font-semibold">{q}</div>
      <div className="mt-1 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header + intro                                                             */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Service guide</SectionEyebrow>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Pool filter cleaning, explained by people who do nothing else
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Your pool filter is the one piece of equipment that separates clean water from a slow,
          expensive failure. Every drop of water in your pool passes through it. Sunscreen, body
          oils, sweat, pollen, dust, decomposing leaves, algae spores, microscopic biofilm, all of
          it gets caught in the filter element so it does not end up in your pump, your heater, or
          your skin.
        </p>
        <p className="mt-4 text-muted-foreground">
          When the filter is loaded up and nobody cleans it, that workload moves upstream. The pump
          motor strains. The heater starves for flow. Your water turns hazy and chlorine demand
          climbs. This page covers what cleaning actually does, why hosing off a cartridge in the
          driveway is not it, when to schedule a service, and how we keep the price at{" "}
          {PRICE_DISPLAY} flat when the going rate is $150 to $200.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book a {PRICE_DISPLAY} cleaning
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
/* Why dirty filters destroy equipment                                        */
/* -------------------------------------------------------------------------- */

function WhyItMatters() {
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionEyebrow>Why it matters</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            A clogged filter is the cheapest way to destroy a pump or heater
          </h2>
          <p className="mt-5 text-muted-foreground">
            A clean filter creates very little resistance. A dirty filter creates a lot. As pleats
            or grids load up with debris, the pressure on the gauge rises and the flow rate drops.
            Your pump motor still tries to push the same volume, so it pulls more amps, runs
            hotter, and ages faster. Your heater has a flow sensor that shuts the gas valve when
            flow drops below a threshold. When that sensor trips repeatedly, the gas valve and
            ignition assembly cycle in ways they were not designed to.
          </p>
          <p className="mt-4 text-muted-foreground">
            The numbers are not abstract. A pump motor replacement on a Hayward TriStar or Pentair
            IntelliFlo3 runs $400 to $1,200 in parts and labor. A heater heat exchanger eaten by
            poor flow and acidic water runs $1,500 to $3,000. Replastering a pool that has been
            cloudy for two summers because the filter never trapped fine particulates runs $5,000
            and up. A quarterly $75 filter clean is the single highest-leverage maintenance dollar
            you can spend on a pool.
          </p>
          <Paa q="Can a dirty pool filter damage my pump?">
            Yes. Restricted flow forces the pump motor to work harder for the same output. Bearings
            wear out faster, the windings run hot, and seals fail earlier. We have replaced motors
            that were three years old and should have lasted eight.
          </Paa>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Cartridge process                                                          */
/* -------------------------------------------------------------------------- */

function CartridgeProcess() {
  const steps = [
    "Pump off. System depressurized at the air bleed valve until the gauge reads zero.",
    "Lock ring or clamp band removed. Lid lifted. O-ring set aside on a clean towel.",
    "Each cartridge pulled straight up by the end cap. We do not twist. Twisting deforms the pleat geometry permanently.",
    "Every cartridge inspected for tears, broken bands, collapsed cores, and pleat compaction. Photos taken of anything that needs replacing.",
    "Cartridges soaked in a commercial filter degreaser for 45 to 60 minutes. The soak is what separates a real cleaning from a hose-and-rinse. Oils and sunscreen are inside the fibers, not on the surface.",
    "Second rinse, pleat by pleat, with a fan-tip nozzle at moderate pressure. Never a pressure washer, which destroys pleats.",
    "Air bleed o-ring inspected. Pressure gauge stem checked. Worn o-rings replaced before reassembly.",
    "Cartridges reinstalled in original orientation. Lid down. Lock ring snug, not gorilla-tight.",
    "Pump on. Air bled. Clean PSI logged on a sticker on the housing so you have a number to watch.",
  ];
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Cartridge filters</SectionEyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Cartridge filter cleaning, step by step
        </h2>
        <p className="mt-5 text-muted-foreground">
          Cartridge filters are the most common system in Southern California. Pentair Clean and
          Clear, Hayward SwimClear, Sta-Rite System 3, and Jandy CV all use pleated polyester
          elements that trap particles down to 15 to 20 microns. The single biggest mistake other
          companies make is treating a cartridge clean as a rinse job. A rinse moves surface
          debris. A clean releases what is bound inside the fibers.
        </p>
        <ol className="mt-6 space-y-3">
          {steps.map((s, i) => (
            <li
              key={i}
              className="rounded-lg border bg-card p-4 text-sm"
            >
              <span className="font-display font-bold text-primary">
                {String(i + 1).padStart(2, "0")}.
              </span>{" "}
              {s}
            </li>
          ))}
        </ol>
        <Paa q="How long does a pool cartridge filter last?">
          Three to five years with regular cleaning. The pleats hold debris in their geometry. Once
          the pleats deform or the end-cap bands degrade, no amount of cleaning restores
          filtration. We will tell you honestly when yours is at end of life and order replacements
          at our cost.
        </Paa>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* DE process                                                                 */
/* -------------------------------------------------------------------------- */

function DeProcess() {
  const steps = [
    "Backwash the system briefly to flush bulk DE out the waste line.",
    "Tank drained. Top manifold unbolted. This is the step most weekly pool services skip. A backwash alone does not clean DE grids.",
    "Every grid pulled by hand. Top grid first, then radial grids. Each one inspected for fabric tears, separation along the stitched edges, and worn tops.",
    "Grid set soaked together in filter degreaser. Heavy mineral or oil deposits get a separate muriatic dip on a case-by-case basis.",
    "Each grid hand-rinsed at moderate pressure. Inside and out.",
    "Manifold checked for hairline cracks where the threads meet the body. These crack from years of over-tightening and are the most common reason DE shows up in the pool after a recharge.",
    "Air bleed o-ring and tank o-ring replaced if worn. Both inspected even when not replaced.",
    "Grid set reseated. Manifold torqued by hand. Tank closed.",
    "Pump on. Air bled. Fresh DE charged through the skimmer at the manufacturer-spec dose for the filter square footage. New clean PSI logged.",
  ];
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionEyebrow>DE filters</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            DE filter cleaning, grids and all
          </h2>
          <p className="mt-5 text-muted-foreground">
            Diatomaceous earth filters give the finest filtration available for residential pools.
            They catch particles down to 3 microns, which is roughly five times finer than a
            cartridge and ten times finer than sand. The trade is service complexity. DE grids have
            to come out by hand, every cleaning.
          </p>
          <ol className="mt-6 space-y-3">
            {steps.map((s, i) => (
              <li
                key={i}
                className="rounded-lg border bg-card p-4 text-sm"
              >
                <span className="font-display font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}.
                </span>{" "}
                {s}
              </li>
            ))}
          </ol>
          <Paa q="How often does DE filter media need to be replaced?">
            DE powder itself gets flushed and re-added at every cleaning, so it is fresh every
            service. The grids underneath are the part that wears out, and a healthy grid set lasts
            four to six years. If we find a torn grid during inspection, we will order a single
            replacement at our cost rather than upselling you on a full set.
          </Paa>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Sand service                                                               */
/* -------------------------------------------------------------------------- */

function SandService() {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Sand filters</SectionEyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Sand filter service and when to replace the bed
        </h2>
        <p className="mt-5 text-muted-foreground">
          Sand filters are the lowest-effort system to maintain on a weekly basis and the most
          misunderstood on a multi-year basis. Backwashing handles bulk debris. It does nothing for
          the sand itself, which slowly degrades.
        </p>
        <p className="mt-4 text-muted-foreground">
          A standard service from us includes a backwash and rinse, a chemical sand cleanse with a
          dedicated sand filter degreaser, a multiport valve check for sticking selectors and worn
          spider gaskets, a lateral inspection through the drain port where accessible, and a sand
          top-off if the bed has lost volume over time.
        </p>
        <h3 className="mt-8 text-xl font-semibold">
          Why we recommend a sand bed swap every five to seven years
        </h3>
        <p className="mt-3 text-muted-foreground">
          Sand grains start life with sharp edges. Those edges are what trap fine particles. After
          five to seven years of constant water flow, the grains tumble round, like beach sand. A
          rounded bed channels the water through the same paths and lets fine particulates pass.
          The filter still looks normal on a backwash. The water still looks hazy in the pool. A
          full media replacement with fresh number 20 silica sand restores filtration. We charge
          $150 to $300 in materials and labor depending on the filter size.
        </p>
        <Paa q="Can I just keep backwashing my sand filter forever?">
          No. Backwashing handles trapped debris, not worn sand. If your water has been hazy
          despite balanced chemistry and a normal backwash schedule, you are due for a full media
          replacement.
        </Paa>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Cadence                                                                    */
/* -------------------------------------------------------------------------- */

function Cadence() {
  const rows = [
    { type: "Cartridge", normal: "Every 3 to 4 months", heavy: "Every 6 to 8 weeks" },
    { type: "DE", normal: "Every 4 to 6 months", heavy: "Every 2 to 3 months" },
    {
      type: "Sand",
      normal: "Backwash on +8 PSI. Chemical cleanse yearly. Full bed swap every 5 to 7 years.",
      heavy: "Backwash every 2 weeks during peak use. Annual chemical cleanse.",
    },
  ];
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionEyebrow>How often to clean</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Quarterly is the floor. Monthly is the peak-season standard.
          </h2>
          <p className="mt-5 text-muted-foreground">
            The single best signal is the pressure gauge on top of the filter. When it reads 8 to
            10 PSI above the clean baseline we log on the housing at every visit, the filter is
            ready for service. Below that, here are the general windows for Southern California
            pools.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 md:px-6">Filter type</th>
                  <th className="px-4 py-3 md:px-6">Normal season</th>
                  <th className="px-4 py-3 md:px-6">Heavy use (May to October, parties)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r) => (
                  <tr key={r.type}>
                    <td className="px-4 py-3 font-semibold md:px-6">{r.type}</td>
                    <td className="px-4 py-3 text-muted-foreground md:px-6">{r.normal}</td>
                    <td className="px-4 py-3 text-muted-foreground md:px-6">{r.heavy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Signs you need a clean now                                                 */
/* -------------------------------------------------------------------------- */

function SignsNow() {
  const signs = [
    {
      title: "PSI is 8 to 10 PSI above clean baseline",
      body: "The clearest signal. Your gauge tells you everything if you remembered to write down the clean number after the last service.",
    },
    {
      title: "Cloudy water that does not respond to chemistry",
      body: "Chlorine is in range, pH and alkalinity are in range, you have shocked twice, the water still reads hazy. The filter is not catching fines anymore.",
    },
    {
      title: "Short filter cycles",
      body: "You are backwashing the sand filter every week, or cleaning the cartridge monthly. The element is loaded faster than it used to be.",
    },
    {
      title: "Visible debris bypassing into the pool",
      body: "You see fine sediment on the steps the morning after vacuuming. A blown lateral or a torn cartridge is letting debris through.",
    },
    {
      title: "Pump is louder than it used to be",
      body: "Cavitation noise from a flow-starved pump. You will hear it as a higher-pitched whine or a rattling sound.",
    },
    {
      title: "Heater cycling oddly or refusing to fire",
      body: "Modern heaters protect themselves with a flow sensor. Low flow means no fire. If your heater shuts off shortly after starting, suspect the filter first.",
    },
  ];
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Signs you need service now</SectionEyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Six signals your filter is overdue
        </h2>
        <p className="mt-5 text-muted-foreground">
          If three or more of these are true at once, you are past due, and the longer it sits the
          more your pump and heater absorb damage that nobody bills back to the filter.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {signs.map((s) => (
            <li key={s.title} className="rounded-lg border bg-card p-5">
              <div className="font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* What's included vs $150 to $200                                            */
/* -------------------------------------------------------------------------- */

function WhatIncluded() {
  const us = [
    "Filter pull and full visual inspection",
    "Commercial filter degreaser soak (TSP-free, biodegradable)",
    "Hand rinse of every cartridge or DE grid",
    "Manifold and o-ring inspection, with replacement o-rings if needed",
    "Multiport valve check on sand systems",
    "Pressure test and clean PSI baseline logged on the housing",
    "Before and after photographs sent to your phone",
    "Written inspection report with any issues we found",
    "Fresh DE charge included on DE systems",
  ];
  const them = [
    "Filter pull and quick visual look",
    "Hose-and-rinse with the garden hose",
    "Reassembly and pressure check",
    "Verbal mention of issues, sometimes with an estimate to do the work",
    "Frequently a soft pitch for a weekly service contract",
  ];
  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionEyebrow>What {PRICE_DISPLAY} buys</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            What we do for {PRICE_DISPLAY} vs what others bill at $150 to $200
          </h2>
          <p className="mt-5 text-muted-foreground">
            The list below is what every Filter Fresh Pools visit includes, regardless of system. Across
            the bottom is what you typically get when a full-service pool company adds a filter
            clean to a weekly service invoice for $150 to $200.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-card-pop">
              <div className="text-sm font-semibold text-primary-navy">
                Filter Fresh Pools, {PRICE_DISPLAY} flat
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {us.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="text-sm font-semibold text-muted-foreground">
                Typical pool company, $150 to $200
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {them.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* What we will not do                                                        */
/* -------------------------------------------------------------------------- */

function WhatWeWontDo() {
  const list = [
    "Pool heaters. Gas valves, ignition assemblies, control boards, none of it.",
    "Pool pumps. Motor swaps, capacitor replacement, impeller cleaning, seal replacement.",
    "Water chemistry. We do not balance pH, alkalinity, chlorine, or calcium hardness.",
    "Salt cells and chlorinators. Cell cleaning, board diagnostics, flow switch replacement.",
    "Plaster, tile, coping, or deck work.",
    "New equipment installation or pool automation systems.",
  ];
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>What we will not do</SectionEyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          We are filter specialists. Here is everything else we do not touch.
        </h2>
        <p className="mt-5 text-muted-foreground">
          Doing one job better than anyone else is the entire business model. Adding services would
          mean adding inventory, training, and a markup we would have to pass on. So we do not.
        </p>
        <ul className="mt-6 space-y-2 text-sm">
          {list.map((item) => (
            <li key={item} className="flex gap-2 rounded-md border bg-card p-3">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-destructive" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          If you need any of the above, we will refer you to a trusted pool tech in your area. We
          work alongside dozens of them and have no problem telling you which ones are honest.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Booking CTA                                                                */
/* -------------------------------------------------------------------------- */

function BookingCta({ cities }: { cities: { slug: string; name: string }[] }) {
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-card-pop md:p-12">
        <SectionEyebrow>Book your cleaning</SectionEyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          {PRICE_DISPLAY} flat, anywhere from Temecula to the South Bay
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          We serve Temecula, Murrieta, Menifee, Wildomar, Lake Elsinore, Canyon Lake, and every
          city in San Diego County. Same-week scheduling is the standard, and next-day slots open
          more often than you would expect.
        </p>
        <a
          href={`tel:${PHONE_TEL}`}
          className="mt-6 inline-block font-display text-3xl font-bold tracking-tight tabular-nums md:text-4xl"
        >
          {PHONE_DISPLAY}
        </a>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book a {PRICE_DISPLAY} cleaning
          </Link>
          <Link
            href="/#service-area"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            See if we serve your area
          </Link>
        </div>
        <div className="mt-10 text-left">
          <div className="text-sm font-semibold">Popular service cities</div>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {cities.slice(0, 12).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className="rounded-full border bg-background px-3 py-1 text-muted-foreground hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ data (rendered as schema only; the in-page PAA callouts handle UX)     */
/* -------------------------------------------------------------------------- */

const SERVICE_FAQS = [
  {
    q: "Can a dirty pool filter damage my pump?",
    a: "Yes. Restricted flow forces the pump motor to work harder, run hotter, and age faster. We have seen motors fail in three years that should have lasted eight.",
  },
  {
    q: "How long does a pool cartridge filter last?",
    a: "Three to five years with regular cleaning. The pleats hold debris in their geometry, and once they deform or the bands degrade, no amount of cleaning restores filtration.",
  },
  {
    q: "How often does DE filter media need to be replaced?",
    a: "The DE powder itself is flushed and re-added at every cleaning. The grids underneath last four to six years before they need replacing.",
  },
  {
    q: "Can I just keep backwashing my sand filter forever?",
    a: "No. Backwashing handles trapped debris, but the sand grains themselves wear round over time and stop trapping fines. A full bed swap every five to seven years restores filtration.",
  },
  {
    q: "How do I know if my pool filter needs cleaning?",
    a: "The clearest signal is the pressure gauge. When it reads 8 to 10 PSI above the clean baseline, your filter is due. Cloudy water that does not respond to chemistry is the next clearest sign.",
  },
  {
    q: "What is included in a $75 Filter Fresh Pools cleaning?",
    a: "Full filter pull and inspection, commercial filter degreaser soak, hand rinse of every element, manifold and o-ring inspection, pressure test, clean PSI baseline, before and after photos, and a written inspection report.",
  },
];
