import React from 'react';
import { FaUsers, FaDollarSign, FaCreditCard, FaChalkboardTeacher } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion';

const StickySidebar = ({ classDetails, onEnroll }) => {
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

    if (!classDetails) return null;

    const { price, totalEnrollment, teacher } = classDetails;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 ${getThemeClasses.cardBackground} rounded-2xl ${getThemeClasses.shadow} border border-base-300/20 lg:sticky lg:top-24 ${hoverGlow}`}
        >
            <h3 className="text-3xl font-bold text-center">
                <span className={`${isDark ? 'text-cyan-400' : 'text-green-600'}`}>${price}</span>
            </h3>
            <motion.button
                onClick={onEnroll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`btn w-full mt-6 text-lg text-white border-none ${
                    isDark
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
                } ${hoverGlow}`}
            >
                <FaCreditCard /> Enroll Now
            </motion.button>
            <div className={`divider ${getThemeClasses.secondaryText}`}>Details</div>
            <div className={`space-y-4 ${getThemeClasses.secondaryText}`}>
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 font-semibold"><FaChalkboardTeacher /> Instructor</span>
                    <span>{teacher.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 font-semibold"><FaUsers /> Enrolled</span>
                    <span>{totalEnrollment} Students</span>
                </div>
            </div>
        </motion.div>
    );
};

export default StickySidebar;