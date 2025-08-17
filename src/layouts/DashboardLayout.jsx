import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import { useTheme } from './../hooks/useTheme';


const DashboardLayout = () => {
    const { isDark, getThemeClasses, hoverGlow } = useTheme();

    return (
        <div className={`drawer lg:drawer-open min-h-screen ${getThemeClasses.pageBackground} text-base-content relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
                <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                    isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                }`} />
                <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
                    isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
                }`} />
            </div>

            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main Content Area */}
            <div className="drawer-content flex flex-col relative z-10">
                {/* Mobile Topbar */}
                <div className={`lg:hidden flex items-center justify-between w-full px-4 py-3 ${getThemeClasses.cardBackground} backdrop-blur-md border-b border-base-300 ${getThemeClasses.shadow}`}>
                    <label
                        htmlFor="my-drawer-2"
                        className={`btn btn-sm ${isDark ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-green-500 hover:bg-green-400'} text-white drawer-button gap-2 ${hoverGlow}`}
                    >
                        <AiOutlineMenu className="text-xl" />
                        <span>Menu</span>
                    </label>
                    <h2 className={`text-xl font-bold ${getThemeClasses.primaryText}`}>Dashboard</h2>
                </div>

                {/* Dynamic Page Content */}
                <main className={`flex-1 p-4 sm:p-6 md:p-8 ${getThemeClasses.cardBackground} rounded-t-3xl ${getThemeClasses.shadow}`}>
                    <Outlet />
                </main>
            </div>

            {/* Sidebar Area */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
};

export default DashboardLayout;