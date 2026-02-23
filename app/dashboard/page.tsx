'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import MemberSidebar from '@/components/layout/MemberSidebar';
import { useEffect, useState, useMemo } from 'react';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getCelebrants, User as FirestoreUser } from '@/lib/firestore';

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
    const [celebrants, setCelebrants] = useState<FirestoreUser[]>([]);
    const [currentMonthName, setCurrentMonthName] = useState('');
    const [fetchingData, setFetchingData] = useState(true);

    const userName = useMemo(() => profile?.name || 'Member', [profile]);

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

                // Fetch Celebrants for current month
                const currentMonth = new Date().getMonth();
                setCurrentMonthName(new Date().toLocaleString('default', { month: 'long' }));
                const monthCelebrants = await getCelebrants(currentMonth);

                // Sort to put upcoming/today first
                const todayDay = new Date().getDate();
                monthCelebrants.sort((a: FirestoreUser, b: FirestoreUser) => {
                    const aDiff = (a.birthDay || 0) - todayDay;
                    const bDiff = (b.birthDay || 0) - todayDay;
                    if (aDiff >= 0 && bDiff < 0) return -1;
                    if (aDiff < 0 && bDiff >= 0) return 1;
                    return (a.birthDay || 0) - (b.birthDay || 0);
                });
                setCelebrants(monthCelebrants);

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

    if (profile?.status === 'pending') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl text-center border border-slate-100">
                    <div className="size-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <span className="material-symbols-outlined text-4xl">hourglass_top</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">Verification Pending</h1>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                        Your account is currently under review by the PSLC Association administrators. You will receive an email once your membership is approved.
                    </p>
                    <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Your Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Name:</span>
                                <span className="font-bold text-slate-900">{userName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Cohort:</span>
                                <span className="font-bold text-slate-900">{profile?.cohort || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Status:</span>
                                <span className="font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full text-xs uppercase">Pending</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/" className="block w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const handleMarkAllAsRead = () => {
        // Placeholder for future logic
        alert("All announcements marked as read!");
    };

    const handleSyncToCalendar = () => {
        if (events.length === 0) {
            alert("No upcoming events to sync.");
            return;
        }

        let icsData = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//NIPA Portal//Events//EN\n";

        events.forEach(event => {
            const date = event.date.toDate();
            // iCal format: YYYYMMDDTHHmmssZ
            const formatString = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

            const startStr = formatString(date);
            // Default 2 hour duration if not specified
            const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
            const endStr = formatString(endDate);

            icsData += "BEGIN:VEVENT\n";
            icsData += `UID:${event.id}@nipaportal.org\n`;
            icsData += `DTSTAMP:${formatString(new Date())}\n`;
            icsData += `DTSTART:${startStr}\n`;
            icsData += `DTEND:${endStr}\n`;
            icsData += `SUMMARY:${event.title}\n`;
            icsData += `LOCATION:${event.location}\n`;
            icsData += "END:VEVENT\n";
        });

        icsData += "END:VCALENDAR";

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'nipa-upcoming-events.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                                        <p className="text-xs font-bold uppercase text-slate-500 tracking-widest">Financial Standing</p>
                                        <div className="flex items-center gap-4">
                                            <p className="text-3xl font-black text-slate-900">Paid through Dec 2026</p>
                                            <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">Active</span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Membership ID: <span className="text-slate-900">NIPA-{new Date().getFullYear()}-{profile?.uid.substring(0, 4).toUpperCase()}</span></p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Link href="/payments" className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-bold hover:brightness-105 transition-all shadow-lg shadow-primary/20">Pay Dues</Link>
                                        <Link href="/payments?tab=history" className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-200 transition-all text-center">View History</Link>
                                    </div>
                                </div>
                                <div className="hidden sm:flex w-56 h-36 bg-primary/5 rounded-2xl items-center justify-center border-2 border-dashed border-primary/20">
                                    <span className="material-symbols-outlined text-6xl text-primary/30">verified_user</span>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-xl font-bold text-slate-900">Latest Announcements</h3>
                                    <button onClick={handleMarkAllAsRead} className="text-sm font-bold text-primary hover:underline">Mark all as read</button>
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
                                                    <span className="text-xs text-slate-500 font-medium">{item.createdAt.toDate().toLocaleDateString()}</span>
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
                                    <h3 className="text-xl font-bold text-slate-900">{currentMonthName} Celebrants</h3>
                                    <div className="flex gap-2">
                                        <button className="size-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                                        <button className="size-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
                                    </div>
                                </div>
                                <div className="flex gap-8 overflow-x-auto pb-4 custom-scrollbar">
                                    {fetchingData ? (
                                        <div className="flex justify-center w-full py-4"><span className="material-symbols-outlined animate-spin text-primary pr-2">progress_activity</span></div>
                                    ) : celebrants.length > 0 ? (
                                        celebrants.map(user => {
                                            const todayDay = new Date().getDate();
                                            const isToday = user.birthDay === todayDay;
                                            const isPast = (user.birthDay || 0) < todayDay;

                                            // Extract initials safely
                                            const initials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'M';

                                            return (
                                                <div key={user.id} className={`flex flex-col items-center gap-3 min-w-[110px] group cursor-pointer ${isPast ? 'opacity-60' : ''}`}>
                                                    <div className={`size-20 flex items-center justify-center rounded-full bg-slate-100 border-4 border-white shadow-md transition-transform group-hover:scale-105 ${isToday ? 'ring-2 ring-primary text-primary' : 'ring-1 ring-slate-100 text-slate-500'}`}>
                                                        <span className="text-2xl font-black">{initials}</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm font-bold text-slate-900 truncate max-w-[100px]">{user.name.split(' ')[0]}</p>
                                                        <p className={`text-[10px] font-black uppercase tracking-wider ${isToday ? 'text-primary' : 'text-slate-500'}`}>
                                                            {isToday ? 'Today' : `${currentMonthName.substring(0, 3)} ${user.birthDay}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="w-full text-center py-6 text-sm text-slate-500 font-medium">No birthdays scheduled for this month.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 lg:col-span-4 space-y-8">
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
                                <div className="flex items-center gap-2 relative z-10">
                                    <span className="material-symbols-outlined text-primary">bolt</span>
                                    <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
                                </div>
                                <div className="grid gap-4 relative z-10">
                                    <Link className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group border border-slate-100 active:scale-95" href="/resources?category=Constitution">
                                        <div className="size-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                                            <span className="material-symbols-outlined text-primary">description</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900">Download Constitution</span>
                                            <span className="text-[10px] text-slate-500 font-medium">PDF • 4.2 MB</span>
                                        </div>
                                        <span className="material-symbols-outlined ml-auto text-slate-400 group-hover:text-primary transition-colors">download</span>
                                    </Link>
                                    <Link className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group border border-slate-100 active:scale-95" href="/resources?category=Manuals">
                                        <div className="size-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                                            <span className="material-symbols-outlined text-accent-purple">history_edu</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900">Policy Manual</span>
                                            <span className="text-[10px] text-slate-500 font-medium">Updated Sept 2024</span>
                                        </div>
                                        <span className="material-symbols-outlined ml-auto text-slate-400 group-hover:text-accent-purple transition-colors">arrow_forward</span>
                                    </Link>
                                    <Link className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group border border-slate-100 active:scale-95" href="/contact?subject=Strategic Initiative Proposal">
                                        <div className="size-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                                            <span className="material-symbols-outlined text-primary">campaign</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900">Submit Proposal</span>
                                            <span className="text-[10px] text-slate-500 font-medium">Strategic Initiative</span>
                                        </div>
                                        <span className="material-symbols-outlined ml-auto text-slate-400 group-hover:text-primary transition-colors">add_circle</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Upcoming Events</h3>
                                    <Link className="text-xs font-bold text-primary hover:underline" href="/events">See All</Link>
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
                                                    <span className="text-[10px] font-black text-slate-500 uppercase leading-none mb-1">
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

                                <button onClick={handleSyncToCalendar} className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold mt-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">Sync to Calendar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
