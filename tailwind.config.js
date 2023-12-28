/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#FFCA40",
        yellow: "#f7b941",
        red: "#ff686b",
        dark: "#264653",
        gray: "#ACACAE",
        blue: "#4F83F3",
        "gray-light": "#ECF0F3",
        "green-500": "#6BBD99",
        "green-400": "#AECFA4",
        "green-300": "#C4E8C2",
      },
      fontFamily: {
        poppins: [],
      },
    },
  },
  plugins: [],
};
