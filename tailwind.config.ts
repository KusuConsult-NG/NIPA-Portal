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
            }
        },
    },
    plugins: [],
};

export default config;
