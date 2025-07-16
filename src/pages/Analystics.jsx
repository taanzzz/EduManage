import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', students: 400 }, { name: 'Feb', students: 300 },
    { name: 'Mar', students: 600 }, { name: 'Apr', students: 800 },
];

const Analytics = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-extrabold">Course Analytics</h1>
                <p className="text-xl text-base-content/70 mt-4">Track your performance and gain valuable insights.</p>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mt-16 p-8 bg-base-200 rounded-2xl shadow-lg h-96"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="students" fill="var(--fallback-p, oklch(var(--p)))" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};
export default Analytics;