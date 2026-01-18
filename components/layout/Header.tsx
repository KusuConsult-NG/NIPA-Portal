'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

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
    // We need to import useAuth and useRouter inside the component or use a specialized Link
    // However, Header might be a server component or used in one. But it imports React, so maybe client?
    // Let's stick to simple prop or assumption.
    // If this is used in App Router, useAuth works if 'use client' is top level.
    // If Header.tsx doesn't have 'use client', adding hooks might break it if it's imported in server pages.
    // Let's add 'use client' to Header.tsx

    const { user } = useAuth();

    return (
        <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
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
