export interface KPIData {
  year: number;
  ghgEmissions: number;      // tonnes CO2e/ha
  soilHealth: number;        // index 0-100
  soilQuality: number;       // index 0-100
  biodiversity: number;      // index 0-100
  waterUse: number;          // m3/ha
  energyConsumption: number; // kWh/ha
  profitability: number;     // €/ha
  laborHours: number;        // hours/ha
  inputCosts: number;        // €/ha
  yield: number;             // tonnes/ha
}

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
    baseline: KPIData[];
    optimized: KPIData[];
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
      { year: 2025, crop: "Trèfle", projectedYield: 4.2 },
      { year: 2026, crop: "Blé", projectedYield: 6.8 },
      { year: 2027, crop: "Maïs", projectedYield: 11.5 }
    ],
    kpiProjections: {
      baseline: [
        {
          year: 2022,
          ghgEmissions: 4.2,
          soilHealth: 65,
          soilQuality: 60,
          biodiversity: 58,
          waterUse: 2500,
          energyConsumption: 1200,
          profitability: 850,
          laborHours: 45,
          inputCosts: 600,
          yield: 7.5
        },
        {
          year: 2023,
          ghgEmissions: 4.5,
          soilHealth: 63,
          soilQuality: 62,
          biodiversity: 56,
          waterUse: 2600,
          energyConsumption: 1300,
          profitability: 820,
          laborHours: 48,
          inputCosts: 650,
          yield: 12.3
        },
        {
          year: 2024,
          ghgEmissions: 4.3,
          soilHealth: 62,
          soilQuality: 61,
          biodiversity: 55,
          waterUse: 2400,
          energyConsumption: 1250,
          profitability: 780,
          laborHours: 46,
          inputCosts: 630,
          yield: 0
        }
      ],
      optimized: [
        {
          year: 2025,
          ghgEmissions: 3.8,
          soilHealth: 68,
          soilQuality: 65,
          biodiversity: 62,
          waterUse: 2300,
          energyConsumption: 1100,
          profitability: 920,
          laborHours: 42,
          inputCosts: 550,
          yield: 4.2
        },
        {
          year: 2026,
          ghgEmissions: 3.2,
          soilHealth: 72,
          soilQuality: 70,
          biodiversity: 65,
          waterUse: 2100,
          energyConsumption: 1000,
          profitability: 980,
          laborHours: 40,
          inputCosts: 500,
          yield: 6.8
        },
        {
          year: 2027,
          ghgEmissions: 3.5,
          soilHealth: 75,
          soilQuality: 72,
          biodiversity: 68,
          waterUse: 2200,
          energyConsumption: 1050,
          profitability: 1050,
          laborHours: 41,
          inputCosts: 520,
          yield: 11.5
        }
      ]
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
      { year: 2025, crop: "Trèfle", projectedYield: 4.2 },
      { year: 2026, crop: "Blé", projectedYield: 6.8 },
      { year: 2027, crop: "Maïs", projectedYield: 11.5 }
    ],
    kpiProjections: {
      baseline: [
        {
          year: 2022,
          ghgEmissions: 4.2,
          soilHealth: 65,
          soilQuality: 60,
          biodiversity: 58,
          waterUse: 2500,
          energyConsumption: 1200,
          profitability: 850,
          laborHours: 45,
          inputCosts: 600,
          yield: 7.2
        },
        {
          year: 2023,
          ghgEmissions: 4.5,
          soilHealth: 63,
          soilQuality: 62,
          biodiversity: 56,
          waterUse: 2600,
          energyConsumption: 1300,
          profitability: 820,
          laborHours: 48,
          inputCosts: 650,
          yield: 11.8
        },
        {
          year: 2024,
          ghgEmissions: 4.3,
          soilHealth: 62,
          soilQuality: 61,
          biodiversity: 55,
          waterUse: 2400,
          energyConsumption: 1250,
          profitability: 780,
          laborHours: 46,
          inputCosts: 630,
          yield: 3.4
        }
      ],
      optimized: [
        {
          year: 2025,
          ghgEmissions: 3.8,
          soilHealth: 68,
          soilQuality: 65,
          biodiversity: 62,
          waterUse: 2300,
          energyConsumption: 1100,
          profitability: 920,
          laborHours: 42,
          inputCosts: 550,
          yield: 4.2
        },
        {
          year: 2026,
          ghgEmissions: 3.2,
          soilHealth: 72,
          soilQuality: 70,
          biodiversity: 65,
          waterUse: 2100,
          energyConsumption: 1000,
          profitability: 980,
          laborHours: 40,
          inputCosts: 500,
          yield: 6.8
        },
        {
          year: 2027,
          ghgEmissions: 3.5,
          soilHealth: 75,
          soilQuality: 72,
          biodiversity: 68,
          waterUse: 2200,
          energyConsumption: 1050,
          profitability: 1050,
          laborHours: 41,
          inputCosts: 520,
          yield: 11.5
        }
      ]
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
      { year: 2025, crop: "Trèfle", projectedYield: 4.2 },
      { year: 2026, crop: "Blé", projectedYield: 6.8 },
      { year: 2027, crop: "Maïs", projectedYield: 11.5 }
    ],
    kpiProjections: {
      baseline: [
        {
          year: 2022,
          ghgEmissions: 4.2,
          soilHealth: 65,
          soilQuality: 60,
          biodiversity: 58,
          waterUse: 2500,
          energyConsumption: 1200,
          profitability: 850,
          laborHours: 45,
          inputCosts: 600,
          yield: 7.0
        },
        {
          year: 2023,
          ghgEmissions: 4.5,
          soilHealth: 63,
          soilQuality: 62,
          biodiversity: 56,
          waterUse: 2600,
          energyConsumption: 1300,
          profitability: 820,
          laborHours: 48,
          inputCosts: 650,
          yield: 11.5
        },
        {
          year: 2024,
          ghgEmissions: 4.3,
          soilHealth: 62,
          soilQuality: 61,
          biodiversity: 55,
          waterUse: 2400,
          energyConsumption: 1250,
          profitability: 780,
          laborHours: 46,
          inputCosts: 630,
          yield: 3.2
        }
      ],
      optimized: [
        {
          year: 2025,
          ghgEmissions: 3.8,
          soilHealth: 68,
          soilQuality: 65,
          biodiversity: 62,
          waterUse: 2300,
          energyConsumption: 1100,
          profitability: 920,
          laborHours: 42,
          inputCosts: 550,
          yield: 4.2
        },
        {
          year: 2026,
          ghgEmissions: 3.2,
          soilHealth: 72,
          soilQuality: 70,
          biodiversity: 65,
          waterUse: 2100,
          energyConsumption: 1000,
          profitability: 980,
          laborHours: 40,
          inputCosts: 500,
          yield: 6.8
        },
        {
          year: 2027,
          ghgEmissions: 3.5,
          soilHealth: 75,
          soilQuality: 72,
          biodiversity: 68,
          waterUse: 2200,
          energyConsumption: 1050,
          profitability: 1050,
          laborHours: 41,
          inputCosts: 520,
          yield: 11.5
        }
      ]
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
      { year: 2025, crop: "Trèfle", projectedYield: 4.2 },
      { year: 2026, crop: "Blé", projectedYield: 6.8 },
      { year: 2027, crop: "Maïs", projectedYield: 11.5 }
    ],
    kpiProjections: {
      baseline: [
        {
          year: 2022,
          ghgEmissions: 4.2,
          soilHealth: 65,
          soilQuality: 60,
          biodiversity: 58,
          waterUse: 2500,
          energyConsumption: 1200,
          profitability: 850,
          laborHours: 45,
          inputCosts: 600,
          yield: 7.2
        },
        {
          year: 2023,
          ghgEmissions: 4.5,
          soilHealth: 63,
          soilQuality: 62,
          biodiversity: 56,
          waterUse: 2600,
          energyConsumption: 1300,
          profitability: 820,
          laborHours: 48,
          inputCosts: 650,
          yield: 11.5
        },
        {
          year: 2024,
          ghgEmissions: 4.3,
          soilHealth: 62,
          soilQuality: 61,
          biodiversity: 55,
          waterUse: 2400,
          energyConsumption: 1250,
          profitability: 780,
          laborHours: 46,
          inputCosts: 630,
          yield: 3.2
        }
      ],
      optimized: [
        {
          year: 2025,
          ghgEmissions: 3.8,
          soilHealth: 68,
          soilQuality: 65,
          biodiversity: 62,
          waterUse: 2300,
          energyConsumption: 1100,
          profitability: 920,
          laborHours: 42,
          inputCosts: 550,
          yield: 4.2
        },
        {
          year: 2026,
          ghgEmissions: 3.2,
          soilHealth: 72,
          soilQuality: 70,
          biodiversity: 65,
          waterUse: 2100,
          energyConsumption: 1000,
          profitability: 980,
          laborHours: 40,
          inputCosts: 500,
          yield: 6.8
        },
        {
          year: 2027,
          ghgEmissions: 3.5,
          soilHealth: 75,
          soilQuality: 72,
          biodiversity: 68,
          waterUse: 2200,
          energyConsumption: 1050,
          profitability: 1050,
          laborHours: 41,
          inputCosts: 520,
          yield: 11.5
        }
      ]
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
      { year: 2025, crop: "Trèfle", projectedYield: 4.2 },
      { year: 2026, crop: "Blé", projectedYield: 6.8 },
      { year: 2027, crop: "Maïs", projectedYield: 11.5 }
    ],
    kpiProjections: {
      baseline: [
        {
          year: 2022,
          ghgEmissions: 4.2,
          soilHealth: 65,
          soilQuality: 60,
          biodiversity: 58,
          waterUse: 2500,
          energyConsumption: 1200,
          profitability: 850,
          laborHours: 45,
          inputCosts: 600,
          yield: 7.0
        },
        {
          year: 2023,
          ghgEmissions: 4.5,
          soilHealth: 63,
          soilQuality: 62,
          biodiversity: 56,
          waterUse: 2600,
          energyConsumption: 1300,
          profitability: 820,
          laborHours: 48,
          inputCosts: 650,
          yield: 11.2
        },
        {
          year: 2024,
          ghgEmissions: 4.3,
          soilHealth: 62,
          soilQuality: 61,
          biodiversity: 55,
          waterUse: 2400,
          energyConsumption: 1250,
          profitability: 780,
          laborHours: 46,
          inputCosts: 630,
          yield: 3.1
        }
      ],
      optimized: [
        {
          year: 2025,
          ghgEmissions: 3.8,
          soilHealth: 68,
          soilQuality: 65,
          biodiversity: 62,
          waterUse: 2300,
          energyConsumption: 1100,
          profitability: 920,
          laborHours: 42,
          inputCosts: 550,
          yield: 4.2
        },
        {
          year: 2026,
          ghgEmissions: 3.2,
          soilHealth: 72,
          soilQuality: 70,
          biodiversity: 65,
          waterUse: 2100,
          energyConsumption: 1000,
          profitability: 980,
          laborHours: 40,
          inputCosts: 500,
          yield: 6.8
        },
        {
          year: 2027,
          ghgEmissions: 3.5,
          soilHealth: 75,
          soilQuality: 72,
          biodiversity: 68,
          waterUse: 2200,
          energyConsumption: 1050,
          profitability: 1050,
          laborHours: 41,
          inputCosts: 520,
          yield: 11.5
        }
      ]
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
      { year: 2025, crop: "Trèfle", projectedYield: 4.2 },
      { year: 2026, crop: "Blé", projectedYield: 6.8 },
      { year: 2027, crop: "Maïs", projectedYield: 11.5 }
    ],
    kpiProjections: {
      baseline: [
        {
          year: 2022,
          ghgEmissions: 4.2,
          soilHealth: 65,
          soilQuality: 60,
          biodiversity: 58,
          waterUse: 2500,
          energyConsumption: 1200,
          profitability: 850,
          laborHours: 45,
          inputCosts: 600,
          yield: 11.8
        },
        {
          year: 2023,
          ghgEmissions: 4.5,
          soilHealth: 63,
          soilQuality: 62,
          biodiversity: 56,
          waterUse: 2600,
          energyConsumption: 1300,
          profitability: 820,
          laborHours: 48,
          inputCosts: 650,
          yield: 3.4
        },
        {
          year: 2024,
          ghgEmissions: 4.3,
          soilHealth: 62,
          soilQuality: 61,
          biodiversity: 55,
          waterUse: 2400,
          energyConsumption: 1250,
          profitability: 780,
          laborHours: 46,
          inputCosts: 630,
          yield: 7.1
        }
      ],
      optimized: [
        {
          year: 2025,
          ghgEmissions: 3.8,
          soilHealth: 68,
          soilQuality: 65,
          biodiversity: 62,
          waterUse: 2300,
          energyConsumption: 1100,
          profitability: 920,
          laborHours: 42,
          inputCosts: 550,
          yield: 4.2
        },
        {
          year: 2026,
          ghgEmissions: 3.2,
          soilHealth: 72,
          soilQuality: 70,
          biodiversity: 65,
          waterUse: 2100,
          energyConsumption: 1000,
          profitability: 980,
          laborHours: 40,
          inputCosts: 500,
          yield: 6.8
        },
        {
          year: 2027,
          ghgEmissions: 3.5,
          soilHealth: 75,
          soilQuality: 72,
          biodiversity: 68,
          waterUse: 2200,
          energyConsumption: 1050,
          profitability: 1050,
          laborHours: 41,
          inputCosts: 520,
          yield: 11.5
        }
      ]
    },
    objective: "Augmenter la biodiversité de la ferme et le contrôle naturel des ravageurs",
    notes: "Création de corridors fauniques et d'habitats pour insectes bénéfiques",
    documentUrl: "/docs/biodiversity-plan.pdf",
    lastDiscussionDate: "2024-03-18",
    shareUrl: "/share/t6"
  }
];