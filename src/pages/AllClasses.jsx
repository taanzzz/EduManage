import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosSecure from '../api/Axios';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import ClassCard from '../components/Shared/ClassCard';

const AllClasses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { data: classData, isLoading } = useQuery({
        queryKey: ['approved-classes', currentPage, searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/classes/approved?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const approvedClasses = classData?.classes || [];
    const totalPages = classData?.totalPages || 1;

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.search.value);
        setCurrentPage(1);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-b from-base-100 to-base-200">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-12 text-center py-14 px-6 md:px-10 bg-white/70 dark:bg-base-300 backdrop-blur-lg rounded-3xl shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
                        Explore Our Classes
                    </h1>
                    <p className="text-lg text-base-content/70 mt-2">Find the perfect class to achieve your learning goals.</p>
                    <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto">
                        <div className="join w-full">
                            <input name="search" className="input input-bordered join-item w-full bg-white/90 focus:outline-none focus:ring-2 focus:ring-secondary rounded-l-full" placeholder="Search by class title..."/>
                            <button type="submit" className="btn join-item rounded-r-full bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:scale-105 transition-transform duration-200">
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {approvedClasses.length === 0 && !isLoading ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-base-content">No classes found {searchTerm && `for "${searchTerm}"`}</h2>
                    </div>
                ) : (
                    <>
                        
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {approvedClasses.map(cls => <ClassCard key={cls._id} cls={cls} />)}
                        </motion.div>

                        
                        <div className="join flex justify-center mt-14">
                            {[...Array(totalPages).keys()].map(number => (
                                <button
                                    key={number + 1}
                                    onClick={() => setCurrentPage(number + 1)}
                                    className={`join-item btn text-base-content border-base-300 ${currentPage === number + 1 ? 'bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md' : 'hover:bg-base-300'}`}
                                >
                                    {number + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllClasses;
