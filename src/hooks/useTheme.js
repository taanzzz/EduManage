// hooks/useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem('theme') || 'light');
    };

    const handleThemeChange = (e) => {
      setTheme(e.detail);
    };

    // Listen for storage changes (other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom theme change event
    window.addEventListener('themeChange', handleThemeChange);
    
    // Observe data-theme attribute changes
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChange', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  // Theme-specific class utilities
  const getThemeClasses = {
    // Background gradients
    pageBackground: isDark 
      ? 'bg-dark-gradient min-h-screen' 
      : 'bg-light-gradient min-h-screen',
    
    cardBackground: isDark 
      ? 'bg-gradient-to-br from-slate-800/80 to-slate-700/60 backdrop-blur-xl border border-cyan-500/20' 
      : 'bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl border border-green-500/20',
    
    // Text colors
    primaryText: isDark ? 'text-slate-100' : 'text-gray-900',
    secondaryText: isDark ? 'text-slate-300' : 'text-gray-700',
    mutedText: isDark ? 'text-slate-400' : 'text-gray-500',
    
    // Button styles
    primaryButton: isDark 
      ? 'bg-dark-gradient-btn hover:bg-dark-gradient-btn-hover text-white shadow-dark-glow hover:shadow-dark-glow-lg border-none' 
      : 'bg-light-gradient-btn hover:bg-light-gradient-btn-hover text-white shadow-light-glow hover:shadow-light-glow-lg border-none',
    
    secondaryButton: isDark 
      ? 'bg-slate-700/50 hover:bg-slate-600/60 text-slate-200 border border-cyan-500/30 hover:border-cyan-400/50' 
      : 'bg-white/70 hover:bg-gray-50/90 text-gray-700 border border-green-500/30 hover:border-green-400/50',
    
    // Input styles
    input: isDark 
      ? 'bg-slate-800/50 text-slate-200 border-cyan-500/30 placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20' 
      : 'bg-white/80 text-gray-700 border-green-500/30 placeholder-gray-500 focus:border-green-400 focus:ring-green-400/20',
    
    // Navigation
    navBackground: isDark 
      ? 'bg-slate-900/80 backdrop-blur-xl border-cyan-500/20' 
      : 'bg-white/80 backdrop-blur-xl border-green-500/20',
    
    navLink: isDark 
      ? 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10' 
      : 'text-gray-600 hover:text-green-600 hover:bg-green-500/10',
    
    activeNavLink: isDark 
      ? 'text-cyan-400 bg-cyan-500/20 shadow-dark-card' 
      : 'text-green-600 bg-green-500/20 shadow-light-card',
    
    // Shadow utilities
    shadow: isDark ? 'shadow-dark-card' : 'shadow-light-card',
    shadowLg: isDark ? 'shadow-dark-glow-lg' : 'shadow-light-glow-lg',
    
    // Border utilities
    border: isDark ? 'border-slate-700' : 'border-gray-200',
    borderAccent: isDark ? 'border-cyan-500/30' : 'border-green-500/30',
  };

  // Dynamic gradient classes for special effects
  const gradientText = isDark 
    ? 'bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent' 
    : 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent';

  const hoverGlow = isDark 
    ? 'hover:shadow-dark-glow transition-all duration-300' 
    : 'hover:shadow-light-glow transition-all duration-300';

  return {
    theme,
    isDark,
    isLight,
    getThemeClasses,
    gradientText,
    hoverGlow,
    
    // Color values for direct use
    colors: {
      primary: isDark ? '#06B6D4' : '#22C55E',
      secondary: isDark ? '#0891B2' : '#10B981',
      accent: isDark ? '#0E7490' : '#059669',
      background: isDark ? '#0F172A' : '#FFFFFF',
      surface: isDark ? '#1E293B' : '#F9FAFB',
      muted: isDark ? '#334155' : '#F3F4F6',
    }
  };
};