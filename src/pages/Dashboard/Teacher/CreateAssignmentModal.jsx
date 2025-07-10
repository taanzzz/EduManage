import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosSecure from '../../../api/Axios';

const CreateAssignmentModal = ({ isOpen, onClose, classId, refetchStats }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newAssignment) => {
            return axiosSecure.post('/api/assignments', newAssignment);
        },
        onSuccess: () => {
            toast.success('🎉 Assignment created successfully!');
            queryClient.invalidateQueries({ queryKey: ['class-stats', classId] }); 
            reset();
            onClose();
        },
        onError: () => toast.error('Failed to create assignment.')
    });

    const onSubmit = (data) => {
        const assignmentData = { ...data, classId };
        mutation.mutate(assignmentData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create New Assignment</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <input {...register("title", { required: true })} placeholder="Assignment Title" className="input input-bordered w-full" />
                    <input {...register("deadline", { required: true })} type="date" className="input input-bordered w-full" />
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" placeholder="Assignment Description"></textarea>
                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssignmentModal;