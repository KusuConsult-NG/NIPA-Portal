'use client';

import WelfareNav from './WelfareNav';
import WelfareSearch from './WelfareSearch';
import WelfareUser from './WelfareUser';

export default function WelfareHeader() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-4 md:px-20">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-slate-900">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                        <span className="material-symbols-outlined font-bold">account_balance</span>
                    </div>
                    <h2 className="text-xl font-extrabold leading-tight tracking-tight">PSLC <span className="text-emerald-600">Welfare</span></h2>
                </div>
                <WelfareNav />
            </div>
            <div className="flex items-center gap-4">
                <WelfareSearch />
                <WelfareUser />
            </div>
        </header>
    );
}
