import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const Jobs = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-extrabold">Careers at EduManage</h1>
                    <p className="text-xl text-base-content/70 mt-4">
                        Join our mission to revolutionize education for everyone.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 p-10 bg-base-200 rounded-2xl shadow-lg"
                >
                    <h2 className="text-3xl font-bold">Current Openings</h2>
                    <p className="text-lg mt-4 text-base-content/80">
                        We don't have any open positions at the moment, but we are always looking for talented individuals.
                    </p>
                     <a href="mailto:careers@edumanage.com" className="btn btn-primary mt-6 text-white">
                        <FaPaperPlane /> Email Your Resume
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Jobs;