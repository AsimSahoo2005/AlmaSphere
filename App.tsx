import React from 'react';
// FIX: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import ProfileSetupPage from './pages/ProfileSetupPage';
import AIChatWidget from './components/AIChatWidget';
import MobileBottomNav from './components/MobileBottomNav';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = ReactRouterDOM.useLocation();

    if (!isAuthenticated) {
        return <ReactRouterDOM.Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const AlumniVisibilityRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isAdminSessionActive } = useAuth();
    const location = ReactRouterDOM.useLocation();

    if (!isAuthenticated && !isAdminSessionActive) {
        return <ReactRouterDOM.Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const AppContent: React.FC = () => {
    const location = ReactRouterDOM.useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/profile-setup';

    return (
        <div className="bg-neutral-50/50 dark:bg-neutral-900/50 relative min-h-screen flex flex-col font-sans text-neutral-800 dark:text-neutral-200">
            <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 -left-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob-1"></div>
                <div className="absolute -top-1/4 right-0 w-96 h-96 bg-sky-200 dark:bg-sky-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob-2 [animation-delay:-8s]"></div>
                <div className="absolute -bottom-1/4 left-1/4 w-96 h-96 bg-pink-200 dark:bg-pink-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob-1 [animation-delay:-14s]"></div>
             </div>

            {!isAuthPage && <Navbar />}
            <main className="flex-grow pb-16 md:pb-0">
                <ReactRouterDOM.Routes>
                    <ReactRouterDOM.Route path="/" element={<LandingPage />} />
                    <ReactRouterDOM.Route path="/login" element={<AuthPage />} />
                    <ReactRouterDOM.Route path="/profile-setup" element={<ProfileSetupPage />} />
                    
                    <ReactRouterDOM.Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <ReactRouterDOM.Route path="/mentor-match" element={<AlumniVisibilityRoute><MentorMatchPage /></AlumniVisibilityRoute>} />
                    <ReactRouterDOM.Route path="/schedule/:mentorId" element={<ProtectedRoute><SchedulingPage /></ProtectedRoute>} />
                    <ReactRouterDOM.Route path="/session/:sessionId" element={<ProtectedRoute><SessionRoom /></ProtectedRoute>} />
                    <ReactRouterDOM.Route path="/summary/:sessionId" element={<ProtectedRoute><SessionSummaryPage /></ProtectedRoute>} />
                    <ReactRouterDOM.Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                </ReactRouterDOM.Routes>
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
            <ReactRouterDOM.HashRouter>
              <AuthProvider>
                  <AppContent />
              </AuthProvider>
            </ReactRouterDOM.HashRouter>
        </ThemeProvider>
    );
};

export default App;