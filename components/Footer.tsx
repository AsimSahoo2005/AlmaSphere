import React from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { AcademicCapIcon } from './Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                         <ReactRouterDOM.Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
                            <AcademicCapIcon className="w-8 h-8"/>
                            <span>AlmaSphere</span>
                        </ReactRouterDOM.Link>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">AI-Powered Alumni-Student Networking for the next generation.</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-wider uppercase">Platform</h3>
                        <ul className="mt-4 space-y-2">
                            <li><ReactRouterDOM.Link to="/mentor-match" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">Find a Mentor</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to="/login" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">Join as Alumni</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to="/login" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">Join as Student</ReactRouterDOM.Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">Blog</a></li>
                            <li><a href="#" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">Help Center</a></li>
                            <li><a href="#" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">Community Guidelines</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">About Us</a></li>
                            <li><a href="#" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">Careers</a></li>
                            <li><a href="#" className="text-base text-neutral-600 dark:text-neutral-400 hover:text-primary">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-base text-neutral-500 dark:text-neutral-400">&copy; {new Date().getFullYear()} AlmaSphere, Inc. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        {/* Social Icons can be added here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
