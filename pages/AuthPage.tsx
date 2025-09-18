import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AcademicCapIcon, LinkedInIcon } from '../components/Icons';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleAuth = (role: Role) => {
        login(role);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-neutral-800 p-10 rounded-xl shadow-lg">
                <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-auto text-primary">
                        <AcademicCapIcon className="h-10 w-10"/>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
                        {isLogin ? 'Sign in to your account' : 'Create an account'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        {!isLogin && (
                            <div>
                                <Input id="name" name="name" type="text" required placeholder="Full Name" />
                            </div>
                        )}
                        <div>
                             <Input id="email-address" name="email" type="email" required placeholder="Email address" />
                        </div>
                        <div>
                           <Input id="password" name="password" type="password" required placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:text-primary-hover">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full" onClick={() => handleAuth(Role.STUDENT)}>
                            {isLogin ? 'Sign in' : 'Sign up'}
                        </Button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <p className="text-neutral-600 dark:text-neutral-400">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-primary hover:text-primary-hover ml-1">
                             {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-3">
                         <button className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600">
                            <LinkedInIcon />
                            <span className="ml-2">Verify with LinkedIn</span>
                        </button>
                    </div>
                     <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
                        <p>Simulating role-based login:</p>
                        <div className="flex justify-center gap-2 mt-2">
                             <button onClick={() => handleAuth(Role.STUDENT)} className="underline">As Student</button>
                            <button onClick={() => handleAuth(Role.ALUMNI)} className="underline">As Alumni</button>
                            <button onClick={() => handleAuth(Role.ADMIN)} className="underline">As Admin</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
