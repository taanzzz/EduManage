import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router'; 

// --- Icons ---
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { HiExclamationTriangle } from "react-icons/hi2";
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';


// --- Status Badge Component ---
const StatusBadge = ({ status }) => {
    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        approved: 'bg-green-100 text-green-800 border-green-300',
        rejected: 'bg-red-100 text-red-800 border-red-300',
    };
    return (
        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};


// --- Main MyClasses Component ---
const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);

    
    const { data: myClasses = [], isLoading, refetch } = useQuery({
        queryKey: ['my-classes', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/api/classes/my-classes/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    
    const deleteMutation = useMutation({
        mutationFn: (classId) => axiosSecure.delete(`/api/classes/${classId}`),
        onSuccess: () => {
            toast.success('🗑️ Class deleted successfully!');
            queryClient.invalidateQueries({ queryKey: ['my-classes', user?.email] });
        },
        onError: () => toast.error('❌ Failed to delete class.')
    });

    const handleDeleteClick = (id) => {
        setSelectedClassId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedClassId) return;
        deleteMutation.mutate(selectedClassId);
        setIsModalOpen(false);
        setSelectedClassId(null);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
                        My Authored Classes
                    </h1>
                    <p className="text-lg text-base-content/70">Manage, update, and see the progress of your classes.</p>
                </div>

                {myClasses.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold">You haven't created any classes yet.</h2>
                        <Link to="/dashboard/add-class" className="btn btn-primary text-white mt-4">Create Your First Class</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {myClasses.map(cls => (
                            <div key={cls._id} className="card lg:card-side bg-base-100 shadow-xl border border-base-300/20">
                                <figure className="lg:w-1/3"><img src={cls.image} alt={cls.title} className="w-full h-full object-cover" /></figure>
                                <div className="card-body lg:w-2/3">
                                    <div className="flex justify-between items-start">
                                        <h2 className="card-title text-2xl font-bold">{cls.title}</h2>
                                        <StatusBadge status={cls.status} />
                                    </div>
                                    <p className="text-base-content/70 mt-2">{cls.description.slice(0, 120)}...</p>
                                    <div className="card-actions justify-end mt-4 gap-2">
                                        <button className="btn btn-outline btn-primary btn-sm"><FaEdit /> Update</button>
                                        <button onClick={() => handleDeleteClick(cls._id)} className="btn btn-outline btn-error btn-sm"><FaTrash /> Delete</button>
                                        
                                        
                                        <Link 
                                            to={`/dashboard/my-class-details/${cls._id}`}
                                            className={`btn btn-secondary text-white btn-sm ${cls.status !== 'approved' && 'btn-disabled'}`}
                                        >
                                            <FaEye /> See Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ডিলেট কনফার্মেশন মডাল */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <div className="text-center">
                            <HiExclamationTriangle className="mx-auto h-16 w-16 text-red-500" />
                            <h3 className="text-lg font-bold mt-4">Are you sure?</h3>
                            <p className="py-4">Do you really want to delete this class? This action cannot be undone.</p>
                        </div>
                        <div className="modal-action justify-center">
                            <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost">Cancel</button>
                            <button onClick={confirmDelete} className="btn btn-error text-white">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClasses;