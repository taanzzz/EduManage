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
        <div className="w-full min-h-screen px-4 py-10 md:px-8 bg-gradient-to-br from-base-200 via-base-100 to-base-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                        My Learning Journey
                    </h1>
                    <p className="text-lg mt-4 text-base-content/70">
                        All your enrolled classes in one place. Keep learning!
                    </p>
                </div>

                {/* No classes */}
                {enrolledClasses.length === 0 ? (
                    <div className="text-center py-20 px-6 bg-base-100 rounded-2xl shadow-xl border border-base-300/20">
                        <h2 className="text-2xl font-semibold text-base-content">You haven't enrolled in any classes yet.</h2>
                        <p className="mt-3 text-base-content/70">Explore our library and start your learning adventure today!</p>
                        <Link
                            to="/all-classes"
                            className="btn mt-6 bg-gradient-to-r from-primary to-secondary text-white px-6 rounded-full shadow-md hover:scale-105 transition-transform"
                        >
                            Explore Classes
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrolledClasses.map(({ _id, classDetails }) => (
                            <div
                                key={_id}
                                className="card bg-base-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-300/20"
                            >
                                <figure className="h-52 overflow-hidden">
                                    <img
                                        src={classDetails.image}
                                        alt={classDetails.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-lg md:text-xl font-bold text-base-content">
                                        {classDetails.title}
                                    </h2>
                                    <p className="mt-2 text-base text-base-content/80">
                                        Instructor:{' '}
                                        <span className="font-medium text-primary">
                                            {classDetails.teacher.name}
                                        </span>
                                    </p>
                                    <div className="card-actions justify-end mt-4">
                                        <Link
                                            to={`/dashboard/my-enrolled-class-details/${classDetails._id}`}
                                            className="btn btn-sm text-white bg-gradient-to-r from-secondary via-primary to-accent rounded-full px-4 py-2 hover:scale-105 transition-transform"
                                        >
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
