const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        parchment: {
          light: "#FFFCF2",
          DEFAULT: "#E6D6A9",
          dark: "#786B3D"
        }
      },
      spacing: {
        '100': '25rem',
        '120': '30rem',
        '140': '35rem',
        '160': '40rem',
      }
    },
  },
  variants: {},
  plugins: [],
}
