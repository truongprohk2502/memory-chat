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
      spacing: {
        signing: '760px',
      },
      minHeight: {
        'screen-3/4': '75vh',
      },
      backgroundImage: {
        signing: "url('assets/images/signing.webp')",
      },
    },
    fontFamily: {
      arvo: ['Arvo', 'serif'],
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      lightGreen: '#39ad31',
      facebook: '#3b5998',
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
      backgroundImage: ['hover'],
    },
  },
  plugins: [],
};
