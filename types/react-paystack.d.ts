declare module 'react-paystack' {
    export interface PaystackProps {
        publicKey: string;
        email: string;
        amount: number;
        reference?: string;
        metadata?: any;
        currency?: string;
        channels?: string[];
        label?: string;
        onSuccess?: (reference: any) => void;
        onClose?: () => void;
        subaccount?: string;
        transaction_charge?: number;
        bearer?: string;
        split?: any;
        split_code?: string;
        plan?: string;
        quantity?: number;
        firstname?: string;
        lastname?: string;
        phone?: string;
        embed?: boolean;
    }

    export const usePaystackPayment: (config: PaystackProps) => (onSuccess?: (reference: any) => void, onClose?: () => void) => void;
    export const PaystackButton: React.FC<PaystackProps & { className?: string; text?: string; children?: React.ReactNode }>;
    export const PaystackConsumer: React.ComponentType<PaystackProps & { children: (initializePayment: (onSuccess?: (reference: any) => void, onClose?: () => void) => void) => React.ReactNode }>;
}
