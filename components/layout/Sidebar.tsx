import React from 'react';
import Link from 'next/link';

interface SidebarProps {
    children: React.ReactNode;
    variant?: 'dark' | 'light';
}

export function Sidebar({ children, variant = 'dark' }: SidebarProps) {
    const variantStyles = variant === 'dark'
        ? 'bg-[--color-nipa-navy] text-white'
        : 'bg-white text-slate-900 border-r border-slate-200';

    return (
        <aside className={`w-72 flex flex-col sticky top-0 h-screen ${variantStyles}`}>
            {children}
        </aside>
    );
}

interface SidebarHeaderProps {
    title: string;
    subtitle?: string;
    logo?: React.ReactNode;
}

export function SidebarHeader({ title, subtitle, logo }: SidebarHeaderProps) {
    return (
        <div className="p-8 flex flex-col gap-10">
            <div className="flex items-center gap-3">
                {logo}
                <div className="flex flex-col">
                    <h1 className="text-base font-bold leading-none tracking-tight">{title}</h1>
                    {subtitle && (
                        <p className="text-[--color-primary] text-[10px] font-bold uppercase tracking-wider mt-1.5">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

interface SidebarNavItem {
    icon: string;
    label: string;
    href: string;
    active?: boolean;
    badge?: number;
}

interface SidebarNavProps {
    items: SidebarNavItem[];
    variant?: 'dark' | 'light';
}

export function SidebarNav({ items, variant = 'dark' }: SidebarNavProps) {
    return (
        <nav className="flex flex-col gap-1.5 flex-1 px-6">
            {items.map((item, idx) => (
                <Link
                    key={idx}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${item.active
                            ? variant === 'dark'
                                ? 'bg-[--color-primary] text-[--color-nipa-navy]'
                                : 'bg-[--color-primary] text-white'
                            : variant === 'dark'
                                ? 'text-slate-400 hover:text-white hover:bg-white/5'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                >
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                            {item.badge}
                        </span>
                    )}
                </Link>
            ))}
        </nav>
    );
}

interface SidebarFooterProps {
    children: React.ReactNode;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
    return (
        <div className="mt-auto p-8 border-t border-white/5">
            {children}
        </div>
    );
}
