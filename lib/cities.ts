import citiesData from "@/content/cities/cities.json";
import zipsData from "@/content/zips/zips.json";

export type City = {
  slug: string;
  name: string;
  county: string;
  tier: number;
  lat: number | null;
  lng: number | null;
  population: number | null;
  neighborhoods: string[];
  zips: string[];
  content_overrides?: {
    hero?: string;
    intro?: string;
    landmarks?: string[];
  };
};

const CITIES = citiesData as City[];
const ZIPS = zipsData as Record<string, string>;

export function getAllCities(): City[] {
  return CITIES;
}

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCitiesByTier(tier: number): City[] {
  return CITIES.filter((c) => c.tier === tier);
}

export function getCityForZip(zip: string): City | undefined {
  const slug = ZIPS[zip];
  return slug ? getCityBySlug(slug) : undefined;
}

export function allCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}
