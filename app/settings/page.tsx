'use client';

import { useState, useEffect } from 'react';
import MemberSidebar from '@/components/layout/MemberSidebar';
import { useAuth } from '@/context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SettingsPage() {
    const { user, profile } = useAuth();
    const [activeTab, setActiveTab] = useState('account');
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const [accountSettings, setAccountSettings] = useState({
        username: '',
        language: 'English',
        timezone: 'West Africa Time (WAT)'
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        eventReminders: true,
        paymentAlerts: false,
        birthdayGreetings: false,
        newsletter: false
    });

    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'Public - Visible to all members',
        twoFactorEnabled: false
    });

    const [preferenceSettings, setPreferenceSettings] = useState({
        theme: 'Light Mode',
        compactMode: false,
        dateFormat: 'DD/MM/YYYY'
    });

    useEffect(() => {
        if (profile) {
            // Load user settings from profile
            setAccountSettings({
                username: profile.email?.split('@')[0] || '',
                language: (profile as any).language || 'English',
                timezone: (profile as any).timezone || 'West Africa Time (WAT)'
            });

            if ((profile as any).notificationSettings) {
                setNotificationSettings((profile as any).notificationSettings);
            }

            if ((profile as any).privacySettings) {
                setPrivacySettings((profile as any).privacySettings);
            }

            if ((profile as any).preferenceSettings) {
                setPreferenceSettings((profile as any).preferenceSettings);
            }
        }
    }, [profile]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const tabs = [
        { id: 'account', label: 'Account', icon: 'person' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'privacy', label: 'Privacy & Security', icon: 'security' },
        { id: 'preferences', label: 'Preferences', icon: 'tune' }
    ];

    const handleSaveSettings = async () => {
        if (!user) return;

        setSaving(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                language: accountSettings.language,
                timezone: accountSettings.timezone,
                notificationSettings,
                privacySettings,
                preferenceSettings,
                updatedAt: new Date().toISOString()
            });

            setToast({ message: 'Settings saved successfully!', type: 'success' });
        } catch (error) {
            console.error('Failed to save settings:', error);
            setToast({ message: 'Failed to save settings. Please try again.', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-background-main font-sans text-slate-900">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-24 right-8 px-6 py-3 rounded-xl shadow-2xl z-50 font-bold text-white animate-in slide-in-from-top-5 ${toast.type === 'success' ? 'bg-primary' : 'bg-red-500'
                    }`}>
                    {toast.message}
                </div>
            )}

            <MemberSidebar />

            <main className="flex-1 ml-72">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
                    <h2 className="text-slate-900 font-bold text-lg">Settings</h2>
                    <button
                        onClick={handleSaveSettings}
                        disabled={saving}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70"
                    >
                        {saving ? (
                            <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">save</span>
                                Save Changes
                            </>
                        )}
                    </button>
                </header>

                <div className="max-w-6xl mx-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Tabs */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm sticky top-28">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${activeTab === tab.id
                                                ? 'bg-primary text-white shadow-lg scale-105'
                                                : 'text-slate-600 hover:bg-slate-50 hover:scale-105'
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
                                <div className="space-y-6 animate-in fade-in-50 duration-300">
                                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                        <h2 className="text-xl font-black mb-6">Account Settings</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Username</label>
                                                <input
                                                    type="text"
                                                    value={accountSettings.username}
                                                    disabled
                                                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl opacity-60 cursor-not-allowed text-slate-900"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Language</label>
                                                <select
                                                    value={accountSettings.language}
                                                    onChange={(e) => setAccountSettings({ ...accountSettings, language: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900"
                                                >
                                                    <option>English</option>
                                                    <option>Hausa</option>
                                                    <option>Yoruba</option>
                                                    <option>Igbo</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Timezone</label>
                                                <select
                                                    value={accountSettings.timezone}
                                                    onChange={(e) => setAccountSettings({ ...accountSettings, timezone: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900"
                                                >
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
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm animate-in fade-in-50 duration-300">
                                    <h2 className="text-xl font-black mb-6">Notification Preferences</h2>

                                    <div className="space-y-6">
                                        {Object.entries({
                                            emailNotifications: { title: 'Email Notifications', description: 'Receive email updates about your account activity' },
                                            pushNotifications: { title: 'Push Notifications', description: 'Get push notifications on your devices' },
                                            eventReminders: { title: 'Event Reminders', description: 'Reminders for upcoming NIPA events' },
                                            paymentAlerts: { title: 'Payment Alerts', description: 'Notifications about dues and payments' },
                                            birthdayGreetings: { title: 'Birthday Greetings', description: 'Receive birthday wishes from NIPA' },
                                            newsletter: { title: 'Newsletter', description: 'Monthly newsletter with policy updates' }
                                        }).map(([key, item]) => (
                                            <div key={key} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                                    <p className="text-sm text-slate-500">{item.description}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={notificationSettings[key as keyof typeof notificationSettings]}
                                                        onChange={(e) => setNotificationSettings({
                                                            ...notificationSettings,
                                                            [key]: e.target.checked
                                                        })}
                                                    />
                                                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'privacy' && (
                                <div className="space-y-6 animate-in fade-in-50 duration-300">
                                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                        <h2 className="text-xl font-black mb-6">Privacy & Security</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-3">Profile Visibility</h3>
                                                <select
                                                    value={privacySettings.profileVisibility}
                                                    onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900"
                                                >
                                                    <option>Public - Visible to all members</option>
                                                    <option>Private - Only visible to you</option>
                                                    <option>Cohort Only - Visible to your cohort</option>
                                                </select>
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-3">Two-Factor Authentication</h3>
                                                <p className="text-sm text-slate-500 mb-4">Add an extra layer of security to your account</p>
                                                <button
                                                    onClick={() => setPrivacySettings({ ...privacySettings, twoFactorEnabled: !privacySettings.twoFactorEnabled })}
                                                    className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${privacySettings.twoFactorEnabled
                                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                                            : 'bg-primary text-white hover:brightness-110 shadow-primary/20'
                                                        }`}
                                                >
                                                    {privacySettings.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm animate-in fade-in-50 duration-300">
                                    <h2 className="text-xl font-black mb-6">Display Preferences</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Theme</label>
                                            <select
                                                value={preferenceSettings.theme}
                                                onChange={(e) => setPreferenceSettings({ ...preferenceSettings, theme: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900"
                                            >
                                                <option>Light Mode</option>
                                                <option>Dark Mode</option>
                                                <option>Auto (System)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Compact Mode</label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={preferenceSettings.compactMode}
                                                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, compactMode: e.target.checked })}
                                                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm text-slate-700">Use compact layout for lists and tables</span>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Date Format</label>
                                            <select
                                                value={preferenceSettings.dateFormat}
                                                onChange={(e) => setPreferenceSettings({ ...preferenceSettings, dateFormat: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900"
                                            >
                                                <option>DD/MM/YYYY</option>
                                                <option>MM/DD/YYYY</option>
                                                <option>YYYY-MM-DD</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
