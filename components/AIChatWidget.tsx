import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, PaperAirplaneIcon } from './Icons';
import { generateAIChatResponse } from '../services/aiService';

const AIChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'ai', text: 'Hello! How can I help you navigate AlmaSphere today?' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    // Auto-scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const newUserMessage = { from: 'user', text: userInput.trim() };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsTyping(true);
        
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateAIChatResponse();
            setMessages(prev => [...prev, { from: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1500);
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
        <div className="fixed bottom-6 right-6 w-80 h-[450px] bg-white dark:bg-neutral-800 rounded-xl shadow-2xl flex flex-col z-50 border dark:border-neutral-700">
            <header className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-t-xl flex justify-between items-center border-b dark:border-neutral-700 flex-shrink-0">
                <h3 className="font-bold flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-primary"/> AI Assistant</h3>
                <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 text-2xl leading-none">&times;</button>
            </header>
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.from === 'ai' 
                            ? 'bg-primary-light dark:bg-primary/20 text-neutral-800 dark:text-neutral-200 rounded-bl-none' 
                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 rounded-br-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                         <div className="p-3 rounded-lg bg-primary-light dark:bg-primary/20 rounded-bl-none">
                            <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <footer className="p-2 border-t dark:border-neutral-700 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-grow w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        disabled={isTyping}
                        autoFocus
                    />
                    <button type="submit" className="bg-primary text-white p-2 rounded-md hover:bg-primary-hover disabled:bg-primary/50" disabled={isTyping || !userInput.trim()}>
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default AIChatWidget;