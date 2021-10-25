const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "true",
  theme: {
    extend: {
      colors: {
        mainDark: "#171717",
        slightDark: "#292A2C",
        moreLight: "#4D4F54",
        cyan: colors.cyan
      },
      animation: {
        fadeIn: 'fadeIn .7s ease-in-out',
        fadeAndRise: 'fadeIn .5s ease-in-out, rise .4s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        rise: {
          from: { transform: "translateY(65px)" },
          to: { transform: "translateY(0px)" },
        }
      }
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
