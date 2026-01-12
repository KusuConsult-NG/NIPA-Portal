declare module 'react-paystack' {
    export interface PaystackProps {
        publicKey: string;
        email: string;
        amount: number;
        reference?: string;
        metadata?: Record<string, unknown>;
        currency?: string;
        channels?: string[];
        label?: string;
        onSuccess?: (reference: Reference) => void;
        onClose?: () => void;
        subaccount?: string;
        transaction_charge?: number;
        bearer?: string;
        split?: Record<string, unknown>;
        split_code?: string;
        plan?: string;
        quantity?: number;
        firstname?: string;
        lastname?: string;
        phone?: string;
        embed?: boolean;
    }

    interface Reference {
        message: string;
        reference: string;
        status: string;
        trans: string;
        transaction: string;
        trxref: string;
    }

    export const usePaystackPayment: (config: PaystackProps) => (onSuccess?: (reference: Reference) => void, onClose?: () => void) => void;
    export const PaystackButton: React.FC<PaystackProps & { className?: string; text?: string; children?: React.ReactNode }>;
    export const PaystackConsumer: React.ComponentType<PaystackProps & { children: (initializePayment: (onSuccess?: (reference: Reference) => void, onClose?: () => void) => void) => React.ReactNode }>;
}
