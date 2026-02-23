import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
    try {
        const bodyText = await request.text();
        const signature = request.headers.get('x-paystack-signature');

        const secret = process.env.PAYSTACK_SECRET_KEY;
        if (!secret) {
            console.error('Webhook Error: Missing PAYSTACK_SECRET_KEY');
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }

        // Verify signature
        if (!signature) {
            return NextResponse.json({ message: 'Missing signature' }, { status: 401 });
        }

        const hash = crypto.createHmac('sha512', secret).update(bodyText).digest('hex');
        if (hash !== signature) {
            return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
        }

        const payload = JSON.parse(bodyText);
        const event = payload.event;
        const data = payload.data;

        if (event === 'charge.success') {
            const reference = data.reference;
            const amount = data.amount / 100;
            const metadata = data.metadata?.custom_fields || [];

            const categoryField = metadata.find((f: any) => f.variable_name === 'category');
            const memberIdField = metadata.find((f: any) => f.variable_name === 'memberId');

            const category = categoryField?.value || 'General';
            const memberId = memberIdField?.value || data.customer.email || 'unknown';

            const now = new Date();
            const paymentRef = adminDb.collection('payments').doc(reference);

            // Use transaction for absolute atomicity and locking against concurrent webhooks/client calls
            await adminDb.runTransaction(async (t) => {
                const doc = await t.get(paymentRef);

                // If it already exists, the client-side `/verify` endpoint beat the webhook, or this is a retry.
                // Either way, it's idempotent. We just return success.
                if (doc.exists) {
                    return;
                }

                const paymentData = {
                    memberId: memberId,
                    amount: amount,
                    description: `Webhook: ${category}`,
                    category: category,
                    status: 'successful',
                    transactionDate: now,
                    receiptUrl: `#receipt-${reference}`,
                    createdAt: now,
                    reference: reference, // Store reference for idempotency
                    provider: 'paystack',
                    metadata: data.metadata || {},
                    viaWebhook: true
                };

                t.set(paymentRef, paymentData);
            });
        }

        // Paystack requires a 200 OK immediately
        return NextResponse.json({ message: 'Webhook processed successfully' });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Webhook error:', error.message);
        return NextResponse.json({ message: 'Webhook failed' }, { status: 500 });
    }
}
