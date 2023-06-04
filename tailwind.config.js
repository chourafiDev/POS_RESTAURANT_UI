/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#46A094",
        yellow: "#f7b941",
        red: "#E57E74",
        dark: "#073b4c",
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
