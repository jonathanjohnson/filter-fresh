"use client";

import { useEffect, useRef, useState } from "react";
import { FilterIcon } from "@/components/ui/icons";

const STEPS = [
  {
    n: "01",
    title: "Degreaser soak",
    body: "Every cartridge or grid set goes into a commercial filter degreaser. Sunscreen, body oils, and biofilm release at the fiber level — something a hose simply can't reach.",
  },
  {
    n: "02",
    title: "Deep clean",
    body: "High-pressure rinse, pleat by pleat, by hand. DE grids get the same attention. Sand laterals are inspected and rinsed before the bed is rebuilt.",
  },
  {
    n: "03",
    title: "Inspection",
    body: "We look at every element for tears, broken bands, collapsed cores, and pleat damage. You get photos of anything that needs your attention.",
  },
  {
    n: "04",
    title: "Pressure test",
    body: "System back on, lid sealed, air bled. We log the new clean baseline PSI so you have a number to watch over the next 90 days.",
  },
  {
    n: "05",
    title: "Manifold check",
    body: "DE manifolds, top heads, and bottom hubs inspected for hairline cracks. We'll tell you what needs replacing — and offer to order parts at our cost.",
  },
];

export function HowItWorksScrubber() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, 2800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  return (
    <section className="ff-section tint pt-[clamp(72px,9vw,110px)]">
      <div className="ff-container">
        <div className="mb-11 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[620px]">
            <div className="ff-eyebrow">How $75 actually works</div>
            <h2 className="ff-h1 mt-3">
              Five steps, every visit.{" "}
              <span className="font-serif font-normal italic">Always.</span>
            </h2>
            <p className="ff-body-lg mt-3.5 max-w-[540px]">
              Hose-and-rinse competitors stop after step two. We do the entire list whether
              you ask us to or not.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="ff-btn ff-btn--ghost ff-btn--sm bg-ff-paper"
            >
              {playing ? "⏸ Pause" : "▶ Play"}
            </button>
            <span className="ff-mono text-xs text-ff-ink-3">
              {String(active + 1).padStart(2, "0")} / 05
            </span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="relative mb-7 h-1 rounded bg-[oklch(86%_0.025_232)]">
              <div
                className="absolute left-0 top-0 h-full rounded bg-ff-brand transition-[width] duration-[450ms] ease-pool"
                style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
              />
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPlaying(false);
                  }}
                  aria-label={`Step ${i + 1}`}
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-[3px] border-ff-brand-tint p-0 transition-colors"
                  style={{
                    left: `${(i / (STEPS.length - 1)) * 100}%`,
                    background: i <= active ? "var(--ff-brand)" : "oklch(86% 0.025 232)",
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              {STEPS.map((s, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setPlaying(false);
                    }}
                    className="block w-full rounded-xl border p-[18px_22px] text-left transition-all duration-200"
                    style={{
                      borderColor: isActive ? "var(--ff-brand)" : "transparent",
                      background: isActive ? "var(--ff-paper)" : "transparent",
                      boxShadow: isActive ? "var(--ff-shadow-md)" : "none",
                    }}
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span
                        className="ff-mono text-xs font-semibold"
                        style={{
                          color: isActive ? "var(--ff-brand)" : "var(--ff-ink-3)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {s.n}
                      </span>
                      <h3 className="ff-h4 flex-1" style={{ color: isActive ? "var(--ff-ink)" : "var(--ff-ink-2)" }}>
                        {s.title}
                      </h3>
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: isActive ? 200 : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 10 : 0,
                      }}
                    >
                      <p className="ff-body ml-8 pr-3 text-sm">{s.body}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-[90px] lg:self-start">
            <div
              className="ff-placeholder deep relative h-[420px] overflow-hidden rounded-[20px] lg:h-[520px]"
              style={{ boxShadow: "var(--ff-shadow-lg)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <FilterIcon
                  type={active < 2 ? "cartridge" : active < 4 ? "de" : "sand"}
                  size={220}
                  className="text-[oklch(94%_0.05_232_/_0.85)]"
                />
              </div>
              <div className="absolute left-[18px] top-[18px] flex gap-1.5">
                <span className="lbl">
                  {STEPS[active].n} · {STEPS[active].title}
                </span>
              </div>
              <div className="absolute bottom-[18px] left-[18px] right-[18px] flex items-end justify-between text-[oklch(94%_0.05_230)]">
                <div className="font-mono text-[13px]">
                  IMG · pool-tech-{(active + 1).toString().padStart(2, "0")}.jpg
                </div>
                <div className="font-mono text-xs opacity-80">shot on site · El Cajon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
