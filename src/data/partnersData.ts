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
    title: 'Conseiller en Financement Agricole',
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
    title: 'Conseillère Agricole',
    company: 'Chambre d\'Agriculture',
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
    title: 'Gestionnaire des Risques Agricoles',
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
    content: 'La dernière analyse du sol montre une amélioration des niveaux d\'azote. Nous recommandons d\'ajuster le calendrier d\'application des engrais.',
    timestamp: '2024-03-15T10:30:00',
    source: 'email',
    attachments: [
      {
        name: 'analyse_sol_mars2024.pdf',
        url: '/docs/analyse_sol_mars2024.pdf',
        type: 'PDF'
      }
    ]
  }
];

export type { Message, Partner };