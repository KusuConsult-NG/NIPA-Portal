import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const snapshot = await adminDb.collection('announcements')
            .orderBy('publishedAt', 'desc')
            .limit(20)
            .get();

        const announcements = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // Ensure dates are parsed properly for the client
                publishedAt: data.publishedAt ? (data.publishedAt.toDate ? data.publishedAt.toDate().toISOString() : data.publishedAt) : new Date().toISOString()
            };
        });

        // Fallback for empty production DB to prevent UI errors exactly as requested in Lockdown (Zero visible errors)
        // If empty, return empty array instead of mock Data.

        return NextResponse.json({
            announcements: announcements,
            total: announcements.length
        });
    } catch (error) {
        console.error('Error fetching announcements API:', error);
        return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
    }
}
