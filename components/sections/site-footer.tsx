import Link from "next/link";
import Image from "next/image";
import { getCitiesByTier } from "@/lib/cities";
import { LOGO_SRC } from "@/lib/brand";

export function SiteFooter() {
  const tier1 = getCitiesByTier(1);
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={LOGO_SRC}
                alt="Filter Fresh Pools"
                width={36}
                height={36}
                className="h-9 w-9 rounded-md"
              />
              <div className="font-semibold">Filter Fresh Pools</div>
            </div>
            <p className="mt-3 font-display text-sm font-bold tracking-tight text-primary-navy">
              Clean Filter. Clearer Water. Healthier Pool.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              $75 flat pool filter cleaning. Temecula through San Diego County.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Service area</div>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {tier1.slice(0, 12).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="hover:text-foreground">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Company</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><Link href="/book" className="hover:text-foreground">Book service</Link></li>
              <li><Link href="/#faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Filter Fresh Pools. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
