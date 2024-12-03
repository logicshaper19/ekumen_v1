export interface CropRotationOptimization {
  id: string;
  title: string;
  status: 'approved' | 'under_review' | 'rejected';
  partnerStatus?: {
    partner: string;
    organization: string;
    status: 'pending' | 'approved' | 'rejected';
    lastUpdate: string;
    feedback?: string;
  };
  parcels: string[];
  currentRotation: {
    year: number;
    crop: string;
    yield?: number;
  }[];
  optimizedRotation: {
    year: number;
    crop: string;
    projectedYield?: number;
  }[];
  kpiProjections: {
    baseline: any[];
    optimized: any[];
  };
  objective: string;
  notes: string;
  documentUrl: string;
  lastDiscussionDate: string;
  shareUrl: string;
}

export const transformations: CropRotationOptimization[] = [
  {
    id: "t1",
    status: "approved",
    title: "Processus de certification biologique",
    parcels: ["p1", "p2"],
    currentRotation: [
      { year: 2022, crop: "Blé", yield: 7.5 },
      { year: 2023, crop: "Maïs", yield: 12.3 },
      { year: 2024, crop: "Soja" }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Blé", projectedYield: 7.8 },
      { year: 2023, crop: "Maïs", projectedYield: 12.8 },
      { year: 2024, crop: "Soja", projectedYield: 3.8 },
      { year: 2025, crop: "Trèfle", projectedYield: 4.2 },
      { year: 2026, crop: "Blé", projectedYield: 6.8 },
      { year: 2027, crop: "Maïs", projectedYield: 11.5 },
      { year: 2028, crop: "Soja", projectedYield: 3.9 },
      { year: 2029, crop: "Trèfle", projectedYield: 4.3 },
      { year: 2030, crop: "Blé", projectedYield: 7.0 },
      { year: 2031, crop: "Maïs", projectedYield: 11.8 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Obtenir la certification biologique pour toutes les parcelles d'ici 2025",
    notes: "Tests de sol initiaux terminés. Période de transition commencée.",
    documentUrl: "/docs/organic-certification-plan.pdf",
    lastDiscussionDate: "2024-03-15",
    shareUrl: "/share/t1"
  },
  {
    id: "t2",
    status: "under_review",
    partnerStatus: {
      partner: "Jean Dupont",
      organization: "Crédit Agricole",
      status: "pending",
      lastUpdate: "2024-03-15"
    },
    title: "Amélioration de la santé des sols",
    parcels: ["p1", "p2"],
    currentRotation: [
      { year: 2022, crop: "Blé", yield: 7.2 },
      { year: 2023, crop: "Maïs", yield: 11.8 },
      { year: 2024, crop: "Soja", yield: 3.4 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Blé", projectedYield: 7.8 },
      { year: 2023, crop: "Maïs", projectedYield: 12.5 },
      { year: 2024, crop: "Soja", projectedYield: 3.9 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Améliorer la structure du sol et la teneur en matière organique",
    notes: "Mise en place du travail réduit du sol et des cultures de couverture",
    documentUrl: "/docs/soil-health-plan.pdf",
    lastDiscussionDate: "2024-03-18",
    shareUrl: "/share/t2"
  },
  {
    id: "t3",
    status: "under_review",
    partnerStatus: {
      partner: "Marie Laurent",
      organization: "Chambre d'Agriculture",
      status: "rejected",
      feedback: "Besoin de plus de détails sur les mesures de conservation de l'eau",
      lastUpdate: "2024-03-18"
    },
    title: "Optimisation de la gestion de l'eau",
    parcels: ["p1"],
    currentRotation: [
      { year: 2022, crop: "Blé", yield: 7.0 },
      { year: 2023, crop: "Maïs", yield: 11.5 },
      { year: 2024, crop: "Soja", yield: 3.2 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Blé", projectedYield: 7.5 },
      { year: 2023, crop: "Maïs", projectedYield: 12.0 },
      { year: 2024, crop: "Soja", projectedYield: 3.6 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Optimiser l'efficacité de l'irrigation et l'utilisation de l'eau",
    notes: "Installation de capteurs de humidité du sol et de systèmes d'irrigation intelligents",
    documentUrl: "/docs/water-management-plan.pdf",
    lastDiscussionDate: "2024-03-16",
    shareUrl: "/share/t3"
  },
  {
    id: "t4",
    status: "approved",
    title: "Mise en place de l'agriculture de précision",
    parcels: ["p1", "p2"],
    currentRotation: [
      { year: 2022, crop: "Blé", yield: 7.2 },
      { year: 2023, crop: "Maïs", yield: 11.5 },
      { year: 2024, crop: "Soja", yield: 3.2 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Blé", projectedYield: 7.8 },
      { year: 2023, crop: "Maïs", projectedYield: 12.2 },
      { year: 2024, crop: "Soja", projectedYield: 3.6 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Optimiser les ressources avec la technologie de l'agriculture de précision",
    notes: "Intégration de capteurs de sol, de guidage GPS et d'application à débit variable",
    documentUrl: "/docs/precision-ag-plan.pdf",
    lastDiscussionDate: "2024-03-19",
    shareUrl: "/share/t4"
  },
  {
    id: "t5",
    status: "approved",
    title: "Programme de séquestration du carbone",
    parcels: ["p1"],
    currentRotation: [
      { year: 2022, crop: "Blé", yield: 7.0 },
      { year: 2023, crop: "Maïs", yield: 11.2 },
      { year: 2024, crop: "Soja", yield: 3.1 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Blé", projectedYield: 7.4 },
      { year: 2023, crop: "Cultures de couverture", projectedYield: 0 },
      { year: 2024, crop: "Soja", projectedYield: 3.4 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Améliorer le stockage du carbone dans le sol grâce à des pratiques modifiées",
    notes: "Mise en place de cultures de couverture et de pratiques de travail réduit du sol",
    documentUrl: "/docs/carbon-program.pdf",
    lastDiscussionDate: "2024-03-20",
    shareUrl: "/share/t5"
  },
  {
    id: "t6",
    status: "approved",
    title: "Amélioration de la biodiversité",
    parcels: ["p2"],
    currentRotation: [
      { year: 2022, crop: "Maïs", yield: 11.8 },
      { year: 2023, crop: "Soja", yield: 3.4 },
      { year: 2024, crop: "Blé", yield: 7.1 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Maïs", projectedYield: 12.0 },
      { year: 2023, crop: "Cultures de couverture mixtes", projectedYield: 0 },
      { year: 2024, crop: "Blé", projectedYield: 7.5 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Augmenter la biodiversité de la ferme et le contrôle naturel des ravageurs",
    notes: "Création de corridors fauniques et d'habitats pour insectes bénéfiques",
    documentUrl: "/docs/biodiversity-plan.pdf",
    lastDiscussionDate: "2024-03-18",
    shareUrl: "/share/t6"
  }
];