import React from 'react';
import { motion } from 'framer-motion';
import { FaBullhorn, FaChartLine, FaShareAlt } from 'react-icons/fa';

const Marketing = () => {
    return (
        <div className="bg-base-100 min-h-screen">
            {/* Hero Section */}
            <div className="relative pt-24 pb-16 text-center text-white bg-primary">
                <h1 className="text-5xl font-extrabold">Marketing Solutions</h1>
                <p className="mt-4 text-xl">Drive Growth and Reach a Wider Audience</p>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-base-200">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                    <div className="card bg-base-100 p-8 text-center shadow-lg">
                        <FaBullhorn className="text-4xl text-secondary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Campaigns</h3>
                        <p className="mt-2">Launch targeted marketing campaigns to promote your courses.</p>
                    </div>
                    <div className="card bg-base-100 p-8 text-center shadow-lg">
                        <FaShareAlt className="text-4xl text-secondary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Social Media</h3>
                        <p className="mt-2">Integrate with social platforms to increase your reach.</p>
                    </div>
                    <div className="card bg-base-100 p-8 text-center shadow-lg">
                        <FaChartLine className="text-4xl text-secondary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">SEO Tools</h3>
                        <p className="mt-2">Optimize your course pages for better search engine visibility.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Marketing;