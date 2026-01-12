import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    return NextResponse.json(
        { error: 'Not Implemented', message: 'Please use Firebase Client SDK for login' },
        { status: 501 }
    );
}
