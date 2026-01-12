'use client';

import { useState, useRef, useEffect } from 'react';
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

// Extended conversation with user info
interface ConversationWithUser extends Conversation {
    otherUser?: User;
}

export default function MessagesPage() {
    const { user } = useAuth();
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
            if (!user) return;

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

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-navy-deep">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

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
                    {conversations.length > 0 ? (
                        conversations.map(conv => (
                            <div
                                key={conv.id}
                                onClick={() => setActiveConversationId(conv.id)}
                                className={`p-4 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 ${activeConversationId === conv.id ? 'bg-white/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                            >
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <div className="size-12 rounded-full bg-slate-700 bg-center bg-cover" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.otherUser?.name || 'User'})` }}></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-bold truncate ${activeConversationId === conv.id ? 'text-white' : 'text-slate-300'}`}>
                                                {conv.otherUser?.name || 'Unknown User'}
                                            </h3>
                                            {conv.lastMessage && (
                                                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
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
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 px-4">
                            <span className="material-symbols-outlined text-4xl mb-2">chat_bubble_outline</span>
                            <p className="text-sm text-center">No conversations yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-navy-deep relative">
                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-18 bg-navy-light/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 shadow-md relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-slate-700 bg-center bg-cover border border-white/10" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConversation.otherUser?.name || 'User'})` }}></div>
                                <div>
                                    <h2 className="font-bold text-white">{activeConversation.otherUser?.name || 'Unknown User'}</h2>
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-1.5 rounded-full bg-slate-500"></div>
                                        <span className="text-xs font-medium text-slate-500">{activeConversation.otherUser?.profession || 'Member'}</span>
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
                            {messages.map((msg) => {
                                const isMe = msg.senderId === user?.uid;
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex items-end gap-3 max-w-[80%] ${isMe ? 'flex-row-reverse' : ''}`}>
                                            {!isMe && (
                                                <div className="size-8 rounded-full bg-slate-700 bg-center bg-cover mb-1 border border-white/10 shadow-sm shrink-0" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConversation.otherUser?.name || 'User'})` }}></div>
                                            )}
                                            <div className={`relative px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${isMe ? 'bg-primary text-navy-deep font-medium rounded-br-none' : 'bg-white/10 text-slate-300 rounded-bl-none border border-white/5'}`}>
                                                <p>{msg.text}</p>
                                                <div className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${isMe ? 'text-navy-deep/60' : 'text-slate-500'}`}>
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
                        <div className="p-4 bg-navy-light/50 backdrop-blur-md border-t border-white/5">
                            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center gap-3">
                                <button type="button" className="p-2.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">add_circle</span>
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        disabled={sending}
                                        className="w-full bg-white/5 border border-white/5 rounded-full pl-5 pr-12 py-3.5 text-sm focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500 font-medium disabled:opacity-50"
                                        placeholder="Type your message..."
                                    />
                                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-lg">sentiment_satisfied</span>
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || sending}
                                    className="p-3.5 rounded-full bg-primary text-navy-deep hover:bg-primary/90 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95"
                                >
                                    {sending ? (
                                        <div className="size-5 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin"></div>
                                    ) : (
                                        <span className="material-symbols-outlined">send</span>
                                    )}
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
