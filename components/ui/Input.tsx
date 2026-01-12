import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
}

export function Input({
    label,
    error,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        {icon}
                    </span>
                )}
                <input
                    className={`w-full ${icon && iconPosition === 'left' ? 'pl-10' : ''} ${icon && iconPosition === 'right' ? 'pr-10' : ''} px-4 py-2.5 bg-slate-50 border-2 ${error ? 'border-red-300' : 'border-slate-100'} rounded-xl focus:ring-2 focus:ring-[--color-primary]/50 focus:border-[--color-primary] transition-all ${className}`}
                    {...props}
                />
                {icon && iconPosition === 'right' && (
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        {icon}
                    </span>
                )}
            </div>
            {error && (
                <span className="text-xs text-red-500 font-medium">{error}</span>
            )}
        </div>
    );
}

interface SearchInputProps extends Omit<InputProps, 'icon'> {
    onSearch?: (value: string) => void;
}

export function SearchInput({ onSearch, ...props }: SearchInputProps) {
    return (
        <Input
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            {...props}
        />
    );
}
