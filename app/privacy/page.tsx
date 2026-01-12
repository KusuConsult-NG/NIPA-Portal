'use client';

import PublicHeader from '@/components/layout/PublicHeader';

export default function PrivacyPage() {
    return (
        <div className="bg-background-light font-display min-h-screen text-slate-600">
            <PublicHeader />

            <section className="bg-navy-deep text-white py-16">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
                    <p className="text-slate-400 text-lg">Last updated: January 2024</p>
                </div>
            </section>

            <main className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm prose prose-slate max-w-none text-slate-600">
                    <h3 className="text-slate-900 font-bold mb-4 text-xl">1. Introduction</h3>
                    <p className="mb-6">
                        The National Institute for Policy, Strategy and Leadership (NIPA) respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h3 className="text-slate-900 font-bold mb-4 text-xl">2. Data We Collect</h3>
                    <p className="mb-4">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
                        <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                    </ul>

                    <h3 className="text-slate-900 font-bold mb-4 text-xl">3. How We Use Your Data</h3>
                    <p className="mb-4">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>

                    <h3 className="text-slate-900 font-bold mb-4 text-xl">4. Data Security</h3>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>

                    <h3 className="text-slate-900 font-bold mb-4 text-xl">5. Contact Us</h3>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@nipa.org.
                    </p>
                </div>
            </main>

            <footer className="bg-navy-deep text-slate-400 py-12 border-t border-white/5">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
                    <p className="text-sm font-medium">© 2024 NIPA. Architects of the Future.</p>
                </div>
            </footer>
        </div>
    );
}
