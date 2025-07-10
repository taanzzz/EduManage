import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyEnrolledClasses = () => {
    const { user, loading: authLoading } = useContext(AuthContext);

    
    const { data: enrolledClasses = [], isLoading: isEnrollmentsLoading } = useQuery({
        queryKey: ['my-enrolled-classes', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            
            const res = await axiosSecure.get(`/api/enrollments/my-classes/${user.email}`);
            return res.data;
        },
        enabled: !authLoading && !!user?.email,
    });

    const isLoading = authLoading || isEnrollmentsLoading;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
                        My Learning Journey
                    </h1>
                    <p className="text-lg text-base-content/70">All your enrolled classes in one place. Keep learning!</p>
                </div>

                
                {enrolledClasses.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold text-base-content">You haven't enrolled in any classes yet.</h2>
                        <p className="mt-2 mb-6 text-base-content/70">Explore our classes and start your learning adventure!</p>
                        <Link to="/all-classes" className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary">
                            Explore Classes
                        </Link>
                    </div>
                ) : (
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrolledClasses.map(({ _id, classDetails }) => (
                            <div key={_id} className="card bg-base-100 shadow-xl border border-base-300/20 transition-all duration-300 hover:shadow-2xl">
                                <figure className="h-52">
                                    <img src={classDetails.image} alt={classDetails.title} className="w-full h-full object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-xl font-bold">{classDetails.title}</h2>
                                    <p className="mt-2">
                                        Instructor: <span className="font-semibold text-primary">{classDetails.teacher.name}</span>
                                    </p>
                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/dashboard/my-enrolled-class-details/${classDetails._id}`} className="btn btn-secondary text-white btn-sm">
                                            Continue <FaArrowRight className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEnrolledClasses;