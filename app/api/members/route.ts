import { NextResponse } from 'next/server';
import { mockMembers } from '@/lib/mockData';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const cohort = searchParams.get('cohort');
    const status = searchParams.get('status');

    let filteredMembers = mockMembers;

    // Apply search filter
    if (search) {
        filteredMembers = filteredMembers.filter(member =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.profession.toLowerCase().includes(search.toLowerCase()) ||
            member.location.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Apply cohort filter
    if (cohort && cohort !== 'all') {
        filteredMembers = filteredMembers.filter(member =>
            member.cohort === cohort
        );
    }

    // Apply status filter
    if (status && status !== 'all') {
        filteredMembers = filteredMembers.filter(member =>
            member.status === status
        );
    }

    return NextResponse.json({
        members: filteredMembers,
        total: filteredMembers.length
    });
}
