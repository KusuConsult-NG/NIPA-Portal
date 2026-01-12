'use client';

import Link from 'next/link';
import { useState } from 'react';
import WelfareHeader from '../../components/welfare/WelfareHeader';

export default function WelfarePage() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const currentMonthName = months[selectedMonth];

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
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
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
                            <span className="text-4xl font-black text-slate-900">42</span>
                            <span className="text-emerald-600 text-[10px] font-black bg-emerald-600/10 px-2 py-1 rounded-full">+4 vs 2023</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl border-l-4 border-l-emerald-500">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Greetings Sent</p>
                        <div className="flex items-baseline gap-2 mt-3">
                            <span className="text-4xl font-black text-slate-900">28</span>
                            <span className="text-emerald-600 text-xs font-bold">66% Rate</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                            <div className="bg-linear-to-r from-emerald-500 to-emerald-600 h-full" style={{ width: '66%' }}></div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl border-l-4 border-l-orange-400">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Pending</p>
                        <div className="flex items-baseline gap-2 mt-3">
                            <span className="text-4xl font-black text-orange-600">14</span>
                            <span className="material-symbols-outlined text-orange-500 text-xl animate-pulse">pending_actions</span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-2 font-medium">Require attention today</p>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl border-l-4 border-l-blue-400">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Upcoming Today</p>
                        <div className="flex items-baseline gap-2 mt-3">
                            <span className="text-4xl font-black text-slate-900">3</span>
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
                            <span className="bg-emerald-600/10 text-emerald-600 text-xs font-black px-2.5 py-1 rounded-full">42 Members</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Showing 1-10 of 42</span>
                            <div className="flex gap-2">
                                <button className="size-8 flex items-center justify-center hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 text-slate-600">
                                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                                </button>
                                <button className="size-8 flex items-center justify-center hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 text-slate-600">
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Member Name</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Batch Info</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Date</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Contact</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { name: 'Adebayo Alade', sec: 'SEC 42, 2020', date: 'May 14', today: true, status: 'Pending' },
                                    { name: 'Chioma Nwachukwu', sec: 'SEC 38, 2016', date: 'May 12', today: false, status: 'Sent' },
                                    { name: 'Musa Okoro', sec: 'SEC 45, 2023', date: 'May 21', today: false, status: 'Upcoming' },
                                ].map((member, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-10 rounded-xl ${idx === 0 ? 'bg-emerald-50 text-emerald-600' : idx === 1 ? 'bg-emerald-600/10 text-emerald-600' : 'bg-emerald-50 text-emerald-600'} flex items-center justify-center font-black text-sm`}>
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900">{member.name}</div>
                                                    <div className="text-[10px] text-slate-500 font-medium">{idx === 0 ? 'Life Member' : idx === 1 ? 'Board Member' : 'Alumni'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-700 font-medium">{member.sec}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900">{member.date}</span>
                                                <span className={`text-[9px] ${member.today ? 'text-emerald-600' : member.status === 'Sent' ? 'text-slate-500' : 'text-emerald-600'} uppercase font-black tracking-tighter ${member.today ? 'flex items-center gap-1' : ''}`}>
                                                    {member.today && <span className="size-1 bg-emerald-600 rounded-full animate-ping"></span>}
                                                    {member.today ? 'Today' : member.status === 'Sent' ? 'Passed' : 'In 7 Days'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col text-[11px]">
                                                <span className="text-slate-900 font-bold">+234 803 123 4567</span>
                                                <span className="text-slate-600 font-medium italic">{member.name.toLowerCase().replace(' ', '.')}@nipa.org</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${member.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                member.status === 'Sent' ? 'bg-emerald-600/10 text-emerald-600 border border-emerald-600/20' :
                                                    'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                {member.status === 'Sent' && <span className="material-symbols-outlined text-[10px] mr-1">check_circle</span>}
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className={`inline-flex items-center gap-2 px-4 py-2 ${member.status === 'Pending' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' :
                                                member.status === 'Sent' ? 'bg-slate-100 text-slate-700 border border-transparent hover:border-emerald-600/30' :
                                                    'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                                } text-xs font-bold rounded-xl hover:brightness-110 transition-all ${member.status === 'Upcoming' ? '' : 'active:scale-95'}`} disabled={member.status === 'Upcoming'}>
                                                <span className="material-symbols-outlined text-sm">{member.status === 'Pending' ? 'send' : member.status === 'Sent' ? 'refresh' : 'lock'}</span>
                                                {member.status === 'Pending' ? 'Greet Now' : member.status === 'Sent' ? 'Resend' : 'Locked'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
