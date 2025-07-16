import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Our Blog
                    </h1>
                    <p className="text-xl text-base-content/70 mt-4">
                        Insights, articles, and stories from the world of learning.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 p-10 bg-base-200 rounded-2xl shadow-lg"
                >
                    <h2 className="text-3xl font-bold">Coming Soon!</h2>
                    <p className="text-lg mt-2 text-base-content/80">
                        We are working hard to bring you insightful articles and updates. Stay tuned!
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;