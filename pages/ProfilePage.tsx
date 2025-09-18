import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { DUMMY_SESSIONS, Role } from '../types';
import { CheckBadgeIcon } from '../components/Icons';

const StudentProgressTracker: React.FC = () => {
    const { user } = useAuth();
    const completedSessions = DUMMY_SESSIONS.filter(s => s.studentId === user?.id && s.status === 'completed').sort((a,b) => b.dateTime.getTime() - a.dateTime.getTime());

    return (
        <Card className="p-8">
             <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Session Progress Tracker</h2>
             <div className="relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-700">
                {completedSessions.map((session, index) => (
                    <div key={session.id} className="mb-8 last:mb-0">
                         <span className={`absolute -left-[10px] flex items-center justify-center w-5 h-5 bg-primary rounded-full ring-4 ${index === 0 ? 'ring-primary-light' : 'ring-white dark:ring-neutral-800'}`}></span>
                         <div className="ml-4">
                            <h3 className="font-semibold">{session.mentorName}</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-neutral-500 dark:text-neutral-400">{session.dateTime.toLocaleDateString()}</time>
                            <div className="flex flex-wrap gap-2">
                                {session.skillTags.map(tag => (
                                    <span key={tag} className="bg-primary-light dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-medium px-2.5 py-0.5 rounded-full">{tag}</span>
                                ))}
                            </div>
                         </div>
                    </div>
                ))}
             </div>
        </Card>
    );
};


const ProfilePage: React.FC = () => {
    const { user, updateProfile, loading } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        institution: user?.institution || '',
        domain: user?.domain || '',
        skills: user?.skills?.join(', ') || '',
        bio: user?.bio || ''
    });

    if (!user) {
        return <div className="text-center py-20">Please log in to view your profile.</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (base64String) {
                    updateProfile({ avatarUrl: base64String });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        };
        await updateProfile(updatedData);
        alert("Profile updated successfully!");
    };


    return (
        <div className="py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                        <div className="p-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
                                <div className="relative group flex-shrink-0">
                                    <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-primary shadow-md object-cover"/>
                                    <label htmlFor="avatar-upload" className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <div className="text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            <span className="text-xs font-semibold">Change</span>
                                        </div>
                                    </label>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/png, image/jpeg"
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                                <div className="text-center sm:text-left mt-4 sm:mt-0">
                                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{user.name}</h1>
                                    <p className="text-lg text-primary font-medium">{user.role}</p>
                                    <p className="text-neutral-600 dark:text-neutral-400">{user.institution}</p>
                                    {user.domain && <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Domain: {user.domain}</p>}
                                    {user.skills && user.skills.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                                            {user.skills.map(skill => <span key={skill} className="bg-neutral-200 dark:bg-neutral-700 text-xs font-medium px-2 py-1 rounded-full">{skill}</span>)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 dark:border-neutral-700 p-8">
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Edit Profile</h2>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Full Name" id="name" name="name" value={formData.name} onChange={handleChange} />
                                    <Input label="Institution / College" id="institution" name="institution" value={formData.institution} onChange={handleChange} />
                                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Domain of Interest / Expertise" id="domain" name="domain" value={formData.domain} onChange={handleChange} />
                                    <Input label="Key Skills (comma-separated)" id="skills" name="skills" value={formData.skills} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Short Bio</label>
                                    <textarea id="bio" name="bio" rows={3} value={formData.bio} onChange={handleChange} className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md shadow-sm placeholder-neutral-400 dark:placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
                                </div>
                                <div className="pt-2">
                                    <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
                                </div>
                            </form>
                        </div>
                    </Card>

                    <Card className="p-8">
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Verification Status</h2>
                        <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center space-x-3">
                             <CheckBadgeIcon className="w-6 h-6 text-green-600 dark:text-green-400"/>
                             <p className="text-green-800 dark:text-green-200 font-medium">Your account is verified.</p>
                        </div>
                    </Card>
                    
                    {user.role === Role.STUDENT && <StudentProgressTracker />}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;