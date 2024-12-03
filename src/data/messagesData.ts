interface Message {
  id: string;
  partnerId: string;
  sender: {
    name: string;
    email: string;
    company: string;
  };
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isUrgent: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
  summary?: string;
}

export const messages: Message[] = [
  {
    id: 'm1',
    partnerId: '1',
    sender: {
      name: 'Jean Dupont',
      email: 'j.dupont@creditagricole.fr',
      company: 'Crédit Agricole'
    },
    subject: 'Examen de la demande de prêt',
    content: 'Votre demande de prêt de transformation agricole a été examinée. Nous avons besoin d\'une documentation supplémentaire pour l\'évaluation de la qualité du sol.',
    timestamp: '2024-03-20T14:30:00',
    isRead: false,
    isUrgent: true,
    summary: 'Documentation supplémentaire nécessaire pour la demande de prêt',
    attachments: [
      {
        name: 'exigences_pret.pdf',
        url: '/docs/exigences_pret.pdf',
        type: 'PDF',
        size: '2,4 Mo'
      }
    ]
  },
  {
    id: 'm2',
    partnerId: '2',
    sender: {
      name: 'Marie Laurent',
      email: 'm.laurent@chambagri.fr',
      company: 'Chambre d\'Agriculture'
    },
    subject: 'Mise à jour de la certification biologique',
    content: 'Derniers résultats d\'inspection pour le processus de certification biologique. Veuillez examiner le rapport ci-joint.',
    timestamp: '2024-03-19T09:15:00',
    isRead: true,
    isUrgent: false,
    summary: 'Résultats de l\'inspection de certification biologique',
    attachments: [
      {
        name: 'rapport_inspection_mars2024.pdf',
        url: '/docs/rapport_inspection_mars2024.pdf',
        type: 'PDF',
        size: '3,1 Mo'
      }
    ]
  }
];

export type { Message };