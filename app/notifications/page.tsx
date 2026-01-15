'use client';

import { useState, useEffect } from 'react';
import MemberSidebar from '@/components/layout/MemberSidebar';
import { useAuth } from '@/context/AuthContext';
import { collection, query, orderBy, limit, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'payment' | 'event' | 'election' | 'welfare' | 'resource' | 'general';
    read: boolean;
    timestamp: Timestamp;
    icon: string;
    color: string;
    userId?: string;
}

export default function NotificationsPage() {
    const { user } = useAuth();
    const [filter, setFilter] = useState('all');
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return;

            setLoading(true);
            try {
                const notificationsRef = collection(db, 'notifications');
                const q = query(
                    notificationsRef,
                    orderBy('timestamp', 'desc'),
                    limit(50)
                );
                const snapshot = await getDocs(q);
                const notificationsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Notification[];

                // Filter to only show notifications for this user
                const userNotifications = notificationsData.filter(
                    n => !n.userId || n.userId === user.uid
                );

                setNotifications(userNotifications);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !n.read;
        if (filter === 'events') return n.type === 'event';
        if (filter === 'payments') return n.type === 'payment';
        if (filter === 'elections') return n.type === 'election';
        return true;
    });

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            const notifRef = doc(db, 'notifications', notificationId);
            await updateDoc(notifRef, { read: true });

            setNotifications(prev =>
                prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            const unreadNotifications = notifications.filter(n => !n.read);
            await Promise.all(
                unreadNotifications.map(n =>
                    updateDoc(doc(db, 'notifications', n.id), { read: true })
                )
            );

            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const getRelativeTime = (timestamp: Timestamp) => {
        const date = timestamp.toDate();
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-background-main">
                <MemberSidebar />
                <main className="flex-1 ml-72 flex items-center justify-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background-main font-sans text-slate-900">
            <MemberSidebar />

            <main className="flex-1 ml-72">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div>
                        <h1 className="text-2xl font-black flex items-center gap-3">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Stay updated with NIPA activities</p>
                    </div>
                    <button
                        onClick={handleMarkAllAsRead}
                        disabled={unreadCount === 0}
                        className="text-sm font-bold text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Mark all as read
                    </button>
                </header>

                <div className="max-w-4xl mx-auto p-8">
                    {/* Filters */}
                    <div className="flex gap-3 mb-8 flex-wrap">
                        {['all', 'unread', 'events', 'payments', 'elections'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filter === f
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/30'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-4">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer hover:shadow-lg ${notification.read
                                            ? 'border-slate-200 hover:border-slate-300'
                                            : 'border-primary/30 bg-primary/5 hover:border-primary/50'
                                        }`}
                                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                                >
                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div className={`shrink-0 size-12 rounded-xl flex items-center justify-center ${notification.color === 'green' ? 'bg-green-100' :
                                                notification.color === 'blue' ? 'bg-blue-100' :
                                                    notification.color === 'purple' ? 'bg-purple-100' :
                                                        notification.color === 'pink' ? 'bg-pink-100' :
                                                            'bg-orange-100'
                                            }`}>
                                            <span className={`material-symbols-outlined ${notification.color === 'green' ? 'text-green-600' :
                                                    notification.color === 'blue' ? 'text-blue-600' :
                                                        notification.color === 'purple' ? 'text-purple-600' :
                                                            notification.color === 'pink' ? 'text-pink-600' :
                                                                'text-orange-600'
                                                }`}>
                                                {notification.icon}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className={`font-bold ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                                                    {notification.title}
                                                </h3>
                                                <span className="text-xs text-slate-400 font-medium shrink-0 ml-4">
                                                    {getRelativeTime(notification.timestamp)}
                                                </span>
                                            </div>
                                            <p className={`text-sm leading-relaxed ${notification.read ? 'text-slate-500' : 'text-slate-600'}`}>
                                                {notification.message}
                                            </p>

                                            {!notification.read && (
                                                <div className="flex items-center gap-4 mt-4">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleMarkAsRead(notification.id);
                                                        }}
                                                        className="text-xs font-bold text-primary hover:underline"
                                                    >
                                                        Mark as read
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Unread Indicator */}
                                        {!notification.read && (
                                            <div className="shrink-0 size-3 bg-primary rounded-full mt-2"></div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                                    <span className="material-symbols-outlined text-slate-400 text-4xl">notifications_off</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">No notifications</h3>
                                <p className="text-slate-500">You&apos;re all caught up!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
