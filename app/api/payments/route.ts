import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) return authResult;
        const user = authResult;

        const { searchParams } = new URL(request.url);
        const memberId = searchParams.get('memberId') || user.userId;

        // Non-admin users can only see their own payments
        if (user.role !== 'admin' && memberId !== user.userId) {
            return NextResponse.json(
                { error: 'Forbidden', message: 'Access denied' },
                { status: 403 }
            );
        }

        let query: FirebaseFirestore.Query = adminDb.collection('payments');

        if (memberId) {
            query = query.where('memberId', '==', memberId);
        }

        // Sort by date descending (requires index in Firestore usually, but okay for small sets)
        // Note: 'transactionDate' or 'createdAt'
        query = query.orderBy('createdAt', 'desc');

        const snapshot = await query.get();
        const allPayments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert timestamps to ISO strings or Date objects as needed by frontend
            transactionDate: (doc.data().transactionDate as FirebaseFirestore.Timestamp)?.toDate(),
            createdAt: (doc.data().createdAt as FirebaseFirestore.Timestamp)?.toDate()
        }));

        return NextResponse.json({
            success: true,
            payments: allPayments,
            total: allPayments.length
        });

    } catch (error) {
        console.error('Get payments error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) return authResult;
        const user = authResult;

        const body = await request.json();
        const { amount, description, category } = body;

        // Validation
        if (!amount || !description || !category) {
            return NextResponse.json(
                { error: 'Validation error', message: 'Amount, description, and category are required' },
                { status: 400 }
            );
        }

        if (amount <= 0) {
            return NextResponse.json(
                { error: 'Validation error', message: 'Amount must be greater than 0' },
                { status: 400 }
            );
        }

        const now = new Date();

        const paymentData = {
            memberId: user.userId,
            amount: Number(amount),
            description,
            category,
            status: 'successful',
            transactionDate: now,
            receiptUrl: `#receipt-${Date.now()}`, // Placeholder logic
            createdAt: now
        };

        const docRef = await adminDb.collection('payments').add(paymentData);

        return NextResponse.json({
            success: true,
            message: 'Payment processed successfully',
            payment: {
                id: docRef.id,
                ...paymentData
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Create payment error:', error);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred' },
            { status: 500 }
        );
    }
}
