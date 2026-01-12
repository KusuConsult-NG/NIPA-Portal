import React from 'react';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
    text?: string;
}

export function Loading({ size = 'md', fullScreen = false, text }: LoadingProps) {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const spinnerContent = (
        <div className="flex flex-col items-center gap-4">
            <div className={`${sizes[size]} border-4 border-slate-200 border-t-[--color-primary] rounded-full animate-spin`}></div>
            {text && <p className="text-slate-600 font-medium">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                {spinnerContent}
            </div>
        );
    }

    return <div className="flex items-center justify-center p-8">{spinnerContent}</div>;
}

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            {[...Array(rows)].map((_, i) => (
                <div key={i} className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}
