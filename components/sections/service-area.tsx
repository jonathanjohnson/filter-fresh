import Link from "next/link";
import { getAllCities } from "@/lib/cities";

export function ServiceArea() {
  const cities = getAllCities().sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name));
  return (
    <section id="service-area" className="border-t bg-secondary/30">
      <div className="container py-16">
        <h2 className="text-3xl font-bold tracking-tight">Service area</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          We serve Temecula and south Riverside County, plus every city in San Diego County.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3 md:grid-cols-4">
          {cities.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="hover:text-primary">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
