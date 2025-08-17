/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
            transform: 'scale(1.02)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          'from': {
            textShadow: '0 0 10px rgba(34, 197, 94, 0.5), 0 0 20px rgba(34, 197, 94, 0.3)',
          },
          'to': {
            textShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.5)',
          },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        // Light theme shadows (Green/Emerald based)
        'light-glow': '0 0 20px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(34, 197, 94, 0.1)',
        'light-glow-lg': '0 8px 32px rgba(34, 197, 94, 0.3), 0 0 0 1px rgba(34, 197, 94, 0.2)',
        'light-card': '0 4px 20px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.05)',
        
        // Dark theme shadows (Cyan/Teal based)
        'dark-glow': '0 0 20px rgba(6, 182, 212, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.1)',
        'dark-glow-lg': '0 8px 32px rgba(6, 182, 212, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.2)',
        'dark-card': '0 4px 20px rgba(8, 145, 178, 0.15), 0 0 0 1px rgba(8, 145, 178, 0.05)',
        
        // Premium effects
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'premium-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        // Light theme gradients (Green/Emerald theme)
        'light-gradient': 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 50%, #BBF7D0 100%)',
        'light-gradient-card': 'linear-gradient(135deg, #FFFFFF 0%, #F9FFF9 100%)',
        'light-gradient-btn': 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
        'light-gradient-btn-hover': 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
        
        // Dark theme gradients (Cyan/Teal theme)
        'dark-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        'dark-gradient-card': 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        'dark-gradient-btn': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'dark-gradient-btn-hover': 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
        
        // Premium gradients
        'premium-light': 'linear-gradient(135deg, #FAFAFA 0%, #F4F4F5 100%)',
        'premium-dark': 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
        
        // Animated gradients
        'animated-gradient': 'linear-gradient(-45deg, #22C55E, #16A34A, #06B6D4, #0891B2)',
      },
      colors: {
        // Light theme colors (Green/Emerald based)
        light: {
          primary: '#22C55E',      // Green-500
          secondary: '#10B981',    // Emerald-500
          accent: '#059669',       // Emerald-600
          background: '#FFFFFF',
          surface: '#F9FAFB',
          muted: '#F3F4F6',
        },
        // Dark theme colors (Cyan/Teal based)
        dark: {
          primary: '#06B6D4',      // Cyan-500
          secondary: '#0891B2',    // Cyan-600
          accent: '#0E7490',       // Cyan-700
          background: '#0F172A',   // Slate-900
          surface: '#1E293B',      // Slate-800
          muted: '#334155',        // Slate-700
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/aspect-ratio'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#22C55E",      // Green-500
          "primary-content": "#FFFFFF",
          "secondary": "#10B981",    // Emerald-500
          "secondary-content": "#FFFFFF",
          "accent": "#059669",       // Emerald-600
          "accent-content": "#FFFFFF",
          "neutral": "#374151",      // Gray-700
          "neutral-content": "#F9FAFB",
          "base-100": "#FFFFFF",
          "base-200": "#F9FAFB",
          "base-300": "#F3F4F6",
          "base-content": "#1F2937",
          "info": "#0EA5E9",         // Sky-500
          "info-content": "#FFFFFF",
          "success": "#22C55E",      // Green-500
          "success-content": "#FFFFFF",
          "warning": "#F59E0B",      // Amber-500
          "warning-content": "#FFFFFF",
          "error": "#EF4444",        // Red-500
          "error-content": "#FFFFFF",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#06B6D4",      // Cyan-500
          "primary-content": "#FFFFFF",
          "secondary": "#0891B2",    // Cyan-600
          "secondary-content": "#FFFFFF",
          "accent": "#0E7490",       // Cyan-700
          "accent-content": "#FFFFFF",
          "neutral": "#374151",      // Gray-700
          "neutral-content": "#F9FAFB",
          "base-100": "#0F172A",     // Slate-900
          "base-200": "#1E293B",     // Slate-800
          "base-300": "#334155",     // Slate-700
          "base-content": "#F1F5F9", // Slate-100
          "info": "#0EA5E9",         // Sky-500
          "info-content": "#FFFFFF",
          "success": "#10B981",      // Emerald-500
          "success-content": "#FFFFFF",
          "warning": "#F59E0B",      // Amber-500
          "warning-content": "#FFFFFF",
          "error": "#EF4444",        // Red-500
          "error-content": "#FFFFFF",
        },
      },
    ],
  },
}