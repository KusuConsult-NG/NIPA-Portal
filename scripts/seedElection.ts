
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Environment variables are loaded via command line
// import * as dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (Admin context via client SDK for seeding simplicity)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Add auth

import { signInWithEmailAndPassword } from 'firebase/auth'; // Import sign in

const ELECTION_ID = 'election_2025_executive';

async function seedElection() {
    console.log('🗳️  Starting election seeding...');

    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        console.error('❌ Error: Environment variables not loaded. Check .env.local');
        process.exit(1);
    }

    try {
        // Authenticate as Admin (Prof. Chinedu) to allow writes
        console.log('🔐 Authenticating as admin...');
        await signInWithEmailAndPassword(auth, 'chinedu.okafor@nipa.test', 'Password123!');
        console.log('✅ Authenticated.');

        // 1. Deactivate any currently active elections
        const activeQuery = query(collection(db, 'elections'), where('status', '==', 'active'));
        const activeSnapshot = await getDocs(activeQuery);

        if (!activeSnapshot.empty) {
            console.log(`found ${activeSnapshot.size} active elections. Deactivating...`);
            const batch = writeBatch(db);
            activeSnapshot.docs.forEach(doc => {
                if (doc.id !== ELECTION_ID) {
                    batch.update(doc.ref, { status: 'completed' });
                }
            });
            await batch.commit();
            console.log('✅ Previous elections deactivated.');
        }

        // 2. Create the new Active Election
        const electionRef = doc(db, 'elections', ELECTION_ID);
        const startDate = new Date('2025-01-01');
        const endDate = new Date('2025-12-31');

        await setDoc(electionRef, {
            title: '2025 National Executive Council Election',
            description: 'The annual election to elect the new National Executive Council members who will steer the affairs of the association for the 2025/2026 service year. YOUR VOTE IS YOUR VOICE.',
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            status: 'active',
            createdAt: new Date().toISOString(),
            positions: [
                {
                    id: 'pos_president',
                    title: 'National President',
                    price: '₦500,000',
                    description: 'The head of the association, responsible for overall leadership and direction.',
                    icon: 'gavel'
                },
                {
                    id: 'pos_vp',
                    title: 'Vice President',
                    price: '₦300,000',
                    description: 'Assists the President and oversees specific committee functions.',
                    icon: 'admin_panel_settings'
                },
                {
                    id: 'pos_gen_sec',
                    title: 'General Secretary',
                    price: '₦250,000',
                    description: 'Manages the secretariat and official correspondence.',
                    icon: 'edit_note'
                },
                {
                    id: 'pos_fin_sec',
                    title: 'Financial Secretary',
                    price: '₦250,000',
                    description: 'Oversees financial records and budget planning.',
                    icon: 'account_balance'
                },
                {
                    id: 'pos_pro',
                    title: 'Public Relations Officer',
                    price: '₦200,000',
                    description: 'Manages external communications and media relations.',
                    icon: 'campaign'
                }
            ]
        });

        console.log(`✅ Election created: "2025 National Executive Council Election" (ID: ${ELECTION_ID})`);

        console.log('\n📊 Seeding complete! The requested election is now ACTIVE.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedElection();
