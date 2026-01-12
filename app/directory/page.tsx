'use client';

import Link from 'next/link';

export default function DirectoryPage() {
    return (
        <div className="bg-background-light text-slate-900 min-h-screen font-display">
            <header className="sticky top-0 z-50 bg-navy-deep text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <div className="text-primary">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black tracking-tight uppercase">NIPA</span>
                                <span className="text-[8px] opacity-60 tracking-widest uppercase">Member Portal</span>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <Link className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-all" href="/dashboard">Home</Link>
                            <Link className="text-sm font-semibold text-primary transition-all border-b-2 border-primary pb-1" href="/directory">Directory</Link>
                            <Link className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-all" href="/events">Events</Link>
                            <Link className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-all" href="#">Courses</Link>
                            <Link className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-primary transition-all" href="#">Resources</Link>
                        </nav>
                        <div className="flex items-center gap-5">
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-2xl">notifications</span>
                            </button>
                            <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden ring-2 ring-white/10">
                                <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmkxQB0Y_lA_cPfKoBD3DMA6oUtg6ytwqqLo-Dlay51IzR6AOLF0pUi41YHpWr2rPiIkJ7D37mu7h6V8Rc1CZJUsCcQ3EHOdwp_DGDJTBf4c-_XDji-yDCMWFYQxGaWnKk0A6K-uGd5dsrDjBzcAGJ1lTwouof6bbqjJomLdX1T5gMhRbPup9uWV9yGY_Fj7BUHQN-LZ3O0T3X7OVBHrrXcaVTvVmoEpzjxo8k_4IdISvrozFjVAah8JjcXjaaPngCKp0bayL4QfA" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Member Directory</h1>
                        <p className="text-slate-500 text-lg">Access the full network of Senior Executive Course alumni.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 font-bold text-sm text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export Directory
                        </button>
                        <Link href="/directory/invite" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined text-lg">person_add</span>
                            Invite Member
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input className="block w-full pl-12 pr-4 py-3.5 border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder-slate-400" placeholder="Search by name, organization or profession..." type="text" />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 text-sm font-semibold transition-all">
                                <span className="text-slate-500">Cohort:</span> <span>All SEC</span>
                                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                            </button>
                            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 text-sm font-semibold transition-all">
                                <span className="text-slate-500">Profession:</span> <span>Any</span>
                                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                            </button>
                            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 text-sm font-semibold transition-all">
                                <span className="text-slate-500">State:</span> <span>Nigeria</span>
                                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                            </button>
                            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                            <button className="flex items-center gap-1.5 px-3 py-3 text-slate-400 hover:text-red-500 text-sm font-bold transition-colors">
                                <span className="material-symbols-outlined text-lg">filter_alt_off</span>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALtz3_n979tg3Wa8qkZlYloqX5uzGNKR90zsiVENBlHt8GBuHIf2BmiNtN48LXgtqx6sXLzjjkHh3RqLs_iBDV1W6BxhMMm5zzTcyRZ3H3Om_lLOT8kIE2d2E1uYzQSkF2uGW4YJohsgKJe-09RyfEGurXazVSexKY7rn66fHkjeuKmtQNBBcNuFdQC1DS8HKMwUqxag4mSAJ3V3ihqZvN46zolu34f_RBnbJNFWqeB4HzbwVs1DNAIPGcza3U0cR0VJdKJyV459g" />
                                </div>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-sm" title="Active"></div>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">Dr. Jane Doe</h3>
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">SEC 45</span>
                                <p className="text-sm font-medium text-slate-500">Strategic Consultant</p>
                            </div>
                            <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                Lagos, Nigeria
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                <Link href="/directory/1" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcWgZZotnJnMeGTESPAEv-SAvnLIrpj-WVjvW-BLrx0_guCS0eE2pwr8kxtN1XULzSEiRAU1-aMQhR4lXvEjBogartUFctEE1y5RNcZbAfmGIG6YfPx87m2BTKJcgAHCiRyDBPwR6DUZa01dkTqiXZCKV6B0q0G_cUx0C-GneWnPdl_WsdAXtR9M4lhmT_uFMQDOi8NksCTQYl_rBzQz4wWP-e8XBLYFwc6s8hDAIcCctPDop3v3ZcDcxp1GeZskvIxnFTSuHsuhQ" />
                                </div>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-sm" title="Active"></div>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">Col. Musa Ibrahim</h3>
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">SEC 42</span>
                                <p className="text-sm font-medium text-slate-500">Military Officer</p>
                            </div>
                            <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                Abuja, FCT
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                <Link href="/directory/1" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL2oEtWe2ui9ZJbJPsMlQxzIJIgAUU_ooeSJLzWpVhrSpcztgaSS1PYcYaWRQeg5FMyQU_gemf_BkP0zsOia0JfPGOM6dR9lm9A0twekBs-R1uUcGilSWGAKIe6FIYVZRUV9HSxlCzZ1WeHJ80SU_UngvTFxTUyLAeJNJZ7PHK5_MTA3qzAt43vJ3p_aWUH5qLHDBpQNKI52FpV3GXs8GYY4If3rrYQeK3eEE3pSwQ8GZXymETdmNQpf9XJXhcuZgYTSM6ctkpXzw" />
                                </div>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-sm" title="Active"></div>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">Engr. Sarah Aliyu</h3>
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">SEC 44</span>
                                <p className="text-sm font-medium text-slate-500">Civil Engineer</p>
                            </div>
                            <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                Kano, Nigeria
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                <Link href="/directory/1" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTSnBDJGo8fQIzfLJ5SmFYzV0TjLXHSO1M2vQsBZaemtc4skVYNYm2xgPHp5K_Md15QTp0mRfXdtSu9Z8KNa7GoXRulqzhhmjqU68qsYMfmMHihC4UC6L4GS4H87Wt-XskvUxTQUhRWaIhykdW8IirhG0wATnf6wMq3RrEXqC6Mp9xRBWEfI_OsDgwaCel4DsiasdEICWNDakSrPg3ihuDp-W_Y2Z79u7fct0N2AmFWOf2vETcjW_ymn3sCV7Zbsz8SG4yNqfIw8M" />
                                </div>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-sm" title="Active"></div>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">Prof. David Okon</h3>
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">SEC 40</span>
                                <p className="text-sm font-medium text-slate-500">Academic Researcher</p>
                            </div>
                            <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                Enugu, Nigeria
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                <Link href="/directory/1" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5GkmkLLsmFLmmPm2lVe1YYe5z5Extl1zHbprOx_-TIOjbc4Jb2Xk6qG_nnsmDkhQQrZp84dDKn5Y4sRvOq3oQ6tmLzATGrik4dOeq9nWGVqF4AzL-EXTSRMNztFPgwkuu1AHCVL-JmuYdNR76Mm7jmKFNMivQu2av9hyu7hj_oWrFof_2MZlYrrF7AKvgjvt5LaT6pQ1EhSMVorCPq0vfeGMTX2ok8g8RrZ0Gi658HDxbtL060OBoCA6vugCmhPUha-sFkrLkas" />
                                </div>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-sm" title="Active"></div>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">Aisha Bello</h3>
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">SEC 45</span>
                                <p className="text-sm font-medium text-slate-500">Policy Analyst</p>
                            </div>
                            <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                Kaduna, Nigeria
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                <Link href="/directory/1" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYvD9B1PJN35dm4M5_CREEuv_c3QezYL8GutXuckjfsxVrD0nyU82ivgFYj0DxQQ2HIPG0Xe81E3SU5Cbaduo46j0FAIc0HKLBmGsPHc0jdC7Dvgov16cFw7dX0Yn6_yK4cYvndJ2RnArHIJLsXIxGnkdY5xdA0vrGFB-dojNouIsd_TbubMJmvSt3kj_F8_-gnsr0Lml5jeadlyie_wv0XrIxjcz4cvXxE9ICm6Qz1ln5CPHgJ7HmQ6lbYHUk2sxTVnM1KdHGFEA" />
                                </div>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-sm" title="Active"></div>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">Capt. John Smith</h3>
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">SEC 43</span>
                                <p className="text-sm font-medium text-slate-500">Naval Officer</p>
                            </div>
                            <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                Port Harcourt
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                <Link href="/directory/1" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqgE5S-a4TnX_FwSAKpn8G9eaat9qjfm8Dtez1ywVO89F5oskfWY8YSzG7gT4ctM9zDcRuvzNDuFlwlYQglXH5vxtNGquElTN27AmpPxdPnjtFsGpOhjy3z9oyQBAlnFLfbYoL3ldJFQ3z8Yd_kv1lqpmjYrbhwb8k4OW1OfincBDQOQVzYmQwVP2WbOT7BY_mKpjrktxvnuzUjVRMqWSL8Y_7PwF41jpDF6RSqOv9nJoeuW47QXz2dW1TjdpuFeIYzBy42IkRuOs" />
                                </div>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-sm" title="Active"></div>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">Barr. Fatima Yusuf</h3>
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">SEC 41</span>
                                <p className="text-sm font-medium text-slate-500">Legal Practitioner</p>
                            </div>
                            <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                Ibadan, Oyo
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                <Link href="/directory/1" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all group relative">
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5SMwbrI_rF-LxIIjwQEworlwbrca0Q1FBlWpZndW7AK8uuCCOQjcEVDxZDUOLIyjsb5UB8HQxEiNv9iruCFo4DmN6g4XzicLeZSCclT0fnPlCP113ev4gBKUHFtpkAGFxAv1h9urxfkQzHv7TIl9FtWfqLyQTyrs1NjmwuY3fk4yIWzT_bcu376DckXxV5ilV_ev3TVGmxQPz3xZAIWzsUCg9x7vhTpi1CPFKRMhIdthpMh5m5SeeJooor4dNkZJx_8GT1ww_aTs" />
                                </div>
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-sm" title="Active"></div>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-primary transition-colors">Dr. Samuel Ade</h3>
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black tracking-widest uppercase mb-2">SEC 44</span>
                                <p className="text-sm font-medium text-slate-500">Medical Director</p>
                            </div>
                            <p className="text-sm text-slate-400 mb-8 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                Jos, Plateau
                            </p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <Link href="/messages" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">Message</Link>
                                <Link href="/directory/1" className="py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center">View Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-10">
                    <div className="hidden sm:block">
                        <p className="text-sm text-slate-500">
                            Showing <span className="font-bold text-slate-900">1</span> to <span className="font-bold text-slate-900">12</span> of <span className="font-bold text-slate-900">1,240</span> members
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center sm:justify-end">
                        <nav className="inline-flex rounded-xl shadow-sm border border-slate-200 bg-white overflow-hidden">
                            <Link className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors" href="#">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </Link>
                            <Link className="px-5 py-3 text-sm font-bold bg-primary text-white" href="#">1</Link>
                            <Link className="px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors" href="#">2</Link>
                            <Link className="px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors" href="#">3</Link>
                            <span className="px-5 py-3 text-sm font-bold text-slate-400">...</span>
                            <Link className="px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors" href="#">104</Link>
                            <Link className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors" href="#">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </main>
            <footer className="bg-navy-deep text-white border-t border-white/5 py-16 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-primary">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 44C7.25611 4 11.2727 44C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <span className="text-lg font-black tracking-tighter uppercase">National Institute Course Association</span>
                            </div>
                            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
                                Strengthening the bond between alumni and fostering leadership excellence across Nigeria through policy, strategy, and strategic networking.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-white/60 text-sm">
                                <li><Link className="hover:text-primary transition-colors" href="#">About the Institute</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Senior Executive Course</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Upcoming Seminars</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Alumni Benefits</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Support</h4>
                            <ul className="space-y-4 text-white/60 text-sm">
                                <li><Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Terms of Use</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xs text-white/30">
                            © 2024 NIPA Member Portal. Developed for the SEC Alumni Network.
                        </div>
                        <div className="flex gap-6">
                            <Link className="text-white/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></Link>
                            <Link className="text-white/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></Link>
                            <Link className="text-white/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">forum</span></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
