import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import MentorMatchPage from './pages/MentorMatchPage';
import SchedulingPage from './pages/SchedulingPage';
import SessionRoom from './pages/SessionRoom';
import SessionSummaryPage from './pages/SessionSummaryPage';
import ProfilePage from './pages/ProfilePage';
import AIChatWidget from './components/AIChatWidget';
import MobileBottomNav from './components/MobileBottomNav';

const AppContent: React.FC = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login';

    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen flex flex-col font-sans text-neutral-800 dark:text-neutral-200">
            {!isAuthPage && <Navbar />}
            <main className="flex-grow pb-16 md:pb-0">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/mentor-match" element={<MentorMatchPage />} />
                    <Route path="/schedule/:mentorId" element={<SchedulingPage />} />
                    <Route path="/session/:sessionId" element={<SessionRoom />} />
                    <Route path="/summary/:sessionId" element={<SessionSummaryPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
            {!isAuthPage && <AIChatWidget />}
            {!isAuthPage && <MobileBottomNav />}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <HashRouter>
                    <AppContent />
                </HashRouter>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;