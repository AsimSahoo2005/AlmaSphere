import React from 'react';
import Card from '../components/ui/Card';

const GuidelineSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">{title}</h2>
        <div className="space-y-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const CommunityGuidelinesPage: React.FC = () => {
    return (
        <div className="py-10 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">Community Guidelines</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300">
                           Fostering a safe, respectful, and productive environment for all members.
                        </p>
                    </div>

                    <Card className="p-8 md:p-12">
                        <GuidelineSection title="1. Be Respectful and Constructive">
                            <p>AlmaSphere is a professional community. Treat all members with respect. We encourage constructive conversations and debates, but personal attacks, harassment, hate speech, or any form of bullying will not be tolerated.</p>
                        </GuidelineSection>

                        <GuidelineSection title="2. Communicate with Purpose">
                            <p>Whether you're a student seeking advice or an alumnus offering it, be clear and concise in your communication. Prepare for your sessions, respect each other's time, and be professional in all interactions.</p>
                        </GuidelineSection>

                        <GuidelineSection title="3. Maintain Authenticity and Professionalism">
                            <p>Represent yourself, your skills, and your experiences accurately. Do not misrepresent your identity or qualifications. As this is a professional networking platform, maintain a professional demeanor in your profile and communications.</p>
                        </GuidelineSection>
                        
                        <GuidelineSection title="4. Protect Privacy">
                             <p>Do not share personal contact information (email, phone number, physical address) or other private data in public profiles. Respect the privacy of others. What is shared in a 1-on-1 session should be considered confidential unless otherwise agreed upon.</p>
                        </GuidelineSection>

                        <GuidelineSection title="5. No Solicitation or Spam">
                            <p>Do not use AlmaSphere to sell products or services, promote external businesses, or engage in any form of spam. The platform is for mentorship and professional networking only.</p>
                        </GuidelineSection>
                        
                        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Reporting Violations</h3>
                            <p className="text-neutral-600 dark:text-neutral-300">If you encounter behavior that violates these guidelines, please report it to our support team through the <a href="/contact" className="text-primary font-medium hover:underline">Contact Page</a>. We are committed to enforcing these rules to keep our community safe and valuable for everyone.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CommunityGuidelinesPage;
