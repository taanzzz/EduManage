import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaUsers, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const PopularClassCard = ({ cls }) => {
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
    };

    return (
        <motion.div
            variants={cardVariants}
            className={`group relative rounded-3xl overflow-hidden ${getThemeClasses.shadow} ${hoverGlow}`}
            whileHover={{ 
                scale: 1.03, 
                y: -5,
                rotateY: 5 
            }}
        >
            
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${
                isDark ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20' : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
            }`} />

            <div className={`relative z-10 ${getThemeClasses.cardBackground} m-1 rounded-2xl`}>

                <figure className="relative h-56 overflow-hidden rounded-t-2xl">
                    <img src={cls.image} alt={cls.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-sm font-bold ${
                        isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-green-500/20 text-green-700'
                    }`}>
                        ${cls.price}
                    </div>
                </figure>

                <div className="p-5 flex flex-col h-64">
                    <h2 className={`card-title text-xl font-bold flex-grow ${getThemeClasses.primaryText}`}>{cls.title}</h2>
                    
                    <div className="flex items-center gap-3 my-4">
                        <motion.div 
                            className="avatar"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <div className={`w-10 rounded-full ring-2 ring-offset-2 ${
                                isDark ? 'ring-cyan-400/50 ring-offset-slate-800' : 'ring-green-400/50 ring-offset-white'
                            }`}>
                                <img src={cls.teacher.image} alt={cls.teacher.name} />
                            </div>
                        </motion.div>
                        <p className={`text-sm font-semibold ${getThemeClasses.secondaryText}`}>{cls.teacher.name}</p>
                    </div>

                    <div className={`flex justify-between items-center pt-3 border-t ${
                        isDark ? 'border-slate-700/50' : 'border-gray-200/50'
                    }`}>
                        <div className={`flex items-center gap-2 ${getThemeClasses.secondaryText}`}>
                            <FaUsers className={`${isDark ? 'text-cyan-400' : 'text-green-600'}`} />
                            <span className="font-medium">{cls.totalEnrollment} Students</span>
                        </div>
                        
                        
                        <Link to={`/class-details/${cls._id}`} className={`group flex items-center px-4 py-2 rounded-xl ${
                            isDark 
                                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' 
                                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        } font-semibold transition-all duration-300 ${hoverGlow}`}>
                            View Details 
                            <motion.div
                                className="ml-2"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FaArrowRight />
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PopularClassCard;