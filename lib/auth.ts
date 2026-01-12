import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from './firebase-admin';

export interface JWTPayload {
    userId: string;
    email: string;
    role: 'member' | 'admin' | 'welfare';
    iat?: number;
    exp?: number;
}

/**
 * Verify Firebase ID Token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        return {
            userId: decodedToken.uid,
            email: decodedToken.email || '',
            // Role would typically come from custom claims or a user document lookup
            // For now, defaulting to 'member' or checking email domain/claims if set
            role: (decodedToken.role as 'member' | 'admin' | 'welfare') || 'member',
            iat: decodedToken.iat,
            exp: decodedToken.exp
        };
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

/**
 * Get user from request
 */
export async function getUserFromRequest(request: NextRequest): Promise<JWTPayload | null> {
    const token = request.cookies.get('auth_token')?.value ||
        request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) return null;

    return await verifyToken(token);
}

/**
 * Middleware to protect routes
 */
export async function requireAuth(request: NextRequest) {
    const user = await getUserFromRequest(request);

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized', message: 'Authentication required' },
            { status: 401 }
        );
    }

    return user;
}

/**
 * Middleware to require admin role
 */
export async function requireAdmin(request: NextRequest) {
    const user = await getUserFromRequest(request);

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
