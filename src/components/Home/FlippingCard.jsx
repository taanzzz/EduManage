// 📁 File: src/components/Home/FlippingCard.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const FlippingCard = ({ slide }) => {
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
                transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
                {/* --- Front Side --- */}
                <div className="absolute w-full h-full bg-base-100 rounded-2xl shadow-lg p-8 flex flex-col justify-center items-center text-center" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="text-5xl text-primary mb-4">{slide.icon}</div>
                    <h3 className="text-2xl font-bold">{slide.title}</h3>
                    <p className="mt-2 text-base-content/70">{slide.frontText}</p>
                </div>

                {/* --- Back Side --- */}
                <div className="absolute w-full h-full bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-lg p-8 flex flex-col justify-center items-center text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <h4 className="text-xl font-bold mb-4">{slide.title}</h4>
                    <p className="flex-grow">{slide.backText}</p>
                    <Link to={slide.link} className="btn btn-outline btn-ghost text-white mt-4">
                        {slide.buttonText}
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default FlippingCard;