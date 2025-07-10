import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaUserShield } from "react-icons/fa";
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ManageUsers = () => {
    const queryClient = useQueryClient();

    
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/users');
            return res.data.users;
        }
    });

    
    const mutation = useMutation({
        mutationFn: (userId) => {
            return axiosSecure.patch(`/api/users/admin/${userId}`);
        },
        onSuccess: () => {
            toast.success('👑 User promoted to Admin successfully!');
            queryClient.invalidateQueries({ queryKey: ['all-users'] });
        },
        onError: (error) => {
            toast.error(`❌ ${error.response?.data?.message || 'Failed to make admin.'}`);
        }
    });

    const handleMakeAdmin = (userId) => {
        mutation.mutate(userId);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-base-content">Manage Users</h1>
                    <p className="text-lg text-base-content/70 mt-1">Oversee all registered users and manage their roles.</p>
                </div>

                <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
                    <table className="table w-full">
                        <thead className="text-base font-bold text-base-content bg-base-300">
                            <tr>
                                <th>User Info</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.image} alt={user.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleMakeAdmin(user._id)}
                                            disabled={user.role === 'admin'}
                                            className="btn btn-sm btn-outline btn-primary"
                                        >
                                            <FaUserShield /> Make Admin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;