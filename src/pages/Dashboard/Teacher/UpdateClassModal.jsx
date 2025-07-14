import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../../api/Axios';
import { toast } from 'react-toastify';

const UpdateClassModal = ({ isOpen, onClose, classData }) => {
    const { register, handleSubmit, reset } = useForm();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (classData) {
            reset(classData);
        }
    }, [classData, reset]);

    const mutation = useMutation({
        mutationFn: (updatedClass) => axiosSecure.patch(`/api/classes/${classData._id}`, updatedClass),
        onSuccess: () => {
            toast.success('✅ Class updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['my-classes'] });
            onClose();
        },
        onError: () => toast.error('❌ Failed to update class.')
    });

    const onSubmit = (data) => {
        const updatedInfo = {
            title: data.title,
            price: parseFloat(data.price),
            description: data.description,
            image: data.image,
        };
        mutation.mutate(updatedInfo);
    };

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box bg-gradient-to-br from-white via-base-100 to-base-200 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-500 to-secondary">
                    Update Class: {classData.title}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    <div>
                        <label className="label font-medium text-base-content/80">Title</label>
                        <input {...register("title", { required: true })} className="input input-bordered w-full bg-white/80 shadow-md focus:outline-none focus:ring-2 focus:ring-primary rounded-xl" />
                    </div>
                    <div>
                        <label className="label font-medium text-base-content/80">Price</label>
                        <input {...register("price", { required: true, valueAsNumber: true })} type="number" className="input input-bordered w-full bg-white/80 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary rounded-xl" />
                    </div>
                    <div>
                        <label className="label font-medium text-base-content/80">Image URL</label>
                        <input {...register("image", { required: true })} type="url" className="input input-bordered w-full bg-white/80 shadow-md focus:outline-none focus:ring-2 focus:ring-accent rounded-xl" />
                    </div>
                    <div>
                        <label className="label font-medium text-base-content/80">Description</label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full h-28 bg-white/80 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-xl"></textarea>
                    </div>
                    <div className="modal-action justify-end gap-4">
                        <button type="button" onClick={onClose} className="btn bg-base-200 text-base-content hover:bg-base-300 rounded-xl">
                            Cancel
                        </button>
                        <button type="submit" className="btn bg-gradient-to-r from-primary via-pink-500 to-secondary text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform duration-200 px-6 rounded-xl" disabled={mutation.isPending}>
                            {mutation.isPending ? <span className='loading loading-spinner'></span> : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default UpdateClassModal;
