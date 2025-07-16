import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ApiStatus = () => {
    const services = [
        { name: 'Website & API', status: 'Operational', isUp: true },
        { name: 'Payment Gateway (Stripe)', status: 'Operational', isUp: true },
        { name: 'Database Services', status: 'Operational', isUp: true },
        { name: 'Authentication Services', status: 'Operational', isUp: true },
    ];

    return (
        <div className="bg-base-200 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-extrabold">System Status</h1>
                    <p className="text-xl text-base-content/70 mt-4">
                        Real-time status of all our services.
                    </p>
                </motion.div>

                <div className="bg-base-100 rounded-2xl shadow-xl p-8">
                    <div className="p-4 mb-6 rounded-lg bg-success/20 text-success-content flex items-center gap-4">
                        <FaCheckCircle className="text-2xl" />
                        <span className="font-semibold">All Systems Operational</span>
                    </div>

                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                                className="flex justify-between items-center p-4 bg-base-200 rounded-lg"
                            >
                                <span className="font-semibold">{service.name}</span>
                                <div className={`flex items-center gap-2 font-bold ${service.isUp ? 'text-success' : 'text-error'}`}>
                                    {service.isUp ? <FaCheckCircle /> : <FaExclamationCircle />}
                                    {service.status}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiStatus;