import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';

const Claim = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-6" />
                    <h1 className="text-5xl font-extrabold">Submit a Claim</h1>
                    <p className="text-xl text-base-content/70 mt-4">
                        Report any issues or concerns regarding our content or platform.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 p-10 bg-base-200 rounded-2xl shadow-lg"
                >
                    <h2 className="text-3xl font-bold">Feature Under Development</h2>
                    <p className="text-lg mt-4 text-base-content/80 max-w-2xl mx-auto">
                        We are currently working on a streamlined process for claims submission. For any urgent matters, please contact our support team directly.
                    </p>
                     <a href="mailto:support@edumanage.com" className="btn btn-primary mt-6 text-white">
                        <FaEnvelope /> Contact Support
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Claim;