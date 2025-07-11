import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-base-100 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div 
              className="sm:text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-base-content sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Unlock Your Potential,</span>{' '}
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent xl:inline">
                  One Course at a Time
                </span>
              </h1>
              <p className="mt-3 text-base text-base-content/80 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Welcome to EduManage, where learning knows no bounds. Get access to thousands of expert-led courses, a vibrant community, and cutting-edge tools to propel your career forward.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/all-classes"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10 transition-transform hover:scale-105"
                  >
                    Explore Courses
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/teach-on-edu"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 md:py-4 md:text-lg md:px-10"
                  >
                    Become an Instructor <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
      
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <motion.div 
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-primary via-accent to-secondary"
          style={{ backgroundSize: '200% 200%' }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <div className="w-full h-full flex items-center justify-center bg-base-100/10 backdrop-blur-sm">
            <FaGraduationCap className="text-white/20 text-[20rem]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;