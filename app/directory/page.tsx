'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { listUsers, User } from '@/lib/firestore';
import MemberSidebar from '@/components/layout/MemberSidebar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

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

    const { user, profile, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && (!user || profile?.role !== 'admin')) {
            router.replace('/dashboard');
        }
    }, [user, profile, authLoading, router]);

    useEffect(() => {
        if (authLoading || profile?.role !== 'admin') return;
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
        <div className="flex min-h-screen bg-background-main font-sans text-slate-900">
            <MemberSidebar />

            <main className="flex-1 ml-72">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Member Directory</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Access the full network of Senior Executive Course alumni</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 font-bold text-sm text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export
                        </button>
                        <Link href="/directory/invite" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined text-lg">person_add</span>
                            Invite
                        </Link>
                    </div>
                </header>

                <div className="p-10">
                    {/* Search and Filters */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input
                                        className="block w-full pl-12 pr-4 py-3.5 border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder-slate-500"
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
                                        <span className="text-slate-600">Cohort:</span> <span>{selectedCohort}</span>
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
                                        <span className="text-slate-600">Profession:</span> <span>{selectedProfession}</span>
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
                                        <span className="text-slate-600">Location:</span> <span>{selectedLocation}</span>
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
                                    className="flex items-center gap-1.5 px-3 py-3 text-slate-500 hover:text-red-500 text-sm font-bold transition-colors"
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
                                                <img className="w-full h-full object-cover" src={'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.name} alt={user.name} />
                                            </div>
                                            <div className={`absolute bottom-1 right-1 w-6 h-6 border-4 border-white rounded-full shadow-sm ${user.status === 'active' ? 'bg-primary' : 'bg-slate-300'}`} title={user.status}></div>
                                        </div>
                                        <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">{user.name}</h3>
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">{user.cohort || 'N/A'}</span>
                                            <p className="text-sm font-medium text-slate-600">{user.profession || 'Member'}</p>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-8 flex items-center gap-1.5">
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
                </div>
            </main>
        </div>
    );
}
