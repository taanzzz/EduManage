import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaUserShield, FaSearch } from 'react-icons/fa';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ManageUsers = () => {
    
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['all-users', currentPage, searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users?page=${currentPage}&limit=10&search=${searchTerm}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const users = data?.users || [];
    const totalPages = data?.totalPages || 1;

    const mutation = useMutation({
        mutationFn: (userId) => axiosSecure.patch(`/api/users/admin/${userId}`),
        onSuccess: () => {
            toast.success('👑 User promoted to Admin successfully!');
            queryClient.invalidateQueries({ queryKey: ['all-users'] });
        },
        onError: (error) => toast.error(`❌ ${error.response?.data?.message || 'Failed to make admin.'}`),
    });

    const handleMakeAdmin = (user) => {
        if(window.confirm(`Are you sure you want to make ${user.name} an admin?`)){
            mutation.mutate(user._id);
        }
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.search.value.trim());
        setCurrentPage(1);
    };

    if (isLoading && !data) return <LoadingSpinner />;

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-base-content">User Management</h1>
                    <p className="mt-2 text-lg text-base-content/70">Oversee all registered users and manage their roles.</p>
                </header>

                <form onSubmit={handleSearch} className="mb-6">
                    <div className="join w-full md:w-1/2">
                        <input name="search" className="input input-bordered join-item w-full" placeholder="Search by name or email..."/>
                        <button type="submit" className="btn join-item btn-primary"><FaSearch /></button>
                    </div>
                </form>

                
                <div className="hidden md:block overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
                    <table className="table w-full">
                        <thead className="bg-base-300">
                            <tr className="text-sm uppercase"><th className="p-4">User</th><th>Email</th><th>Role</th><th className="p-4 text-center">Action</th></tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-base-200/50 border-b border-base-200 last:border-b-0">
                                    <td><div className="flex items-center gap-4"><div className="avatar"><div className="mask mask-squircle w-12 h-12"><img src={user.image} alt={user.name} /></div></div><div><div className="font-bold">{user.name}</div></div></div></td>
                                    <td>{user.email}</td>
                                    <td><span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>{user.role}</span></td>
                                    <td className="text-center"><button onClick={() => handleMakeAdmin(user)} disabled={user.role === 'admin' || mutation.isPending} className="btn btn-sm btn-outline btn-primary disabled:bg-primary/20"><FaUserShield /> Make Admin</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {users.map((user) => (
                         <div key={user._id} className="card bg-base-100 shadow-lg p-4">
                            <div className="flex items-center gap-4">
                                <div className="avatar"><div className="w-16 rounded-full ring ring-primary"><img src={user.image} alt={user.name}/></div></div>
                                <div><h2 className="card-title">{user.name}</h2><p className="text-sm opacity-70">{user.email}</p></div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className={`badge badge-lg ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>{user.role}</span>
                                <button onClick={() => handleMakeAdmin(user)} disabled={user.role === 'admin' || mutation.isPending} className="btn btn-sm btn-primary text-white"><FaUserShield /> Make Admin</button>
                            </div>
                         </div>
                    ))}
                </div>

                {users.length === 0 && <p className="text-center py-10">No users found.</p>}

                <div className="join flex justify-center mt-8">
                    {[...Array(totalPages).keys()].map(number => (
                        <button key={number + 1} onClick={() => setCurrentPage(number + 1)} className={`join-item btn ${currentPage === number + 1 ? 'btn-primary text-white' : ''}`}>{number + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;