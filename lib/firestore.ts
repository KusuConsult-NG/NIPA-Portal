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
    limit
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
    status: 'active' | 'inactive' | 'pending';
    membershipType: 'regular' | 'premium' | 'life';
    dob?: string;
    birthMonth?: number; // 0-11
    birthDay?: number;   // 1-31
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
    try {
        const userDoc = await getDoc(doc(db, 'users', id));

        if (!userDoc.exists()) {
            return null;
        }

        const data = userDoc.data();
        return {
            id: userDoc.id,
            ...data,
            joinDate: data.joinDate ? new Date(data.joinDate) : new Date(),
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
            updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date()
        } as User;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null;
    }
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
    } catch {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 * Election Interfaces
 */
export interface ElectionPosition {
    id: string;
    title: string;
    price: string;
    description: string;
    icon?: string;
}

export interface Election {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'upcoming' | 'active' | 'completed';
    positions: ElectionPosition[];
    createdAt: string;
}

export interface Candidate {
    id: string;
    electionId: string;
    userId: string;
    name: string;
    positionId: string;
    positionName: string;
    cohort: string;
    manifesto: string;
    status: 'pending' | 'approved' | 'rejected';
    paymentStatus: 'paid' | 'unpaid';
    createdAt: string;
}

export interface Vote {
    id: string; // userId
    votes: { [positionId: string]: string }; // Map positionId -> candidateId
    timestamp: string;
}

/**
 * Get active election
 */
export async function getActiveElection(): Promise<Election | null> {
    const q = query(
        collection(db, 'elections'),
        where('status', '==', 'active'),
        limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];
    return {
        id: doc.id,
        ...doc.data()
    } as Election;
}

/**
 * Get candidates for an election
 */
export async function getCandidates(electionId: string): Promise<Candidate[]> {
    const q = query(
        collection(db, 'elections', electionId, 'candidates'),
        where('status', '==', 'approved')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Candidate));
}

/**
 * Register as a candidate
 */
export async function registerCandidate(
    electionId: string,
    userId: string,
    candidateData: Omit<Candidate, 'id' | 'electionId' | 'userId' | 'createdAt' | 'status'>
): Promise<Candidate> {
    const candidateRef = doc(collection(db, 'elections', electionId, 'candidates')); // Auto-ID
    // Typically use userId as document ID or a composite key to enforce one candidacy per election if strict
    // For now auto-id

    const newCandidate: Candidate = {
        id: candidateRef.id,
        electionId,
        userId,
        ...candidateData,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await setDoc(candidateRef, newCandidate as any);
    return newCandidate;
}

/**
 * Cast a vote
 */
export async function castVote(electionId: string, userId: string, votes: { [positionId: string]: string }): Promise<void> {
    const voteRef = doc(db, 'elections', electionId, 'votes', userId); // UserId as doc ID to enforce uniqueness

    await setDoc(voteRef, {
        id: userId,
        votes,
        timestamp: new Date().toISOString()
    });
}

/**
 * Welfare / Greetings Interfaces
 */
export interface Greeting {
    id: string;
    senderId: string;
    recipientId: string;
    type: 'birthday' | 'generic';
    year: number; // For birthday tracking
    timestamp: string;
}

/**
 * Get celebrants for a specific month
 * @param month - Month number (0-11, where 0 = January)
 */
export async function getCelebrants(month: number): Promise<User[]> {
    const q = query(
        collection(db, 'users'),
        where('birthMonth', '==', month),
        orderBy('birthDay', 'asc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            joinDate: new Date(data.joinDate),
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt)
        } as User;
    });
}

/**
 * Send a greeting (e.g. Birthday wish)
 */
export async function sendGreeting(senderId: string, recipientId: string, type: 'birthday' | 'generic' = 'birthday'): Promise<void> {
    const year = new Date().getFullYear();
    const greetingRef = doc(collection(db, 'greetings')); // Auto-ID

    await setDoc(greetingRef, {
        senderId,
        recipientId,
        type,
        year,
        timestamp: new Date().toISOString()
    });
}

/**
 * Get all birthday greetings sent in a specific year
 * Used to check "Sent" status
 */
export async function getGreetingsForYear(year: number): Promise<Greeting[]> {
    const q = query(
        collection(db, 'greetings'),
        where('type', '==', 'birthday'),
        where('year', '==', year)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Greeting));
}

/**
 * Messaging Interfaces
 */
export interface Conversation {
    id: string;
    participants: string[]; // Array of 2 userIds for 1-on-1
    lastMessage?: {
        text: string;
        senderId: string;
        timestamp: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface ConversationMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    read: boolean;
}

/**
 * Get all conversations for a user
 */
export async function getConversations(userId: string): Promise<Conversation[]> {
    const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Conversation));
}

/**
 * Get messages in a conversation
 */
export async function getMessages(conversationId: string): Promise<ConversationMessage[]> {
    const q = query(
        collection(db, 'conversations', conversationId, 'messages'),
        orderBy('timestamp', 'asc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as ConversationMessage));
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(conversationId: string, senderId: string, text: string): Promise<void> {
    const timestamp = new Date().toISOString();
    const messageRef = doc(collection(db, 'conversations', conversationId, 'messages'));

    // Add message to subcollection
    await setDoc(messageRef, {
        senderId,
        text,
        timestamp,
        read: false
    });

    // Update conversation's lastMessage
    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, {
        lastMessage: {
            text,
            senderId,
            timestamp
        },
        updatedAt: timestamp
    });
}

/**
 * Create or get existing conversation between two users
 */
export async function createOrGetConversation(userId1: string, userId2: string): Promise<string> {
    // Check if conversation already exists
    const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId1)
    );

    const snapshot = await getDocs(q);
    const existingConv = snapshot.docs.find(doc => {
        const participants = doc.data().participants as string[];
        return participants.includes(userId2);
    });

    if (existingConv) {
        return existingConv.id;
    }

    // Create new conversation
    const newConvRef = doc(collection(db, 'conversations'));
    const now = new Date().toISOString();

    await setDoc(newConvRef, {
        participants: [userId1, userId2],
        createdAt: now,
        updatedAt: now
    });

    return newConvRef.id;
}

/**
 * Resources Interfaces
 */
export interface Resource {
    id: string;
    title: string;
    category: 'Policy Papers' | 'Governance' | 'Training Materials' | 'Reports';
    fileName: string;
    storagePath: string;
    fileType: string;
    fileSize: number;
    uploadedBy: string;
    author: string;
    downloads: number;
    createdAt: string;
}

/**
 * Get all resources or filtered by category
 */
export async function getResources(category?: string): Promise<Resource[]> {
    let q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));

    if (category && category !== 'all') {
        q = query(collection(db, 'resources'), where('category', '==', category), orderBy('createdAt', 'desc'));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Resource));
}

/**
 * Upload resource to Firebase Storage and create Firestore doc
 * Note: File upload to Storage happens in the client component
 * This function creates the metadata record
 */
export async function createResourceMetadata(resourceData: Omit<Resource, 'id' | 'downloads' | 'createdAt'>): Promise<string> {
    const resourceRef = doc(collection(db, 'resources'));

    await setDoc(resourceRef, {
        ...resourceData,
        downloads: 0,
        createdAt: new Date().toISOString()
    });

    return resourceRef.id;
}

/**
 * Increment download count for a resource
 */
export async function incrementResourceDownloads(resourceId: string): Promise<void> {
    const resourceRef = doc(db, 'resources', resourceId);
    const resourceDoc = await getDoc(resourceRef);

    if (!resourceDoc.exists()) return;

    const currentDownloads = resourceDoc.data().downloads || 0;
    await updateDoc(resourceRef, {
        downloads: currentDownloads + 1
    });
}

/**
 * Delete resource (metadata only - Storage deletion should be handled separately)
 */
export async function deleteResource(resourceId: string): Promise<void> {
    await deleteDoc(doc(db, 'resources', resourceId));
}

/**
 * Course Interfaces
 */
export interface Course {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    type: 'Short Course' | 'Seminar' | 'Workshop' | 'Online' | 'Executive Program';
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Executive';
    price: number | 'Free';
    currency: 'NGN' | 'USD';
    startDate: string;
    endDate: string;
    duration: string;
    instructor: string;
    image: string; // URL
    capacity: number;
    registeredCount: number;
    status: 'open' | 'closed' | 'upcoming';
    featured?: boolean;
    modules?: { title: string; duration: string }[];
    createdAt: string;
}

export interface CourseRegistration {
    id: string; // usually userId_courseId
    userId: string;
    courseId: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    paymentStatus: 'paid' | 'unpaid' | 'waived';
    registeredAt: string;
}

/**
 * Get all courses with optional filtering
 */
export async function getCourses(filter?: { featured?: boolean; type?: string; status?: string }): Promise<Course[]> {
    try {
        let q = query(collection(db, 'courses'), orderBy('startDate', 'asc'));

        if (filter?.featured) {
            q = query(q, where('featured', '==', true));
        }

        if (filter?.type && filter.type !== 'All') {
            q = query(q, where('type', '==', filter.type));
        }

        if (filter?.status) {
            q = query(q, where('status', '==', filter.status));
        }

        const snapshot = await getDocs(q);

        // Return real data if exists, otherwise return formatted mock data for dev
        if (!snapshot.empty) {
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Course));
        }

        // Mock data fallback if DB is empty (to ensure page works immediately)
        console.log('[Firestore] No courses found, returning mocks');
        return [
            {
                id: 'course-1',
                title: 'Senior Executive Course (SEC) 46',
                description: 'The flagship program designed for high-level policy makers and executors. Prepare for the next level of strategic leadership with intensive modules on governance, economy, and national security.',
                shortDescription: 'Flagship program for high-level policy makers.',
                type: 'Executive Program',
                level: 'Executive',
                price: 5000000,
                currency: 'NGN',
                startDate: '2024-02-01',
                endDate: '2024-11-30',
                duration: '10 Months',
                instructor: 'Dr. A. Ibrahim',
                image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop',
                capacity: 60,
                registeredCount: 45,
                status: 'open',
                featured: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 'course-2',
                title: 'Strategic Leadership Workshop',
                description: 'Intensive 5-day workshop focused on modern leadership frameworks and change management in public sector institutions.',
                shortDescription: 'Modern frameworks for public sector leadership.',
                type: 'Workshop',
                level: 'Advanced',
                price: 250000,
                currency: 'NGN',
                startDate: '2024-03-15',
                endDate: '2024-03-20',
                duration: '5 Days',
                instructor: 'Prof. Sarah Okon',
                image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop',
                capacity: 100,
                registeredCount: 82,
                status: 'open',
                createdAt: new Date().toISOString()
            },
            {
                id: 'course-3',
                title: 'Digital Governance Seminar',
                description: 'Exploring the intersection of technology and governance. Learn how to leverage digital tools for transparent and efficient public service delivery.',
                shortDescription: 'Leveraging tech for efficient service delivery.',
                type: 'Seminar',
                level: 'Intermediate',
                price: 150000,
                currency: 'NGN',
                startDate: '2024-04-05',
                endDate: '2024-04-05',
                duration: '1 Day',
                instructor: 'Engr. T. Balogun',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop',
                capacity: 200,
                registeredCount: 156,
                status: 'upcoming',
                createdAt: new Date().toISOString()
            },
            {
                id: 'course-4',
                title: 'Policy Formulation Masterclass',
                description: 'A deep dive into the cycle of policy formulation, implementation, and evaluation. Suitable for civil servants and policy analysts.',
                shortDescription: 'Comprehensive guide to policy cycle.',
                type: 'Online',
                level: 'Advanced',
                price: 75000,
                currency: 'NGN',
                startDate: '2024-03-01',
                endDate: '2024-03-31',
                duration: '4 Weeks',
                instructor: 'Dr. P. Mensah',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop',
                capacity: 500,
                registeredCount: 320,
                status: 'open',
                createdAt: new Date().toISOString()
            }
        ];

    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

/**
 * Register user for a course
 */
export async function registerForCourse(userId: string, courseId: string): Promise<{ success: boolean; message: string }> {
    try {
        const regId = `${userId}_${courseId}`;
        const regRef = doc(db, 'course_registrations', regId);

        // check existing
        const existing = await getDoc(regRef);
        if (existing.exists()) {
            return { success: false, message: 'You are already registered for this course.' };
        }

        // Create registration
        await setDoc(regRef, {
            id: regId,
            userId,
            courseId,
            status: 'pending',
            paymentStatus: 'unpaid',
            registeredAt: new Date().toISOString()
        });

        // Increment count
        const courseRef = doc(db, 'courses', courseId);
        // Note: transaction would be better for concurrency but keep simple for now
        const courseDoc = await getDoc(courseRef);
        if (courseDoc.exists()) {
            const current = courseDoc.data().registeredCount || 0;
            await updateDoc(courseRef, { registeredCount: current + 1 });
        }

        return { success: true, message: 'Registration successful!' };
    } catch (error) {
        console.error('Error registering for course:', error);
        return { success: false, message: 'Registration failed. Please try again.' };
    }
}
