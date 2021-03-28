module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'even', 'odd', 'disabled'],
      backgroundOpacity: ['even', 'odd'],
      cursor: ['disabled'],
      textColor: ['active'],
      margin: ['first', 'last'],
      padding: ['first', 'last', 'hover']
    },
  },
  plugins: [],
}
