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
        primary: {
          DEFAULT: "#19BFB7",
          foreground: "#FFFFFF",
        },
        dark: {
          DEFAULT: "#40514E",
          foreground: "#FFFFFF",
        },
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
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
