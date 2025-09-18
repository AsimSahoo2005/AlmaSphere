import { Session } from "inspector";

export enum Role {
    STUDENT = 'Student',
    ALUMNI = 'Alumni',
    ADMIN = 'Admin',
}

export interface User {
    id: string; // email serves as ID in this simulation
    name: string;
    email: string;
    password?: string; // NOTE: For simulation only. NEVER store plaintext passwords.
    role: Role;
    avatarUrl: string;
    institution: string;
    domain?: string;
    skills?: string[];
    bio?: string;
    signupDate?: Date;
}

export interface Mentor extends User {
    role: Role.ALUMNI;
    title: string;
    company: string;
    companyLogoUrl: string;
    isVerified: boolean;
    isInstitutionVerified: boolean;
    sessionCredits: number;
    availability: string[];
}

// NOTE: Renamed from Session to MentorshipSession to avoid conflict with browser's Session type
export interface MentorshipSession {
    id: string;
    mentorId: string;
    studentId: string;
    mentorName: string;
    studentName: string;
    status: 'pending' | 'booked' | 'completed' | 'cancelled';
    dateTime: Date;
    duration: 15 | 30 | 60;
    skillTags: string[];
}

export interface Feedback {
    id: string;
    studentName: string;
    rating: number;
    comment: string;
}

export const DUMMY_MENTORS: Mentor[] = [
    {
        id: 'jane.doe@example.com',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: Role.ALUMNI,
        avatarUrl: 'https://picsum.photos/id/1027/200/200',
        institution: 'Stanford University',
        title: 'Senior Software Engineer',
        company: 'Google',
        companyLogoUrl: 'https://logo.clearbit.com/google.com',
        domain: 'Software Engineering',
        isVerified: true,
        isInstitutionVerified: true,
        bio: 'Passionate about building scalable systems and mentoring the next generation of engineers.',
        sessionCredits: 10,
        availability: ['Mon', 'Wed', 'Fri'],
        skills: ['React', 'System Design', 'Career Growth']
    },
    {
        id: 'john.smith@example.com',
        name: 'John Smith',
        email: 'john.smith@example.com',
        role: Role.ALUMNI,
        avatarUrl: 'https://picsum.photos/id/1005/200/200',
        institution: 'MIT',
        title: 'Product Manager',
        company: 'Microsoft',
        companyLogoUrl: 'https://logo.clearbit.com/microsoft.com',
        domain: 'Product Management',
        isVerified: true,
        isInstitutionVerified: true,
        bio: 'I help build products people love. Experienced in agile methodologies and user-centric design.',
        sessionCredits: 5,
        availability: ['Tue', 'Thu'],
        skills: ['Agile', 'Roadmapping', 'User Research']
    },
];

export const DUMMY_SESSIONS: MentorshipSession[] = [
    {
        id: 's1',
        mentorId: 'jane.doe@example.com',
        studentId: 'alice.j@university.edu',
        mentorName: 'Jane Doe',
        studentName: 'Alice Johnson',
        status: 'booked',
        dateTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        duration: 30,
        skillTags: ['Career Guidance', 'React'],
    },
    {
        id: 's2',
        mentorId: 'john.smith@example.com',
        studentId: 'alice.j@university.edu',
        mentorName: 'John Smith',
        studentName: 'Alice Johnson',
        status: 'completed',
        dateTime: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        duration: 60,
        skillTags: ['Product Management', 'Interview Prep'],
    },
];

export const DUMMY_ACTION_ITEMS: string[] = [
    "Connect with Jane Doe on LinkedIn.",
    "Finalize portfolio project for review.",
    "Read the recommended article on product roadmapping.",
];

export const DUMMY_FEEDBACKS: Feedback[] = [
    { id: 'f1', studentName: 'Alex Ray', rating: 5, comment: 'Incredibly insightful session! John provided a clear framework for approaching product case studies.' },
    { id: 'f2', studentName: 'Sarah Chen', rating: 5, comment: 'Jane was amazing at breaking down complex software architecture concepts. Highly recommend!' },
];