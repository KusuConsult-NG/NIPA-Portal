import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    icon?: string;
}

export function Button({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'font-bold transition-all rounded-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        primary: 'bg-[--color-primary] text-white hover:brightness-110 shadow-lg shadow-[--color-primary]/20',
        secondary: 'bg-[--color-secondary] text-white hover:brightness-110 shadow-lg shadow-[--color-secondary]/20',
        ghost: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'bg-transparent border-2 border-[--color-primary] text-[--color-primary] hover:bg-[--color-primary] hover:text-white'
    };

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm h-9',
        md: 'px-6 py-3 text-base h-11',
        lg: 'px-8 py-4 text-lg h-14'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}
            {children}
        </button>
    );
}
