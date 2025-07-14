import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaFilePdf } from 'react-icons/fa';

const MyOrder = () => {
    const { user } = useContext(AuthContext);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['my-orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/payments/my-orders/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleDownloadInvoice = (order) => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Invoice - EduManage", 14, 22);
        doc.setFontSize(12);
        doc.text(`Transaction ID: ${order.transactionId}`, 14, 32);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 40);

        autoTable(doc, {
            startY: 50,
            head: [['Description', 'Details']],
            body: [
                ['Student Name', user.displayName],
                ['Student Email', user.email],
                ['Course Name', order.classDetails.title],
                ['Instructor', order.classDetails.teacher.name],
                ['Price', `$${order.amount.toFixed(2)}`],
                ['Payment Status', order.status],
            ],
            theme: 'grid'
        });

        doc.save(`invoice-${order.transactionId.slice(-6)}.pdf`);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8">My Order History</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">You have no order history yet.</h2>
                    </div>
                ) : (
                    <>
                        
                        <div className="hidden md:block overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
                            <table className="table w-full">
                                <thead className="bg-base-300">
                                    <tr>
                                        <th>Course Title</th>
                                        <th>Transaction ID</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th className="text-center">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} className="hover">
                                            <td className="font-bold">{order.classDetails.title}</td>
                                            <td>{order.transactionId}</td>
                                            <td className="font-semibold">${order.amount.toFixed(2)}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="text-center">
                                                <button onClick={() => handleDownloadInvoice(order)} className="btn btn-primary btn-sm text-white">
                                                    <FaFilePdf /> Download
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        
                        <div className="md:hidden grid grid-cols-1 gap-4">
                            {orders.map(order => (
                                <div key={order._id} className="card bg-base-100 shadow-xl p-4">
                                    <div className="card-body p-2">
                                        <h2 className="card-title text-lg">{order.classDetails.title}</h2>
                                        <p className="text-sm text-base-content/70">
                                            ID: <span className="font-mono">{order.transactionId}</span>
                                        </p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-bold text-primary text-lg">${order.amount.toFixed(2)}</span>
                                            <span className="text-sm text-base-content/70">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="card-actions justify-end mt-4">
                                             <button onClick={() => handleDownloadInvoice(order)} className="btn btn-primary btn-sm text-white w-full">
                                                <FaFilePdf /> Download Invoice
                                            </button>
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

export default MyOrder;