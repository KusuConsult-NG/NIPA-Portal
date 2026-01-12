'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import MemberSidebar from '@/components/layout/MemberSidebar';
import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Announcement {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: Timestamp;
}

interface Event {
    id: string;
    title: string;
    date: Timestamp;
    location: string;
    type: string;
}

export default function MemberDashboard() {
    const { profile, loading } = useAuth();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [fetchingData, setFetchingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Announcements
                const announcementsRef = collection(db, 'announcements');
                const announcementsQuery = query(announcementsRef, orderBy('createdAt', 'desc'), limit(2));
                const announcementsSnapshot = await getDocs(announcementsQuery);
                const announcementsData = announcementsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Announcement[];
                setAnnouncements(announcementsData);

                // Fetch Events
                const eventsRef = collection(db, 'events');
                const eventsQuery = query(eventsRef, orderBy('date', 'asc'), limit(3));
                const eventsSnapshot = await getDocs(eventsQuery);
                const eventsData = eventsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Event[];
                setEvents(eventsData);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setFetchingData(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background-main flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    const userName = profile?.name || 'Member';

    return (
        <div className="flex min-h-screen bg-background-main font-sans text-slate-900">
            {/* Sidebar */}
            <MemberSidebar />

            {/* Main Content */}
            <main className="flex-1 ml-72">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
                    <h2 className="text-slate-900 font-bold text-lg">Dashboard</h2>
                    <div className="flex items-center gap-6">
                        <div className="relative w-80">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                            <input className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder-slate-400 text-slate-900" placeholder="Search resources or members..." type="text" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/notifications" className="size-11 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </Link>
                            <Link href="/profile" className="size-11 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                                <span className="material-symbols-outlined">settings</span>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="p-10 space-y-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome back, {userName}</h1>
                        <p className="text-slate-500 text-lg font-medium">National Institute for Policy, Strategy and Leadership Course Association</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="col-span-1 lg:col-span-8 space-y-8">
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center justify-between">
                                <div className="flex flex-col gap-6">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">Financial Standing</p>
                                        <div className="flex items-center gap-4">
                                            <p className="text-3xl font-black text-slate-900">Paid through Dec 2026</p>
                                            <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">Active</span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Membership ID: <span className="text-slate-900">NIPA-{new Date().getFullYear()}-{profile?.uid.substring(0, 4).toUpperCase()}</span></p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Link href="/payments" className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-bold hover:brightness-105 transition-all shadow-lg shadow-primary/20">Pay Dues</Link>
                                        <button className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-200 transition-all">View History</button>
                                    </div>
                                </div>
                                <div className="hidden sm:flex w-56 h-36 bg-primary/5 rounded-2xl items-center justify-center border-2 border-dashed border-primary/20">
                                    <span className="material-symbols-outlined text-6xl text-primary/30">verified_user</span>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-xl font-bold text-slate-900">Latest Announcements</h3>
                                    <button className="text-sm font-bold text-accent-purple hover:underline">Mark all as read</button>
                                </div>

                                {fetchingData ? (
                                    <div className="flex justify-center p-8">
                                        <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                                    </div>
                                ) : announcements.length > 0 ? (
                                    <div className="grid gap-5">
                                        {announcements.map((item) => (
                                            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-accent-purple/30 hover:shadow-md transition-all cursor-pointer group">
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="text-xs font-bold text-accent-purple bg-accent-purple/10 px-3 py-1 rounded-lg uppercase tracking-wider">{item.category}</span>
                                                    <span className="text-xs text-slate-400 font-medium">{item.createdAt.toDate().toLocaleDateString()}</span>
                                                </div>
                                                <h4 className="font-bold text-lg group-hover:text-accent-purple transition-colors text-slate-900">{item.title}</h4>
                                                <p className="text-slate-500 mt-2 leading-relaxed line-clamp-2">{item.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                        <p className="text-slate-500 font-medium">No announcements yet.</p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-xl font-bold text-slate-900">October Celebrants</h3>
                                    <div className="flex gap-2">
                                        <button className="size-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                                        <button className="size-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
                                    </div>
                                </div>
                                <div className="flex gap-8 overflow-x-auto pb-4 custom-scrollbar">
                                    {/* Placeholder Celebrants Data - To be connected to Users collection later */}
                                    <div className="flex flex-col items-center gap-3 min-w-[110px] group cursor-pointer">
                                        <div className="size-20 rounded-full bg-center bg-cover border-4 border-white shadow-md ring-2 ring-primary group-hover:scale-105 transition-transform" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIdNEHll1Zy-FWM9N_nu8oEIkajFL7R86NJJJzEGSmlzjp6bQEBLTnnbldcNOCWjcDIF-V7HAgFwDLslzxizhXU7EQzVS0nCR6iXCT9AEGo0G80-AB7Snlh4sJlxrG72xU7R5MNYw2pAzMl1uvyBV1rOjG7RABU21qTKx_G9UGo9P4EHGd9QQ2ld2QFcZCeFswy2m3CbowMhTYGjWHzpvCD2Ui2EnNt2qW9dIKlsDxuDLZqUphA1DsincYMO9oSpmIW09Loe3Fuqk')" }}></div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-slate-900">Dr. Sarah O.</p>
                                            <p className="text-[10px] text-primary font-black uppercase tracking-wider">Today</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 min-w-[110px] group cursor-pointer">
                                        <div className="size-20 rounded-full bg-center bg-cover border-4 border-white shadow-md ring-1 ring-slate-100 group-hover:scale-105 transition-transform" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHFUPr6qYhgHsdeLTGGykn92GKQbhLl1dEUEJzJ88kVLfaLjBI1TkIgJwTf_aMmB0Unqu23AKdCPpsTBi8O-expxJ-2oG6864Gvutz5yA27C8vts6skWrNqRgwgrjew1MJ-x7el6T4iJBsk3QOkn1HjncMHdqrBOxilTWv0SxopKHpy-if7bGfenEA0kVtwOOwhlctohLHr1KFf8xI91cF0pmtBoMzZldDIMY2J8S9Eysy3RG7KJC_i3-iM0ZIYfejDPKyloK-8mU')" }}></div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-slate-900">Maj. Musa L.</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Oct 15</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 min-w-[110px] group cursor-pointer">
                                        <div className="size-20 rounded-full bg-center bg-cover border-4 border-white shadow-md ring-1 ring-slate-100 group-hover:scale-105 transition-transform" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBazlwepK9B0zNqk2EPkqJSfOlY-c8gfEoUaJImIz3jjJbcEh60TiTqVdMQplRBxTO-FVfbzU-VuflIL2-YlOwbiDAfIycWicx_s8reU-FMVfdKTqQjCahwqPxt6svxQ2Qr_SxkOa80z31LBMtdCQY0yzxpRRyv7u33N_QRUNk17Vl58aaxPImpjHlGRt7N1FCYF85JcUm7pnmeeBEKvmfT7QulV-pr0aYqnDhUoB__1pv1ypyv9uFXzAjs-fr20K4hJ_NnmphbynU')" }}></div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-slate-900">Barr. Evelyn</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Oct 18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 lg:col-span-4 space-y-8">
                            <div className="bg-sidebar-bg rounded-2xl p-8 text-white space-y-6 shadow-xl">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">bolt</span>
                                    <h3 className="text-lg font-bold">Quick Actions</h3>
                                </div>
                                <div className="grid gap-4">
                                    <Link className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group border border-white/5" href="#">
                                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">description</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Download Constitution</span>
                                            <span className="text-[10px] text-slate-400 font-medium">PDF • 4.2 MB</span>
                                        </div>
                                        <span className="material-symbols-outlined ml-auto text-slate-500 group-hover:text-primary transition-colors">download</span>
                                    </Link>
                                    <Link className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group border border-white/5" href="#">
                                        <div className="size-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-accent-purple">history_edu</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Policy Manual</span>
                                            <span className="text-[10px] text-slate-400 font-medium">Updated Sept 2024</span>
                                        </div>
                                        <span className="material-symbols-outlined ml-auto text-slate-500 group-hover:text-accent-purple transition-colors">arrow_forward</span>
                                    </Link>
                                    <Link className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group border border-white/5" href="#">
                                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">campaign</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Submit Proposal</span>
                                            <span className="text-[10px] text-slate-400 font-medium">Strategic Initiative</span>
                                        </div>
                                        <span className="material-symbols-outlined ml-auto text-slate-500 group-hover:text-primary transition-colors">add_circle</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Upcoming Events</h3>
                                    <Link className="text-xs font-bold text-primary hover:underline" href="#">See All</Link>
                                </div>

                                {fetchingData ? (
                                    <div className="flex justify-center p-4">
                                        <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                                    </div>
                                ) : events.length > 0 ? (
                                    <div className="space-y-6">
                                        {events.map((event) => (
                                            <div key={event.id} className="flex gap-5 group cursor-pointer">
                                                <div className="size-14 rounded-2xl bg-slate-50 flex flex-col items-center justify-center border border-slate-200 group-hover:border-primary/30 transition-colors">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                                                        {event.date.toDate().toLocaleDateString('en-US', { month: 'short' })}
                                                    </span>
                                                    <span className="text-xl font-black text-slate-900 leading-none">
                                                        {event.date.toDate().getDate()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{event.title}</h4>
                                                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                        <span className="material-symbols-outlined text-sm">location_on</span> {event.location}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-4">
                                        <p className="text-sm text-slate-500">No upcoming events.</p>
                                    </div>
                                )}

                                <button className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold mt-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">Sync to Calendar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
