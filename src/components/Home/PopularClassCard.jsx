import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaUsers, FaArrowRight } from 'react-icons/fa';

const PopularClassCard = ({ cls }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
    };

    return (
        <motion.div
            variants={cardVariants}
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        >
            
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            <div className="relative z-10 bg-base-100 m-1 rounded-xl">

                <figure className="relative h-56 overflow-hidden rounded-t-lg">
                    <img src={cls.image} alt={cls.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-4 right-4 bg-base-100/80 backdrop-blur-sm text-primary font-bold px-3 py-1 rounded-full">
                        ${cls.price}
                    </div>
                </figure>

                <div className="p-5 flex flex-col h-64">
                    <h2 className="card-title text-xl font-bold flex-grow">{cls.title}</h2>
                    
                    <div className="flex items-center gap-3 my-4">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={cls.teacher.image} alt={cls.teacher.name} />
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-base-content/80">{cls.teacher.name}</p>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-base-300/50">
                        <div className="flex items-center gap-2 text-base-content/80">
                            <FaUsers className="text-primary" />
                            <span className="font-medium">{cls.totalEnrollment} Students</span>
                        </div>
                        
                        
                        <Link to={`/class-details/${cls._id}`} className="btn btn-sm btn-primary text-white">
                            View Details <FaArrowRight className="ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PopularClassCard;