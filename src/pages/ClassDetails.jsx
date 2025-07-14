import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../api/Axios';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import StickySidebar from '../components/Shared/StickySidebar'; 
import { FaCheckCircle } from 'react-icons/fa';

const ClassDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: classDetails, isLoading, isError } = useQuery({
        queryKey: ['class-details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/classes/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError || !classDetails) return <div className="text-center text-2xl font-bold py-20">Could not find class details.</div>;

    const { title, image, description, teacher } = classDetails;

    const handleEnroll = () => {
        toast.info('Redirecting to payment page...');
        navigate(`/payment/${id}`);
    };

    return (
        <div className="bg-gradient-to-b from-base-100 to-base-200">
            <div className="relative h-80 bg-cover bg-center rounded-b-3xl shadow-lg overflow-hidden" style={{ backgroundImage: `url(${image})` }}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-6xl font-extrabold drop-shadow-xl"
                    >
                        {title}
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex items-center gap-4 mt-6"
                    >
                        <div className="avatar">
                            <div className="w-14 rounded-full ring-2 ring-offset-2 ring-primary">
                                <img src={teacher.image} alt={teacher.name} />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold drop-shadow-md">Taught by {teacher.name}</h3>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                            <h2 className="text-3xl font-bold text-base-content mb-4">About This Class</h2>
                            <p className="text-lg text-base-content/80 leading-relaxed text-justify">{description}</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                            <h2 className="text-3xl font-bold text-base-content mb-4">What You'll Learn</h2>
                            <ul className="space-y-4 text-base-content">
                                <li className="flex items-center gap-3 text-lg"><FaCheckCircle className="text-green-500" /> Gain practical skills through hands-on learning.</li>
                                <li className="flex items-center gap-3 text-lg"><FaCheckCircle className="text-green-500" /> Create real-world projects with confidence.</li>
                                <li className="flex items-center gap-3 text-lg"><FaCheckCircle className="text-green-500" /> Develop a strong foundation in key concepts.</li>
                                <li className="flex items-center gap-3 text-lg"><FaCheckCircle className="text-green-500" /> Enhance your career opportunities with in-demand skills.</li>
                            </ul>
                        </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                        <StickySidebar classDetails={classDetails} onEnroll={handleEnroll} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;
