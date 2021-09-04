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
      inset: {
        'beyond-full': 'calc(100% + 2px)',
      },
    },
  },
  variants: {
    extend: {
      inset: ['group-hover'],
      display: ['group-hover'],
      margin: ['last'],
      padding: ['disabled'],
      borderWidth: ['disabled', 'focus'],
      borderRadius: ['first', 'last'],
      fontSize: ['disabled'],
      fontWeight: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [],
};
