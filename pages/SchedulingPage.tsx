import React, { useState } from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { Mentor } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const SchedulingPage: React.FC = () => {
    const { mentorId } = ReactRouterDOM.useParams<{ mentorId: string }>();
    const navigate = ReactRouterDOM.useNavigate();
    
    // FIX: Fetch all users from localStorage to find the correct mentor,
    // including newly created ones, instead of relying on the static DUMMY_MENTORS array.
    const usersJSON = localStorage.getItem('almasphere_users');
    const allUsers: Mentor[] = usersJSON ? JSON.parse(usersJSON) : [];
    const mentor = allUsers.find(u => u.id === mentorId);

    const [duration, setDuration] = useState<15 | 30 | 60>(30);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>('10:00 AM');

    if (!mentor) {
        return <div className="text-center py-20">Mentor not found.</div>;
    }

    const handleBooking = () => {
        // Here you would typically call an API to finalize the booking.
        alert(`Session with ${mentor.name} for ${duration} minutes on ${selectedDate?.toDateString()} at ${selectedTime} has been requested!`);
        navigate('/dashboard');
    };
    
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
    
    const today = new Date();
    const dates = Array.from({length: 7}, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return d;
    });

    return (
        <div className="py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <img src={mentor.avatarUrl} alt={mentor.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-neutral-700 shadow-lg"/>
                        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Schedule a session with {mentor.name}</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300">{mentor.title} at {mentor.company}</p>
                    </div>

                    <Card className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Step 1: Duration */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4">1. Select Duration</h3>
                                <div className="space-y-2">
                                    {[15, 30, 60].map(d => (
                                        <button key={d} onClick={() => setDuration(d as 15 | 30 | 60)} className={`w-full text-left p-3 rounded-md border-2 ${duration === d ? 'border-primary bg-primary-light dark:bg-primary/20 dark:text-white' : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}>
                                            {d} minutes
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Step 2: Date & Time */}
                            <div className="md:col-span-2">
                                <h3 className="font-semibold text-lg mb-4">2. Pick a Date & Time</h3>
                                <div className="mb-4">
                                     <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                                        {dates.map(date => (
                                            <button key={date.toString()} onClick={() => setSelectedDate(date)} className={`p-2 rounded-md ${selectedDate?.toDateString() === date.toDateString() ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}>
                                                <div className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                                <div className="font-bold">{date.getDate()}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {timeSlots.map(time => (
                                        <button key={time} onClick={() => setSelectedTime(time)} className={`p-3 rounded-md border-2 ${selectedTime === time ? 'border-primary bg-primary-light dark:bg-primary/20 dark:text-white' : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}>
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Confirmation */}
                        <div className="mt-8 pt-6 border-t dark:border-neutral-700">
                            <h3 className="font-semibold text-lg mb-2">Your Selection</h3>
                            <p className="text-neutral-700 dark:text-neutral-300">You are booking a <span className="font-bold text-primary">{duration}-minute</span> session with <span className="font-bold">{mentor.name}</span> on <span className="font-bold">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span> at <span className="font-bold">{selectedTime}</span>.</p>
                            <div className="mt-6 text-right">
                                <Button size="lg" onClick={handleBooking}>Confirm Booking</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SchedulingPage;