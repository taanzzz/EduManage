import React, { useState } from 'react';
import { useParams } from 'react-router'; 
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import CreateAssignmentModal from './CreateAssignmentModal';

const MyClassDetails = () => {
  const { id: classId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['class-details-teacher', classId],
    queryFn: async () => {
      const classPromise = axiosSecure.get(`/api/classes/${classId}`);
      const assignmentsPromise = axiosSecure.get(`/api/assignments/class/${classId}`);
      const submissionsPromise = axiosSecure.get(`/api/submissions/class/${classId}`);

      const [classRes, assignmentsRes, submissionsRes] = await Promise.all([
        classPromise,
        assignmentsPromise,
        submissionsPromise,
      ]);

      return {
        classDetails: classRes.data,
        assignments: assignmentsRes.data,
        submissions: submissionsRes.data,
      };
    },
    enabled: !!classId,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="p-8 text-center text-lg font-semibold text-error">Failed to load class details.</div>;

  const { classDetails, assignments, submissions } = data || {};

  const assignmentTitles = assignments?.reduce((acc, assignment) => {
    acc[assignment._id] = assignment.title;
    return acc;
  }, {});

  return (
    <>
      <div className="p-8 w-full  min-h-screen max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Class Details: <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent select-none">{classDetails?.title}</span>
        </h1>
        <p className="mb-10 text-base-content/70 max-w-xl">
          Manage assignments and view progress for your class.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="stat bg-base-100 shadow-md rounded-lg p-6 text-center">
            <div className="stat-title uppercase text-sm font-semibold tracking-wide text-gray-500">Total Enrollment</div>
            <div className="stat-value text-4xl font-extrabold text-primary">{classDetails?.totalEnrollment}</div>
          </div>
          <div className="stat bg-base-100 shadow-md rounded-lg p-6 text-center">
            <div className="stat-title uppercase text-sm font-semibold tracking-wide text-gray-500">Total Assignments</div>
            <div className="stat-value text-4xl font-extrabold text-secondary">{assignments?.length || 0}</div>
          </div>
          <div className="stat bg-base-100 shadow-md rounded-lg p-6 text-center">
            <div className="stat-title uppercase text-sm font-semibold tracking-wide text-gray-500">Total Submissions</div>
            <div className="stat-value text-4xl font-extrabold text-accent">{submissions?.length || 0}</div>
          </div>
        </div>

        {/* Assignment Management */}
        <section className="bg-base-100 rounded-xl shadow-lg p-6 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Assignment Management</h2>
            <p className="text-base-content/80">Create a new assignment for this class.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white rounded-lg px-6 py-3 hover:scale-105 transition-transform duration-300"
          >
            Create New Assignment
          </button>
        </section>

        {/* Student Submissions Table */}
        <section className="bg-base-100 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Student Submissions</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-left">
              <thead className="bg-base-200">
                <tr>
                  <th className="py-3 px-4 font-semibold text-sm uppercase text-gray-600">Student Email</th>
                  <th className="py-3 px-4 font-semibold text-sm uppercase text-gray-600">Assignment Title</th>
                  <th className="py-3 px-4 font-semibold text-sm uppercase text-gray-600">Submitted Content/Link</th>
                </tr>
              </thead>
              <tbody>
                {submissions?.length > 0 ? (
                  submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-base-200 transition-colors">
                      <td className="py-3 px-4 break-all">{sub.studentEmail}</td>
                      <td className="py-3 px-4 font-semibold">{assignmentTitles?.[sub.assignmentId] || 'N/A'}</td>
                      <td className="py-3 px-4 break-words">
                        <a
                          href={sub.submissionText}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary hover:underline break-all"
                          title={sub.submissionText}
                        >
                          {sub.submissionText}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-base-content/70 italic">
                      No submissions yet for this class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <CreateAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classId={classId}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['class-details-teacher', classId] })}
      />
    </>
  );
};

export default MyClassDetails;
