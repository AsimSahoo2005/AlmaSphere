import React from 'react';
import Card from '../components/ui/Card';
// FIX: Import ShieldCheckIcon to resolve 'Cannot find name' error.
import { SparklesIcon, UsersIcon, ShieldCheckIcon } from '../components/Icons';

const teamMembers = [
    { name: 'Alex Johnson', title: 'Founder & CEO', avatar: 'https://picsum.photos/id/1005/200/200' },
    { name: 'Maria Garcia', title: 'Head of Product', avatar: 'https://picsum.photos/id/1027/200/200' },
    { name: 'Sam Chen', title: 'Lead Engineer', avatar: 'https://picsum.photos/id/64/200/200' },
    { name: 'Jordan Lee', title: 'Community Manager', avatar: 'https://picsum.photos/id/219/200/200' },
];

const AboutUsPage: React.FC = () => {
    return (
        <div className="py-10 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="text-center py-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">About AlmaSphere</h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
                        Connecting generations of talent to foster growth, share wisdom, and build the future, together.
                    </p>
                </section>

                {/* Mission Section */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Our Mission</h2>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Our mission is to democratize mentorship by making it radically accessible. We believe that everyone deserves a mentor, and every experienced professional has wisdom to share. AlmaSphere bridges this gap by leveraging technology to create meaningful, convenient, and impactful connections between students and alumni.
                            </p>
                        </div>
                        <div className="flex justify-center">
                             <img src="https://images.unsplash.com/photo-1521737852577-684897f092a2?q=80&w=2072&auto=format&fit=crop" alt="Team working" className="rounded-lg shadow-lg w-full h-auto object-cover"/>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Our Core Values</h2>
                            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">The principles that guide us.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6">
                                <UsersIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Community First</h3>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">We build tools that empower and connect our community.</p>
                            </div>
                            <div className="p-6">
                                <SparklesIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Purposeful Growth</h3>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">We champion continuous learning and personal development.</p>
                            </div>
                            <div className="p-6">
                                <ShieldCheckIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Integrity & Trust</h3>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">We operate with transparency to create a safe and trusted network.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Meet the Team</h2>
                        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">The passionate individuals behind AlmaSphere.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {teamMembers.map(member => (
                            <Card key={member.name} className="text-center p-6">
                                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{member.name}</h3>
                                <p className="text-primary">{member.title}</p>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUsPage;