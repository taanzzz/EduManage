import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaChalkboardTeacher, FaInfoCircle } from 'react-icons/fa';
import { AuthContext } from './../../../contexts/AuthProvider';
import axiosSecure from './../../../api/Axios';

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const classData = {
            title: data.title,
            teacher: {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            },
            price: parseFloat(data.price),
            description: data.description,
            image: data.image,
            status: 'pending',
            totalEnrollment: 0,
            createdAt: new Date(),
        };

        try {
            const response = await axiosSecure.post('/api/classes', classData);
            if (response.data.insertedId) {
                toast.success('✅ Class submitted for review!');
                reset();
            }
        } catch (error) {
            toast.error('❌ Failed to add class. Please try again.');
        }
    };

    return (
        
        <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
                        Create a New Class
                    </h1>
                    <p className="text-lg text-base-content/70">Inspire the next generation of learners with your knowledge.</p>
                </div>

                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    
                    <div className="lg:col-span-3">
                        <div className="p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300/50">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Title */}
                                <div className="form-control">
                                    <label className="label font-semibold">Class Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., The Ultimate React Masterclass" 
                                        className="input input-bordered w-full focus:input-primary transition-all" 
                                        {...register("title", { required: "Title is required" })}
                                    />
                                    {errors.title && <span className="text-error text-xs mt-1">{errors.title.message}</span>}
                                </div>

                                {/* Price & Image in a grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label font-semibold">Price ($)</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g., 99" 
                                            className="input input-bordered w-full focus:input-primary transition-all" 
                                            {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 0, message: "Price must be positive" } })}
                                        />
                                        {errors.price && <span className="text-error text-xs mt-1">{errors.price.message}</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label font-semibold">Image URL</label>
                                        <input 
                                            type="url" 
                                            placeholder="https://i.ibb.co/..." 
                                            className="input input-bordered w-full focus:input-primary transition-all" 
                                            {...register("image", { required: "Image URL is required" })}
                                        />
                                        {errors.image && <span className="text-error text-xs mt-1">{errors.image.message}</span>}
                                    </div>
                                </div>
                                
                                {/* Description */}
                                <div className="form-control">
                                    <label className="label font-semibold">Description</label>
                                    <textarea 
                                        className="textarea textarea-bordered h-32 focus:input-primary transition-all" 
                                        placeholder="Describe what students will learn in your class..."
                                        {...register("description", { required: "Description is required" })}
                                    ></textarea>
                                    {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
                                </div>

                                <button type="submit" className="btn w-full text-lg text-white border-none bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-300">
                                    Submit for Approval
                                </button>
                            </form>
                        </div>
                    </div>

                    
                    <div className="lg:col-span-2 space-y-8">
                        {/* User Info Card */}
                        <div className="p-6 bg-base-100 rounded-2xl shadow-lg border border-base-300/50">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <FaChalkboardTeacher className="text-primary"/> Instructor Details
                            </h3>
                            <div className="form-control">
                                <label className="label font-semibold">Name</label>
                                <input type="text" value={user?.displayName} className="input bg-base-200" disabled />
                            </div>
                            <div className="form-control mt-4">
                                <label className="label font-semibold">Email</label>
                                <input type="email" value={user?.email} className="input bg-base-200" disabled />
                            </div>
                        </div>

                        {/* Guidelines Card */}
                        <div className="p-6 bg-base-100 rounded-2xl shadow-lg border border-base-300/50">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <FaInfoCircle className="text-secondary"/> Submission Guidelines
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-base-content/80">
                                <li>Ensure the title is clear and descriptive.</li>
                                <li>Use a high-quality, relevant image for the class thumbnail.</li>
                                <li>The description should clearly outline the course objectives.</li>
                                <li>All submissions will be reviewed by an admin within 24 hours.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddClass;