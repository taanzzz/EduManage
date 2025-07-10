import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';


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
        mutationFn: ({ requestId, status }) => {
            return axiosSecure.patch(`/api/teacher/requests/${requestId}`, { status });
        },
        onSuccess: (data, variables) => {
            toast.success(`✅ Request has been ${variables.status}!`);
            queryClient.invalidateQueries({ queryKey: ['teacher-requests'] });
        },
        onError: (error) => {
            toast.error(`❌ ${error.response?.data?.message || 'Action failed.'}`);
        }
    });

    const handleRequest = (requestId, status) => {
        mutation.mutate({ requestId, status });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full p-8">
            <h1 className="text-4xl font-extrabold mb-8">Teacher Requests</h1>
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table className="table w-full">
                    <thead className="bg-base-300">
                        <tr>
                            <th>Applicant Info</th>
                            <th>Experience</th>
                            <th>Category & Title</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar"><div className="mask mask-squircle w-12 h-12"><img src={req.image} alt={req.name} /></div></div>
                                        <div><div className="font-bold">{req.name}</div><div className="text-sm opacity-50">{req.email}</div></div>
                                    </div>
                                </td>
                                <td>{req.experience}</td>
                                <td>{req.category}<br/><span className="badge badge-ghost badge-sm">{req.title}</span></td>
                                <td>{req.status}</td>
                                <td className="text-center space-x-2">
                                    <button onClick={() => handleRequest(req._id, 'approved')} disabled={req.status !== 'pending'} className="btn btn-sm btn-success text-white">Approve</button>
                                    <button onClick={() => handleRequest(req._id, 'rejected')} disabled={req.status !== 'pending'} className="btn btn-sm btn-error text-white">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;