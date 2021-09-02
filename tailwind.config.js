module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      inset: ['group-hover'],
      display: ['group-hover'],
    },
  },
  plugins: [],
};
