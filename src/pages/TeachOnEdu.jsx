import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useRole from '../hooks/useRole';
import { AuthContext } from '../contexts/AuthProvider';
import axiosSecure from '../api/Axios';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

const TeachOnEdu = () => {
    const { user } = useContext(AuthContext);
    const { role } = useRole();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

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
            <div className={`min-h-screen flex items-center justify-center ${getThemeClasses.pageBackground} px-4 py-12 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                    <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                        isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                    }`} />
                    <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
                        isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
                    }`} />
                </div>
                <div className={`${getThemeClasses.cardBackground} border border-base-300/30 rounded-3xl ${getThemeClasses.shadow} p-8 text-center max-w-md w-full z-10 ${hoverGlow}`}>
                    <h1 className={`text-3xl font-extrabold ${gradientText} mb-3`}>
                        You're Already a Teacher!
                    </h1>
                    <p className={`${getThemeClasses.secondaryText} text-sm`}>
                        You've been approved to teach on the platform. Explore your dashboard.
                    </p>
                    <span className={`inline-block mt-4 px-4 py-1 text-sm rounded-full ${
                        isDark ? 'bg-cyan-200/20 text-cyan-400' : 'bg-green-200/20 text-green-600'
                    } font-semibold`}>
                        ✅ Teacher Role Active
                    </span>
                </div>
            </div>
        );
    }

    // Admin Restriction
    if (role === 'admin') {
        return (
            <div className={`min-h-screen flex items-center justify-center ${getThemeClasses.pageBackground} px-4 py-12 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                    <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                        isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                    }`} />
                    <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
                        isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
                    }`} />
                </div>
                <div className={`${getThemeClasses.cardBackground} border border-base-300/30 rounded-3xl ${getThemeClasses.shadow} p-8 text-center max-w-md w-full z-10 ${hoverGlow}`}>
                    <h1 className={`text-3xl font-extrabold ${gradientText} mb-3`}>
                        Access Restricted
                    </h1>
                    <p className={`${getThemeClasses.secondaryText} text-sm`}>
                        Admins are not eligible to apply as instructors.
                    </p>
                    <span className={`inline-block mt-4 px-4 py-1 text-sm rounded-full ${
                        isDark ? 'bg-red-200/20 text-red-400' : 'bg-red-200/20 text-red-600'
                    } font-semibold`}>
                        🚫 Admin Role Detected
                    </span>
                </div>
            </div>
        );
    }

    // Application Form
    return (
        <div className={`w-full min-h-screen flex justify-center items-center px-4 py-10 ${getThemeClasses.pageBackground} transition-colors relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
                <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                    isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                }`} />
                <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
                    isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
                }`} />
            </div>
            <div className={`relative w-full max-w-2xl ${getThemeClasses.cardBackground} rounded-3xl ${getThemeClasses.shadow} p-6 sm:p-10 border border-base-300/30 z-10 ${hoverGlow}`}>
                {/* Back Button */}
                <motion.button
                    onClick={handleBack}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`absolute top-4 left-4 ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-green-600 hover:text-green-500'} transition`}
                >
                    <FaArrowLeft className="text-xl" />
                </motion.button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className={`text-4xl font-extrabold ${gradientText}`}>
                        Become an Instructor
                    </h1>
                    <p className={`${getThemeClasses.secondaryText} text-sm mt-2`}>
                        Fill out the form below to apply as a teacher on EduManage.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <input
                        type="text"
                        value={user?.displayName}
                        disabled
                        className={`input input-bordered w-full ${getThemeClasses.inputBackground} ${getThemeClasses.secondaryText} cursor-not-allowed rounded-xl`}
                    />
                    <input
                        type="email"
                        value={user?.email}
                        disabled
                        className={`input input-bordered w-full ${getThemeClasses.inputBackground} ${getThemeClasses.secondaryText} cursor-not-allowed rounded-xl`}
                    />

                    <input
                        type="text"
                        placeholder="Title (e.g., Web Development Expert)"
                        {...register("title", { required: true })}
                        className={`input input-bordered w-full rounded-xl ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm">Title is required.</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            {...register("experience", { required: true })}
                            className={`select select-bordered w-full rounded-xl ${errors.experience ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Experience</option>
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-level</option>
                            <option value="experienced">Experienced</option>
                        </select>

                        <select
                            {...register("category", { required: true })}
                            className={`select select-bordered w-full rounded-xl ${errors.category ? 'border-red-500' : ''}`}
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

                    <motion.button
                        type="submit"
                        disabled={mutation.isPending}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`btn w-full text-white font-semibold rounded-full ${hoverGlow} ${
                            isDark
                                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400'
                                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
                        }`}
                    >
                        {mutation.isPending ? <span className="loading loading-spinner"></span> : 'Submit for Review'}
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default TeachOnEdu;