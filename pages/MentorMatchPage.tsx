
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_MENTORS, Mentor } from '../types';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { CheckBadgeIcon, BriefcaseIcon, AcademicCapIcon, SparklesIcon } from '../components/Icons';
import { suggestMentorSearchQuery } from '../services/geminiService';

const MentorProfileCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
    const navigate = useNavigate();

    return (
        <Card className="flex flex-col" onClick={() => navigate(`/schedule/${mentor.id}`)}>
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <img className="w-16 h-16 rounded-full" src={mentor.avatarUrl} alt={mentor.name} />
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900 flex items-center">
                            {mentor.name}
                            {mentor.isVerified && <CheckBadgeIcon className="w-5 h-5 text-green-500 ml-2" />}
                        </h3>
                        <p className="text-primary font-medium">{mentor.title}</p>
                    </div>
                </div>
                <p className="mt-4 text-neutral-600 text-sm">{mentor.bio}</p>
            </div>
            <div className="border-t border-neutral-200 p-4 bg-neutral-50 mt-auto text-xs text-neutral-500 space-y-2">
                 <div className="flex items-center">
                    <BriefcaseIcon className="w-4 h-4 mr-2" />
                    <span>Works at <span className="font-semibold text-neutral-700">{mentor.company}</span></span>
                </div>
                 <div className="flex items-center">
                    <AcademicCapIcon className="w-4 h-4 mr-2" />
                    <span>Graduated from <span className="font-semibold text-neutral-700">{mentor.university}</span></span>
                </div>
            </div>
        </Card>
    );
};

const MentorMatchPage: React.FC = () => {
    const [mentors, setMentors] = useState<Mentor[]>(DUMMY_MENTORS);
    const [searchTerm, setSearchTerm] = useState('');
    const [domainFilter, setDomainFilter] = useState('');
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

    useEffect(() => {
        let filtered = DUMMY_MENTORS;
        if (searchTerm) {
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (domainFilter) {
            filtered = filtered.filter(m => m.domain === domainFilter);
        }
        setMentors(filtered);
    }, [searchTerm, domainFilter]);

    const domains = [...new Set(DUMMY_MENTORS.map(m => m.domain))];
    
    const handleAiSuggestion = async () => {
        setIsLoadingSuggestion(true);
        // Replace 'Computer Science' with the actual student's major from context if available
        const suggestion = await suggestMentorSearchQuery('Computer Science');
        setSearchTerm(suggestion);
        setIsLoadingSuggestion(false);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-neutral-900">Find Your Mentor</h1>
                <p className="mt-2 text-lg text-neutral-600">Connect with experienced alumni ready to guide you.</p>
            </div>

            <div className="sticky top-16 bg-neutral-50/90 backdrop-blur-sm py-4 z-10">
                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2">
                         <Input
                            label="Search by name, title, or company"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g., Jane Doe, Software Engineer, Google..."
                         />
                    </div>
                    <div>
                         <label htmlFor="domain" className="block text-sm font-medium text-neutral-700 mb-1">Filter by domain</label>
                         <select id="domain" value={domainFilter} onChange={e => setDomainFilter(e.target.value)} className="block w-full px-3 py-2 border border-neutral-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                             <option value="">All Domains</option>
                             {domains.map(d => <option key={d} value={d}>{d}</option>)}
                         </select>
                    </div>
                </div>
                 <div className="max-w-3xl mx-auto mt-2 text-right">
                    <Button variant="ghost" size="sm" onClick={handleAiSuggestion} disabled={isLoadingSuggestion}>
                        <SparklesIcon className="w-4 h-4 mr-1"/>
                        {isLoadingSuggestion ? 'Getting suggestion...' : 'AI Suggestion'}
                    </Button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.map(mentor => (
                    <MentorProfileCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
             {mentors.length === 0 && (
                <div className="text-center py-20 col-span-full">
                    <p className="text-neutral-600">No mentors found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default MentorMatchPage;
