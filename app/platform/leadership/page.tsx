'use client';

import PublicHeader from '@/components/layout/PublicHeader';
import Link from 'next/link';

export default function LeadershipPage() {
    const leaders = [
        {
            name: 'Gen. A.B. Mahmoud (Rtd)',
            role: 'Director General',
            bio: 'A distinguished military strategist with over 35 years of service in national defense and policy formulation. Gen. Mahmoud has led numerous high-level delegations and served as a key advisor to three administrations.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHFUPr6qYhgHsdeLTGGykn92GKQbhLl1dEUEJzJ88kVLfaLjBI1TkIgJwTf_aMmB0Unqu23AKdCPpsTBi8O-expxJ-2oG6864Gvutz5yA27C8vts6skWrNqRgwgrjew1MJ-x7el6T4iJBsk3QOkn1HjncMHdqrBOxilTWv0SxopKHpy-if7bGfenEA0kVtwOOwhlctohLHr1KFf8xI91cF0pmtBoMzZldDIMY2J8S9Eysy3RG7KJC_i3-iM0ZIYfejDPKyloK-8mU'
        },
        {
            name: 'Dr. Sarah O. Adebayo',
            role: 'Head of Research',
            bio: 'Renowned economist and policy analyst. Dr. Adebayo holds a PhD from Oxford and has published extensively on sustainable development in emerging markets. She leads NIPA\'s research initiatives.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIdNEHll1Zy-FWM9N_nu8oEIkajFL7R86NJJJzEGSmlzjp6bQEBLTnnbldcNOCWjcDIF-V7HAgFwDLslzxizhXU7EQzVS0nCR6iXCT9AEGo0G80-AB7Snlh4sJlxrG72xU7R5MNYw2pAzMl1uvyBV1rOjG7RABU21qTKx_G9UGo9P4EHGd9QQ2ld2QFcZCeFswy2m3CbowMhTYGjWHzpvCD2Ui2EnNt2qW9dIKlsDxuDLZqUphA1DsincYMO9oSpmIW09Loe3Fuqk'
        },
        {
            name: 'Barr. Musa K. Ibrahim',
            role: 'Secretary General',
            bio: 'Legal luminary and administrator. Barr. Ibrahim brings a wealth of experience in corporate governance and public administration, ensuring the seamless operation of the Institute.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBazlwepK9B0zNqk2EPkqJSfOlY-c8gfEoUaJImIz3jjJbcEh60TiTqVdMQplRBxTO-FVfbzU-VuflIL2-YlOwbiDAfIycWicx_s8reU-FMVfdKTqQjCahwqPxt6svxQ2Qr_SxkOa80z31LBMtdCQY0yzxpRRyv7u33N_QRUNk17Vl58aaxPImpjHlGRt7N1FCYF85JcUm7pnmeeBEKvmfT7QulV-pr0aYqnDhUoB__1pv1ypyv9uFXzAjs-fr20K4hJ_NnmphbynU'
        },
        {
            name: 'Prof. Chinwe E. Okeke',
            role: 'Director of Studies',
            bio: 'Former Vice Chancellor and expert in educational leadership. Prof. Okeke oversees the rigorous academic curricula and training programs at NIPA.',
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chinwe&backgroundColor=c0aede'
        },
        {
            name: 'Amb. Tunde Fasholi',
            role: 'Director of International Relations',
            bio: 'Career diplomat with service in the UN and AU. Ambassador Fasholi strengthens NIPA\'s global partnerships and strategic alliances.',
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde&backgroundColor=b6e3f4'
        },
        {
            name: 'Engr. David West',
            role: 'Director of Innovation',
            bio: 'Technocrat and systems engineer. Engr. West drives digital transformation and technological foresight within the Institute.',
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffdfbf'
        }
    ];

    return (
        <div className="bg-background-light font-display min-h-screen text-slate-900">
            <PublicHeader />

            {/* Hero Section */}
            <section className="bg-navy-deep relative overflow-hidden text-white py-20">
                <div className="absolute inset-0 bg-hero-gradient opacity-30"></div>

                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Executive <span className="text-primary">Leadership</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Steered by a council of distinguished statesmen, scholars, and industry titans committed to national excellence.
                    </p>
                </div>
            </section>

            {/* Leadership Grid */}
            <section className="py-20 max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {leaders.map((leader, i) => (
                        <div key={i} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="aspect-4/3 bg-slate-200 overflow-hidden relative">
                                <div className="absolute inset-0 bg-linear-to-t from-navy-deep/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${leader.img}")` }}></div>
                            </div>
                            <div className="p-8">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-black text-navy-deep leading-tight">{leader.name}</h3>
                                    <p className="text-primary font-bold text-sm uppercase tracking-wider mt-1">{leader.role}</p>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {leader.bio}
                                </p>
                                <div className="mt-6 pt-6 border-t border-slate-100 flex gap-4">
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">mail</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">open_in_new</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Governance Structure */}
            <section className="bg-slate-50 py-20 border-t border-slate-200">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-navy-deep mb-6">Governance Structure</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                NIPA operates under a robust governance framework designed to ensure transparency, accountability, and strategic continuity. Our leadership is structured into three tiers:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-primary text-sm">gavel</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-deep">Governing Council</h4>
                                        <p className="text-sm text-slate-500">The supreme policy-making body responsible for overall strategic direction.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-secondary text-sm">manage_accounts</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-deep">Executive Management</h4>
                                        <p className="text-sm text-slate-500">Responsible for the day-to-day administration and implementation of council policies.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-accent text-sm">science</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-deep">Academic Board</h4>
                                        <p className="text-sm text-slate-500">Oversees research quality, curriculum development, and academic standards.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
                            <div className="flex flex-col gap-6 items-center text-center">
                                <div className="size-24 bg-navy-deep rounded-2xl flex items-center justify-center shadow-xl shadow-navy-deep/20">
                                    <svg className="size-12 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-navy-deep mb-2">Join the Leadership</h3>
                                    <p className="text-slate-500 text-sm">Nominations for the 2025 Council elections are now open for eligible Fellows.</p>
                                </div>
                                <Link href="/elections" className="w-full py-3 bg-primary text-navy-deep font-bold rounded-xl hover:bg-primary/90 transition-colors">
                                    View Election Guidelines
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Links (Simplified for this page) */}
            <footer className="bg-navy-deep text-slate-400 py-12 border-t border-white/5">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
                    <p className="text-sm font-medium">© 2024 NIPA. Architects of the Future.</p>
                </div>
            </footer>
        </div>
    );
}
