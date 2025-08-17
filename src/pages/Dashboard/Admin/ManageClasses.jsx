import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';


const StatusBadge = ({ status }) => {
  const { getThemeClasses, isDark } = useTheme();
  const statusConfig = {
    pending: { icon: <FaRegClock />, classes: isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100/80 text-yellow-800' },
    approved: { icon: <FaCheckCircle />, classes: isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100/80 text-green-800' },
    rejected: { icon: <FaTimesCircle />, classes: isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100/80 text-red-800' },
  };
  const config = statusConfig[status] || { icon: null, classes: isDark ? 'bg-slate-700/30 text-slate-300' : 'bg-gray-100/80 text-gray-800' };
  return (
    <motion.span
      className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full ${config.classes} backdrop-blur-sm ${getThemeClasses.borderAccent}`}
      whileHover={{ scale: 1.05 }}
    >
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
};

const ManageClasses = () => {
  const { getThemeClasses, gradientText, hoverGlow, colors } = useTheme(); // Added colors
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
      Swal.fire({
        icon: 'success',
        title: `Class ${variables.status}!`,
        text: `The class has been successfully ${variables.status}.`,
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ['all-classes-admin'] });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Action Failed',
        text: error.response?.data?.message || 'Failed to update class status.',
      });
    },
  });

  const handleStatusUpdate = (classId, status) => mutation.mutate({ classId, status });
  const filteredClasses = data?.classes?.filter(cls => filter === 'all' || cls.status === filter) || [];
  const totalPages = data?.totalPages || 1;

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
            Manage Classes
          </motion.h1>
          <p className={`text-lg ${getThemeClasses.mutedText} mt-2`}>Review, approve, or reject class submissions.</p>
        </header>

        <div className={`flex gap-2 mb-6 ${getThemeClasses.cardBackground} p-2 rounded-xl shadow-md ${getThemeClasses.border}`}>
          {['all', 'pending', 'approved', 'rejected'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold ${filter === tab ? getThemeClasses.activeNavLink : getThemeClasses.navLink} ${hoverGlow}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        <motion.div
          className={`hidden md:block overflow-x-auto ${getThemeClasses.cardBackground} rounded-2xl ${getThemeClasses.shadow}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table className="table w-full">
            <thead className={`text-sm font-bold uppercase ${getThemeClasses.navBackground}`}>
              <tr>
                <th className="p-4">Class Info</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => (
                <tr key={cls._id} className={`hover:bg-base-200/20 transition-colors ${getThemeClasses.border}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img src={cls.image} alt={cls.title} />
                        </div>
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${getThemeClasses.primaryText}`}>{cls.title}</div>
                        <p className={`text-sm ${getThemeClasses.mutedText}`}>${cls.price}</p>
                      </div>
                    </div>
                  </td>
                  <td className={getThemeClasses.primaryText}>{cls.teacher.email}</td>
                  <td><StatusBadge status={cls.status} /></td>
                  <td className="text-center space-x-2">
                    <motion.button
                      onClick={() => handleStatusUpdate(cls._id, 'approved')}
                      disabled={cls.status !== 'pending'}
                      className={`btn btn-sm ${getThemeClasses.primaryButton} disabled:opacity-50 ${hoverGlow}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Approve
                    </motion.button>
                    <motion.button
                      onClick={() => handleStatusUpdate(cls._id, 'rejected')}
                      disabled={cls.status !== 'pending'}
                      className={`btn btn-sm btn-error text-white disabled:opacity-50 ${hoverGlow}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reject
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="md:hidden grid grid-cols-1 gap-6">
          {filteredClasses.map((cls) => (
            <motion.div
              key={cls._id}
              className={`card ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} ${getThemeClasses.borderAccent} rounded-xl overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <figure>
                <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body p-4">
                <h2 className={`card-title font-bold ${getThemeClasses.primaryText}`}>{cls.title}</h2>
                <p className={`text-sm ${getThemeClasses.mutedText}`}>{cls.teacher.email}</p>
                <div className="flex justify-between items-center my-2">
                  <span className={`font-bold text-lg ${colors.primary}`}>${cls.price}</span> {/* Fixed: Use colors.primary */}
                  <StatusBadge status={cls.status} />
                </div>
                <div className="card-actions justify-end mt-2 space-x-2">
                  <motion.button
                    onClick={() => handleStatusUpdate(cls._id, 'approved')}
                    disabled={cls.status !== 'pending'}
                    className={`flex-1 btn btn-sm ${getThemeClasses.primaryButton} disabled:opacity-50 ${hoverGlow}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    onClick={() => handleStatusUpdate(cls._id, 'rejected')}
                    disabled={cls.status !== 'pending'}
                    className={`flex-1 btn btn-sm btn-error text-white disabled:opacity-50 ${hoverGlow}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reject
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

export default ManageClasses;