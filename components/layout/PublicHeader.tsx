'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function PublicHeader() {
    const { user, loading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full glass-nav transition-all">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 relative z-50">
                    <div className="size-10 text-primary flex items-center justify-center bg-primary/10 rounded-xl">
                        <svg className="size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-extrabold leading-tight tracking-tight text-white">PSLC Association</h2>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden relative z-50 p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="material-symbols-outlined text-3xl">
                        {isMobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-end gap-12 items-center">
                    <nav className="flex items-center gap-8">
                        <Link className="text-[15px] font-medium text-slate-300 hover:text-primary transition-colors" href="/">Home</Link>
                        <Link className="text-[15px] font-medium text-slate-300 hover:text-primary transition-colors" href="/about">About</Link>
                        <Link className="text-[15px] font-medium text-slate-300 hover:text-primary transition-colors" href="/events">Events</Link>
                        <Link className="text-[15px] font-medium text-slate-300 hover:text-primary transition-colors" href="/gallery">Gallery</Link>
                        <Link className="text-[15px] font-medium text-slate-300 hover:text-primary transition-colors" href="/resources">Resources</Link>
                    </nav>
                    <div className="flex items-center gap-5">
                        {!loading && user ? (
                            <Link href="/dashboard" className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-full h-11 px-6 bg-primary text-navy-deep font-bold hover:bg-opacity-90 transition-all transform active:scale-95 shadow-lg shadow-primary/20">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/login" className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-full h-11 px-6 bg-primary text-navy-deep font-bold hover:bg-opacity-90 transition-all transform active:scale-95 shadow-lg shadow-primary/20">
                                Member Login
                            </Link>
                        )}
                        {/* Avatar placeholder - could be dynamic later */}
                        {user ? (
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20 cursor-pointer" style={{ backgroundImage: `url("${user.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.uid}")` }}></div>
                        ) : (
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQNiLK-MY3c1XS0zV6s-c9i4xKAPoaKqBkmO3s7nvE1amdC8v_9XvgB3C1zRuPErqPv_q27xkHCJYqKBpz2Sy7ntyxsmJF_bW97bJ8SBE1yi5PX3e5MsjMZ7vcEZRJHxUJQxQzoSRiXrX28vTUAkD55fTqmbpI2QsVf0E0sc0_kCeQknTfKBgzUpnLBiHt3LqhiVthCrTyL9zpRzx6iU-FqoI4aQ5kPRwsI6oeqqpFkeFBclVEnTPXgyW1jZ6XDgA14jF04VlYhRs")' }}></div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                <div className={`fixed inset-0 bg-navy-deep/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <nav className="flex flex-col items-center gap-8 text-center">
                        <Link onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-primary transition-colors" href="/">Home</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-primary transition-colors" href="/about">About</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-primary transition-colors" href="/events">Events</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-primary transition-colors" href="/resources">Resources</Link>
                    </nav>
                    <div className="flex flex-col items-center gap-6 mt-8">
                        {!loading && user ? (
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/dashboard" className="flex w-64 cursor-pointer items-center justify-center rounded-xl h-14 bg-primary text-navy-deep font-bold text-lg shadow-xl shadow-primary/20">
                                Dashboard
                            </Link>
                        ) : (
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="flex w-64 cursor-pointer items-center justify-center rounded-xl h-14 bg-primary text-navy-deep font-bold text-lg shadow-xl shadow-primary/20">
                                Member Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
