'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { listUsers, User } from '@/lib/firestore';

export default function DirectoryPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter States
    const [selectedCohort, setSelectedCohort] = useState('All SEC');
    const [selectedProfession, setSelectedProfession] = useState('Any');
    const [selectedLocation, setSelectedLocation] = useState('Nigeria');

    // UI States for Dropdowns
    const [openFilter, setOpenFilter] = useState<'none' | 'cohort' | 'profession' | 'location'>('none');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { users } = await listUsers({ limit: 100 });
                setUsers(users);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Extract unique options
    const cohorts = ['All SEC', ...Array.from(new Set(users.map(u => u.cohort))).filter((c): c is string => !!c).sort()];
    const professions = ['Any', ...Array.from(new Set(users.map(u => u.profession))).filter((p): p is string => !!p).sort()];
    const locations = ['Nigeria', ...Array.from(new Set(users.map(u => u.location))).filter((l): l is string => !!l).sort()];

    // Filter Logic
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.cohort.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCohort = selectedCohort === 'All SEC' || user.cohort === selectedCohort;
        const matchesProfession = selectedProfession === 'Any' || user.profession === selectedProfession;
        // Default 'Nigeria' usually implies 'All' in this context unless specific states are used.
        // Assuming 'Nigeria' means 'All Logic' or checking if location includes 'Nigeria' if strictly filtering by country.
        // Given the UI had "State: Nigeria", I'll treat "Nigeria" as "All Locations" for now, or match explicitly.
        // Let's assume "Nigeria" is the default "All" label.
        const matchesLocation = selectedLocation === 'Nigeria' || user.location === selectedLocation;

        return matchesSearch && matchesCohort && matchesProfession && matchesLocation;
    });

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCohort('All SEC');
        setSelectedProfession('Any');
        setSelectedLocation('Nigeria');
    };

    // Click outside to close (simple implementation)
    useEffect(() => {
        const close = () => setOpenFilter('none');
        if (openFilter !== 'none') window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, [openFilter]);

    const toggleFilter = (e: React.MouseEvent, filter: 'cohort' | 'profession' | 'location') => {
        e.stopPropagation(); // prevent window click
        setOpenFilter(openFilter === filter ? 'none' : filter);
    };

    return (
        <div className="bg-background-light text-slate-900 min-h-screen font-display">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <div className="text-primary">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black tracking-tight uppercase text-navy-deep">NIPA</span>
                                <span className="text-[8px] opacity-60 tracking-widest uppercase text-slate-500">Member Portal</span>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <Link className="text-sm font-semibold text-slate-600 hover:text-primary transition-all" href="/dashboard">Home</Link>
                            <Link className="text-sm font-semibold text-primary transition-all border-b-2 border-primary pb-1" href="/directory">Directory</Link>
                            <Link className="text-sm font-semibold text-slate-600 hover:text-primary transition-all" href="/events">Events</Link>
                            <Link className="text-sm font-semibold text-slate-600 hover:text-primary transition-all" href="/courses">Courses</Link>
                            <Link className="text-sm font-semibold text-slate-600 hover:text-primary transition-all" href="#">Resources</Link>
                        </nav>
                        <div className="flex items-center gap-5">
                            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                                <span className="material-symbols-outlined text-2xl">notifications</span>
                            </button>
                            <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden ring-2 ring-primary/10">
                                <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmkxQB0Y_lA_cPfKoBD3DMA6oUtg6ytwqqLo-Dlay51IzR6AOLF0pUi41YHpWr2rPiIkJ7D37mu7h6V8Rc1CZJUsCcQ3EHOdwp_DGDJTBf4c-_XDji-yDCMWFYQxGaWnKk0A6K-uGd5dsrDjBzcAGJ1lTwouof6bbqjJomLdX1T5gMhRbPup9uWV9yGY_Fj7BUHQN-LZ3O0T3X7OVBHrrXcaVTvVmoEpzjxo8k_4IdISvrozFjVAah8JjcXjaaPngCKp0bayL4QfA" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Member Directory</h1>
                        <p className="text-slate-500 text-lg">Access the full network of Senior Executive Course alumni.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 font-bold text-sm text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export Directory
                        </button>
                        <Link href="/directory/invite" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined text-lg">person_add</span>
                            Invite Member
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 overflow-visible z-20 relative">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input
                                    className="block w-full pl-12 pr-4 py-3.5 border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder-slate-400"
                                    placeholder="Search by name, organization or profession..."
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 relative">
                            {/* Cohort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleFilter(e, 'cohort')}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${openFilter === 'cohort' ? 'border-primary ring-2 ring-primary/10 bg-white text-primary' : 'bg-slate-50 border-slate-200 hover:border-primary/40 text-slate-700'}`}
                                >
                                    <span className="text-slate-500">Cohort:</span> <span>{selectedCohort}</span>
                                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                                </button>
                                {openFilter === 'cohort' && (
                                    <div className="absolute top-full text-slate-600 mt-2 left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
                                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                            {cohorts.map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => setSelectedCohort(option)}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${selectedCohort === option ? 'text-primary font-bold bg-primary/5' : ''}`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Profession Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleFilter(e, 'profession')}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${openFilter === 'profession' ? 'border-primary ring-2 ring-primary/10 bg-white text-primary' : 'bg-slate-50 border-slate-200 hover:border-primary/40 text-slate-700'}`}
                                >
                                    <span className="text-slate-500">Profession:</span> <span>{selectedProfession}</span>
                                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                                </button>
                                {openFilter === 'profession' && (
                                    <div className="absolute top-full text-slate-600 mt-2 left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
                                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                            {professions.map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => setSelectedProfession(option)}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${selectedProfession === option ? 'text-primary font-bold bg-primary/5' : ''}`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Location Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleFilter(e, 'location')}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${openFilter === 'location' ? 'border-primary ring-2 ring-primary/10 bg-white text-primary' : 'bg-slate-50 border-slate-200 hover:border-primary/40 text-slate-700'}`}
                                >
                                    <span className="text-slate-500">State:</span> <span>{selectedLocation}</span>
                                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                                </button>
                                {openFilter === 'location' && (
                                    <div className="absolute top-full text-slate-600 mt-2 left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
                                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                            {locations.map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => setSelectedLocation(option)}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${selectedLocation === option ? 'text-primary font-bold bg-primary/5' : ''}`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                            <button
                                className="flex items-center gap-1.5 px-3 py-3 text-slate-400 hover:text-red-500 text-sm font-bold transition-colors"
                                onClick={resetFilters}
                            >
                                <span className="material-symbols-outlined text-lg">filter_alt_off</span>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    </div>
                ) : filteredUsers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                                <div className="p-8 flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                            {/* Use a placeholder if no photoURL is available (mock logic for now as photoURL isn't in User interface explicitly but commonly added) */}
                                            <img className="w-full h-full object-cover" src={'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.name} alt={user.name} />
                                        </div>
                                        <div className={`absolute bottom-1 right-1 w-6 h-6 border-4 border-white rounded-full shadow-sm ${user.status === 'active' ? 'bg-primary' : 'bg-slate-300'}`} title={user.status}></div>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">{user.name}</h3>
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">{user.cohort || 'N/A'}</span>
                                        <p className="text-sm font-medium text-slate-500">{user.profession || 'Member'}</p>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-base">location_on</span>
                                        {user.location || 'Nigeria'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                        <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                        <Link href={`/directory/${user.id}`} className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-slate-500 font-bold">No members found.</p>
                        <p className="text-slate-400">Try adjusting your filters.</p>
                    </div>
                )}

                <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-10">
                    <div className="hidden sm:block">
                        <p className="text-sm text-slate-500">
                            Showing <span className="font-bold text-slate-900">{filteredUsers.length}</span> members
                        </p>
                    </div>
                    {/* Pagination Placeholder - To be implemented fully with listUsers pagination support */}
                    <div className="flex-1 flex justify-center sm:justify-end">
                        <nav className="inline-flex rounded-xl shadow-sm border border-slate-200 bg-white overflow-hidden">
                            <button className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors" disabled>
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="px-5 py-3 text-sm font-bold bg-primary text-white">1</button>
                            <button className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors" disabled>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </main>
            <footer className="bg-navy-deep text-white border-t border-white/5 py-16 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-primary">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 44C7.25611 4 11.2727 44C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <span className="text-lg font-black tracking-tighter uppercase">National Institute Course Association</span>
                            </div>
                            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
                                Strengthening the bond between alumni and fostering leadership excellence across Nigeria through policy, strategy, and strategic networking.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-white/60 text-sm">
                                <li><Link className="hover:text-primary transition-colors" href="#">About the Institute</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Senior Executive Course</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Upcoming Seminars</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Alumni Benefits</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Support</h4>
                            <ul className="space-y-4 text-white/60 text-sm">
                                <li><Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Terms of Use</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xs text-white/30">
                            © 2024 NIPA Member Portal. Developed for the SEC Alumni Network.
                        </div>
                        <div className="flex gap-6">
                            <Link className="text-white/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></Link>
                            <Link className="text-white/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></Link>
                            <Link className="text-white/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">forum</span></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
