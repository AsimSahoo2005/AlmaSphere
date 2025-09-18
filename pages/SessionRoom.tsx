import React, { useState, useEffect } from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SparklesIcon, VideoCameraIcon } from '../components/Icons';
import { generateConversationStarter } from '../services/aiService';

const SessionRoom: React.FC = () => {
    const { sessionId } = ReactRouterDOM.useParams<{ sessionId: string }>();
    const [starter, setStarter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchStarter = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setStarter(generateConversationStarter());
            setIsLoading(false);
        }, 500);
    };

    useEffect(() => {
        fetchStarter();
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Session Room</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">Session ID: {sessionId}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Video Call Placeholder */}
                <div className="lg:col-span-2">
                    <Card className="aspect-video w-full bg-neutral-900 flex flex-col items-center justify-center text-white">
                        <VideoCameraIcon className="w-24 h-24 text-neutral-700" />
                        <p className="mt-4 text-xl font-semibold">Video Call Interface</p>
                        <p className="text-neutral-400">This is a placeholder for the video call component.</p>
                    </Card>
                </div>

                {/* AI Tools */}
                <div>
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                            <SparklesIcon className="w-6 h-6 text-primary mr-2" />
                            AI Conversation Starter
                        </h2>
                        <div className="bg-primary-light dark:bg-primary/20 p-4 rounded-lg min-h-[100px] flex items-center justify-center">
                            {isLoading ? (
                                <p className="text-neutral-600 dark:text-neutral-300 italic">Generating...</p>
                            ) : (
                                <p className="text-center text-primary-dark dark:text-primary-light font-medium text-lg">"{starter}"</p>
                            )}
                        </div>
                        <Button className="w-full mt-4" onClick={fetchStarter} disabled={isLoading}>
                            Generate New Starter
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SessionRoom;
