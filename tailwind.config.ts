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

        // Brand scales — for one-off usage; prefer semantic tokens above.
        fresh: {
          50: "#E9FBF1",
          100: "#CFF6DD",
          200: "#A2ECBE",
          300: "#6EDD9D",
          400: "#3DCB80",
          500: "#15C26B", // brand primary
          600: "#0FA259",
          700: "#0C8047",
          800: "#0A6238",
          900: "#08482A",
          950: "#042818",
        },
        citrus: {
          50: "#FFF1E8",
          100: "#FFDEC6",
          200: "#FFBE92",
          300: "#FF9A5C",
          400: "#FF7E36",
          500: "#FF6A1F", // brand accent
          600: "#E55613",
          700: "#B5410D",
          800: "#86300A",
          900: "#5C2107",
        },
        ink: {
          50: "#F6F8F7",
          100: "#ECF0EE",
          200: "#DDE4DF",
          300: "#C1CBC4",
          400: "#9CAAA2",
          500: "#7A8A80",
          600: "#5C6B61",
          700: "#3E4B43",
          800: "#2A332E",
          900: "#1B221E",
          950: "#0F1411",
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
        // Tuned for mobile readability — body never below 15px.
        xs: ["0.8125rem", { lineHeight: "1.15rem" }],   // 13px
        sm: ["0.9375rem", { lineHeight: "1.4rem" }],    // 15px (smallest body)
        base: ["1rem", { lineHeight: "1.55rem" }],      // 16px
        lg: ["1.125rem", { lineHeight: "1.7rem" }],     // 18px
        xl: ["1.25rem", { lineHeight: "1.8rem" }],      // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.015em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "3.25rem", letterSpacing: "-0.025em" }],
        "6xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        // Warm, soft shadows — service-trade clean, not glassy spa.
        sm: "0 1px 2px 0 rgba(15, 20, 17, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(15, 20, 17, 0.08), 0 1px 2px -1px rgba(15, 20, 17, 0.06)",
        md: "0 4px 8px -2px rgba(15, 20, 17, 0.08), 0 2px 4px -2px rgba(15, 20, 17, 0.06)",
        lg: "0 10px 20px -6px rgba(15, 20, 17, 0.10), 0 4px 8px -4px rgba(15, 20, 17, 0.06)",
        pop: "0 6px 0 0 hsl(var(--primary))", // service-trade "stamped" effect
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
