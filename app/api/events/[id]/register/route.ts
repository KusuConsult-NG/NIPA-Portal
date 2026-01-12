import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

// In-memory storage for event registrations
const registrations = new Map(); // eventId -> Set of userIds

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) return authResult;
        const user = authResult;

        const { id } = await context.params;
        const eventId = id;

        // Get or create registrations set for this event
        if (!registrations.has(eventId)) {
            registrations.set(eventId, new Set());
        }

        const eventRegistrations = registrations.get(eventId);

        // Check if already registered
        if (eventRegistrations.has(user.userId)) {
            return NextResponse.json(
                { error: 'Already registered', message: 'You are already registered for this event' },
                { status: 409 }
            );
        }

        // Register user
        eventRegistrations.add(user.userId);

        return NextResponse.json({
            success: true,
            message: 'Successfully registered for event',
            eventId,
            registeredCount: eventRegistrations.size
        }, { status: 201 });

    } catch (error) {
        console.error('Event registration error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) return authResult;
        const user = authResult;

        const { id } = await context.params;
        const eventId = id;

        if (!registrations.has(eventId)) {
            return NextResponse.json(
                { error: 'Not found', message: 'Not registered for this event' },
                { status: 404 }
            );
        }

        const eventRegistrations = registrations.get(eventId);

        if (!eventRegistrations.has(user.userId)) {
            return NextResponse.json(
                { error: 'Not found', message: 'Not registered for this event' },
                { status: 404 }
            );
        }

        // Unregister user
        eventRegistrations.delete(user.userId);

        return NextResponse.json({
            success: true,
            message: 'Successfully unregistered from event',
            eventId
        });

    } catch (error) {
        console.error('Event unregistration error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}
