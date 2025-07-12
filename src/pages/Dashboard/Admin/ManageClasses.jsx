import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

// --- Status Badge Component ---
const StatusBadge = ({ status }) => {
  const statusClasses = {
    pending: 'bg-yellow-200 text-yellow-800 border-yellow-300',
    approved: 'bg-green-200 text-green-800 border-green-300',
    rejected: 'bg-red-200 text-red-800 border-red-300',
  };
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${
        statusClasses[status] || 'bg-gray-200 text-gray-700 border-gray-300'
      } select-none`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
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
      const res = await axiosSecure.get(
        `/api/classes/admin/all?page=${currentPage}&limit=${itemsPerPage}`
      );
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
    },
  });

  const handleStatusUpdate = (classId, status) => {
    mutation.mutate({ classId, status });
  };

  const allclasses = data?.classes || [];
  const totalPages = data?.totalPages || 1;

  const filteredClasses = allclasses.filter((cls) => {
    if (filter === 'all') return true;
    return cls.status === filter;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full min-h-screen p-6 md:p-10 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent select-none">
            Manage Classes
          </h1>
          <p className="mt-2 text-lg text-base-content/75">
            Review, approve, or reject class submissions.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="tabs tabs-boxed mb-8 bg-base-100 w-fit mx-auto rounded-xl shadow-md">
          {['all', 'pending', 'approved', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`tab cursor-pointer transition-colors duration-300 ${
                filter === tab
                  ? 'tab-active bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'text-base-content hover:bg-base-200'
              } rounded-lg`}
              aria-pressed={filter === tab}
              type="button"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Classes Table */}
        <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
          <table className="table w-full border-separate border-spacing-y-3">
            <thead className="text-base font-semibold text-base-content bg-base-300 rounded-t-2xl select-none">
              <tr>
                <th className="py-4 px-6 rounded-tl-2xl">Class & Instructor</th>
                <th className="py-4 px-6 text-center">Price</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <tr
                    key={cls._id}
                    className="bg-base-100 hover:bg-base-200 transition-colors rounded-lg shadow-sm"
                  >
                    <td className="flex items-center gap-4 py-4 px-6">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16 shadow-inner">
                          <img
                            src={cls.image}
                            alt={cls.title}
                            className="object-cover w-full h-full rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{cls.title}</div>
                        <div className="text-sm opacity-70">{cls.teacher.name}</div>
                      </div>
                    </td>
                    <td className="font-semibold text-center text-lg">${cls.price.toFixed(2)}</td>
                    <td className="text-center">
                      <StatusBadge status={cls.status} />
                    </td>
                    <td className="text-center space-x-2 py-4">
                      <button
                        onClick={() => handleStatusUpdate(cls._id, 'approved')}
                        disabled={cls.status !== 'pending' || mutation.isLoading}
                        className="btn btn-xs btn-outline btn-success flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-green-50 transition"
                        aria-label={`Approve ${cls.title}`}
                        type="button"
                      >
                        <FaCheckCircle />
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(cls._id, 'rejected')}
                        disabled={cls.status !== 'pending' || mutation.isLoading}
                        className="btn btn-xs btn-outline btn-error flex items-center mt-2 gap-1 px-3 py-1 rounded-lg hover:bg-red-50 transition"
                        aria-label={`Reject ${cls.title}`}
                        type="button"
                      >
                        <FaTimesCircle />
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-base-content/70 italic">
                    No classes found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => setCurrentPage(number + 1)}
              className={`btn btn-sm rounded-lg transition-colors duration-300 ${
                currentPage === number + 1
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'bg-base-100 text-base-content hover:bg-base-200'
              }`}
              aria-current={currentPage === number + 1 ? 'page' : undefined}
              type="button"
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
