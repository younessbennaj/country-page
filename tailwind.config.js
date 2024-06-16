/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#1b1d1f",
        "light-grey": "#6c727f",
        "blue-grey": "#D2D5DA",
        dark: "#282B30",
      },
    },
  },
  plugins: [],
};
