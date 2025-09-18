import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Role, DUMMY_MENTORS } from '../types';
import * as ReactRouterDOM from 'react-router-dom';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdminSessionActive: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, this would be an API service. We're using localStorage for simulation.
const MOCK_DB_USERS_KEY = 'almasphere_users';
const MOCK_SESSION_KEY = 'almasphere_session';
const MOCK_ADMIN_SESSION_KEY = 'almasphere_admin_session';


const getMockUsers = (): User[] => {
    try {
        const users = localStorage.getItem(MOCK_DB_USERS_KEY);
        if (users) {
            return JSON.parse(users);
        }
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
    }
    // Seed with dummy mentor data and an admin if empty
    const adminUser: User = {
        id: 'admin@almasphere.edu',
        name: 'Admin User',
        email: 'admin@almasphere.edu',
        password: 'admin',
        role: Role.ADMIN,
        avatarUrl: `https://i.pravatar.cc/150?u=admin@almasphere.edu`,
        institution: 'AlmaSphere HQ',
        signupDate: new Date('2024-01-15'),
    };
    const initialUsers = [...DUMMY_MENTORS.map((m, i) => ({...m, password: 'password123', signupDate: new Date(new Date().setMonth(new Date().getMonth() - (i + 1)))})), adminUser];
    localStorage.setItem(MOCK_DB_USERS_KEY, JSON.stringify(initialUsers));
    return initialUsers;
};

const saveMockUsers = (users: User[]) => {
    localStorage.setItem(MOCK_DB_USERS_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdminSessionActive, setIsAdminSessionActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
        try {
            const sessionEmail = localStorage.getItem(MOCK_SESSION_KEY);
            if (sessionEmail) {
                const users = getMockUsers();
                const sessionUser = users.find(u => u.email === sessionEmail);
                if (sessionUser) {
                    setUser(sessionUser);
                }
            }
            const adminSession = localStorage.getItem(MOCK_ADMIN_SESSION_KEY);
            if (adminSession === 'active') {
                setIsAdminSessionActive(true);
            }
        } catch (e) {
            console.error("Session check failed", e);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            const users = getMockUsers();
            const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (foundUser && foundUser.password === password) {
                setUser(foundUser);
                localStorage.setItem(MOCK_SESSION_KEY, foundUser.email);
                if (foundUser.role === Role.ADMIN) {
                    localStorage.setItem(MOCK_ADMIN_SESSION_KEY, 'active');
                    setIsAdminSessionActive(true);
                }
                return true;
            }
            setError("Incorrect password. Please try again.");
            return false;
        } catch (e) {
            setError("An unexpected error occurred.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            const users = getMockUsers();
            if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
                setError("An account with this email already exists.");
                return false;
            }
            const newUser: User = {
                id: email,
                name,
                email,
                password, // NOTE: For simulation only. NEVER store plaintext passwords.
                role: Role.STUDENT, // Default role
                avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
                institution: '',
                signupDate: new Date(),
            };
            users.push(newUser);
            saveMockUsers(users);
            // Temp session to guide user to profile setup
            sessionStorage.setItem('pending_setup_email', email);
            return true;
        } catch (e) {
            setError("An unexpected error occurred during signup.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (userData: Partial<User>) => {
        if (!user) return;
        setLoading(true);
        try {
            const users = getMockUsers();
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                const updatedUser = { ...users[userIndex], ...userData };
                users[userIndex] = updatedUser;
                saveMockUsers(users);
                setUser(updatedUser);
            }
        } catch (e) {
             console.error("Failed to update profile", e);
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem(MOCK_SESSION_KEY);
        localStorage.removeItem(MOCK_ADMIN_SESSION_KEY);
        setIsAdminSessionActive(false);
        navigate('/');
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdminSessionActive, loading, error, login, signup, updateProfile, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};