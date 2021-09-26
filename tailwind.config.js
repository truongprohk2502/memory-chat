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
        124: '31rem',
      },
    },
    fontFamily: {
      arvo: ['Arvo', 'serif'],
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      lightGreen: '#39ad31',
    }),
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
