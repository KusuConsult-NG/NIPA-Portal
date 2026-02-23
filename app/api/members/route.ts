import { NextResponse } from 'next/server';
import { listUsers } from '@/lib/firestore';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const cohort = searchParams.get('cohort');
    const status = searchParams.get('status');

    try {
        // Fetch users using the existing firestore function
        // We use a high limit for the directory, or we should implement pagination on the frontend
        const { users } = await listUsers({
            limit: 1000,
            status: status !== 'all' && status ? status : undefined,
            // cohort is not a direct parameter in listUsers, so we filter it post-fetch if needed
        });

        let filteredMembers = users;

        // Apply search filter
        if (search) {
            filteredMembers = filteredMembers.filter(member =>
                member.name.toLowerCase().includes(search.toLowerCase()) ||
                member.profession.toLowerCase().includes(search.toLowerCase()) ||
                (member.location || '').toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply cohort filter
        if (cohort && cohort !== 'all') {
            filteredMembers = filteredMembers.filter(member =>
                member.cohort === cohort
            );
        }

        return NextResponse.json({
            members: filteredMembers,
            total: filteredMembers.length
        });
    } catch (error) {
        console.error('Error fetching members API:', error);
        return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
    }
}
