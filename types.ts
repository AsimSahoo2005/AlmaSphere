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
    companyLogoUrl: string;
    domain: string;
    isVerified: boolean;
    isInstitutionVerified: boolean;
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
        id: '1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: Role.ALUMNI,
        avatarUrl: 'https://picsum.photos/id/1027/200/200',
        university: 'Stanford University',
        title: 'Senior Software Engineer',
        company: 'Google',
        companyLogoUrl: 'https://logo.clearbit.com/google.com',
        domain: 'Software Engineering',
        isVerified: true,
        isInstitutionVerified: true,
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
        companyLogoUrl: 'https://logo.clearbit.com/microsoft.com',
        domain: 'Product Management',
        isVerified: true,
        isInstitutionVerified: true,
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
        companyLogoUrl: 'https://logo.clearbit.com/meta.com',
        domain: 'Data Science',
        isVerified: true,
        isInstitutionVerified: false,
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
        companyLogoUrl: 'https://logo.clearbit.com/apple.com',
        domain: 'UX/UI Design',
        isVerified: false,
        isInstitutionVerified: true,
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
        skillTags: ['Career Guidance', 'React'],
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
        skillTags: ['Product Management', 'Interview Prep'],
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
        skillTags: ['Resume Review'],
    },
     {
        id: 's4',
        mentorId: '3',
        studentId: '101',
        mentorName: 'Emily White',
        studentName: 'Alice Johnson',
        status: 'completed',
        dateTime: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        duration: 30,
        skillTags: ['Data Science', 'Machine Learning'],
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
