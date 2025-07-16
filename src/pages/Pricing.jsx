import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const Pricing = () => {
    const plans = [
        { name: 'Basic', price: 'Free', features: ['Access to free courses', 'Community support'], popular: false },
        { name: 'Pro', price: '$29/mo', features: ['Access to all courses', 'Priority support', 'Certificates of completion', 'Offline access'], popular: true },
        { name: 'Team', price: 'Custom', features: ['All Pro features', 'Team management', 'Usage analytics', 'Dedicated support'], popular: false },
    ];

    return (
        <div className="bg-base-200 min-h-screen py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
                    <h1 className="text-5xl font-extrabold">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-base-content/70 mt-4">Choose the plan that's right for you.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                    {plans.map((plan, index) => (
                        <motion.div 
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`card bg-base-100 shadow-xl border-2 ${plan.popular ? 'border-primary' : 'border-transparent'}`}
                        >
                            {plan.popular && <div className="badge badge-primary absolute -top-4 right-4 p-3 font-bold">Most Popular</div>}
                            <div className="card-body p-8">
                                <h2 className="card-title text-3xl font-bold">{plan.name}</h2>
                                <p className="text-4xl font-black my-4">{plan.price}</p>
                                <ul className="space-y-3 text-left mb-6">
                                    {plan.features.map(feature => <li key={feature} className="flex items-center gap-3"><FaCheckCircle className="text-green-500" /> {feature}</li>)}
                                </ul>
                                <div className="card-actions"><button className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-outline btn-primary'} text-white`}>Get Started</button></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;