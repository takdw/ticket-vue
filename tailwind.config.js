const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        red: "0 4px 14px 0 rgba(245, 101, 101, 0.39)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
  experimental: {
    applyComplexClasses: true,
  },
};
