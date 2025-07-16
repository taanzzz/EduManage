import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-base-content">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-extrabold">Privacy Policy</h1>
                    <p className="text-lg text-base-content/70 mt-3">Last Updated: July 16, 2024</p>
                </motion.div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-bold mb-4 text-primary">1. Introduction</h2>
                        <p className="text-lg">
                            Welcome to EduManage. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at privacy@edumanage.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4 text-primary">2. Information We Collect</h2>
                        <p className="text-lg">
                            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us. The personal information we collect includes your name, email address, and payment information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4 text-primary">3. How We Use Your Information</h2>
                        <p className="text-lg">
                            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-3xl font-bold mb-4 text-primary">4. Will Your Information Be Shared?</h2>
                        <p className="text-lg">
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;