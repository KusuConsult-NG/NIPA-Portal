'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function SeedPage() {
    const { user, profile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string>('');

    const seedData = async () => {
        if (!user) {
            setStatus('Error: You must be logged in to seed data.');
            return;
        }

        setLoading(true);
        setStatus('Starting seed...');

        try {
            // Seed Announcements
            const announcementsRef = collection(db, 'announcements');
            await addDoc(announcementsRef, {
                title: 'New Policy Update: Healthcare Benefits',
                content: 'We are pleased to announce updated healthcare benefits for all registered members effective immediately. Please check the resources section for the full policy document.',
                category: 'Policy',
                priority: 'high',
                createdAt: Timestamp.now(),
                authorId: user.uid,
                authorName: profile?.name || 'Admin'
            });

            await addDoc(announcementsRef, {
                title: 'Constitution Review Committee',
                content: 'The committee has been formed. Submissions for constitutional amendments are now open until the end of the month.',
                category: 'General',
                priority: 'medium',
                createdAt: Timestamp.fromMillis(Date.now() - 86400000), // Yesterday
                authorId: user.uid,
                authorName: profile?.name || 'Admin'
            });

            // Seed Events
            const eventsRef = collection(db, 'events');

            // Event 1: Next week
            const date1 = new Date();
            date1.setDate(date1.getDate() + 7);
            await addDoc(eventsRef, {
                title: 'National Strategy Plenary',
                description: 'A gathering of policy makers to discuss the national strategic roadmap for the coming fiscal year.',
                date: Timestamp.fromDate(date1),
                location: 'Main Auditorium, Abuja',
                type: 'Conference',
                virtualLink: 'https://zoom.us/j/example',
                time: '09:00 AM',
                organizer: 'NIPA Secretariat'
            });

            // Event 2: In 2 weeks
            const date2 = new Date();
            date2.setDate(date2.getDate() + 14);
            await addDoc(eventsRef, {
                title: 'Annual Gala & Awards Night',
                description: 'Celebrating excellence in public service and policy making.',
                date: Timestamp.fromDate(date2),
                location: 'Transcorp Hilton',
                type: 'Social',
                time: '07:00 PM',
                organizer: 'Events Committee'
            });

            // Event 3: In 3 weeks
            const date3 = new Date();
            date3.setDate(date3.getDate() + 21);
            await addDoc(eventsRef, {
                title: 'General Election 2025',
                description: 'Voting for new executive council members.',
                date: Timestamp.fromDate(date3),
                location: 'Online / Main Hall',
                type: 'Election',
                time: '08:00 AM',
                organizer: 'Electoral Board'
            });

            setStatus('Success! Database seeded with Announcements and Events.');
        } catch (error: any) {
            console.error('Seeding error:', error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Database Seeder</h1>

            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                <p className="mb-4 text-slate-600">
                    Use this utility to populate the Firestore database with sample Announcements and Events for demonstration purposes.
                </p>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
                    <p className="text-sm text-yellow-800">
                        <strong>Warning:</strong> This will add new documents to the `announcements` and `events` collections. It does not delete existing data.
                    </p>
                </div>

                {status && (
                    <div className={`p-4 rounded-md mb-6 ${status.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {status}
                    </div>
                )}

                <button
                    onClick={seedData}
                    disabled={loading}
                    className="px-6 py-3 bg-[--color-primary] text-white font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                >
                    {loading ? 'Seeding...' : 'Seed Sample Data'}
                </button>
            </div>
        </div>
    );
}
