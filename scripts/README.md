# Scripts Directory

This directory contains utility scripts for database seeding and maintenance.

## Available Scripts

### `seedUsers.ts` - Add Test Users

Populates your Firestore database with sample test users.

**Prerequisites:**
1. Your `.env.local` file must be configured with valid Firebase credentials
2. Firebase Authentication must be enabled in your Firebase project

**Usage:**

```bash
# Using ts-node
npx ts-node scripts/seedUsers.ts

# Or using tsx (if installed)
npx tsx scripts/seedUsers.ts
```

**What it does:**
- Creates 8 test users in Firebase Authentication
- Creates corresponding user documents in Firestore
- Assigns different roles (member, admin, welfare)
- Sets various cohorts (SEC 41-45)
- All users have the password: `Password123!`

**Test Users Created:**
1. Dr. Ibrahim Musa (Member) - SEC 42
2. Col. Fatima Ahmed (Member) - SEC 43
3. Prof. Chinedu Okafor (Admin) - SEC 41
4. Mrs. Aisha Bello (Member) - SEC 44
5. Engr. Oluwaseun Adeyemi (Member) - SEC 43
6. Dr. Ngozi Okonkwo (Member) - SEC 45
7. Alhaji Yusuf Tanko (Welfare) - SEC 42
8. Mrs. Grace Eze (Member) - SEC 44

**Notes:**
- The script will skip users that already exist
- All test emails use the `.test` domain
- Users can be modified in the `testUsers` array in the script
