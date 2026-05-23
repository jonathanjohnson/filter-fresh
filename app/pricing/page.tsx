import Link from "next/link";
import type { Metadata } from "next";
import { Pill } from "@/components/ui/pill";
import { Arrow } from "@/components/ui/icons";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";
const RECURRING_PRICE_DISPLAY = "$65";

export const metadata: Metadata = {
  title: "Pricing — $75 flat. Every filter. Every visit.",
  description:
    "Filter Fresh Pools charges $75 flat per pool filter cleaning. Half what full-service pool companies bill. Here is the math, line by line, plus optional add-ons and recurring savings.",
  alternates: { canonical: "/pricing" },
};

const PRICING_FAQS = [
  {
    q: "Is $75 too good to be true?",
    a: "No. It is what filter cleaning actually costs when the business has no overhead beyond one truck, one technician, and one service. The reasons are structural, not promotional. The price you book at is the price on the invoice.",
  },
  {
    q: "Why are you cheaper than my current pool company?",
    a: "Your current company bundles filter cleaning into a monthly service plan that also covers chemistry, brushing, vacuuming, and office staff. We have only one line item, so we have to be honest about its cost.",
  },
  {
    q: "Do you upcharge for DE filters?",
    a: "No. Cartridge, DE, and sand are all $75. DE takes us longer; it does not cost you more. The flat-rate model means we eat the variance and you do not have to do mental math when you book.",
  },
  {
    q: "Are there any add-on costs?",
    a: "Two scenarios where parts cost you separately: a replacement o-ring kit if your gauge or air bleed is leaking, and a sand bed media swap if your sand has channeled. Both are at our cost with no markup.",
  },
];

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
        name: "Recurring quarterly cleaning",
        price: "65.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/book`,
      },
    ],
  };
}

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(PRICING_FAQS)) }}
      />

      <PricingHero />
      <MathSection />
      <AddOns />
      <NeverCharge />
      <PricingFaqSection />
    </>
  );
}

function PricingHero() {
  const included = [
    "Commercial degreaser soak",
    "Hand-rinse, pleat by pleat",
    "Tear + manifold inspection",
    "Before & after photos",
    "Clean baseline PSI logged",
    "Inspection report by email",
    "Fresh DE charge (DE only)",
    "Pay only on completion",
  ];
  return (
    <section className="border-b border-ff-line bg-ff-bg px-[clamp(22px,4vw,64px)] py-[clamp(56px,7vw,80px)]">
      <div className="ff-container grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Pill>Pricing · No tiers, no surprises</Pill>
          <h1 className="ff-display mt-5">
            One price.
            <br />
            <span className="text-ff-brand">Every filter.</span>
            <br />
            <span className="serif">Every visit.</span>
          </h1>
          <p className="ff-body-lg mt-5 max-w-[480px]">
            We run one service and we charge one price. No tiers, no memberships, no
            &ldquo;preferred customer&rdquo; discount you have to ask for. If you ever pay more
            than $75 for a standard filter clean, it&rsquo;s because something out of the
            ordinary happened &mdash; and we asked you first.
          </p>
        </div>

        <div className="ff-card overflow-hidden rounded-[24px]" style={{ boxShadow: "var(--ff-shadow-lg)" }}>
          <div className="relative overflow-hidden bg-ff-brand p-9 pt-9 text-white">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div
              className="relative flex items-center gap-1.5 text-xs font-semibold uppercase text-ff-accent"
              style={{ letterSpacing: "0.08em" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> Filter Fresh Pools standard
            </div>
            <div className="relative mt-4 flex items-baseline gap-1">
              <span className="text-[28px] font-medium opacity-90">$</span>
              <span
                className="font-serif font-normal italic"
                style={{ fontSize: 156, lineHeight: 0.85, letterSpacing: "-0.04em" }}
              >
                75
              </span>
              <span className="mb-3.5 ml-2.5 text-lg opacity-70">· per visit</span>
            </div>
            <div className="relative mt-4 max-w-[320px] text-base opacity-95">
              Cartridge, DE, or sand. Soak, clean, inspect, pressure-test, manifold check.
            </div>
          </div>
          <div className="bg-ff-paper p-9 pt-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {included.map((b) => (
                <div key={b} className="flex items-start gap-2 text-sm text-ff-ink-2">
                  <span className="mt-[3px] inline-flex h-4 w-4 flex-none items-center justify-center rounded bg-ff-brand-soft text-[10px] font-bold text-ff-brand-deep">
                    ✓
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <Link
              href="/book"
              className="ff-btn ff-btn--primary ff-btn--lg mt-6 w-full justify-center"
            >
              Book a $75 clean <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type BarItem = { label: string; pct: number; amt: number };

function PriceBar({ items, tone }: { items: BarItem[]; tone: "brand" | "grey" }) {
  const ramp =
    tone === "brand"
      ? ["oklch(54% 0.13 232)", "oklch(62% 0.12 215)", "oklch(70% 0.11 200)", "oklch(80% 0.12 90)", "oklch(86% 0.14 92)"]
      : ["oklch(58% 0.015 240)", "oklch(64% 0.013 240)", "oklch(72% 0.011 240)", "oklch(80% 0.009 240)", "oklch(86% 0.008 240)"];
  return (
    <div className="mt-5">
      <div className="flex h-3 w-full overflow-hidden rounded-full border border-ff-line-2">
        {items.map((it, i) => (
          <div
            key={it.label}
            style={{
              width: `${it.pct}%`,
              background: ramp[i % ramp.length],
            }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2.5 text-ff-ink-2">
              <span
                className="h-2.5 w-2.5 flex-none rounded-sm"
                style={{ background: ramp[i % ramp.length] }}
              />
              {it.label}
            </span>
            <span className="ff-mono text-ff-ink">${it.amt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MathSection() {
  return (
    <section className="ff-section tint">
      <div className="ff-container">
        <div className="mb-9 grid items-end gap-10 lg:grid-cols-2">
          <div>
            <div className="ff-eyebrow">The math behind $75</div>
            <h2 className="ff-h1 mt-3">
              Where the other
              <br />
              <span className="font-serif font-normal italic">$125 goes.</span>
            </h2>
          </div>
          <p className="ff-body-lg">
            Full-service pool companies price a filter clean as part of a bigger contract &mdash;
            weekly chemicals, parts inventory, two-person trucks. That overhead has to land
            somewhere. It lands on a $150&ndash;$200 filter clean.
          </p>
        </div>

        <div className="ff-grid-2">
          <div className="ff-card padded">
            <div className="ff-mono text-xs font-semibold text-ff-brand-deep">
              FILTER FRESH POOLS · $75
            </div>
            <h3 className="ff-h3 mt-1.5">One service, one truck, one technician.</h3>
            <PriceBar
              items={[
                { label: "Labor (45 min)", pct: 48, amt: 36 },
                { label: "Travel + fuel", pct: 17, amt: 13 },
                { label: "Degreaser + DE", pct: 11, amt: 8 },
                { label: "Insurance + tools", pct: 11, amt: 8 },
                { label: "Profit", pct: 13, amt: 10 },
              ]}
              tone="brand"
            />
          </div>
          <div className="ff-card padded">
            <div className="ff-mono text-xs font-semibold text-ff-ink-3">
              TYPICAL POOL CO. · $175
            </div>
            <h3 className="ff-h3 mt-1.5">Two-person truck, weekly route, parts inventory.</h3>
            <PriceBar
              items={[
                { label: "Two-person labor (35 min)", pct: 40, amt: 70 },
                { label: "Drive + truck cost", pct: 17, amt: 30 },
                { label: "Chemical inventory", pct: 11, amt: 20 },
                { label: "Office + dispatch", pct: 14, amt: 25 },
                { label: "Profit margin", pct: 18, amt: 30 },
              ]}
              tone="grey"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AddOns() {
  const addons = [
    { name: "Recurring quarterly", price: RECURRING_PRICE_DISPLAY, body: "$10 off every visit when we put you on a 90-day cadence. Cancel any time, no fee." },
    { name: "Replacement o-ring kit", price: "Included", body: "Air-bleed and gauge o-rings replaced free if we find them leaking." },
    { name: "Pressure gauge swap", price: "$12 + 0", body: "New gauge at our cost, no labor charge if we are already on site." },
    { name: "Fresh DE charge", price: "Included", body: "On DE systems, a full manufacturer-spec recharge is part of the $75." },
    { name: "Sand bed replacement", price: "$150–300", body: "Materials and labor for #20 silica when your bed has channeled. Quoted before we open the bag." },
    { name: "Manifold replacement", price: "At cost", body: "We order from our distributor and install on the next visit at zero markup." },
  ];
  return (
    <section className="ff-section">
      <div className="ff-container">
        <div className="mb-9 max-w-[720px]">
          <div className="ff-eyebrow">Optional add-ons</div>
          <h2 className="ff-h1 mt-3">
            Six things we&rsquo;ll do at cost.{" "}
            <span className="font-serif font-normal italic">Never marked up.</span>
          </h2>
        </div>
        <div className="ff-grid-3">
          {addons.map((a) => {
            const isIncluded = a.price === "Included";
            return (
              <div key={a.name} className="ff-card padded">
                <h3 className="ff-h4">{a.name}</h3>
                <div
                  className={`ff-mono mt-2 text-base font-semibold ${
                    isIncluded ? "text-ff-success" : "text-ff-ink"
                  }`}
                >
                  {a.price}
                </div>
                <p className="ff-body mt-3 text-sm">{a.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NeverCharge() {
  const rows = [
    ["Trip fee", "We do not charge for showing up. Inside our service area, the drive is on us.", "$0"],
    ["Weekend surcharge", "Saturday is the same price as Tuesday.", "$0"],
    ["Cancellation", "Move or cancel up to two hours before with one text. No fee.", "$0"],
    ["Cartridge identification", "Send a photo, we tell you what you have. Pre-visit, no charge.", "$0"],
    ["Pressure gauge install", "If we find a dead gauge during the cleaning, the labor is free.", "$0"],
    ["O-ring swap (single)", "One air-bleed or drain o-ring per visit, replaced no questions.", "$0"],
    ["Photo report", "Before/after photos plus a written inspection summary by email.", "$0"],
  ];
  return (
    <section className="ff-section tint">
      <div className="ff-container">
        <div className="mb-9 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="ff-eyebrow">What we never charge for</div>
            <h2 className="ff-h1 mt-3">
              Seven line items
              <br />
              <span className="font-serif font-normal italic">we don&rsquo;t bill.</span>
            </h2>
          </div>
          <div className="ff-card padded">
            {rows.map(([label, body, price], i) => (
              <div
                key={label}
                className="grid grid-cols-[minmax(120px,160px)_1fr_56px] items-baseline gap-4 py-3"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--ff-line-2)" }}
              >
                <div className="text-sm font-semibold text-ff-ink">{label}</div>
                <div className="ff-body text-sm">{body}</div>
                <div className="ff-mono text-right text-sm font-semibold text-ff-success">{price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingFaqSection() {
  return (
    <section className="ff-section">
      <div className="ff-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="ff-eyebrow">Pricing FAQ</div>
            <h2 className="ff-h1 mt-3">
              Direct answers
              <br />
              <span className="font-serif font-normal italic">no spin.</span>
            </h2>
            <div className="mt-8 rounded-2xl bg-ff-brand-tint p-6">
              <div className="ff-eyebrow">Still wondering?</div>
              <p className="mt-2.5 text-[15px] leading-[1.55] text-ff-ink-2">
                Text us your filter housing photo &mdash; we&rsquo;ll quote the visit and confirm
                a window inside an hour during business hours.
              </p>
              <a
                href={`sms:${PHONE_TEL}`}
                className="ff-mono mt-3 inline-block text-sm font-semibold text-ff-brand-deep"
              >
                Text {PHONE_DISPLAY} →
              </a>
            </div>
          </div>
          <div>
            {PRICING_FAQS.map((f, i) => (
              <div
                key={f.q}
                className="border-t border-ff-line px-1 py-5 last:border-b"
                style={{ borderTopWidth: i === 0 ? 1 : 1 }}
              >
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ff-ink">
                  {f.q}
                </h3>
                <p className="ff-body mt-2.5 max-w-[640px] text-[15px]">{f.a}</p>
              </div>
            ))}
            <div className="mt-10">
              <Link href="/book" className="ff-btn ff-btn--primary ff-btn--lg">
                Book a $75 clean <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
