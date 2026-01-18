'use client';

import PublicHeader from '@/components/layout/PublicHeader';

export default function GalleryPage() {
    const galleryItems = [
        { id: 1, image: 'https://images.unsplash.com/photo-1576267423445-807c69753060?q=80&w=2670&auto=format&fit=crop', category: 'Conferences' },
        { id: 2, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop', category: 'Meetings' },
        { id: 3, image: 'https://images.unsplash.com/photo-1541872703-74c5e105696c?q=80&w=2670&auto=format&fit=crop', category: 'Events' },
        { id: 4, image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop', category: 'Workshops' },
        { id: 5, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2669&auto=format&fit=crop', category: 'Leadership' },
        { id: 6, image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2670&auto=format&fit=crop', category: 'Policy' },
    ];

    return (
        <div className="min-h-screen bg-background-light font-display">
            <PublicHeader />

            {/* Header */}
            <header className="bg-navy-deep relative overflow-hidden text-white py-20 md:py-24">
                <div className="absolute inset-0 bg-hero-gradient opacity-30"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl transform translate-x-1/2"></div>
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                        Our <span className="text-primary">Gallery</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Visual highlights from our events, workshops, and strategic engagements.
                    </p>
                </div>
            </header>

            {/* Gallery Grid */}
            <section className="py-20 max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryItems.map((item) => (
                        <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-slate-200 aspect-square cursor-pointer shadow-sm hover:shadow-xl transition-all">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.image})` }}
                            ></div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <span className="inline-block px-3 py-1 bg-primary text-navy-deep text-xs font-bold rounded-lg uppercase tracking-wider">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
