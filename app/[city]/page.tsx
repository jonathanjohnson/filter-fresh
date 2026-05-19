import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCitySlugs, getCityBySlug } from "@/lib/cities";
import { breadcrumbSchema, serviceSchemaForCity } from "@/lib/schema";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { LeadForm } from "@/components/sections/lead-form";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return allCitySlugs().map((city) => ({ city }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  const title = `$75 Pool Filter Cleaning in ${city.name}, ${shortCounty(city.county)}`;
  const description = `Flat-rate $75 pool filter cleaning in ${city.name}. Cartridge, DE, and sand. Same-week scheduling. Half the local market price.`;
  return {
    title,
    description,
    alternates: { canonical: `/${city.slug}` },
    openGraph: { title, description, url: `/${city.slug}` },
  };
}

function shortCounty(c: string) {
  return c.replace(" County", "");
}

export default function CityPage({ params }: { params: Params }) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";
  const crumbs = breadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: city.name, url: `${siteUrl}/${city.slug}` },
  ]);

  const intro =
    city.content_overrides?.intro ??
    `We clean cartridge, DE, and sand pool filters across ${city.name} for a flat $75 — about half what most pool techs charge. Most jobs done in under an hour, with before/after photos sent to your phone.`;

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

      <Hero
        cityName={city.name}
        subhead={city.content_overrides?.hero ?? undefined}
      />

      <section className="container pb-4">
        <p className="mx-auto max-w-3xl text-center text-muted-foreground">{intro}</p>
      </section>

      <HowItWorks />
      <Pricing />

      {city.neighborhoods.length > 0 && (
        <section className="border-t bg-secondary/30">
          <div className="container py-12">
            <h2 className="text-2xl font-bold tracking-tight">
              Neighborhoods we serve in {city.name}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {city.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="rounded-full border bg-card px-3 py-1 text-muted-foreground"
                >
                  {n}
                </li>
              ))}
            </ul>
            {city.zips.length > 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                ZIP codes served: {city.zips.join(", ")}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="container py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">
            Request service in {city.name}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tell us where the pool is — we'll text back to confirm.
          </p>
          <div className="mt-6">
            <LeadForm sourcePage={`/${city.slug}`} defaultCity={city.name} />
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
