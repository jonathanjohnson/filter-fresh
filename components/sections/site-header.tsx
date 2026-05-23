import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { LOGO_SRC } from "@/lib/brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Filter Fresh Pools — Home"
          className="flex items-center gap-2"
        >
          <Image
            src={LOGO_SRC}
            alt="Filter Fresh Pools"
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-md"
          />
          <span className="hidden font-semibold tracking-tight sm:inline">Filter Fresh</span>
        </Link>
        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/pool-filter-cleaning" className="hover:text-foreground">Service</Link>
          <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <Link href="/#service-area" className="hover:text-foreground">Service area</Link>
        </nav>
        <Link href="/book" className={buttonVariants({ size: "sm" })}>
          Book — $75
        </Link>
      </div>
    </header>
  );
}
