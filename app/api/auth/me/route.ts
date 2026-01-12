import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { findUserById } from '@/lib/firebase-admin-db';

export async function GET(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized', message: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Get full user data
        const fullUser = await findUserById(user.userId);

        if (!fullUser) {
            return NextResponse.json(
                { error: 'Not found', message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user: fullUser
        });

    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}
