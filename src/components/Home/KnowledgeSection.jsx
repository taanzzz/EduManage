import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';
import { useTheme } from './../../hooks/useTheme';

const KnowledgeSection = () => {
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className={`relative z-10 py-20 md:py-28 ${getThemeClasses.pageBackground} overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
        }`} />
        <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
          isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
        }`} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <motion.div 
            className={`p-5 rounded-full shadow-lg ${hoverGlow} ${
              isDark ? 'bg-gradient-to-br from-cyan-500 to-teal-500' : 'bg-gradient-to-br from-green-500 to-emerald-500'
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaLightbulb className="text-white w-10 h-10" />
          </motion.div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className={`text-4xl md:text-5xl font-extrabold leading-tight ${getThemeClasses.primaryText} mb-4`}
          whileHover={{ scale: 1.02 }}
        >
          The Greatest Investment is in
          <span className={`block mt-2 ${gradientText} drop-shadow-lg`}>
            Your Own Knowledge
          </span>
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className={`mt-6 text-lg md:text-xl ${getThemeClasses.secondaryText} max-w-3xl mx-auto space-y-5 leading-relaxed`}
        >
          <p>
            In a world that’s constantly evolving, the ability to learn, adapt, and thrive is your strongest currency.
            Every course is a step toward unlocking your full potential.
          </p>
          <p>
            Edu<span className={`${gradientText} font-medium`}>Manage</span> is your dedicated companion on this journey—
            empowering you with the resources, mentorship, and community to truly master the skills shaping the future.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default KnowledgeSection;