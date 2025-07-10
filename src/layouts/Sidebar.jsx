// 📁 File: src/layouts/Sidebar.jsx

import React, { useContext } from 'react';
import { NavLink } from 'react-router';

// --- Icons ---
import { FaHome, FaUsers, FaClipboardList, FaPlusCircle, FaListAlt, FaBookReader } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdRateReview } from 'react-icons/md';
import useRole from '../hooks/useRole';
import { AuthContext } from '../contexts/AuthProvider';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const { isAdmin, isTeacher, isStudent } = useRole();

    // NavLink এর জন্য একটি সাধারণ স্টাইল ফাংশন
    const navLinkClass = ({ isActive }) => 
        `flex items-center px-4 py-2 my-1 rounded-lg transition-colors duration-300 ease-in-out ${
            isActive ? 'bg-primary/20 text-primary font-semibold' : 'hover:bg-base-300'
        }`;

    // বিভিন্ন রোলের জন্য লিঙ্ক
    const adminLinks = (
        <>
            <NavLink to="/dashboard/profile" className={navLinkClass}><ImProfile /> My Profile</NavLink>
            <NavLink to="/dashboard/manage-classes" className={navLinkClass}><FaUsers /> Manage Classes</NavLink>
            <NavLink to="/dashboard/teacher-requests" className={navLinkClass}><FaUsers /> Teacher Requests</NavLink>
            <NavLink to="/dashboard/manage-users" className={navLinkClass}><FaUsers /> Users</NavLink>
            <NavLink to="/dashboard/all-classes" className={navLinkClass}><FaClipboardList /> All Classes</NavLink>
        </>
    );

    const teacherLinks = (
        <>
            <NavLink to="/dashboard/profile" className={navLinkClass}><ImProfile /> My Profile</NavLink>
            <NavLink to="/dashboard/add-class" className={navLinkClass}><FaPlusCircle /> Add Class</NavLink>
            <NavLink to="/dashboard/my-classes" className={navLinkClass}><FaListAlt /> My Classes</NavLink>
        </>
    );

    const studentLinks = (
        <>
            <NavLink to="/dashboard/profile" className={navLinkClass}><ImProfile /> My Profile</NavLink>
            <NavLink to="/dashboard/my-enrolled-classes" className={navLinkClass}><FaBookReader /> My Enrolled Classes</NavLink>
            <NavLink to="/dashboard/my-reviews" className={navLinkClass}><MdRateReview /> My Reviews</NavLink>
        </>
    );

    return (
        <div className="flex flex-col h-full p-3 w-64 bg-base-200 text-base-content">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dashboard</h2>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        {isAdmin && adminLinks}
                        {isTeacher && teacherLinks}
                        {isStudent && studentLinks}
                    </ul>
                </div>
            </div>
            <div className="mt-auto flex flex-col items-center pt-4 border-t-2 border-base-300">
                 <NavLink to="/" className="w-full text-center px-4 py-2 my-1 rounded-lg hover:bg-base-300 transition-colors duration-300 ease-in-out">
                    Back to Home
                </NavLink>
                <button 
                    onClick={logout} 
                    className="w-full text-center px-4 py-2 my-1 rounded-lg text-error hover:bg-error/20 transition-colors duration-300 ease-in-out"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;