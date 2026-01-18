'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WelfareNav() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path
            ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1'
            : 'text-slate-700 hover:text-emerald-600 transition-colors';
    };

    return (
        <nav className="hidden items-center gap-8 md:flex">
            <Link className={`text-sm font-bold leading-normal ${isActive('/welfare')}`} href="/welfare">Dashboard</Link>
            <Link className={`text-sm font-bold leading-normal ${isActive('/welfare/members')}`} href="/welfare/members">Members</Link>
            <Link className={`text-sm font-bold leading-normal ${isActive('/welfare/logs')}`} href="/welfare/logs">Logs</Link>
            <Link className={`text-sm font-bold leading-normal ${isActive('/welfare/reports')}`} href="/welfare/reports">Reports</Link>
        </nav>
    );
}
