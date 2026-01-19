'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Modal from '@/components/ui/Modal';
import {
    getResources,
    createResourceMetadata,
    incrementResourceDownloads,
    Resource
} from '@/lib/firestore';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import PublicHeader from '@/components/layout/PublicHeader';

function ResourcesPageContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const [category, setCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadData, setUploadData] = useState({
        title: '',
        category: 'Policy Papers' as Resource['category'],
        author: '',
        file: null as File | null
    });
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const categories: Array<'all' | Resource['category']> = ['all', 'Policy Papers', 'Governance', 'Training Materials', 'Reports'];

    // Read category from URL query parameter on mount
    useEffect(() => {
        const urlCategory = searchParams.get('category');
        if (urlCategory && categories.includes(urlCategory as any)) {
            setCategory(urlCategory);
        }
    }, [searchParams]);

    const fetchResources = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getResources(category);
            setResources(data);
        } catch (error) {
            console.error("Failed to fetch resources", error);
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const handleDownload = async (resource: Resource) => {
        try {
            // Get download URL from Firebase Storage
            const storageRef = ref(storage, resource.storagePath);
            const downloadURL = await getDownloadURL(storageRef);

            // Increment download count
            await incrementResourceDownloads(resource.id);

            // Trigger download
            window.open(downloadURL, '_blank');

            // Refresh resources to update count
            fetchResources();
        } catch (error) {
            console.error("Download failed", error);
            alert("Failed to download file. Please try again.");
        }
    };

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadData.file || !user) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            const file = uploadData.file;
            const fileExt = file.name.split('.').pop() || '';
            const storagePath = `resources/${uploadData.category}/${Date.now()}_${file.name}`;
            const storageRef = ref(storage, storagePath);

            // Upload file to Firebase Storage
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload error", error);
                    alert("Upload failed. Please try again.");
                    setUploading(false);
                },
                async () => {
                    // Create metadata in Firestore
                    await createResourceMetadata({
                        title: uploadData.title,
                        category: uploadData.category,
                        fileName: file.name,
                        storagePath: storagePath,
                        fileType: fileExt.toUpperCase(),
                        fileSize: file.size,
                        uploadedBy: user.uid,
                        author: uploadData.author || 'PSLC Member'
                    });

                    // Reset and refresh
                    setIsUploadModalOpen(false);
                    setUploadData({ title: '', category: 'Policy Papers', author: '', file: null });
                    setUploading(false);
                    setUploadProgress(0);
                    fetchResources();
                    alert("Resource uploaded successfully!");
                }
            );
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Please try again.");
            setUploading(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString();
    };

    const getFileIcon = (fileType: string) => {
        const type = fileType.toLowerCase();
        if (type === 'pdf') return 'picture_as_pdf';
        if (['doc', 'docx'].includes(type)) return 'description';
        if (['xls', 'xlsx'].includes(type)) return 'table_chart';
        if (['ppt', 'pptx'].includes(type)) return 'slideshow';
        return 'insert_drive_file';
    };

    const getFileColor = (fileType: string) => {
        const type = fileType.toLowerCase();
        if (type === 'pdf') return 'bg-red-50 text-red-600';
        if (['doc', 'docx'].includes(type)) return 'bg-blue-50 text-blue-600';
        if (['xls', 'xlsx'].includes(type)) return 'bg-green-50 text-green-600';
        if (['ppt', 'pptx'].includes(type)) return 'bg-orange-50 text-orange-600';
        return 'bg-gray-50 text-gray-600';
    };

    return (
        <div className="min-h-screen bg-background-light font-display">
            <PublicHeader />
            {/* Header */}
            <header className="bg-linear-to-r from-nipa-navy to-navy-card text-white px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-primary/20 rounded-xl">
                                <span className="material-symbols-outlined text-primary text-3xl">folder_open</span>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black">Resources Library</h1>
                                <p className="text-slate-400 font-medium mt-2">Access policy papers, documents, and training materials</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">upload_file</span>
                            Upload Resource
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mt-8 max-w-2xl">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                type="text"
                                placeholder="Search documents, policies, or materials..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8">
                {/* Category Filters */}
                <div className="flex gap-3 mb-8 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${category === cat
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/30'
                                }`}
                        >
                            {cat === 'all' ? 'All Resources' : cat}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">description</span>
                            </div>
                            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Total Documents</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">{resources.length}</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">policy</span>
                            </div>
                            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Policy Papers</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">
                            {resources.filter(r => r.category === 'Policy Papers').length}
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">school</span>
                            </div>
                            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Training Modules</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">
                            {resources.filter(r => r.category === 'Training Materials').length}
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">download</span>
                            </div>
                            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Total Downloads</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">
                            {resources.reduce((sum, r) => sum + r.downloads, 0)}
                        </div>
                    </div>
                </div>

                {/* Resources Table */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Document</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Downloads</th>
                                    <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredResources.length > 0 ? (
                                    filteredResources.map(resource => (
                                        <tr key={resource.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-lg ${getFileColor(resource.fileType)}`}>
                                                        <span className="material-symbols-outlined">{getFileIcon(resource.fileType)}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 mb-1">{resource.title}</h3>
                                                        <p className="text-xs text-slate-500">
                                                            {resource.author} • {formatDate(resource.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                                    {resource.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-slate-600">{resource.fileType}</span>
                                                    <span className="text-xs text-slate-400">• {formatFileSize(resource.fileSize)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-slate-400 text-sm">download</span>
                                                    <span className="font-bold text-slate-600">{resource.downloads.toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleDownload(resource)}
                                                        className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition-all flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">download</span>
                                                        Download
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">folder_open</span>
                                            <p className="font-medium">No resources found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Upload Modal */}
            <Modal
                isOpen={isUploadModalOpen}
                onClose={() => !uploading && setIsUploadModalOpen(false)}
                title="Upload Resource"
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Upload Resource</h2>
                    <form onSubmit={handleUploadSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={uploadData.title}
                                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50"
                                placeholder="National Security Strategy 2024"
                                disabled={uploading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Author/Department</label>
                            <input
                                type="text"
                                required
                                value={uploadData.author}
                                onChange={(e) => setUploadData({ ...uploadData, author: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50"
                                placeholder="Research Committee"
                                disabled={uploading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                            <select
                                value={uploadData.category}
                                onChange={(e) => setUploadData({ ...uploadData, category: e.target.value as Resource['category'] })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50"
                                disabled={uploading}
                            >
                                <option value="Policy Papers">Policy Papers</option>
                                <option value="Governance">Governance</option>
                                <option value="Training Materials">Training Materials</option>
                                <option value="Reports">Reports</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">File</label>
                            <input
                                type="file"
                                required
                                onChange={(e) => setUploadData({ ...uploadData, file: e.target.files?.[0] || null })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50"
                                disabled={uploading}
                            />
                        </div>
                        {uploading && (
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Uploading...</span>
                                    <span>{Math.round(uploadProgress)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsUploadModalOpen(false)}
                                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-bold hover:bg-slate-50 transition-all"
                                disabled={uploading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!uploadData.file || uploading}
                                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

// Wrap in Suspense to fix Next.js build error with useSearchParams
export default function ResourcesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background-light flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        }>
            <ResourcesPageContent />
        </Suspense>
    );
}
