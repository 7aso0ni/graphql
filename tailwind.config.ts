import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        "primary-dark-bg": "#0d1117",
        "primary-dark-accent": "#161b22",
        "primary-dark-foreground": "#21262d",

        // Secondary Colors, Primary Element Colors
        "secondary-red": "#fa7970",
        "secondary-orange": "#faa356",
        "secondary-green": "#7ce38b",
        "secondary-blue": "#a2d2fb",
        "secondary-blue-light": "#77bdfb",
        "secondary-purple": "#cea5fb",

        // Neutral Colors, Primary Text Colors
        "neutral-gray-dark": "#89929b",
        "neutral-gray-light": "#c6cdd5",
        "neutral-light": "#ecf2f8",
      },

      backgroundImage: {
        "gradient-bg": "url('/abstract-textured-background.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
