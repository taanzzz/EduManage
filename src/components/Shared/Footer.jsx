import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        
        <div className="bg-base-200 text-base-content/80"> 
            <div className=" px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                
                <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2">
        
        
        <div className="relative hidden lg:block h-full">
            <img 
                src="https://i.ibb.co/Q37pkcJ2/20250715-095259.jpg" 
                alt="An instructor teaching" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20"></div>
        </div>

        
        <div className="p-8 md:p-12 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-base-content sm:text-4xl">
                Become an Instructor
            </h2>
            <p className="max-w-md mx-auto lg:mx-0 mt-4 text-lg text-base-content/70">
                Share your knowledge with millions of students around the world. We provide the tools and skills to teach what you love.
            </p>
            <div className="mt-8">
                <Link
                    to="/teach-on-edu"
                    className="inline-block px-8 py-3 font-semibold text-white transition-transform duration-300 ease-in-out border-none rounded-lg bg-gradient-to-r from-primary to-secondary hover:scale-105"
                >
                    Start Teaching Today
                </Link>
            </div>
        </div>
        
    </div>
</div>

                <nav className="grid grid-cols-2 gap-8 pt-10 mt-10 border-t md:grid-cols-4 border-base-300/50">
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-semibold text-base-content">Solutions</h6>
                        <div className="mt-4 space-y-2">
                            <Link to="#" className="text-base hover:text-primary">Marketing</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Analytics</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Commerce</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Insights</Link>
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-semibold text-base-content">Support</h6>
                        <div className="mt-4 space-y-2">
                            <Link to="#" className="text-base hover:text-primary">Pricing</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Documentation</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Guides</Link><br />
                            <Link to="#" className="text-base hover:text-primary">API Status</Link>
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-semibold text-base-content">Company</h6>
                        <div className="mt-4 space-y-2">
                            <Link to="/about" className="text-base hover:text-primary">About</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Blog</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Jobs</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Press</Link>
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-semibold text-base-content">Legal</h6>
                        <div className="mt-4 space-y-2">
                            <Link to="#" className="text-base hover:text-primary">Claim</Link><br />
                            <Link to="/privacy" className="text-base hover:text-primary">Privacy</Link><br />
                            <Link to="/terms" className="text-base hover:text-primary">Terms</Link><br />
                            <Link to="#" className="text-base hover:text-primary">Policies</Link>
                        </div>
                    </div>
                </nav>
                
                <div className="flex flex-col items-center justify-between pt-8 mt-10 border-t sm:flex-row border-base-300/50">
                    <p className="text-base text-base-content/70">© {new Date().getFullYear()} EduManage, Inc. All rights reserved.</p>
                    <div className="flex mt-4 space-x-6 sm:mt-0">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-base-content/70 transition-colors duration-300 hover:text-sky-500">
                            <FaTwitter className="w-6 h-6" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-base-content/70 transition-colors duration-300 hover:text-red-600">
                            <FaYoutube className="w-6 h-6" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-base-content/70 transition-colors duration-300 hover:text-blue-600">
                            <FaFacebookF className="w-6 h-6" />
                        </a>
                         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base-content/70 transition-colors duration-300 hover:text-blue-700">
                            <FaLinkedinIn className="w-6 h-6" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;