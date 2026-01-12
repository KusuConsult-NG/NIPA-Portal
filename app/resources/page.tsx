'use client';

import { useState } from 'react';

import Modal from '@/components/ui/Modal';

export default function ResourcesPage() {
    const [category, setCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadData, setUploadData] = useState({ title: '', category: 'Policy Papers', file: null as File | null });

    const resources = [
        {
            id: 1,
            title: 'National Security Strategy Framework 2024',
            category: 'Policy Papers',
            fileType: 'PDF',
            size: '4.2 MB',
            downloads: 1240,
            uploadDate: new Date('2024-01-15'),
            author: 'NIPA Research Committee'
        },
        {
            id: 2,
            title: 'NIPA Constitution & Bylaws',
            category: 'Governance',
            fileType: 'PDF',
            size: '2.1 MB',
            downloads: 3450,
            uploadDate: new Date('2020-06-01'),
            author: 'NIPA Secretariat'
        },
        {
            id: 3,
            title: 'Economic Policy Recommendations 2024',
            category: 'Policy Papers',
            fileType: 'PDF',
            size: '6.8 MB',
            downloads: 890,
            uploadDate: new Date('2024-03-20'),
            author: 'Economic Affairs Committee'
        },
        {
            id: 4,
            title: 'Leadership Training Module - Strategic Planning',
            category: 'Training Materials',
            fileType: 'PPTX',
            size: '15.3 MB',
            downloads: 567,
            uploadDate: new Date('2023-11-10'),
            author: 'Training Department'
        },
        {
            id: 5,
            title: 'Member Directory 2024',
            category: 'Reports',
            fileType: 'XLSX',
            size: '1.4 MB',
            downloads: 2100,
            uploadDate: new Date('2024-01-01'),
            author: 'Membership Office'
        }
    ];

    const categories = ['all', 'Policy Papers', 'Governance', 'Training Materials', 'Reports'];

    const filteredResources = resources.filter(resource => {
        const matchesCategory = category === 'all' || resource.category === category;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleDownload = (title: string) => {
        // Simulate download
        alert(`Downloaded ${title}`);
    };

    const handleView = (title: string) => {
        alert(`Opening preview for: ${title}`);
    };

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Upload logic here
        setIsUploadModalOpen(false);
        setUploadData({ title: '', category: 'Policy Papers', file: null });
    };

    return (
        <div className="min-h-screen bg-background-light font-display">
            {/* Header */}
            <header className="bg-linear-to-r from-nipa-navy to-navy-card text-white px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/20 rounded-xl">
                            <span className="material-symbols-outlined text-primary text-3xl">folder_open</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-black">Resources Library</h1>
                            <p className="text-slate-400 font-medium mt-2">Access policy papers, documents, and training materials</p>
                        </div>
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
                    {[
                        { label: 'Total Documents', value: '150+', icon: 'description' },
                        { label: 'Policy Papers', value: '45', icon: 'policy' },
                        { label: 'Training Modules', value: '28', icon: 'school' },
                        { label: 'Total Downloads', value: '8.2k', icon: 'download' }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                                </div>
                                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Resources Table */}
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
                                                <div className="p-3 bg-red-50 rounded-lg">
                                                    <span className="material-symbols-outlined text-red-600">picture_as_pdf</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 mb-1">{resource.title}</h3>
                                                    <p className="text-xs text-slate-500">
                                                        {resource.author} • {resource.uploadDate.toLocaleDateString()}
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
                                                <span className="text-xs text-slate-400">• {resource.size}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-slate-400">download</span>
                                                <span className="text-sm font-bold text-slate-600">{resource.downloads.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleView(resource.title)}
                                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-primary"
                                                >
                                                    <span className="material-symbols-outlined">visibility</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(resource.title)}
                                                    className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
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
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                                        No resources found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Upload Section (Admin) */}
                <div className="mt-12 bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-black mb-2 text-slate-900">Upload New Resource</h3>
                            <p className="text-slate-600">Share policy papers and documents with the NIPA community</p>
                        </div>
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">upload_file</span>
                            Upload Document
                        </button>
                    </div>
                </div>
            </main>

            {/* Upload Modal */}
            <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload New Resource">
                <form onSubmit={handleUploadSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Document Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
                            placeholder="e.g. National Policy 2024"
                            value={uploadData.title}
                            onChange={e => setUploadData({ ...uploadData, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Category</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
                            value={uploadData.category}
                            onChange={e => setUploadData({ ...uploadData, category: e.target.value })}
                        >
                            {categories.filter(c => c !== 'all').map(c => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">File</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-4xl text-slate-300">cloud_upload</span>
                                <p className="text-slate-500 font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-slate-400">PDF, PPTX, DOCX (Max 10MB)</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                onChange={e => setUploadData({ ...uploadData, file: e.target.files ? e.target.files[0] : null })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                        Upload Document
                    </button>
                </form>
            </Modal>
        </div>
    );
}
