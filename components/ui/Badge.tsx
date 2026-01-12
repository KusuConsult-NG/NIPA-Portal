import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
}

export function Badge({
    children,
    variant = 'primary',
    size = 'md',
    dot = false
}: BadgeProps) {
    const variantStyles = {
        success: 'bg-[--color-primary]/10 text-[--color-primary] border-[--color-primary]/20',
        warning: 'bg-amber-50 text-amber-600 border-amber-100',
        danger: 'bg-red-50 text-red-600 border-red-100',
        info: 'bg-blue-50 text-blue-600 border-blue-100',
        primary: 'bg-[--color-primary]/10 text-[--color-primary] border-[--color-primary]/20',
        secondary: 'bg-[--color-secondary]/10 text-[--color-secondary] border-[--color-secondary]/20'
    };

    const sizeStyles = {
        sm: 'px-2 py-0.5 text-[9px]',
        md: 'px-3 py-1 text-[10px]',
        lg: 'px-4 py-1.5 text-xs'
    };

    const dotColor = {
        success: 'bg-[--color-primary]',
        warning: 'bg-amber-500',
        danger: 'bg-red-500',
        info: 'bg-blue-500',
        primary: 'bg-[--color-primary]',
        secondary: 'bg-[--color-secondary]'
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-black uppercase tracking-wider border ${variantStyles[variant]} ${sizeStyles[size]}`}>
            {dot && <span className={`size-1.5 rounded-full ${dotColor[variant]}`}></span>}
            {children}
        </span>
    );
}
