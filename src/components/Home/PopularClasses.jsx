import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import LoadingSpinner from './../Shared/LoadingSpinner';
import axiosSecure from '../../api/Axios';
import PopularClassCard from './PopularClassCard';
import { useTheme } from '../../hooks/useTheme';

const PopularClasses = () => {
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

    const { data: popularClasses = [], isLoading } = useQuery({
        queryKey: ['popular-classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/public/popular-classes');
            return res.data;
        }
    });

    if (isLoading) return <div className={`py-20 ${getThemeClasses.pageBackground}`}><LoadingSpinner /></div>;
    if (popularClasses.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, 
            },
        },
    };

    return (
        <div className={`py-20 md:py-24 ${getThemeClasses.pageBackground} relative overflow-hidden`}>
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20">
                <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                    isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                }`} />
                <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
                    isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
                }`} />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <motion.h2 
                        className={`text-4xl md:text-5xl font-extrabold ${getThemeClasses.primaryText} mb-4`}
                        whileHover={{ scale: 1.02 }}
                    >
                        Join Our Most 
                        <span className={`block mt-2 ${gradientText} drop-shadow-lg`}>
                            Popular Classes
                        </span>
                    </motion.h2>
                    <motion.p 
                        className={`text-lg ${getThemeClasses.secondaryText} mt-3 max-w-2xl mx-auto leading-relaxed`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Discover courses that are loved by thousands of learners for their quality and impact.
                    </motion.p>
                </motion.div>
                
                
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {popularClasses.map(cls => (
                        <PopularClassCard key={cls._id} cls={cls} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default PopularClasses;