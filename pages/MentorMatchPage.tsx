import React, { useState, useEffect, useRef } from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { DUMMY_MENTORS, Mentor, Role, User, ChatMessage } from '../types';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { CheckBadgeIcon, BriefcaseIcon, AcademicCapIcon, SparklesIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '../components/Icons';
import { suggestMentorSearchQuery } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';

const ChatModal: React.FC<{ isOpen: boolean; onClose: () => void; peerUser: User | null; }> = ({ isOpen, onClose, peerUser }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatId = user && peerUser ? [user.id, peerUser.id].sort().join('--') : null;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const loadMessages = () => {
        if (!chatId) return;
        try {
            const storedMessages = localStorage.getItem(`almasphere_chat_${chatId}`);
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages, (key, value) => {
                    if (key === 'timestamp') return new Date(value);
                    return value;
                }));
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error("Failed to load chat messages:", error);
            setMessages([]);
        }
    };
    
    useEffect(() => {
        if (isOpen && chatId) {
            loadMessages();
        }
    }, [isOpen, chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !peerUser || !chatId) return;

        const message: ChatMessage = {
            id: new Date().toISOString(),
            from: user.id,
            to: peerUser.id,
            text: newMessage,
            timestamp: new Date(),
        };

        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
        setNewMessage('');
        localStorage.setItem(`almasphere_chat_${chatId}`, JSON.stringify(updatedMessages));
    };

    if (!isOpen || !peerUser) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl flex flex-col z-50 border dark:border-neutral-700 w-full max-w-lg h-[80vh] max-h-[700px]" onClick={e => e.stopPropagation()}>
                <header className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-t-xl flex justify-between items-center border-b dark:border-neutral-700 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <img src={peerUser.avatarUrl} alt={peerUser.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">{peerUser.name}</h3>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{peerUser.role}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 text-2xl leading-none">&times;</button>
                </header>
                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.from === user?.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.from === user?.id 
                                ? 'bg-primary text-white rounded-br-none' 
                                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <footer className="p-2 border-t dark:border-neutral-700 flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={`Message ${peerUser.name.split(' ')[0]}...`}
                            className="flex-grow w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            autoFocus
                        />
                        <button type="submit" className="bg-primary text-white p-2 rounded-md hover:bg-primary-hover disabled:bg-primary/50" disabled={!newMessage.trim()}>
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};


const MentorProfileCard: React.FC<{ mentor: Mentor; onMessageClick: (mentor: Mentor) => void; }> = ({ mentor, onMessageClick }) => {
    const navigate = ReactRouterDOM.useNavigate();

    return (
        <Card className="flex flex-col">
            <div className="p-6 cursor-pointer" onClick={() => navigate(`/schedule/${mentor.id}`)}>
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <img className="w-16 h-16 rounded-full" src={mentor.avatarUrl} alt={mentor.name} />
                        <div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
                                {mentor.name}
                                {mentor.isVerified && <span title="Verified Alumni"><CheckBadgeIcon className="w-5 h-5 text-blue-500 ml-2" /></span>}
                                {mentor.isInstitutionVerified && <span title="Partner Institution"><ShieldCheckIcon className="w-5 h-5 text-yellow-500 ml-1.5"/></span>}
                            </h3>
                            <p className="text-primary font-medium">{mentor.title}</p>
                        </div>
                    </div>
                    <img src={mentor.companyLogoUrl} alt={`${mentor.company} logo`} className="w-8 h-8 rounded-full bg-white"/>
                </div>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm">{mentor.bio}</p>
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-800/50 mt-auto text-xs text-neutral-500 dark:text-neutral-400 space-y-2">
                 <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <BriefcaseIcon className="w-4 h-4 mr-2" />
                            <span>Works at <span className="font-semibold text-neutral-700 dark:text-neutral-300">{mentor.company}</span></span>
                        </div>
                        <div className="flex items-center">
                            <AcademicCapIcon className="w-4 h-4 mr-2" />
                            <span>Graduated from <span className="font-semibold text-neutral-700 dark:text-neutral-300">{mentor.institution}</span></span>
                        </div>
                    </div>
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={(e) => { e.stopPropagation(); onMessageClick(mentor); }}
                        className="flex items-center gap-1.5"
                    >
                        <ChatBubbleLeftRightIcon className="w-4 h-4"/>
                        Message
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const MentorMatchPage: React.FC = () => {
    const [allMentors, setAllMentors] = useState<Mentor[]>([]);
    const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [domainFilter, setDomainFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
    const [chattingWith, setChattingWith] = useState<Mentor | null>(null);

    const fetchMentors = () => {
        try {
            const usersJson = localStorage.getItem('almasphere_users');
            if (usersJson) {
                const users: User[] = JSON.parse(usersJson);
                const alumni = users.filter(u => u.role === Role.ALUMNI) as Mentor[];
                setAllMentors(alumni);
            }
        } catch (error) {
            console.error("Failed to fetch mentors from localStorage", error);
            setAllMentors(DUMMY_MENTORS); // Fallback to dummy data on error
        }
    };

    useEffect(() => {
        fetchMentors();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'almasphere_users') {
                fetchMentors();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        let filtered = allMentors;
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(lowercasedTerm) ||
                (m.title && m.title.toLowerCase().includes(lowercasedTerm)) ||
                (m.skills && m.skills.some(s => s.toLowerCase().includes(lowercasedTerm)))
            );
        }
        if (domainFilter) {
            filtered = filtered.filter(m => m.domain === domainFilter);
        }
        if (companyFilter) {
            filtered = filtered.filter(m => m.company === companyFilter);
        }
        setFilteredMentors(filtered);
    }, [searchTerm, domainFilter, companyFilter, allMentors]);

    const domains = [...new Set(allMentors.map(m => m.domain).filter(Boolean))];
    const companies = [...new Set(allMentors.map(m => m.company).filter(Boolean))];
    
    const handleAiSuggestion = async () => {
        setIsLoadingSuggestion(true);
        const suggestion = await suggestMentorSearchQuery('Computer Science');
        setSearchTerm(suggestion);
        setIsLoadingSuggestion(false);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ChatModal isOpen={!!chattingWith} onClose={() => setChattingWith(null)} peerUser={chattingWith} />

            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Find Your Mentor</h1>
                <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-300">Connect with experienced alumni ready to guide you.</p>
            </div>

            <div className="sticky top-16 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-sm py-4 z-10 rounded-lg shadow-sm mb-8">
                 <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-end px-4">
                    <div className="md:col-span-3">
                         <Input
                            label="Search by name, title, or skill"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g., Jane Doe, Software Engineer, React..."
                         />
                    </div>
                    <div>
                         <label htmlFor="domain" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Domain</label>
                         <select id="domain" value={domainFilter} onChange={e => setDomainFilter(e.target.value)} className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                             <option value="">All Domains</option>
                             {domains.map(d => <option key={d} value={d}>{d}</option>)}
                         </select>
                    </div>
                    <div>
                         <label htmlFor="company" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Company</label>
                         <select id="company" value={companyFilter} onChange={e => setCompanyFilter(e.target.value)} className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                             <option value="">All Companies</option>
                             {companies.map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                    </div>
                     <div className="text-right">
                        <Button variant="ghost" size="md" onClick={handleAiSuggestion} disabled={isLoadingSuggestion} className="w-full">
                            <SparklesIcon className="w-4 h-4 mr-1"/>
                            {isLoadingSuggestion ? 'Working...' : 'AI Suggestion'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.map(mentor => (
                    <MentorProfileCard key={mentor.id} mentor={mentor} onMessageClick={setChattingWith} />
                ))}
            </div>
             {filteredMentors.length === 0 && (
                <div className="text-center py-20 col-span-full">
                    <p className="text-neutral-600 dark:text-neutral-400">No mentors found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default MentorMatchPage;