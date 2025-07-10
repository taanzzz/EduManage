import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useRole from '../hooks/useRole';
import { AuthContext } from '../contexts/AuthProvider';
import axiosSecure from '../api/Axios';

const TeachOnEdu = () => {
    const { user } = useContext(AuthContext);
    const { role } = useRole();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const mutation = useMutation({
        mutationFn: (applicationData) => {
            return axiosSecure.post('/api/teacher/apply', applicationData);
        },
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

    if (role === 'teacher') {
        return <div className="text-center py-20 text-2xl font-bold">You are already a teacher!</div>;
    }
     if (role === 'admin') {
        return <div className="text-center py-20 text-2xl font-bold">Admins cannot apply to be a teacher.</div>;
    }

    return (
        <div className="w-full min-h-screen p-8 bg-base-200 flex justify-center items-center">
            <div className="w-full max-w-2xl p-8 bg-base-100 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">Become an Instructor</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input type="text" defaultValue={user?.displayName} className="input input-bordered w-full" disabled />
                    <input type="email" defaultValue={user?.email} className="input input-bordered w-full" disabled />
                    
                    <input type="text" placeholder="Title (e.g., Web Development Expert)" {...register("title", { required: true })} className="input input-bordered w-full" />
                    
                    <div className="flex gap-4">
                        <select {...register("experience", { required: true })} className="select select-bordered w-full">
                            <option disabled selected>Select Experience</option>
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-level</option>
                            <option value="experienced">Experienced</option>
                        </select>
                        <select {...register("category", { required: true })} className="select select-bordered w-full">
                            <option disabled selected>Select Category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </div>

                    <button type="submit" disabled={mutation.isPending} className="btn btn-primary w-full text-white">
                        {mutation.isPending ? <span className="loading loading-spinner"></span> : "Submit for Review"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeachOnEdu;