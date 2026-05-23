import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  small,
  href = "/",
  className,
}: {
  small?: boolean;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Filter Fresh Pools — Home"
      className={cn("inline-flex items-center gap-2.5 font-bold tracking-tight text-ff-ink", className)}
      style={{ fontSize: small ? 16 : 18, letterSpacing: "-0.02em" }}
    >
      <LogoMark size={small ? 24 : 28} />
      <span>
        Filter&nbsp;Fresh{small ? "" : " Pools"}
      </span>
    </Link>
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  // CSS-built mark: rounded square + two water lines, per design spec.
  const half = size / 2;
  return (
    <span
      aria-hidden="true"
      className="relative inline-block flex-none rounded-lg bg-ff-brand shadow-glow"
      style={{
        width: size,
        height: size,
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.4) inset, 0 4px 10px -4px oklch(54% 0.13 232)",
      }}
    >
      <span
        className="absolute rounded-sm bg-white/90"
        style={{
          left: 4,
          right: 4,
          top: half - 5,
          height: 2.5,
          transform: "scaleY(0.8)",
        }}
      />
      <span
        className="absolute rounded-sm bg-white/90"
        style={{
          left: 4,
          right: 4,
          top: half + 1,
          height: 2.5,
          transform: "scaleY(0.8)",
        }}
      />
    </span>
  );
}
