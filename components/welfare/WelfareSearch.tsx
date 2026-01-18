export default function WelfareSearch() {
    return (
        <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 text-lg text-slate-500 -translate-y-1/2">search</span>
            <input
                className="w-72 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 transition-all focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/50"
                placeholder="Find..."
            />
        </div>
    );
}
