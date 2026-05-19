import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PRICE_DISPLAY } from "@/lib/utils";

type HeroProps = {
  cityName?: string;
  headline?: string;
  subhead?: string;
};

export function Hero({ cityName, headline, subhead }: HeroProps) {
  const title =
    headline ??
    (cityName
      ? `${PRICE_DISPLAY} pool filter cleaning in ${cityName}`
      : `${PRICE_DISPLAY} pool filter cleaning — half the local rate`);

  const sub =
    subhead ??
    "Cartridge, DE, and sand filters cleaned, inspected, and reinstalled. Most jobs done in under an hour.";

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Flat rate — no upsells
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{sub}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book" className={buttonVariants({ size: "lg" })}>
            Book {PRICE_DISPLAY} cleaning
          </Link>
          <Link href="/#how-it-works" className={buttonVariants({ size: "lg", variant: "outline" })}>
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}
