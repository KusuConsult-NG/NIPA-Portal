'use client';

import Link from 'next/link';
// import { useState } from 'react';
import PublicHeader from '@/components/layout/PublicHeader';
import HeroSlider from '@/components/landing/HeroSlider';

export default function LandingPage() {
  return (
    <div className="bg-navy-deep text-slate-100 min-h-screen selection:bg-primary selection:text-navy-deep font-sans">
      <PublicHeader />
      <main className="hero-gradient">
        <HeroSlider />\n        <div className="w-full bg-white/5 border-y border-white/10 py-10">
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
                Our Core <span className="text-primary">Objectives</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                We are committed to specific goals that drive professional growth and national development.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/8 transition-all hover:border-primary/50 overflow-hidden">
                <div className="absolute -right-4 -top-4 size-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 ring-1 ring-primary/20">
                  <span className="material-symbols-outlined text-4xl!">policy</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">Promote NI Ideals</h3>
                <p className="text-slate-400 leading-relaxed font-medium">To promote the ideals of the National Institute in stimulating policy, leadership, and development engagements.</p>
              </div>
              <div className="group relative bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/8 transition-all hover:border-secondary/50 overflow-hidden">
                <div className="absolute -right-4 -top-4 size-32 bg-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="size-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 ring-1 ring-secondary/20">
                  <span className="material-symbols-outlined text-4xl!">school</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">Professional Growth</h3>
                <p className="text-slate-400 leading-relaxed font-medium">To foster the professional and career growth of its members through continuous learning and networking.</p>
              </div>
              <div className="group relative bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/8 transition-all hover:border-accent/50 overflow-hidden">
                <div className="absolute -right-4 -top-4 size-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 ring-1 ring-accent/20">
                  <span className="material-symbols-outlined text-4xl!">public</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">Public Policy</h3>
                <p className="text-slate-400 leading-relaxed font-medium">To contribute positively to public policy, governance, and the overall development of Nigeria.</p>
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
                  <h4 className="text-white text-xl font-bold mb-3 group-hover:text-primary transition-colors">PSLC Policy Conversations</h4>
                  <p className="text-slate-400 text-[15px] leading-relaxed line-clamp-2">Engaging critical discussions on national issues to drive actionable policy outcomes.</p>
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
                  <h4 className="text-white text-xl font-bold mb-3 group-hover:text-secondary transition-colors">Annual Lecture Series</h4>
                  <p className="text-slate-400 text-[15px] leading-relaxed line-clamp-2">Platform for knowledge sharing and leadership development with industry experts.</p>
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
                <h2 className="text-white text-2xl font-black uppercase tracking-tight">PSLC Association</h2>
              </div>
              <p className="text-slate-400 text-[16px] leading-relaxed max-w-sm font-medium">
                The National Institute&apos;s Policy Strategy and Leadership Course Association. Shaping evidence-based policies for sustainable growth.
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
            <p>© 2024 PSLC Association. All rights reserved.</p>
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
