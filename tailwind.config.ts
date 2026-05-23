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
      screens: { "2xl": "1180px" },
    },
    extend: {
      colors: {
        // ---- Pool Day brand (OKLCH source of truth) ----
        ff: {
          brand: "oklch(54% 0.13 232 / <alpha-value>)",
          "brand-deep": "oklch(38% 0.11 235 / <alpha-value>)",
          "brand-tint": "oklch(96% 0.025 232 / <alpha-value>)",
          "brand-soft": "oklch(92% 0.045 232 / <alpha-value>)",
          ink: "oklch(22% 0.025 240 / <alpha-value>)",
          "ink-2": "oklch(40% 0.02 240 / <alpha-value>)",
          "ink-3": "oklch(58% 0.015 240 / <alpha-value>)",
          line: "oklch(88% 0.01 240 / <alpha-value>)",
          "line-2": "oklch(94% 0.008 240 / <alpha-value>)",
          bg: "oklch(98% 0.006 95 / <alpha-value>)",
          paper: "#ffffff",
          accent: "oklch(86% 0.14 92 / <alpha-value>)",
          "accent-deep": "oklch(70% 0.16 65 / <alpha-value>)",
          success: "oklch(62% 0.13 158 / <alpha-value>)",
          danger: "oklch(58% 0.18 25 / <alpha-value>)",
        },

        // ---- Semantic mirrors (so shadcn-style utilities keep working) ----
        background: "oklch(98% 0.006 95 / <alpha-value>)",
        foreground: "oklch(22% 0.025 240 / <alpha-value>)",
        border: "oklch(88% 0.01 240 / <alpha-value>)",
        input: "oklch(88% 0.01 240 / <alpha-value>)",
        ring: "oklch(54% 0.13 232 / <alpha-value>)",
        card: {
          DEFAULT: "#ffffff",
          foreground: "oklch(22% 0.025 240 / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(54% 0.13 232 / <alpha-value>)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "oklch(96% 0.025 232 / <alpha-value>)",
          foreground: "oklch(22% 0.025 240 / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(96% 0.025 232 / <alpha-value>)",
          foreground: "oklch(40% 0.02 240 / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(92% 0.045 232 / <alpha-value>)",
          foreground: "oklch(38% 0.11 235 / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(58% 0.18 25 / <alpha-value>)",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "oklch(62% 0.13 158 / <alpha-value>)",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "oklch(86% 0.14 92 / <alpha-value>)",
          foreground: "oklch(30% 0.05 80)",
        },
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "10px",
        md: "12px",
        lg: "14px",
        xl: "18px",
        "2xl": "22px",
        pill: "999px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.028em",
        tight: "-0.022em",
        snug: "-0.015em",
        eyebrow: "0.14em",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 30, 50, 0.04), 0 1px 1px rgba(15, 30, 50, 0.03)",
        md: "0 1px 2px rgba(15, 30, 50, 0.05), 0 8px 24px -8px rgba(15, 30, 50, 0.10)",
        lg: "0 1px 2px rgba(15, 30, 50, 0.06), 0 24px 60px -20px rgba(15, 30, 50, 0.18)",
        glow: "0 6px 20px -8px oklch(54% 0.13 232)",
      },
      transitionTimingFunction: {
        pool: "cubic-bezier(0.2, 0.7, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 320ms cubic-bezier(0.2, 0.7, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
