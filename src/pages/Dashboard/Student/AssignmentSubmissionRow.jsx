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
        <tr className="hover">
            <td className="font-bold">{assignment.title}</td>
            <td>{assignment.description}</td>
            <td className="whitespace-nowrap">
                <FaCalendarAlt className="inline mr-2" />
                {new Date(assignment.deadline).toLocaleDateString()}
            </td>
            <td>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="join w-full">
                        <input 
                            {...register("submissionText", { required: true })}
                            className="input input-bordered join-item w-full" 
                            placeholder="Submit link/text..."
                        />
                        <button type="submit" className="btn join-item btn-primary" disabled={mutation.isPending}>
                            {mutation.isPending ? <span className="loading loading-xs"></span> : <FaPaperPlane />}
                        </button>
                    </div>
                </form>
            </td>
        </tr>
    );
};

export default AssignmentSubmissionRow;