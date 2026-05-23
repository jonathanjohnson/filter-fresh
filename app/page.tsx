import Link from "next/link";
import type { Metadata } from "next";
import { Pill } from "@/components/ui/pill";
import { Arrow, FilterIcon, Star } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { HeroHome } from "@/components/sections/hero-home";
import { HowItWorksScrubber } from "@/components/sections/how-it-works-scrubber";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { getAllCities, getCitiesByTier, type City } from "@/lib/cities";
import { faqSchema, homepageBusinessSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pool filter cleaning, $75 flat. No upsells.",
  description:
    "Pool filter cleaning specialists across Temecula and San Diego County. $75 flat, no upsells. Cartridge, DE, or sand — same flat price.",
  alternates: { canonical: "/" },
};

const FAQS = [
  {
    q: "How long does a pool filter cleaning take?",
    a: "Most jobs are 45 minutes to an hour, start to finish. DE filters with a full grid pull sometimes run to 75 minutes. Sand backwashes are quicker.",
  },
  {
    q: "How often should I have my pool filter cleaned?",
    a: "Cartridges every 3 to 4 months. DE grids every 4 to 6 months. Sand should be backwashed weekly and chemical-cleaned once a year. We'll tell you what your specific filter needs based on PSI and visible condition.",
  },
  {
    q: "Do I need to be home for the appointment?",
    a: "No. As long as the equipment pad is accessible and we know about pets and gate codes, we can complete the job without you. You get photos and a written inspection report.",
  },
  {
    q: "What happens if my filter is damaged?",
    a: "We inspect everything as we go. If we find tears, broken bands, or cracked manifolds, you get photos and an honest cost. We don't mark up parts and we don't pressure you to do the work today.",
  },
  {
    q: "Do you sell filter cartridges or parts?",
    a: "Only if you ask. We can order any major brand at our cost and install on a follow-up visit. We don't stock parts on the truck — that's part of how we keep the flat $75 rate.",
  },
  {
    q: "Do you offer service contracts or memberships?",
    a: "No. Every visit is a single transaction. If you want a reminder when your next clean is due, we'll send you a text. No contract, no auto-charge, no membership.",
  },
];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }}
      />

      <HeroHome />
      <StatsStrip />
      <HowItWorksScrubber />
      <FilterTypes />
      <Comparison />
      <ServiceArea cities={tier1} />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}

function StatsStrip() {
  const stats = [
    { value: "$75", suffix: "", label: "Flat rate. Cartridge, DE, or sand — same price." },
    { value: "1,400", suffix: "+", label: "Filters cleaned across San Diego County since 2023." },
    { value: "4.9", suffix: "★", label: "Google rating across 312 verified reviews." },
    { value: "48", suffix: "m", label: "Average time on site, from arrival to pressure-tested." },
  ];
  return (
    <section className="border-y border-ff-line bg-ff-paper py-11 px-[clamp(22px,4vw,64px)]">
      <div className="ff-container grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-serif text-[56px] font-normal italic leading-[0.95] tracking-[-0.03em] text-ff-ink">
              {s.value}
              {s.suffix && <span className="ml-1 text-2xl">{s.suffix}</span>}
            </div>
            <div className="ff-small mt-2 max-w-[180px]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FilterTypes() {
  const types = [
    {
      id: "cartridge" as const,
      pill: "Most common in California pools",
      title: "Cartridge filters",
      body:
        "Pentair Clean & Clear, Hayward SwimClear, Sta-Rite, Jandy and the rest. Single, two, three, and four-element systems. We'll recommend a full re-pleat at 3 to 5 years — and tell you straight when yours has another season in it.",
      cadence: "Clean every 3–4 months",
    },
    {
      id: "de" as const,
      pill: "Best filtration, fussiest to service",
      title: "DE filters",
      body:
        "Diatomaceous earth grids pulled by hand, soaked, rinsed, and inspected. Torn grids and cracked manifolds are caught before they cost you DE in the pool. Fresh charge of DE included on completion.",
      cadence: "Clean every 4–6 months",
    },
    {
      id: "sand" as const,
      pill: "Lowest maintenance — until it isn't",
      title: "Sand filters",
      body:
        "Standard backwash and rinse, plus a chemical sand cleanse on schedule. If the bed has channeled or the laterals are damaged, we'll rebed the filter with fresh #20 silica sand at our cost.",
      cadence: "Deep clean once a year",
    },
  ];
  return (
    <section className="ff-section">
      <div className="ff-container">
        <div className="mb-12 grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="ff-eyebrow">Filter types we service</div>
            <h2 className="ff-h1 mt-3">
              Cartridge, DE, sand.
              <br />
              <span className="font-serif font-normal italic">All three — same flat rate.</span>
            </h2>
          </div>
          <div>
            <p className="ff-body-lg">
              Not sure what you have? Tell us the brand on the housing, send a photo, or take our
              30-second quiz. We&rsquo;ll identify it before we roll out.
            </p>
            <Link href="/quiz" className="ff-btn ff-btn--ghost mt-3.5">
              Take the filter quiz <Arrow />
            </Link>
          </div>
        </div>

        <div className="ff-grid-3">
          {types.map((t) => (
            <article
              key={t.id}
              className="ff-card padded flex flex-col"
              style={{ padding: 28, minHeight: 380 }}
            >
              <FilterIcon type={t.id} size={64} className="text-ff-brand" />
              <div className="mt-6 text-xs text-ff-ink-3" style={{ letterSpacing: "0.04em" }}>
                {t.pill}
              </div>
              <h3 className="ff-h3 mt-1.5">{t.title}</h3>
              <p className="ff-body mt-3 flex-1 text-[15px]">{t.body}</p>
              <div className="mt-5 flex items-center justify-between border-t border-ff-line pt-4">
                <span className="ff-mono text-xs text-ff-ink-3">{t.cadence}</span>
                <Link
                  href={`/book?type=${t.id}`}
                  className="ff-btn ff-btn--text text-sm font-semibold text-ff-brand-deep"
                >
                  Book {t.title.split(" ")[0]} <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const rows: Array<[string, string, string]> = [
    ["Filter cleaning price", "$75 flat", "$150 – $200"],
    ["Contract required", "No", "Often yes"],
    ["Upsells on visit", "Never", "Common"],
    ["Time on filter", "45–60 min", "20–30 min (rinse only)"],
    ["Inspection report", "Included", "Rarely"],
    ["Before / after photos", "Every visit", "No"],
    ["Confirm window", "1-hour text", "2–4 hour arrival"],
    ["Parts markup", "At cost", "20–40%"],
  ];
  return (
    <section className="ff-section tint">
      <div className="ff-container">
        <div className="mb-9 max-w-[720px]">
          <div className="ff-eyebrow">Specialist vs generalist</div>
          <h2 className="ff-h1 mt-3">
            Already have a pool guy you love?
            <br />
            <span className="font-serif font-normal italic">Keep them.</span>
          </h2>
          <p className="ff-body-lg mt-3.5">
            Add us for the quarterly filter clean and put $75 back in your pocket. We won&rsquo;t
            try to win you on a contract.
          </p>
        </div>

        <div className="ff-card overflow-hidden bg-ff-paper">
          <div className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-b border-ff-line px-7 py-5">
            <div className="ff-eyebrow text-ff-ink-3">What you get</div>
            <Logo small />
            <div className="text-[13px] font-medium text-ff-ink-3">Typical pool company</div>
          </div>
          {rows.map(([k, ours, theirs], i) => (
            <div
              key={i}
              className="grid grid-cols-[1.5fr_1fr_1fr] items-center px-7 py-4"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--ff-line-2)",
                background: i % 2 === 0 ? "transparent" : "oklch(98.5% 0.005 232 / 0.5)",
              }}
            >
              <div className="text-sm text-ff-ink-2">{k}</div>
              <div className="flex items-center gap-2 text-[15px] font-semibold text-ff-ink">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-ff-brand-soft text-[11px] text-ff-brand-deep">
                  ✓
                </span>
                {ours}
              </div>
              <div className="text-sm text-ff-ink-3">{theirs}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceArea({ cities }: { cities: City[] }) {
  const byCounty = cities.reduce<Record<string, City[]>>((acc, c) => {
    (acc[c.county] ??= []).push(c);
    return acc;
  }, {});

  return (
    <section id="service-area" className="ff-section">
      <div className="ff-container">
        <div className="mb-9 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="ff-eyebrow">Where we serve</div>
            <h2 className="ff-h1 mt-3">
              From Temecula
              <br />
              <span className="font-serif font-normal italic">to the South Bay.</span>
            </h2>
          </div>
          <div>
            <p className="ff-body-lg">
              We cover south Riverside County and every corner of San Diego County. Tap a city to
              see local availability and book.
            </p>
            <p className="ff-body mt-3.5 text-sm">
              Not seeing your city? Call{" "}
              <a href={`tel:${PHONE_TEL}`} className="ff-mono font-semibold text-ff-ink">
                {PHONE_DISPLAY}
              </a>{" "}
              — we flex the edges of our area on request when the route makes sense.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative overflow-hidden rounded-[20px] border border-ff-line aspect-square"
               style={{ background: "linear-gradient(160deg, oklch(94% 0.05 232) 0%, oklch(96% 0.04 92) 100%)" }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <pattern id="dotgrid" width="3" height="3" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="0.35" fill="oklch(60% 0.10 232 / 0.25)" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#dotgrid)" />
              <path
                d="M 100 0 L 100 100 L 48 100 C 52 92, 50 88, 54 80 C 56 72, 60 68, 56 60 C 50 52, 44 58, 38 50 C 34 44, 30 38, 32 32 C 36 26, 44 22, 42 14 C 38 8, 30 4, 28 0 Z"
                fill="oklch(98% 0.005 92 / 0.6)"
                stroke="oklch(70% 0.06 232 / 0.5)"
                strokeWidth="0.3"
                strokeDasharray="0.5 0.5"
              />
              <path
                d="M 6 4 C 14 2, 30 4, 38 12 C 50 22, 50 38, 62 52 C 70 62, 78 76, 64 92 C 50 100, 30 96, 14 86 C 4 76, 4 60, 6 40 Z"
                fill="oklch(60% 0.13 232 / 0.10)"
                stroke="oklch(55% 0.14 232)"
                strokeWidth="0.4"
                strokeDasharray="1.2 1"
              />
            </svg>
            {/* Pins — simplified set */}
            {[
              { name: "Temecula", x: 24, y: 18, size: 8 },
              { name: "Murrieta", x: 21, y: 14, size: 6 },
              { name: "Menifee", x: 16, y: 8, size: 4.5 },
              { name: "Wildomar", x: 13, y: 12, size: 4.5 },
              { name: "Lake Elsinore", x: 8, y: 6, size: 4.5 },
              { name: "Fallbrook", x: 35, y: 26, size: 4.5 },
              { name: "Vista", x: 38, y: 36, size: 4.5 },
              { name: "Oceanside", x: 30, y: 42, size: 6 },
              { name: "Carlsbad", x: 36, y: 50, size: 6 },
              { name: "Encinitas", x: 42, y: 56, size: 4.5 },
              { name: "Escondido", x: 50, y: 36, size: 6 },
              { name: "San Marcos", x: 44, y: 40, size: 4.5 },
              { name: "Poway", x: 58, y: 50, size: 4.5 },
              { name: "San Diego", x: 58, y: 72, size: 8 },
              { name: "El Cajon", x: 70, y: 64, size: 6 },
              { name: "Chula Vista", x: 62, y: 82, size: 6 },
              { name: "Coronado", x: 54, y: 80, size: 4.5 },
              { name: "Imperial Beach", x: 56, y: 88, size: 4.5 },
            ].map((p) => (
              <div
                key={p.name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <div
                  className="rounded-full bg-ff-brand"
                  style={{
                    width: p.size * 2,
                    height: p.size * 2,
                    boxShadow:
                      "0 0 0 4px oklch(94% 0.06 232), 0 2px 6px rgba(0,30,60,0.18)",
                  }}
                />
              </div>
            ))}
            <div className="absolute right-4 top-4 rounded-xl bg-ff-paper p-3 text-[11px] shadow-md">
              <div className="mb-2 font-semibold text-ff-ink-2" style={{ letterSpacing: "0.04em" }}>
                SERVICE ZONE
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-ff-ink-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-ff-brand" /> 24 cities · next-day slots
                </span>
                <span className="flex items-center gap-1.5 text-ff-ink-3">
                  <span className="h-2.5 w-2.5 rounded-sm border border-dashed border-ff-brand" /> Edges
                  — call to confirm
                </span>
              </div>
            </div>
          </div>

          <div className="ff-card p-7">
            {Object.entries(byCounty).map(([county, list]) => (
              <div key={county} className="mb-6 last:mb-0">
                <div className="mb-3.5 flex items-baseline justify-between">
                  <div className="ff-eyebrow">{county}</div>
                  <span className="ff-mono text-[11px] text-ff-ink-3">{list.length} cities</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {list
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/${c.slug}`}
                        className="rounded-md px-2.5 py-2 text-sm text-ff-ink-2 transition-colors hover:bg-ff-brand-tint hover:text-ff-brand-deep"
                      >
                        {c.name} →
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      quote:
        "Showed up on time, pulled my Pentair cartridges out, soaked them, brought them back so clean they looked new. Two pool companies before this just hosed them off.",
      who: "Marcus L.",
      where: "Temecula",
      filter: "Cartridge",
    },
    {
      quote:
        "Had a DE filter that nobody wanted to touch — grids are a pain. They took it apart on my driveway, cleaned every grid, recharged the DE, and were done in under an hour.",
      who: "Jennifer K.",
      where: "Carlsbad",
      filter: "DE",
    },
    {
      quote:
        "Honest, fast, no upsell pitch. They told me my manifold has another season in it and not to bother replacing yet. First pool tech in five years who didn't try to sell me something extra.",
      who: "Priya S.",
      where: "Encinitas",
      filter: "Cartridge",
    },
    {
      quote:
        "Booked online Sunday night, got a text Monday morning, cleaned Tuesday. Sand backwash on one pool, cartridge clean on the other. $150 for both. The last guy charged me $400.",
      who: "David R.",
      where: "San Diego",
      filter: "Sand + Cartridge",
    },
    {
      quote:
        "Best seventy-five bucks I've spent on the pool this year. Came out for a single cartridge clean and the photos came through to my phone before they had even left the property.",
      who: "Lisa M.",
      where: "Murrieta",
      filter: "Cartridge",
    },
    {
      quote:
        "Asked about a contract and they said they don't do those. Refreshing. Will be using them again in the spring.",
      who: "Tom W.",
      where: "Escondido",
      filter: "Cartridge",
    },
  ];

  return (
    <section className="ff-section deep">
      <div className="ff-container">
        <div className="mb-11 grid items-end gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="ff-eyebrow">Real reviews · real pools</div>
            <h2 className="ff-h1 mt-3 text-white">
              312 reviews,
              <br />
              <span className="font-serif font-normal italic text-ff-accent">4.9 average.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 justify-self-end">
            <div className="flex gap-1 text-ff-accent">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={20} />
              ))}
            </div>
            <span className="text-sm text-white/80">Verified on Google · Updated weekly</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-7"
            >
              <div className="flex gap-0.5 text-ff-accent">
                {[0, 1, 2, 3, 4].map((j) => (
                  <Star key={j} size={12} />
                ))}
              </div>
              <blockquote className="m-0 font-serif text-[15px] italic leading-[1.5] text-white">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
                <div>
                  <div className="text-sm font-semibold text-white">{r.who}</div>
                  <div className="text-xs text-[oklch(70%_0.02_230)]">{r.where}</div>
                </div>
                <span className="ff-mono rounded bg-white/[0.08] px-2 py-1 text-[11px] text-[oklch(85%_0.04_232)]">
                  {r.filter}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="ff-section">
      <div className="ff-container">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="ff-eyebrow">Frequently asked</div>
            <h2 className="ff-h1 mt-3">
              Questions worth answering
              <br />
              <span className="font-serif font-normal italic">before you book.</span>
            </h2>
            <div className="mt-8 rounded-2xl bg-ff-brand-tint p-6">
              <div className="ff-eyebrow">Still wondering?</div>
              <p className="mt-2.5 text-[15px] leading-[1.55] text-ff-ink-2">
                Text us a photo of your filter housing — we&rsquo;ll usually reply inside an hour
                with the model, what it needs, and your closest open slot.
              </p>
              <a
                href={`sms:${PHONE_TEL}`}
                className="ff-mono mt-3 inline-block text-sm font-semibold text-ff-brand-deep"
              >
                Text {PHONE_DISPLAY} →
              </a>
            </div>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const days = [
    { d: "Mon", n: "25", slots: 3 },
    { d: "Tue", n: "26", slots: 0 },
    { d: "Wed", n: "27", slots: 4 },
    { d: "Thu", n: "28", slots: 2 },
    { d: "Fri", n: "29", slots: 5 },
  ];
  return (
    <section
      className="relative overflow-hidden px-[clamp(22px,4vw,64px)] py-[clamp(56px,7vw,96px)] text-white"
      style={{ background: "var(--ff-brand)" }}
    >
      <div
        aria-hidden
        className="absolute -right-40 -top-44 h-[540px] w-[540px] rounded-full"
        style={{
          background: "radial-gradient(closest-side, oklch(92% 0.13 92 / 0.45), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="ff-container relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.18] px-3 py-1.5 text-xs font-semibold" style={{ letterSpacing: "0.04em" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-ff-accent" />
            Same-week slots open
          </div>
          <h2 className="ff-display mt-4 text-white">
            Book a <span className="serif">$75</span>
            <br />
            filter clean.
          </h2>
          <p className="ff-body-lg mt-4 max-w-[540px] text-[oklch(96%_0.03_232_/_0.95)]">
            Pick a time online, or pick up the phone. Same-week availability most of the year,
            next-day slots open more often than you&rsquo;d expect.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/book" className="ff-btn ff-btn--lg" style={{ background: "white", color: "var(--ff-ink)" }}>
              Book my filter clean <Arrow size={16} />
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="ff-btn ff-btn--lg"
              style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}
            >
              <span className="ff-mono">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
        <div
          className="rounded-[18px] border border-white/[0.16] p-6"
          style={{
            background: "rgba(0, 30, 60, 0.20)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="ff-eyebrow text-ff-accent">This week</div>
          <div className="mt-3.5 grid grid-cols-5 gap-1.5">
            {days.map((d) => (
              <div
                key={d.d}
                className="rounded-[10px] px-2 py-3 text-center"
                style={{
                  background: d.slots > 0 ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.03)",
                  opacity: d.slots > 0 ? 1 : 0.4,
                }}
              >
                <div className="text-[11px] text-[oklch(90%_0.03_232)]" style={{ letterSpacing: "0.05em" }}>
                  {d.d}
                </div>
                <div className="font-serif text-[22px] font-normal italic">{d.n}</div>
                <div
                  className="ff-mono mt-0.5 text-[10px]"
                  style={{ color: d.slots > 0 ? "var(--ff-accent)" : "oklch(80% 0.02 230)" }}
                >
                  {d.slots > 0 ? `${d.slots} open` : "full"}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm text-[oklch(94%_0.03_232_/_0.85)]">
            <span>14 slots open this week</span>
            <span className="font-semibold text-white">View next 4 weeks →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
