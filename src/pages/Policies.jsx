import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaShieldAlt, FaCookieBite, FaFileContract } from 'react-icons/fa';

const Policies = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl font-extrabold">Our Policies</h1>
                    <p className="text-xl text-base-content/70 mt-4">
                        Clear, transparent guidelines on how we operate and protect your data.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link to="/privacy" className="card bg-base-200 p-8 shadow-lg hover:-translate-y-2 transition-transform">
                        <FaShieldAlt className="text-4xl text-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Privacy Policy</h3>
                        <p className="mt-2 text-base-content/80">How we collect and use your data.</p>
                    </Link>
                    <Link to="/terms" className="card bg-base-200 p-8 shadow-lg hover:-translate-y-2 transition-transform">
                        <FaFileContract className="text-4xl text-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Terms of Service</h3>
                        <p className="mt-2 text-base-content/80">The rules for using our platform.</p>
                    </Link>
                    <Link to="#" className="card bg-base-200 p-8 shadow-lg hover:-translate-y-2 transition-transform">
                        <FaCookieBite className="text-4xl text-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Cookie Policy</h3>
                        <p className="mt-2 text-base-content/80">How we use cookies to improve your experience.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Policies;