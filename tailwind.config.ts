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
      borderRadius: {
        "r-75": "0 72px 0 0",
      },

      backgroundColor: {
        primary: "#202124",
      },

      colors: {
        // Primary Colors
        "primary-dark-bg": "#202124",
        "primary-dark-accent": "#161b22",
        "primary-dark-foreground": "#21262d",
        "neutral-light": "#ecf2f8",

        // Secondary Colors, Primary Element Colors
        "secondary-red": "#fa7970",
        "secondary-orange": "#faa356",
        "secondary-green": "#7ce38b",
        "secondary-blue": "#1f6feb",
        "secondary-blue-light": "#4186ff",
        "secondary-purple": "#D73BD4",
        "secondary-purple-light": "#7875B5",

        // Neutral Colors, Primary Text Colors
        "text-neutral-dark": "#89929b",
        "text-neutral-light": "#c6cdd5",
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
