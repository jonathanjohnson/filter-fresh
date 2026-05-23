import Link from "next/link";
import Image from "next/image";
import { getCitiesByTier } from "@/lib/cities";
import { LOGO_SRC } from "@/lib/brand";

export function SiteFooter() {
  const tier1 = getCitiesByTier(1);
  return (
    <footer className="border-t bg-secondary/40">
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
              <div className="font-semibold">Filter Fresh</div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Clean filter. Clearer water. Healthier pool. $75 flat from
              Temecula through San Diego County.
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
          © {new Date().getFullYear()} Filter Fresh. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
