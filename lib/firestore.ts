import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    cohort: string;
    profession: string;
    location?: string;
    role: 'member' | 'admin' | 'welfare';
    status: 'active' | 'inactive';
    membershipType: 'regular' | 'premium' | 'life';
    joinDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Create a new user in Firestore
 */
export async function createUser(userId: string, userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();

    const user: User = {
        id: userId,
        ...userData,
        createdAt: now,
        updatedAt: now
    };

    await setDoc(doc(db, 'users', userId), {
        ...user,
        joinDate: user.joinDate.toISOString(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
    });

    return user;
}

/**
 * Find user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', id));

    if (!userDoc.exists()) {
        return null;
    }

    const data = userDoc.data();
    return {
        id: userDoc.id,
        ...data,
        joinDate: new Date(data.joinDate),
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
    } as User;
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
    const q = query(collection(db, 'users'), where('email', '==', email), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const data = snapshot.docs[0].data();
    return {
        id: snapshot.docs[0].id,
        ...data,
        joinDate: new Date(data.joinDate),
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
    } as User;
}

/**
 * Update user
 */
export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        return null;
    }

    const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
    };

    await updateDoc(userRef, updateData);

    return await findUserById(id);
}

/**
 * Delete user
 */
export async function deleteUser(id: string): Promise<boolean> {
    try {
        await deleteDoc(doc(db, 'users', id));
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * List all users (with pagination)
 */
export async function listUsers(options: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
}): Promise<{ users: User[]; total: number }> {
    const { page = 1, limit: pageLimit = 50, role, status } = options;

    let q = query(collection(db, 'users'));

    // Apply filters
    if (role) {
        q = query(q, where('role', '==', role));
    }

    if (status) {
        q = query(q, where('status', '==', status));
    }

    // Apply pagination
    q = query(q, orderBy('createdAt', 'desc'), limit(pageLimit));

    const snapshot = await getDocs(q);

    const users = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            joinDate: new Date(data.joinDate),
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt)
        } as User;
    });

    return { users, total: users.length };
}

/**
 * Store event in Firestore
 */
export async function createEvent(eventData: any) {
    const eventRef = doc(collection(db, 'events'));
    await setDoc(eventRef, {
        ...eventData,
        date: eventData.date.toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    return { id: eventRef.id, ...eventData };
}

/**
 * Get all events
 */
export async function getEvents(statusFilter?: string) {
    let q = query(collection(db, 'events'), orderBy('date', 'asc'));

    if (statusFilter && statusFilter !== 'all') {
        q = query(q, where('status', '==', statusFilter));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date)
    }));
}

/**
 * Create payment in Firestore
 */
export async function createPayment(paymentData: any) {
    const paymentRef = doc(collection(db, 'payments'));
    await setDoc(paymentRef, {
        ...paymentData,
        transactionDate: paymentData.transactionDate.toISOString(),
        createdAt: new Date().toISOString()
    });
    return { id: paymentRef.id, ...paymentData };
}

/**
 * Get payments for a user
 */
export async function getPayments(memberId?: string) {
    let q = query(collection(db, 'payments'), orderBy('transactionDate', 'desc'));

    if (memberId) {
        q = query(q, where('memberId', '==', memberId));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        transactionDate: new Date(doc.data().transactionDate)
    }));
}
