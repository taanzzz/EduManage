import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserShield, FaSearch } from 'react-icons/fa';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';


const ManageUsers = () => {
  const { getThemeClasses, gradientText, hoverGlow } = useTheme();
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
      Swal.fire({
        icon: 'success',
        title: 'User Promoted',
        text: 'User has been successfully promoted to Admin!',
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Action Failed',
        text: error.response?.data?.message || 'Failed to make admin.',
      });
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Promote ${user.name} to Admin?`,
      text: 'This action will grant administrative privileges.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Promote!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: getThemeClasses.colors.primary,
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(user._id);
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value.trim());
    setCurrentPage(1);
  };

  if (isLoading && !data) return <LoadingSpinner />;

  return (
    <div className={`w-full min-h-screen p-4 sm:p-6 lg:p-8 ${getThemeClasses.pageBackground}`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <motion.h1
            className={`text-4xl font-extrabold ${gradientText}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            User Management
          </motion.h1>
          <p className={`mt-2 text-lg ${getThemeClasses.mutedText}`}>Oversee all registered users and manage their roles.</p>
        </header>

        <form onSubmit={handleSearch} className="mb-6">
          <div className={`join w-full md:w-1/2 ${getThemeClasses.cardBackground} rounded-xl ${getThemeClasses.shadow}`}>
            <input
              name="search"
              className={`input join-item w-full ${getThemeClasses.input}`}
              placeholder="Search by name or email..."
            />
            <motion.button
              type="submit"
              className={`btn join-item ${getThemeClasses.primaryButton} ${hoverGlow}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch />
            </motion.button>
          </div>
        </form>

        <motion.div
          className={`hidden md:block overflow-x-auto ${getThemeClasses.cardBackground} rounded-2xl ${getThemeClasses.shadow}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table className="table w-full">
            <thead className={getThemeClasses.navBackground}>
              <tr className="text-sm uppercase">
                <th className="p-4">User</th>
                <th>Email</th>
                <th>Role</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className={`hover:bg-base-200/20 ${getThemeClasses.border}`}>
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.image} alt={user.name} />
                        </div>
                      </div>
                      <div>
                        <div className={`font-bold ${getThemeClasses.primaryText}`}>{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className={getThemeClasses.primaryText}>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? getThemeClasses.activeNavLink : getThemeClasses.navLink}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="text-center">
                    <motion.button
                      onClick={() => handleMakeAdmin(user)}
                      disabled={user.role === 'admin' || mutation.isPending}
                      className={`btn btn-sm ${getThemeClasses.primaryButton} disabled:opacity-50 ${hoverGlow}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaUserShield /> Make Admin
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="md:hidden grid grid-cols-1 gap-4">
          {users.map((user) => (
            <motion.div
              key={user._id}
              className={`card ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} ${getThemeClasses.borderAccent} p-4 rounded-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className={`w-16 rounded-full ring ${getThemeClasses.borderAccent}`}>
                    <img src={user.image} alt={user.name} />
                  </div>
                </div>
                <div>
                  <h2 className={`card-title ${getThemeClasses.primaryText}`}>{user.name}</h2>
                  <p className={`text-sm ${getThemeClasses.mutedText}`}>{user.email}</p>
                </div>
              </div>
              <div className="divider my-2"></div>
              <div className="flex justify-between items-center">
                <span className={`badge badge-lg ${user.role === 'admin' ? getThemeClasses.activeNavLink : getThemeClasses.navLink}`}>
                  {user.role}
                </span>
                <motion.button
                  onClick={() => handleMakeAdmin(user)}
                  disabled={user.role === 'admin' || mutation.isPending}
                  className={`btn btn-sm ${getThemeClasses.primaryButton} ${hoverGlow}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserShield /> Make Admin
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {users.length === 0 && (
          <p className={`text-center py-10 ${getThemeClasses.mutedText}`}>No users found.</p>
        )}

        <div className="flex justify-center mt-8">
          <div className={`join ${getThemeClasses.cardBackground} p-2 rounded-xl ${getThemeClasses.shadow}`}>
            {[...Array(totalPages).keys()].map((number) => (
              <motion.button
                key={number + 1}
                onClick={() => setCurrentPage(number + 1)}
                className={`join-item btn btn-sm ${currentPage === number + 1 ? getThemeClasses.primaryButton : getThemeClasses.secondaryButton} ${hoverGlow}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {number + 1}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;