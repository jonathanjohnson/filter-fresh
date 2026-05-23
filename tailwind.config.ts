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
        // ---- Semantic tokens (wired to CSS vars in globals.css) ----
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        subtle: "hsl(var(--subtle-foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          navy: "#0F2A57",
          blue: "#1565D8",
          "blue-light": "#2E8AE6",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          sky: "#7FB8F0",
          splash: "#B8DAF5",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },

        // ---- Brand named tokens (raw hex, addressable directly) ----
        neutral: {
          white: "#FFFFFF",
          "off-white": "#F7FAFD",
          "soft-blue": "#EAF2FB",
        },
      },
      backgroundImage: {
        "cta-gradient": "var(--gradient-cta)",
        "hero-overlay": "var(--gradient-hero-overlay)",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        "2xl": "1rem",
        pill: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.15rem" }],
        sm: ["0.9375rem", { lineHeight: "1.4rem" }],
        base: ["1rem", { lineHeight: "1.55rem" }],
        lg: ["1.125rem", { lineHeight: "1.7rem" }],
        xl: ["1.25rem", { lineHeight: "1.8rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.015em" }],
        "3xl": [
          "1.875rem",
          { lineHeight: "2.25rem", letterSpacing: "-0.015em" },
        ],
        "4xl": [
          "2.25rem",
          { lineHeight: "2.5rem", letterSpacing: "-0.02em" },
        ],
        "5xl": [
          "3rem",
          { lineHeight: "3.25rem", letterSpacing: "-0.02em" },
        ],
        "6xl": [
          "3.75rem",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
      },
      letterSpacing: {
        tightest: "-0.025em",
        tighter: "-0.02em",
        tight: "-0.015em",
        wide: "0.05em",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(15, 42, 87, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(15, 42, 87, 0.08), 0 1px 2px -1px rgba(15, 42, 87, 0.06)",
        md: "0 4px 8px -2px rgba(15, 42, 87, 0.08), 0 2px 4px -2px rgba(15, 42, 87, 0.06)",
        lg: "0 10px 20px -6px rgba(15, 42, 87, 0.10), 0 4px 8px -4px rgba(15, 42, 87, 0.06)",
        card: "0 1px 3px rgba(15, 42, 87, 0.06), 0 8px 24px rgba(15, 42, 87, 0.04)",
        "card-hover":
          "0 4px 10px rgba(15, 42, 87, 0.08), 0 16px 32px rgba(15, 42, 87, 0.06)",
        "card-pop":
          "0 4px 14px rgba(15, 42, 87, 0.10), 0 24px 48px rgba(15, 42, 87, 0.08)",
        "btn-hover": "0 8px 20px rgba(21, 101, 216, 0.35)",
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
