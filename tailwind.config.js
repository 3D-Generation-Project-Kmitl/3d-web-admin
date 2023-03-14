/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE4D2D",
        primaryLight: "#FF4D2D",
        secondary: "#B9B9B9",
        secondaryLight: "#CACACA",
        lightWhite: "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
};
