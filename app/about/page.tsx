'use client';

import PublicHeader from '@/components/layout/PublicHeader';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="bg-background-light font-display min-h-screen">
            <PublicHeader />

            {/* Hero Section */}
            <section className="bg-navy-deep relative overflow-hidden text-white py-20 md:py-32">
                <div className="absolute inset-0 bg-hero-gradient opacity-30"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl transform translate-x-1/2"></div>

                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 w-fit rounded-full mb-6">
                            <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="text-primary font-bold tracking-widest text-xs uppercase">Since 1999</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
                            Architects of <span className="text-primary">National Strategy</span>
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed font-medium max-w-2xl">
                            The National Institute for Policy, Strategy and Leadership (NIPA) is the apex think-tank shaping the course of governance and strategic leadership in our nation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 md:py-32 max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-4xl text-primary">lightbulb</span>
                            </div>
                            <h2 className="text-3xl font-black text-navy-deep">Our Vision</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                To be the premier center of excellence for policy research, strategic studies, and leadership development in Africa, fostering a nation driven by intellect and foresight.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-4xl text-secondary">flag</span>
                            </div>
                            <h2 className="text-3xl font-black text-navy-deep">Our Mission</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                To empower national leaders with the strategic capacity, policy acumen, and ethical grounding required to navigate complex global challenges and drive sustainable development.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl bg-slate-200 relative z-10">
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8WAGpz8iEgJeH3LkSylS2U3O6s5RK7ROJoiXOUs6XUD5sAdKHwb2i66q-tPaNE5__-LBw9Q8TyAQnoC3JqO-oxStyekXEk0q3sRhmqvkV5r-1nzC87EAXFEU3boJXJXWLKRUrVfhRhSG7_xarjewKe2Zw8eKwXMmXSbSvKxZ1aC5ypVbLZNfPTaLDrUeEhLhdJ3N0IQgaLwTiPF18kGV-WxKgCE1VSC-EG-1ZRWQ7SD8VBgyVT1TG4Ne-rvEtk37OqjhoiyzX2as")' }}></div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-full h-full border-4 border-primary/20 rounded-3xl z-0"></div>
                    </div>
                </div>
            </section>

            {/* Leadership Grid */}
            <section className="py-20 bg-white border-y border-slate-100">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-extrabold text-navy-deep mb-6">Executive Leadership</h2>
                        <p className="text-lg text-slate-600">Guided by distinguished statesmen, scholars, and industry captains with decades of service.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Gen. A.B. Mahmoud (Rtd)', role: 'Director General', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHFUPr6qYhgHsdeLTGGykn92GKQbhLl1dEUEJzJ88kVLfaLjBI1TkIgJwTf_aMmB0Unqu23AKdCPpsTBi8O-expxJ-2oG6864Gvutz5yA27C8vts6skWrNqRgwgrjew1MJ-x7el6T4iJBsk3QOkn1HjncMHdqrBOxilTWv0SxopKHpy-if7bGfenEA0kVtwOOwhlctohLHr1KFf8xI91cF0pmtBoMzZldDIMY2J8S9Eysy3RG7KJC_i3-iM0ZIYfejDPKyloK-8mU' },
                            { name: 'Dr. Sarah O. Adebayo', role: 'Head of Research', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIdNEHll1Zy-FWM9N_nu8oEIkajFL7R86NJJJzEGSmlzjp6bQEBLTnnbldcNOCWjcDIF-V7HAgFwDLslzxizhXU7EQzVS0nCR6iXCT9AEGo0G80-AB7Snlh4sJlxrG72xU7R5MNYw2pAzMl1uvyBV1rOjG7RABU21qTKx_G9UGo9P4EHGd9QQ2ld2QFcZCeFswy2m3CbowMhTYGjWHzpvCD2Ui2EnNt2qW9dIKlsDxuDLZqUphA1DsincYMO9oSpmIW09Loe3Fuqk' },
                            { name: 'Barr. Musa K. Ibrahim', role: 'Secretary General', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBazlwepK9B0zNqk2EPkqJSfOlY-c8gfEoUaJImIz3jjJbcEh60TiTqVdMQplRBxTO-FVfbzU-VuflIL2-YlOwbiDAfIycWicx_s8reU-FMVfdKTqQjCahwqPxt6svxQ2Qr_SxkOa80z31LBMtdCQY0yzxpRRyv7u33N_QRUNk17Vl58aaxPImpjHlGRt7N1FCYF85JcUm7pnmeeBEKvmfT7QulV-pr0aYqnDhUoB__1pv1ypyv9uFXzAjs-fr20K4hJ_NnmphbynU' },
                        ].map((leader, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-3xl bg-slate-50">
                                <div className="aspect-4/5 bg-slate-200">
                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url("${leader.img}")` }}></div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-navy-deep to-transparent">
                                    <h3 className="text-white text-xl font-bold">{leader.name}</h3>
                                    <p className="text-primary font-medium tracking-wider text-sm uppercase mt-1">{leader.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Links */}
            <footer className="bg-navy-deep text-slate-400 py-12 border-t border-white/5">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
                    <p className="text-sm font-medium">© 2024 NIPA. Architects of the Future.</p>
                </div>
            </footer>
        </div>
    );
}
