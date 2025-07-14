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

    if (isLoading) return <LoadingSpinner />;
    if (isError || !data) return <div className="text-center text-xl p-8">Error loading data.</div>;

    const { classDetails, assignments } = data;

    return (
        <>
            <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-base-200">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
                        <img src={classDetails?.image} className="absolute inset-0 w-full h-full object-cover blur-sm"/>
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="relative z-10 p-12 text-center">
                            <h1 className="text-4xl font-extrabold text-white">{classDetails?.title}</h1>
                            <p className="mt-2 text-white/80">Submit your assignments and share your feedback.</p>
                        </div>
                    </div>

                    
                    <div className="text-center mb-8"><button onClick={() => setIsModalOpen(true)} className="btn btn-accent text-white"><FaStar /> Teaching Evaluation Report (TER)</button></div>

                    {/* --- Assignments Section --- */}
                    <div className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
                        <h2 className="text-3xl font-bold text-base-content mb-6 border-b border-base-300 pb-4">Assignments</h2>
                        
                        
                        <div className="hidden md:block overflow-x-auto">
                            <table className="table w-full">
                                <thead className="text-sm uppercase text-base-content/60">
                                    <tr><th className="p-4">Title</th><th>Description</th><th>Deadline</th><th className="w-1/3">Submission</th></tr>
                                </thead>
                                <tbody>
                                    {assignments?.length > 0 ? (
                                        assignments.map((assignment) => (
                                            <AssignmentSubmissionRow key={assignment._id} assignment={assignment} classId={classId} />
                                        ))
                                    ) : (
                                        <tr><td colSpan="4" className="text-center py-10">No assignments have been added yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        
                        <div className="md:hidden grid grid-cols-1 gap-6">
                            {assignments?.length > 0 ? (
                                assignments.map((assignment) => (
                                    <AssignmentSubmissionRow key={assignment._id} assignment={assignment} classId={classId} isMobile={true} />
                                ))
                            ) : (
                                <div className="text-center py-10">No assignments have been added yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {classDetails && (
                <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} classDetails={classDetails}/>
            )}
        </>
    );
};

export default MyEnrolledClassDetails;