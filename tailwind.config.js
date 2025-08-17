/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
        'gradient-bg': 'gradient-bg 15s ease infinite',
      },
      keyframes: {
        'infinite-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-bg': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(to right, #FFFFFF, #BFDBFE)', // White to light blue
        'dark-gradient': 'linear-gradient(to right, #111827, #1E3A8A)', // Navy blue to darker blue
      },
      colors: {
        'light-text': '#1F2937', // Dark grey for light mode text
        'dark-text': '#E5E7EB', // Light grey for dark mode text
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#0D9488", // Deep Teal
          "secondary": "#38BDF8", // Vibrant Sky Blue
          "accent": "#818CF8", // Soft Indigo
          "neutral": "#1F2937", // Dark Grey
          "base-100": "var(--light-gradient)", // Use gradient for background
          "base-200": "#F3F4F6", // Light Grey
          "base-300": "#E5E7EB", // Slightly darker grey
          "base-content": "#1F2937", // Dark text
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#2DD4BF", // Bright Teal
          "secondary": "#7DD3FC", // Bright Sky Blue
          "accent": "#A78BFA", // Bright Indigo
          "neutral": "#D1D5DB", // Light Grey
          "base-100": "var(--dark-gradient)", // Use gradient for background
          "base-200": "#1F2937", // Slightly lighter navy
          "base-300": "#374151", // Even lighter navy
          "base-content": "#E5E7EB", // Light grey text
        },
      },
    ],
  },
}