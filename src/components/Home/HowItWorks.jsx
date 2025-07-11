import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCreditCard, FaLaptopCode } from 'react-icons/fa';


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
        <div className="py-20 md:py-28 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-base-content">
                        Start Your Journey in 
                        <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                            Three Simple Steps
                        </span>
                    </h2>
                    <p className="text-lg text-base-content/70 mt-4 max-w-2xl mx-auto">
                        We've simplified the process of learning. Follow these steps to get started.
                    </p>
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
                            className="relative card bg-base-200 p-8 text-center items-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                        >
                            
                            <span className="absolute -top-4 -left-4 text-8xl font-black text-base-content/5 opacity-50 z-0">
                                0{index + 1}
                            </span>
                            
                            
                            <div className="relative z-10">
                                <div className={`text-5xl p-5 rounded-full mb-6 inline-block bg-base-100 ${step.color}`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-base-content/80">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default HowItWorks;