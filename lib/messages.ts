
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    onSnapshot,
    Timestamp,
    limit
} from 'firebase/firestore';
import { db } from './firebase';

export interface Message {
    id: string;
    text: string;
    senderId: string;
    createdAt: Timestamp;
    readBy: string[];
}

export interface Conversation {
    id: string;
    participants: string[];
    participantDetails?: any[];
    lastMessage?: {
        text: string;
        senderId: string;
        createdAt: Timestamp;
    };
    updatedAt: Timestamp;
    unreadCount?: number; // Calculated on client
}

/**
 * Get all conversations for a user
 */
export function subscribeToConversations(userId: string, callback: (conversations: Conversation[]) => void) {
    const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const conversations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Conversation));
        callback(conversations);
    });
}

/**
 * Get messages for a conversation
 */
export function subscribeToMessages(conversationId: string, callback: (messages: Message[]) => void) {
    const q = query(
        collection(db, 'conversations', conversationId, 'messages'),
        orderBy('createdAt', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Message));
        callback(messages);
    });
}

/**
 * Send a message
 */
export async function sendMessage(conversationId: string, text: string, senderId: string) {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');

    // Add message
    await addDoc(messagesRef, {
        text,
        senderId,
        createdAt: serverTimestamp(),
        readBy: [senderId]
    });

    // Update conversation last message
    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, {
        lastMessage: {
            text,
            senderId,
            createdAt: serverTimestamp()
        },
        updatedAt: serverTimestamp()
    });
}

/**
 * Create a new conversation
 */
export async function createConversation(participants: string[]) {
    // Check if conversation already exists (optional optimization)
    // For now, just create a new one
    const conversationRef = await addDoc(collection(db, 'conversations'), {
        participants,
        updatedAt: serverTimestamp(),
        participantsMap: participants.reduce((acc, uid) => ({ ...acc, [uid]: true }), {}) // Helper for simpler queries if needed
    });
    return conversationRef.id;
}

/**
 * Mark messages as read (simple implementation)
 */
export async function markAsRead(conversationId: string, userId: string) {
    // This would ideally require batch updates for all unread messages
    // Placeholder for now
}
