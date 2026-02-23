import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';
import axios from 'axios';

export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth(request);
        if (authResult instanceof NextResponse) return authResult;
        const user = authResult;

        const body = await request.json();
        const { reference, metadata } = body;

        if (!reference) {
            return NextResponse.json(
                { error: 'Validation error', message: 'Transaction reference is required' },
                { status: 400 }
            );
        }

        // Verify with Paystack
        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecretKey) {
            throw new Error('PAYSTACK_SECRET_KEY is not configured');
        }

        const verifyResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`
            }
        });

        const transactionData = verifyResponse.data?.data;

        if (transactionData?.status !== 'success') {
            return NextResponse.json(
                { success: false, message: 'Transaction verification failed' },
                { status: 400 }
            );
        }

        // Check availability of required data
        const amount = transactionData.amount / 100; // Paystack returns amount in kobo
        const now = new Date();

        const paymentRef = adminDb.collection('payments').doc(reference);

        // Use transaction for absolute atomicity and locking against concurrent webhooks/client calls
        const paymentRecord = await adminDb.runTransaction(async (t) => {
            const doc = await t.get(paymentRef);

            if (doc.exists) {
                return { isNew: false, data: doc.data() };
            }

            const paymentData = {
                memberId: user.userId,
                amount: amount,
                description: metadata?.description || 'NIPA Payment',
                category: metadata?.category || 'General',
                status: 'successful',
                transactionDate: now,
                receiptUrl: `#receipt-${reference}`,
                createdAt: now,
                reference: reference, // Store reference for idempotency
                provider: 'paystack',
                metadata: transactionData.metadata || {}
            };

            t.set(paymentRef, paymentData);
            return { isNew: true, data: paymentData };
        });

        if (!paymentRecord.isNew) {
            return NextResponse.json({
                success: true,
                message: 'Payment already recorded',
                payment: { id: reference, ...paymentRecord.data }
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Payment verified and recorded',
            payment: {
                id: reference,
                ...paymentRecord.data
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Payment verification error:', error.message);
        return NextResponse.json(
            { error: 'Server error', message: 'An error occurred during verification' },
            { status: 500 }
        );
    }
}
