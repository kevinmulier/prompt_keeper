/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.hbs", "./helpers/*.js"],
  theme: {
    extend: {
      colors: {
        violet: {
          50: "#e8eaff",
          100: "#d5d8ff",
          200: "#b3b6ff",
          300: "#8585ff",
          400: "#6655ff",
          500: "#562fff",
          600: "#4e0cff",
          700: "#4c02ff",
          800: "#3c06cd",
          900: "#33109f",
          950: "#180745",
        },
      },
    },
  },
  plugins: [],
};
