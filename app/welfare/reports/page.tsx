'use client';

import WelfareHeader from '../../../components/welfare/WelfareHeader';

export default function WelfareReportsPage() {
    return (
        <div className="bg-background-light text-slate-900 min-h-screen">
            <WelfareHeader />
            <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Analytics & Reports</h1>
                        <p className="text-slate-600 mt-2 font-medium">Insights into member welfare engagement and system performance.</p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                        <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                        Download Annual Report
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">send</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Total Greetings</h3>
                                <p className="text-2xl font-black text-slate-900">1,248</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[75%]"></div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-3 font-medium">75% via Email, 25% via SMS</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Success Rate</h3>
                                <p className="text-2xl font-black text-slate-900">98.2%</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[98%]"></div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-3 font-medium">Only 18 failures recorded this year</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="size-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">savings</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Costs Saved</h3>
                                <p className="text-2xl font-black text-slate-900">₦45,000</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full w-[45%]"></div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-3 font-medium">Compared to manual SMS processing</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-900 mb-6">Engagement Overview</h3>
                        <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400">
                            Chart Placeholder (Engagement Trends)
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-900 mb-6">Monthly Distribution</h3>
                        <div className="space-y-4">
                            {[
                                { month: 'January', val: 85 },
                                { month: 'February', val: 65 },
                                { month: 'March', val: 92 },
                                { month: 'April', val: 40 },
                                { month: 'May', val: 78 }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-slate-600 w-20">{item.month}</span>
                                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.val}%` }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 w-8">{item.val}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
