/**
 * Simple file-based database for development
 * In production, replace with PostgreSQL, MongoDB, etc.
 */

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string; // hashed
    cohort: string;
    profession: string;
    location?: string;
    role: 'member' | 'admin' | 'welfare';
    status: 'active' | 'inactive';
    membershipType: 'regular' | 'premium' | 'life';
    joinDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

// In-memory database (replace with real database)
const users: Map<string, User> = new Map();
const usersByEmail: Map<string, string> = new Map(); // email -> userId

/**
 * Create a new user
 */
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Check if email already exists
    if (usersByEmail.has(userData.email)) {
        throw new Error('Email already exists');
    }

    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    const user: User = {
        id,
        ...userData,
        createdAt: now,
        updatedAt: now
    };

    users.set(id, user);
    usersByEmail.set(userData.email, id);

    return user;
}

/**
 * Find user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
    return users.get(id) || null;
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
    const userId = usersByEmail.get(email);
    if (!userId) return null;
    return users.get(userId) || null;
}

/**
 * Update user
 */
export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    const user = users.get(id);
    if (!user) return null;

    const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date()
    };

    users.set(id, updatedUser);
    return updatedUser;
}

/**
 * Delete user
 */
export async function deleteUser(id: string): Promise<boolean> {
    const user = users.get(id);
    if (!user) return false;

    users.delete(id);
    usersByEmail.delete(user.email);
    return true;
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
    const { page = 1, limit = 50, role, status } = options;

    let filteredUsers = Array.from(users.values());

    if (role) {
        filteredUsers = filteredUsers.filter(u => u.role === role);
    }

    if (status) {
        filteredUsers = filteredUsers.filter(u => u.status === status);
    }

    const total = filteredUsers.length;
    const start = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(start, start + limit);

    return { users: paginatedUsers, total };
}

/**
 * Initialize with demo data
 */
export function initializeDatabase() {
    if (users.size === 0) {
        // Create admin user
        const adminId = 'admin_1';
        const adminUser: User = {
            id: adminId,
            name: 'Admin User',
            email: 'admin@nipa.org',
            phone: '+234 803 000 0000',
            password: 'hashed_admin_password', // In production, properly hash this
            cohort: 'SEC 40',
            profession: 'Administrator',
            location: 'Abuja, FCT',
            role: 'admin',
            status: 'active',
            membershipType: 'premium',
            joinDate: new Date('2020-01-01'),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        users.set(adminId, adminUser);
        usersByEmail.set(adminUser.email, adminId);
    }
}

// Initialize on module load
initializeDatabase();
