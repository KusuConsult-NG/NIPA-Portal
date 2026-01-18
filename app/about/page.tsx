'use client';

import PublicHeader from '@/components/layout/PublicHeader';
// import Link from 'next/link';

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
                            <span className="text-primary font-bold tracking-widest text-xs uppercase">Policy • Strategy • Leadership</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
                            Empowering <span className="text-primary">Nation Building</span>
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed font-medium max-w-2xl">
                            The National Institute&apos;s Policy Strategy and Leadership Course Association (PSLC Association) connects graduates to foster collaboration, institutional alignment, and sustainable development.
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
                            <h2 className="text-3xl font-black text-navy-deep">Our Approach</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We are committed to collective action and collaboration on shared objectives. Our engagement emphasizes inclusivity, ensuring that every member&apos;s voice contributes to shaping a better society.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-4xl text-secondary">flag</span>
                            </div>
                            <h2 className="text-3xl font-black text-navy-deep">Our Objectives</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                To promote social and business networking among members, support the Alumni Association of the National Institute (AANI), and contribute positively to public policy and governance in Nigeria.
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                        {[
                            { name: 'Ekpa Stanley Ekpa', role: 'President', img: '/images/leaders/president.jpg' },
                            { name: 'Eric G. Martyns', role: 'Vice President', img: '/images/leaders/vice-president.jpg' },
                            { name: 'Nanna Yakubu Dashe', role: 'Treasurer', img: '/images/leaders/treasurer.jpg' },
                            { name: 'Akut-Kawai Deborah Habiba', role: 'Welfare Secretary', img: '/images/leaders/welfare-secretary.jpg' },
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
                    <p className="text-sm font-medium">© 2024 PSLC Association. Crafted for Excellence.</p>
                </div>
            </footer>
        </div>
    );
}
