"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function ArticleToc({ items }: { items: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;
    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-[13px]">
      <div className="ff-eyebrow mb-3">In this article</div>
      <ol className="flex list-none flex-col gap-2.5 p-0">
        {items.map((it) => {
          const isActive = activeId === it.id;
          return (
            <li key={it.id} className={it.depth === 3 ? "pl-3" : ""}>
              <a
                href={`#${it.id}`}
                className={cn(
                  "block border-l-[1.5px] pl-3 leading-snug transition-colors",
                  isActive
                    ? "border-ff-brand font-semibold text-ff-brand-deep"
                    : "border-ff-line font-medium text-ff-ink-2 hover:text-ff-ink"
                )}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
