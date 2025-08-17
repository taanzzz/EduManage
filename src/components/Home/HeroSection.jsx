import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGraduationCap, FaPlay, FaUsers, FaBook, FaStar } from 'react-icons/fa';
import { useTheme } from './../../hooks/useTheme';

const HeroSection = () => {
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative overflow-hidden ${getThemeClasses.pageBackground} min-h-screen flex items-center`}>
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div 
          className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
          }`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20' : 'bg-gradient-to-r from-lime-500/20 to-green-500/20'
          }`}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              isDark ? 'bg-cyan-400/30' : 'bg-green-400/30'
            } blur-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() > 0.5 ? 20 : -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Heading */}
            <motion.h1 
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold ${getThemeClasses.primaryText} leading-tight`}
              variants={itemVariants}
            >
              <motion.span 
                className="block"
                whileHover={{ scale: 1.02 }}
              >
                Unlock Your Potential,
              </motion.span>
              <motion.span 
                className={`block ${gradientText} mt-2 drop-shadow-lg`}
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                One Course at a Time
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className={`mt-6 text-lg sm:text-xl ${getThemeClasses.secondaryText} max-w-3xl mx-auto lg:mx-0 leading-relaxed`}
              variants={itemVariants}
            >
              Welcome to EduManage, where learning knows no bounds. Get access to thousands of expert-led courses, a vibrant community, and cutting-edge tools to propel your career forward.
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm"
              variants={itemVariants}
            >
              {[
                { icon: FaUsers, count: '10k+', label: 'Active Students' },
                { icon: FaBook, count: '500+', label: 'Courses' },
                { icon: FaStar, count: '4.9', label: 'Rating' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    isDark 
                      ? 'bg-slate-800/50 border border-cyan-500/20' 
                      : 'bg-white/70 border border-green-500/20'
                  } backdrop-blur-sm ${hoverGlow}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <stat.icon className={`w-4 h-4 ${
                    isDark ? 'text-cyan-400' : 'text-green-600'
                  }`} />
                  <span className={`font-bold ${getThemeClasses.primaryText}`}>
                    {stat.count}
                  </span>
                  <span className={getThemeClasses.mutedText}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/all-classes"
                  className={`group flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl text-white ${getThemeClasses.primaryButton} ${getThemeClasses.shadowLg} transition-all duration-300`}
                >
                  Explore Courses
                  <motion.div
                    className="ml-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/teach-on-edu"
                  className={`group flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl ${getThemeClasses.secondaryButton} ${getThemeClasses.shadow} transition-all duration-300`}
                >
                  <FaPlay className="mr-2" />
                  Become an Instructor
                  <motion.div
                    className="ml-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            {/* Main visual container */}
            <div className={`relative h-96 lg:h-[500px] rounded-3xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600' 
                : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
            } ${getThemeClasses.shadow} ${hoverGlow}`}>
              
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 ${
                  isDark 
                    ? 'bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-teal-500/20' 
                    : 'bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-lime-500/20'
                }`}
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{
                  duration: 20,
                  ease: 'linear',
                  repeat: Infinity,
                }}
                style={{ backgroundSize: '200% 200%' }}
              />

              {/* Central icon with animations */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                variants={floatingVariants}
                animate="animate"
              >
                <motion.div
                  className={`relative ${
                    isDark ? 'text-cyan-400/30' : 'text-green-500/30'
                  }`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 10 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FaGraduationCap className="text-[12rem] lg:text-[15rem] drop-shadow-2xl" />
                  
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 ${
                      isDark ? 'text-cyan-400/10' : 'text-green-500/10'
                    } blur-3xl`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                  >
                    <FaGraduationCap className="text-[12rem] lg:text-[15rem]" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${
                    isDark ? 'bg-cyan-400/40' : 'bg-green-400/40'
                  }`}
                  style={{
                    left: `${15 + (i * 10)}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    scale: [0.5, 1, 0.5],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + (i * 0.5),
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Floating cards around the main visual */}
            <motion.div
              className={`absolute -top-4 -right-4 p-4 rounded-2xl ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} backdrop-blur-sm`}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  isDark ? 'bg-cyan-400' : 'bg-green-500'
                } animate-pulse`} />
                <span className={`text-xs font-medium ${getThemeClasses.primaryText}`}>
                  Live Classes
                </span>
              </div>
            </motion.div>

            <motion.div
              className={`absolute -bottom-4 -left-4 p-4 rounded-2xl ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} backdrop-blur-sm`}
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                repeatType: "reverse",
                delay: 1
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  isDark ? 'bg-teal-400' : 'bg-emerald-500'
                } animate-pulse`} />
                <span className={`text-xs font-medium ${getThemeClasses.primaryText}`}>
                  Expert Mentors
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;