/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "great-vibes": ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
};
