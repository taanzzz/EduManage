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
        } catch {
            toast.error('❌ Failed to add class. Please try again.');
        }
    };

    return (
        <div className="w-full min-h-screen p-6 bg-base-200 flex flex-col items-center">
            <div className="max-w-7xl w-full">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-3 select-none">
                        Create a New Class
                    </h1>
                    <p className="text-lg text-base-content/70 max-w-xl mx-auto">
                        Inspire the next generation of learners with your knowledge.
                    </p>
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Form */}
                    <section className="lg:col-span-3 bg-base-100 p-10 rounded-3xl shadow-xl border border-base-300/40 transition-shadow hover:shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Title */}
                            <div className="form-control">
                                <label className="label font-semibold text-base-content">
                                    Class Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., The Ultimate React Masterclass"
                                    className={`input input-bordered w-full rounded-xl border-2
                                    focus:border-gradient-to-r focus:border-primary focus:ring-2 focus:ring-primary/30
                                    transition-all duration-300
                                    ${errors.title ? 'border-error' : 'border-base-300'}`}
                                    {...register("title", { required: "Title is required" })}
                                />
                                {errors.title && (
                                    <p className="text-error text-xs mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Price & Image URL */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-control">
                                    <label className="label font-semibold text-base-content">Price ($)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 99"
                                        min={0}
                                        step="0.01"
                                        className={`input input-bordered w-full rounded-xl border-2
                                        focus:border-gradient-to-r focus:border-primary focus:ring-2 focus:ring-primary/30
                                        transition-all duration-300
                                        ${errors.price ? 'border-error' : 'border-base-300'}`}
                                        {...register("price", {
                                            required: "Price is required",
                                            valueAsNumber: true,
                                            min: { value: 0, message: "Price must be positive" }
                                        })}
                                    />
                                    {errors.price && (
                                        <p className="text-error text-xs mt-1">{errors.price.message}</p>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold text-base-content">Image URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://i.ibb.co/..."
                                        className={`input input-bordered w-full rounded-xl border-2
                                        focus:border-gradient-to-r focus:border-primary focus:ring-2 focus:ring-primary/30
                                        transition-all duration-300
                                        ${errors.image ? 'border-error' : 'border-base-300'}`}
                                        {...register("image", { required: "Image URL is required" })}
                                    />
                                    {errors.image && (
                                        <p className="text-error text-xs mt-1">{errors.image.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-control">
                                <label className="label font-semibold text-base-content">Description</label>
                                <textarea
                                    placeholder="Describe what students will learn in your class..."
                                    rows={5}
                                    className={`textarea textarea-bordered w-full rounded-xl border-2
                                    focus:border-gradient-to-r focus:border-primary focus:ring-2 focus:ring-primary/30
                                    transition-all duration-300 resize-none
                                    ${errors.description ? 'border-error' : 'border-base-300'}`}
                                    {...register("description", { required: "Description is required" })}
                                />
                                {errors.description && (
                                    <p className="text-error text-xs mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn w-full text-lg text-white border-none rounded-xl
                                bg-gradient-to-r from-primary to-secondary
                                shadow-lg hover:shadow-2xl hover:scale-[1.03]
                                transition-transform duration-300"
                            >
                                Submit for Approval
                            </button>
                        </form>
                    </section>

                    {/* Sidebar with instructor & guidelines */}
                    <aside className="lg:col-span-2 flex flex-col gap-10">
                        {/* Instructor Info */}
                        <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300/40">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary select-none">
                                <FaChalkboardTeacher size={26} />
                                Instructor Details
                            </h3>
                            <div className="form-control mb-4">
                                <label className="label font-semibold text-base-content">Name</label>
                                <input type="text" value={user?.displayName} className="input bg-base-200 rounded-lg" disabled />
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-base-content">Email</label>
                                <input type="email" value={user?.email} className="input bg-base-200 rounded-lg" disabled />
                            </div>
                        </div>

                        {/* Submission Guidelines */}
                        <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300/40">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-secondary select-none">
                                <FaInfoCircle size={26} />
                                Submission Guidelines
                            </h3>
                            <ul className="list-disc list-inside space-y-3 text-base-content/80 text-sm leading-relaxed">
                                <li>Ensure the title is clear and descriptive.</li>
                                <li>Use a high-quality, relevant image for the class thumbnail.</li>
                                <li>The description should clearly outline the course objectives.</li>
                                <li>All submissions will be reviewed by an admin within 24 hours.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default AddClass;
