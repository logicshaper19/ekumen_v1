export interface RegulatoryDocument {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'en_attente' | 'en_cours' | 'termine';
  completionRate: number;
  category: 'environnement' | 'securite' | 'certification' | 'financier';
  requirements: {
    id: string;
    title: string;
    completed: boolean;
    description?: string;
    dataGaps?: {
      missing: string;
      source: string;
      howToObtain: string;
    }[];
  }[];
}

export const regulatoryDocuments: RegulatoryDocument[] = [
  {
    id: "reg1",
    title: "Évaluation d'impact environnemental",
    description: "Évaluation annuelle d'impact environnemental requise pour les exploitations de plus de 20 hectares",
    dueDate: "2024-06-30",
    status: "en_cours",
    completionRate: 65,
    category: "environnement",
    requirements: [
      {
        id: "r1",
        title: "Rapport d'analyse des sols",
        completed: true,
        description: "Analyse complète de la composition et de la contamination des sols"
      },
      {
        id: "r2",
        title: "Documentation sur l'utilisation de l'eau",
        completed: true,
        description: "Métriques annuelles de consommation d'eau et d'efficacité d'irrigation"
      },
      {
        id: "r3",
        title: "Étude d'impact sur la biodiversité",
        completed: false,
        description: "Évaluation de l'impact de l'exploitation sur la flore et la faune locales",
        dataGaps: [
          {
            missing: "Inventaire des espèces",
            source: "Relevés de terrain",
            howToObtain: "Réaliser des relevés saisonniers de la faune avec un écologue certifié"
          },
          {
            missing: "Cartographie des habitats",
            source: "Données SIG",
            howToObtain: "Utiliser l'imagerie satellite et la vérification terrain pour cartographier les types d'habitats"
          }
        ]
      }
    ]
  },
  {
    id: "reg2",
    title: "Renouvellement de la certification biologique",
    description: "Renouvellement annuel de la certification agriculture biologique",
    dueDate: "2024-08-15",
    status: "en_attente",
    completionRate: 30,
    category: "certification",
    requirements: [
      {
        id: "r4",
        title: "Registres de rotation des cultures",
        completed: true,
        description: "Documentation des pratiques de rotation des cultures"
      },
      {
        id: "r5",
        title: "Registres d'utilisation des intrants",
        completed: false,
        description: "Registres de tous les fertilisants et méthodes de lutte contre les ravageurs",
        dataGaps: [
          {
            missing: "Taux d'application",
            source: "Registres de terrain",
            howToObtain: "Examiner les registres de calibration du pulvérisateur et les registres d'application"
          },
          {
            missing: "Certificats des produits",
            source: "Fournisseurs",
            howToObtain: "Contacter les fournisseurs pour la documentation de certification biologique"
          }
        ]
      },
      {
        id: "r6",
        title: "Vérification des zones tampons",
        completed: false,
        description: "Preuve du maintien des zones tampons entre les champs biologiques et conventionnels"
      }
    ]
  },
  {
    id: "reg3",
    title: "Rapport de conformité sécurité",
    description: "Documentation sur la sécurité au travail et la maintenance des équipements",
    dueDate: "2024-05-01",
    status: "termine",
    completionRate: 100,
    category: "securite",
    requirements: [
      {
        id: "r7",
        title: "Registres d'inspection des équipements",
        completed: true,
        description: "Inspection annuelle de sécurité de tous les équipements agricoles"
      },
      {
        id: "r8",
        title: "Registres de formation à la sécurité",
        completed: true,
        description: "Documentation des sessions de formation à la sécurité complétées"
      }
    ]
  }
];