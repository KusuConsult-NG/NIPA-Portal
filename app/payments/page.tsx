'use client';

import dynamic from 'next/dynamic';

const PaymentContent = dynamic(() => import('./PaymentContent'), { ssr: false });

export default function PaymentsPage() {
    return <PaymentContent />;
}
