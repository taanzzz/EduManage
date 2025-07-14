import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';


const AssignmentSubmissionRow = ({ assignment, classId, isMobile = false }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();

    const mutation = useMutation({
        mutationFn: (newSubmission) => axiosSecure.post('/api/submissions', newSubmission),
        onSuccess: () => {
            toast.success('✅ Assignment submitted successfully!');
            reset();
        },
        onError: (error) => toast.error(error.response?.data?.message || 'Submission failed.')
    });

    const onSubmit = (data) => {
        const submissionData = { ...data, assignmentId: assignment._id, classId, studentEmail: user.email };
        mutation.mutate(submissionData);
    };

    
    if (isMobile) {
        return (
            <div className="card bg-base-200 p-4 shadow-md">
                <div className="space-y-3">
                    <div>
                        <p className="text-lg font-bold">{assignment.title}</p>
                        <p className="text-sm text-base-content/70 mt-1">{assignment.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <FaCalendarAlt />
                        <span>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="join w-full mt-2">
                            <input {...register("submissionText", { required: true })} className="input input-sm input-bordered join-item w-full" placeholder="Submit link/text..."/>
                            <button type="submit" className="btn btn-sm join-item btn-primary" disabled={mutation.isPending}>
                                {mutation.isPending ? <span className="loading loading-xs"></span> : <FaPaperPlane />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    
    
    return (
        <tr className="hover:bg-base-200/50 border-b border-base-200 last:border-b-0">
            <td className="p-4 align-top">
                <div className="font-bold text-base-content">{assignment.title}</div>
            </td>
            <td className="p-4 align-top text-base-content/80">{assignment.description}</td>
            <td className="p-4 align-top whitespace-nowrap">
                <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-secondary" />
                    <span>{new Date(assignment.deadline).toLocaleDateString()}</span>
                </div>
            </td>
            <td className="p-4 align-top">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="join w-full">
                        <input {...register("submissionText", { required: true })} className="input input-bordered join-item w-full" placeholder="Submit link..." />
                        <button type="submit" className="btn join-item btn-primary" disabled={mutation.isPending}>
                            {mutation.isPending ? <span className="loading loading-spinner loading-sm"></span> : 'Submit'}
                        </button>
                    </div>
                </form>
            </td>
        </tr>
    );
};

export default AssignmentSubmissionRow;