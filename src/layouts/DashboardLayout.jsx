import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Outlet } from 'react-router';
import Sidebar from './sidebar';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            {/* --- Main Content Area --- */}
            <div className="drawer-content flex flex-col">
                
                <div className="lg:hidden flex items-center justify-between w-full p-2 bg-base-100 shadow-md">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">
                        <AiOutlineMenu />
                    </label>
                    <h2 className="text-lg font-bold">Dashboard Menu</h2>
                </div>
                
                
                <main className="flex-1 p-4 md:p-8 bg-base-100">
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