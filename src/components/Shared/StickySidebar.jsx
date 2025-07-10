import React from 'react';
import { FaUsers, FaDollarSign, FaCreditCard, FaChalkboardTeacher } from 'react-icons/fa';

const StickySidebar = ({ classDetails, onEnroll }) => {
    if (!classDetails) return null;

    const { price, totalEnrollment, teacher } = classDetails;

    return (
        <div className="p-6 bg-base-100 rounded-2xl shadow-xl border border-base-300/20 lg:sticky lg:top-24">
            <h3 className="text-3xl font-bold text-center">
                <span className="text-primary">${price}</span>
            </h3>
            <button
                onClick={onEnroll}
                className="btn w-full mt-6 text-lg text-white border-none bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-300"
            >
                <FaCreditCard /> Enroll Now
            </button>
            <div className="divider">Details</div>
            <div className="space-y-4 text-base-content/80">
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 font-semibold"><FaChalkboardTeacher /> Instructor</span>
                    <span>{teacher.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 font-semibold"><FaUsers /> Enrolled</span>
                    <span>{totalEnrollment} Students</span>
                </div>
            </div>
        </div>
    );
};

export default StickySidebar;