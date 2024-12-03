export interface Partner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  company: string;
  phone: string;
  website: string;
  status: 'active' | 'inactive' | 'new';
  joinDate: string;
  emailSync: {
    lastSync: string;
    status: 'success' | 'error' | 'pending';
    unreadCount?: number;
  };
}

export interface Message {
  id: string;
  partnerId: string;
  content: string;
  timestamp: string;
  source?: 'email' | 'chat';
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export const partners: Partner[] = [
  {
    id: 'p1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'j.dupont@creditagricole.fr',
    title: 'Agricultural Finance Advisor',
    company: 'Crédit Agricole',
    phone: '+33 1 23 45 67 89',
    website: 'www.credit-agricole.fr',
    status: 'active',
    joinDate: '2023-01-15',
    emailSync: {
      lastSync: '2024-03-20T09:45:00',
      status: 'success',
      unreadCount: 2
    }
  },
  {
    id: 'p2',
    firstName: 'Marie',
    lastName: 'Laurent',
    email: 'm.laurent@chambagri.fr',
    title: 'Agricultural Advisor',
    company: "Chambre d'Agriculture",
    phone: '+33 1 34 56 78 90',
    website: 'www.chambres-agriculture.fr',
    status: 'new',
    joinDate: '2024-02-28',
    emailSync: {
      lastSync: '2024-03-20T10:00:00',
      status: 'success',
      unreadCount: 0
    }
  },
  {
    id: 'p3',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'p.martin@groupama.fr',
    title: 'Agricultural Risk Manager',
    company: 'Groupama',
    phone: '+33 1 45 67 89 01',
    website: 'www.groupama.fr',
    status: 'inactive',
    joinDate: '2022-06-10',
    emailSync: {
      lastSync: '2024-03-19T15:30:00',
      status: 'error'
    }
  }
];

export const messages: Message[] = [
  {
    id: 'm1',
    partnerId: 'p1',
    content: 'Latest soil analysis shows improved nitrogen levels. Recommend adjusting fertilizer application schedule.',
    timestamp: '2024-03-15T10:30:00',
    source: 'email',
    attachments: [
      {
        name: 'soil_analysis_march2024.pdf',
        url: '/docs/soil_analysis_march2024.pdf',
        type: 'PDF'
      }
    ]
  },
  {
    id: 'm2',
    partnerId: 'p2',
    content: 'New cooperative guidelines for organic certification process.',
    timestamp: '2024-03-10T14:45:00',
    source: 'email',
    attachments: [
      {
        name: 'organic_guidelines_2024.pdf',
        url: '/docs/organic_guidelines_2024.pdf',
        type: 'PDF'
      }
    ]
  }
];