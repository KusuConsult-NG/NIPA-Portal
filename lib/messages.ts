import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    Timestamp
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// ... (skipping middle parts to target cleanup)

/**
 * Mark messages as read (simple implementation)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function markAsRead(conversationId: string, userId: string) {
    // This would ideally require batch updates for all unread messages
    // Placeholder for now
}
