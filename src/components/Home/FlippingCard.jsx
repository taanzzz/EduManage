import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useTheme } from '../../hooks/useTheme';

const FlippingCard = ({ slide }) => {
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();
    const [isFlipped, setIsFlipped] = useState(false);

    const handleHoverStart = () => setIsFlipped(true);
    const handleHoverEnd = () => setIsFlipped(false);

    return (
        <div 
            className="w-full h-full" 
            onMouseEnter={handleHoverStart} 
            onMouseLeave={handleHoverEnd}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -10 }}
            >
                {/* Front Side */}
                <motion.div 
                    className={`absolute w-full h-full ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden ${hoverGlow}`}
                    style={{ backfaceVisibility: 'hidden' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Background gradient effects */}
                    <div className={`absolute inset-0 opacity-10 ${
                        isDark 
                            ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20' 
                            : 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
                    } blur-xl`} />

                    {/* Animated background orb */}
                    <motion.div
                        className={`absolute top-4 right-4 w-16 h-16 rounded-full blur-2xl ${
                            isDark ? 'bg-cyan-400/20' : 'bg-green-400/20'
                        }`}
                        animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            repeatType: "reverse" 
                        }}
                    />

                    <motion.div 
                        className={`text-6xl md:text-7xl mb-6 ${
                            isDark ? 'text-cyan-400' : 'text-green-500'
                        } drop-shadow-lg relative z-10`}
                        whileHover={{ 
                            scale: 1.1,
                            rotate: 10
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {slide.icon}
                        
                        {/* Glow effect behind icon */}
                        <motion.div
                            className={`absolute inset-0 ${
                                isDark ? 'text-cyan-400/30' : 'text-green-500/30'
                            } blur-2xl -z-10`}
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                repeatType: "reverse" 
                            }}
                        >
                            {slide.icon}
                        </motion.div>
                    </motion.div>

                    <motion.h3 
                        className={`text-2xl md:text-3xl font-bold ${getThemeClasses.primaryText} mb-4 relative z-10`}
                        whileHover={{ scale: 1.05 }}
                    >
                        {slide.title}
                    </motion.h3>
                    
                    <motion.p 
                        className={`text-base ${getThemeClasses.secondaryText} leading-relaxed relative z-10`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {slide.frontText}
                    </motion.p>

                    {/* Decorative elements */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-2 h-2 rounded-full ${
                                isDark ? 'bg-cyan-400/30' : 'bg-green-400/30'
                            }`}
                            style={{
                                left: `${15 + (i * 20)}%`,
                                bottom: `${10 + (i % 2) * 5}%`,
                            }}
                            animate={{
                                scale: [0.5, 1, 0.5],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 2 + (i * 0.5),
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 0.4,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Back Side */}
                <motion.div 
                    className={`absolute w-full h-full ${
                        isDark 
                            ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500' 
                            : 'bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500'
                    } text-white rounded-3xl ${getThemeClasses.shadow} p-8 flex flex-col justify-center items-center text-center relative overflow-hidden`}
                    style={{ 
                        backfaceVisibility: 'hidden', 
                        transform: 'rotateY(180deg)' 
                    }}
                >
                    {/* Animated background pattern */}
                    <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                            backgroundSize: '40px 40px'
                        }}
                        animate={{ 
                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
                        }}
                        transition={{
                            duration: 15,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                    />

                    {/* Floating background elements */}
                    <motion.div
                        className="absolute top-6 right-6 w-20 h-20 rounded-full bg-white/10 blur-xl"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 0]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            repeatType: "reverse" 
                        }}
                    />

                    <motion.h4 
                        className="text-2xl md:text-3xl font-bold mb-6 drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {slide.title}
                    </motion.h4>
                    
                    <motion.p 
                        className="flex-grow text-white/90 leading-relaxed mb-8 text-base md:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {slide.backText}
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            to={slide.link} 
                            className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            {slide.buttonText}
                            <motion.span
                                className="inline-block ml-2"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    repeatType: "reverse" 
                                }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default FlippingCard;