"use client";

import { useState } from "react";

export function FaqAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(isOpen ? null : i)}
            className="block w-full border-t border-ff-line px-1 py-5 text-left last:border-b"
          >
            <div className="flex items-center justify-between gap-6">
              <h3 className="m-0 text-[18px] font-semibold tracking-[-0.01em] text-ff-ink">
                {it.q}
              </h3>
              <div
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full transition-all duration-200"
                style={{
                  background: isOpen ? "var(--ff-brand)" : "var(--ff-brand-tint)",
                  color: isOpen ? "white" : "var(--ff-brand-deep)",
                }}
              >
                {isOpen ? "−" : "+"}
              </div>
            </div>
            <div
              className="overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-pool"
              style={{
                maxHeight: isOpen ? 200 : 0,
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? 12 : 0,
              }}
            >
              <p className="ff-body max-w-[580px] text-[15px]">{it.a}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
