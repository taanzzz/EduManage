import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaCheck, FaTimes, FaUserTie, FaGraduationCap } from 'react-icons/fa';


const StatusBadge = ({ status }) => {
    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`badge badge-lg border-0 ${statusClasses[status] || 'badge-ghost'}`}>
            {status}
        </span>
    );
};

const TeacherRequest = () => {
    const queryClient = useQueryClient();

    
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['teacher-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/teacher/requests');
            return res.data;
        }
    });

    const mutation = useMutation({
        mutationFn: ({ requestId, status }) => axiosSecure.patch(`/api/teacher/requests/${requestId}`, { status }),
        onSuccess: (data, variables) => {
            toast.success(`✅ Request has been ${variables.status}!`);
            queryClient.invalidateQueries({ queryKey: ['teacher-requests'] });
        },
        onError: (error) => toast.error(`❌ ${error.response?.data?.message || 'Action failed.'}`)
    });

    const handleRequest = (requestId, status) => {
        mutation.mutate({ requestId, status });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-base-content">Teacher Applications</h1>
                    <p className="mt-2 text-lg text-base-content/70">Review and manage applications from aspiring instructors.</p>
                </header>

                {requests.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold text-base-content">No Pending Requests</h2>
                        <p className="mt-2 text-base-content/70">There are currently no new applications to review.</p>
                    </div>
                ) : (
                    <>
                        
                        <div className="hidden md:block overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
                            <table className="table w-full">
                                <thead className="bg-base-300">
                                    <tr className="text-sm uppercase">
                                        <th className="p-4">Applicant</th>
                                        <th>Details</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center rounded-tr-2xl">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(req => (
                                        <tr key={req._id} className="hover:bg-base-200/50">
                                            <td>
                                                <div className="flex items-center gap-4">
                                                    <div className="avatar"><div className="mask mask-squircle w-14 h-14"><img src={req.image} alt={req.name} /></div></div>
                                                    <div><div className="font-bold">{req.name}</div><div className="text-sm opacity-70">{req.email}</div></div>
                                                </div>
                                            </td>
                                            <td><p className="font-semibold">{req.experience}</p><p className="text-sm opacity-70">Experience</p></td>
                                            <td><p className="font-semibold">{req.category}</p><p className="text-sm opacity-70">{req.title}</p></td>
                                            <td className="text-center"><StatusBadge status={req.status} /></td>
                                            <td className="text-center space-x-2">
                                                <button onClick={() => handleRequest(req._id, 'approved')} disabled={req.status !== 'pending'} className="btn btn-sm btn-success text-white"><FaCheck /> Approve</button>
                                                <button onClick={() => handleRequest(req._id, 'rejected')} disabled={req.status !== 'pending'} className="btn btn-sm btn-error text-white"><FaTimes/> Reject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        
                        <div className="md:hidden grid grid-cols-1 gap-6">
                            {requests.map(req => (
                                <div key={req._id} className="card bg-base-100 shadow-xl border border-base-300/20 p-4 space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="avatar"><div className="w-16 rounded-full ring ring-primary"><img src={req.image} alt={req.name} /></div></div>
                                        <div><h2 className="card-title">{req.name}</h2><p className="text-sm opacity-70">{req.email}</p></div>
                                    </div>
                                    <div className="divider my-0"></div>
                                    <div className="text-sm space-y-1">
                                        <p><span className="font-semibold">Title:</span> {req.title}</p>
                                        <p><span className="font-semibold">Category:</span> {req.category}</p>
                                        <p><span className="font-semibold">Experience:</span> {req.experience}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <StatusBadge status={req.status} />
                                        <div className="card-actions justify-end space-x-2">
                                            <button onClick={() => handleRequest(req._id, 'approved')} disabled={req.status !== 'pending'} className="btn btn-xs btn-success text-white"><FaCheck /></button>
                                            <button onClick={() => handleRequest(req._id, 'rejected')} disabled={req.status !== 'pending'} className="btn btn-xs btn-error text-white"><FaTimes /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeacherRequest;