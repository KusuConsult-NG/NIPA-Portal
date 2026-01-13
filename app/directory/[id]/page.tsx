'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { findUserById, User } from '@/lib/firestore';

export default function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [member, setMember] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const user = await findUserById(id);
                if (!user) {
                    setError('Member not found');
                } else {
                    setMember(user);
                }
            } catch (err) {
                console.error('Error fetching member:', err);
                setError('Failed to load member profile');
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    if (error || !member) {
        return (
            <div className="min-h-screen bg-background-light flex flex-col items-center justify-center gap-4">
                <span className="material-symbols-outlined text-6xl text-slate-300">person_off</span>
                <p className="text-slate-600 font-medium">{error || 'Member not found'}</p>
                <Link href="/directory" className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90">
                    Back to Directory
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background-light text-slate-900 min-h-screen font-display pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-navy-deep text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/directory" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                            <span className="text-sm font-bold">Back to Directory</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                    {/* Cover Image */}
                    <div className="h-32 sm:h-48 bg-linear-to-r from-navy-deep to-primary relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="px-6 sm:px-10 pb-10">
                        {/* Profile Header */}
                        <div className="relative -mt-16 sm:-mt-20">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                {/* Avatar */}
                                <div className="shrink-0 relative">
                                    <div className="size-24 sm:size-32 rounded-full border-4 border-white shadow-lg bg-linear-to-br from-primary/20 to-secondary/20 overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl font-black text-primary">
                                            {member.name?.charAt(0).toUpperCase() || 'M'}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-1 right-1 size-5 sm:size-6 bg-green-500 border-4 border-white rounded-full"></div>
                                </div>

                                {/* Name and Actions */}
                                <div className="flex-1 pt-6 sm:pt-8 w-full">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                        <div className="flex-1 w-full sm:w-auto">
                                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{member.name}</h1>
                                            <p className="text-base sm:text-lg text-slate-600 font-medium mb-3">{member.profession || 'Member'}</p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {member.cohort && (
                                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black tracking-wider uppercase">
                                                        {member.cohort}
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                                                    <span className="material-symbols-outlined text-sm">badge</span>
                                                    {member.role === 'admin' ? 'Administrator' : 'Member'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 w-full sm:w-auto">
                                            <button
                                                onClick={() => router.push(`/messages?user=${member.id}`)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-lg">mail</span>
                                                Message
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                        {/* Contact Information */}
                                        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Contact Information</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">email</span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                                                        <p className="text-sm text-slate-700 font-medium wrap-break-word">{member.email}</p>
                                                    </div>
                                                </div>
                                                {member.phone && (
                                                    <div className="flex items-start gap-3">
                                                        <span className="material-symbols-outlined text-slate-400 text-xl">call</span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                                                            <p className="text-sm text-slate-700 font-medium">{member.phone}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {member.cohort && (
                                                    <div className="flex items-start gap-3">
                                                        <span className="material-symbols-outlined text-slate-400 text-xl">school</span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cohort</p>
                                                            <p className="text-sm text-slate-700 font-medium">{member.cohort}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        {/* Professional Info */}
                                        <section className="bg-linear-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl border border-primary/10">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Professional Details</h3>
                                            <div className="space-y-4">
                                                {member.profession && (
                                                    <div className="flex items-start gap-3">
                                                        <span className="material-symbols-outlined text-primary text-xl">work</span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Profession</p>
                                                            <p className="text-sm text-slate-700 font-medium">{member.profession}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
                                                        <p className="text-sm text-slate-700 font-medium">
                                                            {new Date(member.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${member.status === 'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-slate-100 text-slate-600'
                                                            }`}>
                                                            {member.status?.charAt(0).toUpperCase() + member.status?.slice(1) || 'Active'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
