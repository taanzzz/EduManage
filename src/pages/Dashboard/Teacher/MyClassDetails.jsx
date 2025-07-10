import React, { useState } from 'react';
import { useParams } from 'react-router'; 
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import CreateAssignmentModal from './CreateAssignmentModal';


const MyClassDetails = () => {
    const { id: classId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient(); 

    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['class-details-teacher', classId],
        queryFn: async () => {
            const classPromise = axiosSecure.get(`/api/classes/${classId}`);
            const assignmentsPromise = axiosSecure.get(`/api/assignments/class/${classId}`);
            const submissionsPromise = axiosSecure.get(`/api/submissions/class/${classId}`);
            
            const [classRes, assignmentsRes, submissionsRes] = await Promise.all([classPromise, assignmentsPromise, submissionsPromise]);
            
            return {
                classDetails: classRes.data,
                assignments: assignmentsRes.data,
                submissions: submissionsRes.data
            };
        },
        enabled: !!classId
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div className="p-8">Failed to load class details.</div>;

    const { classDetails, assignments, submissions } = data || {};

    
    const assignmentTitles = assignments?.reduce((acc, assignment) => {
        acc[assignment._id] = assignment.title;
        return acc;
    }, {});

    return (
        <>
            <div className="p-8 w-full bg-base-200 min-h-screen">
                <h1 className="text-3xl font-bold mb-2">Class Details: <span className="text-primary">{classDetails?.title}</span></h1>
                <p className="mb-8 text-base-content/70">Manage assignments and view progress for your class.</p>
                
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">Total Enrollment</div>
                        <div className="stat-value text-primary">{classDetails?.totalEnrollment}</div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">Total Assignments</div>
                        <div className="stat-value text-secondary">{assignments?.length || 0}</div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">Total Submissions</div>
                        <div className="stat-value text-accent">{submissions?.length || 0}</div>
                    </div>
                </div>

                <div className="bg-base-100 p-6 rounded-lg shadow mb-8">
                    <h2 className="text-2xl font-bold">Assignment Management</h2>
                    <p className="mb-4">Create a new assignment for this class.</p>
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary text-white">
                        Create New Assignment
                    </button>
                </div>

                
                <div className="bg-base-100 p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Student Submissions</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200">
                                <tr>
                                    <th>Student Email</th>
                                    <th>Assignment Title</th>
                                    <th>Submitted Content/Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions?.length > 0 ? submissions.map(sub => (
                                    <tr key={sub._id} className="hover">
                                        <td>{sub.studentEmail}</td>
                                        <td className="font-semibold">{assignmentTitles?.[sub.assignmentId] || 'N/A'}</td>
                                        <td>
                                            <a href={sub.submissionText} target="_blank" rel="noopener noreferrer" className="link link-primary break-all">
                                                {sub.submissionText}
                                            </a>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="3" className="text-center py-4">No submissions yet for this class.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <CreateAssignmentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                classId={classId}
                // ডেটা রিফ্রেশ করার জন্য queryClient ব্যবহার করা হচ্ছে
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['class-details-teacher', classId] })}
            />
        </>
    );
};

export default MyClassDetails;