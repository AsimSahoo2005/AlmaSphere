
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AcademicCapIcon } from '../components/Icons';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleAuth = (role: Role) => {
        login(role);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-auto text-primary">
                        <AcademicCapIcon className="h-10 w-10"/>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
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
                    <p>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-primary hover:text-primary-hover ml-1">
                             {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-neutral-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                         <div>
                            <Button className="w-full bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50">Google</Button>
                        </div>
                         <div>
                             <Button className="w-full bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50">LinkedIn</Button>
                        </div>
                    </div>
                     <div className="mt-4 text-center text-xs text-neutral-500">
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
