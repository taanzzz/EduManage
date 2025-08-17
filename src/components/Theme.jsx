import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const Theme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    
    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
  }, [theme]);

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.label 
      className={`swap swap-rotate btn btn-ghost btn-circle relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-700/80 hover:from-cyan-500/20 hover:to-teal-500/20 border border-cyan-500/20 shadow-dark-card hover:shadow-dark-glow' 
          : 'bg-gradient-to-br from-white/80 to-gray-50/80 hover:from-green-500/10 hover:to-emerald-500/10 border border-green-500/20 shadow-light-card hover:shadow-light-glow'
      } backdrop-blur-md transition-all duration-500 ease-out group`}
      whileHover={{ 
        scale: 1.1,
        rotate: isDark ? -10 : 10
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }}
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-cyan-500/10 to-teal-500/10' 
          : 'bg-gradient-to-r from-green-500/10 to-emerald-500/10'
      }`} />
      
      <input 
        type="checkbox" 
        onChange={handleToggle}
        checked={isDark} 
        className="hidden"
      />
      
      {/* Sun Icon (Light Mode) */}
      <motion.div
        className="swap-on absolute inset-0 flex items-center justify-center"
        animate={{ 
          rotate: isDark ? 0 : 360,
          scale: isDark ? 1 : 1.1
        }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        <FaSun className={`h-5 w-5 transition-all duration-300 ${
          isDark 
            ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' 
            : 'text-yellow-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]'
        }`} />
      </motion.div>
      
      {/* Moon Icon (Dark Mode) */}
      <motion.div
        className="swap-off absolute inset-0 flex items-center justify-center"
        animate={{ 
          rotate: !isDark ? 0 : -360,
          scale: !isDark ? 1 : 1.1
        }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        <FaMoon className={`h-5 w-5 transition-all duration-300 ${
          !isDark 
            ? 'text-slate-600 drop-shadow-[0_0_8px_rgba(71,85,105,0.6)]' 
            : 'text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]'
        }`} />
      </motion.div>

      {/* Ripple effect on click */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isDark 
            ? 'bg-cyan-500/20' 
            : 'bg-green-500/20'
        }`}
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.label>
  );
};

export default Theme;