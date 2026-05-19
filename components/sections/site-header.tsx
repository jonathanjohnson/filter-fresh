import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-6 w-6 rounded-full bg-primary" aria-hidden />
          Filter Fresh
        </Link>
        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/pool-filter-cleaning" className="hover:text-foreground">Service</Link>
          <Link href="/#service-area" className="hover:text-foreground">Service area</Link>
          <Link href="/#faq" className="hover:text-foreground">FAQ</Link>
        </nav>
        <Link href="/book" className={buttonVariants({ size: "sm" })}>
          Book — $75
        </Link>
      </div>
    </header>
  );
}
