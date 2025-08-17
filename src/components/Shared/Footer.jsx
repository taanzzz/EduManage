import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useTheme } from '../../hooks/useTheme';

const Footer = () => {
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

    return (
        <div className={`relative ${getThemeClasses.pageBackground} text-base-content/80 overflow-hidden`}>
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20">
                <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                    isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                }`} />
                <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
                    isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
                }`} />
            </div>

            <div className="px-4 py-12 mx-auto space-y-8 sm:px-6 lg:px-8 relative z-10">
                <div className={`${getThemeClasses.cardBackground} rounded-2xl ${getThemeClasses.shadow} overflow-hidden`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative hidden lg:block h-full">
                            <img
                                src="https://i.ibb.co/Q37pkcJ2/20250715-095259.jpg"
                                alt="An instructor teaching"
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 ${
                                isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
                            }`}></div>
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-center text-center lg:text-left">
                            <h2 className={`text-3xl font-extrabold ${getThemeClasses.primaryText} sm:text-4xl ${gradientText}`}>
                                Become an Instructor
                            </h2>
                            <p className={`max-w-md mx-auto lg:mx-0 mt-4 text-lg ${getThemeClasses.secondaryText}`}>
                                Share your knowledge with millions of students around the world. We provide the tools and skills to teach what you love.
                            </p>
                            <div className="mt-8">
                                <Link
                                    to="/teach-on-edu"
                                    className={`inline-block px-8 py-3 font-semibold text-white transition-transform duration-300 ease-in-out border-none rounded-lg ${
                                        isDark
                                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400'
                                            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
                                    } ${hoverGlow}`}
                                >
                                    Start Teaching Today
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="grid grid-cols-2 gap-8 pt-10 mt-10 border-t md:grid-cols-4 border-base-300/50">
                    {[
                        {
                            title: "Solutions",
                            links: [
                                { to: "/marketing", label: "Marketing" },
                                { to: "/analytics", label: "Analytics" },
                                { to: "/commerce", label: "Commerce" },
                                { to: "/insights", label: "Insights" },
                            ],
                        },
                        {
                            title: "Support",
                            links: [
                                { to: "/pricing", label: "Pricing" },
                                { to: "/documentation", label: "Documentation" },
                                { to: "/contact", label: "Contact" },
                                { to: "/api-status", label: "API Status" },
                            ],
                        },
                        {
                            title: "Company",
                            links: [
                                { to: "/about", label: "About" },
                                { to: "/blog", label: "Blog" },
                                { to: "/jobs", label: "Jobs" },
                                { to: "/press", label: "Press" },
                            ],
                        },
                        {
                            title: "Legal",
                            links: [
                                { to: "/claim", label: "Claim" },
                                { to: "/privacy", label: "Privacy" },
                                { to: "/terms", label: "Terms" },
                                { to: "/policies", label: "Policies" },
                            ],
                        },
                    ].map((section, index) => (
                        <div key={index} className="text-center md:text-left">
                            <h6 className={`text-lg font-semibold ${getThemeClasses.primaryText}`}>{section.title}</h6>
                            <div className="mt-4 space-y-2">
                                {section.links.map((link, i) => (
                                    <Link key={i} to={link.to} className={`text-base ${getThemeClasses.secondaryText} hover:text-primary transition-colors block`}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="flex flex-col items-center justify-between pt-8 mt-10 border-t sm:flex-row border-base-300/50">
                    <p className={`text-base ${getThemeClasses.secondaryText}`}>© {new Date().getFullYear()} EduManage, Inc. All rights reserved.</p>
                    <div className="flex mt-4 space-x-6 sm:mt-0">
                        {[
                            { href: "https://twitter.com", icon: FaTwitter, color: isDark ? 'hover:text-sky-400' : 'hover:text-sky-600' },
                            { href: "https://youtube.com", icon: FaYoutube, color: isDark ? 'hover:text-red-400' : 'hover:text-red-600' },
                            { href: "https://facebook.com", icon: FaFacebookF, color: isDark ? 'hover:text-blue-400' : 'hover:text-blue-600' },
                            { href: "https://linkedin.com", icon: FaLinkedinIn, color: isDark ? 'hover:text-blue-500' : 'hover:text-blue-700' },
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${getThemeClasses.secondaryText} transition-colors duration-300 ${social.color}`}
                            >
                                <social.icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;