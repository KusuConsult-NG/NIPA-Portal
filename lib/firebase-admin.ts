import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Initialize Firebase Admin (server-side only)
let app;
if (!projectId || !clientEmail || !privateKey) {
    console.warn('Missing Firebase Admin credentials in environment variables - skipping initialization');
} else {
    try {
        app = !getApps().length
            ? initializeApp({
                credential: cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
            })
            : getApps()[0];
    } catch (error) {
        console.error('Firebase Admin initialization error:', error);
    }
}

const adminDb = app ? getFirestore(app) : {} as FirebaseFirestore.Firestore;
const adminAuth = app ? getAuth(app) : {} as import('firebase-admin/auth').Auth;

export { adminDb, adminAuth };
