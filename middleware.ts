import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session');

    // Protected routes
    const protectedPaths = ['/dashboard', '/profile', '/payments', '/admin', '/welfare', '/elections', '/messages', '/notifications'];
    const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

    if (isProtectedPath && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // In a real app with cookie-based auth, we'd verify the token claims here.
        // For this client-side firebase implementation, we can't fully verify the role in middleware
        // without an Admin SDK check which is not supported in Edge Middleware.
        // We will rely on server-side checks in API routes and client-side checks in layout/pages.

        // However, if no session at all, we already redirected above.
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/payments/:path*', '/admin/:path*', '/welfare/:path*', '/elections/:path*', '/messages/:path*', '/notifications/:path*'],
};
