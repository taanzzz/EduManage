import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useRole from '../hooks/useRole';
import { AuthContext } from '../contexts/AuthProvider';
import axiosSecure from '../api/Axios';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const TeachOnEdu = () => {
    const { user } = useContext(AuthContext);
    const { role } = useRole();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const mutation = useMutation({
        mutationFn: (applicationData) => axiosSecure.post('/api/teacher/apply', applicationData),
        onSuccess: () => {
            toast.success('✅ Your application has been submitted successfully!');
            reset();
        },
        onError: (error) => {
            toast.error(`❌ ${error.response?.data?.message || 'Submission failed.'}`);
        }
    });

    const onSubmit = (data) => {
        const applicationData = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            experience: data.experience,
            title: data.title,
            category: data.category,
        };
        mutation.mutate(applicationData);
    };

    const handleBack = () => navigate(-1);

    // Already Teacher
    if (role === 'teacher') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-100 px-4 py-12">
                <div className="bg-white dark:bg-base-100 border border-base-300/30 rounded-3xl shadow-xl p-8 text-center max-w-md w-full">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">
                        You're Already a Teacher!
                    </h1>
                    <p className="text-base-content/80 text-sm">
                        You've been approved to teach on the platform. Explore your dashboard.
                    </p>
                    <span className="inline-block mt-4 px-4 py-1 text-sm rounded-full bg-green-200/20 text-green-600 dark:text-green-400 font-semibold">
                        ✅ Teacher Role Active
                    </span>
                </div>
            </div>
        );
    }

    // Admin Restriction
    if (role === 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-100 px-4 py-12">
                <div className="bg-white dark:bg-base-100 border border-base-300/30 rounded-3xl shadow-xl p-8 text-center max-w-md w-full">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent mb-3">
                        Access Restricted
                    </h1>
                    <p className="text-base-content/80 text-sm">
                        Admins are not eligible to apply as instructors.
                    </p>
                    <span className="inline-block mt-4 px-4 py-1 text-sm rounded-full bg-red-200/20 text-red-600 dark:text-red-400 font-semibold">
                        🚫 Admin Role Detected
                    </span>
                </div>
            </div>
        );
    }

    // Application Form
    return (
        <div className="w-full min-h-screen flex justify-center items-center px-4 py-10 bg-gradient-to-br from-base-200 via-base-100 to-base-200 dark:from-base-300 dark:via-base-200 dark:to-base-300 transition-colors">
            <div className="relative w-full max-w-2xl bg-white dark:bg-base-100 rounded-3xl shadow-2xl p-6 sm:p-10 border border-base-300/30">
                
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="absolute top-4 left-4 text-primary dark:text-secondary hover:opacity-80 transition"
                >
                    <FaArrowLeft className="text-xl" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Become an Instructor
                    </h1>
                    <p className="text-base-content/70 text-sm mt-2">
                        Fill out the form below to apply as a teacher on EduManage.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <input
                        type="text"
                        value={user?.displayName}
                        disabled
                        className="input input-bordered w-full bg-base-100/50 text-base-content/80 cursor-not-allowed"
                    />
                    <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="input input-bordered w-full bg-base-100/50 text-base-content/80 cursor-not-allowed"
                    />

                    <input
                        type="text"
                        placeholder="Title (e.g., Web Development Expert)"
                        {...register("title", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">Title is required.</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            {...register("experience", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Experience</option>
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-level</option>
                            <option value="experienced">Experienced</option>
                        </select>

                        <select
                            {...register("category", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </div>
                    {(errors.experience || errors.category) && (
                        <p className="text-red-500 text-sm">All fields are required.</p>
                    )}

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="btn w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition rounded-full"
                    >
                        {mutation.isPending ? <span className="loading loading-spinner"></span> : 'Submit for Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeachOnEdu;
