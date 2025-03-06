/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#38b54a",
        secondary: "#14532D",
        accent: "#8BC34A",
        background: "#FFFFFF",
        dark: "#1E293B",
        light: "#CBD5E1"
      },
    },
  },
  plugins: [],
}

