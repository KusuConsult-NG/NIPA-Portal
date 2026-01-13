'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { getCourses, Course, registerForCourse } from '@/lib/firestore';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const [userId, setUserId] = useState<string | null>(null);
    const [registering, setRegistering] = useState<string | null>(null); // courseId

    useEffect(() => {
        // Auth check
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUserId(user.uid);
            else setUserId(null);
        });

        // Fetch Data
        async function loadCourses() {
            setLoading(true);
            const data = await getCourses();
            setCourses(data);
            setFilteredCourses(data);
            setLoading(false);
        }

        loadCourses();
        return () => unsubscribe();
    }, []);

    // Filter Logic
    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredCourses(courses);
        } else {
            setFilteredCourses(courses.filter(c => c.type === activeFilter));
        }
    }, [activeFilter, courses]);

    const handleRegister = async (courseId: string) => {
        if (!userId) {
            alert('Please sign in to register.');
            return;
        }

        setRegistering(courseId);
        const result = await registerForCourse(userId, courseId);

        if (result.success) {
            alert('Registration Successful! Check your email for details.');
            // Optimistic update
            setCourses(prev => prev.map(c =>
                c.id === courseId ? { ...c, registeredCount: c.registeredCount + 1 } : c
            ));
        } else {
            alert(result.message);
        }
        setRegistering(null);
    };

    const filters = ['All', 'Executive Program', 'Workshop', 'Seminar', 'Online'];

    // Featured Course (First one marked featured or first in list)
    const featuredCourse = courses.find(c => c.featured) || courses[0];

    return (
        <div className="flex min-h-screen bg-[#0B1120] text-white selection:bg-primary/30">
            {/* Sidebar (Assuming global component, but keeping layout consistent with other pages) */}
            {/* Note: The user's other pages use a Sidebar component wrapper or layout.
                I'll assume standard layout Wrapper or just main content if Layout checks page.
                Wait, other pages imported Sidebar. I'll import it but need to wrap main content properly.
                Actually, looking at 'admin/page.tsx' vs 'elections/page.tsx', they handle layout inside. */}

            {/* Reusing existing SidebarNav items logic would be ideal if passed as props, 
                    but Sidebar component might handle its own nav. 
                    Checking Sidebar.tsx usage... it takes children. 
                    Actually, usually Sidebar is part of layout.tsx. 
                    If I look at global layout, it might be there. 
                    User's file view of 'app/courses/page.tsx' had a Header but NO Sidebar.
                    'app/admin/page.tsx' implies admin layout. 
                    Let's stick to a clean full page layout OR if user wants Sidebar, I should add it.
                    The 'courses' page usually is public facing (like Landing/Resources), so maybe Top Nav instead of Left Sidebar?
                    User's previous 'courses/page.tsx' had a Header.
                    I will maintain the Top Nav structure if it's a public page, as per previous file content.
                    BUT user said 'courses is not built'.
                    I will build it as a premium public page with Top Nav matching Resources/Landing.
                */}
        </Sidebar>

            {/* Wait, Sidebar needs to be closed. I commented it out because the previous file used a Header.
                Let's stick to the previous layout structure: Public Page with Header.
                But I will make it premium.
            */}

    <div className="flex-1 flex flex-col min-w-0 bg-[#0B1120] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none opacity-30 mix-blend-screen"></div>

        {/* Header */}
        <header className="sticky top-0 z-50 glass-nav border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-primary relative group cursor-pointer">
                        <div className="absolute inset-0 bg-primary/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-symbols-outlined text-4xl relative z-10">school</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-black tracking-tight uppercase bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">NIPA</span>
                        <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Academy</span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-1">
                    {/* Nav Links reuse style from other pages */}
                    {['Dashboard', 'Directory', 'Events', 'Courses', 'Resources'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${item === 'Courses'
                                ? 'bg-white/10 text-white shadow-lg shadow-white/5 ring-1 ring-white/10'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {userId ? (
                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-secondary p-[2px]">
                            <div className="h-full w-full rounded-full bg-navy-card flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">person</span>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="px-5 py-2.5 bg-white text-navy-deep font-bold rounded-xl hover:scale-105 transition-transform">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 max-w-7xl mx-auto w-full z-10">

            {/* Page Title */}
            <div className="mb-12 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 flex items-center gap-4">
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-white to-slate-400">
                        Professional Courses
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                        {courses.length} Available
                    </span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                    Enhance your leadership skills with our accredited executive programs.
                    Curated for public sector excellence.
                </p>
            </div>

            {loading ? (
                <div className="h-96 flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-slate-500 animate-pulse">Loading Academy...</p>
                </div>
            ) : (
                <div className="space-y-12">

                    {/* Featured Course Hero */}
                    {featuredCourse && activeFilter === 'All' && (
                        <div className="relative rounded-4xl overflow-hidden group animate-scale-in">
                            <div className="absolute inset-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={featuredCourse.image}
                                    alt={featuredCourse.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-[#0B1120] via-[#0B1120]/90 to-transparent"></div>
                            </div>

                            <div className="relative p-8 md:p-12 lg:p-16 max-w-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-primary text-navy-deep text-xs font-black uppercase tracking-widest rounded-full">
                                        Featured Program
                                    </span>
                                    <span className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        {featuredCourse.duration}
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
                                    {featuredCourse.title}
                                </h2>

                                <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                                    {featuredCourse.description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => handleRegister(featuredCourse.id)}
                                        disabled={registering === featuredCourse.id}
                                        className="px-8 py-4 bg-linear-to-r from-primary to-accent hover:brightness-110 text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:grayscale flex items-center gap-2"
                                    >
                                        {registering === featuredCourse.id ? 'Registering...' : 'Enroll Now'}
                                        {!registering && <span className="material-symbols-outlined">arrow_forward</span>}
                                    </button>
                                    <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all">
                                        Download Syllabus
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="sticky top-24 z-30 py-4 -mx-4 px-4 bg-[#0B1120]/80 backdrop-blur-xl border-y border-white/5 flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeFilter === filter
                                    ? 'bg-white text-navy-deep shadow-lg shadow-white/10 scale-105'
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course, idx) => (
                            <div
                                key={course.id}
                                className="group relative bg-navy-card/50 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all hover:bg-navy-card hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Image */}
                                <div className="h-48 overflow-hidden relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-navy-card to-transparent opacity-80"></div>
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                                        {course.level}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-primary/80">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                        {course.type}
                                    </div>

                                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400 mb-3 line-clamp-2 min-h-14">
                                        {course.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                                        {course.shortDescription}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <span className="block text-xs text-slate-500 font-medium uppercase mb-1">Start Date</span>
                                            <span className="text-sm font-bold text-slate-200">{course.startDate}</span>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <span className="block text-xs text-slate-500 font-medium uppercase mb-1">Fee</span>
                                            <span className="text-sm font-bold text-primary">
                                                {typeof course.price === 'number'
                                                    ? `₦${course.price.toLocaleString()}`
                                                    : course.price}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 font-medium">Capacity</span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full"
                                                        style={{ width: `${(course.registeredCount / course.capacity) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-slate-400 font-mono">
                                                    {course.registeredCount}/{course.capacity}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleRegister(course.id)}
                                            disabled={registering === course.id}
                                            className="w-10 h-10 rounded-full bg-white text-navy-deep flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-primary/50"
                                        >
                                            {registering === course.id
                                                ? <div className="w-4 h-4 border-2 border-navy-deep border-t-transparent rounded-full animate-spin"></div>
                                                : <span className="material-symbols-outlined">add</span>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    </div>
        </div >
    );
}
