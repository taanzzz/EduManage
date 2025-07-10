import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

// --- Status Badge Component ---
const StatusBadge = ({ status }) => {
    const statusClasses = {
        pending: 'badge-warning',
        approved: 'badge-success',
        rejected: 'badge-error',
    };
    return (
        <span className={`badge ${statusClasses[status] || 'badge-ghost'} text-white`}>
            {status}
        </span>
    );
};

// --- Main ManageClasses Component ---
const ManageClasses = () => {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    
    const { data, isLoading } = useQuery({
        queryKey: ['all-classes-admin', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/classes/admin/all?page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        },
        keepPreviousData: true, 
    });

    
    const mutation = useMutation({
        mutationFn: ({ classId, status }) => {
            return axiosSecure.patch(`/api/classes/admin/status/${classId}`, { status });
        },
        onSuccess: (data, variables) => {
            toast.success(`✅ Class has been ${variables.status}!`);
            queryClient.invalidateQueries({ queryKey: ['all-classes-admin'] });
        },
        onError: (error) => {
            toast.error(`❌ ${error.response?.data?.message || 'Action failed.'}`);
        }
    });

    const handleStatusUpdate = (classId, status) => {
        mutation.mutate({ classId, status });
    };

    const allclasses = data?.classes || [];
    const totalPages = data?.totalPages || 1;

    
    const filteredClasses = allclasses.filter(cls => {
        if (filter === 'all') return true;
        return cls.status === filter;
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-base-content">Manage Classes</h1>
                    <p className="text-lg text-base-content/70 mt-1">Review, approve, or reject class submissions.</p>
                </div>

                <div className="tabs tabs-boxed mb-6 bg-base-100 w-fit">
                    <a onClick={() => setFilter('all')} className={`tab ${filter === 'all' ? 'tab-active' : ''}`}>All</a> 
                    <a onClick={() => setFilter('pending')} className={`tab ${filter === 'pending' ? 'tab-active' : ''}`}>Pending</a> 
                    <a onClick={() => setFilter('approved')} className={`tab ${filter === 'approved' ? 'tab-active' : ''}`}>Approved</a> 
                    <a onClick={() => setFilter('rejected')} className={`tab ${filter === 'rejected' ? 'tab-active' : ''}`}>Rejected</a>
                </div>

                <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
                    <table className="table w-full">
                        <thead className="text-base font-bold text-base-content bg-base-300">
                            <tr>
                                <th>Class & Instructor</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClasses.length > 0 ? filteredClasses.map((cls) => (
                                <tr key={cls._id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar"><div className="mask mask-squircle w-16 h-16"><img src={cls.image} alt={cls.title} /></div></div>
                                            <div>
                                                <div className="font-bold">{cls.title}</div>
                                                <div className="text-sm opacity-70">{cls.teacher.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold">${cls.price}</td>
                                    <td><StatusBadge status={cls.status} /></td>
                                    <td className="text-center space-x-2">
                                        <button 
                                            onClick={() => handleStatusUpdate(cls._id, 'approved')}
                                            disabled={cls.status !== 'pending' || mutation.isPending}
                                            className="btn btn-xs btn-outline btn-success"
                                        >
                                            <FaCheckCircle /> Approve
                                        </button>
                                        <button 
                                            onClick={() => handleStatusUpdate(cls._id, 'rejected')}
                                            disabled={cls.status !== 'pending' || mutation.isPending}
                                            className="btn btn-xs btn-outline btn-error"
                                        >
                                            <FaTimesCircle /> Reject
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="text-center py-10">No classes found for this filter.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="join flex justify-center mt-8">
                    {[...Array(totalPages).keys()].map(number => (
                        <button
                            key={number + 1}
                            onClick={() => setCurrentPage(number + 1)}
                            className={`join-item btn ${currentPage === number + 1 ? 'btn-primary text-white' : ''}`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;