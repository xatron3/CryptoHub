/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          50: "#DDDEE2",
          100: "#CDD0D5",
          200: "#AFB3BB",
          300: "#9197A1",
          400: "#737A87",
          500: "#595F69",
          600: "#444850",
          700: "#2F3237",
          750: "#24262a",
          800: "#1A1B1E",
          900: "#0e0e10",
        },
      },
    },
  },
  plugins: [],
};
