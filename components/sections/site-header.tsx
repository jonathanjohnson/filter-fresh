import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Arrow } from "@/components/ui/icons";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/utils";

const NAV = [
  { href: "/pool-filter-cleaning", label: "Service" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#service-area", label: "Service area" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="ff-header">
      <div className="flex items-center gap-7">
        <Logo />
      </div>
      <nav className="ff-nav hidden md:flex">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <a
          href={`tel:${PHONE_TEL}`}
          className="ff-mono hidden text-sm font-medium text-ff-ink-2 hover:text-ff-ink sm:inline"
        >
          {PHONE_DISPLAY}
        </a>
        <Link href="/book" className="ff-btn ff-btn--primary ff-btn--sm">
          Book — $75
          <Arrow />
        </Link>
      </div>
    </header>
  );
}
