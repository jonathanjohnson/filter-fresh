"use client";

import { useState } from "react";

type ShareRailProps = {
  url: string;
  title: string;
};

export function ShareRail({ url, title }: ShareRailProps) {
  const [copied, setCopied] = useState(false);

  function shareHref(network: "x" | "linkedin" | "email"): string {
    const encUrl = encodeURIComponent(url);
    const encTitle = encodeURIComponent(title);
    switch (network) {
      case "x":
        return `https://twitter.com/intent/tweet?url=${encUrl}&text=${encTitle}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`;
      case "email":
        return `mailto:?subject=${encTitle}&body=${encUrl}`;
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard not available
    }
  }

  const links: Array<{ key: string; label: string; href?: string; onClick?: () => void }> = [
    { key: "x", label: "X", href: shareHref("x") },
    { key: "linkedin", label: "LinkedIn", href: shareHref("linkedin") },
    { key: "email", label: "Email", href: shareHref("email") },
    { key: "copy", label: copied ? "Copied" : "Copy link", onClick: copyLink },
  ];

  return (
    <aside aria-label="Share" className="text-xs text-ff-ink-3">
      <div className="ff-eyebrow mb-3">Share</div>
      <div className="flex flex-col gap-2">
        {links.map((l) =>
          l.href ? (
            <a
              key={l.key}
              href={l.href}
              target={l.key === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="rounded-md bg-ff-bg px-3 py-2 font-medium text-ff-ink-2 transition-colors hover:bg-ff-brand-tint hover:text-ff-brand-deep"
            >
              {l.label}
            </a>
          ) : (
            <button
              key={l.key}
              type="button"
              onClick={l.onClick}
              className="rounded-md bg-ff-bg px-3 py-2 text-left font-medium text-ff-ink-2 transition-colors hover:bg-ff-brand-tint hover:text-ff-brand-deep"
            >
              {l.label}
            </button>
          )
        )}
      </div>
    </aside>
  );
}
