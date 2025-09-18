
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { DUMMY_MENTORS, Role } from '../types';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    
    // In a real app, you'd fetch the detailed mentor profile if user is alumni
    const mentorProfile = user?.role === Role.ALUMNI ? DUMMY_MENTORS.find(m => m.id === user.id) : null;

    if (!user) {
        return <div className="text-center py-20">Please log in to view your profile.</div>;
    }

    return (
        <div className="bg-neutral-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-3xl mx-auto">
                    <Card>
                        <div className="p-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
                                <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-primary shadow-md"/>
                                <div className="text-center sm:text-left mt-4 sm:mt-0">
                                    <h1 className="text-3xl font-bold text-neutral-900">{user.name}</h1>
                                    <p className="text-lg text-primary font-medium">{user.role}</p>
                                    <p className="text-neutral-600">{user.university}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 p-8">
                            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Edit Profile</h2>
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
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
