import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { UsersIcon, SparklesIcon, DocumentTextIcon, ArrowRightIcon } from '../components/Icons';

const features = [
    {
        icon: <UsersIcon className="w-10 h-10 text-primary" />,
        title: 'Smart Mentor Matching',
        description: 'Our AI algorithm connects you with alumni based on your major, career goals, and interests for the perfect mentorship fit.',
    },
    {
        icon: <SparklesIcon className="w-10 h-10 text-primary" />,
        title: 'Flexible Micro-Sessions',
        description: 'Book convenient 15, 30, or 60-minute virtual sessions that fit into both your and your mentor\'s busy schedules.',
    },
    {
        icon: <DocumentTextIcon className="w-10 h-10 text-primary" />,
        title: 'AI-Powered Transcripts',
        description: 'Receive an AI-generated summary and actionable key takeaways after every session, so you never miss a detail.',
    },
];

const LandingPage: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-primary-light dark:bg-primary/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        <span className="block">AI-Powered</span>
                        <span className="block text-primary">Alumni-Student Networking</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
                        Unlock your potential with personalized micro-mentorship from your university's most valuable resource: its alumni.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/login">
                             <Button size="lg" variant="primary">Join as Student <ArrowRightIcon /></Button>
                        </Link>
                         <Link to="/login">
                            <Button size="lg" variant="ghost">Join as Alumni</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-neutral-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">A smarter way to connect</h2>
                        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">AlmaSphere is built to foster meaningful connections that accelerate your career.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="text-center p-8 bg-neutral-50 dark:bg-neutral-800 border-none">
                                <div className="flex justify-center items-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{feature.title}</h3>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
