import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Role, User } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { AcademicCapIcon } from '../components/Icons';
import * as ReactRouterDOM from 'react-router-dom';

const defaultAvatars = [
    'https://picsum.photos/id/1005/200/200',
    'https://picsum.photos/id/1027/200/200',
    'https://picsum.photos/id/64/200/200',
    'https://picsum.photos/id/219/200/200',
    'https://picsum.photos/id/343/200/200',
    'https://picsum.photos/id/447/200/200',
];

const ProfileSetupPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        institution: '',
        role: Role.STUDENT,
        domain: '',
        skills: '',
        bio: '',
        title: '',
        company: '',
        avatarUrl: `https://i.pravatar.cc/150?u=${sessionStorage.getItem('pending_setup_email')}`
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const pendingEmail = sessionStorage.getItem('pending_setup_email');
        const pendingRole = sessionStorage.getItem('pending_setup_role') as Role;
        if (!pendingEmail) {
            navigate('/login');
        } else {
            setEmail(pendingEmail);
            setFormData(prev => ({ ...prev, role: pendingRole || Role.STUDENT }));
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (base64String) {
                    setFormData(prev => ({ ...prev, avatarUrl: base64String }));
                }
            };
            reader.readAsDataURL(file);
        }
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
        
        const updatedProfileData: Partial<User> = {
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        };

        if (formData.role === Role.ALUMNI) {
            const companyDomain = formData.company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
            updatedProfileData.companyLogoUrl = `https://logo.clearbit.com/${companyDomain}`;
        }


        const updatedProfile = {
            ...users[userIndex],
            ...updatedProfileData,
        };

        users[userIndex] = updatedProfile;
        localStorage.setItem('almasphere_users', JSON.stringify(users));

        // Clean up and log in
        sessionStorage.removeItem('pending_setup_email');
        sessionStorage.removeItem('pending_setup_role');
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        } else {
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
                        
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Choose Your Avatar</label>
                            <div className="flex items-center space-x-4">
                                <img src={formData.avatarUrl} alt="Selected Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-primary" />
                                <div className="flex flex-wrap gap-2 flex-1">
                                    {defaultAvatars.map(url => (
                                        <img key={url} src={url} alt="avatar choice" onClick={() => setFormData(prev => ({...prev, avatarUrl: url}))} className={`w-12 h-12 rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition ${formData.avatarUrl === url ? 'ring-2 ring-primary' : 'ring-1 ring-neutral-300'}`} />
                                    ))}
                                    <label htmlFor="avatar-upload" className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary ring-1 ring-neutral-300 text-neutral-500">
                                        +
                                    </label>
                                    <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </div>
                            </div>
                        </div>

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
                                <label htmlFor="role" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Your Role</label>
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
                        
                        {formData.role === Role.ALUMNI && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Current Job Title"
                                    id="title"
                                    name="title"
                                    placeholder="e.g., Software Engineer"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Company"
                                    id="company"
                                    name="company"
                                    placeholder="e.g., Google"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <Input
                            label={formData.role === Role.ALUMNI ? "Domain of Expertise" : "Domain of Interest"}
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