import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";
import { Arrow } from "@/components/ui/icons";
import { getCitiesByTier } from "@/lib/cities";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/utils";

export function SiteFooter() {
  const tier1 = getCitiesByTier(1)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <footer className="ff-footer">
      <div className="ff-container">
        <div className="cols">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <LogoMark size={28} />
              <span className="text-lg font-bold tracking-tight">Filter Fresh Pools</span>
            </div>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-white/75">
              $75 flat pool filter cleaning. Half the going rate, from Temecula through
              San Diego County.
            </p>
            <p className="mt-4 font-serif text-base italic text-white/85">
              Clean filter. Clearer water. Healthier pool.
            </p>
            <div className="mt-5 flex gap-2">
              <Link href="/book" className="ff-btn ff-btn--primary ff-btn--sm">
                Book a clean
                <Arrow />
              </Link>
            </div>
          </div>
          <div className="col">
            <h4>Service area</h4>
            {tier1.slice(0, 8).map((c) => (
              <Link key={c.slug} href={`/${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="col">
            <h4>Company</h4>
            <Link href="/pool-filter-cleaning">Pool filter cleaning</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/book">Book service</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div className="col">
            <h4>Reach us</h4>
            <a href={`tel:${PHONE_TEL}`}>
              <span className="ff-mono">{PHONE_DISPLAY}</span>
            </a>
            <a href="mailto:hello@filterfreshpools.com">hello@filterfreshpools.com</a>
            <Link href="/book">Text us anytime</Link>
            <div className="mt-3 inline-block rounded-md bg-white/[0.06] px-3 py-2 text-xs text-white/80">
              Mon–Sat · 7am–6pm PT
            </div>
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Filter Fresh Pools · License #FF-2023-PCL</span>
          <span>
            Made on a sunny day in Temecula <span aria-hidden>☀</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
