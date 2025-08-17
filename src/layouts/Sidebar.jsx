import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { FaHome, FaUsers, FaClipboardList, FaPlusCircle, FaListAlt, FaBookReader, FaFileInvoiceDollar } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import useRole from '../hooks/useRole';
import { AuthContext } from '../contexts/AuthProvider';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isAdmin, isTeacher, isStudent } = useRole();
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 my-1 rounded-lg transition-all duration-300 ease-in-out ${getThemeClasses.primaryText} ${
      isActive
        ? isDark
          ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
          : 'bg-green-500/20 text-green-600 font-semibold'
        : isDark
          ? 'hover:bg-cyan-500/10 hover:text-cyan-400'
          : 'hover:bg-green-500/10 hover:text-green-600'
    } ${hoverGlow}`;

  const adminLinks = (
    <>
      <NavLink to="/dashboard/profile" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <ImProfile />
        </motion.div>
        My Profile
      </NavLink>
      <NavLink to="/dashboard/manage-classes" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FaClipboardList />
        </motion.div>
        Manage Classes
      </NavLink>
      <NavLink to="/dashboard/teacher-requests" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FaUsers />
        </motion.div>
        Teacher Requests
      </NavLink>
      <NavLink to="/dashboard/manage-users" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FaUsers />
        </motion.div>
        Users
      </NavLink>
    </>
  );

  const teacherLinks = (
    <>
      <NavLink to="/dashboard/profile" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <ImProfile />
        </motion.div>
        My Profile
      </NavLink>
      <NavLink to="/dashboard/add-class" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FaPlusCircle />
        </motion.div>
        Add Class
      </NavLink>
      <NavLink to="/dashboard/my-classes" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FaListAlt />
        </motion.div>
        My Classes
      </NavLink>
    </>
  );

  const studentLinks = (
    <>
      <NavLink to="/dashboard/profile" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <ImProfile />
        </motion.div>
        My Profile
      </NavLink>
      <NavLink to="/dashboard/my-enrolled-classes" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FaBookReader />
        </motion.div>
        My Enrolled Classes
      </NavLink>
      <NavLink to="/dashboard/my-orders" className={navLinkClass}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FaFileInvoiceDollar />
        </motion.div>
        My Orders
      </NavLink>
    </>
  );

  return (
    <aside className={`flex flex-col h-full p-4 w-64 ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} border-r ${getThemeClasses.border}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-2xl font-bold ${gradientText}`}>Dashboard</h2>
        </div>
        <div className="flex-1">
          <ul className="space-y-1 text-base">
            {isAdmin && adminLinks}
            {isTeacher && teacherLinks}
            {isStudent && studentLinks}
          </ul>
        </div>
      </div>
      <div className="mt-auto pt-6 border-t ${getThemeClasses.border}">
        <NavLink
          to="/"
          className={`block w-full text-center px-4 py-2 rounded-lg ${getThemeClasses.secondaryText} ${getThemeClasses.navLink} ${hoverGlow}`}
        >
          Back to Home
        </NavLink>
        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`block w-full text-center px-4 py-2 mt-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors ${hoverGlow}`}
        >
          Logout
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;