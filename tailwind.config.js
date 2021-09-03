module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        fit: 'fit-content',
      },
      maxHeight: {
        infinite: '66px',
      },
    },
  },
  variants: {
    extend: {
      inset: ['group-hover'],
      display: ['group-hover'],
      padding: ['disabled'],
      borderWidth: ['disabled', 'focus'],
      fontSize: ['disabled'],
      fontWeight: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [],
};
