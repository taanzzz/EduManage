import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';


const StatusBadge = ({ status }) => {
  const { getThemeClasses, isDark } = useTheme();
  const statusClasses = {
    pending: isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100/80 text-yellow-800',
    approved: isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100/80 text-green-800',
    rejected: isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100/80 text-red-800',
  };
  return (
    <motion.span
      className={`badge badge-lg border-0 ${statusClasses[status] || getThemeClasses.navLink} backdrop-blur-sm ${getThemeClasses.borderAccent}`}
      whileHover={{ scale: 1.05 }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
};

const TeacherRequest = () => {
  const { getThemeClasses, gradientText, hoverGlow } = useTheme();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['teacher-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/teacher/requests');
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ requestId, status }) => axiosSecure.patch(`/api/teacher/requests/${requestId}`, { status }),
    onSuccess: (data, variables) => {
      Swal.fire({
        icon: 'success',
        title: `Request ${variables.status}!`,
        text: `The teacher request has been successfully ${variables.status}.`,
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ['teacher-requests'] });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Action Failed',
        text: error.response?.data?.message || 'Failed to update request status.',
      });
    },
  });

  const handleRequest = (requestId, status) => {
    mutation.mutate({ requestId, status });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={`w-full min-h-screen p-4 sm:p-6 lg:p-8 ${getThemeClasses.pageBackground}`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <motion.h1
            className={`text-4xl font-extrabold ${gradientText}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Teacher Applications
          </motion.h1>
          <p className={`mt-2 text-lg ${getThemeClasses.mutedText}`}>Review and manage applications from aspiring instructors.</p>
        </header>

        {requests.length === 0 ? (
          <motion.div
            className={`text-center py-20 ${getThemeClasses.cardBackground} rounded-2xl ${getThemeClasses.shadow}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-2xl font-bold ${getThemeClasses.primaryText}`}>No Pending Requests</h2>
            <p className={`mt-2 ${getThemeClasses.mutedText}`}>There are currently no new applications to review.</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className={`hidden md:block overflow-x-auto ${getThemeClasses.cardBackground} rounded-2xl ${getThemeClasses.shadow}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <table className="table w-full">
                <thead className={getThemeClasses.navBackground}>
                  <tr className="text-sm uppercase">
                    <th className="p-4">Applicant</th>
                    <th>Details</th>
                    <th className="text-center">Status</th>
                    <th className="text-center rounded-tr-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id} className={`hover:bg-base-200/20 ${getThemeClasses.border}`}>
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle w-14 h-14">
                              <img src={req.image} alt={req.name} />
                            </div>
                          </div>
                          <div>
                            <div className={`font-bold ${getThemeClasses.primaryText}`}>{req.name}</div>
                            <div className={`text-sm ${getThemeClasses.mutedText}`}>{req.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className={`font-semibold ${getThemeClasses.primaryText}`}>{req.experience}</p>
                        <p className={`text-sm ${getThemeClasses.mutedText}`}>Experience</p>
                      </td>
                      <td>
                        <p className={`font-semibold ${getThemeClasses.primaryText}`}>{req.category}</p>
                        <p className={`text-sm ${getThemeClasses.mutedText}`}>{req.title}</p>
                      </td>
                      <td className="text-center">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="text-center space-x-2">
                        <motion.button
                          onClick={() => handleRequest(req._id, 'approved')}
                          disabled={req.status !== 'pending'}
                          className={`btn btn-sm ${getThemeClasses.primaryButton} disabled:opacity-50 ${hoverGlow}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaCheck /> Approve
                        </motion.button>
                        <motion.button
                          onClick={() => handleRequest(req._id, 'rejected')}
                          disabled={req.status !== 'pending'}
                          className={`btn btn-sm btn-error text-white disabled:opacity-50 ${hoverGlow}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTimes /> Reject
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <div className="md:hidden grid grid-cols-1 gap-6">
              {requests.map((req) => (
                <motion.div
                  key={req._id}
                  className={`card ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} ${getThemeClasses.borderAccent} p-4 rounded-xl`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className={`w-16 rounded-full ring ${getThemeClasses.borderAccent}`}>
                        <img src={req.image} alt={req.name} />
                      </div>
                    </div>
                    <div>
                      <h2 className={`card-title ${getThemeClasses.primaryText}`}>{req.name}</h2>
                      <p className={`text-sm ${getThemeClasses.mutedText}`}>{req.email}</p>
                    </div>
                  </div>
                  <div className="divider my-0"></div>
                  <div className="text-sm space-y-1">
                    <p><span className="font-semibold">Title:</span> {req.title}</p>
                    <p><span className="font-semibold">Category:</span> {req.category}</p>
                    <p><span className="font-semibold">Experience:</span> {req.experience}</p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <StatusBadge status={req.status} />
                    <div className="card-actions justify-end space-x-2">
                      <motion.button
                        onClick={() => handleRequest(req._id, 'approved')}
                        disabled={req.status !== 'pending'}
                        className={`btn btn-xs ${getThemeClasses.primaryButton} disabled:opacity-50 ${hoverGlow}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCheck />
                      </motion.button>
                      <motion.button
                        onClick={() => handleRequest(req._id, 'rejected')}
                        disabled={req.status !== 'pending'}
                        className={`btn btn-xs btn-error text-white disabled:opacity-50 ${hoverGlow}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTimes />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherRequest;