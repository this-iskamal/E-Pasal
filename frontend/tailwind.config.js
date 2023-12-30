// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export const content = [

  "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{html,js,jsx}",
  "./public/.html",
];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [nextui(), require("flowbite/plugin")];
