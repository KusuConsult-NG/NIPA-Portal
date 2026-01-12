'use client';

import PublicHeader from '@/components/layout/PublicHeader';
import Link from 'next/link';
import { useState } from 'react';

export default function AlumniPage() {
    const [yearFilter, setYearFilter] = useState('All');

    const alumni = [
        {
            name: 'Dr. Ngozi Okonjo-Iweala',
            cohort: 'SEC 24',
            role: 'Director-General, WTO',
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngozi'
        },
        {
            name: 'Lt. Gen. Tukur Buratai',
            cohort: 'SEC 29',
            role: 'Former COAS',
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tukur'
        },
        {
            name: 'Prof. Yemi Osinbajo',
            cohort: 'SEC 30',
            role: 'Former Vice President',
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yemi'
        },
        // Add more mock alumni...
        {
            name: 'Amina Mohammed',
            cohort: 'SEC 31',
            role: 'Deputy Sec-Gen, UN',
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina'
        },
    ];

    return (
        <div className="bg-background-light font-display min-h-screen text-slate-900">
            <PublicHeader />

            {/* Hero Section */}
            <section className="bg-navy-deep relative overflow-hidden text-white py-20">
                <div className="absolute inset-0 bg-hero-gradient opacity-30"></div>
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Alumni <span className="text-primary">Network</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Connecting over 2,500 distinguished graduates who are shaping policies and driving change across the globe.
                    </p>
                </div>
            </section>

            {/* Network Stats */}
            <section className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <h3 className="text-4xl font-extrabold text-navy-deep">2,500+</h3>
                            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mt-1">Total Alumni</p>
                        </div>
                        <div className="text-center border-l border-slate-100">
                            <h3 className="text-4xl font-extrabold text-primary">45</h3>
                            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mt-1">Cohorts</p>
                        </div>
                        <div className="text-center border-l border-slate-100">
                            <h3 className="text-4xl font-extrabold text-secondary">12</h3>
                            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mt-1">Countries</p>
                        </div>
                        <div className="text-center border-l border-slate-100">
                            <h3 className="text-4xl font-extrabold text-accent">15</h3>
                            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mt-1">Chapters</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Directory Preview */}
            <section className="py-20 max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black text-navy-deep">Distinguished Alumni</h2>
                    <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                        {['All', 'SEC 40-45', 'SEC 30-39', 'SEC 20-29'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setYearFilter(filter)}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${yearFilter === filter ? 'bg-navy-deep text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {alumni.map((alum, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-center group">
                            <div className="size-24 rounded-full mx-auto mb-4 bg-slate-100 p-1 border-2 border-slate-100 group-hover:border-primary transition-colors">
                                <img src={alum.img} alt={alum.name} className="w-full h-full rounded-full" />
                            </div>
                            <h3 className="font-bold text-navy-deep text-lg">{alum.name}</h3>
                            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md my-2">{alum.cohort}</span>
                            <p className="text-slate-500 text-sm font-medium">{alum.role}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/login" className="px-8 py-4 bg-navy-deep text-white font-bold rounded-xl hover:bg-navy-deep/90 transition-all shadow-lg shadow-navy-deep/20">
                        View Full Directory (Members Only)
                    </Link>
                </div>
            </section>

            <footer className="bg-navy-deep text-slate-400 py-12 border-t border-white/5">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
                    <p className="text-sm font-medium">© 2024 NIPA. Architects of the Future.</p>
                </div>
            </footer>
        </div>
    );
}
