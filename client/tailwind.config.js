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
        lightprimary: "#F2C7AA",
        green: "#1DBE19",
        brown: "#BE4B19",
        pink: "#BE19A4",
        blue: "#195BBE",
        red: "#e54941",
        lightred: "#ed7b75",
        tealblue: "#39BEB9",
        teal: "#16B6AA",
        mustard : "#F2AD22",
        lightgreen: "#BCD63D",
        purple: "#5B64AF",
        orange: "#F15A25",
        magenta: "#E71880",
        lightorange: "#F47621",
        secondary: "#f7e3d5"
      },
      fontSize: {
        xxs: ['8px' , '11px']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
