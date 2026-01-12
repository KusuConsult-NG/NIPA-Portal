'use client';

import Link from 'next/link';

export default function AdminPage() {
    return (
        <div className="flex min-h-screen bg-background-light text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-72 flex flex-col bg-nipa-navy text-white sticky top-0 h-screen shadow-2xl">
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
                        <Link href="/payments" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
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
                <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 sticky top-0 z-10">
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
                            <span className="text-xs font-bold text-slate-400">Refreshed: 2 mins ago</span>
                            <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">
                                <span className="material-symbols-outlined text-sm">refresh</span>
                            </button>
                        </div>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary-blue/10 rounded-xl">
                                    <span className="material-symbols-outlined text-secondary-blue font-bold">group</span>
                                </div>
                                <span className="text-primary text-[11px] font-black px-2.5 py-1 bg-primary/10 rounded-lg flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">trending_up</span> 2.5%
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Members</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2">1,240</h3>
                            <div className="mt-5 flex items-center gap-4 text-xs font-bold">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    <span className="text-slate-600">Active: 1,120</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    <span className="text-slate-400">Inactive: 120</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-accent-purple/10 rounded-xl">
                                    <span className="material-symbols-outlined text-accent-purple font-bold">payments</span>
                                </div>
                                <span className="text-red-500 text-[11px] font-black px-2.5 py-1 bg-red-50 rounded-lg flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">trending_down</span> 1.2%
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">MTD Revenue</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2">₦450k</h3>
                            <div className="mt-5 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-accent-purple h-full w-[90%]"></div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Target: ₦500k (90%)</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <span className="material-symbols-outlined text-primary font-bold">account_balance_wallet</span>
                                </div>
                                <span className="text-primary text-[11px] font-black px-2.5 py-1 bg-primary/10 rounded-lg flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">trending_up</span> 12.4%
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">YTD Revenue</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2">₦3.2M</h3>
                            <p className="text-[10px] text-slate-400 mt-5 font-bold uppercase">Fiscal Cycle 2024</p>
                        </div>

                        <div className="bg-nipa-navy p-6 rounded-2xl border-2 border-primary shadow-xl ring-4 ring-primary/5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-primary/20 rounded-xl">
                                    <span className="material-symbols-outlined text-primary font-bold">priority_high</span>
                                </div>
                                <span className="text-nipa-navy text-[10px] font-black px-2 py-1 bg-primary rounded-lg uppercase animate-pulse">Pending</span>
                            </div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Verifications</p>
                            <h3 className="text-4xl font-black text-white mt-1">14</h3>
                            <button className="mt-5 w-full py-2 bg-primary text-nipa-navy font-black text-[10px] uppercase rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                View All Tasks <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
                                <p className="text-slate-400 font-medium">Chart Visualization Area</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-black text-slate-900">Recent Tasks</h3>
                                <Link className="text-xs font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-tight" href="#">View Queue</Link>
                            </div>
                            <div className="flex flex-col gap-4 flex-1">
                                {['John Oluyemi', 'Chidi Azikiwe', 'Fatima Abubakar'].map((name, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-default group">
                                        <div className={`size-11 rounded-full ${idx === 0 ? 'bg-secondary-blue/10 text-secondary-blue' : idx === 1 ? 'bg-accent-purple/10 text-accent-purple' : 'bg-primary/10 text-primary'} flex items-center justify-center font-black text-sm`}>
                                            {name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-slate-900 truncate">{name}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">{idx === 0 ? 'Annual Dues' : idx === 1 ? 'Election Fee' : 'Annual Dues'} • ₦{idx === 1 ? '5,000' : '25,000'}</p>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 text-[10px] font-black bg-nipa-navy text-white px-3 py-1.5 rounded-lg transition-all">VERIFY</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
