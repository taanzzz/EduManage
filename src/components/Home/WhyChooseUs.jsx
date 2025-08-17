import React from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaLaptopCode, FaUsers, FaCertificate } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const features = [
    {
        icon: <FaChalkboardTeacher />,
        title: 'Expert Instructors',
        description: 'Learn from industry experts who are passionate about teaching and have years of real-world experience.'
    },
    {
        icon: <FaLaptopCode />,
        title: 'Interactive Learning',
        description: 'Engage with hands-on projects, quizzes, and assignments that make learning practical and fun.'
    },
    {
        icon: <FaUsers />,
        title: 'Community Support',
        description: 'Join a vibrant community of learners and educators to collaborate, ask questions, and grow together.'
    },
    {
        icon: <FaCertificate />,
        title: 'Valuable Certificates',
        description: 'Earn recognized certificates upon course completion to showcase your new skills and enhance your resume.'
    }
];

const WhyChooseUs = () => {
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
    };

    return (
        <div className={`py-20 md:py-28 ${getThemeClasses.pageBackground} relative overflow-hidden`}>
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
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.h2 
                        className={`text-4xl md:text-5xl font-extrabold ${getThemeClasses.primaryText} mb-4`}
                        whileHover={{ scale: 1.02 }}
                    >
                        Why <span className={`${gradientText} drop-shadow-lg`}>EduManage</span> Stands Out
                    </motion.h2>
                    <motion.p 
                        className={`text-lg ${getThemeClasses.secondaryText} mt-4 max-w-3xl mx-auto leading-relaxed`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        We provide a complete ecosystem for learning that empowers both students and instructors through a combination of cutting-edge technology and expert-led content.
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className={`${getThemeClasses.cardBackground} p-8 text-center items-center rounded-3xl ${getThemeClasses.shadow} ${hoverGlow}`}
                            whileHover={{ scale: 1.03, y: -5 }}
                        >
                            <motion.div 
                                className={`text-5xl p-5 rounded-full mb-6 ${
                                    isDark 
                                        ? 'bg-gradient-to-br from-cyan-500 to-teal-500' 
                                        : 'bg-gradient-to-br from-green-500 to-emerald-500'
                                } text-white shadow-lg`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className={`text-xl font-bold ${getThemeClasses.primaryText} mb-3`}>{feature.title}</h3>
                            <p className={getThemeClasses.secondaryText}>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default WhyChooseUs;