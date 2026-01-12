'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import WelfareHeader from '../../components/welfare/WelfareHeader';
import { getCelebrants, getGreetingsForYear, sendGreeting, User, Greeting } from '@/lib/firestore';

export default function WelfarePage() {
    const { user } = useAuth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [celebrants, setCelebrants] = useState<User[]>([]);
    const [greetings, setGreetings] = useState<Greeting[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState<string | null>(null);

    const currentMonthName = months[selectedMonth];
    const currentYear = new Date().getFullYear();
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [celebrantsData, greetingsData] = await Promise.all([
                    getCelebrants(selectedMonth),
                    getGreetingsForYear(currentYear)
                ]);
                setCelebrants(celebrantsData);
                setGreetings(greetingsData);
            } catch (error) {
                console.error("Failed to fetch welfare data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedMonth, currentYear]);

    const handleGreet = async (recipientId: string) => {
        if (!user) {
            alert("Please login to send greetings.");
            return;
        }

        setSending(recipientId);
        try {
            await sendGreeting(user.uid, recipientId, 'birthday');
            // Refresh greetings
            const updatedGreetings = await getGreetingsForYear(currentYear);
            setGreetings(updatedGreetings);
            alert("Birthday greeting sent successfully!");
        } catch (error) {
            console.error("Failed to send greeting", error);
            alert("Failed to send greeting. Please try again.");
        } finally {
            setSending(null);
        }
    };

    // Calculate stats
    const totalCelebrants = celebrants.length;
    const greetingsSent = greetings.filter(g =>
        celebrants.some(c => c.id === g.recipientId)
    ).length;
    const pending = totalCelebrants - greetingsSent;

    // Get today's celebrants
    const todayCelebrants = celebrants.filter(c =>
        c.birthDay === today && selectedMonth === currentMonth
    );

    // Helper to check if greeting was sent
    const wasGreetingSent = (userId: string): boolean => {
        return greetings.some(g => g.recipientId === userId);
    };

    // Helper to determine status
    const getStatus = (celebrant: User): 'Pending' | 'Sent' | 'Upcoming' => {
        if (wasGreetingSent(celebrant.id)) return 'Sent';

        const isToday = celebrant.birthDay === today && selectedMonth === currentMonth;
        if (isToday) return 'Pending';

        return 'Upcoming';
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background-light">
                <span className="material-symbols-outlined animate-spin text-4xl text-emerald-600">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="bg-background-light text-slate-900 min-h-screen">
            <WelfareHeader />

            {/* Main Content */}
            <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Birthday Dashboard</h1>
                        <p className="text-slate-600 mt-2 font-medium">Celebrate and manage welfare outreach for our esteemed NIPA members.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 hover:border-emerald-600/50 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-xl">description</span>
                            Export Excel
                        </button>
                        <button
                            onClick={() => {
                                todayCelebrants.forEach(c => {
                                    if (!wasGreetingSent(c.id)) {
                                        handleGreet(c.id);
                                    }
                                });
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                        >
                            <span className="material-symbols-outlined text-xl">celebration</span>
                            Greet All Today
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl relative overflow-hidden group border-l-4 border-l-emerald-600">
                        <div className="absolute -right-6 -top-6 text-emerald-600/5 group-hover:text-emerald-600/10 transition-colors">
                            <span className="material-symbols-outlined text-9xl">cake</span>
                        </div>
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Month Total</p>
                        <div className="flex items-baseline gap-2 mt-3">
                            <span className="text-4xl font-black text-slate-900">{totalCelebrants}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl border-l-4 border-l-emerald-500">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Greetings Sent</p>
                        <div className="flex items-baseline gap-2 mt-3">
                            <span className="text-4xl font-black text-slate-900">{greetingsSent}</span>
                            <span className="text-emerald-600 text-xs font-bold">
                                {totalCelebrants > 0 ? Math.round((greetingsSent / totalCelebrants) * 100) : 0}% Rate
                            </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                            <div
                                className="bg-linear-to-r from-emerald-500 to-emerald-600 h-full"
                                style={{ width: `${totalCelebrants > 0 ? (greetingsSent / totalCelebrants) * 100 : 0}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl border-l-4 border-l-orange-400">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Pending</p>
                        <div className="flex items-baseline gap-2 mt-3">
                            <span className="text-4xl font-black text-orange-600">{pending}</span>
                            {pending > 0 && <span className="material-symbols-outlined text-orange-500 text-xl animate-pulse">pending_actions</span>}
                        </div>
                        <p className="text-slate-500 text-[11px] mt-2 font-medium">Require attention</p>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl border-l-4 border-l-blue-400">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Today</p>
                        <div className="flex items-baseline gap-2 mt-3">
                            <span className="text-4xl font-black text-slate-900">{todayCelebrants.length}</span>
                            <span className="text-blue-600 text-sm font-bold uppercase">Members</span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-2 font-medium">Ready for broadcast</p>
                    </div>
                </div>

                {/* Month Filter */}
                <div className="mb-10 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-8 bg-emerald-600/10 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-emerald-600">calendar_month</span>
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900">Filter by Month</h2>
                    </div>
                    <div className="flex gap-3 pb-2 overflow-x-auto custom-scrollbar">
                        {months.map((month, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedMonth(idx)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border border-transparent ${idx === selectedMonth ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-600/10 scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                {month}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Birthday Table */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <h3 className="font-black text-xl text-slate-900">{currentMonthName} Celebrants</h3>
                            <span className="bg-emerald-600/10 text-emerald-600 text-xs font-black px-2.5 py-1 rounded-full">{totalCelebrants} Members</span>
                        </div>
                    </div>

                    {celebrants.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/30">
                                        <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Member Name</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Cohort</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Date</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Contact</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {celebrants.map((celebrant, idx) => {
                                        const status = getStatus(celebrant);
                                        const isToday = celebrant.birthDay === today && selectedMonth === currentMonth;

                                        return (
                                            <tr key={celebrant.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-10 rounded-xl ${status === 'Sent' ? 'bg-emerald-600/10 text-emerald-600' : 'bg-emerald-50 text-emerald-600'} flex items-center justify-center font-black text-sm`}>
                                                            {celebrant.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-900">{celebrant.name}</div>
                                                            <div className="text-[10px] text-slate-500 font-medium">{celebrant.profession || 'Member'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-sm text-slate-700 font-medium">{celebrant.cohort}</td>
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900">{currentMonthName} {celebrant.birthDay}</span>
                                                        <span className={`text-[9px] ${isToday ? 'text-emerald-600' : status === 'Sent' ? 'text-slate-500' : 'text-emerald-600'} uppercase font-black tracking-tighter ${isToday ? 'flex items-center gap-1' : ''}`}>
                                                            {isToday && <span className="size-1 bg-emerald-600 rounded-full animate-ping"></span>}
                                                            {isToday ? 'Today' : status === 'Sent' ? 'Passed' : `Day ${celebrant.birthDay}`}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col text-[11px]">
                                                        <span className="text-slate-900 font-bold">{celebrant.phone || 'N/A'}</span>
                                                        <span className="text-slate-600 font-medium italic">{celebrant.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                            status === 'Sent' ? 'bg-emerald-600/10 text-emerald-600 border border-emerald-600/20' :
                                                                'bg-slate-100 text-slate-600 border border-slate-200'
                                                        }`}>
                                                        {status === 'Sent' && <span className="material-symbols-outlined text-[10px] mr-1">check_circle</span>}
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button
                                                        onClick={() => handleGreet(celebrant.id)}
                                                        disabled={status === 'Sent' || status === 'Upcoming' || sending === celebrant.id}
                                                        className={`inline-flex items-center gap-2 px-4 py-2 ${status === 'Pending' && sending !== celebrant.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' :
                                                                status === 'Sent' ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' :
                                                                    'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                                            } text-xs font-bold rounded-xl hover:brightness-110 transition-all ${status === 'Pending' && sending !== celebrant.id ? 'active:scale-95' : ''}`}
                                                    >
                                                        {sending === celebrant.id ? (
                                                            <>
                                                                <div className="size-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="material-symbols-outlined text-sm">
                                                                    {status === 'Pending' ? 'send' : status === 'Sent' ? 'check' : 'lock'}
                                                                </span>
                                                                {status === 'Pending' ? 'Greet Now' : status === 'Sent' ? 'Sent' : 'Locked'}
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12 px-4">
                            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">cake</span>
                            <p className="text-gray-500 font-medium">No celebrants found for {currentMonthName}.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-slate-100 py-10 mt-10">
                    <div className="max-w-[1280px] mx-auto px-6 text-center">
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                            © 2024 National Institute for Policy, Strategy and Leadership Course Association (NIPA)
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
