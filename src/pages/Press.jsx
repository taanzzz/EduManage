import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const Press = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                 <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-extrabold">Press & Media</h1>
                    <p className="text-xl text-base-content/70 mt-4">
                        For all media inquiries and assets, please reach out to our team.
                    </p>
                </motion.div>
                
                 <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 p-10 bg-base-200 rounded-2xl shadow-lg"
                >
                    <h2 className="text-3xl font-bold">Media Kit</h2>
                    <p className="text-lg mt-4 text-base-content/80">
                        Our media kit including logos, brand guidelines, and press releases is available for download.
                    </p>
                     <button className="btn btn-secondary mt-6 text-white">
                        <FaDownload /> Download Press Kit
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Press;