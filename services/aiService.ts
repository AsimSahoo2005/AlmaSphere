
const conversationStarters = [
    "What's one skill you're hoping to develop in the next year?",
    "Can you share a story about a challenge you overcame in your career?",
    "What's the most valuable piece of advice you've ever received?",
    "If you could go back to your college days, what would you do differently?",
    "What is a common misconception about your field of work?",
];

export const generateConversationStarter = (): string => {
    const randomIndex = Math.floor(Math.random() * conversationStarters.length);
    return conversationStarters[randomIndex];
};

export const summarizeTranscript = (): string => {
    return "This was a highly productive session focusing on career trajectory in software engineering. Key topics included the importance of specializing in a niche technology, strategies for effective networking within a large organization, and preparing for senior-level interviews. The mentor emphasized building a strong portfolio of personal projects.";
};

export const generateActionItems = (): string[] => {
    return [
        "Update LinkedIn profile to highlight recent project experience.",
        "Research and identify 3 niche technologies for potential specialization.",
        "Schedule informational interviews with 2 senior engineers in the current company.",
        "Complete one LeetCode medium problem per day for the next two weeks.",
    ];
};
