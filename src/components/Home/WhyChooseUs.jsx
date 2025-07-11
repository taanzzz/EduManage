import React from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaLaptopCode, FaUsers, FaCertificate } from 'react-icons/fa';

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
                        Why <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">EduManage</span> Stands Out
                    </h2>
                    <p className="text-lg text-base-content/70 mt-4 max-w-3xl mx-auto">
                        We provide a complete ecosystem for learning that empowers both students and instructors through a combination of cutting-edge technology and expert-led content.
                    </p>
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
                            className="card bg-base-200 p-8 text-center items-center rounded-2xl shadow-lg border border-transparent hover:border-primary hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="text-5xl p-5 rounded-full mb-6 bg-gradient-to-br from-primary to-secondary text-white shadow-md">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-base-content mb-3">{feature.title}</h3>
                            <p className="text-base text-base-content/80">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
