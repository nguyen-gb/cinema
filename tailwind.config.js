/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#AE1F17",
        secondary: "#0A031C",
        tertiary: "#640d9a",
        quaternary: "#020510",
      },
      boxShadow: {
        ct: "4px 4px 8px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
