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
    subject: 'Loan Application Review',
    content: 'Your farm transformation loan application has been reviewed. We need additional documentation for soil quality assessment.',
    timestamp: '2024-03-20T14:30:00',
    isRead: false,
    isUrgent: true,
    summary: 'Additional documentation needed for loan application',
    attachments: [
      {
        name: 'loan_requirements.pdf',
        url: '/docs/loan_requirements.pdf',
        type: 'PDF',
        size: '2.4 MB'
      }
    ]
  },
  {
    id: 'm2',
    partnerId: '2',
    sender: {
      name: 'Marie Laurent',
      email: 'm.laurent@chambagri.fr',
      company: "Chambre d'Agriculture"
    },
    subject: 'Organic Certification Update',
    content: 'Latest inspection results for organic certification process. Please review the attached report.',
    timestamp: '2024-03-19T09:15:00',
    isRead: true,
    isUrgent: false,
    summary: 'Organic certification inspection results',
    attachments: [
      {
        name: 'inspection_report_march2024.pdf',
        url: '/docs/inspection_report_march2024.pdf',
        type: 'PDF',
        size: '3.1 MB'
      }
    ]
  }
];