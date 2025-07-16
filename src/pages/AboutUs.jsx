import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaUsers, FaHandsHelping } from 'react-icons/fa';

const AboutUs = () => {
    const teamMembers = [
        { name: 'Porosh Islam Tarek', role: 'Founder & CEO', image: 'https://lh3.googleusercontent.com/a/ACg8ocL00IWy_H6Uud20kpNpwI3CbmD6ClHLokcZ42WR47OB32CNeZVsFg=s96-c' },
        { name: 'Serelune Vaylira', role: 'Lead Instructor', image: 'https://lh3.googleusercontent.com/a/ACg8ocL2tcbbk6VXnaSwuegvV7UO4-KaKF2iquqUWGwogbEiQmV40ms=s96-c' },
        { name: 'Nanjiba Saraf', role: 'Head of Curriculum', image: 'https://lh3.googleusercontent.com/a/ACg8ocLD_-MG8QMEfqu9vZmUbV-Mt_SZ5FqjP7xhK_JFHie4vUrA0Q2p=s96-c' }
    ];

    return (
        <div className="bg-base-100 text-base-content">
            
            <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752612281/20250716_015022_hq7usv.jpg')" }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold">About EduManage</h1>
                    <p className="mt-4 text-xl max-w-2xl">We are on a mission to make quality education accessible to everyone, everywhere.</p>
                </motion.div>
            </div>

            
            <div className="py-20 md:py-24 bg-base-200">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
                        <p className="text-lg text-base-content/80">
                            Our primary mission is to break down the barriers to education. We believe that learning should be a lifelong journey, and we provide the tools, resources, and community to empower individuals to achieve their personal and professional goals through high-quality, flexible, and engaging online courses.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-4 bg-base-100 rounded-2xl shadow-lg"
                    >
                        <img src="https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752612280/20250716_014940_uwgepc.jpg" alt="Our Mission" className="rounded-xl w-full h-full object-cover" />
                    </motion.div>
                </div>
            </div>

            
            <div className="py-20 md:py-24 bg-base-100">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="card items-center p-6 bg-base-200"><FaBullseye className="text-5xl text-primary mb-4" /><h3 className="text-2xl font-semibold">Excellence</h3></div>
                        <div className="card items-center p-6 bg-base-200"><FaUsers className="text-5xl text-secondary mb-4" /><h3 className="text-2xl font-semibold">Community</h3></div>
                        <div className="card items-center p-6 bg-base-200"><FaHandsHelping className="text-5xl text-accent mb-4" /><h3 className="text-2xl font-semibold">Empowerment</h3></div>
                    </div>
                </div>
            </div>

            
            <div className="py-20 md:py-24 bg-base-200">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-12">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="card bg-base-100 shadow-xl"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <figure><img src={member.image} alt={member.name} className="h-64 w-full object-cover" /></figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{member.name}</h2>
                                    <p className="text-primary">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;