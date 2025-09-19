import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { ChevronDownIcon, QuestionMarkCircleIcon } from '../components/Icons';

const faqData = {
    'For Students': [
        { q: 'How do I find a mentor?', a: 'Navigate to the "Mentor Match" page. You can use the search and filter options to find alumni based on their industry, company, skills, or name.' },
        { q: 'How do I book a session?', a: 'Once you find a mentor you\'d like to connect with, click on their profile and select the "Schedule Session" button to view their availability and book a time that works for you.' },
        { q: 'What should I talk about during a session?', a: 'You can discuss career advice, resume reviews, interview preparation, industry trends, or any professional topic you need guidance on. Use our AI Conversation Starter in the session room for ideas!' },
    ],
    'For Alumni': [
        { q: 'How do I set my availability?', a: 'In your profile settings, you can find an "Availability" section where you can set the days and times you are generally available for mentorship sessions.' },
        { q: 'How do I become a verified alumnus?', a: 'You can verify your status by using your official alumni email address provided by your institution. A verification link will be sent to that email.' },
        { q: 'What is expected of me as a mentor?', a: 'Mentors are expected to provide constructive advice, share their experiences, and maintain a professional and encouraging demeanor during sessions.' },
    ],
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-neutral-200 dark:border-neutral-700">
            <button
                className="w-full flex justify-between items-center text-left py-4 px-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 px-2 text-neutral-600 dark:text-neutral-400">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};


const HelpCenterPage: React.FC = () => {
    return (
        <div className="py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 {/* Header */}
                <section className="text-center py-16 bg-primary-light dark:bg-primary/10 rounded-lg">
                    <QuestionMarkCircleIcon className="w-16 h-16 text-primary mx-auto mb-4"/>
                    <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">How can we help?</h1>
                    <div className="mt-6 max-w-xl mx-auto">
                        <Input 
                            id="help-search" 
                            placeholder="Search for answers..."
                            className="text-center"
                        />
                    </div>
                </section>
                
                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto -mt-10">
                    <Card className="p-8">
                        {Object.entries(faqData).map(([category, items]) => (
                            <div key={category} className="mb-10 last:mb-0">
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">{category}</h2>
                                <div className="space-y-2">
                                    {items.map((item, index) => (
                                        <FaqItem key={index} question={item.q} answer={item.a} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Card>
                </section>
            </div>
        </div>
    );
};

export default HelpCenterPage;
