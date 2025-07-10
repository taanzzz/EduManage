import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';


const EditProfileModal = ({ isOpen, onClose, profileData, refetch }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: profileData?.name,
            image: profileData?.image,
        }
    });

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            
            await updateProfile(user, {
                displayName: data.name,
                photoURL: data.image,
            });

            
            const updatedData = { name: data.name, image: data.image };
            await axiosSecure.patch(`/api/users/profile/${user.email}`, updatedData);
            
            refetch(); 
            toast.success('✅ Profile updated successfully!');
            onClose(); 
        } catch (error) {
            console.error("Profile update failed:", error);
            toast.error('❌ Failed to update profile.');
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-primary">Edit Your Profile</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full" 
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
                    </div>

                    {/* Image URL Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input 
                            type="url" 
                            className="input input-bordered w-full" 
                            {...register("image", { required: "Photo URL is required" })}
                        />
                        {errors.image && <span className="text-error text-xs mt-1">{errors.image.message}</span>}
                    </div>

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary text-white">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;