'use client';

import PublicHeader from '@/components/layout/PublicHeader';
import Link from 'next/link';

export default function NewsPage() {
    const news = [
        {
            id: 1,
            title: "NIPA Hosts 45th Annual Policy Dialogue",
            category: "Events",
            date: "Oct 24, 2024",
            excerpt: "Top policymakers gathered in Abuja to discuss the future of national security and economic resilience in the face of global uncertainties.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8WAGpz8iEgJeH3LkSylS2U3O6s5RK7ROJoiXOUs6XUD5sAdKHwb2i66q-tPaNE5__-LBw9Q8TyAQnoC3JqO-oxStyekXEk0q3sRhmqvkV5r-1nzC87EAXFEU3boJXJXWLKRUrVfhRhSG7_xarjewKe2Zw8eKwXMmXSbSvKxZ1aC5ypVbLZNfPTaLDrUeEhLhdJ3N0IQgaLwTiPF18kGV-WxKgCE1VSC-EG-1ZRWQ7SD8VBgyVT1TG4Ne-rvEtk37OqjhoiyzX2as"
        },
        {
            id: 2,
            title: "New Research Grant for Sustainable Agriculture",
            category: "Research",
            date: "Oct 20, 2024",
            excerpt: "The Institute has announced a N50M grant for research into climate-resilient farming techniques for the savannah region.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIdNEHll1Zy-FWM9N_nu8oEIkajFL7R86NJJJzEGSmlzjp6bQEBLTnnbldcNOCWjcDIF-V7HAgFwDLslzxizhXU7EQzVS0nCR6iXCT9AEGo0G80-AB7Snlh4sJlxrG72xU7R5MNYw2pAzMl1uvyBV1rOjG7RABU21qTKx_G9UGo9P4EHGd9QQ2ld2QFcZCeFswy2m3CbowMhTYGjWHzpvCD2Ui2EnNt2qW9dIKlsDxuDLZqUphA1DsincYMO9oSpmIW09Loe3Fuqk"
        },
        {
            id: 3,
            title: "Alumni Spotlight: Dr. Sarah O. Appointed Minister",
            category: "Alumni",
            date: "Oct 15, 2024",
            excerpt: "Distinguished alumnus Dr. Sarah O. (SEC 38) has been appointed as the new Minister of Trade and Investment.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHFUPr6qYhgHsdeLTGGykn92GKQbhLl1dEUEJzJ88kVLfaLjBI1TkIgJwTf_aMmB0Unqu23AKdCPpsTBi8O-expxJ-2oG6864Gvutz5yA27C8vts6skWrNqRgwgrjew1MJ-x7el6T4iJBsk3QOkn1HjncMHdqrBOxilTWv0SxopKHpy-if7bGfenEA0kVtwOOwhlctohLHr1KFf8xI91cF0pmtBoMzZldDIMY2J8S9Eysy3RG7KJC_i3-iM0ZIYfejDPKyloK-8mU"
        }
    ];

    return (
        <div className="bg-background-light font-display min-h-screen text-slate-900">
            <PublicHeader />

            <section className="bg-navy-deep text-white py-16">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <h1 className="text-4xl font-extrabold mb-4">News & Updates</h1>
                    <p className="text-slate-400 text-lg">Latest happenings from the NIPA community.</p>
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {news.map(item => (
                        <article key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
                            <div className="h-48 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }}></div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-1 rounded">{item.category}</span>
                                    <span className="text-xs text-slate-400 font-bold">{item.date}</span>
                                </div>
                                <h2 className="text-xl font-bold text-navy-deep mb-3 leading-tight hover:text-primary transition-colors cursor-pointer">{item.title}</h2>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{item.excerpt}</p>
                                <Link href="#" className="text-primary font-bold text-sm flex items-center gap-1 hover:translate-x-1 transition-transform">
                                    Read Full Story <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <footer className="bg-navy-deep text-slate-400 py-12 border-t border-white/5">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
                    <p className="text-sm font-medium">© 2024 NIPA. Architects of the Future.</p>
                </div>
            </footer>
        </div>
    );
}
