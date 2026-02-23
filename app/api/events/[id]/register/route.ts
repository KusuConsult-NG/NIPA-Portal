import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';

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

        const result = await adminDb.runTransaction(async (t) => {
            const eventRef = adminDb.collection('events').doc(eventId);
            const registrationRef = eventRef.collection('registrations').doc(user.userId);

            const [eventDoc, registrationDoc] = await Promise.all([
                t.get(eventRef),
                t.get(registrationRef)
            ]);

            if (!eventDoc.exists) {
                throw new Error('Event does not exist');
            }

            if (registrationDoc.exists) {
                throw new Error('Already registered');
            }

            // Register user
            t.set(registrationRef, {
                userId: user.userId,
                registeredAt: new Date().toISOString()
            });

            return true;
        });

        // Optional: Count can be fetched separately if needed, but omitted here for speed.
        return NextResponse.json({
            success: true,
            message: 'Successfully registered for event',
            eventId
        }, { status: 201 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Event registration error:', error);
        if (error.message === 'Already registered') {
            return NextResponse.json(
                { error: 'Already registered', message: 'You are already registered for this event' },
                { status: 409 }
            );
        }
        if (error.message === 'Event does not exist') {
            return NextResponse.json(
                { error: 'Not found', message: 'Event not found' },
                { status: 404 }
            );
        }
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

        await adminDb.runTransaction(async (t) => {
            const registrationRef = adminDb.collection('events').doc(eventId).collection('registrations').doc(user.userId);
            const registrationDoc = await t.get(registrationRef);

            if (!registrationDoc.exists) {
                throw new Error('Not registered');
            }

            t.delete(registrationRef);
        });

        return NextResponse.json({
            success: true,
            message: 'Successfully unregistered from event',
            eventId
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Event unregistration error:', error);
        if (error.message === 'Not registered') {
            return NextResponse.json(
                { error: 'Not found', message: 'Not registered for this event' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}
