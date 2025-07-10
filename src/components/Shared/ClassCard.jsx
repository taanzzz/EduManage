import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaUsers, FaArrowRight } from 'react-icons/fa';

const ClassCard = ({ cls }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            variants={cardVariants}
            className="card bg-base-100 shadow-xl border border-base-300/20 transition-all duration-300 hover:shadow-2xl hover:border-primary/40 group overflow-hidden"
        >
            <figure className="relative h-56">
                <img src={cls.image} alt={cls.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-lg font-bold shadow-lg">
                    ${cls.price}
                </div>
            </figure>
            <div className="card-body p-5">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={cls.teacher.image} alt={cls.teacher.name} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-base-content">{cls.teacher.name}</h3>
                        <p className="text-xs text-base-content/70">Instructor</p>
                    </div>
                </div>
                <h2 className="card-title text-xl font-bold mt-4 h-14">{cls.title}</h2>
                <div className="flex justify-between items-center mt-4 text-base-content/80 border-t border-base-300/50 pt-3">
                    <div className="flex items-center gap-2">
                        <FaUsers className="text-secondary" />
                        <span>{cls.totalEnrollment} Enrolled</span>
                    </div>
                    <Link to={`/class-details/${cls._id}`} className="btn btn-sm btn-ghost text-primary">
                        Details <FaArrowRight />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ClassCard;