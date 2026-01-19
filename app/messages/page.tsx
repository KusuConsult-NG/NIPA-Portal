'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
    getConversations,
    getMessages,
    sendMessage as sendFirestoreMessage,
    Conversation,
    ConversationMessage,
    User,
    findUserById
} from '@/lib/firestore';
import BackButton from '@/components/ui/BackButton';
import MemberSidebar from '@/components/layout/MemberSidebar';

// Extended conversation with user info
interface ConversationWithUser extends Conversation {
    otherUser?: User;
}

export default function MessagesPage() {
    const { user, loading: authLoading } = useAuth();
    const [conversations, setConversations] = useState<ConversationWithUser[]>([]);
    const [messages, setMessages] = useState<ConversationMessage[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch conversations on mount
    useEffect(() => {
        const fetchConversations = async () => {
            if (authLoading) return;
            if (!user) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const convs = await getConversations(user.uid);

                // Fetch other user's info for each conversation
                const convsWithUsers = await Promise.all(
                    convs.map(async (conv) => {
                        const otherUserId = conv.participants.find(p => p !== user.uid);
                        if (otherUserId) {
                            const otherUser = await findUserById(otherUserId);
                            return { ...conv, otherUser: otherUser || undefined };
                        }
                        return { ...conv, otherUser: undefined };
                    })
                );

                setConversations(convsWithUsers);

                // Auto-select first conversation
                if (convsWithUsers.length > 0) {
                    setActiveConversationId(convsWithUsers[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch conversations", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [user]);

    // Fetch messages when active conversation changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeConversationId) return;

            try {
                const msgs = await getMessages(activeConversationId);
                setMessages(msgs);
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };

        fetchMessages();
    }, [activeConversationId]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversationId || !user || sending) return;

        setSending(true);
        try {
            await sendFirestoreMessage(activeConversationId, user.uid, newMessage);

            // Refresh messages
            const updatedMessages = await getMessages(activeConversationId);
            setMessages(updatedMessages);

            // Also refresh conversations to update lastMessage
            const updatedConvs = await getConversations(user.uid);
            const convsWithUsers = await Promise.all(
                updatedConvs.map(async (conv) => {
                    const otherUserId = conv.participants.find(p => p !== user.uid);
                    if (otherUserId) {
                        const otherUser = await findUserById(otherUserId);
                        return { ...conv, otherUser: otherUser || undefined };
                    }
                    return { ...conv, otherUser: undefined };
                })
            );
            setConversations(convsWithUsers);

            setNewMessage('');
        } catch (error) {
            console.error("Failed to send message", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setSending(false);
        }
    };

    const formatTime = (timestamp: string): string => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    if (loading || authLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background-main">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center bg-background-main">
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-slate-500 font-medium mb-4">Please log in to view your messages.</p>
                    <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Log In</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background-main font-sans text-slate-900">
            {/* Sidebar */}
            <MemberSidebar />

            {/* Main Content */}
            <main className="flex-1 ml-72 flex h-screen overflow-hidden">
                <div className="flex flex-1 overflow-hidden bg-white">
                    {/* Sidebar - Conversation List */}
                    <div className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col">
                        <div className="p-5 border-b border-slate-200 bg-white">
                            <h1 className="text-xl font-bold text-slate-900 mb-4">Messages</h1>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                                <input className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 text-slate-900 placeholder-slate-400 font-medium" placeholder="Search messages..." />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {conversations.length > 0 ? (
                                conversations.map(conv => (
                                    <div
                                        key={conv.id}
                                        onClick={() => setActiveConversationId(conv.id)}
                                        className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-100 ${activeConversationId === conv.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                                    >
                                        <div className="flex gap-4">
                                            <div className="relative">
                                                <div className="size-12 rounded-full bg-slate-200 bg-center bg-cover" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.otherUser?.name || 'User'})` }}></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className={`font-bold truncate ${activeConversationId === conv.id ? 'text-slate-900' : 'text-slate-700'}`}>
                                                        {conv.otherUser?.name || 'Unknown User'}
                                                    </h3>
                                                    {conv.lastMessage && (
                                                        <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                                                            {formatTime(conv.lastMessage.timestamp)}
                                                        </span>
                                                    )}
                                                </div>
                                                {conv.lastMessage && (
                                                    <p className="text-sm truncate text-slate-500">
                                                        {conv.lastMessage.text}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 px-4">
                                    <span className="material-symbols-outlined text-4xl mb-2">chat_bubble_outline</span>
                                    <p className="text-sm text-center">No conversations yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
                        {activeConversation ? (
                            <>
                                {/* Chat Header */}
                                <div className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="size-11 rounded-full bg-slate-200 bg-center bg-cover border border-slate-100" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConversation.otherUser?.name || 'User'})` }}></div>
                                        <div>
                                            <h2 className="font-bold text-slate-900">{activeConversation.otherUser?.name || 'Unknown User'}</h2>
                                            <div className="flex items-center gap-1.5">
                                                <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
                                                <span className="text-xs font-medium text-slate-500">{activeConversation.otherUser?.profession || 'Member'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">phone</span>
                                        </button>
                                        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">videocam</span>
                                        </button>
                                        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50" ref={containerRef}>
                                    {messages.map((msg) => {
                                        const isMe = msg.senderId === user?.uid;
                                        return (
                                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex items-end gap-3 max-w-[80%] ${isMe ? 'flex-row-reverse' : ''}`}>
                                                    {!isMe && (
                                                        <div className="size-8 rounded-full bg-slate-200 bg-center bg-cover mb-1 border border-white shrink-0" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConversation.otherUser?.name || 'User'})` }}></div>
                                                    )}
                                                    <div className={`relative px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${isMe ? 'bg-primary text-white font-medium rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-200'}`}>
                                                        <p>{msg.text}</p>
                                                        <div className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${isMe ? 'text-white/70' : 'text-slate-400'}`}>
                                                            <span>{formatTime(msg.timestamp)}</span>
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
                                <div className="p-6 bg-white border-t border-slate-200">
                                    <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-4">
                                        <button type="button" className="p-3 rounded-xl bg-slate-100 text-slate-500 hover:text-primary hover:bg-primary/10 transition-all">
                                            <span className="material-symbols-outlined">add_circle</span>
                                        </button>
                                        <div className="flex-1 relative">
                                            <input
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                disabled={sending}
                                                className="w-full bg-slate-100 border-none rounded-2xl pl-5 pr-12 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 text-slate-900 placeholder-slate-400 font-medium disabled:opacity-50 transition-all"
                                                placeholder="Type your message..."
                                            />
                                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">sentiment_satisfied</span>
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim() || sending}
                                            className="p-3.5 rounded-2xl bg-primary text-white hover:brightness-105 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95"
                                        >
                                            {sending ? (
                                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <span className="material-symbols-outlined">send</span>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30">
                                <div className="size-24 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                                    <span className="material-symbols-outlined text-5xl text-slate-200">forum</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Your Conversations</h3>
                                <p className="text-slate-500 font-medium">Select a colleague to start chatting</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
