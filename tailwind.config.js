const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        mainDark: "#171717",
        slightDark: "#292A2C",
        moreLight: "#4D4F54",
        cyan: colors.cyan
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
