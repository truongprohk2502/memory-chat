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
        100: '25rem',
        120: '30rem',
        160: '40rem',
        192: '96rem',
      },
      minHeight: {
        'screen-3/4': '75vh',
        100: '25rem',
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
    minHeight: {
      120: '40rem',
    },
  },
  variants: {
    extend: {
      inset: ['group-hover'],
      cursor: ['disabled'],
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
