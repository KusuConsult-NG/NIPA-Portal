'use client';

import { useState, useRef, useEffect } from 'react';

interface Leader {
    name: string;
    role: string;
    img: string;
}

const LEADERS: Leader[] = [
    { name: 'Ekpa Stanley Ekpa', role: 'President', img: '/images/leaders/president.jpg' },
    { name: 'Eric G. Martyns', role: 'Vice President', img: '/images/leaders/vice-president.jpg' },
    { name: 'Nanna Yakubu Dashe', role: 'Treasurer', img: '/images/leaders/treasurer.jpg' },
    { name: 'Akut-Kawai Deborah Habiba', role: 'Welfare Secretary', img: '/images/leaders/welfare-secretary.jpg' },
];

export default function LeadershipSlider() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToValues = (index: number) => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const width = container.offsetWidth;
        // Assuming 1 card visible on mobile, maybe 2 or 3 on larger.
        // For simplicity, let's scroll based on child width.
        // Actually, let's just center the target.
        const card = container.children[index] as HTMLElement;
        if (card) {
            container.scrollTo({
                left: card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2),
                behavior: 'smooth'
            });
        }
        setActiveIndex(index);
    };

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const width = container.offsetWidth;
        // Simple approximation
        const index = Math.round(scrollLeft / (width / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)));
        // This math is tricky with responsive columns.
        // Let's rely on manual clicks for "active" state or just simple scroll tracking.
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Executive Leadership</h2>
                    <p className="text-slate-500 mt-2">The team driving our vision forward.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => scrollToValues(Math.max(0, activeIndex - 1))}
                        className="p-3 rounded-full border border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50"
                        disabled={activeIndex === 0}
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button
                        onClick={() => scrollToValues(Math.min(LEADERS.length - 1, activeIndex + 1))}
                        className="p-3 rounded-full border border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50"
                        disabled={activeIndex === LEADERS.length - 1}
                    >
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {LEADERS.map((leader, i) => (
                    <div
                        key={i}
                        className="min-w-[280px] w-[85vw] sm:w-[350px] flex-shrink-0 snap-center group relative overflow-hidden rounded-3xl bg-slate-50 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-[450px]"
                    >
                        <div className="absolute inset-0 bg-slate-200">
                            <div
                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                style={{ backgroundImage: `url("${leader.img}")` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white text-2xl font-bold leading-tight mb-1">{leader.name}</h3>
                                <div className="h-1 w-12 bg-primary rounded-full mb-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></div>
                                <p className="text-primary font-medium tracking-wide text-sm uppercase">{leader.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
