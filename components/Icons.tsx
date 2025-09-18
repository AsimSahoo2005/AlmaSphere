import React from 'react';

interface IconProps {
    className?: string;
}

export const BriefcaseIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const AcademicCapIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
    </svg>
);

export const CheckBadgeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12c0 1.357-.6 2.573-1.549 3.397a4.49 4.49 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm3.206 6.206a.75.75 0 00-1.06-1.06L10 9.94l-1.747-1.747a.75.75 0 00-1.06 1.06L8.94 11l-1.747 1.747a.75.75 0 101.06 1.06L10 12.06l1.747 1.747a.75.75 0 101.06-1.06L11.06 11l1.747-1.747z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M10.868 3.843A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12c0 1.357-.6 2.573-1.549 3.397a4.49 4.49 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M16.707 9.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 111.414-1.414L11 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.315 7.584C10.12 6.554 11.056 6 12 6c.944 0 1.88.554 2.685 1.584l.015.018a1.5 1.5 0 01-2.122 2.122L12 9.122l-.578.578a1.5 1.5 0 01-2.122-2.122zM11.685 3.106a.75.75 0 011.06-.002l1.732 1.731a.75.75 0 11-1.06 1.06l-1.732-1.731a.75.75 0 01-.002-1.06zm-4.242 4.242a.75.75 0 010 1.06l-1.732 1.732a.75.75 0 01-1.06-1.06l1.732-1.732a.75.75 0 011.06 0zm10.607 10.607a.75.75 0 01-1.06 0l-1.732-1.731a.75.75 0 111.06-1.06l1.732 1.731a.75.75 0 010 1.06zM12 18a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75zM3.106 11.685a.75.75 0 010 1.06l-1.732 1.732a.75.75 0 01-1.06-1.06l1.732-1.732a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a3.004 3.004 0 015.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const VideoCameraIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = "w-4 h-4 ml-2" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.061zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM6.106 17.894a.75.75 0 010-1.06l1.591-1.59a.75.75 0 111.06 1.06l-1.59 1.591a.75.75 0 01-1.06 0zM4.5 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM6.106 6.106a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06L6.106 7.167a.75.75 0 010-1.06z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.948.75.75 0 01.981.649A11.25 11.25 0 0112 21a11.25 11.25 0 01-11.25-11.25 11.25 11.25 0 01.948-4.463.75.75 0 01.819.162z" clipRule="evenodd" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
    </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

export const ChatBubbleOvalLeftEllipsisIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.434.203.907.356 1.417.472V21a.75.75 0 011.5 0v.201a6.721 6.721 0 003.583 1.029c.434-.203.907-.356 1.417-.472V21a.75.75 0 011.5 0v.201a6.721 6.721 0 003.583 1.029 6.707 6.707 0 001.196-.894.75.75 0 01.398 1.365 8.207 8.207 0 01-1.594 1.087 8.223 8.223 0 01-10.874 0 8.207 8.207 0 01-1.594-1.087.75.75 0 01.398-1.365zM12 2.25a.75.75 0 01.75.75v.201a6.721 6.721 0 00-3.583 1.029c-.434-.203-.907-.356-1.417-.472V3a.75.75 0 01-1.5 0v.201a6.721 6.721 0 00-3.583 1.029 6.707 6.707 0 00-1.196.894.75.75 0 11-.81 1.211A8.207 8.207 0 014.126 5.35 8.223 8.223 0 0115 2.25z" clipRule="evenodd" />
      <path d="M12 6.75a6.75 6.75 0 110 13.5 6.75 6.75 0 010-13.5zM15.75 12a.75.75 0 00-.75-.75H9a.75.75 0 000 1.5h6a.75.75 0 00.75-.75zm-5.25 2.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.434.203.907.356 1.417.472V21a.75.75 0 011.5 0v.201a6.721 6.721 0 003.583 1.029c.434-.203.907-.356 1.417-.472V21a.75.75 0 011.5 0v.201a6.721 6.721 0 003.583 1.029 6.707 6.707 0 001.196-.894.75.75 0 01.398 1.365 8.207 8.207 0 01-1.594 1.087 8.223 8.223 0 01-10.874 0 8.207 8.207 0 01-1.594-1.087.75.75 0 01.398-1.365zM12 2.25a.75.75 0 01.75.75v.201a6.721 6.721 0 00-3.583 1.029c-.434-.203-.907-.356-1.417-.472V3a.75.75 0 01-1.5 0v.201a6.721 6.721 0 00-3.583 1.029 6.707 6.707 0 00-1.196.894.75.75 0 11-.81 1.211A8.207 8.207 0 014.126 5.35 8.223 8.223 0 0115 2.25z" clipRule="evenodd" />
        <path d="M12.75 15a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H13.5a.75.75 0 01-.75-.75zM8.25 15a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM12 11.25a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0V11.25z" />
    </svg>
);


export const PaperAirplaneIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);