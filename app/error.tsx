'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Unhandled Global Exception caught by boundary:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 font-sans text-center">
            <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full border border-slate-100 flex flex-col items-center">
                <div className="size-20 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500">
                    <span className="material-symbols-outlined text-4xl">warning</span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">System Exception</h2>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed text-sm">
                    We encountered an unexpected error while processing your request. Our engineering team has been notified.
                </p>

                <div className="flex gap-4 w-full">
                    <button
                        onClick={reset}
                        className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors shadow-sm text-sm flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">refresh</span> Try Again
                    </button>

                    <Link
                        href="/dashboard"
                        className="flex-1 py-3 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary/20 text-sm flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">home</span> Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
