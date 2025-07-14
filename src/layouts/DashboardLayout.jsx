import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Outlet } from 'react-router';
import Sidebar from './sidebar';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-br from-base-100 to-base-200 text-base-content">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* --- Main Content Area --- */}
            <div className="drawer-content flex flex-col">
                {/* Mobile Topbar */}
                <div className="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-white/80 backdrop-blur-md border-b border-base-300 shadow-sm z-10">
                    <label htmlFor="my-drawer-2" className="btn btn-sm btn-primary drawer-button gap-2">
                        <AiOutlineMenu className="text-xl" />
                        <span>Menu</span>
                    </label>
                    <h2 className="text-xl font-bold text-base-content">Dashboard</h2>
                </div>

                {/* Dynamic Page Content */}
                <main className="flex-1 p-4 sm:p-6 md:p-8 bg-base-100 rounded-t-3xl shadow-inner">
                    <Outlet />
                </main>
            </div>

            {/* --- Sidebar Area --- */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
};

export default DashboardLayout;