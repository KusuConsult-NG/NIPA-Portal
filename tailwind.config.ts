import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Shared/Common
                primary: '#22C55E', // Default green (Landing, Dashboard, Directory, Admin)
                secondary: '#6366F1', // Indigo/Purple (Landing)
                accent: '#10B981', // Emerald (Landing)

                // Navy/Dark Shades
                'navy-deep': '#0B1120', // Landing, Dashboard Sidebar
                'navy-card': '#1E293B',
                'navy-dark': '#0A1F30', // Elections
                'nipa-navy': '#0B101B', // Admin

                // Dashboard specific
                'sidebar-bg': '#0B1120',
                'background-main': '#F8FAFC',
                'accent-purple': '#8B5CF6',

                // Directory specific
                'primary-dark': '#166534',
                'nav-bg': '#0B1120',
                'background-light': '#F8FAFC',

                // Payments specific
                'payment-primary': '#27c96d',
                'secondary-purple': '#a855f7',
                'secondary-blue': '#3b82f6',
                'payment-navy': '#0f172a',
                'payment-dark': '#020617',

                // Elections specific
                'election-primary': '#13ec5b',
                'election-dark': '#0B1110',

                // Welfare specific
                'welfare-primary': '#2ecc71',
                'welfare-accent': '#8e44ad',
                'welfare-soft': '#f4f0f9',
                'vibrant-green': '#27ae60',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Public Sans', 'sans-serif'],
                display: ['Public Sans', 'sans-serif'],
                body: ['Public Sans', 'sans-serif'],
            },
            borderRadius: {
                'lg': '0.75rem',
                'xl': '1rem',
                '2xl': '1.5rem',
                '4xl': '2.5rem',
            },
            backgroundImage: {
                'hero-gradient': "radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent), radial-gradient(circle at bottom left, rgba(34, 197, 94, 0.1), transparent)",
                'vibrant-gradient': "linear-gradient(135deg, #13ec5b 0%, #8B5CF6 100%)",
                'glass-gradient': "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                'shimmer': "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            },
            animation: {
                'shimmer': 'shimmer 2s infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
                'slide-in': 'slide-in 0.3s ease-out',
                'slide-up': 'slide-up 0.4s ease-out',
                'fade-in': 'fade-in 0.3s ease-in',
                'scale-in': 'scale-in 0.2s ease-out',
                'bounce-soft': 'bounce-soft 1s ease-in-out infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                glow: {
                    '0%': {
                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
                    },
                    '100%': {
                        boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'slide-in': {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'bounce-soft': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
            },
            boxShadow: {
                'glow-sm': '0 0 10px rgba(34, 197, 94, 0.3)',
                'glow-md': '0 0 20px rgba(34, 197, 94, 0.4)',
                'glow-lg': '0 0 30px rgba(34, 197, 94, 0.5)',
                'glow-primary': '0 0 25px rgba(34, 197, 94, 0.4)',
                'glow-purple': '0 0 25px rgba(139, 92, 246, 0.4)',
                'glow-blue': '0 0 25px rgba(59, 130, 246, 0.4)',
                'inner-glow': 'inset 0 0 20px rgba(34, 197, 94, 0.1)',
            },
            backdropBlur: {
                xs: '2px',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        },
    },
    plugins: [],
};

export default config;
