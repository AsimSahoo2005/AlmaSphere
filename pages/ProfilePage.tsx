import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { DUMMY_MENTORS, DUMMY_SESSIONS, Role } from '../types';
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
                         <span className="absolute -left-[10px] flex items-center justify-center w-5 h-5 bg-primary rounded-full ring-4 ring-white dark:ring-neutral-800"></span>
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
    const { user } = useAuth();
    
    const mentorProfile = user?.role === Role.ALUMNI ? DUMMY_MENTORS.find(m => m.id === user.id) : null;

    if (!user) {
        return <div className="text-center py-20">Please log in to view your profile.</div>;
    }

    return (
        <div className="bg-neutral-100 dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                        <div className="p-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
                                <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-primary shadow-md"/>
                                <div className="text-center sm:text-left mt-4 sm:mt-0">
                                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{user.name}</h1>
                                    <p className="text-lg text-primary font-medium">{user.role}</p>
                                    <p className="text-neutral-600 dark:text-neutral-400">{user.university}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 dark:border-neutral-700 p-8">
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Edit Profile</h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Full Name" id="name" defaultValue={user.name} />
                                    <Input label="Email Address" id="email" type="email" defaultValue={user.email} />
                                </div>
                                
                                {mentorProfile && (
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input label="Job Title" id="title" defaultValue={mentorProfile.title} />
                                        <Input label="Company" id="company" defaultValue={mentorProfile.company} />
                                    </div>
                                )}
                                
                                <div className="pt-2">
                                    <Button>Save Changes</Button>
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
