'use client';

import { useState } from 'react';
import PublicHeader from '@/components/layout/PublicHeader';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Save message to Firestore
            await addDoc(collection(db, 'contact_messages'), {
                ...formData,
                createdAt: Timestamp.now(),
                status: 'unread'
            });

            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Failed to submit contact form:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light">
            <PublicHeader />

            {/* Header */}
            <header className="bg-linear-to-r from-navy-deep to-navy-card text-white px-8 py-20">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-black mb-4">Get In Touch</h1>
                    <p className="text-xl text-slate-400 font-medium">We&apos;re here to help and answer any questions you might have</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-8">
                {/* Success Message */}
                {submitted && (
                    <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-5">
                        <span className="material-symbols-outlined text-green-600">check_circle</span>
                        <p className="text-green-800 font-medium">Message sent successfully! We&apos;ll get back to you soon.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Cards */}
                    {[
                        {
                            icon: 'location_on',
                            title: 'Visit Us',
                            line1: 'National Institute, Kuru',
                            line2: 'Jos, Plateau State',
                            color: 'blue'
                        },
                        {
                            icon: 'mail',
                            title: 'Email Us',
                            line1: 'info@pslcassociation.com',
                            line2: 'support@pslcassociation.com',
                            color: 'green'
                        },
                        {
                            icon: 'phone',
                            title: 'Call Us',
                            line1: '+234 813 523 5570',
                            line2: 'Mon-Fri, 9am - 5pm',
                            color: 'purple'
                        }
                    ].map((contact, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center hover:shadow-lg transition-shadow">
                            <div className={`inline-flex items-center justify-center size-16 rounded-xl mb-4 ${contact.color === 'blue' ? 'bg-blue-100' :
                                contact.color === 'green' ? 'bg-green-100' :
                                    'bg-purple-100'
                                }`}>
                                <span className={`material-symbols-outlined text-3xl ${contact.color === 'blue' ? 'text-blue-600' :
                                    contact.color === 'green' ? 'text-green-600' :
                                        'text-purple-600'
                                    }`}>
                                    {contact.icon}
                                </span>
                            </div>
                            <h3 className="text-lg font-black mb-3">{contact.title}</h3>
                            <p className="text-slate-600 font-medium">{contact.line1}</p>
                            <p className="text-slate-600 font-medium">{contact.line2}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-black mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900"
                                    placeholder="Col. Ahmed Bello"
                                    disabled={submitting}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900"
                                    placeholder="your.email@nipa.org"
                                    disabled={submitting}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Subject</label>
                                <select
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900"
                                    disabled={submitting}
                                >
                                    <option value="">Select a subject</option>
                                    <option>Membership Inquiry</option>
                                    <option>Event Registration</option>
                                    <option>Payment Issue</option>
                                    <option>Technical Support</option>
                                    <option>General Question</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none text-slate-900"
                                    placeholder="How can we help you?"
                                    disabled={submitting}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-4 bg-linear-to-r from-primary to-accent text-white font-black rounded-xl hover:brightness-110 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">send</span>
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Map & Info */}
                    <div className="space-y-8">
                        {/* Map Placeholder */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-black mb-4">Find Us</h3>
                            <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center">
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-slate-400 text-5xl mb-3">map</span>
                                    <p className="text-slate-500 font-medium">Interactive Map</p>
                                    <p className="text-xs text-slate-400 mt-2">National Institute, Kuru, Jos</p>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours */}
                        <div className="bg-linear-to-br from-primary to-accent rounded-2xl p-8 text-white shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-3xl">schedule</span>
                                <h3 className="text-2xl font-black">Office Hours</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="font-bold">Monday - Friday</span>
                                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="font-bold">Saturday</span>
                                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Sunday</span>
                                    <span className="font-medium">Closed</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-black mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
                                    <button
                                        key={social}
                                        className="size-12 bg-slate-100 hover:bg-primary text-slate-600 hover:text-white rounded-xl transition-all flex items-center justify-center"
                                    >
                                        <span className="material-symbols-outlined">{social === 'twitter' ? 'alternate_email' : social}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-navy-deep text-slate-400 py-12 border-t border-white/5 mt-16">
                <div className="max-w-6xl mx-auto px-8 text-center">
                    <p className="text-sm font-medium">© 2024 PSLC Association. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
