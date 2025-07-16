import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    
    const onSubmit = (data) => {
        console.log(data);
        toast.success("✅ Thank you for your message! We'll get back to you soon.");
        reset();
    };

    return (
        <div className="bg-base-200 min-h-screen py-20">
            <div className="max-w-6xl mx-auto px-4">
                
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-extrabold text-base-content">Get In Touch</h1>
                    <p className="text-lg text-base-content/70 mt-3">We'd love to hear from you. Please fill out the form below.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-base-100 p-8 rounded-2xl shadow-xl">
                    
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <FaMapMarkerAlt className="text-secondary text-2xl mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg">Our Address</h4>
                                    <p className="text-base-content/80">123 EduManage Street, Knowledge City, BD 12345</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaEnvelope className="text-secondary text-2xl mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg">Email Us</h4>
                                    <p className="text-base-content/80">contact@edumanage.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaPhoneAlt className="text-secondary text-2xl mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg">Call Us</h4>
                                    <p className="text-base-content/80">+880 123 456 7890</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered w-full" />
                            <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Your Email" className="input input-bordered w-full" />
                            <input {...register("subject", { required: true })} placeholder="Subject" className="input input-bordered w-full" />
                            <textarea {...register("message", { required: true })} className="textarea textarea-bordered w-full h-32" placeholder="Your Message"></textarea>
                            <button type="submit" className="btn btn-primary text-white w-full">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;