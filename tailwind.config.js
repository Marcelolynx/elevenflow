/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#005e60",
          background: "#fefaf8",
          card: "#f6f4f7",
          section: "#e8e5ec",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          display: ["Playfair Display", "serif"],
        },
      },
    },
    plugins: [],
  };
  