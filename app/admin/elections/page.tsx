'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Election, getAllElections, createElection, updateElectionStatus, ElectionPosition } from '@/lib/firestore';
import Modal from '@/components/ui/Modal';

export default function AdminElectionsPage() {
    const { user, profile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [elections, setElections] = useState<Election[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form standard state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'upcoming' as const
    });

    const [positions, setPositions] = useState<ElectionPosition[]>([
        { id: '1', title: 'President', price: '₦50,000', description: 'Head of Exco', icon: 'stars' }
    ]);

    useEffect(() => {
        if (!authLoading && (!user || profile?.role !== 'admin')) {
            router.replace('/dashboard');
        }
    }, [user, profile, authLoading, router]);

    useEffect(() => {
        if (authLoading || profile?.role !== 'admin') return;
        fetchElections();
    }, [authLoading, profile]);

    const fetchElections = async () => {
        try {
            const data = await getAllElections();
            setElections(data);
        } catch (error) {
            console.error("Failed to fetch elections", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateElection = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createElection({
                ...formData,
                positions,
            });
            setIsCreateModalOpen(false);
            fetchElections(); // Refresh list
        } catch (error) {
            console.error("Failed to create election", error);
            alert("Error creating election");
        }
    };

    const handleStatusChange = async (electionId: string, newStatus: Election['status']) => {
        try {
            await updateElectionStatus(electionId, newStatus);
            fetchElections();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-background-light text-slate-900 font-sans">
            {/* Sidebar (copied from admin dashboard) */}
            <aside className="w-72 flex flex-col bg-nipa-navy text-white sticky top-0 h-screen shadow-2xl glass-card border-r border-white/5">
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-10 border border-white/20" style={{ backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Admin")' }} />
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-bold leading-none tracking-tight">NIPA Admin</h1>
                            <p className="text-primary text-[10px] font-bold uppercase tracking-wider mt-1.5">Institute Panel</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1.5 flex-1">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mb-3">Dashboard</p>
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors font-bold">
                            <span className="material-symbols-outlined text-[22px]">grid_view</span>
                            <p className="text-sm">Overview</p>
                        </Link>

                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mt-8 mb-3">Management Tools</p>
                        <Link href="/directory" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-[22px]">badge</span>
                            <p className="text-sm font-bold">Member Directory</p>
                        </Link>
                        <Link href="/events" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-[22px]">event</span>
                            <p className="text-sm font-bold">Events Hub</p>
                        </Link>
                        <Link href="/admin/elections" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-nipa-navy cursor-pointer transition-all font-bold">
                            <span className="material-symbols-outlined text-[22px]">ballot</span>
                            <p className="text-sm">Elections Setup</p>
                        </Link>

                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mt-8 mb-3">Finance</p>
                        <Link href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-[22px]">query_stats</span>
                            <p className="text-sm font-bold">Payment Analytics</p>
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-30 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Electoral Commission</h2>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Configure and monitor elections</p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-black text-sm hover:brightness-110 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Create Election
                    </button>
                </header>

                <div className="p-10 max-w-7xl mx-auto space-y-10">
                    {loading ? (
                        <div className="p-12 flex justify-center">
                            <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                        </div>
                    ) : elections.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">how_to_vote</span>
                            <h3 className="text-xl font-black text-slate-900 mb-2">No Elections Found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">Create a new election cycle to allow members to purchase forms and cast votes.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {elections.map(election => (
                                <div key={election.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${election.status === 'active' ? 'bg-green-100 text-green-700' :
                                                election.status === 'upcoming' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-slate-100 text-slate-500'
                                            }`}>
                                            {election.status}
                                        </div>
                                        <div className="text-slate-400">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-navy-deep leading-tight mb-2">{election.title}</h3>
                                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">{election.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Positions</p>
                                            <p className="font-bold text-slate-900">{election.positions.length}</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Start Date</p>
                                            <p className="font-bold text-slate-900 truncate">{election.startDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <select
                                            value={election.status}
                                            onChange={(e) => handleStatusChange(election.id, e.target.value as any)}
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        >
                                            <option value="upcoming">Upcoming</option>
                                            <option value="active">Active</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Create Election Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Election">
                <form onSubmit={handleCreateElection} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Election Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none font-medium"
                            placeholder="e.g. 2024 NIPA Executive Elections"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none font-medium resize-none"
                            placeholder="Election details and guidelines..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Start Date</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none font-medium"
                                value={formData.startDate}
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">End Date</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none font-medium"
                                value={formData.endDate}
                                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Positions Setup (Simplified for Demo) */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Available Positions</span>
                            <button type="button" onClick={() => setPositions([...positions, { id: Date.now().toString(), title: '', price: '₦0', description: '', icon: 'stars' }])} className="text-xs text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-lg">Add Position</button>
                        </div>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {positions.map((pos, idx) => (
                                <div key={pos.id} className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200/50 last:border-0 last:pb-0">
                                    <input placeholder="Title (e.g. President)" value={pos.title} onChange={e => { const newP = [...positions]; newP[idx].title = e.target.value; setPositions(newP); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" required />
                                    <input placeholder="Form Price (e.g. ₦50,000)" value={pos.price} onChange={e => { const newP = [...positions]; newP[idx].price = e.target.value; setPositions(newP); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" required />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary text-white font-black rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 text-sm tracking-wide"
                    >
                        Save & Create Election
                    </button>
                </form>
            </Modal>
        </div>
    );
}
