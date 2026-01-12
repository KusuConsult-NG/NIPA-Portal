import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/firebaseAdmin';

export interface AuthUser {
    uid: string;
    email: string;
    role: 'member' | 'admin' | 'welfare';
}

/**
 * Middleware to verify Firebase token from request
 */
export async function verifyRequest(request: NextRequest): Promise<AuthUser | null> {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyFirebaseToken(token);

    if (!decodedToken) {
        return null;
    }

    return {
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        role: decodedToken.role || 'member'
    };
}

/**
 * Require authentication middleware
 */
export async function requireAuth(request: NextRequest) {
    const user = await verifyRequest(request);

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized', message: 'Authentication required' },
            { status: 401 }
        );
    }

    return user;
}

/**
 * Require admin role middleware
 */
export async function requireAdmin(request: NextRequest) {
    const user = await verifyRequest(request);

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized', message: 'Authentication required' },
            { status: 401 }
        );
    }

    if (user.role !== 'admin') {
        return NextResponse.json(
            { error: 'Forbidden', message: 'Admin access required' },
            { status: 403 }
        );
    }

    return user;
}
