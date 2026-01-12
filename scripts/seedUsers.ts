/**
 * Seed Script - Add Test Users to Firestore
 * 
 * This script adds sample users to your Firestore database for testing.
 * 
 * Usage:
 * 1. Make sure your .env.local is configured with Firebase credentials
 * 2. Run: npx ts-node scripts/seedUsers.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Initialize Firebase (using same config as your app)
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Sample users to create
const testUsers = [
    {
        name: 'Dr. Ibrahim Musa',
        email: 'ibrahim.musa@nipa.test',
        password: 'Password123!',
        phone: '+234 803 555 1001',
        cohort: 'SEC 42',
        profession: 'Strategic Analyst',
        role: 'member',
        status: 'active',
    },
    {
        name: 'Col. Fatima Ahmed',
        email: 'fatima.ahmed@nipa.test',
        password: 'Password123!',
        phone: '+234 803 555 1002',
        cohort: 'SEC 43',
        profession: 'Military Officer',
        role: 'member',
        status: 'active',
    },
    {
        name: 'Prof. Chinedu Okafor',
        email: 'chinedu.okafor@nipa.test',
        password: 'Password123!',
        phone: '+234 803 555 1003',
        cohort: 'SEC 41',
        profession: 'Policy Researcher',
        role: 'admin',
        status: 'active',
    },
    {
        name: 'Mrs. Aisha Bello',
        email: 'aisha.bello@nipa.test',
        password: 'Password123!',
        phone: '+234 803 555 1004',
        cohort: 'SEC 44',
        profession: 'Government Advisor',
        role: 'member',
        status: 'active',
    },
    {
        name: 'Engr. Oluwaseun Adeyemi',
        email: 'oluwaseun.adeyemi@nipa.test',
        password: 'Password123!',
        phone: '+234 803 555 1005',
        cohort: 'SEC 43',
        profession: 'Infrastructure Consultant',
        role: 'member',
        status: 'active',
    },
    {
        name: 'Dr. Ngozi Okonkwo',
        email: 'ngozi.okonkwo@nipa.test',
        password: 'Password123!',
        phone: '+234 803 555 1006',
        cohort: 'SEC 45',
        profession: 'Economic Strategist',
        role: 'member',
        status: 'active',
    },
    {
        name: 'Alhaji Yusuf Tanko',
        email: 'yusuf.tanko@nipa.test',
        password: 'Password123!',
        phone: '+234 803 555 1007',
        cohort: 'SEC 42',
        profession: 'Security Analyst',
        role: 'welfare',
        status: 'active',
    },
    {
        name: 'Mrs. Grace Eze',
        email: 'grace.eze@nipa.test',
        password: 'Password123!',
        phone: '+234 803 555 1008',
        cohort: 'SEC 44',
        profession: 'Public Relations Officer',
        role: 'member',
        status: 'active',
    },
];

async function seedUsers() {
    console.log('🌱 Starting user seeding process...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const userData of testUsers) {
        try {
            // Create Firebase Auth user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );

            const userId = userCredential.user.uid;
            const now = new Date().toISOString();

            // Create Firestore user document
            await setDoc(doc(db, 'users', userId), {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                cohort: userData.cohort,
                profession: userData.profession,
                role: userData.role,
                status: userData.status,
                membershipType: 'regular',
                joinDate: now,
                createdAt: now,
                updatedAt: now,
            });

            console.log(`✅ Created user: ${userData.name} (${userData.email})`);
            successCount++;
        } catch (error: any) {
            if (error.code === 'auth/email-already-exists' || error.code === 'auth/email-already-in-use') {
                console.log(`⚠️  User already exists: ${userData.email}`);
            } else {
                console.error(`❌ Error creating ${userData.email}:`, error.message);
                errorCount++;
            }
        }
    }

    console.log(`\n📊 Seeding complete!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   ⚠️  Skipped: ${testUsers.length - successCount - errorCount}`);

    process.exit(0);
}

// Run the seeding
seedUsers().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
