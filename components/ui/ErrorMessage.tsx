import React from 'react';
import Link from 'next/link';

interface ErrorProps {
    title?: string;
    message?: string;
    action?: {
        label: string;
        href: string;
    };
    fullScreen?: boolean;
}

export function ErrorMessage({
    title = 'Something went wrong',
    message = 'An unexpected error occurred. Please try again.',
    action,
    fullScreen = false
}: ErrorProps) {
    const errorContent = (
        <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                <span className="material-symbols-outlined text-red-600 text-4xl">error</span>
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">{title}</h2>
                <p className="text-slate-600 font-medium max-w-md mx-auto">{message}</p>
            </div>
            {action && (
                <Link
                    href={action.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[--color-primary] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[--color-primary]/20"
                >
                    <span className="material-symbols-outlined">refresh</span>
                    {action.label}
                </Link>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
                {errorContent}
            </div>
        );
    }

    return <div className="p-12">{errorContent}</div>;
}

export function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-[--color-nipa-navy] to-[--color-navy-card]">
            <div className="text-center space-y-6">
                <div className="text-[--color-primary] text-9xl font-black">404</div>
                <div>
                    <h1 className="text-4xl font-black text-white mb-3">Page Not Found</h1>
                    <p className="text-slate-400 font-medium max-w-md mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[--color-primary] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-xl shadow-[--color-primary]/30"
                    >
                        <span className="material-symbols-outlined">home</span>
                        Go Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
