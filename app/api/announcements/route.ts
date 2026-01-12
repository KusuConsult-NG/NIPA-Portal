import { NextResponse } from 'next/server';
import { mockAnnouncements } from '@/lib/mockData';

export async function GET() {
    return NextResponse.json({
        announcements: mockAnnouncements,
        total: mockAnnouncements.length
    });
}
