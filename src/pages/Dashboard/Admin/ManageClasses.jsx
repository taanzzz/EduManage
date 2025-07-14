import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa';


const StatusBadge = ({ status }) => {
    const statusConfig = {
        pending: { icon: <FaRegClock />, classes: 'bg-yellow-100 text-yellow-800' },
        approved: { icon: <FaCheckCircle />, classes: 'bg-green-100 text-green-800' },
        rejected: { icon: <FaTimesCircle />, classes: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status] || { icon: null, classes: 'bg-gray-100 text-gray-800' };
    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full ${config.classes}`}>
            {config.icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};


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
        mutationFn: ({ classId, status }) => axiosSecure.patch(`/api/classes/admin/status/${classId}`, { status }),
        onSuccess: (data, variables) => {
            toast.success(`✅ Class has been ${variables.status}!`);
            queryClient.invalidateQueries({ queryKey: ['all-classes-admin'] });
        },
        onError: (error) => toast.error(`❌ ${error.response?.data?.message || 'Action failed.'}`),
    });

    const handleStatusUpdate = (classId, status) => mutation.mutate({ classId, status });
    const filteredClasses = data?.classes?.filter(cls => filter === 'all' || cls.status === filter) || [];
    const totalPages = data?.totalPages || 1;

    if (isLoading && !data) return <LoadingSpinner />;

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-base-content">Manage Classes</h1>
                    <p className="text-lg text-base-content/70 mt-1">Review, approve, or reject class submissions.</p>
                </header>

                <div className="tabs tabs-boxed mb-6 bg-base-100 w-fit shadow-md">
                    <a onClick={() => setFilter('all')} className={`tab ${filter === 'all' ? 'tab-active' : ''}`}>All</a> 
                    <a onClick={() => setFilter('pending')} className={`tab ${filter === 'pending' ? 'tab-active' : ''}`}>Pending</a> 
                    <a onClick={() => setFilter('approved')} className={`tab ${filter === 'approved' ? 'tab-active' : ''}`}>Approved</a> 
                    <a onClick={() => setFilter('rejected')} className={`tab ${filter === 'rejected' ? 'tab-active' : ''}`}>Rejected</a>
                </div>

                
                <div className="hidden md:block overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
                    <table className="table w-full">
                        <thead className="text-sm font-bold text-base-content uppercase bg-base-300">
                            <tr>
                                <th className="p-4">Class Info</th>
                                <th className="p-4">Instructor</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClasses.map((cls) => (
                                <tr key={cls._id} className="hover:bg-base-200/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar"><div className="mask mask-squircle w-16 h-16"><img src={cls.image} alt={cls.title} /></div></div>
                                            <div><div className="font-bold text-lg">{cls.title}</div><p className="text-sm opacity-70">${cls.price}</p></div>
                                        </div>
                                    </td>
                                    <td>{cls.teacher.email}</td>
                                    <td><StatusBadge status={cls.status} /></td>
                                    <td className="text-center space-x-2">
                                        <button onClick={() => handleStatusUpdate(cls._id, 'approved')} disabled={cls.status !== 'pending'} className="btn btn-sm btn-success text-white">Approve</button>
                                        <button onClick={() => handleStatusUpdate(cls._id, 'rejected')} disabled={cls.status !== 'pending'} className="btn btn-sm btn-error text-white">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                <div className="md:hidden grid grid-cols-1 gap-6">
                    {filteredClasses.map((cls) => (
                         <div key={cls._id} className="card bg-base-100 shadow-lg border border-base-300/20">
                             <figure><img src={cls.image} alt={cls.title} className="w-full h-48 object-cover" /></figure>
                             <div className="card-body p-4">
                                 <h2 className="card-title font-bold">{cls.title}</h2>
                                 <p className="text-sm opacity-70">{cls.teacher.email}</p>
                                 <div className="flex justify-between items-center my-2">
                                     <span className="font-bold text-lg text-primary">${cls.price}</span>
                                     <StatusBadge status={cls.status} />
                                 </div>
                                 <div className="card-actions justify-end mt-2">
                                     <button onClick={() => handleStatusUpdate(cls._id, 'approved')} disabled={cls.status !== 'pending'} className="btn btn-sm btn-success text-white flex-1">Approve</button>
                                     <button onClick={() => handleStatusUpdate(cls._id, 'rejected')} disabled={cls.status !== 'pending'} className="btn btn-sm btn-error text-white flex-1">Reject</button>
                                 </div>
                             </div>
                         </div>
                    ))}
                </div>

                
                <div className="join flex justify-center mt-8">
                    {[...Array(totalPages).keys()].map(number => (
                        <button key={number + 1} onClick={() => setCurrentPage(number + 1)} className={`join-item btn ${currentPage === number + 1 ? 'btn-primary text-white' : ''}`}>{number + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;