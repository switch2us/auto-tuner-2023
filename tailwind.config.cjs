module.exports = {
  content: [
    "./src/app.html",
    "./src/**/*.svelte"
  ],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        theme_primary: {
          DEFAULT: '#880000',
          dark: '#770000',
          text: '#ffffff'
        },
        theme_secondary: {
          DEFAULT: '#ee0000',
          dark: '#da0000',
          text: '#ffffff'
        },
        theme_tertiary: {
          DEFAULT: '#333333',
          dark: '#000000',
          text: '#ffffff'
        },
        theme_tertiary_secondary: {
          DEFAULT: '#ffffff',
          dark: '#dddddd',
          text: '#000000'
        }
      },
    }
  },
  variants: {
    extend: {},
  }
}