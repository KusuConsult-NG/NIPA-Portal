'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { User } from '@/lib/firestore';

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeMembers: 0,
        inactiveMembers: 0,
        totalRevenue: 0,
        pendingVerifications: 0
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [recentUsers, setRecentUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Fetch Users
                const usersRef = collection(db, 'users');
                const usersSnapshot = await getDocs(usersRef);
                const totalMembers = usersSnapshot.size;
                const activeMembers = usersSnapshot.docs.filter(doc => doc.data().status === 'active').length;
                const inactiveMembers = totalMembers - activeMembers;
                const pendingVerifications = usersSnapshot.docs.filter(doc => doc.data().status === 'pending').length;

                // Get some recent users for the "Recent Tasks" / "Queue" list
                // (Using any users for now, ideally filter by pending or recent join date)
                // Get recent users, prioritizing pending
                const recent = usersSnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() } as User))
                    .sort((a, b) => (a.status === 'pending' ? -1 : 1))
                    .slice(0, 5);

                // 2. Fetch Revenue
                const paymentsRef = collection(db, 'payments');
                const paymentsSnapshot = await getDocs(paymentsRef);
                const totalRevenue = paymentsSnapshot.docs.reduce((sum, doc) => sum + (doc.data().amount || 0), 0);

                setStats({
                    totalMembers,
                    activeMembers,
                    inactiveMembers,
                    totalRevenue,
                    pendingVerifications
                });
                setRecentUsers(recent);

            } catch (error) {
                console.error("Error fetching admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="flex min-h-screen bg-background-light text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-72 flex flex-col bg-nipa-navy text-white sticky top-0 h-screen shadow-2xl glass-card border-r border-white/5">
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-10 border border-white/20" style={{ backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Admin")' }} />
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-bold leading-none tracking-tight">NIPA Admin</h1>
                            <p className="text-primary text-[10px] font-bold uppercase tracking-wider mt-1.5">Institute Panel</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1.5 flex-1">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mb-3">Dashboard</p>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-nipa-navy cursor-pointer transition-all font-bold">
                            <span className="material-symbols-outlined text-[22px]">grid_view</span>
                            <p className="text-sm">Overview</p>
                        </div>

                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mt-8 mb-3">Management Tools</p>
                        <Link href="/directory" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-[22px]">group</span>
                            <p className="text-sm font-medium">Member Directory</p>
                        </Link>
                        <Link href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-[22px]">account_balance</span>
                            <p className="text-sm font-medium">Financial Reports</p>
                        </Link>
                        <Link href="/elections" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-[22px]">ballot</span>
                            <p className="text-sm font-medium">Election Setup</p>
                        </Link>
                        <Link href="/events" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                            <p className="text-sm font-medium">Events Portal</p>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-[22px]">settings</span>
                            <p className="text-sm font-medium">Settings</p>
                        </Link>
                    </nav>

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <button className="w-full flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-xl font-bold text-sm mb-6 hover:bg-white/15 transition-all">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export Data
                        </button>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer">
                                <span className="material-symbols-outlined text-[22px]">support_agent</span>
                                <p className="text-sm font-medium">Help Center</p>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-400/10 cursor-pointer">
                                <span className="material-symbols-outlined text-[22px]">logout</span>
                                <p className="text-sm font-medium">Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-8 bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <h2 className="text-slate-900 font-extrabold text-xl tracking-tight uppercase italic">Portal <span className="text-primary">Admin</span></h2>
                    </div>

                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <div className="relative max-w-sm w-full hidden lg:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                            <input className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50" placeholder="Search archives..." />
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors relative">
                                <span className="material-symbols-outlined text-[22px]">notifications</span>
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
                            </button>
                            <div className="h-8 w-px bg-slate-200 mx-1"></div>
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-slate-900 leading-none">Admin User</p>
                                    <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase">Super Admin</p>
                                </div>
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" style={{ backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin")' }} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8 max-w-[1440px] mx-auto w-full">
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-slate-900 text-3xl font-black tracking-tight mb-2">System Insights</h1>
                            <p className="text-slate-500 font-medium">Comprehensive performance metrics for the fiscal year.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-400">Live Data</span>
                            <button onClick={() => window.location.reload()} className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">
                                <span className="material-symbols-outlined text-sm">refresh</span>
                            </button>
                        </div>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm card-hover glass-card-light animate-scale-in">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary-blue/10 rounded-xl transition-transform duration-300 hover:scale-110">
                                    <span className="material-symbols-outlined text-secondary-blue font-bold">group</span>
                                </div>
                                <span className="text-primary text-[11px] font-black px-2.5 py-1 bg-primary/10 rounded-lg flex items-center gap-1 animate-pulse">
                                    <span className="material-symbols-outlined text-xs">trending_up</span> Live
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Members</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2 transition-all duration-500">
                                {loading ? '...' : stats.totalMembers}
                            </h3>
                            <div className="mt-5 flex items-center gap-4 text-xs font-bold">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    <span className="text-slate-600">Active: {loading ? '...' : stats.activeMembers}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    <span className="text-slate-400">Inactive: {loading ? '...' : stats.inactiveMembers}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm card-hover glass-card-light animate-scale-in" style={{ animationDelay: '0.1s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-accent-purple/10 rounded-xl transition-transform duration-300 hover:scale-110">
                                    <span className="material-symbols-outlined text-accent-purple font-bold">payments</span>
                                </div>
                                <span className="text-green-600 text-[11px] font-black px-2.5 py-1 bg-green-50 rounded-lg flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">check_circle</span> Verified
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Revenue</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2">
                                {loading ? '...' : formatCurrency(stats.totalRevenue)}
                            </h3>
                            <div className="mt-5 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-accent-purple h-full w-full"></div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">All Time Collections</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm card-hover glass-card-light animate-scale-in" style={{ animationDelay: '0.2s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-primary/10 rounded-xl transition-transform duration-300 hover:scale-110">
                                    <span className="material-symbols-outlined text-primary font-bold">account_balance_wallet</span>
                                </div>
                                <span className="text-primary text-[11px] font-black px-2.5 py-1 bg-primary/10 rounded-lg flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">trending_up</span> 100%
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Tasks</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2">
                                {loading ? '...' : stats.pendingVerifications}
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-5 font-bold uppercase">Awaiting Approval</p>
                        </div>

                        <div className="bg-nipa-navy p-6 rounded-2xl border-2 border-primary shadow-xl ring-4 ring-primary/5 card-hover animate-glow animate-scale-in" style={{ animationDelay: '0.3s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-primary/20 rounded-xl transition-transform duration-300 hover:scale-110">
                                    <span className="material-symbols-outlined text-primary font-bold">priority_high</span>
                                </div>
                                <span className="text-nipa-navy text-[10px] font-black px-2 py-1 bg-primary rounded-lg uppercase animate-pulse">Action</span>
                            </div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Verifications</p>
                            <h3 className="text-4xl font-black text-white mt-1 transition-all duration-500">
                                {loading ? '...' : stats.pendingVerifications}
                            </h3>
                            <button className="mt-5 w-full py-2 bg-primary text-nipa-navy font-black text-[10px] uppercase rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                View Queue <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    {/* Charts & Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">Payment Analytics</h3>
                                    <p className="text-sm text-slate-500 font-medium">Comparative analysis across revenue streams</p>
                                </div>
                                <div className="flex p-1 bg-slate-100 rounded-xl">
                                    <button className="px-4 py-1.5 text-xs font-bold bg-white text-slate-900 rounded-lg shadow-sm">6 Months</button>
                                    <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">1 Year</button>
                                </div>
                            </div>
                            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl">
                                <p className="text-slate-400 font-medium">Chart Visualization Coming Soon</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-black text-slate-900">Recent Members</h3>
                                <Link className="text-xs font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-tight" href="/directory">View All</Link>
                            </div>
                            <div className="flex flex-col gap-4 flex-1">
                                {loading ? (
                                    <p className="text-slate-500">Loading...</p>
                                ) : (
                                    recentUsers.map((user, idx) => (
                                        <div key={user.id} className="stagger-item flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-default group card-hover">
                                            <div className={`size-11 rounded-full ${user.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-primary/10 text-primary'} flex items-center justify-center font-black text-sm`}>
                                                {user.name ? user.name.charAt(0) : 'U'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-black text-slate-900 truncate">{user.name || 'Unknown User'}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">{user.profession || 'Member'} • <span className={user.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}>{user.status || 'inactive'}</span></p>
                                            </div>
                                            {user.status === 'pending' && (
                                                <button
                                                    onClick={async () => {
                                                        if (confirm(`Approve ${user.name}?`)) {
                                                            try {
                                                                const { updateUser } = await import('@/lib/firestore');
                                                                await updateUser(user.id, { status: 'active' });
                                                                alert('User approved!');
                                                                window.location.reload();
                                                            } catch (e) {
                                                                alert('Error approving user');
                                                                console.error(e);
                                                            }
                                                        }
                                                    }}
                                                    className="opacity-100 text-[10px] font-black bg-primary text-nipa-navy px-3 py-1.5 rounded-lg transition-all hover:brightness-110 shadow-sm"
                                                >
                                                    APPROVE
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
