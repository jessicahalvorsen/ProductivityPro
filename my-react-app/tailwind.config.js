module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-green': '#56FFB8',
        'app-mediumGreen': '#04D58C',
        'app-darkGreen': '#036855',
        'app-lightGray': '#F8F8F8',
        'app-mediumGray': '#EFEFEF',
        'app-red': '#FF4444',
        'app-mediumRed': '#CC0000',
        'app-yellow': '#FFBB33',
        "app-mediumYellow": '#FF8800'
      },
      fontFamily: {
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}