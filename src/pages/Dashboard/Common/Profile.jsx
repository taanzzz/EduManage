import React, { useContext, useState } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../contexts/AuthProvider';
import axiosSecure from '../../../api/Axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import EditProfileModal from './EditProfileModal'; 

// --- Icons ---
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaEdit } from 'react-icons/fa';
import { MdVerified } from "react-icons/md";

const Profile = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const { data: profileData, isLoading: profileLoading, refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/profile/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const isLoading = authLoading || profileLoading;

    if (isLoading) return <LoadingSpinner />;
    if (!profileData) return <div className="text-center text-xl">Could not load profile data.</div>;

    const { name, email, image, role } = profileData;

    
    const userImage = image || `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`;

    return (
        <>
            <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 bg-base-200">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="relative bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl shadow-2xl text-center text-white">
                        <div className="avatar absolute -bottom-12 left-1/2 -translate-x-1/2">
                            <div className="w-24 h-24 rounded-full ring-4 ring-white ring-offset-4 ring-offset-base-200">
                                <img src={userImage} alt={name} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center mt-16">
                        <h1 className="text-3xl font-extrabold text-base-content">{name}</h1>
                        <div className="mt-2">
                            <span className="badge badge-lg badge-outline border-accent text-accent font-semibold">
                                {role.charAt(0).toUpperCase() + role.slice(1)} <MdVerified className="ml-1" />
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300/20">
                        <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary/20 pb-2">
                            Personal Information
                        </h2>
                        <div className="space-y-4">
                            
                            <div className="flex items-center gap-4">
                                <FaEnvelope className="w-6 h-6 text-secondary" />
                                <div>
                                    <p className="text-sm text-base-content/70">Email</p>
                                    <p className="text-lg font-medium text-base-content">{email}</p>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="mt-8 text-right">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="btn text-white border-none bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-300"
                            >
                                <FaEdit /> Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            
            <EditProfileModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                profileData={profileData}
                refetch={refetch}
            />
        </>
    );
};

export default Profile;