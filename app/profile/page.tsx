'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import MemberSidebar from '@/components/layout/MemberSidebar';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { db, storage, auth } from '@/lib/firebase';

export default function ProfilePage() {
    const { profile, loading } = useAuth();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cohort: '',
        profession: '',
        location: '',
        bio: '',
        photoURL: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                email: profile.email || '',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                phone: (profile as any).phone || '',
                cohort: profile.cohort || '',
                profession: profile.profession || '',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                location: (profile as any).location || 'Abuja, Nigeria',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                bio: (profile as any).bio || '',
                photoURL: profile.photoURL || ''
            });
        }
    }, [profile]);

    const handleSave = async () => {
        if (!profile) return;
        setSaving(true);
        try {
            const userRef = doc(db, 'users', profile.uid);
            await updateDoc(userRef, {
                name: formData.name,
                phone: formData.phone,
                cohort: formData.cohort,
                profession: formData.profession,
                location: formData.location,
                bio: formData.bio
            });
            setEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !profile || !auth.currentUser) return;

        // Basic validation
        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('File is too large. Please choose an image under 5MB.');
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        setUploadingPhoto(true);
        try {
            // 1. Create Storage Reference
            const storageRef = ref(storage, `users/${profile.uid}/profile.jpg`);

            // 2. Upload File
            const snapshot = await uploadBytes(storageRef, file);

            // 3. Get Download URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            // 4. Update Auth Profile
            await updateProfile(auth.currentUser, {
                photoURL: downloadURL
            });

            // 5. Update Firestore Document
            const userRef = doc(db, 'users', profile.uid);
            await updateDoc(userRef, {
                photoURL: downloadURL
            });

            // 6. Update Local State
            setFormData(prev => ({ ...prev, photoURL: downloadURL }));

            alert('Profile picture updated!');
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Failed to upload profile picture. Please try again.');
        } finally {
            setUploadingPhoto(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-main flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background-main font-sans text-slate-900">
            <MemberSidebar />

            <main className="flex-1 ml-72">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
                    <h2 className="text-slate-900 font-bold text-lg">My Profile</h2>
                    <div className="flex gap-3">
                        {editing ? (
                            <>
                                <button
                                    onClick={() => setEditing(false)}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70"
                                >
                                    {saving ? (
                                        <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-lg">save</span>
                                    )}
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">edit</span>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </header>

                <div className="max-w-6xl mx-auto p-10">
                    {/* Profile Header Card */}
                    <div className="bg-linear-to-br from-[#0B1120] to-navy-card rounded-3xl p-10 mb-8 text-white relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                            {/* Avatar */}
                            <div className="relative group size-32">
                                <div
                                    className="w-full h-full rounded-2xl bg-cover bg-center border-4 border-white/20 relative overflow-hidden bg-slate-800 flex items-center justify-center"
                                    style={{ backgroundImage: formData.photoURL ? `url("${formData.photoURL}")` : undefined }}
                                >
                                    {!formData.photoURL && <span className="text-4xl font-bold opacity-50">{profile?.name?.charAt(0) || 'U'}</span>}

                                    {uploadingPhoto && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                            <span className="material-symbols-outlined animate-spin text-white">progress_activity</span>
                                        </div>
                                    )}
                                </div>

                                {editing && !uploadingPhoto && (
                                    <>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                triggerFileInput();
                                            }}
                                            className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 border-0 w-full h-full"
                                            type="button"
                                            title="Change Profile Picture"
                                        >
                                            <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-black mb-2">{formData.name || 'Member Name'}</h2>
                                <p className="text-primary font-bold mb-4">{formData.profession || 'Profession Not Set'}</p>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                        <span className="material-symbols-outlined text-sm">school</span>
                                        <span className="text-sm font-bold">{formData.cohort || 'Cohort'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        <span className="text-sm font-bold">{formData.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-primary/20 border border-primary/40 px-4 py-2 rounded-lg">
                                        <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                                        <span className="text-sm font-black text-primary">{profile?.role === 'admin' ? 'Administrator' : 'Premium Member'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Personal Information */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Full Name</label>
                                        <input
                                            type="text"
                                            disabled={!editing}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-60 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email</label>
                                        <input
                                            type="email"
                                            disabled={true} // Email cannot be changed here
                                            value={formData.email}
                                            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl opacity-60 cursor-not-allowed text-slate-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Phone</label>
                                        <input
                                            type="tel"
                                            disabled={!editing}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-60 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Profession</label>
                                        <input
                                            type="text"
                                            disabled={!editing}
                                            value={formData.profession}
                                            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-60 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Cohort</label>
                                        <input
                                            type="text"
                                            disabled={!editing}
                                            value={formData.cohort}
                                            onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-60 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Location</label>
                                        <input
                                            type="text"
                                            disabled={!editing}
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-60 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Bio</label>
                                        <textarea
                                            disabled={!editing}
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-60 focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Membership Card */}
                            <div className="bg-linear-to-br from-primary to-accent rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined">card_membership</span>
                                    <h4 className="font-black text-sm uppercase tracking-wider">Membership</h4>
                                </div>
                                <div className="text-2xl font-black mb-1">Active</div>
                                <div className="text-sm opacity-80 mb-4">Member ID:</div>
                                <div className="pt-4 border-t border-white/20 text-xs font-bold">
                                    NIPA-{new Date().getFullYear()}-{profile?.uid.substring(0, 4).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
