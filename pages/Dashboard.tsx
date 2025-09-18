
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Role, DUMMY_SESSIONS, DUMMY_MENTORS, Mentor } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { CheckBadgeIcon } from '../components/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Students: 40, Alumni: 24, Sessions: 24 },
  { name: 'Feb', Students: 30, Alumni: 13, Sessions: 22 },
  { name: 'Mar', Students: 20, Alumni: 98, Sessions: 22 },
  { name: 'Apr', Students: 27, Alumni: 39, Sessions: 20 },
  { name: 'May', Students: 18, Alumni: 48, Sessions: 21 },
  { name: 'Jun', Students: 23, Alumni: 38, Sessions: 25 },
];


const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const mySessions = DUMMY_SESSIONS.filter(s => s.studentId === user?.id);

    return (
        <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Your Booked Sessions</h2>
            <div className="space-y-4">
                {mySessions.length > 0 ? mySessions.map(session => (
                    <Card key={session.id} className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg">{session.mentorName}</p>
                            <p className="text-neutral-600 text-sm">{session.dateTime.toLocaleString()}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${session.status === 'booked' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {session.status}
                        </span>
                    </Card>
                )) : <p>You have no upcoming sessions. <a href="/#/mentor-match" className="text-primary font-semibold">Find a mentor</a> to get started!</p>}
            </div>
        </div>
    );
};

const AlumniDashboard: React.FC = () => {
    const mentor = DUMMY_MENTORS.find(m => m.id === useAuth().user?.id);
    const sessionRequests = DUMMY_SESSIONS.filter(s => s.mentorId === mentor?.id && s.status === 'pending');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Session Requests</h2>
                 <div className="space-y-4">
                    {sessionRequests.length > 0 ? sessionRequests.map(session => (
                        <Card key={session.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg">{session.studentName}</p>
                                <p className="text-neutral-600 text-sm">{session.dateTime.toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm">Accept</Button>
                                <Button size="sm" variant="ghost">Decline</Button>
                            </div>
                        </Card>
                    )) : <p>You have no new session requests.</p>}
                </div>
            </div>
            <div>
                 <Card className="p-6 text-center">
                    <p className="text-neutral-600">Session Credits</p>
                    <p className="text-5xl font-bold text-primary my-2">{mentor?.sessionCredits}</p>
                    <p className="text-sm text-neutral-500">Credits are used for premium features.</p>
                </Card>
            </div>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    const unverifiedAlumni = DUMMY_MENTORS.filter(m => !m.isVerified);
    return (
        <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                     <h3 className="text-xl font-semibold mb-4">Alumni Verification</h3>
                     <div className="space-y-3">
                        {unverifiedAlumni.map(alumni => (
                            <div key={alumni.id} className="flex justify-between items-center p-3 bg-neutral-100 rounded-lg">
                                <div>
                                    <p className="font-semibold">{alumni.name}</p>
                                    <p className="text-sm text-neutral-600">{alumni.university}</p>
                                </div>
                                <Button size="sm">Approve</Button>
                            </div>
                        ))}
                     </div>
                </Card>
                 <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Platform Analytics</h3>
                     <div className="w-full h-64">
                         <ResponsiveContainer>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Students" fill="#8884d8" />
                                <Bar dataKey="Alumni" fill="#82ca9d" />
                                <Bar dataKey="Sessions" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </Card>
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
                    <img src={user?.avatarUrl} alt={user?.name} className="w-20 h-20 rounded-full border-4 border-white"/>
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                        <p className="text-blue-200 flex items-center gap-2">
                          {user?.role} at {user?.university}
                          {user?.role === Role.ALUMNI && mentor?.isVerified && <span className="flex items-center text-sm font-semibold text-white bg-green-500 px-2 py-0.5 rounded-full"><CheckBadgeIcon className="w-4 h-4 mr-1"/> Verified</span>}
                        </p>
                    </div>
                </div>
            </Card>

            {renderDashboard()}
        </div>
    );
};

export default Dashboard;
