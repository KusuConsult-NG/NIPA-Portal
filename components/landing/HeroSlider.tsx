'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
    {
        image: '/images/nipss-hero.png',
        title: 'The National Institute',
        subtitle: 'Shaping Strategy',
        description: 'Empowering leaders to architect the future of national governance and global policy.'
    },
    {
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2574&auto=format&fit=crop', // Fallback prestigious building
        title: 'Thought Leadership',
        subtitle: 'For Development',
        description: 'Fostering deep collaboration and institutional alignment for sustainable nation building.'
    },
    {
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop', // Conference/Meeting
        title: 'Network of Excellence',
        subtitle: 'Uniting Leaders',
        description: 'Promoting the ideals of the National Institute in stimulating policy, leadership, and development.'
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[600px] md:h-[800px] overflow-hidden bg-navy-deep">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-8000 ease-linear scale-105"
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            transform: index === currentSlide ? 'scale(1.1)' : 'scale(1.0)'
                        }}
                    ></div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/60 to-transparent"></div>
                </div>
            ))}

            {/* Content */}
            <div className="relative z-20 h-full max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col justify-center">
                <div className="max-w-2xl space-y-8">
                    {/* Dynamic Content */}
                    <div className="min-h-[280px]"> {/* Fixed height for smoother transition */}
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-700 absolute top-0 left-0 ${index === currentSlide
                                    ? 'opacity-100 translate-y-0 relative'
                                    : 'opacity-0 translate-y-8 absolute pointer-events-none'
                                    }`}
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 w-fit rounded-full mb-6 backdrop-blur-sm">
                                    <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                                    <span className="text-primary font-bold tracking-widest text-xs uppercase">National Leadership Council</span>
                                </div>
                                <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
                                    {slide.title} <br />
                                    <span className="text-primary">{slide.subtitle}</span>
                                </h1>
                                <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                                    {slide.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link href="/signup" className="bg-primary text-navy-deep px-8 py-4 rounded-full font-black hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-primary/25 flex items-center gap-2">
                            Join the Association <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <Link href="/about" className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2">
                            Learn More <span className="material-symbols-outlined">info</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
