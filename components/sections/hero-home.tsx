"use client";

import { useState } from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import { Arrow, FilterIcon, Star, type FilterType } from "@/components/ui/icons";

const SERVED_ZIPS = new Set([
  "92590", "92591", "92592", "92562", "92563", "92595", "92587", "92883",
  "92530", "92532", "92584", "92585", "92586",
  "92101", "92102", "92103", "92104", "92105", "92106", "92107", "92108",
  "92109", "92110", "92111", "92113", "92114", "92115", "92116", "92117",
  "92118", "92119", "92120", "92121", "92122", "92123", "92124", "92126",
  "92127", "92128", "92129", "92130", "92131",
  "91910", "91911", "91913", "91914", "91915", "91932", "91941", "91942",
  "91945", "91950",
  "92007", "92008", "92009", "92010", "92011", "92014", "92019", "92020",
  "92021", "92024", "92025", "92026", "92027", "92028", "92029", "92040",
  "92054", "92056", "92057", "92058", "92064", "92065", "92067", "92069",
  "92071", "92075", "92078", "92081", "92082", "92083", "92084", "92091",
  "91901",
]);

export function HeroHome() {
  const [filter, setFilter] = useState<FilterType>("cartridge");
  const [zip, setZip] = useState("");
  const [zipState, setZipState] = useState<"idle" | "yes" | "no">("idle");

  function checkZip(e: React.FormEvent) {
    e.preventDefault();
    if (zip.length < 5) return;
    setZipState(SERVED_ZIPS.has(zip) ? "yes" : "no");
  }

  return (
    <section className="relative overflow-hidden bg-ff-bg px-[clamp(22px,4vw,64px)] py-[clamp(56px,7vw,96px)] pt-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, oklch(94% 0.06 230 / 0.55), transparent 70%), radial-gradient(40% 40% at 5% 90%, oklch(96% 0.07 92 / 0.4), transparent 70%)",
        }}
      />
      <div className="ff-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-[56px]">
          <div>
            <Pill>Serving Temecula → San Diego County</Pill>
            <h1 className="ff-display mt-5">
              Pool filter cleaning,
              <br />
              <span className="text-ff-brand">$75 flat.</span>
              <br />
              <span className="serif">No upsells.</span>
            </h1>
            <p className="ff-body-lg mt-5 max-w-[520px]">
              We only clean pool filters &mdash; which is exactly why we can charge half what a
              full-service pool company does. Cartridge, DE, or sand. One truck, one technician,
              one flat price. Most jobs done in under an hour.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-1.5 text-ff-accent-deep">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} />
                ))}
                <span className="ml-1.5 text-sm font-semibold text-ff-ink">4.9</span>
                <span className="text-sm text-ff-ink-3">· 312 Google reviews</span>
              </div>
              <span className="h-4 w-px bg-ff-line" aria-hidden />
              <div className="text-sm text-ff-ink-2">
                <span className="ff-mono font-semibold text-ff-ink">1,400+</span> filters cleaned since 2023
              </div>
            </div>
          </div>

          <div className="ff-card overflow-hidden rounded-[20px]" style={{ boxShadow: "var(--ff-shadow-lg)" }}>
            <div className="flex items-center justify-between gap-3 border-b border-ff-line-2 px-6 pb-3.5 pt-5">
              <div>
                <div className="text-xs text-ff-ink-3">Get your filter cleaned</div>
                <div className="text-[17px] font-semibold tracking-tight">Book in under a minute.</div>
              </div>
              <div className="ff-mono rounded-md bg-ff-brand-soft px-2.5 py-1.5 text-sm font-semibold text-ff-brand">
                $75 flat
              </div>
            </div>

            <div className="p-6">
              <label className="ff-label">Filter type</label>
              <div className="mb-4 grid grid-cols-3 gap-2">
                {([
                  { id: "cartridge", label: "Cartridge", sub: "Most common" },
                  { id: "de", label: "DE", sub: "Grids" },
                  { id: "sand", label: "Sand", sub: "Backwash" },
                ] as Array<{ id: FilterType; label: string; sub: string }>).map((o) => {
                  const active = filter === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setFilter(o.id)}
                      className="rounded-xl border p-3 text-left transition-all duration-150"
                      style={{
                        borderColor: active ? "var(--ff-brand)" : "var(--ff-line)",
                        background: active ? "var(--ff-brand-soft)" : "var(--ff-paper)",
                      }}
                    >
                      <FilterIcon
                        type={o.id}
                        size={26}
                        className={active ? "text-ff-brand-deep" : "text-ff-ink-2"}
                      />
                      <div className="mt-1.5 text-sm font-semibold text-ff-ink">{o.label}</div>
                      <div className="text-[11px] text-ff-ink-3">{o.sub}</div>
                    </button>
                  );
                })}
              </div>

              <label className="ff-label" htmlFor="hero-zip">
                Your ZIP
              </label>
              <form onSubmit={checkZip} className="mb-3 flex gap-2">
                <input
                  id="hero-zip"
                  className="ff-input"
                  placeholder="e.g. 92592"
                  inputMode="numeric"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                    setZipState("idle");
                  }}
                />
                <button type="submit" className="ff-btn ff-btn--ghost h-12">
                  Check
                </button>
              </form>

              {zipState === "yes" && (
                <div
                  className="mb-3 flex gap-2 rounded-[10px] border p-[10px_12px] text-[13px]"
                  style={{
                    background: "oklch(95% 0.05 158 / 0.6)",
                    borderColor: "oklch(80% 0.10 158)",
                    color: "oklch(35% 0.10 158)",
                  }}
                >
                  <span>✓</span>
                  Yes &mdash; we serve <strong>{zip}</strong>. Next-day slots open.
                </div>
              )}
              {zipState === "no" && (
                <div
                  className="mb-3 rounded-[10px] border p-[10px_12px] text-[13px]"
                  style={{
                    background: "oklch(96% 0.04 60 / 0.6)",
                    borderColor: "oklch(82% 0.10 60)",
                    color: "oklch(38% 0.10 60)",
                  }}
                >
                  We don&rsquo;t routinely cover {zip} &mdash; but call us, we sometimes flex.
                </div>
              )}

              <Link
                href={`/book?type=${filter}${zip ? `&zip=${zip}` : ""}`}
                className="ff-btn ff-btn--primary ff-btn--lg w-full justify-center"
              >
                Continue to booking
                <Arrow size={16} />
              </Link>
              <div className="mt-3 flex justify-between text-xs text-ff-ink-3">
                <span>No deposit · Pay on completion</span>
                <span>~45 min on site</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
