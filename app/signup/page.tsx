'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cohort: '',
        profession: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setLoading(true);

        try {
            const { signUpWithEmail } = await import('@/lib/firebaseAuth');

            // 1. Create User via centralized helper
            const { firebaseUser } = await signUpWithEmail(formData.email, formData.password, {
                name: formData.name,
                phone: formData.phone,
                cohort: formData.cohort,
                profession: formData.profession
            });

            // 2. Set Cookies immediately to prevent middleware redirect loop
            const { default: Cookies } = await import('js-cookie');
            Cookies.set('session', 'true', { expires: 7 });

            try {
                const token = await firebaseUser.getIdToken();
                Cookies.set('auth_token', token, { expires: 7 });
            } catch (e) {
                console.error("Token error", e);
            }

            // 3. Redirect
            alert('Account created successfully!');
            router.push('/dashboard');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Signup error:', error);
            const errorMessage = error.message || 'Failed to create account. Please try again.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0B1120] via-navy-card to-[#0B1120] flex items-center justify-center p-6 gradient-animate relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-2xl w-full relative z-10 animate-scale-in">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center size-20 bg-linear-to-br from-primary to-accent rounded-3xl mb-6 shadow-2xl shadow-primary/20 ring-4 ring-white/5 animate-bounce-soft">
                        <span className="material-symbols-outlined text-white text-3xl">person_add</span>
                    </div>
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tight animate-slide-up">Join NIPA</h1>
                    <p className="text-slate-400 font-medium text-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>Create your member account</p>
                </div>

                <div className="glass-card bg-navy-card/80 backdrop-blur-xl border-white/10 rounded-4xl p-10 shadow-2xl card-hover">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-navy-deep/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus-glow focus:border-transparent transition-all duration-300 hover:border-white/20"
                                    placeholder="Col. Ahmed Bello"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-navy-deep/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus-glow focus:border-transparent transition-all duration-300 hover:border-white/20"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-navy-deep/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus-glow focus:border-transparent transition-all duration-300 hover:border-white/20"
                                    placeholder="+234 XXX XXX XXXX"
                                />
                            </div>

                            {/* Cohort */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">PSLC Cohort</label>
                                <select
                                    required
                                    value={formData.cohort}
                                    onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                                    className="w-full px-4 py-3 bg-navy-deep/50 border border-white/10 rounded-xl text-white focus-glow focus:border-transparent transition-all duration-300 hover:border-white/20"
                                >
                                    <option value="">Select Cohort</option>
                                    {[...Array(70)].map((_, i) => (
                                        <option key={i} value={`PSLC ${i + 1}`} className="bg-[--color-nipa-navy]">PSLC {i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Profession */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Profession</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.profession}
                                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                                    className="w-full px-4 py-3 bg-navy-deep/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus-glow focus:border-transparent transition-all duration-300 hover:border-white/20"
                                    placeholder="e.g., Military Officer, Strategic Consultant"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-4 pr-12 py-3 bg-navy-deep/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus-glow focus:border-transparent transition-all duration-300 hover:border-white/20"
                                        placeholder="Min. 8 characters"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full px-4 pr-12 py-3 bg-navy-deep/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus-glow focus:border-transparent transition-all duration-300 hover:border-white/20"
                                        placeholder="Re-enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-[--color-primary] focus:ring-[--color-primary]" />
                            <span className="text-sm text-slate-300 leading-relaxed">
                                I agree to the <Link href="#" className="text-[--color-primary] hover:underline font-bold">Terms of Service</Link> and <Link href="#" className="text-[--color-primary] hover:underline font-bold">Privacy Policy</Link>
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-primary to-accent text-white font-black py-4 rounded-xl hover:brightness-110 transition-all shadow-xl shadow-primary/30 disabled:opacity-50 flex items-center justify-center gap-2 btn-premium ripple hover:scale-105"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">how_to_reg</span>
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-white hover:text-[--color-primary] font-bold transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
