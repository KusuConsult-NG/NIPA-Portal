'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('month');

    return (
        <div className="min-h-screen bg-[--color-background-light]">
            {/* Header */}
            <header className="bg-linear-to-r from-[--color-nipa-navy] to-[--color-navy-card] text-white px-8 py-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-black mb-2">Admin Analytics</h1>
                            <p className="text-slate-400 font-medium">Comprehensive insights and performance metrics</p>
                        </div>
                        <div className="flex gap-3">
                            {['week', 'month', 'year'].map(range => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${timeRange === range
                                        ? 'bg-[--color-primary] text-white'
                                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                                        }`}
                                >
                                    {range.charAt(0).toUpperCase() + range.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto p-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Revenue', value: '₦3.2M', change: '+12.5%', positive: true, icon: 'account_balance_wallet' },
                        { label: 'Active Members', value: '1,240', change: '+2.3%', positive: true, icon: 'group' },
                        { label: 'Event Attendance', value: '85%', change: '-3.2%', positive: false, icon: 'event' },
                        { label: 'Engagement Rate', value: '68%', change: '+5.7%', positive: true, icon: 'trending_up' }
                    ].map((metric, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${idx === 0 ? 'bg-green-100' :
                                    idx === 1 ? 'bg-blue-100' :
                                        idx === 2 ? 'bg-purple-100' :
                                            'bg-orange-100'
                                    }`}>
                                    <span className={`material-symbols-outlined ${idx === 0 ? 'text-green-600' :
                                        idx === 1 ? 'text-blue-600' :
                                            idx === 2 ? 'text-purple-600' :
                                                'text-orange-600'
                                        }`}>
                                        {metric.icon}
                                    </span>
                                </div>
                                <span className={`text-sm font-bold ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                                    {metric.change}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{metric.label}</p>
                            <p className="text-3xl font-black text-slate-900">{metric.value}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Revenue Chart */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black">Revenue Trend</h3>
                            <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                                <option>All Time</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-4">
                            {[65, 78, 82, 90, 88, 95].map((height, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-linear-to-t from-[--color-primary] to-[--color-accent] rounded-t-lg transition-all hover:brightness-110" style={{ height: `${height}%` }}></div>
                                    <span className="text-xs font-bold text-slate-400">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Member Growth */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black mb-6">Member Growth</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'New Members', value: 45, total: 100, color: 'bg-green-500' },
                                { label: 'Renewals', value: 87, total: 100, color: 'bg-blue-500' },
                                { label: 'Pending', value: 23, total: 100, color: 'bg-yellow-500' },
                                { label: 'Inactive', value: 12, total: 100, color: 'bg-red-500' }
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-slate-700">{item.label}</span>
                                        <span className="text-sm font-black text-slate-900">{item.value}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                        <div className={`${item.color} h-full rounded-full transition-all`} style={{ width: `${item.value}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Activity Feed & Top Contributors */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { action: 'Payment received', user: 'Col. Ahmed Bello', amount: '₦5,000', time: '2 mins ago' },
                                { action: 'New member registered', user: 'Dr. Sarah Okonkwo', amount: null, time: '15 mins ago' },
                                { action: 'Event registration', user: 'Engr. Musa Ibrahim', amount: 'Strategy Plenary', time: '1 hour ago' },
                                { action: 'Document downloaded', user: 'Barr. Fatima Yusuf', amount: 'Policy Paper', time: '2 hours ago' }
                            ].map((activity, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                    <div className="size-10 rounded-full bg-linear-to-br from-[--color-primary] to-[--color-accent] flex items-center justify-center text-white font-bold text-sm">
                                        {activity.user.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900">{activity.action}</p>
                                        <p className="text-xs text-slate-500">{activity.user} {activity.amount && `• ${activity.amount}`}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium shrink-0">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Contributors */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black mb-6">Top Contributors</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Col. Ahmed B.', contributions: 12, rank: 1 },
                                { name: 'Dr. Sarah O.', contributions: 10, rank: 2 },
                                { name: 'Engr. Musa I.', contributions: 8, rank: 3 }
                            ].map((contributor, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className={`size-8 rounded-full flex items-center justify-center font-black text-xs ${idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                                        idx === 1 ? 'bg-slate-200 text-slate-700' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                        {contributor.rank}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 truncate">{contributor.name}</p>
                                        <p className="text-xs text-slate-500">{contributor.contributions} contributions</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
