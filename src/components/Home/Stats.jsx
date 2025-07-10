import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaUsers, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import CountUp from 'react-countup'; 
import { useInView } from 'react-intersection-observer'; 
import axiosSecure from './../../api/Axios';

const Stats = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['site-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/public/stats');
            return res.data;
        }
    });
    
    
    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.3,    
    });

    const statsData = [
        { icon: <FaUsers />, value: stats?.totalUsers || 0, label: 'Active Learners' },
        { icon: <FaChalkboardTeacher />, value: stats?.totalClasses || 0, label: 'Expert-Led Courses' },
        { icon: <FaUserGraduate />, value: stats?.totalEnrollments || 0, label: 'Successful Enrollments' }
    ];

    return (
        <div ref={ref} className="py-20 md:py-24 bg-base-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <img src="https://i.ibb.co/L8B6d4c/community-learning.jpg" alt="Thriving Community" className="rounded-2xl shadow-2xl w-full" />
                    </motion.div>

                    
                    <div className="space-y-8">
                        <motion.div
                             initial={{ opacity: 0, y: 50 }}
                             animate={inView ? { opacity: 1, y: 0 } : {}}
                             transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-base-content">
                                Join a Global Community of 
                                <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Lifelong Learners
                                </span>
                            </h2>
                        </motion.div>
                        
                        {statsData.map((stat, index) => (
                             <motion.div 
                                key={index} 
                                className="flex items-center gap-6"
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                             >
                                <div className="p-4 bg-primary/10 text-primary rounded-xl">
                                    <div className="text-4xl">{stat.icon}</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold text-base-content">
                                        {isLoading ? '0' : <CountUp end={stat.value} duration={2.5} startOnMount={inView} />}
                                    </div>
                                    <div className="text-lg font-semibold text-base-content/80 mt-1">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;