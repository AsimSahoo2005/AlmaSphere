import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
    const baseStyles = "bg-white dark:bg-neutral-800 rounded-lg shadow-md dark:shadow-none overflow-hidden border border-transparent dark:border-neutral-700";
    const clickableStyles = onClick ? " transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer dark:hover:border-primary" : "";

    return (
        <div className={`${baseStyles} ${clickableStyles} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
