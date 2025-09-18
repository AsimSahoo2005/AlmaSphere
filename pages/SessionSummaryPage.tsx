import React, { useState, useEffect } from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import Card from '../components/ui/Card';
import { DocumentTextIcon } from '../components/Icons';
import { summarizeTranscript, generateActionItems } from '../services/aiService';

const SessionSummaryPage: React.FC = () => {
    const { sessionId } = ReactRouterDOM.useParams<{ sessionId: string }>();
    const [summary, setSummary] = useState('');
    const [actionItems, setActionItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setSummary(summarizeTranscript());
            setActionItems(generateActionItems());
            setIsLoading(false);
        }, 1000);
    }, [sessionId]);

    if (isLoading) {
        return <div className="text-center py-20">Generating your session summary...</div>;
    }

    return (
        <div className="bg-neutral-100 dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex justify-center items-center mx-auto w-16 h-16 rounded-full bg-primary-light dark:bg-primary/20 mb-4">
                            <DocumentTextIcon className="w-8 h-8 text-primary"/>
                        </div>
                        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Session Summary</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-1">Key takeaways from your session (ID: {sessionId})</p>
                    </div>

                    <Card className="p-8 mb-8">
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">AI-Generated Summary</h2>
                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{summary}</p>
                    </Card>
                    
                    <Card className="p-8">
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Your Action Items</h2>
                         <ul className="space-y-3">
                            {actionItems.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 h-6 flex items-center">
                                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-neutral-700 dark:text-neutral-300">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SessionSummaryPage;
