import React from 'react';
import { FaLightbulb, FaChartPie, FaUserFriends } from 'react-icons/fa';

const Insights = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-extrabold">Gain Actionable Insights</h1>
                <p className="text-xl text-base-content/70 mt-4">Understand your audience and improve your content.</p>
                 <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="card bg-base-200 p-8 shadow-lg"><FaUserFriends className="text-4xl text-accent mx-auto mb-4" /><h3 className="text-2xl font-bold">Student Demographics</h3></div>
                    <div className="card bg-base-200 p-8 shadow-lg"><FaChartPie className="text-4xl text-accent mx-auto mb-4" /><h3 className="text-2xl font-bold">Engagement Reports</h3></div>
                    <div className="card bg-base-200 p-8 shadow-lg"><FaLightbulb className="text-4xl text-accent mx-auto mb-4" /><h3 className="text-2xl font-bold">Content Opportunities</h3></div>
                </div>
            </div>
        </div>
    );
};
export default Insights;