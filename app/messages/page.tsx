'use client';

import { useState, useRef, useEffect } from 'react';

// Mock Data Types
interface Message {
    id: number;
    text: string;
    sender: 'me' | 'them';
    time: string;
    status: 'sent' | 'read';
}

interface Conversation {
    id: number;
    name: string;
    avatarSeed: string;
    active: boolean;
    unread: boolean;
    messages: Message[];
}

export default function MessagesPage() {
    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: 1,
            name: 'Col. Ahmed Bello',
            avatarSeed: 'Col. Ahmed Bello',
            active: true,
            unread: true,
            messages: [
                { id: 1, text: "Good morning. I've reviewed the draft of the National Policy Strategy for 2024.", sender: 'them', time: '09:12 AM', status: 'read' },
                { id: 2, text: "The policy brief looks solid, but we need to strengthen the section on leadership training modules.", sender: 'them', time: '09:13 AM', status: 'read' },
                { id: 3, text: "I agree, Colonel. I'll reach out to the curriculum team to get the updated modules by this afternoon.", sender: 'me', time: '09:15 AM', status: 'read' },
            ]
        },
        {
            id: 2,
            name: 'Dr. Sarah Igwenagu',
            avatarSeed: 'Dr. Sarah Igwenagu',
            active: false,
            unread: false,
            messages: [
                { id: 1, text: "Are we still meeting for the board review tomorrow?", sender: 'them', time: 'Yesterday', status: 'read' },
                { id: 2, text: "Yes, 10 AM at the conference room.", sender: 'me', time: 'Yesterday', status: 'read' },
            ]
        },
        {
            id: 3,
            name: 'Gen. P.T. Boroh (Rtd)',
            avatarSeed: 'Gen. P.T. Boroh',
            active: false,
            unread: true,
            messages: [
                { id: 1, text: "The event schedule needs to be finalized.", sender: 'them', time: '2 days ago', status: 'read' },
            ]
        },
        {
            id: 4,
            name: 'Policy Research Grp',
            avatarSeed: 'Policy',
            active: false,
            unread: false,
            messages: [
                { id: 1, text: "New report uploaded.", sender: 'them', time: '1 week ago', status: 'read' },
            ]
        },
    ]);

    const [activeConversationId, setActiveConversationId] = useState<number>(1);
    const [newMessage, setNewMessage] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation, activeConversation?.messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation) return;

        const updatedConversations = conversations.map(c => {
            if (c.id === activeConversationId) {
                return {
                    ...c,
                    messages: [
                        ...c.messages,
                        {
                            id: Date.now(),
                            text: newMessage,
                            sender: 'me' as const,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            status: 'sent' as const
                        }
                    ]
                };
            }
            return c;
        });

        setConversations(updatedConversations);
        setNewMessage('');

        // Simulate reply
        if (newMessage.toLowerCase().includes('hello') || newMessage.toLowerCase().includes('hi')) {
            setTimeout(() => {
                const replyConversations = conversations.map(c => {
                    if (c.id === activeConversationId) {
                        const updatedMsgs = [...c.messages]; // Note: logic from previous revert is simplified here for mock purposes
                        return {
                            ...c,
                            messages: [
                                ...updatedMsgs,
                                { id: Date.now(), text: newMessage, sender: 'me' as const, time: 'Now', status: 'sent' as const },
                                {
                                    id: Date.now() + 1,
                                    text: "Hello! How can I assist you today?",
                                    sender: 'them' as const,
                                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                    status: 'read' as const
                                }
                            ]
                        };
                    }
                    return c;
                });
                // setConversations(replyConversations); 
            }, 1000);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-navy-deep text-white">
            {/* Left Rail - Navigation */}
            <div className="w-20 bg-slate-900 border-r border-white/5 flex flex-col items-center py-6 gap-8 text-slate-400 z-20">
                <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold mb-4 shadow-lg shadow-primary/10">
                    <span className="material-symbols-outlined">chat_bubble</span>
                </div>

                <button className="flex flex-col items-center gap-1 text-white relative group">
                    <div className="p-3 bg-white/10 rounded-xl transition-all group-hover:bg-white/20">
                        <span className="material-symbols-outlined">forum</span>
                    </div>
                </button>

                <button className="flex flex-col items-center gap-1 hover:text-white transition-colors relative group">
                    <div className="p-3 rounded-xl transition-all group-hover:bg-white/10">
                        <span className="material-symbols-outlined">contacts</span>
                    </div>
                </button>

                <button className="flex flex-col items-center gap-1 hover:text-white transition-colors relative group">
                    <div className="p-3 rounded-xl transition-all group-hover:bg-white/10">
                        <span className="material-symbols-outlined">groups</span>
                    </div>
                </button>

                <div className="flex-1"></div>

                <button className="flex flex-col items-center gap-1 hover:text-white transition-colors relative group">
                    <div className="p-3 rounded-xl transition-all group-hover:bg-white/10">
                        <span className="material-symbols-outlined">settings</span>
                    </div>
                </button>
            </div>

            {/* Sidebar - Conversation List */}
            <div className="w-80 bg-navy-light/50 backdrop-blur-md border-r border-white/5 flex flex-col z-10">
                <div className="p-5 border-b border-white/5">
                    <h1 className="text-xl font-bold text-white mb-4">Messages</h1>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500 font-medium" placeholder="Search messages..." />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.map(conv => (
                        <div
                            key={conv.id}
                            onClick={() => setActiveConversationId(conv.id)}
                            className={`p-4 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 ${activeConversationId === conv.id ? 'bg-white/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex gap-4">
                                <div className="relative">
                                    <div className="size-12 rounded-full bg-slate-700 bg-center bg-cover" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.avatarSeed})` }}></div>
                                    {conv.active && (
                                        <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-navy-deep rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-bold truncate ${activeConversationId === conv.id ? 'text-white' : 'text-slate-300'}`}>{conv.name}</h3>
                                        <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{conv.messages[conv.messages.length - 1]?.time}</span>
                                    </div>
                                    <p className={`text-sm truncate ${conv.unread ? 'font-bold text-white' : 'text-slate-500'}`}>
                                        {conv.messages[conv.messages.length - 1]?.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-navy-deep relative">
                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-18 bg-navy-light/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 shadow-md relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-slate-700 bg-center bg-cover border border-white/10" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConversation.avatarSeed})` }}></div>
                                <div>
                                    <h2 className="font-bold text-white">{activeConversation.name}</h2>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`size-1.5 rounded-full ${activeConversation.active ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                                        <span className={`text-xs font-medium ${activeConversation.active ? 'text-green-500' : 'text-slate-500'}`}>{activeConversation.active ? 'Online' : 'Offline'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-2.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">phone</span>
                                </button>
                                <button className="p-2.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">videocam</span>
                                </button>
                                <button className="p-2.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={containerRef}>
                            {activeConversation.messages.map((msg) => {
                                const isMe = msg.sender === 'me';
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex items-end gap-3 max-w-[80%] ${isMe ? 'flex-row-reverse' : ''}`}>
                                            {!isMe && (
                                                <div className="size-8 rounded-full bg-slate-700 bg-center bg-cover mb-1 border border-white/10 shadow-sm shrink-0" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConversation.avatarSeed})` }}></div>
                                            )}
                                            <div className={`relative px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${isMe ? 'bg-primary text-navy-deep font-medium rounded-br-none' : 'bg-white/10 text-slate-300 rounded-bl-none border border-white/5'}`}>
                                                <p>{msg.text}</p>
                                                <div className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${isMe ? 'text-navy-deep/60' : 'text-slate-500'}`}>
                                                    <span>{msg.time}</span>
                                                    {isMe && <span className="material-symbols-outlined text-[14px]">done_all</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-navy-light/50 backdrop-blur-md border-t border-white/5">
                            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center gap-3">
                                <button type="button" className="p-2.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">add_circle</span>
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="w-full bg-white/5 border border-white/5 rounded-full pl-5 pr-12 py-3.5 text-sm focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500 font-medium"
                                        placeholder="Type your message..."
                                    />
                                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-lg">sentiment_satisfied</span>
                                    </button>
                                </div>
                                <button type="submit" disabled={!newMessage.trim()} className="p-3.5 rounded-full bg-primary text-navy-deep hover:bg-primary/90 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-6xl mb-4 text-slate-600">forum</span>
                        <p className="text-lg font-medium">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}
