/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"white",
        "blue":"#dce5be",
        "green":"#D1FFBD",
        "dk":"#000a00",
        "ly":"#e6e533",
      }
    },
  },
  plugins: [],
}

