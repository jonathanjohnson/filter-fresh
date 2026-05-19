import fs from "node:fs";
import path from "node:path";

export type ExtendedCity = {
  name: string;
  slug: string;
  county: string;
  tier: number;
  lat: number;
  lng: number;
  population: number;
  median_home_value: number;
  pool_density_note: string;
  neighborhoods: string[];
  zips: string[];
  local_landmark: string;
  climate_note: string;
};

const CITIES_DIR = path.join(process.cwd(), "content", "cities");

function isCityFile(filename: string): boolean {
  return (
    filename.endsWith(".json") &&
    !filename.startsWith("_") &&
    filename !== "cities.json"
  );
}

export function getAllExtendedCitySlugs(): string[] {
  if (!fs.existsSync(CITIES_DIR)) return [];
  return fs
    .readdirSync(CITIES_DIR)
    .filter(isCityFile)
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

export function getExtendedCity(slug: string): ExtendedCity | null {
  const filePath = path.join(CITIES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as ExtendedCity;
  if (parsed.slug !== slug) {
    throw new Error(
      `Slug mismatch in ${filePath}: file slug is "${parsed.slug}" but filename is "${slug}".`
    );
  }
  return parsed;
}

export function getAllExtendedCities(): ExtendedCity[] {
  return getAllExtendedCitySlugs()
    .map((slug) => getExtendedCity(slug))
    .filter((c): c is ExtendedCity => c !== null);
}
