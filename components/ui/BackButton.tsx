'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({ className = '' }: { className?: string }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors ${className}`}
        >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back
        </button>
    );
}
