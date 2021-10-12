module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"]
      },
      colors: {
        primary: "#e58f55",
        green: "#1DBE19",
        brown: "#BE4B19",
        pink: "#BE19A4",
        blue: "#195BBE",
        yellow: "#BE9A19",
        red: "#BE2D19"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
