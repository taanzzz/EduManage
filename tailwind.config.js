// 📁 File: tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#F97316",   // Vibrant Orange
          "secondary": "#EC4899", // Hot Pink
          "base-100": "#FFFFFF",
          "base-content": "#1F2937",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#FB923C",   // Lighter Orange
          "secondary": "#F472B6", // Lighter Pink
          "base-100": "#1E293B",  // Slate Dark Blue
          "base-content": "#E2E8F0",
        },
      },
    ],
  },
}