import React, { useState, useEffect } from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AcademicCapIcon, LinkedInIcon } from '../components/Icons';
import { Role } from '../types';

const AuthPage: React.FC = () => {
    const location = ReactRouterDOM.useLocation();
    const [isLogin, setIsLogin] = useState(!location.state?.isSignup);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>(location.state?.initialRole || Role.STUDENT);
    const { login, signup, error, loading } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
        if (location.state?.isSignup) {
            setIsLogin(false);
        }
        if (location.state?.initialRole) {
            setRole(location.state.initialRole);
        }
    }, [location.state]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            const success = await login(email, password);
            if (success) {
                navigate('/dashboard');
            }
        } else {
            const success = await signup(name, email, password, role);
            if (success) {
                navigate('/profile-setup');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl p-10 rounded-xl shadow-2xl border border-white/20">
                <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-auto text-primary">
                        <AcademicCapIcon className="h-10 w-10"/>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
                        {isLogin ? 'Sign in to your account' : 'Create an account'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    <div className="rounded-md shadow-sm space-y-3">
                        {!isLogin && (
                            <>
                                <div className="p-2 rounded-md border border-neutral-300 dark:border-neutral-600">
                                    <fieldset>
                                        <legend className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 text-center">I am signing up as a...</legend>
                                        <div className="flex justify-around">
                                             <label className="flex items-center space-x-2 cursor-pointer text-neutral-800 dark:text-neutral-200">
                                                <input type="radio" name="role" value={Role.STUDENT} checked={role === Role.STUDENT} onChange={() => setRole(Role.STUDENT)} className="form-radio text-primary focus:ring-primary" />
                                                <span>Student</span>
                                            </label>
                                             <label className="flex items-center space-x-2 cursor-pointer text-neutral-800 dark:text-neutral-200">
                                                <input type="radio" name="role" value={Role.ALUMNI} checked={role === Role.ALUMNI} onChange={() => setRole(Role.ALUMNI)} className="form-radio text-primary focus:ring-primary" />
                                                <span>Alumni</span>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>
                                <Input id="name" name="name" type="text" required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                            </>
                        )}
                        <div>
                             <Input id="email-address" name="email" type="email" required placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                           <Input id="password" name="password" type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
                        </Button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <p className="text-neutral-600 dark:text-neutral-400">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button onClick={() => { setIsLogin(!isLogin); setEmail(''); setPassword(''); setName(''); }} className="font-medium text-primary hover:text-primary-hover ml-1">
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
                            <span className="px-2 bg-white/80 dark:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-3">
                         <button className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600">
                            <LinkedInIcon />
                            <span className="ml-2">Verify with LinkedIn</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;