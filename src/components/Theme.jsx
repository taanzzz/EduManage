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
  className={`btn btn-ghost btn-circle flex items-center justify-center relative overflow-hidden ...`}
>
  <input 
    type="checkbox"
    onChange={handleToggle}
    checked={isDark}
    className="hidden"
  />

  {isDark ? (
    <motion.div
      key="moon"
      initial={{ rotate: -180, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      exit={{ rotate: 180, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <FaMoon className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
    </motion.div>
  ) : (
    <motion.div
      key="sun"
      initial={{ rotate: 180, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      exit={{ rotate: -180, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <FaSun className="h-5 w-5 text-yellow-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
    </motion.div>
  )}
</motion.label>

  );
};

export default Theme;