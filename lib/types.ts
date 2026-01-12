// Member data types
export interface Member {
    id: string;
    name: string;
    email: string;
    phone: string;
    cohort: string;
    profession: string;
    location: string;
    avatar?: string;
    status: 'active' | 'inactive';
    membershipType: 'regular' | 'premium' | 'life';
    joinDate: Date;
}

// Payment data types
export interface Payment {
    id: string;
    memberId: string;
    amount: number;
    description: string;
    category: 'dues' | 'conference' | 'election' | 'special';
    status: 'successful' | 'pending' | 'failed';
    transactionDate: Date;
    receiptUrl?: string;
}

// Election data types
export interface ElectionPosition {
    id: string;
    title: string;
    description: string;
    price: number;
    icon: string;
}

export interface Candidate {
    id: string;
    memberId: string;
    positionId: string;
    name: string;
    cohort: string;
    manifesto?: string;
    verified: boolean;
    photo?: string;
}

export interface Election {
    id: string;
    title: string;
    nominationDeadline: Date;
    votingStartDate: Date;
    votingEndDate: Date;
    status: 'upcoming' | 'nomination' | 'voting' | 'completed';
}

// Event data types
export interface Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    type: 'summit' | 'gala' | 'meeting' | 'training';
    registrationRequired: boolean;
    capacity?: number;
}

// Announcement data types
export interface Announcement {
    id: string;
    title: string;
    content: string;
    category: 'policy' | 'general' | 'urgent' | 'event';
    publishedAt: Date;
    expiresAt?: Date;
}

// Birthday/Welfare data types
export interface BirthdayCelebrant {
    id: string;
    memberId: string;
    name: string;
    birthDate: Date;
    cohort: string;
    email: string;
    phone: string;
    greetingStatus: 'pending' | 'sent' | 'upcoming';
    greetingSentAt?: Date;
}

// Message data types
export interface Conversation {
    id: string;
    participants: string[];
    lastMessage: Message;
    unreadCount: number;
    updatedAt: Date;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    sentAt: Date;
    readAt?: Date;
    status: 'sending' | 'sent' | 'delivered' | 'read';
}

// Dashboard stats types
export interface DashboardStats {
    totalMembers: number;
    activeMembers: number;
    monthlyRevenue: number;
    yearlyRevenue: number;
    pendingVerifications: number;
    upcomingEvents: number;
}
