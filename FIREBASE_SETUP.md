# Firebase Environment Variables

Create a `.env.local` file in the root directory with these variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCawOOE47xchjFXW5SzGEVm45e8OuLSjVo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=corporative-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=corporative-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=corporative-app.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=610917652176
NEXT_PUBLIC_FIREBASE_APP_ID=1:610917652176:web:0b9c6e2c67c1f35a91f0d5
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-W38GC98LY0

# JWT Secret for custom tokens
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## Firestore Security Rules

Set these rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      // Anyone can read user profiles
      allow read: if true;
      
      // Only authenticated users can create their own profile
      allow create: if request.auth != null && request.auth.uid == userId;
      
      // Users can only update their own profile, admins can update any
      allow update: if request.auth != null && 
        (request.auth.uid == userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      
      // Only admins can delete
      allow delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Events collection
    match /events/{eventId} {
      // Anyone can read events
      allow read: if true;
      
      // Only admins can create/update/delete events
      allow create, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Payments collection
    match /payments/{paymentId} {
      // Users can only read their own payments, admins can read all
      allow read: if request.auth != null && 
        (resource.data.memberId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      
      // Users can create their own payments
      allow create: if request.auth != null && request.resource.data.memberId == request.auth.uid;
      
      // Only admins can update/delete payments
      allow update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Registrations collection (event registrations)
    match /registrations/{registrationId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

## Firebase Authentication Setup

1. Go to Firebase Console
2. Enable Email/Password authentication
3. Optionally enable Google, Facebook, etc.

## Indexes (if needed)

If you get index errors, Firebase will provide the link to create them automatically.
