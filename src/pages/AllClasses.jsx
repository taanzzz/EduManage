import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosSecure from '../api/Axios';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import ClassCard from '../components/Shared/ClassCard';
import { useTheme } from '../hooks/useTheme';

const AllClasses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

    const { data: classData, isLoading } = useQuery({
        queryKey: ['approved-classes', currentPage, searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/classes/approved?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <div className={getThemeClasses.pageBackground}><LoadingSpinner /></div>;
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
        <div className={`w-full min-h-screen p-4 sm:p-6 md:p-8 ${getThemeClasses.pageBackground} relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
                <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                    isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                }`} />
                <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
                    isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
                }`} />
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className={`${getThemeClasses.cardBackground} mb-12 text-center py-14 px-6 md:px-10 backdrop-blur-lg rounded-3xl ${getThemeClasses.shadow} ${hoverGlow}`}>
                    <h1 className={`text-4xl md:text-5xl font-extrabold ${gradientText}`}>
                        Explore Our Classes
                    </h1>
                    <p className={`text-lg ${getThemeClasses.secondaryText} mt-2`}>Find the perfect class to achieve your learning goals.</p>
                    <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto">
                        <div className="join w-full">
                            <input
                                name="search"
                                className={`input input-bordered join-item w-full ${getThemeClasses.inputBackground} focus:outline-none focus:ring-2 ${
                                    isDark ? 'focus:ring-cyan-400' : 'focus:ring-green-400'
                                } rounded-l-full`}
                                placeholder="Search by class title..."
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`btn join-item rounded-r-full text-white ${hoverGlow} ${
                                    isDark
                                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400'
                                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
                                }`}
                            >
                                Search
                            </motion.button>
                        </div>
                    </form>
                </div>

                {approvedClasses.length === 0 && !isLoading ? (
                    <div className="text-center py-20">
                        <h2 className={`text-2xl font-bold ${getThemeClasses.primaryText}`}>
                            No classes found {searchTerm && `for "${searchTerm}"`}
                        </h2>
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
                                <motion.button
                                    key={number + 1}
                                    onClick={() => setCurrentPage(number + 1)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`join-item btn ${getThemeClasses.primaryText} border-base-300 ${
                                        currentPage === number + 1
                                            ? isDark
                                                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                                                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                            : 'hover:bg-base-300'
                                    } ${hoverGlow}`}
                                >
                                    {number + 1}
                                </motion.button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllClasses;