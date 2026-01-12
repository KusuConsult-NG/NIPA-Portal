'use client';

import WelfareHeader from '../../../components/welfare/WelfareHeader';

export default function WelfareLogsPage() {
    const logs = [
        { id: 1, action: 'Greeting Sent', details: 'Birthday email sent to Adebayo Alade', type: 'System', time: '2 mins ago', status: 'Success' },
        { id: 2, action: 'Profile Updated', details: 'Admin User updated Chioma Nwachukwu', type: 'Admin', time: '1 hour ago', status: 'Success' },
        { id: 3, action: 'Greeting Failed', details: 'SMS delivery failed for Musa Okoro', type: 'System', time: '3 hours ago', status: 'Failed' },
        { id: 4, action: 'Export Generated', details: 'Monthly birthday report downloaded', type: 'Admin', time: '5 hours ago', status: 'Success' },
        { id: 5, action: 'Greeting Sent', details: 'Anniversary email sent to Sarah Johnson', type: 'System', time: 'Yesterday', status: 'Success' },
    ];

    return (
        <div className="bg-background-light text-slate-900 min-h-screen">
            <WelfareHeader />
            <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Logs</h1>
                        <p className="text-slate-600 mt-2 font-medium">Audit trail of all welfare-related activities and automated actions.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-emerald-600/50 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-xl">filter_list</span>
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-emerald-600/50 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-xl">download</span>
                            Export Logs
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Activity</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Type</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Time</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-600 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900">{log.action}</span>
                                                <span className="text-xs text-slate-500 font-medium mt-1">{log.details}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${log.type === 'System' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                                                    'bg-blue-50 text-blue-600 border-blue-100'
                                                }`}>
                                                {log.type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-600 font-medium">{log.time}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`size-2 rounded-full ${log.status === 'Success' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                <span className={`text-xs font-bold ${log.status === 'Success' ? 'text-emerald-700' : 'text-red-700'}`}>{log.status}</span>
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
