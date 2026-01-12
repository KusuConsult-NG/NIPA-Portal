'use client';

import { useState } from 'react';

export default function NotificationsPage() {
    const [filter, setFilter] = useState('all');

    const notifications = [
        {
            id: 1,
            title: 'Payment Confirmation',
            message: 'Your payment of ₦5,000 for monthly dues has been received.',
            type: 'payment',
            read: false,
            timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 mins ago
            icon: 'payments',
            color: 'green'
        },
        {
            id: 2,
            title: 'New Event: National Strategy Plenary',
            message: 'Registration is now open for the National Strategy Plenary 2024.',
            type: 'event',
            read: false,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            icon: 'event',
            color: 'blue'
        },
        {
            id: 3,
            title: 'Election Nomination Deadline',
            message: 'Reminder: Nomination forms must be submitted by November 10th.',
            type: 'election',
            read: true,
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            icon: 'how_to_vote',
            color: 'purple'
        },
        {
            id: 4,
            title: 'Birthday Greeting',
            message: 'Happy Birthday from the NIPA community!',
            type: 'welfare',
            read: true,
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            icon: 'cake',
            color: 'pink'
        },
        {
            id: 5,
            title: 'New Policy Paper Published',
            message: 'Economic Policy Recommendations 2024 is now available in the resources library.',
            type: 'resource',
            read: true,
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            icon: 'description',
            color: 'orange'
        }
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    const getRelativeTime = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    return (
        <div className="min-h-screen bg-[--color-background-light]">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black flex items-center gap-3">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="px-3 py-1 bg-[--color-primary] text-white text-sm font-bold rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Stay updated with NIPA activities</p>
                    </div>
                    <button className="text-sm font-bold text-[--color-primary] hover:underline">
                        Mark all as read
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-8">
                {/* Filters */}
                <div className="flex gap-3 mb-8 flex-wrap">
                    {['all', 'unread', 'events', 'payments', 'elections'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filter === f
                                    ? 'bg-[--color-primary] text-white shadow-lg'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:border-[--color-primary]/30'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer ${notification.read
                                    ? 'border-slate-200 hover:border-slate-300'
                                    : 'border-[--color-primary]/30 bg-[--color-primary]/5 hover:border-[--color-primary]/50'
                                }`}
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
                                            <button className="text-xs font-bold text-[--color-primary] hover:underline">
                                                Mark as read
                                            </button>
                                            <button className="text-xs font-bold text-slate-400 hover:text-slate-600">
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Unread Indicator */}
                                {!notification.read && (
                                    <div className="shrink-0 size-3 bg-[--color-primary] rounded-full mt-2"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                            <span className="material-symbols-outlined text-slate-400 text-4xl">notifications_off</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">No notifications</h3>
                        <p className="text-slate-500">You're all caught up!</p>
                    </div>
                )}

                {/* Load More */}
                <div className="text-center mt-8">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:border-[--color-primary]/30 transition-all">
                        Load More
                    </button>
                </div>
            </main>
        </div>
    );
}
