// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,jsx}",
    "./public/.html",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(), require("flowbite/plugin")],
};
