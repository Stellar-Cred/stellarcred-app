import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cred-gold": "#F59E0B",
        "cred-diamond": "#60A5FA",
        "cred-dark": "#0F172A",
        "cred-purple": "#7C3AED",
      },
    },
  },
  plugins: [],
};

export default config;
