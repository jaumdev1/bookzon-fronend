import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3f8efc',
          DEFAULT: '#1e3a8a',
          dark: '#1e40af',
        },
        secondary: {
          light: '#f3f4f6',
          DEFAULT: '#ffffff',
          dark: '#d1d5db',
        },
      },
    },
  },
  plugins: [],
};
export default config;
