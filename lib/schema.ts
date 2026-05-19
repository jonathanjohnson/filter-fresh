import type { City } from "./cities";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";

const BUSINESS = {
  name: "Filter Fresh",
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
