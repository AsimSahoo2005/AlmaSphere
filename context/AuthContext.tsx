
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (role: Role) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USERS: Record<Role, User> = {
    [Role.STUDENT]: {
        id: '101',
        name: 'Alice Johnson',
        email: 'alice.j@university.edu',
        role: Role.STUDENT,
        avatarUrl: 'https://picsum.photos/id/237/200/200',
        university: 'State University',
    },
    [Role.ALUMNI]: {
        id: '1',
        name: 'Jane Doe',
        email: 'jane.d@workplace.com',
        role: Role.ALUMNI,
        avatarUrl: 'https://picsum.photos/id/1027/200/200',
        university: 'Stanford University',
    },
    [Role.ADMIN]: {
        id: '999',
        name: 'Admin User',
        email: 'admin@almasphere.com',
        role: Role.ADMIN,
        avatarUrl: 'https://picsum.photos/id/10/200/200',
        university: 'AlmaSphere HQ',
    },
};


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (role: Role) => {
        // In a real app, this would involve API calls
        setUser(DUMMY_USERS[role]);
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
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
