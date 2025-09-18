import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Role, User } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { AcademicCapIcon } from '../components/Icons';
import * as ReactRouterDOM from 'react-router-dom';

const ProfileSetupPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        institution: '',
        role: Role.STUDENT,
        domain: '',
        skills: '',
        bio: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const pendingEmail = sessionStorage.getItem('pending_setup_email');
        if (!pendingEmail) {
            // If no pending setup, redirect to login
            navigate('/login');
        } else {
            setEmail(pendingEmail);
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        const usersJSON = localStorage.getItem('almasphere_users');
        if (!usersJSON) return;
        const users = JSON.parse(usersJSON);
        
        const userIndex = users.findIndex((u: User) => u.email === email);
        if (userIndex === -1) {
            navigate('/login');
            return;
        }

        const password = users[userIndex].password;

        const updatedProfile = {
            ...users[userIndex],
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        };

        users[userIndex] = updatedProfile;
        localStorage.setItem('almasphere_users', JSON.stringify(users));

        // Clean up and log in
        sessionStorage.removeItem('pending_setup_email');
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        } else {
            // Handle login failure post-setup, though unlikely
            navigate('/login');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full space-y-8">
                <div className="text-center">
                    <AcademicCapIcon className="mx-auto h-12 w-auto text-primary"/>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
                        Complete Your Profile
                    </h2>
                    <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
                        Just a few more details to get you started.
                    </p>
                </div>
                <Card className="p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Institution / College Name"
                                id="institution"
                                name="institution"
                                value={formData.institution}
                                onChange={handleChange}
                                required
                            />
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Current Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                >
                                    <option value={Role.STUDENT}>Student</option>
                                    <option value={Role.ALUMNI}>Alumni</option>
                                </select>
                            </div>
                        </div>
                        <Input
                            label="Domain of Interest / Expertise"
                            id="domain"
                            name="domain"
                            placeholder="e.g., Software Engineering, Product Management"
                            value={formData.domain}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Key Skills"
                            id="skills"
                            name="skills"
                            placeholder="e.g., React, Python, UI/UX Design"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                            helptext="Please enter skills separated by commas."
                        />
                        <div>
                             <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Short Bio (Optional)</label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows={3}
                                value={formData.bio}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Tell us a little about yourself..."
                            ></textarea>
                        </div>
                        <div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Saving...' : 'Complete Setup & Go to Dashboard'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ProfileSetupPage;