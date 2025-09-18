import React from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UsersIcon, CheckBadgeIcon, AcademicCapIcon } from './Icons'; // Assuming Icons for dashboard, mentor match, profile

const MobileBottomNav: React.FC = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <AcademicCapIcon className="w-6 h-6 mx-auto mb-1" /> },
        { path: '/mentor-match', label: 'Mentors', icon: <UsersIcon className="w-6 h-6 mx-auto mb-1" /> },
        { path: '/profile', label: 'Profile', icon: <CheckBadgeIcon className="w-6 h-6 mx-auto mb-1" /> },
    ];

    const navLinkClasses = "flex-1 text-center text-neutral-600 dark:text-neutral-400 font-medium text-xs py-2";
    const activeNavLinkClasses = "text-primary dark:text-secondary";

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-100/50 dark:bg-neutral-900/50 backdrop-blur-xl border-t border-slate-300/50 dark:border-neutral-700/50 z-40">
            <div className="flex justify-around items-center h-16">
                {navItems.map(item => (
                    <ReactRouterDOM.NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                    >
                        {item.icon}
                        {item.label}
                    </ReactRouterDOM.NavLink>
                ))}
            </div>
        </nav>
    );
};

export default MobileBottomNav;