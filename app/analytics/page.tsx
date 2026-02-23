'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('month');
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState({
        totalRevenue: 0,
        activeMembers: 0,
        totalMembers: 0,
        eventAttendance: 0,
        totalEvents: 0
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    // New states for charts
    const [revenueData, setRevenueData] = useState<{ name: string, total: number }[]>([]);
    const [memberGrowthData, setMemberGrowthData] = useState<{ name: string, value: number, color: string }[]>([]);
    const [topContributors, setTopContributors] = useState<{ name: string, total: number, rank: number }[]>([]);

    const { user, profile, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && (!user || profile?.role !== 'admin')) {
            router.replace('/dashboard');
        }
    }, [user, profile, authLoading, router]);

    useEffect(() => {
        if (authLoading || profile?.role !== 'admin') return;
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Users with a hard cap to prevent client OOM crashes at scale
                const usersRef = collection(db, 'users');
                const usersQuery = query(usersRef, limit(1000));
                const usersSnapshot = await getDocs(usersQuery);
                const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile & { id: string }));
                const totalMembers = usersData.length;
                const activeMembers = usersData.filter(user => user.status === 'active').length;

                // Fetch Payments
                const paymentsRef = collection(db, 'payments');
                const paymentsQuery = query(paymentsRef, limit(1000));
                const paymentsSnapshot = await getDocs(paymentsQuery);
                const paymentsData = paymentsSnapshot.docs.map(doc => {
                    const data = doc.data() as { amount: number, status: string, createdAt: any, memberId?: string };
                    return {
                        id: doc.id,
                        amount: data.amount,
                        status: data.status,
                        memberId: data.memberId,
                        createdAt: data.createdAt?.toDate() || new Date()
                    };
                });

                // Process Stats...
                const successfulPayments = paymentsData.filter(p => p.status === 'success');
                const totalRevenue = successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0); // Assuming amount is in kobo/cents

                // Get recent payments for activity feed
                const recentPayments = paymentsData
                    .map(p => ({
                        id: p.id,
                        type: 'payment',
                        amount: p.amount,
                        timestamp: p.createdAt
                    }))
                    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                    .slice(0, 5);

                // Fetch Events
                const eventsRef = collection(db, 'events');
                const eventsQuery = query(eventsRef, limit(100));
                const eventsSnapshot = await getDocs(eventsQuery);
                const totalEvents = eventsSnapshot.size;
                const eventAttendance = eventsSnapshot.docs.reduce((sum, doc) => sum + ((doc.data() as { registered?: number }).registered || 0), 0);

                // --- Calculate Chart Data ---
                // Revenue Trend (Last 6 Months)
                const revTrendMap: Record<string, number> = {};
                const now = new Date();
                for (let i = 5; i >= 0; i--) {
                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    revTrendMap[d.toLocaleString('default', { month: 'short' })] = 0;
                }

                successfulPayments.forEach(p => {
                    const d = new Date(p.createdAt);
                    const diffMonths = (now.getFullYear() - d.getFullYear()) * 12 + now.getMonth() - d.getMonth();
                    if (diffMonths >= 0 && diffMonths <= 5) {
                        const month = d.toLocaleString('default', { month: 'short' });
                        if (revTrendMap[month] !== undefined) {
                            revTrendMap[month] += p.amount;
                        }
                    }
                });
                setRevenueData(Object.entries(revTrendMap).map(([name, total]) => ({ name, total })));

                // Member Growth (Status Segments)
                const pending = usersData.filter(u => u.status === 'pending').length;
                const inactive = usersData.filter(u => u.status === 'inactive').length;

                setMemberGrowthData([
                    { name: 'Active', value: activeMembers, color: '#3b82f6' }, // blue-500
                    { name: 'Pending', value: pending, color: '#eab308' }, // yellow-500
                    { name: 'Inactive', value: inactive, color: '#ef4444' } // red-500
                ]);

                // Top Contributors
                const contributorMap: Record<string, { total: number, name: string }> = {};
                successfulPayments.filter(p => p.memberId).forEach(p => {
                    if (!contributorMap[p.memberId!]) {
                        const user = usersData.find(u => u.id === p.memberId);
                        contributorMap[p.memberId!] = { total: 0, name: user?.name || 'Unknown Member' };
                    }
                    contributorMap[p.memberId!].total += p.amount;
                });

                const sortedContributors = Object.values(contributorMap)
                    .sort((a, b) => b.total - a.total)
                    .slice(0, 5)
                    .map((c, i) => ({ ...c, rank: i + 1 }));
                setTopContributors(sortedContributors);

                setMetrics({
                    totalRevenue,
                    activeMembers,
                    totalMembers,
                    eventAttendance,
                    totalEvents
                });

                setRecentActivity(recentPayments);

            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

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
                        { label: 'Total Revenue', value: formatCurrency(metrics.totalRevenue), change: 'Live', positive: true, icon: 'account_balance_wallet' },
                        { label: 'Active Members', value: metrics.activeMembers.toLocaleString(), change: `${metrics.totalMembers} Total`, positive: true, icon: 'group' },
                        { label: 'Event Attendance', value: metrics.eventAttendance.toLocaleString(), change: `${metrics.totalEvents} Events`, positive: true, icon: 'event' },
                        { label: 'Avg. Revenue / User', value: metrics.totalMembers ? formatCurrency(metrics.totalRevenue / metrics.totalMembers) : '₦0', change: 'Est.', positive: true, icon: 'trending_up' }
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
                            <p className="text-3xl font-black text-slate-900">
                                {loading ? '...' : metric.value}
                            </p>
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
                        <div className="h-64 flex items-end justify-between gap-4 mt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} />
                                    <YAxis hide />
                                    <Tooltip
                                        formatter={(value: any) => formatCurrency(Number(value) || 0)}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="total" stroke="var(--color-primary)" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Member Growth */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black mb-6">Member Growth</h3>
                        <div className="space-y-4">
                            {memberGrowthData.map((item, idx) => {
                                const percentage = metrics.totalMembers > 0 ? (item.value / metrics.totalMembers) * 100 : 0;
                                return (
                                    <div key={idx}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                            <span className="text-sm font-black text-slate-900">{item.value} ({percentage.toFixed(0)}%)</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all" style={{ width: `${percentage}%`, backgroundColor: item.color }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Activity Feed & Top Contributors */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            {loading ? (
                                <p className="text-slate-500">Loading activities...</p>
                            ) : recentActivity.length > 0 ? (
                                recentActivity.map((activity, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                        <div className="size-10 rounded-full bg-linear-to-br from-[--color-primary] to-[--color-accent] flex items-center justify-center text-white font-bold text-sm">
                                            PAY
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900">{activity.description || 'Payment'}</p>
                                            <p className="text-xs text-slate-500">Amount: {formatCurrency(activity.amount)}</p>
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium shrink-0">
                                            {activity.timestamp.toLocaleDateString()}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 italic">No recent activity found.</p>
                            )}
                        </div>
                    </div>

                    {/* Top Contributors */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black mb-6">Top Contributors</h3>
                        <div className="space-y-4">
                            {topContributors.length > 0 ? topContributors.map((contributor, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className={`size-8 rounded-full flex items-center justify-center font-black text-xs ${idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                                        idx === 1 ? 'bg-slate-200 text-slate-700' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                        {contributor.rank}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 truncate">{contributor.name}</p>
                                        <p className="text-xs text-slate-500">{formatCurrency(contributor.total)}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-slate-500 italic">No contributor data found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
