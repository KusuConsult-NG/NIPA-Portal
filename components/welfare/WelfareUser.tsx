export default function WelfareUser() {
    return (
        <>
            <button className="relative rounded-xl p-2.5 transition-colors group hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-700 transition-colors group-hover:text-emerald-600">
                    notifications
                </span>
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
            </button>
            <div
                className="aspect-square h-10 w-10 rounded-xl border-2 border-emerald-600/20 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Welfare")',
                }}
            />
        </>
    );
}
