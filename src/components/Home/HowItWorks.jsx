import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCreditCard, FaLaptopCode } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const steps = [
    {
        icon: <FaSearch />,
        title: "Explore Courses",
        description: "Find the perfect course from our extensive library of expert-led classes. Use filters to narrow down your search.",
        color: "text-primary"
    },
    {
        icon: <FaCreditCard />,
        title: "Enroll & Pay Securely",
        description: "Once you've chosen a class, enroll with a single click and complete your payment through our secure gateway.",
        color: "text-secondary"
    },
    {
        icon: <FaLaptopCode />,
        title: "Start Learning",
        description: "Get immediate access to all course materials, join the community, and start your learning journey at your own pace.",
        color: "text-accent"
    }
];

const HowItWorks = () => {
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: 'easeOut' }
        }
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
                        transition={{ duration: 0.3 }}
                    >
                        Start Your Journey in 
                        <span className={`block mt-2 ${gradientText} drop-shadow-lg`}>
                            Three Simple Steps
                        </span>
                    </motion.h2>
                    <motion.p 
                        className={`text-lg ${getThemeClasses.secondaryText} mt-4 max-w-2xl mx-auto leading-relaxed`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        We've simplified the process of learning. Follow these steps to get started.
                    </motion.p>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className={`relative ${getThemeClasses.cardBackground} p-8 text-center items-center rounded-3xl ${getThemeClasses.shadow} ${hoverGlow}`}
                            whileHover={{ scale: 1.03, y: -5 }}
                        >
                            <span className={`absolute -top-4 -left-4 text-8xl font-black ${getThemeClasses.mutedText} opacity-20 z-0`}>
                                0{index + 1}
                            </span>
                            
                            <div className="relative z-10">
                                <motion.div 
                                    className={`text-5xl p-5 rounded-full mb-6 inline-block ${
                                        isDark 
                                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500' 
                                            : 'bg-gradient-to-r from-green-500 to-emerald-500'
                                    } text-white shadow-lg`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    {step.icon}
                                </motion.div>
                                <h3 className={`text-2xl font-bold mb-3 ${getThemeClasses.primaryText}`}>{step.title}</h3>
                                <p className={getThemeClasses.secondaryText}>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className={`mt-20 max-w-3xl mx-auto text-center ${getThemeClasses.cardBackground} p-6 rounded-2xl ${getThemeClasses.shadow} ${hoverGlow}`}
                    whileHover={{ scale: 1.02 }}
                >
                    <h4 className={`text-xl md:text-2xl font-semibold ${getThemeClasses.primaryText}`}>
                        🎓 Want to Teach Instead?
                    </h4>
                    <p className={`text-base ${getThemeClasses.secondaryText} mt-2`}>
                        Not just students — <span className={`${isDark ? 'text-cyan-400' : 'text-green-600'} font-medium`}>you can also apply to become a teacher</span> and share your expertise with the world.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default HowItWorks;