/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./app/**/*.{js,ts,jsx,tsx,css}"],
  important: "#__next",
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#1B59F8",
          800: "#0F172A",
        },
        grey: {
          300: "#D9D9D9",
          800: "#64748B",
        },
      },
      animation: {
        popup: "popup 0.5s ease-in-out",
      },
      keyframes: {
        popup: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
    screens: {
      "2xs": "320px",
      // => @media (min-width: 320px) { ... }
      xs: "425px",
      // => @media (min-width: 425px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
