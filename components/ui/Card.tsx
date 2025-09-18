
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
    const baseStyles = "bg-white rounded-lg shadow-md overflow-hidden";
    const clickableStyles = onClick ? " transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "";

    return (
        <div className={`${baseStyles} ${clickableStyles} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
