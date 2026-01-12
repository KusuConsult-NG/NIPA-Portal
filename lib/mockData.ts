import type { Member } from './types';

export const mockMembers: Member[] = [
    {
        id: '1',
        name: 'Col. Ahmed Bello',
        email: 'ahmed.bello@nipa.org',
        phone: '+234 803 123 4567',
        cohort: 'SEC 42',
        profession: 'Military Officer',
        location: 'Abuja, FCT',
        status: 'active',
        membershipType: 'premium',
        joinDate: new Date('2020-03-15')
    },
    {
        id: '2',
        name: 'Dr. Sarah Okonkwo',
        email: 'sarah.okonkwo@nipa.org',
        phone: '+234 805 234 5678',
        cohort: 'SEC 45',
        profession: 'Strategic Consultant',
        location: 'Lagos, Nigeria',
        status: 'active',
        membershipType: 'life',
        joinDate: new Date('2023-01-20')
    },
    {
        id: '3',
        name: 'Engr. Musa Ibrahim',
        email: 'musa.ibrahim@nipa.org',
        phone: '+234 807 345 6789',
        cohort: 'SEC 44',
        profession: 'Civil Engineer',
        location: 'Kano, Nigeria',
        status: 'active',
        membershipType: 'regular',
        joinDate: new Date('2022-06-10')
    },
    {
        id: '4',
        name: 'Barr. Fatima Yusuf',
        email: 'fatima.yusuf@nipa.org',
        phone: '+234 809 456 7890',
        cohort: 'SEC 41',
        profession: 'Legal Practitioner',
        location: 'Ibadan, Oyo',
        status: 'active',
        membershipType: 'premium',
        joinDate: new Date('2019-09-05')
    },
    {
        id: '5',
        name: 'Prof. David Okon',
        email: 'david.okon@nipa.org',
        phone: '+234 810 567 8901',
        cohort: 'SEC 40',
        profession: 'Academic Researcher',
        location: 'Enugu, Nigeria',
        status: 'active',
        membershipType: 'life',
        joinDate: new Date('2018-11-12')
    }
];

export const mockAnnouncements = [
    {
        id: '1',
        title: 'New Strategy Framework for 2025 Leadership Summit',
        content: 'The executive committee has finalized the foundational documents for the upcoming leadership summit focusing on regional security and economic growth...',
        category: 'policy' as const,
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
        id: '2',
        title: 'Annual Constitution Review Meeting',
        content: 'All members are invited to provide feedback on the proposed amendments to Article IV of the NIPA Governing Constitution before the next plenary session.',
        category: 'general' as const,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        id: '3',
        title: 'Emergency Security Briefing - October 20',
        content: 'Mandatory attendance for SEC 42-45 alumni. Topic: National Cybersecurity Strategy Implementation.',
        category: 'urgent' as const,
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000) // 2 days ago
    }
];

export const mockEvents = [
    {
        id: '1',
        title: 'National Strategy Plenary',
        description: 'Annual strategic planning session for all NIPA members.',
        date: new Date('2024-11-12'),
        location: 'Main Auditorium, Abuja',
        type: 'meeting' as const,
        registrationRequired: true,
        capacity: 500
    },
    {
        id: '2',
        title: 'NIPA Gala & Dinner',
        description: 'Annual fundraising gala and networking dinner.',
        date: new Date('2024-11-24'),
        location: 'Grand Hall, Lagos',
        type: 'gala' as const,
        registrationRequired: true,
        capacity: 300
    },
    {
        id: '3',
        title: 'Executive Election Day',
        description: 'Online voting for executive positions.',
        date: new Date('2024-12-05'),
        location: 'Online Portal Only',
        type: 'summit' as const,
        registrationRequired: false
    }
];

export const mockPayments = [
    {
        id: '1',
        memberId: '1',
        amount: 5000,
        description: 'Monthly Dues - September 2023',
        category: 'dues' as const,
        status: 'successful' as const,
        transactionDate: new Date('2023-10-12'),
        receiptUrl: '#'
    },
    {
        id: '2',
        memberId: '1',
        amount: 25000,
        description: 'Conference Registration - Lagos 2023',
        category: 'conference' as const,
        status: 'successful' as const,
        transactionDate: new Date('2023-09-05'),
        receiptUrl: '#'
    },
    {
        id: '3',
        memberId: '1',
        amount: 5000,
        description: 'Monthly Dues - August 2023',
        category: 'dues' as const,
        status: 'pending' as const,
        transactionDate: new Date('2023-08-30')
    }
];

export const mockBirthdayCelebrants = [
    {
        id: '1',
        memberId: '1',
        name: 'Adebayo Alade',
        birthDate: new Date('1975-05-14'),
        cohort: 'SEC 42, 2020',
        email: 'adebayo.alade@nipa.org',
        phone: '+234 803 123 4567',
        greetingStatus: 'pending' as const
    },
    {
        id: '2',
        memberId: '2',
        name: 'Chioma Nwachukwu',
        birthDate: new Date('1978-05-12'),
        cohort: 'SEC 38, 2016',
        email: 'chioma.nwachukwu@nipa.org',
        phone: '+234 805 234 5678',
        greetingStatus: 'sent' as const,
        greetingSentAt: new Date('2024-05-12')
    },
    {
        id: '3',
        memberId: '3',
        name: 'Musa Okoro',
        birthDate: new Date('1980-05-21'),
        cohort: 'SEC 45, 2023',
        email: 'musa.okoro@nipa.org',
        phone: '+234 807 345 6789',
        greetingStatus: 'upcoming' as const
    }
];
