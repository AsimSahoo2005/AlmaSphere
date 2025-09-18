
export enum Role {
    STUDENT = 'Student',
    ALUMNI = 'Alumni',
    ADMIN = 'Admin',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatarUrl: string;
    university: string;
}

export interface Mentor extends User {
    role: Role.ALUMNI;
    title: string;
    company: string;
    domain: string;
    isVerified: boolean;
    bio: string;
    sessionCredits: number;
    availability: string[];
}

export interface Session {
    id: string;
    mentorId: string;
    studentId: string;
    mentorName: string;
    studentName: string;
    status: 'pending' | 'booked' | 'completed' | 'cancelled';
    dateTime: Date;
    duration: 15 | 30 | 60;
}

export const DUMMY_MENTORS: Mentor[] = [
    {
        id: '1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: Role.ALUMNI,
        avatarUrl: 'https://picsum.photos/id/1027/200/200',
        university: 'Stanford University',
        title: 'Senior Software Engineer',
        company: 'Google',
        domain: 'Software Engineering',
        isVerified: true,
        bio: 'Passionate about building scalable systems and mentoring the next generation of engineers.',
        sessionCredits: 10,
        availability: ['Mon', 'Wed', 'Fri'],
    },
    {
        id: '2',
        name: 'John Smith',
        email: 'john.smith@example.com',
        role: Role.ALUMNI,
        avatarUrl: 'https://picsum.photos/id/1005/200/200',
        university: 'MIT',
        title: 'Product Manager',
        company: 'Microsoft',
        domain: 'Product Management',
        isVerified: true,
        bio: 'I help build products people love. Experienced in agile methodologies and user-centric design.',
        sessionCredits: 5,
        availability: ['Tue', 'Thu'],
    },
    {
        id: '3',
        name: 'Emily White',
        email: 'emily.white@example.com',
        role: Role.ALUMNI,
        avatarUrl: 'https://picsum.photos/id/1011/200/200',
        university: 'Harvard University',
        title: 'Data Scientist',
        company: 'Meta',
        domain: 'Data Science',
        isVerified: true,
        bio: 'Turning data into actionable insights. Expertise in machine learning and statistical analysis.',
        sessionCredits: 8,
        availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    {
        id: '4',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        role: Role.ALUMNI,
        avatarUrl: 'https://picsum.photos/id/1012/200/200',
        university: 'UC Berkeley',
        title: 'UX Designer',
        company: 'Apple',
        domain: 'UX/UI Design',
        isVerified: false,
        bio: 'Crafting intuitive and beautiful user experiences. Let\'s talk about design thinking!',
        sessionCredits: 3,
        availability: ['Wed', 'Fri'],
    },
];

export const DUMMY_SESSIONS: Session[] = [
    {
        id: 's1',
        mentorId: '1',
        studentId: '101',
        mentorName: 'Jane Doe',
        studentName: 'Alice Johnson',
        status: 'booked',
        dateTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        duration: 30,
    },
    {
        id: 's2',
        mentorId: '2',
        studentId: '101',
        mentorName: 'John Smith',
        studentName: 'Alice Johnson',
        status: 'completed',
        dateTime: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        duration: 60,
    },
    {
        id: 's3',
        mentorId: '1',
        studentId: '102',
        mentorName: 'Jane Doe',
        studentName: 'Bob Williams',
        status: 'pending',
        dateTime: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        duration: 15,
    },
];
