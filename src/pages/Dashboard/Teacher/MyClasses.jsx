import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router'; 

import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { HiExclamationTriangle } from "react-icons/hi2";
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import UpdateClassModal from './UpdateClassModal';



const StatusBadge = ({ status }) => {
    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        approved: 'bg-green-100 text-green-800 border-green-300',
        rejected: 'bg-red-100 text-red-800 border-red-300',
    };
    return (
        <span className={`px-4 py-1 text-sm font-semibold rounded-full border tracking-wide select-none ${statusClasses[status] || 'bg-gray-100 text-gray-800 border-gray-300'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const { data: myClasses = [], isLoading } = useQuery({
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

    const handleDeleteClick = (cls) => {
        setSelectedClass(cls);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedClass) return;
        deleteMutation.mutate(selectedClass._id);
        setIsDeleteModalOpen(false);
    };

    
    const handleUpdateClick = (cls) => {
        setSelectedClass(cls);
        setIsUpdateModalOpen(true);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className="w-full min-h-screen p-6 bg-base-200 flex justify-center">
                <div className="max-w-7xl w-full">
                    <header className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent select-none">
                            My Authored Classes
                        </h1>
                        <p className="text-lg text-base-content/70 mt-2">Manage, update, and see the progress of your classes.</p>
                    </header>

                    {myClasses.length === 0 ? (
                        <div className="text-center py-24 bg-base-100 rounded-3xl shadow-xl">
                            <h2 className="text-3xl font-bold mb-4">You haven't created any classes yet.</h2>
                            <Link to="/dashboard/add-class" className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:scale-[1.05] transition-transform duration-300">
                                Create Your First Class
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                            {myClasses.map(cls => (
                                <div key={cls._id} className="card lg:card-side bg-base-100 shadow-xl border border-base-300/20 rounded-2xl">
                                    <figure className="lg:w-1/3"><img src={cls.image} alt={cls.title} className="w-full h-full object-cover" /></figure>
                                    <div className="card-body lg:w-2/3">
                                        <div className="flex justify-between items-start mb-3">
                                            <h2 className="card-title text-2xl font-bold">{cls.title}</h2>
                                            <StatusBadge status={cls.status} />
                                        </div>
                                        <p className="text-base-content/70 line-clamp-3">{cls.description}</p>
                                        <div className="card-actions justify-end mt-6 gap-3">
                                            
                                            <button onClick={() => handleUpdateClick(cls)} className="btn btn-outline btn-primary btn-sm"><FaEdit /> Update</button>
                                            <button onClick={() => handleDeleteClick(cls)} className="btn btn-outline btn-error btn-sm"><FaTrash /> Delete</button>
                                            <Link to={`/dashboard/my-class-details/${cls._id}`} className={`btn btn-secondary btn-sm text-white ${cls.status !== 'approved' && 'btn-disabled'}`}><FaEye /> See Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md p-8 rounded-2xl">
                        <div className="text-center">
                            <HiExclamationTriangle className="mx-auto h-16 w-16 text-red-600" />
                            <h3 className="text-2xl font-bold mt-4">Are you sure?</h3>
                            <p className="py-5 text-base-content/80">Do you really want to delete this class? This action cannot be undone.</p>
                        </div>
                        <div className="modal-action justify-center space-x-4">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="btn btn-ghost">Cancel</button>
                            <button onClick={confirmDelete} className="btn btn-error text-white">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            
            
            <UpdateClassModal 
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                classData={selectedClass}
            />
        </>
    );
};

export default MyClasses;