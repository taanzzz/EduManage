import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaCode, FaCogs } from 'react-icons/fa';

const Documentation = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-5xl mx-auto px-4">
                
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-extrabold">Developer Documentation</h1>
                    <p className="text-xl text-base-content/70 mt-4">
                        Explore our comprehensive guides and API references to build with EduManage.
                    </p>
                </motion.div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="card bg-base-200 p-8 shadow-lg"
                    >
                        <FaBook className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Getting Started</h3>
                        <p className="mt-2 text-base-content/80">
                            A step-by-step guide to setting up your environment and making your first API call.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="card bg-base-200 p-8 shadow-lg"
                    >
                        <FaCode className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">API Reference</h3>
                        <p className="mt-2 text-base-content/80">
                            Detailed documentation for every endpoint, including request and response examples.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="card bg-base-200 p-8 shadow-lg"
                    >
                        <FaCogs className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Integrations</h3>
                        <p className="mt-2 text-base-content/80">
                            Learn how to integrate EduManage with other popular services and platforms.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Documentation;