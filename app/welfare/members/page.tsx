'use client';

import WelfareHeader from '../../../components/welfare/WelfareHeader';

export default function WelfareMembersPage() {
    const members = [
        { id: 1, name: 'Adebayo Alade', sec: 'SEC 42, 2020', dob: 'May 14, 1975', phone: '+234 803 123 4567', email: 'adebayo@nipa.org', status: 'Active' },
        { id: 2, name: 'Chioma Nwachukwu', sec: 'SEC 38, 2016', dob: 'May 12, 1970', phone: '+234 809 987 6543', email: 'chioma@nipa.org', status: 'Active' },
        { id: 3, name: 'Musa Okoro', sec: 'SEC 45, 2023', dob: 'May 21, 1980', phone: '+234 802 555 1212', email: 'musa@nipa.org', status: 'Pending Review' },
        { id: 4, name: 'Sarah Johnson', sec: 'SEC 40, 2018', dob: 'June 05, 1978', phone: '+234 810 111 2233', email: 'sarah@nipa.org', status: 'Inactive' },
        { id: 5, name: 'David Ibrahim', sec: 'SEC 44, 2022', dob: 'June 18, 1985', phone: '+234 805 444 7788', email: 'david@nipa.org', status: 'Active' },
    ];

    return (
        <div className="bg-background-light text-slate-900 min-h-screen">
            <WelfareHeader />
            <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Members Directory</h1>
                        <p className="text-slate-600 mt-2 font-medium">Manage welfare details for all registered members.</p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                        <span className="material-symbols-outlined text-xl">person_add</span>
                        Add New Member
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex gap-4">
                        <div className="relative flex-1 max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all placeholder-slate-400 text-slate-900" placeholder="Search members by name or SEC..." />
                        </div>
                        <select className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-600/50 outline-none cursor-pointer">
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Member Info</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">SEC Batch</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Date of Birth</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {members.map((member) => (
                                    <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-sm">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900">{member.name}</div>
                                                    <div className="text-[10px] text-slate-500 font-medium">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-700 font-medium">{member.sec}</td>
                                        <td className="px-8 py-5 text-sm text-slate-700 font-medium">{member.dob}</td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                    member.status === 'Inactive' ? 'bg-slate-100 text-slate-500' :
                                                        'bg-amber-100 text-amber-700'
                                                }`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Edit">
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="History">
                                                    <span className="material-symbols-outlined text-lg">history</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
