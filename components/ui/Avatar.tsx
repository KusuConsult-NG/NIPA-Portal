import React from 'react';

interface AvatarProps {
    src?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    status?: 'online' | 'offline' | 'away';
    rounded?: 'full' | 'lg' | 'xl';
}

export function Avatar({
    src,
    name = 'User',
    size = 'md',
    status,
    rounded = 'full'
}: AvatarProps) {
    const sizeStyles = {
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12',
        xl: 'size-16'
    };

    const roundedStyles = {
        full: 'rounded-full',
        lg: 'rounded-lg',
        xl: 'rounded-xl'
    };

    const statusColors = {
        online: 'bg-[--color-primary]',
        offline: 'bg-slate-400',
        away: 'bg-amber-500'
    };

    const statusSizes = {
        sm: 'size-2',
        md: 'size-3',
        lg: 'size-3.5',
        xl: 'size-4'
    };

    const imageSrc = src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

    return (
        <div className="relative inline-block">
            <div
                className={`${sizeStyles[size]} ${roundedStyles[rounded]} bg-center bg-cover border-2 border-slate-100`}
                style={{ backgroundImage: `url("${imageSrc}")` }}
            />
            {status && (
                <div className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} border-2 border-white rounded-full`} />
            )}
        </div>
    );
}

interface AvatarGroupProps {
    avatars: Array<{ src?: string; name: string }>;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
}

export function AvatarGroup({ avatars, max = 3, size = 'md' }: AvatarGroupProps) {
    const displayAvatars = avatars.slice(0, max);
    const remaining = avatars.length - max;

    return (
        <div className="flex -space-x-2">
            {displayAvatars.map((avatar, idx) => (
                <div key={idx} className="ring-2 ring-white rounded-full">
                    <Avatar {...avatar} size={size} />
                </div>
            ))}
            {remaining > 0 && (
                <div className={`${size === 'sm' ? 'size-8' : size === 'md' ? 'size-10' : 'size-12'} rounded-full bg-slate-200 border-2 border-white flex items-center justify-center`}>
                    <span className="text-xs font-bold text-slate-600">+{remaining}</span>
                </div>
            )}
        </div>
    );
}
