import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

// In-memory storage for events
const events = new Map();

// Initialize with mock data
if (events.size === 0) {
    const mockEvents = [
        {
            id: '1',
            title: 'National Strategy Plenary 2024',
            description: 'Annual strategic planning session for all NIPA members',
            date: new Date('2024-11-12'),
            time: '09:00 AM',
            location: 'Main Auditorium, Abuja',
            type: 'summit',
            capacity: 500,
            registered: 342,
            status: 'upcoming',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            title: 'NIPA Gala & Awards Dinner',
            description: 'Annual fundraising gala celebrating excellence',
            date: new Date('2024-11-24'),
            time: '07:00 PM',
            location: 'Grand Ballroom, Eko Hotel, Lagos',
            type: 'gala',
            capacity: 300,
            registered: 287,
            status: 'upcoming',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    mockEvents.forEach(event => events.set(event.id, event));
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || 'all';

        let allEvents = Array.from(events.values());

        if (status !== 'all') {
            allEvents = allEvents.filter(event => event.status === status);
        }

        // Sort by date
        allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

        return NextResponse.json({
            success: true,
            events: allEvents,
            total: allEvents.length
        });

    } catch (error) {
        console.error('Get events error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
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

        const id = `event_${Date.now()}`;
        const now = new Date();

        const event = {
            id,
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

        events.set(id, event);

        return NextResponse.json({
            success: true,
            message: 'Event created successfully',
            event
        }, { status: 201 });

    } catch (error) {
        console.error('Create event error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}
