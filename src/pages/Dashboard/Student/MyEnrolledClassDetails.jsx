import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

// --- Icons ---
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
        return <div className="text-center text-xl font-bold py-20">Error loading class data.</div>
    }

    const { classDetails, assignments } = data;

    return (
        <>
            <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-base-200">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="p-8 bg-base-100 rounded-2xl shadow-lg mb-8 relative" style={{
                        backgroundImage: `url(${classDetails?.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                        <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>
                        <div className="relative text-center">
                            <h1 className="text-4xl font-extrabold text-white">{classDetails?.title}</h1>
                            <p className="text-white/80 mt-2">Submit your assignments and share your feedback.</p>
                        </div>
                    </div>

                    
                    <div className="text-center mb-8">
                        <button onClick={() => setIsModalOpen(true)} className="btn btn-accent text-white">
                            <FaStar /> Teaching Evaluation Report (TER)
                        </button>
                    </div>

                    
                    <div className="bg-base-100 rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Assignments</h2>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-base-200">
                                    <tr>
                                        <th className="w-1/4">Title</th>
                                        <th className="w-2/5">Description</th>
                                        <th>Deadline</th>
                                        <th className="w-1/3">Submission</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignments?.length > 0 ? assignments.map(assignment => (
                                        <AssignmentSubmissionRow 
                                            key={assignment._id}
                                            assignment={assignment}
                                            classId={classId}
                                        />
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-8 text-base-content/70">
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