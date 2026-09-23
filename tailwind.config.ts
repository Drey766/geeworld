import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0D0D0D",
          dark: "#161616",
          dark2: "#202020",
          mid: "#333333",
          muted: "#8F8F8F",
          light: "#D8D8D8",
          white: "#F7F7F5",
          primary: "#E8B84B",
          "primary-light": "#F0CC70",
          "primary-dark": "#C99B2E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "container-site": "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
