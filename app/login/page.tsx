'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { signInWithEmail } = await import('@/lib/firebaseAuth');

            // Sign In
            const { firebaseUser } = await signInWithEmail(formData.email, formData.password);

            // Set cookie immediately to prevent middleware redirect loop
            const { default: Cookies } = await import('js-cookie');
            Cookies.set('session', 'true', { expires: 7 });

            // Get token for API access
            try {
                const token = await firebaseUser.getIdToken();
                Cookies.set('auth_token', token, { expires: 7 });
            } catch (e) {
                console.error("Token error", e);
            }

            // Redirect
            router.push('/dashboard');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Login error:', error);
            const errorMessage = error.message || 'Failed to sign in. Please check your credentials.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0B1120] via-navy-card to-[#0B1120] flex items-center justify-center p-6">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[--color-primary]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[--color-secondary]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Logo */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center size-20 bg-[--color-primary] rounded-3xl mb-6 shadow-2xl shadow-[--color-primary]/20 ring-4 ring-white/5">
                        <svg className="size-10 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-400 font-medium text-lg max-w-xs mx-auto leading-normal">National Institute for Policy, Strategy and Leadership</p>
                </div>

                {/* Login Card */}
                <div className="bg-navy-card border border-white/10 rounded-4xl p-10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-navy-deep border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
                                    placeholder="your.email@nipa.org"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-12 py-4 bg-navy-deep border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/10 text-[--color-primary] focus:ring-[--color-primary]" />
                                <span className="text-sm text-slate-300 font-medium">Remember me</span>
                            </label>
                            <Link href="#" className="text-sm text-white hover:text-[--color-primary] font-bold transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-primary to-accent text-white font-black py-4 rounded-xl hover:brightness-110 transition-all shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">login</span>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-xs text-slate-500 font-bold uppercase">Or</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-slate-400 text-sm mb-4">Don&apos;t have an account?</p>
                        <Link
                            href="/signup"
                            className="inline-flex items-center gap-2 text-white hover:text-[--color-primary] font-bold transition-colors"
                        >
                            <span className="material-symbols-outlined">person_add</span>
                            Register as New Member
                        </Link>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back to Homepage
                    </Link>
                    <p className="text-xs text-slate-500">© 2026 NIPA. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
