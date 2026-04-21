import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontSize: {
      xs: ["0.9rem", { lineHeight: "1.2rem" }],
      sm: ["1.05rem", { lineHeight: "1.5rem" }],
      base: ["1.2rem", { lineHeight: "1.8rem" }],
      lg: ["1.35rem", { lineHeight: "1.95rem" }],
      xl: ["1.5rem", { lineHeight: "2.1rem" }],
      "2xl": ["1.8rem", { lineHeight: "2.25rem" }],
      "3xl": ["2.25rem", { lineHeight: "2.7rem" }],
      "4xl": ["2.7rem", { lineHeight: "3.2rem" }],
      "5xl": ["3.6rem", { lineHeight: "4rem" }],
      "6xl": ["4.5rem", { lineHeight: "1" }]
    },
    extend: {
      colors: {
        ink: "#101112",
        soft: "#f5f7f8",
        line: "#e5e7eb"
      },
      fontFamily: {
        sans: ["\"Avenir Next\"", "\"Segoe UI\"", "sans-serif"]
      },
      boxShadow: {
        float: "0 24px 50px -24px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
