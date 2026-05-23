import * as React from "react";
import { cn } from "@/lib/utils";

export function Pill({
  children,
  tone,
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "ink";
  className?: string;
}) {
  return (
    <span className={cn("ff-pill", className)} data-tone={tone === "default" ? undefined : tone}>
      <span className="dot" aria-hidden="true" />
      {children}
    </span>
  );
}
