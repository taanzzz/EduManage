import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaHome, FaThList, FaChalkboardTeacher, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import Theme from "./../Theme";
import UserProfileDropdown from "../UserProfileDropdown";
import { AuthContext } from "../../contexts/AuthProvider";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
  const { user, userRole } = useContext(AuthContext);
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const moreMenuRef = useRef(null);

  // Sync theme with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem('theme') || 'light');
    };

    window.addEventListener('storage', handleStorageChange);
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
      observer.disconnect();
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  // Handle click outside for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center px-2 py-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 min-w-0 ${
      isActive
        ? isDark
          ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
        : isDark
          ? 'hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 hover:text-white text-gray-300 hover:shadow-lg'
          : 'hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white text-gray-600 hover:shadow-lg'
    } ${hoverGlow}`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        <motion.div
          whileHover={{ scale: 1.2, rotateY: 15 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-1"
        >
          <FaHome className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${getThemeClasses.primaryText} drop-shadow-sm`} />
        </motion.div>
        <span className={`text-xs sm:text-sm font-semibold leading-tight text-center ${getThemeClasses.primaryText} drop-shadow-sm truncate max-w-full`}>
          Home
        </span>
      </NavLink>
      <NavLink to="/all-classes" className={navLinkClass}>
        <motion.div
          whileHover={{ scale: 1.2, rotateY: 15 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-1"
        >
          <FaThList className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${getThemeClasses.primaryText} drop-shadow-sm`} />
        </motion.div>
        <span className={`text-xs sm:text-sm font-semibold leading-tight text-center ${getThemeClasses.primaryText} drop-shadow-sm truncate max-w-full`}>
          All Classes
        </span>
      </NavLink>
      {user && (
        <NavLink to="/teach-on-edu" className={navLinkClass}>
          <motion.div
            whileHover={{ scale: 1.2, rotateY: 15 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-1"
          >
            <FaChalkboardTeacher className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${getThemeClasses.primaryText} drop-shadow-sm`} />
          </motion.div>
          <span className={`text-xs sm:text-sm font-semibold leading-tight text-center ${getThemeClasses.primaryText} drop-shadow-sm truncate max-w-full`}>
            Teach on EduManage
          </span>
        </NavLink>
      )}
    </>
  );

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] ${getThemeClasses.navbarBackground} backdrop-blur-xl ${
          isScrolled ? 'rounded-b-2xl shadow-2xl' : ''
        } border-b ${isDark ? 'border-cyan-500/20' : 'border-green-300/20'}`}
        animate={{
          backgroundColor: isScrolled
            ? isDark
              ? 'rgba(15, 23, 42, 0.95)'
              : 'rgba(255, 255, 255, 0.95)'
            : isDark
              ? 'rgba(15, 23, 42, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: isScrolled
            ? isDark
              ? '0 8px 32px rgba(6, 182, 212, 0.2), 0 0 0 1px rgba(6, 182, 212, 0.1)'
              : '0 8px 32px rgba(34, 197, 94, 0.2), 0 0 0 1px rgba(34, 197, 94, 0.1)'
            : 'none',
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="navbar max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="navbar-start">
            <NavLink to="/" className="flex items-center gap-2 sm:gap-3 flex-nowrap text-base sm:text-lg lg:text-2xl font-black">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-2xl ${
                  isDark
                    ? 'bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg'
                    : 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg'
                } flex-shrink-0 animate-pulse-glow ${hoverGlow}`}
              >
                <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white drop-shadow-md" />
              </motion.div>
              <motion.span
                className={`relative ${gradientText} whitespace-nowrap font-black hidden sm:inline-block drop-shadow-sm`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                EduManage
              </motion.span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-6">{navLinks}</ul>
          </div>

          {/* Actions */}
          <div className="navbar-end gap-2 sm:gap-3">
            <Theme />
            {user ? (
              <div ref={moreMenuRef}>
                <UserProfileDropdown />
              </div>
            ) : (
              <div className="flex gap-1 sm:gap-2">
                <NavLink
                  to="/login"
                  className={`btn btn-xs sm:btn-sm text-white border-none rounded-xl font-semibold transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
                  } ${hoverGlow}`}
                >
                  <FaSignInAlt className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Login</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className={`btn btn-xs sm:btn-sm text-white border-none rounded-xl font-semibold transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400'
                  } ${hoverGlow}`}
                >
                  <FaUserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Register</span>
                </NavLink>
              </div>
            )}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`btn btn-ghost btn-circle btn-sm sm:btn-md lg:hidden ${getThemeClasses.secondaryText} rounded-xl border ${
                isDark ? 'border-cyan-500/20 hover:border-cyan-400/50' : 'border-green-300/20 hover:border-green-400/50'
              } transition-all duration-300 ${hoverGlow}`}
            >
              {isMobileMenuOpen ? <AiOutlineClose className="w-3 h-3 sm:w-4 sm:h-4" /> : <AiOutlineMenu className="w-3 h-3 sm:w-4 sm:h-4" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile bottom navigation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`lg:hidden fixed bottom-0 left-0 right-0 ${getThemeClasses.navbarBackground} backdrop-blur-xl rounded-t-3xl z-[100] border-t ${
          isDark ? 'border-cyan-500/20' : 'border-green-300/20'
        } shadow-lg`}
      >
        <ul className="flex justify-around items-center px-2 py-2 sm:py-3 gap-1">
          {user ? navLinks : (
            <>
              <NavLink to="/" className={navLinkClass}>
                <motion.div
                  whileHover={{ scale: 1.2, rotateY: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 mb-1"
                >
                  <FaHome className={`w-4 h-4 sm:w-5 sm:h-5 ${getThemeClasses.primaryText} drop-shadow-sm`} />
                </motion.div>
                <span className={`text-xs sm:text-sm font-semibold leading-tight text-center ${getThemeClasses.primaryText} drop-shadow-sm truncate max-w-full`}>
                  Home
                </span>
              </NavLink>
              <NavLink to="/all-classes" className={navLinkClass}>
                <motion.div
                  whileHover={{ scale: 1.2, rotateY: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 mb-1"
                >
                  <FaThList className={`w-4 h-4 sm:w-5 sm:h-5 ${getThemeClasses.primaryText} drop-shadow-sm`} />
                </motion.div>
                <span className={`text-xs sm:text-sm font-semibold leading-tight text-center ${getThemeClasses.primaryText} drop-shadow-sm truncate max-w-full`}>
                  All Classes
                </span>
              </NavLink>
            </>
          )}
        </ul>
      </motion.div>
    </>
  );
};

export default Navbar;