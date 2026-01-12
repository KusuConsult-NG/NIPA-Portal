'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Message sent! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[--color-background-light]">
            {/* Header */}
            <header className="bg-linear-to-r from-[--color-nipa-navy] to-[--color-navy-card] text-white px-8 py-20">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-black mb-4">Get In Touch</h1>
                    <p className="text-xl text-slate-400 font-medium">We're here to help and answer any questions you might have</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Cards */}
                    {[
                        {
                            icon: 'location_on',
                            title: 'Visit Us',
                            line1: 'NIPA Headquarters',
                            line2: 'Plot 555, Zone A, Abuja, FCT',
                            color: 'blue'
                        },
                        {
                            icon: 'mail',
                            title: 'Email Us',
                            line1: 'info@nipa.org',
                            line2: 'support@nipa.org',
                            color: 'green'
                        },
                        {
                            icon: 'phone',
                            title: 'Call Us',
                            line1: '+234 803 123 4567',
                            line2: '+234 805 234 5678',
                            color: 'purple'
                        }
                    ].map((contact, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
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
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50 focus:border-[--color-primary]"
                                    placeholder="Col. Ahmed Bello"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50 focus:border-[--color-primary]"
                                    placeholder="your.email@nipa.org"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Subject</label>
                                <select
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50 focus:border-[--color-primary]"
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
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50 focus:border-[--color-primary] resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-linear-to-r from-[--color-primary] to-[--color-accent] text-white font-black rounded-xl hover:brightness-110 transition-all shadow-xl shadow-[--color-primary]/30 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">send</span>
                                Send Message
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
                                    <p className="text-slate-500 font-medium">Map View</p>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours */}
                        <div className="bg-linear-to-br from-[--color-primary] to-[--color-accent] rounded-2xl p-8 text-white shadow-xl">
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
                                        className="size-12 bg-slate-100 hover:bg-[--color-primary] text-slate-600 hover:text-white rounded-xl transition-all flex items-center justify-center"
                                    >
                                        <span className="material-symbols-outlined">{social === 'twitter' ? 'alternate_email' : social}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
