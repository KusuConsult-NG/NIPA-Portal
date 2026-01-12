import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { findUserById, updateUser } from '@/lib/database';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) return authResult;

        const { id } = await context.params;
        const member = await findUserById(id);

        if (!member) {
            return NextResponse.json(
                { error: 'Not found', message: 'Member not found' },
                { status: 404 }
            );
        }

        const { password, ...memberWithoutPassword } = member;

        return NextResponse.json({
            success: true,
            member: memberWithoutPassword
        });

    } catch (error) {
        console.error('Get member error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) return authResult;
        const user = authResult;

        const { id } = await context.params;

        // Check if user can update this member
        if (user.userId !== id && user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Forbidden', message: 'You can only update your own profile' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { name, phone, profession, location } = body;

        const updatedMember = await updateUser(id, {
            name,
            phone,
            profession,
            location
        });

        if (!updatedMember) {
            return NextResponse.json(
                { error: 'Not found', message: 'Member not found' },
                { status: 404 }
            );
        }

        const { password, ...memberWithoutPassword } = updatedMember;

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
            member: memberWithoutPassword
        });

    } catch (error) {
        console.error('Update member error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}
