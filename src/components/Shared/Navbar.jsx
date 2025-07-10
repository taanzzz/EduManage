import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router"; 
import { motion, AnimatePresence } from "framer-motion";


import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaHome, FaThList, FaChalkboardTeacher, FaChevronDown, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import Theme from './../Theme';
import UserProfileDropdown from "../UserProfileDropdown";
import { AuthContext } from "../../contexts/AuthProvider";



const mobileMenuVariants = {
    hidden: { x: "-100%", opacity: 0, transition: { type: "tween", duration: 0.3, ease: "easeIn" } },
    visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
};
const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
};


// --- Main Navbar Component ---
const Navbar = () => {
    const { user, userRole } = useContext(AuthContext); // <-- userRole ব্যবহার করা হয়েছে
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [moreMenuOpen, setMoreMenuOpen] = useState(false);
    const navigate = useNavigate();
    const moreMenuRef = useRef(null);

    
    useEffect(() => {
        setMobileMenuOpen(false);
        setMoreMenuOpen(false);
    }, [navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setMoreMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    

    
    const NavLinkItem = ({ to, children, icon: Icon, isDropdown = false }) => (
        <NavLink
            to={to}
            onClick={() => {
                setMobileMenuOpen(false);
                setMoreMenuOpen(false);
            }}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg text-base font-semibold transition-all duration-300 group ${
                    isDropdown ? 'w-full px-3 py-2' : 'px-4 py-2'
                } ${
                    isActive
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary"
                        : "text-base-content/70 hover:text-primary"
                }`
            }
        >
            <Icon className="text-xl transition-transform duration-300 group-hover:scale-110" />
            <span>{children}</span>
        </NavLink>
    );

    
    const primaryNavLinks = (
        <nav className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
            <NavLinkItem to="/" icon={FaHome}>Home</NavLinkItem>
            <NavLinkItem to="/all-classes" icon={FaThList}>All Classes</NavLinkItem>
            {user && (
                <NavLinkItem to="/teach-on-edu" icon={FaChalkboardTeacher}>
                    Teach on EduManage
                </NavLinkItem>
            )}
        </nav>
    );

    return (
        <header className="fixed left-0 right-0 top-0 z-[999]">
            <div className="bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 shadow-sm transition-all duration-300">
                <div className="navbar h-10 px-4">
                    
                    <div className="navbar-start">
                        <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
                             <FaGraduationCap className="w-9 h-9 text-primary" />
                            <span className="text-2xl font-extrabold tracking-tight select-none hidden sm:inline">
                                <span className="text-base-content">Edu</span>
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Manage</span>
                            </span>
                        </NavLink>
                    </div>

                    
                    <div className="navbar-center hidden lg:flex">
                        {primaryNavLinks}
                    </div>

                    
                    <div className="navbar-end flex items-center gap-3">
                        <Theme />
                        {user ? (
                            <UserProfileDropdown /> 
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <NavLink to="/login" className="btn btn-ghost">
                                    <FaSignInAlt /> Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="btn border-none bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/40 transition-all duration-300"
                                >
                                    <FaUserPlus /> Register
                                </NavLink>
                            </div>
                        )}
                        <div className="lg:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="btn btn-square btn-ghost" aria-label="Toggle menu">
                                {mobileMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="hidden" className="lg:hidden absolute top-full left-0 w-full mt-px">
                        <div className="p-4 bg-base-100 border-b border-x border-base-300/50 rounded-b-2xl shadow-xl">
                            {primaryNavLinks}
                            {!user && (
                                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-base-300">
                                    <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-ghost w-full">
                                        <FaSignInAlt /> Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="btn border-none bg-gradient-to-r from-primary to-secondary text-white w-full"
                                    >
                                        <FaUserPlus /> Register
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;