import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import AssignmentSubmissionRow from './AssignmentSubmissionRow';
import FeedbackModal from './FeedbackModal';

const MyEnrolledClassDetails = () => {
    const { id: classId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['enrolled-class-details', classId],
        queryFn: async () => {
            const classDetailsPromise = axiosSecure.get(`/api/classes/${classId}`);
            const assignmentsPromise = axiosSecure.get(`/api/assignments/class/${classId}`);
            const [classDetailsRes, assignmentsRes] = await Promise.all([classDetailsPromise, assignmentsPromise]);
            return {
                classDetails: classDetailsRes.data,
                assignments: assignmentsRes.data,
            };
        },
        enabled: !!classId,
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || !data) {
        return <div className="text-center text-xl font-bold py-20 text-error">Error loading class data.</div>;
    }

    const { classDetails, assignments } = data;

    return (
        <>
            <div className="w-full min-h-screen px-4 py-10 sm:px-6 md:px-8 bg-gradient-to-br from-base-200 via-base-100 to-base-300">
                <div className="max-w-7xl mx-auto">

                    {/* Banner */}
                    <div
                        className="relative rounded-3xl overflow-hidden shadow-xl mb-10"
                        style={{
                            backgroundImage: `url(${classDetails?.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm rounded-3xl z-0" />
                        <div className="relative z-10 px-8 py-14 text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                                {classDetails?.title}
                            </h1>
                            <p className="mt-4 text-white/80 text-lg">
                                Submit your assignments and share your feedback with the instructor.
                            </p>
                        </div>
                    </div>

                    {/* TER Button */}
                    <div className="text-center mb-10">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn px-6 py-2 bg-gradient-to-r from-secondary via-primary to-accent text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            <FaStar className="mr-2" /> Teaching Evaluation Report (TER)
                        </button>
                    </div>

                    {/* Assignments Table */}
                    <div className="bg-base-100 rounded-3xl shadow-md p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-base-content mb-6 border-b border-base-300 pb-3">
                            Assignments
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="table w-full text-base">
                                <thead className="bg-gradient-to-r from-primary/10 to-secondary/10 text-base-content font-semibold">
                                    <tr>
                                        <th className="py-3">Title</th>
                                        <th>Description</th>
                                        <th>Deadline</th>
                                        <th>Submission</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignments?.length > 0 ? (
                                        assignments.map((assignment) => (
                                            <AssignmentSubmissionRow
                                                key={assignment._id}
                                                assignment={assignment}
                                                classId={classId}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-10 text-base-content/60">
                                                No assignments have been added for this class yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {classDetails && (
                <FeedbackModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    classDetails={classDetails}
                />
            )}
        </>
    );
};

export default MyEnrolledClassDetails;
