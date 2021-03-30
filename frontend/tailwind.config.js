module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '100': '25rem',
        '120': '30rem',
        '140': '35rem',
        '160': '40rem',
      },
    },
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
