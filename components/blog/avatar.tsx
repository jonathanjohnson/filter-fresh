export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="inline-flex flex-none items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        letterSpacing: "0.02em",
        background:
          "linear-gradient(135deg, oklch(54% 0.13 232), oklch(38% 0.11 235))",
      }}
    >
      {initials}
    </span>
  );
}
