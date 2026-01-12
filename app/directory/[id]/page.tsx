'use client';

import Link from 'next/link';

export default function MemberProfilePage({ params }: { params: { id: string } }) {
    // In a real app, fetch data based on params.id
    // For now, we return a mock profile
    const member = {
        name: 'Dr. Jane Doe',
        role: 'Strategic Consultant',
        sec: 'SEC 45, 2023',
        location: 'Lagos, Nigeria',
        bio: 'Experienced strategic consultant with over 15 years in public policy and governance. Specializes in leadership development and organizational restructuring for federal agencies. Passionate about youth empowerment and digital literacy initiatives.',
        email: 'jane.doe@nipa.org',
        phone: '+234 803 555 1234',
        linkedIn: 'linkedin.com/in/janedoe',
        expertise: ['Public Policy', 'Strategic Planning', 'Leadership Development', 'Change Management'],
        education: [
            { degree: 'Ph.D. in Public Administration', school: 'University of Ibadan', year: '2015' },
            { degree: 'M.Sc. in Political Science', school: 'Ahmadu Bello University', year: '2010' }
        ],
        career: [
            { role: 'Senior Consultant', company: 'Federal Ministry of Strategy', duration: '2018 - Present' },
            { role: 'Policy Advisor', company: 'State Government of Lagos', duration: '2015 - 2018' }
        ]
    };

    return (
        <div className="bg-background-light text-slate-900 min-h-screen font-display pb-20">
            {/* Header / Nav would ideally be shared layout, but for now we keep it simple or assume layout wrapper */}
            <header className="sticky top-0 z-50 bg-navy-deep text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <Link href="/directory" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                                <span className="text-sm font-bold">Back to Directory</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="h-48 bg-linear-to-r from-navy-deep to-primary relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="px-10 pb-10">
                        <div className="flex flex-col md:flex-row gap-8 items-start relative -mt-16">
                            <div className="shrink-0 relative">
                                <div className="size-32 rounded-full border-4 border-white shadow-md bg-white overflow-hidden">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALtz3_n979tg3Wa8qkZlYloqX5uzGNKR90zsiVENBlHt8GBuHIf2BmiNtN48LXgtqx6sXLzjjkHh3RqLs_iBDV1W6BxhMMm5zzTcyRZ3H3Om_lLOT8kIE2d2E1uYzQSkF2uGW4YJohsgKJe-09RyfEGurXazVSexKY7rn66fHkjeuKmtQNBBcNuFdQC1DS8HKMwUqxag4mSAJ3V3ihqZvN46zolu34f_RBnbJNFWqeB4HzbwVs1DNAIPGcza3U0cR0VJdKJyV459g" />
                                </div>
                                <div className="absolute bottom-2 right-2 size-6 bg-primary border-4 border-white rounded-full"></div>
                            </div>

                            <div className="pt-16 md:pt-0 flex-1">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mt-4 md:mt-16 mb-6">
                                    <div>
                                        <h1 className="text-3xl font-black text-slate-900">{member.name}</h1>
                                        <p className="text-lg text-slate-600 font-medium">{member.role}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase">{member.sec}</span>
                                            <span className="flex items-center gap-1 text-sm text-slate-400">
                                                <span className="material-symbols-outlined text-base">location_on</span>
                                                {member.location}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                                            <span className="material-symbols-outlined text-lg">mail</span>
                                            Message
                                        </button>
                                        <button className="p-2.5 rounded-xl border-2 border-slate-200 text-slate-400 hover:text-navy-deep hover:border-navy-deep transition-all">
                                            <span className="material-symbols-outlined">bookmark</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-8">
                                        <section>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">About</h3>
                                            <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                                        </section>

                                        <section>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Experience</h3>
                                            <div className="space-y-6">
                                                {member.career.map((job, idx) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <div className="mt-1 size-3 rounded-full bg-slate-200 shrink-0"></div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900">{job.role}</h4>
                                                            <p className="text-sm text-slate-600 font-medium">{job.company}</p>
                                                            <p className="text-xs text-slate-400 mt-1">{job.duration}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                        <section>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Education</h3>
                                            <div className="space-y-6">
                                                {member.education.map((edu, idx) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <div className="mt-1 size-3 rounded-full bg-slate-200 shrink-0"></div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                                                            <p className="text-sm text-slate-600 font-medium">{edu.school}</p>
                                                            <p className="text-xs text-slate-400 mt-1">{edu.year}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    <div className="space-y-8">
                                        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Contact</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-slate-400">email</span>
                                                    <span className="text-sm text-slate-700 font-medium">{member.email}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-slate-400">call</span>
                                                    <span className="text-sm text-slate-700 font-medium">{member.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-slate-400">link</span>
                                                    <span className="text-sm text-slate-700 font-medium">{member.linkedIn}</span>
                                                </div>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Expertise</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {member.expertise.map((skill, idx) => (
                                                    <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">{skill}</span>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
