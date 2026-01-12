'use client';

import { useState } from 'react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', label: 'Account', icon: 'person' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'privacy', label: 'Privacy & Security', icon: 'security' },
        { id: 'preferences', label: 'Preferences', icon: 'tune' }
    ];

    return (
        <div className="min-h-screen bg-[--color-background-light]">
            <header className="bg-white border-b border-slate-200 px-8 py-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-black">Settings</h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200 p-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${activeTab === tab.id
                                            ? 'bg-[--color-primary] text-white shadow-lg'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'account' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 border border-slate-200">
                                    <h2 className="text-xl font-black mb-6">Account Settings</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Username</label>
                                            <input
                                                type="text"
                                                defaultValue="col.jamesade"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Language</label>
                                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50">
                                                <option>English</option>
                                                <option>Hausa</option>
                                                <option>Yoruba</option>
                                                <option>Igbo</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Timezone</label>
                                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50">
                                                <option>West Africa Time (WAT)</option>
                                                <option>Central Africa Time (CAT)</option>
                                                <option>East Africa Time (EAT)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                                    <h3 className="text-lg font-black text-red-900 mb-2">Danger Zone</h3>
                                    <p className="text-sm text-red-700 mb-4">Irreversible and destructive actions</p>
                                    <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2">
                                        <span className="material-symbols-outlined">delete_forever</span>
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="bg-white rounded-2xl p-8 border border-slate-200">
                                <h2 className="text-xl font-black mb-6">Notification Preferences</h2>

                                <div className="space-y-6">
                                    {[
                                        { title: 'Email Notifications', description: 'Receive email updates about your account activity' },
                                        { title: 'Push Notifications', description: 'Get push notifications on your devices' },
                                        { title: 'Event Reminders', description: 'Reminders for upcoming NIPA events' },
                                        { title: 'Payment Alerts', description: 'Notifications about dues and payments' },
                                        { title: 'Birthday Greetings', description: 'Receive birthday wishes from NIPA' },
                                        { title: 'Newsletter', description: 'Monthly newsletter with policy updates' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                                <p className="text-sm text-slate-500">{item.description}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked={idx < 3} />
                                                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[--color-primary]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[--color-primary]"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'privacy' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 border border-slate-200">
                                    <h2 className="text-xl font-black mb-6">Privacy & Security</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-3">Profile Visibility</h3>
                                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50">
                                                <option>Public - Visible to all members</option>
                                                <option>Private - Only visible to you</option>
                                                <option>Cohort Only - Visible to your cohort</option>
                                            </select>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-3">Two-Factor Authentication</h3>
                                            <p className="text-sm text-slate-500 mb-4">Add an extra layer of security to your account</p>
                                            <button className="px-6 py-3 bg-[--color-primary] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[--color-primary]/20">
                                                Enable 2FA
                                            </button>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-3">Active Sessions</h3>
                                            <div className="space-y-3">
                                                {[
                                                    { device: 'Chrome on MacBook Pro', location: 'Abuja, Nigeria', current: true },
                                                    { device: 'Safari on iPhone 14', location: 'Lagos, Nigeria', current: false }
                                                ].map((session, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-[--color-primary]">
                                                                {session.device.includes('iPhone') ? 'phone_iphone' : 'computer'}
                                                            </span>
                                                            <div>
                                                                <p className="font-bold text-sm">{session.device}</p>
                                                                <p className="text-xs text-slate-500">{session.location}</p>
                                                            </div>
                                                        </div>
                                                        {session.current ? (
                                                            <span className="text-xs font-bold text-[--color-primary] bg-[--color-primary]/10 px-3 py-1 rounded-full">Current</span>
                                                        ) : (
                                                            <button className="text-xs font-bold text-red-600hover:underline">Revoke</button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <div className="bg-white rounded-2xl p-8 border border-slate-200">
                                <h2 className="text-xl font-black mb-6">Display Preferences</h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Theme</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50">
                                            <option>Light Mode</option>
                                            <option>Dark Mode</option>
                                            <option>Auto (System)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Compact Mode</label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[--color-primary] focus:ring-[--color-primary]" />
                                            <span className="text-sm text-slate-700">Use compact layout for lists and tables</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Date Format</label>
                                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[--color-primary]/50">
                                            <option>DD/MM/YYYY</option>
                                            <option>MM/DD/YYYY</option>
                                            <option>YYYY-MM-DD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="flex justify-end gap-4 mt-8">
                            <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                                Cancel
                            </button>
                            <button className="px-6 py-3 bg-[--color-primary] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[--color-primary]/20 flex items-center gap-2">
                                <span className="material-symbols-outlined">save</span>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
