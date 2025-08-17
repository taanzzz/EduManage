import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import LoadingSpinner from './../Shared/LoadingSpinner';
import axiosSecure from './../../api/Axios';
import { useTheme } from '../../hooks/useTheme';


const FeaturedInstructors = () => {
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();
    
    const { data: teachers = [], isLoading } = useQuery({
        queryKey: ['featured-teachers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/public/featured-teachers');
            return res.data.reverse();
        }
    });

    if (isLoading) return (
        <div className={`py-20 ${getThemeClasses.pageBackground}`}>
            <LoadingSpinner />
        </div>
    );
    
    if (teachers.length === 0) return null;

    const maxEnrollment = Math.max(...teachers.map(t => t.totalEnrollment));

    // Dynamic gradient colors based on theme
    const gradientColors = isDark ? [
        'from-cyan-500 to-teal-400',
        'from-blue-500 to-cyan-400', 
        'from-teal-500 to-emerald-400', 
        'from-indigo-500 to-cyan-400', 
        'from-purple-500 to-blue-400'  
    ] : [
        'from-green-500 to-emerald-400',
        'from-emerald-500 to-teal-400', 
        'from-lime-500 to-green-400', 
        'from-teal-500 to-cyan-400', 
        'from-green-600 to-lime-400'  
    ];

    return (
        <section className={`py-24 px-4 md:px-6 ${getThemeClasses.pageBackground} relative overflow-hidden`}>
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30">
                <div className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse ${
                    isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                }`} />
                <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
                    isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
                }`} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.h2 
                        className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className={`${gradientText} font-bold drop-shadow-lg`}>
                            Learn From The
                        </span>
                        <span className={`block mt-2 ${
                            isDark 
                                ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400' 
                                : 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600'
                        } bg-clip-text text-transparent`}>
                            Industry's Best
                        </span>
                    </motion.h2>
                    <motion.p 
                        className={`text-lg ${getThemeClasses.secondaryText} mt-6 max-w-3xl mx-auto leading-relaxed`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Discover the educators redefining excellence in learning with innovative approaches and proven results.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Chart Bars */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className={`lg:col-span-3 space-y-6 ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} rounded-3xl p-8 ${hoverGlow}`}
                        whileHover={{ scale: 1.01, y: -5 }}
                    >
                        <motion.h3 
                            className={`text-2xl font-bold ${getThemeClasses.primaryText} mb-6 flex items-center gap-3`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-3xl">📊</span>
                            <span className={isDark ? 'text-cyan-400' : 'text-green-600'}>
                                Enrollment Chart
                            </span>
                        </motion.h3>
                        
                        {teachers.map((teacher, index) => {
                            const percentage = (teacher.totalEnrollment / maxEnrollment) * 100;
                            const color = gradientColors[index % gradientColors.length];

                            return (
                                <motion.div 
                                    key={teacher._id} 
                                    className="w-full"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span className={`text-sm font-semibold ${getThemeClasses.primaryText}`}>
                                            {teacher.name}
                                        </span>
                                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                            isDark 
                                                ? 'bg-cyan-500/20 text-cyan-300' 
                                                : 'bg-green-500/20 text-green-700'
                                        }`}>
                                            {teacher.totalEnrollment.toLocaleString()} students
                                        </span>
                                    </div>
                                    
                                    <div className={`relative h-4 rounded-full overflow-hidden ${
                                        isDark ? 'bg-slate-700/50' : 'bg-gray-200'
                                    }`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${percentage}%` }}
                                            transition={{ 
                                                duration: 1.2 + index * 0.1, 
                                                ease: "easeOut",
                                                delay: 0.3 
                                            }}
                                            viewport={{ once: true }}
                                            className={`h-full bg-gradient-to-r ${color} rounded-full shadow-lg relative overflow-hidden`}
                                        >
                                            {/* Shimmer effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                        </motion.div>
                                    </div>
                                </motion.div>
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
                                className={`flex items-center gap-5 p-6 rounded-2xl ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} ${hoverGlow} cursor-pointer`}
                                whileHover={{ 
                                    scale: 1.03, 
                                    y: -8,
                                    rotateY: 5 
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div 
                                    className="avatar"
                                    whileHover={{ 
                                        scale: 1.1,
                                        rotate: 5 
                                    }}
                                >
                                    <div className={`w-20 h-20 rounded-full ring-4 ring-offset-4 ${
                                        isDark 
                                            ? 'ring-cyan-400/50 ring-offset-slate-800' 
                                            : 'ring-green-400/50 ring-offset-white'
                                    } shadow-lg`}>
                                        <img 
                                            src={teacher.image} 
                                            alt={teacher.name}
                                            className="object-cover"
                                        />
                                    </div>
                                </motion.div>
                                
                                <div className="flex-1">
                                    <motion.h4 
                                        className={`text-lg font-bold ${getThemeClasses.primaryText} mb-1`}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {teacher.name}
                                    </motion.h4>
                                    <p className={`text-sm ${getThemeClasses.mutedText} flex items-center gap-2`}>
                                        <span className="text-lg">👨‍🏫</span>
                                        <span className={`font-semibold ${
                                            isDark ? 'text-cyan-400' : 'text-green-600'
                                        }`}>
                                            {teacher.totalEnrollment.toLocaleString()}
                                        </span>
                                        Students Taught
                                    </p>
                                    
                                    {/* Progress indicator */}
                                    <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${
                                        isDark ? 'bg-slate-700' : 'bg-gray-200'
                                    }`}>
                                        <motion.div
                                            className={`h-full bg-gradient-to-r ${
                                                gradientColors[index % gradientColors.length]
                                            } rounded-full`}
                                            initial={{ width: 0 }}
                                            whileInView={{ 
                                                width: `${(teacher.totalEnrollment / maxEnrollment) * 100}%` 
                                            }}
                                            transition={{ 
                                                duration: 1,
                                                delay: 0.5 + index * 0.1 
                                            }}
                                            viewport={{ once: true }}
                                        />
                                    </div>
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