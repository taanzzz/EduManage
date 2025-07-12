import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaUserShield } from 'react-icons/fa';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/users');
      return res.data.users;
    },
  });

  const mutation = useMutation({
    mutationFn: (userId) => axiosSecure.patch(`/api/users/admin/${userId}`),
    onSuccess: () => {
      toast.success('👑 User promoted to Admin successfully!');
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
    },
    onError: (error) => {
      toast.error(`❌ ${error.response?.data?.message || 'Failed to make admin.'}`);
    },
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
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Users
          </h1>
          <p className="mt-2 text-lg text-base-content/70">Oversee all registered users and manage their roles.</p>
        </header>

        <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
          <table className="table w-full min-w-[600px]">
            <thead className="text-base font-bold text-base-content bg-base-300">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th className="text-center">Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover">
                    <td className="py-4 px-4">
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user.image} alt={user.name} />
                          </div>
                        </div>
                        <div className="text-center sm:text-left">
                          <div className="font-semibold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-[200px] break-words text-sm text-base-content/80">
                      {user.email}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`badge ${
                          user.role === 'admin' ? 'badge-primary' : 'badge-ghost'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        disabled={user.role === 'admin'}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        <FaUserShield className="mr-1" />
                        Make Admin
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-base-content/70 italic">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
