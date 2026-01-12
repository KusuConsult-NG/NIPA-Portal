'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WelfareHeader() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'text-slate-700 hover:text-emerald-600 transition-colors';
    };

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 md:px-20 py-4 sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-slate-900">
                    <div className="size-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                        <span className="material-symbols-outlined font-bold">account_balance</span>
                    </div>
                    <h2 className="text-xl font-extrabold leading-tight tracking-tight">NIPA <span className="text-emerald-600">Welfare</span></h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link className={`text-sm font-bold leading-normal ${isActive('/welfare')}`} href="/welfare">Dashboard</Link>
                    <Link className={`text-sm font-bold leading-normal ${isActive('/welfare/members')}`} href="/welfare/members">Members</Link>
                    <Link className={`text-sm font-bold leading-normal ${isActive('/welfare/logs')}`} href="/welfare/logs">Logs</Link>
                    <Link className={`text-sm font-bold leading-normal ${isActive('/welfare/reports')}`} href="/welfare/reports">Reports</Link>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
                    <input className="w-72 pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all placeholder-slate-500 text-slate-900" placeholder="Find..." />
                </div>
                <button className="p-2.5 rounded-xl hover:bg-slate-100 relative group transition-colors">
                    <span className="material-symbols-outlined text-slate-700 group-hover:text-emerald-600 transition-colors">notifications</span>
                    <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-10 border-2 border-emerald-600/20" style={{ backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Welfare")' }} />
            </div>
        </header>
    );
}
