'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function InviteMemberPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Member');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setName('');
        }, 1500);
    };

    return (
        <div className="bg-background-light text-slate-900 min-h-screen font-display">
            <header className="sticky top-0 z-50 bg-navy-deep text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <Link href="/directory" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                                <span className="text-sm font-bold">Back to Directory</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-6 py-12">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10">
                    <div className="text-center mb-10">
                        <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <span className="material-symbols-outlined text-3xl">mark_email_unread</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Invite New Member</h1>
                        <p className="text-slate-500">Send an invitation to join the NIPA Member Portal.</p>
                    </div>

                    {status === 'success' ? (
                        <div className="text-center py-10">
                            <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Invitation Sent!</h2>
                            <p className="text-slate-500 mb-8">We've sent an email to the provided address with instructions to join.</p>
                            <button onClick={() => setStatus('idle')} className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all">Send Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleInvite} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="e.g. Dr. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="john.doe@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                >
                                    <option>Member</option>
                                    <option>Administrator</option>
                                    <option>Staff</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full py-4 bg-primary text-white font-black rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">send</span>
                                        Send Invitation
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
