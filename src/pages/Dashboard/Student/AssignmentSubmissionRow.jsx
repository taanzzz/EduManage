import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';

const AssignmentSubmissionRow = ({ assignment, classId }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: (newSubmission) => axiosSecure.post('/api/submissions', newSubmission),
    onSuccess: () => {
      toast.success('Assignment submitted successfully!');
      reset();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Submission failed.')
  });

  const onSubmit = (data) => {
    const submissionData = {
      ...data,
      assignmentId: assignment._id,
      classId: classId,
      studentEmail: user.email,
    };
    mutation.mutate(submissionData);
  };

  return (
    <tr className="hover transition-all duration-300 bg-base-100 hover:bg-base-200 border-b border-base-300">
      <td className="font-semibold text-base-content px-4 py-3">{assignment.title}</td>
      <td className="text-base-content/80 px-4 py-3">{assignment.description}</td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-base-content/70 flex items-center gap-2">
        <FaCalendarAlt className="text-accent" />
        {new Date(assignment.deadline).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex items-center gap-2">
            <input
              {...register('submissionText', { required: true })}
              type="text"
              placeholder="Submit link or short answer..."
              className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/30 rounded-lg shadow-sm"
            />
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="loading loading-spinner loading-sm text-white"></span>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default AssignmentSubmissionRow;
