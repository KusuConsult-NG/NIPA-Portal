'use client';

import Link from 'next/link';
// import { useState } from 'react';
import PublicHeader from '@/components/layout/PublicHeader';

export default function LandingPage() {
  return (
    <div className="bg-navy-deep text-slate-100 min-h-screen selection:bg-primary selection:text-navy-deep font-sans">
      <PublicHeader />
      <main className="hero-gradient">
        <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 w-fit rounded-full">
                  <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                  <span className="text-primary font-bold tracking-widest text-xs uppercase">National Leadership Council</span>
                </div>
                <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
                  Advancing <span className="text-primary">Excellence</span> <br />
                  <span className="text-secondary">Through Policy</span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                  Empowering strategic thinkers to architect the future of national governance and global leadership.
                </p>
              </div>
              <div className="flex flex-wrap gap-5">
                <Link href="/signup" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-primary text-navy-deep font-bold hover:bg-opacity-90 transition-all transform active:scale-95 text-lg shadow-xl shadow-primary/20">
                  Join Association
                </Link>
                <Link href="/login" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-white/5 border border-white/10 text-white text-lg font-bold hover:bg-white/10 transition-all">
                  Portal Login
                </Link>
              </div>
              <div className="flex items-center gap-10 pt-4 border-t border-white/5 mt-4">
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-bold">2.5k+</span>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active Members</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-bold">150+</span>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Policy Papers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-bold">25yrs</span>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Experience</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-11/9 rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_80px_rgba(99,102,241,0.1)] group">
                <div className="absolute inset-0 bg-navy-deep/20 z-10"></div>
                <div className="w-full h-full bg-slate-800 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAr53YQXtIR8_wTHTF5AIEMG-Ou8Qho5__aNzG7tPKxLcOxwMrGWXJpM8Wm2MSl_oVAKbBLOwpeWOLuVHaMHG7SsHYwf600JrPtPOFZS_MX3TdsKVDksOXaHq0fZG2f5gQvV77SMCzHM6Nx4m1N90w_tSQyn_3zPx-YyHr8HFesLEptJm_BstRYaB6mTJsv5oEcKcCOCmNYduFVb2W04ixg0InBNzJ9Lez94N4TMSPIyI1tRXPF7XFJ3OjX1REWyv_ctOVDEO9mF0Y")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-transparent to-transparent z-20"></div>
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 z-30">
                  <p className="text-primary font-bold text-sm mb-1 uppercase tracking-tighter">Strategic Impact</p>
                  <p className="text-white text-lg font-semibold leading-snug italic">&quot;NIPA is the crucible where vision meets policy to shape our national future.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full bg-white/5 border-y border-white/10 py-10">
          <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center md:border-r border-white/10 last:border-0">
              <p className="text-primary text-4xl font-extrabold mb-1">2,500+</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Global Members</p>
            </div>
            <div className="text-center md:border-r border-white/10 last:border-0">
              <p className="text-white text-4xl font-extrabold mb-1">25</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Years</p>
            </div>
            <div className="text-center md:border-r border-white/10 last:border-0">
              <p className="text-white text-4xl font-extrabold mb-1">150+</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Research Papers</p>
            </div>
            <div className="text-center">
              <p className="text-secondary text-4xl font-extrabold mb-1">12</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Key Committees</p>
            </div>
          </div>
        </div>
        <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-6 text-center items-center max-w-3xl mx-auto">
              <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
                Our Core Strategic <span className="text-primary">Objectives</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                We bridge the gap between academic theory and practical governance through three pillar initiatives.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/8 transition-all hover:border-primary/50 overflow-hidden">
                <div className="absolute -right-4 -top-4 size-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 ring-1 ring-primary/20">
                  <span className="material-symbols-outlined text-4xl!">policy</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">Policy Research</h3>
                <p className="text-slate-400 leading-relaxed font-medium">Driving national discourse through rigorous intellectual inquiry and predictive modeling of global trends.</p>
              </div>
              <div className="group relative bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/8 transition-all hover:border-secondary/50 overflow-hidden">
                <div className="absolute -right-4 -top-4 size-32 bg-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="size-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 ring-1 ring-secondary/20">
                  <span className="material-symbols-outlined text-4xl!">military_tech</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">Strategic Leadership</h3>
                <p className="text-slate-400 leading-relaxed font-medium">Developing high-impact leadership competencies designed for complex, high-stakes environments.</p>
              </div>
              <div className="group relative bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/8 transition-all hover:border-accent/50 overflow-hidden">
                <div className="absolute -right-4 -top-4 size-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 ring-1 ring-accent/20">
                  <span className="material-symbols-outlined text-4xl!">groups</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">Member Network</h3>
                <p className="text-slate-400 leading-relaxed font-medium">Curating a prestigious network of distinguished alumni, industrial titans, and public policymakers.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 bg-white/2 rounded-3xl mb-12 border border-white/5">
          <div className="flex flex-col gap-12">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Live Sessions</p>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold">Upcoming Summits</h2>
              </div>
              <Link className="text-primary text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform" href="#">
                VIEW ALL EVENTS
                <span className="material-symbols-outlined text-lg!">arrow_right_alt</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group flex flex-col sm:flex-row gap-8 bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all">
                <div className="w-full sm:w-56 h-48 sm:h-auto rounded-2xl bg-slate-800 overflow-hidden shrink-0">
                  <div className="w-full h-full group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQNNcKKZyQPs80HkKdb0Vi7QVplA1aKYUBSZ8P-orh4lS7vDuDocy-4tVkVlaYQzlZ2iLnmWBLeMpZN4aqOFz8r3MYkbg4dOLkQnDepXeHDGSVa3Pq8YeFCoWRvBmyzXEXY74GsPYbdGLABONAv05sfoSww-8hy7RZxfMdAm-SFSorPbyyWpneRPijCogO5U6NXWLy3muz-TdVV8i7syT0wQnnEracooQaPFQSiBZjKTNOThcTMjdabDBH4w13KCcnvUXnzwmZKVY")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
                <div className="flex flex-col justify-center py-2">
                  <div className="flex items-center gap-3 text-primary text-sm font-bold mb-3">
                    <span className="px-3 py-1 bg-primary/10 rounded-full">OCT 24</span>
                    <span className="text-slate-500 font-medium tracking-tight">NATIONAL SECURITY</span>
                  </div>
                  <h4 className="text-white text-xl font-bold mb-3 group-hover:text-primary transition-colors">Annual National Security Summit</h4>
                  <p className="text-slate-400 text-[15px] leading-relaxed line-clamp-2">High-level strategic dialogue focusing on emerging cybersecurity threats and multi-regional stability.</p>
                </div>
              </div>
              <div className="group flex flex-col sm:flex-row gap-8 bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-secondary/30 transition-all">
                <div className="w-full sm:w-56 h-48 sm:h-auto rounded-2xl bg-slate-800 overflow-hidden shrink-0">
                  <div className="w-full h-full group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8WAGpz8iEgJeH3LkSylS2U3O6s5RK7ROJoiXOUs6XUD5sAdKHwb2i66q-tPaNE5__-LBw9Q8TyAQnoC3JqO-oxStyekXEk0q3sRhmqvkV5r-1nzC87EAXFEU3boJXJXWLKRUrVfhRhSG7_xarjewKe2Zw8eKwXMmXSbSvKxZ1aC5ypVbLZNfPTaLDrUeEhLhdJ3N0IQgaLwTiPF18kGV-WxKgCE1VSC-EG-1ZRWQ7SD8VBgyVT1TG4Ne-rvEtk37OqjhoiyzX2as")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
                <div className="flex flex-col justify-center py-2">
                  <div className="flex items-center gap-3 text-secondary text-sm font-bold mb-3">
                    <span className="px-3 py-1 bg-secondary/10 rounded-full">NOV 12</span>
                    <span className="text-slate-500 font-medium tracking-tight">ECONOMY</span>
                  </div>
                  <h4 className="text-white text-xl font-bold mb-3 group-hover:text-secondary transition-colors">Economic Policy Review</h4>
                  <p className="text-slate-400 text-[15px] leading-relaxed line-clamp-2">Comprehensive review of current fiscal frameworks and sustainable development goals for 2025.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 text-center">
          <div className="bg-linear-to-br from-primary/20 via-navy-deep to-secondary/20 rounded-[2.5rem] p-12 md:p-24 border border-white/10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-white text-4xl md:text-6xl font-extrabold max-w-4xl mx-auto leading-tight">Ready to shape the future of <span className="text-primary">National Policy?</span></h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">Join an elite circle of leaders dedicated to excellence, strategy, and transformative governance.</p>
              <div className="flex flex-wrap justify-center gap-6 mt-4">
                <Link href="/signup" className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-16 px-10 bg-primary text-navy-deep font-bold hover:bg-opacity-90 transition-all transform active:scale-95 text-xl shadow-2xl shadow-primary/40">
                  Apply for Membership
                </Link>
                <Link href="/contact" className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-16 px-10 bg-white/5 border border-white/10 text-white text-xl font-bold hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="absolute -bottom-24 -right-24 size-96 bg-primary/20 blur-[120px] rounded-full"></div>
            <div className="absolute -top-24 -left-24 size-96 bg-secondary/20 blur-[120px] rounded-full"></div>
          </div>
        </section>
      </main>
      <footer className="bg-navy-deep text-slate-400 pt-24 pb-12 border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5 flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="size-8 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 className="text-white text-2xl font-black uppercase tracking-tight">NIPA</h2>
              </div>
              <p className="text-slate-400 text-[16px] leading-relaxed max-w-sm font-medium">
                Empowering national leadership through rigorous strategic research and a commitment to global excellence in public policy architecture.
              </p>
              <div className="flex gap-4">
                <a className="size-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-navy-deep transition-all" href="#">
                  <span className="material-symbols-outlined text-xl!">share</span>
                </a>
                <a className="size-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-navy-deep transition-all" href="#">
                  <span className="material-symbols-outlined text-xl!">alternate_email</span>
                </a>
                <a className="size-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-navy-deep transition-all" href="#">
                  <span className="material-symbols-outlined text-xl!">phone</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
              <h5 className="font-extrabold text-white uppercase text-xs tracking-widest">Platform</h5>
              <ul className="flex flex-col gap-4 text-[15px] font-medium">
                <li><Link className="hover:text-primary transition-colors" href="/about">Overview</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/about">About NIPA</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/platform/alumni">Alumni Network</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/platform/leadership">Leadership</Link></li>
              </ul>
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
              <h5 className="font-extrabold text-white uppercase text-xs tracking-widest">Resources</h5>
              <ul className="flex flex-col gap-4 text-[15px] font-medium">
                <li><Link className="hover:text-primary transition-colors" href="/resources?category=Policy+Papers">Policy Papers</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/resources?category=Reports">Reports</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/resources/news">News Feed</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/privacy">Privacy</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3 flex flex-col gap-6">
              <h5 className="font-extrabold text-white uppercase text-xs tracking-widest">Newsletter</h5>
              <p className="text-sm font-medium">Get the latest strategic insights delivered directly to you.</p>
              <div className="flex gap-2">
                <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Enter your email" type="email" />
                <button className="bg-primary text-navy-deep rounded-xl px-4 py-3 font-bold text-sm">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6 text-[13px] font-medium">
            <p>© 2024 NIPA Association. Crafted for Excellence.</p>
            <div className="flex gap-10">
              <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
              <Link className="hover:text-white transition-colors" href="#">Cookie Policy</Link>
              <Link className="hover:text-white transition-colors" href="#">Sustainability</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
