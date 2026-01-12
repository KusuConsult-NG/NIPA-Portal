import React from 'react';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
    padding?: 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    className?: string;
}

export function Card({
    children,
    variant = 'default',
    padding = 'md',
    hoverable = false,
    className = ''
}: CardProps) {
    const baseStyles = 'bg-white rounded-2xl';

    const variantStyles = {
        default: 'border border-slate-200 shadow-sm',
        bordered: 'border-2 border-slate-100',
        elevated: 'shadow-lg border border-slate-100',
        gradient: 'bg-linear-to-br from-white to-slate-50 border border-slate-200'
    };

    const paddingStyles = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    const hoverStyles = hoverable ? 'hover:shadow-xl hover:border-[--color-primary]/20 transition-all cursor-pointer' : '';

    return (
        <div className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: string;
    iconColor?: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export function StatCard({ title, value, subtitle, icon, iconColor = 'text-[--color-primary]', trend }: StatCardProps) {
    return (
        <Card>
            <div className="flex justify-between items-start mb-4">
                {icon && (
                    <div className={`p-3 ${iconColor}/10 rounded-xl`}>
                        <span className={`material-symbols-outlined ${iconColor} font-bold`}>{icon}</span>
                    </div>
                )}
                {trend && (
                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 ${trend.isPositive ? 'text-[--color-primary] bg-[--color-primary]/10' : 'text-red-500 bg-red-50'
                        }`}>
                        <span className="material-symbols-outlined text-xs">
                            {trend.isPositive ? 'trending_up' : 'trending_down'}
                        </span>
                        {trend.value}
                    </span>
                )}
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">{value}</h3>
            {subtitle && <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">{subtitle}</p>}
        </Card>
    );
}
