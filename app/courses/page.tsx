'use client';

import Link from 'next/link';

export default function CoursesPage() {
    return (
        <div className="bg-background-light text-slate-900 min-h-screen font-display">
            <header className="sticky top-0 z-50 bg-navy-deep text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <div className="text-primary">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black tracking-tight uppercase">NIPA</span>
                                <span className="text-[8px] opacity-60 tracking-widest uppercase">Member Portal</span>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <Link className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-all" href="/dashboard">Home</Link>
                            <Link className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-all" href="/directory">Directory</Link>
                            <Link className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-all" href="/events">Events</Link>
                            <Link className="text-sm font-semibold text-primary transition-all border-b-2 border-primary pb-1" href="/courses">Courses</Link>
                            <Link className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-all" href="#">Resources</Link>
                        </nav>
                        <div className="flex items-center gap-5">
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-2xl">notifications</span>
                            </button>
                            <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden ring-2 ring-white/10">
                                <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmkxQB0Y_lA_cPfKoBD3DMA6oUtg6ytwqqLo-Dlay51IzR6AOLF0pUi41YHpWr2rPiIkJ7D37mu7h6V8Rc1CZJUsCcQ3EHOdwp_DGDJTBf4c-_XDji-yDCMWFYQxGaWnKk0A6K-uGd5dsrDjBzcAGJ1lTwouof6bbqjJomLdX1T5gMhRbPup9uWV9yGY_Fj7BUHQN-LZ3O0T3X7OVBHrrXcaVTvVmoEpzjxo8k_4IdISvrozFjVAah8JjcXjaaPngCKp0bayL4QfA" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Professional Courses</h1>
                        <p className="text-slate-500 text-lg">Enhance your leadership skills with our accredited executive programs.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Featured Course */}
                    <div className="lg:col-span-2 bg-navy-deep text-white rounded-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-hero-gradient opacity-50"></div>
                        <div className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center blur-sm opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop")' }}></div>
                        <div className="relative p-10 flex flex-col h-full justify-between">
                            <div className="flex items-start justify-between">
                                <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/20 rounded-lg text-xs font-black uppercase tracking-widest">Featured Program</span>
                            </div>
                            <div className="mt-8 max-w-lg">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Senior Executive Course (SEC) 46</h2>
                                <p className="text-white/70 text-lg mb-8">The flagship program designed for high-level policy makers and executors. Prepare for the next level of strategic leadership.</p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-8 py-4 bg-primary text-navy-deep font-bold rounded-xl hover:bg-white hover:text-primary transition-all">Apply Now</button>
                                    <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all">Download Brochure</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats / Info */}
                    <div className="space-y-8">
                        <div className="bg-primary p-8 rounded-3xl text-white">
                            <span className="material-symbols-outlined text-4xl mb-4">school</span>
                            <h3 className="text-2xl font-black mb-2">Accredited</h3>
                            <p className="opacity-80">All our courses are recognized globally and credited towards CPD.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200">
                            <span className="material-symbols-outlined text-4xl mb-4 text-navy-deep">groups</span>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Alumni Network</h3>
                            <p className="text-slate-500">Join over 1,200 successful graduates driving change across Nigeria.</p>
                        </div>
                    </div>

                    {/* Other Courses */}
                    {[
                        { title: 'Strategic Leadership Workshop', type: 'Short Course', date: 'March 15-20, 2024', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop' },
                        { title: 'Policy Formulation Masterclass', type: 'Online', date: 'Available Now', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop' },
                        { title: 'Digital Governance Seminar', type: 'Seminar', date: 'April 05, 2024', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop' }
                    ].map((course, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group">
                            <div className="h-48 overflow-hidden relative">
                                <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-navy-deep text-[10px] font-black uppercase tracking-widest rounded-lg">{course.type}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                                <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">calendar_month</span>
                                    {course.date}
                                </p>
                                <button className="w-full py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-sm hover:border-primary hover:text-primary transition-all">View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
