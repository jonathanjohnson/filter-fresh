import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pill } from "@/components/ui/pill";
import { Arrow, Star } from "@/components/ui/icons";
import { allCitySlugs, getCityBySlug } from "@/lib/cities";
import { breadcrumbSchema, serviceSchemaForCity } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/utils";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return allCitySlugs().map((city) => ({ city }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  const shortCounty = city.county.replace(" County", "");
  const title = `$75 pool filter cleaning in ${city.name}, ${shortCounty}`;
  const description = `Flat-rate $75 pool filter cleaning across ${city.name}. Cartridge, DE, and sand. Same-week scheduling. Half the local market price.`;
  return {
    title,
    description,
    alternates: { canonical: `/${city.slug}` },
    openGraph: { title, description, url: `/${city.slug}` },
  };
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";

export default function CityPage({ params }: { params: Params }) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  const crumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: city.name, url: `${SITE_URL}/${city.slug}` },
  ]);

  const intro =
    city.content_overrides?.intro ??
    `We clean cartridge, DE, and sand pool filters across ${city.name} for a flat $75 — about half what most pool techs charge. Most jobs done in under an hour, with before-and-after photos sent to your phone.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaForCity(city)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* Hero */}
      <section className="border-b border-ff-line bg-ff-bg px-[clamp(22px,4vw,64px)] py-[clamp(48px,6vw,72px)]">
        <div className="ff-container">
          <div className="text-sm text-ff-ink-3">
            <Link href="/#service-area" className="hover:text-ff-ink">
              Service area
            </Link>{" "}
            / {city.county.replace(" County", "")} /{" "}
            <span className="text-ff-ink-2">{city.name}</span>
          </div>
          <div className="mt-5 grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Pill>
                Serving <strong>{city.name}</strong>
                {city.zips[0] && <> · {city.zips[0]}</>}
              </Pill>
              <h1 className="ff-display mt-4">
                Pool filter cleaning,
                <br />
                <span className="text-ff-brand">$75 flat</span>{" "}
                <span className="serif">in {city.name}</span>.
              </h1>
              <p className="ff-body-lg mt-4 max-w-[560px]">{intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/book" className="ff-btn ff-btn--primary ff-btn--lg">
                  Book a $75 cleaning <Arrow />
                </Link>
                <a href={`tel:${PHONE_TEL}`} className="ff-btn ff-btn--ghost ff-btn--lg">
                  <span className="ff-mono">{PHONE_DISPLAY}</span>
                </a>
              </div>
              <div className="mt-5 flex items-center gap-2 text-ff-accent-deep">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} />
                ))}
                <span className="ml-1.5 text-sm text-ff-ink-2">4.9 · 312 reviews · same-week slots</span>
              </div>
            </div>

            <div className="ff-card padded">
              <div className="ff-eyebrow">{city.name} this week</div>
              <div className="mt-3 grid grid-cols-5 gap-1.5">
                {[
                  { d: "Mon", n: "25", open: 3 },
                  { d: "Tue", n: "26", open: 0 },
                  { d: "Wed", n: "27", open: 4 },
                  { d: "Thu", n: "28", open: 2 },
                  { d: "Fri", n: "29", open: 5 },
                ].map((d) => (
                  <div
                    key={d.d}
                    className="rounded-[10px] border border-ff-line-2 px-2 py-3 text-center"
                    style={{ opacity: d.open > 0 ? 1 : 0.5 }}
                  >
                    <div className="text-[11px] uppercase text-ff-ink-3">{d.d}</div>
                    <div className="font-serif text-xl italic text-ff-ink">{d.n}</div>
                    <div
                      className="ff-mono mt-0.5 text-[10px]"
                      style={{ color: d.open > 0 ? "var(--ff-brand)" : "var(--ff-ink-3)" }}
                    >
                      {d.open > 0 ? `${d.open} open` : "full"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-xs text-ff-ink-3">
                <span>Average drive: 22 minutes</span>
                <span className="font-semibold text-ff-brand-deep">14 slots this week →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service summary + link to guide */}
      <section className="ff-section">
        <div className="ff-container max-w-[760px]">
          <p className="ff-body-lg">
            New to filter service? Read our{" "}
            <Link href="/pool-filter-cleaning" className="font-semibold text-ff-brand-deep hover:underline">
              complete guide to pool filter cleaning
            </Link>{" "}
            for the full breakdown of cartridge, DE, and sand systems.
          </p>
        </div>
      </section>

      {/* Neighborhoods */}
      {city.neighborhoods.length > 0 && (
        <section className="ff-section tint">
          <div className="ff-container">
            <div className="ff-eyebrow">Neighborhoods we serve</div>
            <h2 className="ff-h2 mt-3">Across every {city.name} subdivision</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {city.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="ff-card rounded-pill px-4 py-2 text-sm font-medium text-ff-ink-2"
                >
                  {n}
                </li>
              ))}
            </ul>
            {city.zips.length > 0 && (
              <p className="ff-small mt-6">
                ZIP codes served:{" "}
                <span className="ff-mono">{city.zips.join(", ")}</span>
              </p>
            )}
          </div>
        </section>
      )}

      {/* CTA card */}
      <section className="ff-section">
        <div className="ff-container">
          <div
            className="ff-card overflow-hidden rounded-[20px] p-10 text-center"
            style={{ boxShadow: "var(--ff-shadow-lg)" }}
          >
            <Pill>One service. One price.</Pill>
            <h2 className="ff-h1 mt-4">
              Request service{" "}
              <span className="font-serif font-normal italic">in {city.name}</span>.
            </h2>
            <p className="ff-body-lg mx-auto mt-3 max-w-[520px]">
              Tell us where the pool is — we&rsquo;ll text back to confirm a window inside an hour
              during business hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/book" className="ff-btn ff-btn--primary ff-btn--lg">
                Book {city.name} service <Arrow />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="ff-btn ff-btn--ghost ff-btn--lg">
                <span className="ff-mono">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
