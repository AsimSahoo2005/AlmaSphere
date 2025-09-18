import React, { useState } from 'react';
import { ChatBubbleOvalLeftEllipsisIcon, SparklesIcon } from './Icons';
import Button from './ui/Button';
import { generateAIChatResponse } from '../services/aiService';

const AIChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'ai', text: 'Hello! How can I help you navigate AlmaSphere today?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = () => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'ai', text: generateAIChatResponse() }]);
            setIsTyping(false);
        }, 1000);
    };
    
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover transition-transform duration-200 hover:scale-110 z-50"
                aria-label="Open AI Chat"
            >
                <SparklesIcon className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 h-[400px] bg-white dark:bg-neutral-800 rounded-xl shadow-2xl flex flex-col z-50 border dark:border-neutral-700">
            <header className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-t-xl flex justify-between items-center border-b dark:border-neutral-700">
                <h3 className="font-bold flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-primary"/> AI Assistant</h3>
                <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">&times;</button>
            </header>
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className="flex">
                        <div className={`p-2 rounded-lg max-w-xs ${msg.from === 'ai' ? 'bg-primary-light dark:bg-primary/20 text-neutral-800 dark:text-neutral-200' : 'bg-neutral-200 ml-auto'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="text-sm text-neutral-500 italic">AI is typing...</div>}
            </div>
            <footer className="p-2 border-t dark:border-neutral-700">
                <Button onClick={handleSendMessage} className="w-full" disabled={isTyping}>
                    Ask a question
                </Button>
            </footer>
        </div>
    );
};

export default AIChatWidget;
