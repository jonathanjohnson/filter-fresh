import type { City } from "./cities";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";

const BUSINESS = {
  name: "Filter Fresh Pools",
  url: siteUrl,
  telephone: "+1-000-000-0000",
  priceRange: "$$",
  areaServedCounties: ["Riverside County", "San Diego County"],
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#business`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    description:
      "Pool filter cleaning service for $75 flat. Serving Temecula through all of San Diego County.",
    areaServed: BUSINESS.areaServedCounties.map((county) => ({
      "@type": "AdministrativeArea",
      name: county,
    })),
    makesOffer: {
      "@type": "Offer",
      name: "Pool Filter Cleaning",
      price: "75.00",
      priceCurrency: "USD",
    },
  };
}

export function serviceSchemaForCity(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Pool Filter Cleaning",
    provider: { "@id": `${siteUrl}#business` },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.county },
      ...(city.lat && city.lng
        ? { geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lng } }
        : {}),
    },
    offers: {
      "@type": "Offer",
      price: "75.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function servicePageSchema(cities: City[]) {
  const counties = Array.from(new Set(cities.map((c) => c.county)));
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/pool-filter-cleaning#service`,
    name: "Pool Filter Cleaning",
    serviceType: "Pool Filter Cleaning",
    description:
      "Specialist pool filter cleaning for cartridge, DE, and sand systems. Includes degreaser soak, hand rinse, full inspection, manifold check, and pressure test. Flat $75.",
    provider: { "@id": `${siteUrl}#business` },
    areaServed: [
      ...counties.map((county) => ({
        "@type": "AdministrativeArea" as const,
        name: county,
      })),
      ...cities.map((c) => ({
        "@type": "City" as const,
        name: c.name,
        containedInPlace: { "@type": "AdministrativeArea", name: c.county },
      })),
    ],
    offers: {
      "@type": "Offer",
      price: "75.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/book`,
      itemOffered: { "@type": "Service", name: "Pool Filter Cleaning" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pool Filter Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          price: "75.00",
          priceCurrency: "USD",
          itemOffered: { "@type": "Service", name: "Cartridge filter cleaning" },
        },
        {
          "@type": "Offer",
          price: "75.00",
          priceCurrency: "USD",
          itemOffered: { "@type": "Service", name: "DE filter cleaning" },
        },
        {
          "@type": "Offer",
          price: "75.00",
          priceCurrency: "USD",
          itemOffered: { "@type": "Service", name: "Sand filter service" },
        },
      ],
    },
  };
}

export function homepageBusinessSchema(cities: City[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#business`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    description:
      "Pool filter cleaning specialist serving Temecula, Murrieta, and all of San Diego County. Cartridge, DE, and sand filters cleaned, inspected, and pressure-tested for a flat $75.",
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: c.name,
      containedInPlace: { "@type": "AdministrativeArea", name: c.county },
      ...(c.lat && c.lng
        ? { geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng } }
        : {}),
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pool Filter Cleaning",
      itemListElement: [
        {
          "@type": "Offer",
          price: "75.00",
          priceCurrency: "USD",
          itemOffered: { "@type": "Service", name: "Cartridge filter cleaning" },
        },
        {
          "@type": "Offer",
          price: "75.00",
          priceCurrency: "USD",
          itemOffered: { "@type": "Service", name: "DE filter cleaning" },
        },
        {
          "@type": "Offer",
          price: "75.00",
          priceCurrency: "USD",
          itemOffered: { "@type": "Service", name: "Sand filter rinse" },
        },
      ],
    },
  };
}

export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
