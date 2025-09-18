import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    // FIX: Add optional helptext prop to support helper text under inputs.
    helptext?: string;
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', icon, helptext, className = '', ...props }) => {
    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{label}</label>}
            <div className="relative">
                {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">{icon}</div>}
                <input
                    type={type}
                    id={id}
                    className={`block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md shadow-sm placeholder-neutral-400 dark:placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${icon ? 'pl-10' : ''} ${className}`}
                    {...props}
                />
            </div>
            {/* FIX: Render the help text if provided. */}
            {helptext && <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{helptext}</p>}
        </div>
    );
};

export default Input;