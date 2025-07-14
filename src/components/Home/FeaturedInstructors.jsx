import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import LoadingSpinner from './../Shared/LoadingSpinner';
import axiosSecure from './../../api/Axios';

const FeaturedInstructors = () => {
    const { data: teachers = [], isLoading } = useQuery({
        queryKey: ['featured-teachers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/public/featured-teachers');
            return res.data.reverse();
        }
    });

    if (isLoading) return <div className="py-20"><LoadingSpinner /></div>;
    if (teachers.length === 0) return null;

    const maxEnrollment = Math.max(...teachers.map(t => t.totalEnrollment));

    const gradientColors = [
        'from-[#4f46e5] to-[#2DD4BF]', 
        'from-[#ec4899] to-[#22d3ee]', 
        'from-[#10b981] to-[#F3F4F6]', 
        'from-[#f59e0b] to-[#6366f1]', 
        'from-[#06b6d4] to-[#f472b6]'  
    ];

    return (
        <section className="py-24 px-4 md:px-6 bg-gradient-to-br from-base-100 to-base-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-base-content ">
                    <span className="bg-gradient-to-br from-primary to-secondary/80 bg-clip-text text-transparent font-bold">
                    Learn From The
                    </span>
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-500 to-secondary">
                            Industry’s Best
                        </span>
                    </h2>
                    <p className="text-lg text-base-content/70 mt-4 max-w-3xl mx-auto">
                        Discover the educators redefining excellence in learning.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Chart Bars */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-3 space-y-5 bg-white/70 dark:bg-base-300 backdrop-blur-lg border border-base-300 rounded-3xl shadow-xl p-6"
                    >
                        <h3 className="text-xl font-semibold text-base-content mb-2">
                            📊 Enrollment Chart
                        </h3>
                        {teachers.map((teacher, index) => {
                            const percentage = (teacher.totalEnrollment / maxEnrollment) * 100;
                            const color = gradientColors[index % gradientColors.length];

                            return (
                                <div key={teacher._id} className="w-full">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-base-content">{teacher.name}</span>
                                        <span className="text-sm text-base-content/70">{teacher.totalEnrollment.toLocaleString()} students</span>
                                    </div>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${percentage}%` }}
                                        transition={{ duration: 1 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`h-5 rounded-xl bg-gradient-to-r ${color} shadow-md`}
                                    ></motion.div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Instructor Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {teachers.slice(0, 4).map((teacher, index) => (
                            <motion.div
                                key={teacher._id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 * index }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-base-200 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                            >
                                <div className="avatar">
                                    <div className="w-16 h-16 rounded-full ring-2 ring-offset-2 ring-primary/80">
                                        <img src={teacher.image} alt={teacher.name} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-base-content">
                                        {teacher.name}
                                    </h4>
                                    <p className="text-sm text-base-content/60">
                                        👨‍🏫 {teacher.totalEnrollment.toLocaleString()} Students Taught
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedInstructors;
