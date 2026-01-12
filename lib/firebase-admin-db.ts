import { adminDb } from './firebase-admin';
import { User } from './firestore'; // Re-using the User type

/**
 * Find user by ID using Admin SDK
 */
export async function findUserById(id: string): Promise<User | null> {
    try {
        const userDoc = await adminDb.collection('users').doc(id).get();

        if (!userDoc.exists) {
            return null;
        }

        const data = userDoc.data();
        if (!data) return null;

        // Convert Firestore timestamps to Date objects
        return {
            id: userDoc.id,
            ...data,
            joinDate: data.joinDate ? (typeof data.joinDate === 'string' ? new Date(data.joinDate) : data.joinDate.toDate()) : new Date(),
            createdAt: data.createdAt ? (typeof data.createdAt === 'string' ? new Date(data.createdAt) : data.createdAt.toDate()) : new Date(),
            updatedAt: data.updatedAt ? (typeof data.updatedAt === 'string' ? new Date(data.updatedAt) : data.updatedAt.toDate()) : new Date()
        } as User;
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error;
    }
}

/**
 * Update user using Admin SDK
 */
export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    try {
        const userRef = adminDb.collection('users').doc(id);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return null;
        }

        const updateData = {
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await userRef.update(updateData);

        // Return updated user
        return await findUserById(id);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
