'use client';

// import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePaystackPayment } from 'react-paystack';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import MemberSidebar from '@/components/layout/MemberSidebar';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';

interface PaymentTransaction {
    id: string;
    amount: number;
    description: string;
    category: string;
    status: string;
    transactionDate: Timestamp;
    receiptUrl?: string;
}

export default function PaymentContent() {
    const { profile, loading } = useAuth();
    // State
    const [email, setEmail] = useState('');
    // const [amount, setAmount] = useState(15000); // Default 3 months
    const [months, setMonths] = useState(3);
    const [isCustom, setIsCustom] = useState(true);
    const [category, setCategory] = useState("Membership Dues 2024");
    const [processing, setProcessing] = useState(false);

    // Transaction History State
    const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
        if (profile?.email) {
            setEmail(profile.email);
        }
    }, [profile]);

    // Fetch Transaction History
    useEffect(() => {
        const fetchHistory = async () => {
            if (!profile?.uid) return;

            try {
                const paymentsRef = collection(db, 'payments');
                const q = query(
                    paymentsRef,
                    where('memberId', '==', profile.uid),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const fetchedTransactions = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as PaymentTransaction[];

                setTransactions(fetchedTransactions);
            } catch (error) {
                console.error("Error fetching payment history:", error);
            } finally {
                setLoadingHistory(false);
            }
        };

        if (!loading && profile) {
            fetchHistory();
        }
    }, [profile, loading]);

    // Calculate total
    const baseRate = 5000;
    const discount = !isCustom ? (baseRate * 12 * 0.1) : 0;
    const totalAmount = isCustom ? (months * baseRate) : (baseRate * 12 - discount);

    useEffect(() => {
        // setAmount(totalAmount);
    }, [months, isCustom, totalAmount]);

    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: totalAmount * 100, // Paystack expects amount in kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        metadata: {
            custom_fields: [
                {
                    display_name: "Payment Category",
                    variable_name: "category",
                    value: category
                },
                {
                    display_name: "Months Paid",
                    variable_name: "months",
                    value: isCustom ? months.toString() : "12 (Annual)"
                }
            ]
        }
    };

    // Paystack Hook
    const initializePayment = usePaystackPayment(config);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = (reference: any) => {
        setProcessing(true);
        // Serve verification
        axios.post('/api/payments/verify', {
            reference: reference.reference,
            metadata: {
                description: `${category} - ${isCustom ? months + ' months' : 'Annual'}`,
                category: category
            }
        })
            .then(() => {
                alert('Payment successful and verified!');
                setProcessing(false);
                window.location.reload(); // Reload to show in history
            })
            .catch((error) => {
                console.error(error);
                alert('Payment verification failed. Please contact support.');
                setProcessing(false);
            });
    };

    const onClose = () => {
        console.log('Payment closed');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-main flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background-main font-sans text-slate-900">
            <MemberSidebar />

            <main className="flex-1 ml-72">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
                    <h2 className="text-slate-900 font-bold text-lg">Payments & Dues</h2>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-500">Rate:</span>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-black">₦5,000/mo</span>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto p-10">
                    {/* Header Section */}
                    <div className="flex flex-col gap-2 mb-10">
                        <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Dues & Payments</h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl">Manage your membership subscriptions and view secure transaction history with the National Institute.</p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Pricing */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="rounded-xl bg-white p-8 shadow-sm border border-slate-200">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Standard Rate</p>
                                        <p className="text-slate-900 text-3xl font-black">₦5,000<span className="text-lg font-medium text-slate-400">/mo</span></p>
                                    </div>
                                    <div className="p-3 bg-secondary/10 rounded-xl">
                                        <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        <span>Active Membership Status</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        <span>Full Portal Resources Access</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        <span>Voting & Participation Rights</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Payment Infrastructure</p>
                                <div className="flex gap-8 items-center opacity-70">
                                    <span className="text-slate-600 text-sm font-bold">Paystack</span>
                                    <span className="text-slate-600 text-sm font-bold">Flutterwave</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Calculator */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl bg-white p-8 shadow-sm border border-slate-200 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-slate-900 text-2xl font-black flex items-center gap-3">
                                        <span className="material-symbols-outlined text-accent-purple">calculate</span> Payment Calculator
                                    </h2>
                                    <span className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-bold">New Session {new Date().getFullYear()}</span>
                                </div>

                                <div className="space-y-8 flex-1">
                                    <div className="flex p-1.5 bg-slate-50 rounded-xl">
                                        <button
                                            onClick={() => { setIsCustom(true); setMonths(3); }}
                                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${isCustom ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-900'}`}
                                        >
                                            Custom Months
                                        </button>
                                        <button
                                            onClick={() => { setIsCustom(false); setMonths(12); }}
                                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${!isCustom ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-900'}`}
                                        >
                                            Annual Subscription (10% Off)
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Number of Months</label>
                                            <div className="relative group">
                                                <input
                                                    className="w-full h-14 rounded-xl border-2 border-slate-200 bg-slate-50/50 px-5 font-bold text-slate-900 focus:border-secondary focus:ring-0 transition-all disabled:opacity-50"
                                                    max="12"
                                                    min="1"
                                                    type="number"
                                                    value={months}
                                                    onChange={(e) => setMonths(parseInt(e.target.value) || 1)}
                                                    disabled={!isCustom}
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary material-symbols-outlined">calendar_today</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Category</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full h-14 rounded-xl border-2 border-slate-200 bg-slate-50/50 px-5 font-bold text-slate-900 focus:border-accent-purple focus:ring-0 transition-all appearance-none"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                >
                                                    <option value="Membership Dues 2024">Membership Dues {new Date().getFullYear()}</option>
                                                    <option value="Executive Conference Fee">Executive Conference Fee</option>
                                                    <option value="Special Project Levy">Special Project Levy</option>
                                                </select>
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined pointer-events-none">expand_more</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address (for receipt)</label>
                                        <input
                                            className="w-full h-14 rounded-xl border-2 border-slate-200 bg-slate-50/50 px-5 font-bold text-slate-900 focus:border-secondary focus:ring-0 transition-all"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="bg-linear-to-r from-accent-purple/5 to-secondary/5 rounded-2xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-black text-accent-purple uppercase tracking-[0.15em] mb-1">Total Payable Amount</p>
                                            <p className="text-5xl font-black text-slate-900">₦{totalAmount.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right border-l-0 md:border-l border-slate-200 md:pl-8">
                                            <p className="text-xs text-slate-500 font-bold mb-1">Rate: {months} × ₦5,000</p>
                                            {discount > 0 && <p className="text-xs text-green-600 font-bold mb-1">Discount: -₦{discount.toLocaleString()}</p>}
                                            <p className="text-sm text-secondary font-black flex items-center justify-end gap-1">
                                                <span className="material-symbols-outlined text-sm">bolt</span> Zero Platform Fees
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!email) {
                                            alert('Please enter your email address');
                                            return;
                                        }
                                        initializePayment(onSuccess, onClose);
                                    }}
                                    disabled={processing}
                                    className="mt-10 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-16 bg-primary text-white gap-3 text-lg font-black leading-normal tracking-wide hover:brightness-110 shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <span className="material-symbols-outlined animate-spin">refresh</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-white">lock_person</span>
                                    )}
                                    {processing ? 'Processing...' : 'Complete Payment Now'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="mt-16">
                        <div className="flex items-end justify-between mb-6 px-1">
                            <div>
                                <h2 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Transaction History</h2>
                                <p className="text-slate-500 text-sm font-medium mt-1">Review your recent financial activities and download receipts.</p>
                            </div>
                            <button className="text-secondary text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity bg-secondary/5 px-4 py-2 rounded-lg">
                                <span className="material-symbols-outlined text-sm">cloud_download</span> Export Records
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction Date</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Description</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Receipt</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loadingHistory ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-10 text-center text-slate-400">
                                                <div className="flex justify-center items-center gap-2">
                                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                                    <span>Loading history...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : transactions.length > 0 ? (
                                        transactions.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-8 py-6 text-sm font-bold text-slate-900">
                                                    {format(transaction.transactionDate.toDate(), 'MMM dd, yyyy')}
                                                </td>
                                                <td className="px-8 py-6 text-sm text-slate-500 font-medium">{transaction.description}</td>
                                                <td className="px-8 py-6 text-sm font-black text-slate-900">₦{transaction.amount.toLocaleString()}.00</td>
                                                <td className="px-8 py-6">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${transaction.status === 'successful'
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'bg-red-50 text-red-600'
                                                        }`}>
                                                        <span className={`size-1.5 rounded-full ${transaction.status === 'successful' ? 'bg-primary' : 'bg-red-600'
                                                            }`}></span> {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="text-slate-300 hover:text-secondary transition-colors" title="Download Receipt">
                                                        <span className="material-symbols-outlined">receipt_long</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-10 text-center text-slate-500 font-medium">
                                                No payment history found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
