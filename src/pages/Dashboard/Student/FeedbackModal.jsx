import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';
import { FaPaperPlane } from 'react-icons/fa';

const FeedbackModal = ({ isOpen, onClose, classDetails }) => {
    
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (feedbackData) => axiosSecure.post('/api/feedback', feedbackData),
        onSuccess: () => {
            toast.success('Thank you for your valuable feedback!');
            queryClient.invalidateQueries({ queryKey: ['all-feedback'] }); // Invalidate feedback query to refetch
            reset();
            onClose();
        },
        onError: (error) => toast.error(error.response?.data?.message || 'Submission failed.')
    });

    const onSubmit = (data) => {
        const feedbackData = {
            ...data,
            classId: classDetails._id,
            classTitle: classDetails.title,
        };
        mutation.mutate(feedbackData);
    };

    if (!isOpen) return null;

    
    const ratingStyles = {
        itemShapes: Star,
        activeFillColor: '#f59e0b', 
        inactiveFillColor: '#d1d5db', 
    };

    return (
        <dialog className="modal modal-open modal-bottom sm:modal-middle" onClick={onClose}>
            <div className="modal-box p-0" onClick={e => e.stopPropagation()}>
                
                <div className="p-6 bg-gradient-to-r from-primary to-secondary text-white rounded-t-2xl">
                    <h3 className="font-bold text-2xl">Share Your Feedback</h3>
                    <p className="text-white/80 mt-1">For: <span className="font-semibold">{classDetails.title}</span></p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    
                    <div className="form-control items-center">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Your Overall Rating</span>
                        </label>
                        <Controller
                            name="rating"
                            control={control}
                            rules={{ required: "A star rating is required." }}
                            render={({ field }) => (
                                <Rating 
                                    style={{ maxWidth: 250 }} 
                                    value={field.value || 0} 
                                    onChange={field.onChange}
                                    itemStyles={ratingStyles}
                                    isRequired 
                                />
                            )}
                        />
                        {errors.rating && <span className="text-error text-xs mt-2">{errors.rating.message}</span>}
                    </div>
                    
                    
                    <div className="form-control">
                         <label className="label">
                            <span className="label-text font-semibold">Your Review</span>
                        </label>
                        <textarea 
                            {...register("reviewText", { required: "Please share your experience." })} 
                            className="textarea textarea-bordered w-full h-32 text-base" 
                            placeholder="What did you like or dislike? What could be improved?"
                        ></textarea>
                        {errors.reviewText && <span className="text-error text-xs mt-1">{errors.reviewText.message}</span>}
                    </div>
                    
                    
                    <div className="modal-action mt-8">
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button 
                            type="submit" 
                            className="btn btn-primary text-white" 
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? <span className="loading loading-spinner"></span> : <><FaPaperPlane className="mr-2"/> Send Feedback</>}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default FeedbackModal;