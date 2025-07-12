import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosSecure from '../../../api/Axios';

const CreateAssignmentModal = ({ isOpen, onClose, classId }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newAssignment) => axiosSecure.post('/api/assignments', newAssignment),
        onSuccess: () => {
            toast.success('🎉 Assignment created successfully!');
            queryClient.invalidateQueries({ queryKey: ['class-stats', classId] });
            reset();
            onClose();
        },
        onError: () => toast.error('Failed to create assignment.'),
    });

    const onSubmit = (data) => {
        mutation.mutate({ ...data, classId });
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="modal-box max-w-md w-full bg-gradient-to-br from-white/90 to-primary/10 rounded-3xl shadow-xl border border-primary/20 p-8 relative overflow-hidden">
                <h3 className="font-extrabold text-2xl text-primary mb-6 text-center select-none">
                    Create New Assignment
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <input
                        {...register("title", { required: 'Assignment title is required' })}
                        placeholder="Assignment Title"
                        className={`input input-bordered w-full rounded-xl border-2 transition-all
                          focus:border-gradient-to-r focus:border-primary focus:ring-2 focus:ring-primary/40
                          ${errors.title ? 'border-error' : 'border-base-300'}`}
                        aria-invalid={errors.title ? "true" : "false"}
                    />
                    {errors.title && (
                        <p className="text-error text-sm mt-1">{errors.title.message}</p>
                    )}

                    <input
                        {...register("deadline", { required: 'Deadline is required' })}
                        type="date"
                        className={`input input-bordered w-full rounded-xl border-2 transition-all
                          focus:border-gradient-to-r focus:border-primary focus:ring-2 focus:ring-primary/40
                          ${errors.deadline ? 'border-error' : 'border-base-300'}`}
                        aria-invalid={errors.deadline ? "true" : "false"}
                    />
                    {errors.deadline && (
                        <p className="text-error text-sm mt-1">{errors.deadline.message}</p>
                    )}

                    <textarea
                        {...register("description", { required: 'Description is required' })}
                        placeholder="Assignment Description"
                        className={`textarea textarea-bordered w-full rounded-xl border-2 transition-all
                          focus:border-gradient-to-r focus:border-primary focus:ring-2 focus:ring-primary/40
                          ${errors.description ? 'border-error' : 'border-base-300'}`}
                        rows={4}
                        aria-invalid={errors.description ? "true" : "false"}
                    />
                    {errors.description && (
                        <p className="text-error text-sm mt-1">{errors.description.message}</p>
                    )}

                    <div className="modal-action flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost text-primary hover:bg-primary/20 rounded-xl px-6 py-2 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white rounded-xl px-6 py-2 shadow-lg hover:shadow-2xl transition duration-300 flex items-center justify-center gap-2"
                        >
                            {mutation.isPending ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                            ) : (
                                'Create'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssignmentModal;
