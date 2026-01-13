import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    User as FirebaseUser
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser, findUserById } from './firestore';

/**
 * Sign up a new user
 */
/**
 * Helper to check if we are in Mock Mode (API keys missing)
 */
const isMockMode = () => {
    return !auth || !auth.app || !auth.config;
};

/**
 * Sign up a new user
 */
export async function signUpWithEmail(
    email: string,
    password: string,
    userData: {
        name: string;
        phone: string;
        cohort: string;
        profession: string;
    }
) {
    // If keys are missing, simulate success (Mock Mode)
    if (isMockMode()) {
        console.warn('[Mock Mode] Creating fake user because API keys are missing');
        const mockUid = 'mock-user-' + Date.now();
        const firebaseUser = {
            uid: mockUid,
            email,
            displayName: userData.name,
            emailVerified: true
        } as FirebaseUser;

        // Still try to save to Firestore (will fail if keys missing too, but handled gracefully maybe?)
        // Actually if keys are missing, Firestore is also mock {}.
        // So we return simulated data.

        return {
            user: {
                ...userData,
                id: mockUid,
                email,
                role: 'member',
                status: 'active',
                membershipType: 'regular',
                joinDate: new Date(),
                photoUrl: ''
            },
            firebaseUser
        };
    }

    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Update profile display name
    await updateProfile(firebaseUser, {
        displayName: userData.name
    });

    // Create user document in Firestore
    const user = await createUser(firebaseUser.uid, {
        name: userData.name,
        email,
        phone: userData.phone,
        cohort: userData.cohort,
        profession: userData.profession,
        role: 'member',
        status: 'active',
        membershipType: 'regular',
        joinDate: new Date()
    });

    return { user, firebaseUser };
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
    // Mock Mode Check
    if (isMockMode()) {
        console.warn('[Mock Mode] Signing in fake user');
        const mockUid = 'mock-user-123';
        return {
            user: {
                id: mockUid,
                name: 'Test Member',
                email,
                role: 'member',
                status: 'active',
                membershipType: 'regular',
                joinDate: new Date()
            } as any,
            firebaseUser: { uid: mockUid, email } as FirebaseUser
        };
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get user data from Firestore
    const user = await findUserById(firebaseUser.uid);

    return { user, firebaseUser };
}

/**
 * Sign out current user
 */
export async function signOutUser() {
    await signOut(auth);
}

/**
 * Get current user
 */
export function getCurrentUser(): Promise<FirebaseUser | null> {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

/**
 * Auth state observer
 */
export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
}
