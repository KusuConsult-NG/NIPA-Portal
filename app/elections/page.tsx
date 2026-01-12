'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ElectionsPage() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [paymentModal, setPaymentModal] = useState<{ title: string; price: string } | null>(null);
    const [manifestoModal, setManifestoModal] = useState<{ name: string; position: string; cohort: string } | null>(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    const handleRegister = () => {
        setIsRegistered(true);
        alert("Registration successful! You are now eligible to vote.");
    };

    const handlePurchase = () => {
        setProcessingPayment(true);
        setTimeout(() => {
            setProcessingPayment(false);
            setPaymentModal(null);
            alert("Payment successful! Nomination form has been emailed to you.");
        }, 1500);
    };

    return (
        <div className="bg-slate-50 text-navy-deep font-body relative">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-10 py-3">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4 text-navy-deep">
                        <div className="size-8 text-election-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-black leading-tight tracking-tight uppercase">NIPA Election</h2>
                    </div>

                    <div className="flex flex-1 justify-end gap-8">
                        <nav className="hidden md:flex items-center gap-9">
                            <Link className="text-sm font-semibold hover:text-election-primary transition-colors" href="/dashboard">Dashboard</Link>
                            <Link className="text-sm font-black text-election-primary border-b-2 border-election-primary pb-1" href="/elections">Elections</Link>
                            <Link className="text-sm font-semibold hover:text-election-primary transition-colors" href="#">Policy Papers</Link>
                            <Link className="text-sm font-semibold hover:text-election-primary transition-colors" href="#">Membership</Link>
                        </nav>

                        <div className="flex gap-3">
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 text-navy-deep">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 text-navy-deep">
                                <span className="material-symbols-outlined">account_circle</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1200px] mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="flex flex-wrap justify-between items-end gap-6 mb-12 border-b border-gray-200 pb-10">
                    <div className="flex min-w-72 flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-linear-to-r from-election-primary to-accent-purple text-white text-[10px] font-black uppercase tracking-widest">Active Cycle</span>
                        </div>
                        <h1 className="text-navy-deep text-6xl font-black leading-none tracking-tighter">2024 General<br />Elections</h1>
                        <p className="text-gray-500 text-lg font-medium max-w-2xl">The member portal for the National Institute for Policy, Strategy and Leadership Course Association (NIPA) democratic transition.</p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => alert("Electoral Guidelines PDF downloading...")} className="flex items-center justify-center rounded-xl h-14 px-8 bg-white border-2 border-gray-100 text-navy-deep text-sm font-black tracking-wide hover:border-election-primary transition-all shadow-sm">
                            <span className="material-symbols-outlined mr-2">description</span>
                            Electoral Guidelines
                        </button>
                        <button
                            onClick={handleRegister}
                            disabled={isRegistered}
                            className={`flex items-center justify-center rounded-xl h-14 px-8 text-sm font-black tracking-wide shadow-xl transition-all ${isRegistered ? 'bg-green-600 text-white shadow-green-600/20 cursor-default' : 'bg-linear-to-r from-election-primary to-accent text-white shadow-election-primary/20 hover:brightness-110'}`}
                        >
                            <span className="material-symbols-outlined mr-2">{isRegistered ? 'check_circle' : 'how_to_reg'}</span>
                            {isRegistered ? 'Registered' : 'Register to Vote'}
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Open Positions</p>
                        <p className="text-navy-deep text-4xl font-black">12</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Cleared Candidates</p>
                        <p className="text-navy-deep text-4xl font-black">45</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Verified Voters</p>
                        <p className="text-navy-deep text-4xl font-black">1,240</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl p-6 bg-navy-deep border border-navy-deep shadow-sm">
                        <p className="text-election-primary text-[10px] font-black uppercase tracking-widest">Voting Status</p>
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-election-primary animate-pulse"></div>
                            <p className="text-white text-xl font-black">Opening Soon</p>
                        </div>
                    </div>
                </div>

                {/* Deadlines */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-8 w-1 bg-linear-to-b from-election-primary to-accent-purple rounded-full"></div>
                        <h2 className="text-navy-deep text-3xl font-black tracking-tight">Critical Deadlines</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-linear-to-br from-election-primary to-accent text-white p-10 rounded-4xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-[200px]">shopping_cart</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-white">event_busy</span>
                                    <h3 className="font-black text-xl uppercase tracking-tighter">Nomination Form Sales</h3>
                                </div>
                                <p className="text-white/80 text-sm mb-8 font-medium">Deadline for purchase of all executive position forms. High demand expected.</p>
                                <div className="flex gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-5xl font-black leading-none">04</span>
                                        <span className="text-[11px] uppercase font-black mt-2 text-white/60 tracking-widest">Days</span>
                                    </div>
                                    <span className="text-5xl font-thin opacity-30">:</span>
                                    <div className="flex flex-col">
                                        <span className="text-5xl font-black leading-none">12</span>
                                        <span className="text-[11px] uppercase font-black mt-2 text-white/60 tracking-widest">Hours</span>
                                    </div>
                                    <span className="text-5xl font-thin opacity-30">:</span>
                                    <div className="flex flex-col">
                                        <span className="text-5xl font-black leading-none">45</span>
                                        <span className="text-[11px] uppercase font-black mt-2 text-white/60 tracking-widest">Mins</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-navy-deep text-white p-10 rounded-4xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-10 -top-10 opacity-10 text-election-primary group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-[200px]">ballot</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-election-primary">schedule</span>
                                    <h3 className="font-black text-xl uppercase tracking-tighter text-white">Voting Period Starts</h3>
                                </div>
                                <p className="text-white/60 text-sm mb-8 font-medium">Eligible members can cast their ballots electronically through this portal.</p>
                                <div className="flex gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-5xl font-black leading-none text-election-primary">12</span>
                                        <span className="text-[11px] uppercase font-black mt-2 text-white/40 tracking-widest">Days</span>
                                    </div>
                                    <span className="text-5xl font-thin opacity-30">:</span>
                                    <div className="flex flex-col">
                                        <span className="text-5xl font-black leading-none text-election-primary">08</span>
                                        <span className="text-[11px] uppercase font-black mt-2 text-white/40 tracking-widest">Hours</span>
                                    </div>
                                    <span className="text-5xl font-thin opacity-30">:</span>
                                    <div className="flex flex-col">
                                        <span className="text-5xl font-black leading-none text-election-primary">22</span>
                                        <span className="text-[11px] uppercase font-black mt-2 text-white/40 tracking-widest">Mins</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Positions */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 px-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-navy-deep text-4xl font-black tracking-tight">Available Positions</h2>
                            <p className="text-gray-500 font-medium">Select a role to purchase your nomination form. All payments are secured.</p>
                        </div>
                        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl self-start">
                            <button className="px-6 py-2 text-[11px] font-black uppercase tracking-widest bg-white text-navy-deep rounded-lg shadow-sm">Executive</button>
                            <button className="px-6 py-2 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-navy-deep transition-colors">Standing Committees</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'President', price: '₦50,000', description: 'Chief Executive Officer and representative of the NIPA Association.', icon: 'stars' },
                            { title: 'Vice President', price: '₦35,000', description: 'Support lead for executive functions and committee oversight.', icon: 'groups' },
                            { title: 'Secretary General', price: '₦25,000', description: 'Chief administrative officer responsible for documentation.', icon: 'history_edu' },
                        ].map((position, idx) => (
                            <div key={idx} className="bg-white border-2 border-transparent hover:border-election-primary p-8 rounded-4xl transition-all group shadow-sm hover:shadow-xl">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="bg-election-primary/10 p-4 rounded-2xl text-election-primary">
                                        <span className="material-symbols-outlined text-3xl">{position.icon}</span>
                                    </div>
                                    <span className="text-2xl font-black text-navy-deep">{position.price}</span>
                                </div>
                                <h3 className="text-2xl font-black mb-2 text-navy-deep">{position.title}</h3>
                                <p className="text-gray-500 mb-8 font-medium leading-relaxed">{position.description}</p>
                                <button
                                    onClick={() => setPaymentModal(position)}
                                    className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-election-primary to-accent text-white font-black py-4 rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-election-primary/20"
                                >
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Purchase Form
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Verified Candidates */}
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-10 px-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-navy-deep text-4xl font-black tracking-tight">Verified Candidates</h2>
                            <p className="text-gray-500 font-medium">Meet the members aspiring for leadership positions.</p>
                        </div>
                        <button className="text-sm font-black text-election-primary flex items-center gap-2 hover:gap-3 transition-all">
                            VIEW ALL
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'Dr. Olabisi Adeyemi', position: 'Presidential Aspirant', cohort: 'Course 32 Alumnus' },
                            { name: 'Cmdr. James Ibrahim', position: 'VP Aspirant', cohort: 'Course 30 Alumnus' },
                            { name: 'Barr. Funke Williams', position: 'Secretary Aspirant', cohort: 'Course 34 Alumnus' },
                            { name: 'Alh. Musa Danjuma', position: 'Treasurer Aspirant', cohort: 'Course 31 Alumnus' },
                        ].map((candidate, idx) => (
                            <div key={idx} className="flex flex-col bg-white rounded-4xl overflow-hidden shadow-sm border-2 border-election-primary/20 hover:border-election-primary transition-all group">
                                <div className="relative h-64 bg-gray-100 overflow-hidden">
                                    <img alt="Candidate profile photo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.name}`} />
                                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-linear-to-r from-election-primary to-accent text-white text-[9px] font-black uppercase rounded-full shadow-lg tracking-widest">
                                        {candidate.position}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-black text-navy-deep leading-tight mb-2">{candidate.name}</h4>
                                    <p className="text-xs font-bold text-gray-400 mb-6 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-election-primary">verified</span>
                                        {candidate.cohort}
                                    </p>
                                    <button
                                        onClick={() => setManifestoModal(candidate)}
                                        className="w-full bg-gray-50 text-navy-deep hover:bg-navy-deep hover:text-white font-black py-3.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 uppercase tracking-widest border border-gray-100"
                                    >
                                        <span className="material-symbols-outlined text-lg">article</span>
                                        Manifesto
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Banner */}
                <footer className="bg-navy-deep text-white rounded-[2.5rem] p-12 flex flex-wrap items-center justify-between gap-8 border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-6 max-w-xl">
                        <div className="size-16 bg-linear-to-br from-election-primary to-accent rounded-3xl flex items-center justify-center text-white shadow-xl shrink-0 rotate-3">
                            <span className="material-symbols-outlined text-3xl">shield_lock</span>
                        </div>
                        <div>
                            <h5 className="text-2xl font-black mb-2 uppercase tracking-tight">Secured & Audited</h5>
                            <p className="text-white/60 text-base font-medium leading-relaxed">All voting and financial transactions are encrypted and audited by the NIPA Electoral Committee to ensure the highest integrity.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-3xl">security</span>
                            <span className="text-[10px] font-black mt-2 uppercase tracking-widest">256-bit SSL</span>
                        </div>
                        <div className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-3xl">gpp_good</span>
                            <span className="text-[10px] font-black mt-2 uppercase tracking-widest">Verified ID</span>
                        </div>
                        <div className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-3xl">payments</span>
                            <span className="text-[10px] font-black mt-2 uppercase tracking-widest">Instant Pay</span>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Copyright Footer */}
            <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs font-bold gap-4">
                <p>© 2024 National Institute for Policy, Strategy and Leadership Association. All Rights Reserved.</p>
                <div className="flex gap-8 uppercase tracking-widest">
                    <Link className="hover:text-election-primary transition-colors" href="#">Terms</Link>
                    <Link className="hover:text-election-primary transition-colors" href="#">Privacy</Link>
                    <Link className="hover:text-election-primary transition-colors" href="#">Help</Link>
                </div>
            </div>

            {/* Payment Modal */}
            {paymentModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm" onClick={() => setPaymentModal(null)}></div>
                    <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <button onClick={() => setPaymentModal(null)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <span className="material-symbols-outlined text-slate-400">close</span>
                        </button>
                        <div className="mb-6">
                            <div className="size-16 bg-election-primary/10 rounded-2xl flex items-center justify-center text-election-primary mb-4">
                                <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                            </div>
                            <h3 className="text-2xl font-black text-navy-deep">Purchase Form</h3>
                            <p className="text-slate-500">You are about to purchase the nomination form for:</p>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8 flex justify-between items-center">
                            <span className="font-bold text-navy-deep">{paymentModal.title}</span>
                            <span className="font-black text-election-primary text-xl">{paymentModal.price}</span>
                        </div>

                        <button
                            onClick={handlePurchase}
                            disabled={processingPayment}
                            className="w-full py-4 bg-linear-to-r from-election-primary to-accent text-white font-black rounded-xl hover:brightness-110 shadow-lg shadow-election-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {processingPayment ? (
                                <>
                                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">payments</span>
                                    Pay Now
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Manifesto Modal */}
            {manifestoModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm" onClick={() => setManifestoModal(null)}></div>
                    <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 custom-scrollbar">
                        <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 border-b border-gray-100 flex justify-end z-10">
                            <button onClick={() => setManifestoModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <span className="material-symbols-outlined text-slate-400">close</span>
                            </button>
                        </div>
                        <div className="p-8 pt-0">
                            <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                                <div className="size-24 rounded-full bg-gray-100 overflow-hidden shrink-0 border-4 border-white shadow-lg">
                                    <img alt={manifestoModal.name} className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${manifestoModal.name}`} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-navy-deep mb-1">{manifestoModal.name}</h3>
                                    <p className="text-election-primary font-bold uppercase tracking-wider text-xs mb-2">{manifestoModal.position}</p>
                                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{manifestoModal.cohort}</span>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <h4 className="text-xl font-bold text-navy-deep mb-3">My Vision for NIPA</h4>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    Fellow alumni, I stand before you today with a vision of a unified, progressive, and globally recognized association. My tenure will focus on three key pillars: <strong>Innovation, Inclusivity, and Impact.</strong>
                                </p>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    We will leverage technology to bridge the gap between our diverse cohorts, ensuring that every voice is heard and every member feels valued. Through strategic partnerships, we will expand our influence on national policy.
                                </p>
                                <h4 className="text-xl font-bold text-navy-deep mb-3">Key Objectives</h4>
                                <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                                    <li>Establishment of a NIPA Innovation Hub for policy research.</li>
                                    <li>Launch of a mentorship program connecting senior alumni with recent graduates.</li>
                                    <li>Complete digital transformation of our member services.</li>
                                </ul>
                                <div className="bg-election-primary/5 p-6 rounded-2xl border border-election-primary/10">
                                    <p className="text-election-primary font-medium italic text-center">
                                        "Together, we can build a legacy that transcends our time here. Let us move forward with purpose."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
