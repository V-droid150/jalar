import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        jalar: {
          red: "#dc2626",
          "red-deep": "#7f1d1d",
          orange: "#f97316",
          "orange-burnt": "#e05a00",
          amber: "#fbbf24",
          dark: "#0d0000",
          "dark-2": "#1a0000",
          cream: "#fff8f0",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
