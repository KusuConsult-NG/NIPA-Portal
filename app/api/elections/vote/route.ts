import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) return authResult;
        const user = authResult;

        const body = await request.json();
        const { electionId, votes } = body;

        if (!electionId || !votes || Object.keys(votes).length === 0) {
            return NextResponse.json(
                { error: 'Validation error', message: 'Missing electionId or votes payload' },
                { status: 400 }
            );
        }

        await adminDb.runTransaction(async (t) => {
            // 1. Verify election is active
            const electionRef = adminDb.collection('elections').doc(electionId);
            const electionDoc = await t.get(electionRef);

            if (!electionDoc.exists || electionDoc.data()?.status !== 'active') {
                throw new Error('Election is not active or does not exist.');
            }

            // 2. Verify user hasn't voted (Idempotency and Anti-Fraud)
            const userVoteRef = electionRef.collection('votes').doc(user.userId);
            const userVoteDoc = await t.get(userVoteRef);

            if (userVoteDoc.exists) {
                throw new Error('Double voting attempt rejected. You have already cast your ballot.');
            }

            // 3. Write immutable vote
            t.set(userVoteRef, {
                id: user.userId,
                votes,
                timestamp: new Date().toISOString()
            });
        });

        return NextResponse.json({
            success: true,
            message: 'Vote cast successfully. Your ballot is secured.'
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Vote casting error:', error.message);
        return NextResponse.json(
            { error: 'Server or Validation Error', message: error.message },
            { status: 400 }
        );
    }
}
