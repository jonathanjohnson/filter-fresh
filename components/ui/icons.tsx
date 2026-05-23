import * as React from "react";

export function Arrow({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 1.2 8.7 4.9l4 .4-3 2.7.9 4-3.6-2.2-3.6 2.2.9-4-3-2.7 4-.4L7 1.2Z" />
    </svg>
  );
}

export type FilterType = "cartridge" | "de" | "sand";

export function FilterIcon({
  type,
  size = 56,
  className,
}: {
  type: FilterType;
  size?: number;
  className?: string;
}) {
  if (type === "cartridge") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true" className={className}>
        <rect x="18" y="6" width="20" height="44" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 6v44M26 6v44M30 6v44M34 6v44" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="14" y="3" width="28" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="48" width="28" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === "de") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true" className={className}>
        <ellipse cx="28" cy="28" rx="18" ry="22" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M14 18c8-4 20-4 28 0M14 28c8-4 20-4 28 0M14 38c8-4 20-4 28 0"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
        <circle cx="28" cy="4" r="2" fill="currentColor" />
        <path d="M22 50h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="28" cy="10" rx="18" ry="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 10v36c0 2.8 8 5 18 5s18-2.2 18-5V10"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse cx="28" cy="46" rx="18" ry="5" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path
        d="M14 22c4 2 24 2 28 0M14 32c4 2 24 2 28 0M14 42c4 2 24 2 28 0"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  );
}
