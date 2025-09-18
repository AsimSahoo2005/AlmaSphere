import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Role, DUMMY_SESSIONS, DUMMY_MENTORS, DUMMY_ACTION_ITEMS, DUMMY_FEEDBACKS, MentorshipSession, User } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { CheckBadgeIcon, ShieldCheckIcon, SparklesIcon, UsersIcon, AcademicCapIcon } from '../components/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const mySessions = DUMMY_SESSIONS.filter(s => s.studentId === user?.id && s.status === 'booked');
    const recommendedMentors = DUMMY_MENTORS.slice(0, 2); // Dummy recommendation

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                 {/* Recommended Mentors */}
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Recommended Mentors</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {recommendedMentors.map(mentor => (
                            <Card key={mentor.id} className="p-4 flex items-center space-x-4">
                                <img src={mentor.avatarUrl} alt={mentor.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-bold">{mentor.name}</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{mentor.title}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Booked Sessions */}
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Your Booked Sessions</h2>
                    <div className="space-y-4">
                        {mySessions.length > 0 ? mySessions.map(session => {
                            const mentor = DUMMY_MENTORS.find(m => m.id === session.mentorId);
                            return (
                                <Card key={session.id} className="p-4 flex justify-between items-center">
                                    <div className="flex items-center space-x-4">
                                        {mentor && <img src={mentor.avatarUrl} alt={mentor.name} className="w-10 h-10 rounded-full" />}
                                        <div>
                                            <p className="font-semibold text-lg">{session.mentorName}</p>
                                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">{session.dateTime.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200`}>
                                        {session.status}
                                    </span>
                                </Card>
                            );
                        }) : <p className="text-neutral-600 dark:text-neutral-400">You have no upcoming sessions. <ReactRouterDOM.Link to="/mentor-match" className="text-primary font-semibold">Find a mentor</ReactRouterDOM.Link> to get started!</p>}
                    </div>
                </div>
            </div>
            {/* Pending Action Items */}
            <div className="lg:col-span-1">
                 <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-primary"/> Pending Action Items</h3>
                    <ul className="space-y-3">
                        {DUMMY_ACTION_ITEMS.map((item, index) => (
                             <li key={index} className="flex items-start p-3 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg">
                                <svg className="h-5 w-5 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="ml-3 text-neutral-700 dark:text-neutral-300 text-sm">{item}</p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const AlumniDashboard: React.FC = () => {
    const { user } = useAuth();
    const mentor = DUMMY_MENTORS.find(m => m.id === user?.id);
    const sessionRequests = DUMMY_SESSIONS.filter(s => s.mentorId === mentor?.id && s.status === 'pending');
    const upcomingSessions = DUMMY_SESSIONS.filter(s => s.mentorId === mentor?.id && s.status === 'booked');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                 <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Mentorship Hub</h2>
                {/* Upcoming Sessions */}
                 <Card className="p-6">
                     <h3 className="text-xl font-semibold mb-4">Upcoming Sessions</h3>
                     <div className="space-y-4">
                        {upcomingSessions.length > 0 ? upcomingSessions.map(session => (
                            <div key={session.id} className="flex justify-between items-center p-3 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg">
                                <div>
                                    <p className="font-semibold">{session.studentName}</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{session.dateTime.toLocaleString()}</p>
                                </div>
                                <Button size="sm" variant="ghost">View Details</Button>
                            </div>
                        )) : <p className="text-neutral-600 dark:text-neutral-400">No upcoming sessions.</p>}
                     </div>
                </Card>
                {/* Session Requests */}
                 <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Session Requests</h3>
                     <div className="space-y-4">
                        {sessionRequests.length > 0 ? sessionRequests.map(session => (
                             <div key={session.id} className="flex justify-between items-center p-3 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg">
                                <div>
                                    <p className="font-semibold">{session.studentName}</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{session.dateTime.toLocaleString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm">Accept</Button>
                                    <Button size="sm" variant="ghost">Decline</Button>
                                </div>
                            </div>
                        )) : <p className="text-neutral-600 dark:text-neutral-400">You have no new session requests.</p>}
                    </div>
                </Card>
                 {/* Feedback Highlights */}
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Feedback Highlights</h3>
                    <div className="space-y-4">
                        {DUMMY_FEEDBACKS.map(fb => (
                            <blockquote key={fb.id} className="p-4 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg border-l-4 border-secondary dark:border-yellow-400">
                                <p className="italic text-neutral-700 dark:text-neutral-300">"{fb.comment}"</p>
                                <cite className="block text-right mt-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">- {fb.studentName}</cite>
                            </blockquote>
                        ))}
                    </div>
                </Card>
            </div>
            <div className="space-y-8">
                 <Card className="p-6 text-center">
                    <p className="text-neutral-600 dark:text-neutral-400">Session Credits</p>
                    <p className="text-5xl font-bold text-primary my-2">{mentor?.sessionCredits}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Credits are used for premium features.</p>
                </Card>
                 <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Verification Center</h3>
                    <div className="space-y-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Verify your alumni status with your university email for added trust.</p>
                        <Input label="College Email" placeholder="you@alumni.university.edu" />
                        <Button className="w-full">Send Verification Link</Button>
                    </div>
                 </Card>
            </div>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({ totalStudents: 0, totalAlumni: 0 });
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);

    useEffect(() => {
        try {
            const usersJson = localStorage.getItem('almasphere_users');
            const users: User[] = usersJson ? JSON.parse(usersJson, (key, value) => {
                // Reviver to convert date strings back to Date objects
                if (key === 'signupDate' && typeof value === 'string') {
                    return new Date(value);
                }
                return value;
            }) : [];

            const totalStudents = users.filter(u => u.role === Role.STUDENT).length;
            const totalAlumni = users.filter(u => u.role === Role.ALUMNI).length;
            setStats({ totalStudents, totalAlumni });

            // Process data for bar chart (last 6 months)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthlyData: { [key: string]: { name: string, Students: number, Alumni: number, Sessions: number } } = {};
            const today = new Date();

            for (let i = 5; i >= 0; i--) {
                const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
                monthlyData[monthKey] = { name: monthNames[d.getMonth()], Students: 0, Alumni: 0, Sessions: 0 };
            }

            users.forEach(user => {
                if (user.signupDate) {
                    const signupDate = new Date(user.signupDate);
                    const monthKey = `${signupDate.getFullYear()}-${signupDate.getMonth()}`;
                    if (monthlyData[monthKey]) {
                        if (user.role === Role.STUDENT) monthlyData[monthKey].Students++;
                        if (user.role === Role.ALUMNI) monthlyData[monthKey].Alumni++;
                    }
                }
            });

            DUMMY_SESSIONS.forEach(session => {
                const sessionDate = new Date(session.dateTime);
                const monthKey = `${sessionDate.getFullYear()}-${sessionDate.getMonth()}`;
                if (monthlyData[monthKey]) {
                    monthlyData[monthKey].Sessions++;
                }
            });

            setAnalyticsData(Object.values(monthlyData));

        } catch (error) {
            console.error("Failed to process admin data", error);
        }
    }, []);

    const pieData = [
        { name: 'Students', value: stats.totalStudents },
        { name: 'Alumni', value: stats.totalAlumni },
    ];
    const COLORS = ['#0052CC', '#FFAB00'];
    
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Admin Dashboard</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-primary-light rounded-full">
                        <AcademicCapIcon className="w-8 h-8 text-primary"/>
                    </div>
                    <div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Students</p>
                        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{stats.totalStudents}</p>
                    </div>
                </Card>
                 <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                        <UsersIcon className="w-8 h-8 text-yellow-500"/>
                    </div>
                    <div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Alumni</p>
                        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{stats.totalAlumni}</p>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">User Distribution</h3>
                        <div className="w-full h-64">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-3">
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Platform Growth & Engagement</h3>
                         <div className="w-full h-64">
                             <ResponsiveContainer>
                                <BarChart data={analyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
                                    <XAxis dataKey="name" tick={{ fill: '#97A0AF', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#97A0AF', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#253858', border: 'none', borderRadius: '8px' }} />
                                    <Legend />
                                    <Bar dataKey="Students" fill="#0052CC" />
                                    <Bar dataKey="Alumni" fill="#FFAB00" />
                                    <Bar dataKey="Sessions" fill="#36B37E" />
                                </BarChart>
                            </ResponsiveContainer>
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const { user } = useAuth();

    const renderDashboard = () => {
        switch (user?.role) {
            case Role.STUDENT:
                return <StudentDashboard />;
            case Role.ALUMNI:
                return <AlumniDashboard />;
            case Role.ADMIN:
                return <AdminDashboard />;
            default:
                return <p>Loading dashboard...</p>;
        }
    };
    
    const mentor = DUMMY_MENTORS.find(m => m.id === user?.id);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Card className="p-6 mb-8 bg-gradient-to-r from-primary to-blue-700 text-white">
                <div className="flex items-center space-x-4">
                    <img src={user?.avatarUrl} alt={user?.name || 'User avatar'} className="w-20 h-20 rounded-full border-4 border-white"/>
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                        <div className="text-blue-200 flex items-center gap-4 mt-1">
                          <span>{user?.role} from {user?.institution}</span>
                          {user?.role === Role.ALUMNI && mentor?.isVerified && <span title="Verified Alumni" className="flex items-center text-sm font-semibold text-white bg-green-500 px-2 py-0.5 rounded-full"><CheckBadgeIcon className="w-4 h-4 mr-1"/> Verified</span>}
                          {user?.role === Role.ALUMNI && mentor?.isInstitutionVerified && <span title="Partner Institution" className="flex items-center text-sm font-semibold text-white bg-yellow-500 px-2 py-0.5 rounded-full"><ShieldCheckIcon className="w-4 h-4 mr-1"/> Partner</span>}
                        </div>
                    </div>
                </div>
            </Card>

            {renderDashboard()}
        </div>
    );
};

export default Dashboard;