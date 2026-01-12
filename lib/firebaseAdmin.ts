import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    const serviceAccount = require('../serviceAccountKey.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'corporative-app'
    });
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();

/**
 * Verify Firebase ID token
 */
export async function verifyFirebaseToken(idToken: string) {
    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

/**
 * Create custom token for a user
 */
export async function createCustomToken(uid: string, additionalClaims?: object) {
    try {
        return await adminAuth.createCustomToken(uid, additionalClaims);
    } catch (error) {
        console.error('Custom token creation error:', error);
        throw error;
    }
}

/**
 * Get user by UID
 */
export async function getUserByUid(uid: string) {
    try {
        return await adminAuth.getUser(uid);
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}

/**
 * Set custom user claims (for roles)
 */
export async function setUserRole(uid: string, role: 'member' | 'admin' | 'welfare') {
    try {
        await adminAuth.setCustomUserClaims(uid, { role });
        return true;
    } catch (error) {
        console.error('Set user role error:', error);
        return false;
    }
}

/**
 * Delete user
 */
export async function deleteUserFromAuth(uid: string) {
    try {
        await adminAuth.deleteUser(uid);
        return true;
    } catch (error) {
        console.error('Delete user error:', error);
        return false;
    }
}

export { admin, adminAuth, adminDb };
