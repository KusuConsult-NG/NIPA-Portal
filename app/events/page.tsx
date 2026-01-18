'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function EventsPage() {
    const { user } = useAuth();
    const [filter, setFilter] = useState('upcoming');
    const [view, setView] = useState<'grid' | 'calendar'>('grid');

    interface Event {
        id: string;
        title: string;
        date: Date;
        location: string;
        type: string;
        description: string;
        capacity: number;
        registered: number;
        image: string;
        status: string;
        createdBy?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createdAt?: any;
    }

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    // Data States
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [createFormData, setCreateFormData] = useState({ title: '', date: '', location: '', type: 'Summit', description: '' });
    const [loading, setLoading] = useState(false);

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Initial Data Fetch
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const q = query(collection(db, 'events'), orderBy('date', 'asc'));
                const querySnapshot = await getDocs(q);
                const eventsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date?.toDate() || new Date(), // Handle Firestore Timestamp
                })) as unknown as Event[];
                // If no events, fall back to static for demo
                if (eventsData.length === 0) {
                    setEvents(STATIC_EVENTS as unknown as Event[]); // Cast fallback too just in case
                } else {
                    setEvents(eventsData);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents(STATIC_EVENTS); // Fallback
            }
        };

        fetchEvents();
    }, []);

    // Auto-dismiss toast
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleRegister = (event: Event) => {
        if (!user) {
            setToast({ message: "Please login to register", type: 'error' });
            return;
        }
        setSelectedEvent(event);
        setIsRegisterModalOpen(true);
    };

    const confirmRegistration = async () => {
        setLoading(true);
        try {
            await addDoc(collection(db, 'registrations'), {
                eventId: selectedEvent?.id,
                eventTitle: selectedEvent?.title,
                userId: user?.uid,
                userEmail: user?.email,
                registeredAt: Timestamp.now()
            });
            setToast({ message: "Registration confirmed!", type: 'success' });
            setIsRegisterModalOpen(false);
        } catch (error) {
            console.error("Registration failed", error);
            setToast({ message: "Registration failed. Try again.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleShare = (title: string) => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Check out this event: ${title}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setToast({ message: "Link copied to clipboard!", type: 'success' });
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newEvent = {
                title: createFormData.title,
                date: new Date(createFormData.date), // Convert string to Date
                location: createFormData.location,
                type: createFormData.type,
                description: createFormData.description || "No description provided.",
                capacity: 500, // Default
                registered: 0,
                image: 'https://images.unsplash.com/photo-1540910419892-4308b58d0f1f?w=800', // Default placeholder
                status: 'upcoming',
                createdBy: user?.uid,
                createdAt: Timestamp.now()
            };

            const docRef = await addDoc(collection(db, 'events'), newEvent);
            setEvents(prev => [...prev, { id: docRef.id, ...newEvent }]);

            setToast({ message: "Event created successfully!", type: 'success' });
            setIsCreateModalOpen(false);
            setCreateFormData({ title: '', date: '', location: '', type: 'Summit', description: '' });
        } catch (error) {
            console.error("Error creating event:", error);
            setToast({ message: "Failed to create event.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredEvents = events.filter(event => {
        const now = new Date();
        // Reset hours to compare just dates if needed, but for events, time matters.
        if (filter === 'upcoming') return event.date >= now;
        if (filter === 'past') return event.date < now;
        return true; // 'all'
    });

    return (
        <div className="min-h-screen bg-background-light font-display">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl z-60 font-bold text-white animate-in slide-in-from-top-5 ${toast.type === 'success' ? 'bg-primary' : 'bg-red-500'}`}>
                    {toast.message}
                </div>
            )}

            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Events</h1>
                        <p className="text-sm text-slate-600 font-medium">Upcoming NIPA events and workshops</p>
                    </div>
                    {/* Only show Create button if user is authenticated (and ideally admin, but allowing for all for demo) */}
                    {user && (
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">add</span>
                            Create Event
                        </button>
                    )}
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div className="flex gap-3 bg-white p-1.5 rounded-full border border-slate-200">
                        {['upcoming', 'past', 'all'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filter === f
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-slate-100 text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <span className="material-symbols-outlined">grid_view</span>
                        </button>
                        <button
                            onClick={() => setView('calendar')}
                            className={`p-2 rounded-lg transition-all ${view === 'calendar' ? 'bg-slate-100 text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <span className="material-symbols-outlined">calendar_month</span>
                        </button>
                    </div>
                </div>

                {/* Grid View */}
                {view === 'grid' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <div
                                            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                            style={{ backgroundImage: `url("${event.image}")` }}
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-4 py-1.5 backdrop-blur-md text-white text-xs font-black uppercase rounded-full shadow-lg ${event.date < new Date() ? 'bg-slate-500/90' : 'bg-primary/90'}`}>
                                                {event.date < new Date() ? 'Completed' : event.type}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h3 className="text-white text-2xl font-black mb-2 leading-tight drop-shadow-md">{event.title}</h3>
                                            <div className="flex items-center gap-4 text-white/90 text-sm font-medium">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg">calendar_today</span> {event.date.toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg">location_on</span> {event.location.split(',')[0]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 space-y-6">
                                        <div className="flex items-start justify-between">
                                            <p className="text-slate-600 leading-relaxed font-medium">{event.description}</p>
                                        </div>

                                        {/* Capacity */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                                                <span>Registration Status</span>
                                                <span>{Math.round((event.registered / event.capacity) * 100)}% Full</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-primary h-full rounded-full"
                                                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-4 pt-2">
                                            <button
                                                onClick={() => handleRegister(event)}
                                                disabled={event.date < new Date()}
                                                className={`flex-1 py-4 text-white rounded-xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 group/btn ${event.date < new Date() ? 'bg-slate-400 cursor-not-allowed shadow-none' : 'bg-primary hover:brightness-110 shadow-primary/20'}`}
                                            >
                                                <span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">{event.date < new Date() ? 'event_busy' : 'confirmation_number'}</span>
                                                {event.date < new Date() ? 'Registration Closed' : 'Register Now'}
                                            </button>
                                            <button
                                                onClick={() => handleShare(event.title)}
                                                className="size-14 flex items-center justify-center bg-slate-50 text-slate-600 border border-slate-200 rounded-xl hover:bg-white hover:border-primary hover:text-primary transition-all shadow-sm"
                                            >
                                                <span className="material-symbols-outlined">share</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="inline-flex bg-slate-100 p-4 rounded-full mb-4">
                                    <span className="material-symbols-outlined text-4xl text-slate-400">event_busy</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">No Events Found</h3>
                                <p className="text-slate-500 max-w-md mx-auto">There are no {filter} events scheduled at this time.</p>
                                {filter !== 'all' && (
                                    <button onClick={() => setFilter('all')} className="mt-6 text-primary font-bold hover:underline">
                                        View All Events
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Calendar View Placeholder (Simplified for brevity, but functional toggle) */}
                {view === 'calendar' && (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <div className="max-w-md text-center">
                            <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">calendar_month</span>
                            <h3 className="text-xl font-black text-slate-900 mb-2">Calendar View</h3>
                            <p className="text-slate-500 mb-8">Switch to Grid view to see event details, or use the list below.</p>

                            {filteredEvents.length > 0 ? (
                                <div className="space-y-4 w-full">
                                    {filteredEvents.map(event => (
                                        <div key={event.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-left hover:border-primary/30 transition-colors cursor-pointer group">
                                            <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-lg w-14 h-14 shrink-0 shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                                                <span className="text-[10px] font-bold uppercase text-slate-500">{event.date.toLocaleString('default', { month: 'short' })}</span>
                                                <span className="text-xl font-black text-slate-900">{event.date.getDate()}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-900 truncate">{event.title}</h4>
                                                <p className="text-xs text-slate-500 truncate">{event.location}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${event.status === 'upcoming' ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-500'}`}>
                                                {event.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 font-medium italic">No events to display in this view.</p>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Create Event Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Event">
                <form onSubmit={handleCreateSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Event Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
                            placeholder="e.g. Annual Policy Summit"
                            value={createFormData.title}
                            onChange={e => setCreateFormData({ ...createFormData, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-900">Date</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
                                value={createFormData.date}
                                onChange={e => setCreateFormData({ ...createFormData, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-900">Type</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
                                value={createFormData.type}
                                onChange={e => setCreateFormData({ ...createFormData, type: e.target.value })}
                            >
                                <option value="Summit">Summit</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Gala">Gala</option>
                                <option value="Seminar">Seminar</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Location</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
                            placeholder="e.g. Main Auditorium"
                            value={createFormData.location}
                            onChange={e => setCreateFormData({ ...createFormData, location: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Description</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none h-24 resize-none"
                            placeholder="Brief description of the event..."
                            value={createFormData.description}
                            onChange={e => setCreateFormData({ ...createFormData, description: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </form>
            </Modal>

            {/* Register Modal */}
            <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} title="Confirm Registration">
                <div className="space-y-6 text-center">
                    <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-4xl text-primary">confirmation_number</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{selectedEvent?.title}</h4>
                        <p className="text-slate-500">Are you sure you want to register for this event? A confirmation email will be sent to your registered address.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-left space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Date</span>
                            <span className="font-bold text-slate-900">{selectedEvent?.date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Location</span>
                            <span className="font-bold text-slate-900">{selectedEvent?.location}</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsRegisterModalOpen(false)}
                            className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmRegistration}
                            disabled={loading}
                            className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            {loading ? 'Registering...' : 'Confirm Registration'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

// Static Fallback Data
const STATIC_EVENTS = [
    {
        id: '1',
        title: 'National Strategy Plenary 2024',
        date: new Date('2024-11-12'),
        time: '09:00 AM',
        location: 'Main Auditorium, Abuja',
        type: 'Summit',
        capacity: 500,
        registered: 342,
        description: 'Annual strategic planning session for all NIPA members to discuss national policy directions.',
        image: 'https://images.unsplash.com/photo-1540910419892-4308b58d0f1f?w=800',
        status: 'upcoming'
    },
    {
        id: '2',
        title: 'NIPA Gala & Awards Dinner',
        date: new Date('2024-11-24'),
        time: '07:00 PM',
        location: 'Grand Ballroom, Eko Hotel, Lagos',
        type: 'Gala',
        capacity: 300,
        registered: 287,
        description: 'Annual fundraising gala celebrating excellence in strategic leadership.',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        status: 'upcoming'
    },
    {
        id: '3',
        title: 'Cybersecurity Policy Workshop',
        date: new Date('2024-12-05'),
        time: '10:00 AM',
        location: 'NIPA Training Center, Abuja',
        type: 'Workshop',
        capacity: 100,
        registered: 78,
        description: 'Hands-on workshop on implementing national cybersecurity frameworks.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        status: 'upcoming'
    },
    {
        id: '4',
        title: '2023 Executive Retreat',
        date: new Date('2023-11-15'),
        time: '09:00 AM',
        location: 'Transcorp Hilton, Abuja',
        type: 'Retreat',
        capacity: 200,
        registered: 180,
        description: 'Past executive retreat focusing on leadership development in the digital age.',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
        status: 'past'
    }
];
