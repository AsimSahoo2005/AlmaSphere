
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AcademicCapIcon } from './Icons';

const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
                             <AcademicCapIcon className="w-8 h-8"/>
                            <span>AlmaSphere</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="text-neutral-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            {isAuthenticated && (
                                <>
                                    <Link to="/dashboard" className="text-neutral-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                    <Link to="/mentor-match" className="text-neutral-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Mentor Match</Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="flex items-center space-x-2">
                                    <img className="h-8 w-8 rounded-full" src={user?.avatarUrl} alt={user?.name} />
                                    <span className="text-neutral-700 text-sm font-medium hidden sm:block">{user?.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-primary-light text-primary hover:bg-primary/20 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-2">
                                <Link
                                    to="/login"
                                    className="text-primary hover:bg-primary-light px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-md text-sm font-medium shadow"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
