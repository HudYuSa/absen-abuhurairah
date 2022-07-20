const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./views/**/*.{ejs,html,js}"],
  theme: {
    screens: {
      xxsm: "320px",
      xsm: "480px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
