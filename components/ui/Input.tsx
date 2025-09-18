
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', icon, className = '', ...props }) => {
    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>}
            <div className="relative">
                {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
                <input
                    type={type}
                    id={id}
                    className={`block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${icon ? 'pl-10' : ''} ${className}`}
                    {...props}
                />
            </div>
        </div>
    );
};

export default Input;
