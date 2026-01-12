import React from 'react';
import Link from 'next/link';

interface HeaderProps {
    children: React.ReactNode;
    sticky?: boolean;
    variant?: 'light' | 'dark' | 'glass';
}

export function Header({ children, sticky = true, variant = 'light' }: HeaderProps) {
    const variantStyles = {
        light: 'bg-white border-b border-slate-200',
        dark: 'bg-[--color-nipa-navy] text-white border-b border-white/10',
        glass: 'bg-white/90 backdrop-blur-md border-b border-slate-200'
    };

    return (
        <header className={`h-16 flex items-center px-8 ${sticky ? 'sticky top-0' : ''} z-50 ${variantStyles[variant]}`}>
            {children}
        </header>
    );
}

interface LogoProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
}

export function Logo({ title, subtitle, icon }: LogoProps) {
    return (
        <Link href="/" className="flex items-center gap-3">
            {icon}
            <div className="flex flex-col">
                <h2 className="text-xl font-extrabold leading-tight tracking-tight">{title}</h2>
                {subtitle && (
                    <span className="text-[8px] opacity-60 tracking-widest uppercase">{subtitle}</span>
                )}
            </div>
        </Link>
    );
}

interface NavProps {
    items: Array<{ label: string; href: string; active?: boolean }>;
    variant?: 'light' | 'dark';
}

export function Nav({ items, variant = 'light' }: NavProps) {
    return (
        <nav className="hidden md:flex items-center gap-8">
            {items.map((item, idx) => (
                <Link
                    key={idx}
                    href={item.href}
                    className={`text-sm font-semibold transition-colors ${item.active
                            ? variant === 'dark'
                                ? 'text-[--color-primary] border-b-2 border-[--color-primary] pb-1'
                                : 'text-[--color-primary] border-b-2 border-[--color-primary] pb-1'
                            : variant === 'dark'
                                ? 'opacity-70 hover:opacity-100 hover:text-[--color-primary]'
                                : 'text-slate-600 hover:text-[--color-primary]'
                        }`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
