import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { BuildingOffice2Icon } from '../components/Icons';

const jobOpenings = [
    {
        title: 'Senior Frontend Engineer',
        department: 'Engineering',
        location: 'Remote',
        description: 'Build and scale our user-facing features using modern web technologies. You will have a direct impact on the student and alumni experience.'
    },
    {
        title: 'Product Manager, Growth',
        department: 'Product',
        location: 'Remote',
        description: 'Lead the strategy and execution for user acquisition and engagement. You will work cross-functionally to drive platform growth.'
    },
    {
        title: 'Community Marketing Manager',
        department: 'Marketing',
        location: 'Remote',
        description: 'Engage with our university partners and user community to grow the AlmaSphere brand and foster a vibrant network.'
    },
];

const CareersPage: React.FC = () => {
    return (
         <div className="py-10 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 {/* Hero Section */}
                <section className="text-center py-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">Join Our Team</h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
                        We're on a mission to make mentorship accessible to all. Help us build the future of professional networking.
                    </p>
                </section>

                {/* Why Work With Us Section */}
                <section className="py-16">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Impactful Work</h3>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">Your code and ideas will directly help students and alumni connect and grow.</p>
                        </div>
                         <div className="text-center p-6">
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Flexible Culture</h3>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">We're a remote-first team that values work-life balance and asynchronous communication.</p>
                        </div>
                         <div className="text-center p-6">
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Growth Opportunity</h3>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">Join a passionate, early-stage team with ample opportunity for professional development.</p>
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section className="py-16">
                     <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Open Positions</h2>
                        </div>
                        <div className="space-y-6">
                            {jobOpenings.map((job, index) => (
                                <Card key={index} className="p-6">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                        <div>
                                            <p className="text-sm font-semibold text-primary">{job.department}</p>
                                            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{job.title}</h3>
                                            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                                                <BuildingOffice2Icon className="w-4 h-4 mr-1.5" />
                                                <span>{job.location}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex-shrink-0">
                                            <Button onClick={() => alert(`Applying for ${job.title}`)}>Apply Now</Button>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-neutral-600 dark:text-neutral-400">{job.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CareersPage;
