import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

const KnowledgeSection = () => {
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
    <section className="relative z-10 bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-20 md:py-28 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-6xl mx-auto px-4 md:px-6 text-center"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-br from-primary to-secondary/70 rounded-full shadow-lg">
            <FaLightbulb className="text-white w-10 h-10" />
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold leading-tight text-base-content"
        >
          The Greatest Investment is in
          <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Your Own Knowledge
          </span>
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl text-base-content/80 max-w-3xl mx-auto space-y-5 leading-relaxed"
        >
          <p>
            In a world that’s constantly evolving, the ability to learn, adapt, and thrive is your strongest currency.
            Every course is a step toward unlocking your full potential.
          </p>
          <p>
            Edu<span className="bg-gradient-to-br from-primary to-secondary/80 bg-clip-text text-transparent font-medium">Manage</span> is your dedicated companion on this journey—
            empowering you with the resources, mentorship, and community to truly master the skills shaping the future.
          </p>
        </motion.div>
      </motion.div>

      
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary to-secondary opacity-20 blur-3xl rounded-full -z-10" />
<div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent to-secondary opacity-20 blur-3xl rounded-full -z-10" />

    </section>
  );
};

export default KnowledgeSection;
