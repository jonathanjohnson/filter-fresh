import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Semantic — wired to CSS variables in app/globals.css
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Brand scales pulled directly from the Filter Fresh Pools logo.
        // marine = the deep navy of the "Filter" wordmark and outer ring.
        // splash = the bright blue gradient of the "Fresh" wordmark and water mark.
        marine: {
          50: "#E8EEF7",
          100: "#C7D6EB",
          200: "#9AB3DA",
          300: "#6A8CC4",
          400: "#3F65AC",
          500: "#1A3D8F",
          600: "#143075",
          700: "#10245C",
          800: "#0B1A45",
          900: "#06112E",
          950: "#03081A",
        },
        splash: {
          50: "#E8F3FC",
          100: "#C5E1F7",
          200: "#94C8EF",
          300: "#5DACE6",
          400: "#2E8FE5",
          500: "#1A78D6",
          600: "#1462B8",
          700: "#114F94",
          800: "#0D3D70",
          900: "#092A4D",
          950: "#051628",
        },
        ink: {
          50: "#F4F7FB",
          100: "#E6ECF3",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#1E293B",
          800: "#0F172A",
          900: "#0B1220",
          950: "#060A14",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.15rem" }],
        sm: ["0.9375rem", { lineHeight: "1.4rem" }],
        base: ["1rem", { lineHeight: "1.55rem" }],
        lg: ["1.125rem", { lineHeight: "1.7rem" }],
        xl: ["1.25rem", { lineHeight: "1.8rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.015em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "3.25rem", letterSpacing: "-0.025em" }],
        "6xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(6, 17, 46, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(6, 17, 46, 0.08), 0 1px 2px -1px rgba(6, 17, 46, 0.06)",
        md: "0 4px 8px -2px rgba(6, 17, 46, 0.08), 0 2px 4px -2px rgba(6, 17, 46, 0.06)",
        lg: "0 10px 20px -6px rgba(6, 17, 46, 0.10), 0 4px 8px -4px rgba(6, 17, 46, 0.06)",
        pop: "0 6px 0 0 hsl(var(--primary))",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 240ms ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
