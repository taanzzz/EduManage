import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-base-content">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-extrabold">Terms of Service</h1>
                    <p className="text-lg text-base-content/70 mt-3">Last Updated: {new Date().getFullYear()}</p>
                </motion.div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-bold mb-4 text-primary">1. Agreement to Terms</h2>
                        <p className="text-lg">
                            By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4 text-primary">2. User Accounts</h2>
                        <p className="text-lg">
                            To access most features of the service, you must register for an account. When you register, you agree to provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4 text-primary">3. Prohibited Conduct</h2>
                        <p className="text-lg">
                            You agree not to engage in any of the following prohibited activities: (i) copying, distributing, or disclosing any part of the service in any medium; (ii) using any automated system to access the service; (iii) interfering with the proper working of the service.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;