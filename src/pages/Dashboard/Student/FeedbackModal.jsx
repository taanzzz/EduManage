import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';


const FeedbackModal = ({ isOpen, onClose, classDetails }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const mutation = useMutation({
        mutationFn: (feedbackData) => axiosSecure.post('/api/feedback', feedbackData),
        onSuccess: () => {
            toast.success('Thank you for your valuable feedback!');
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
            userEmail: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
        };
        mutation.mutate(feedbackData);
    };

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Teaching Evaluation for: {classDetails.title}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <Controller
                        name="rating"
                        control={control}
                        rules={{ required: "Rating is required" }}
                        render={({ field }) => (
                            <Rating style={{ maxWidth: 180 }} value={field.value} onChange={field.onChange} isRequired />
                        )}
                    />
                    {errors.rating && <span className="text-error text-xs">{errors.rating.message}</span>}
                    
                    <textarea {...register("reviewText", { required: "Review is required" })} className="textarea textarea-bordered w-full h-28" placeholder="Share your experience..."></textarea>
                    {errors.reviewText && <span className="text-error text-xs">{errors.reviewText.message}</span>}

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Submitting...' : 'Send Feedback'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default FeedbackModal;