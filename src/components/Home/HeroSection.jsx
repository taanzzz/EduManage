import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
    return (
        <div className="py-20 md:py-28 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-base-content leading-tight">
                            Unlock Your Potential,
                            <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                One Course at a Time
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-base-content/80">
                            Welcome to EduManage, where learning knows no bounds. Get access to thousands of expert-led courses, a vibrant community, and cutting-edge tools that will propel your career forward.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link to="/all-classes" className="btn btn-primary btn-lg text-white">
                                Explore Courses
                            </Link>
                            <Link to="/teach-on-edu" className="btn btn-ghost btn-lg">
                                Become an Instructor <FaArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </motion.div>

                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="p-4 bg-base-200 rounded-2xl shadow-2xl">
                             <img 
                                src="https://i.ibb.co/hZJ4z4F/instructor.jpg" 
                                alt="A person learning online" 
                                className="rounded-xl w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;