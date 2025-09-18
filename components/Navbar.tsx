import React from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { AcademicCapIcon, SunIcon, MoonIcon } from './Icons';
import Button from './ui/Button';

const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const navigate = ReactRouterDOM.useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm dark:shadow-none sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <ReactRouterDOM.Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
                             <AcademicCapIcon className="w-8 h-8"/>
                            <span className="hidden sm:inline">AlmaSphere</span>
                        </ReactRouterDOM.Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <ReactRouterDOM.Link to="/" className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</ReactRouterDOM.Link>
                            {isAuthenticated && (
                                <>
                                    <ReactRouterDOM.Link to="/dashboard" className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</ReactRouterDOM.Link>
                                    <ReactRouterDOM.Link to="/mentor-match" className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Mentor Match</ReactRouterDOM.Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={toggleTheme} className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary">
                            {theme === 'light' ? <MoonIcon className="w-5 h-5"/> : <SunIcon className="w-5 h-5"/>}
                        </button>
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <ReactRouterDOM.Link to="/profile" className="flex items-center space-x-2">
                                    <img className="h-8 w-8 rounded-full" src={user?.avatarUrl} alt={user?.name} />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium hidden sm:block">{user?.name}</span>
                                 </ReactRouterDOM.Link>
                                <Button
                                    onClick={handleLogout}
                                    variant="ghost"
                                    size="sm"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="space-x-2">
                                <ReactRouterDOM.Link
                                    to="/login"
                                    className="text-primary hover:bg-primary-light dark:hover:bg-primary/20 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </ReactRouterDOM.Link>
                                <ReactRouterDOM.Link
                                    to="/login"
                                    className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-md text-sm font-medium shadow"
                                >
                                    Sign Up
                                </ReactRouterDOM.Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
