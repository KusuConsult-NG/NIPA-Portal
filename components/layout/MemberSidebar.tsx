'use client';

// import { Sidebar, SidebarHeader, SidebarNav, SidebarFooter } from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function MemberSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout, profile } = useAuth();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Member Directory', path: '/directory', icon: 'group' },
        { name: 'Dues & Payments', path: '/payments', icon: 'payments' },
        { name: 'Elections', path: '/elections', icon: 'how_to_vote' },
        { name: 'Messages', path: '/messages', icon: 'chat' },
        { name: 'Welfare', path: '/welfare', icon: 'diversity_1' },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-72 bg-navy-deep text-white border-r border-slate-800 flex flex-col z-50">
            {/* Logo */}
            <div className="h-20 flex items-center px-8 border-b border-white/5">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                        N
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black tracking-tight leading-none text-lg">NIPA</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Portal</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group relative ${isActive(item.path)
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white font-medium'
                            }`}
                    >
                        <span className={`material-symbols-outlined ${isActive(item.path) ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>{item.icon}</span>
                        {item.name}
                        {isActive(item.path) && (
                            <div className="absolute right-3 size-2 bg-white rounded-full shadow-sm"></div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-white/5 bg-black/20">
                <div className="flex flex-col gap-3">
                    <Link href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                        <div className="size-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600 group-hover:border-primary transition-colors overflow-hidden">
                            {profile?.photoURL ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="font-bold text-xs">{profile?.name?.substring(0, 2).toUpperCase() || 'ME'}</span>
                            )}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-bold text-sm truncate">{profile?.name || 'Member'}</span>
                            <span className="text-xs text-slate-500 truncate">{profile?.email}</span>
                        </div>
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                        <Link href="/profile" className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-400 hover:text-white transition-all">
                            <span className="material-symbols-outlined text-base">settings</span>
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 hover:text-red-300 transition-all"
                        >
                            <span className="material-symbols-outlined text-base">logout</span>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
