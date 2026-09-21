import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark brand surfaces
        bgdark: "#07111F",
        navy: "#0B1728",
        slate: "#172337",
        // Light procurement/product surfaces
        ink: "#0B1220",
        paper: "#FFFFFF",
        "bg-light": "#F5F7FA",
        muted: "#7F8EA3",
        "muted-dark": "#93A2B8",
        border: {
          DEFAULT: "#E2E6EC",
          strong: "#CCD3DE",
          dark: "rgba(255,255,255,0.10)",
          "dark-strong": "rgba(255,255,255,0.18)",
        },
        // Single accent used everywhere
        accent: {
          DEFAULT: "#19B8E6",
          hover: "#38C6EF",
          soft: "#E4F7FC",
        },
        blue: "#3B82F6",
        success: {
          DEFAULT: "#1F8A70",
          tint: "#E5F4F0",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(7,17,31,0.04), 0 12px 32px -16px rgba(7,17,31,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
