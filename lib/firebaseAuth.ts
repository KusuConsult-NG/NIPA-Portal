import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser, findUserById } from './firestore';

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
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

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
