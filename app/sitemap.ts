import type { MetadataRoute } from "next";
import { getAllCities } from "@/lib/cities";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/pool-filter-cleaning`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    { url: `${siteUrl}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
  const cityEntries = getAllCities().map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: c.tier === 1 ? 0.8 : 0.6,
  }));
  return [...base, ...cityEntries];
}
