import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { FaHome, FaUsers, FaClipboardList, FaPlusCircle, FaListAlt, FaBookReader, FaJediOrder, FaFirstOrderAlt } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { FaFileInvoiceDollar } from "react-icons/fa";
import useRole from '../hooks/useRole';
import { AuthContext } from '../contexts/AuthProvider';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const { isAdmin, isTeacher, isStudent } = useRole();

    const navLinkClass = ({ isActive }) => 
        `flex items-center gap-3 px-4 py-2 my-1 rounded-lg transition-all duration-300 ease-in-out text-base-content hover:text-primary hover:bg-primary/10 ${
            isActive ? 'bg-primary/20 text-primary font-semibold' : ''
        }`;

    const adminLinks = (
        <>
            <NavLink to="/dashboard/profile" className={navLinkClass}><ImProfile /> My Profile</NavLink>
            <NavLink to="/dashboard/manage-classes" className={navLinkClass}><FaClipboardList /> Manage Classes</NavLink>
            <NavLink to="/dashboard/teacher-requests" className={navLinkClass}><FaUsers /> Teacher Requests</NavLink>
            <NavLink to="/dashboard/manage-users" className={navLinkClass}><FaUsers /> Users</NavLink>
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
            <NavLink to="/dashboard/my-orders" className={navLinkClass}><FaFileInvoiceDollar /> My Orders</NavLink>
        </>
    );

    return (
        <aside className="flex flex-col h-full p-4 w-64 bg-base-100 text-base-content shadow-md border-r border-base-300">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dashboard</h2>
                </div>
                <div className="flex-1">
                    <ul className="space-y-1 text-base">
                        {isAdmin && adminLinks}
                        {isTeacher && teacherLinks}
                        {isStudent && studentLinks}
                    </ul>
                </div>
            </div>
            <div className="mt-auto pt-6 border-t border-base-300">
                <NavLink to="/" className="block w-full text-center px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                    Back to Home
                </NavLink>
                <button 
                    onClick={logout} 
                    className="block w-full text-center px-4 py-2 mt-2 rounded-lg text-error hover:bg-error/10 transition-colors"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
