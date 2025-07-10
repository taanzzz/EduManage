import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import LoadingSpinner from './../Shared/LoadingSpinner';
import axiosSecure from '../../api/Axios';
import PopularClassCard from './PopularClassCard';

const PopularClasses = () => {
    const { data: popularClasses = [], isLoading } = useQuery({
        queryKey: ['popular-classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/public/popular-classes');
            return res.data;
        }
    });

    if (isLoading) return <div className="py-20"><LoadingSpinner /></div>;
    if (popularClasses.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, 
            },
        },
    };

    return (
        <div className="py-20 md:py-24 bg-base-200">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-base-content">
                        Join Our Most 
                        <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Popular Classes
                        </span>
                    </h2>
                    <p className="text-lg text-base-content/70 mt-3 max-w-2xl mx-auto">
                        Discover courses that are loved by thousands of learners for their quality and impact.
                    </p>
                </motion.div>
                
                
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {popularClasses.map(cls => (
                        <PopularClassCard key={cls._id} cls={cls} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default PopularClasses;