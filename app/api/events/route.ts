import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || 'all';

        let query: FirebaseFirestore.Query = adminDb.collection('events');

        if (status !== 'all') {
            query = query.where('status', '==', status);
        }

        const snapshot = await query.orderBy('date', 'asc').get();

        const allEvents = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                date: data.date ? (data.date.toDate ? data.date.toDate().toISOString() : data.date) : null,
                createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) : null,
                updatedAt: data.updatedAt ? (data.updatedAt.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt) : null,
            };
        });

        // Fallback or empty array is handled implicitly by Firestore returning empty docs

        return NextResponse.json({
            success: true,
            events: allEvents,
            total: allEvents.length
        });

    } catch (error) {
        console.error('Get events error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred fetching events' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAdmin(request);
        if (authResult instanceof NextResponse) return authResult;

        const body = await request.json();
        const { title, description, date, time, location, type, capacity } = body;

        // Validation
        if (!title || !description || !date || !location) {
            return NextResponse.json(
                { error: 'Validation error', message: 'Required fields missing' },
                { status: 400 }
            );
        }

        const now = new Date();

        const eventData = {
            title,
            description,
            date: new Date(date),
            time: time || '12:00 PM',
            location,
            type: type || 'meeting',
            capacity: capacity || 100,
            registered: 0,
            status: 'upcoming',
            createdAt: now,
            updatedAt: now
        };

        const docRef = await adminDb.collection('events').add(eventData);

        return NextResponse.json({
            success: true,
            message: 'Event created successfully',
            event: { id: docRef.id, ...eventData, date: eventData.date.toISOString(), createdAt: eventData.createdAt.toISOString(), updatedAt: eventData.updatedAt.toISOString() }
        }, { status: 201 });

    } catch (error) {
        console.error('Create event error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred creating the event' },
            { status: 500 }
        );
    }
}
