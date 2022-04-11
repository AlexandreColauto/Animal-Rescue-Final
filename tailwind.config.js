module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik"],
        body: ["Rubik"],
      },
      colors: {
        primary: "#111731",
        secondary: "#87c7e4",
        normal: "#708496",
      },
    },
  },
  plugins: [],
};
