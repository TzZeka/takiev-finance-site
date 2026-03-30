import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand colors ────────────────────────────────────────────────
        primary: {
          DEFAULT: "#19BFB7",
          foreground: "#FFFFFF",
          dark: "#147d6c",        // gradient dark stop (PremiumLoader)
          bright: "#1effff",      // gradient bright accent (PremiumLoader)
          link: "#0D7F78",        // link text on light bg
          "link-hover": "#0B5E59", // link hover on light bg
        },
        secondary: {
          DEFAULT: "#2d4a44",
          foreground: "#FFFFFF",
        },
        dark: {
          DEFAULT: "#40514E",
          muted: "#2d3d3a",       // slightly lighter dark (PartnersCarousel text)
          foreground: "#FFFFFF",
        },
        // ── Surface scale (dark backgrounds) ────────────────────────────
        surface: {
          DEFAULT: "#1b2b28",     // blog cards / dark text on light bg
          raised: "#2d4a44",      // raised panels, overlays
          deeper: "#1a3530",      // deeper panel text
          deep: "#060e0c",        // footer / video page bg
        },
        // ── Semantic / shadcn tokens ─────────────────────────────────────
        background: "#40514E",
        foreground: "#F5F5F5",
        border: "#5A6A67",
        input: "#5A6A67",
        ring: "#19BFB7",
        muted: {
          DEFAULT: "#4A5C59",
          foreground: "#D1D5DB",
        },
        accent: {
          DEFAULT: "#19BFB7",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#40514E",
          foreground: "#F5F5F5",
        },
        popover: {
          DEFAULT: "#40514E",
          foreground: "#F5F5F5",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["'Hubot Sans'", "system-ui", "sans-serif"],   // headings — use font-sans
        body: ["'Mona Sans'", "system-ui", "sans-serif"],    // body text — use font-body
        brand: ["'Berkslund'", "serif"],                     // logo wordmark
        label: ["'Avenir'", "sans-serif"],                   // logo subtitle
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "450ms",
        slower: "600ms",
        slowest: "800ms",
        "420": "420ms",
        "1500": "1.5s",
      },
      keyframes: {
        "cta-arrow": {
          "0%, 100%": { transform: "translateX(0px)" },
          "45%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        "cta-arrow": "cta-arrow 1s ease-in-out infinite",
      },
      transitionTimingFunction: {
        // cubic-bezier(0.22,1,0.36,1) — standard expo-out used throughout
        "expo-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        // cubic-bezier(0.23,1,0.32,1) — slightly softer expo-out (BlogSearch)
        "soft-out": "cubic-bezier(0.23, 1, 0.32, 1)",
        // cubic-bezier(0.25,1,0.5,1) — gentle smooth-out (AboutPage)
        "smooth-out": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
