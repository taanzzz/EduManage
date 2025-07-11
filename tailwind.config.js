// 📁 File: tailwind.config.js

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
        }
      }
    },
  },
  plugins: [require("daisyui")],

  // daisyUI থিম কনফিগারেশন 
  daisyui: {
    themes: [
      {
        // আমাদের কাস্টম লাইট থিম
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#0D9488",   // ডিপ টিল (Teal)
          "secondary": "#38BDF8", // ভাইব্রেন্ট স্কাই ব্লু
          "accent": "#818CF8",    // সফট ইন্ডিগো
          "neutral": "#1F2937",   // ডার্ক গ্রে
          "base-100": "#FFFFFF",  // সাদা ব্যাকগ্রাউন্ড
          "base-200": "#F3F4F6",  // হালকা ধূসর ব্যাকগ্রাউন্ড
          "base-300": "#E5E7EB",  // আরও একটু গাঢ় ধূসর
          "base-content": "#1F2937", // ডার্ক টেক্সট
        },
      },
      {
        // আমাদের কাস্টম ডার্ক থিম
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#2DD4BF",   // উজ্জ্বল টিল
          "secondary": "#7DD3FC", // উজ্জ্বল স্কাই ব্লু
          "accent": "#A78BFA",    // উজ্জ্বল ইন্ডিগো
          "neutral": "#D1D5DB",   // হালকা ধূসর
          "base-100": "#111827",  // নেভি ব্লু ব্যাকগ্রাউন্ড
          "base-200": "#1F2937",  // একটু হালকা নেভি ব্লু
          "base-300": "#374151",  // আরও একটু হালকা নেভি ব্লু
          "base-content": "#E5E7EB", // লাইট গ্রে টেক্সট
        },
      },
    ],
  },
}