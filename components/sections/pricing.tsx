import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const INCLUDED = [
  "Cartridge, DE, or sand filter",
  "Full disassembly and deep clean",
  "Reassembly and pressure check",
  "Before/after photos sent to you",
  "Recommendations — no upsells",
];

export function Pricing() {
  return (
    <section id="pricing" className="container py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Flat rate
        </div>
        <div className="mt-2 text-5xl font-bold tracking-tight">$75</div>
        <div className="mt-1 text-sm text-muted-foreground">
          Local market average is around $150. We charge half.
        </div>
        <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-sm">
          {INCLUDED.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <Link href="/book" className={`${buttonVariants({ size: "lg" })} mt-8 w-full sm:w-auto`}>
          Book a cleaning
        </Link>
      </div>
    </section>
  );
}
