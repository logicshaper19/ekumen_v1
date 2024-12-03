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
    title: "Organic Certification Process",
    parcels: ["p1", "p2"],
    currentRotation: [
      { year: 2022, crop: "Wheat", yield: 7.5 },
      { year: 2023, crop: "Corn", yield: 12.3 },
      { year: 2024, crop: "Soybeans" }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Wheat", projectedYield: 7.8 },
      { year: 2023, crop: "Corn", projectedYield: 12.8 },
      { year: 2024, crop: "Soybeans", projectedYield: 3.8 },
      { year: 2025, crop: "Clover", projectedYield: 4.2 },
      { year: 2026, crop: "Wheat", projectedYield: 6.8 },
      { year: 2027, crop: "Corn", projectedYield: 11.5 },
      { year: 2028, crop: "Soybeans", projectedYield: 3.9 },
      { year: 2029, crop: "Clover", projectedYield: 4.3 },
      { year: 2030, crop: "Wheat", projectedYield: 7.0 },
      { year: 2031, crop: "Corn", projectedYield: 11.8 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Achieve organic certification for all fields by 2025",
    notes: "Initial soil tests completed. Transition period started.",
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
    title: "Soil Health Enhancement",
    parcels: ["p1", "p2"],
    currentRotation: [
      { year: 2022, crop: "Wheat", yield: 7.2 },
      { year: 2023, crop: "Corn", yield: 11.8 },
      { year: 2024, crop: "Soybeans", yield: 3.4 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Wheat", projectedYield: 7.8 },
      { year: 2023, crop: "Corn", projectedYield: 12.5 },
      { year: 2024, crop: "Soybeans", projectedYield: 3.9 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Improve soil structure and organic matter content",
    notes: "Implementation of reduced tillage and cover crops",
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
      feedback: "Need more details on water conservation measures",
      lastUpdate: "2024-03-18"
    },
    title: "Water Management Optimization",
    parcels: ["p1"],
    currentRotation: [
      { year: 2022, crop: "Wheat", yield: 7.0 },
      { year: 2023, crop: "Corn", yield: 11.5 },
      { year: 2024, crop: "Soybeans", yield: 3.2 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Wheat", projectedYield: 7.5 },
      { year: 2023, crop: "Corn", projectedYield: 12.0 },
      { year: 2024, crop: "Soybeans", projectedYield: 3.6 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Optimize irrigation efficiency and water usage",
    notes: "Installation of soil moisture sensors and smart irrigation controls",
    documentUrl: "/docs/water-management-plan.pdf",
    lastDiscussionDate: "2024-03-16",
    shareUrl: "/share/t3"
  },
  {
    id: "t4",
    status: "approved",
    title: "Smart Farming Setup",
    parcels: ["p1", "p2"],
    currentRotation: [
      { year: 2022, crop: "Wheat", yield: 7.2 },
      { year: 2023, crop: "Corn", yield: 11.5 },
      { year: 2024, crop: "Soybeans", yield: 3.2 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Wheat", projectedYield: 7.8 },
      { year: 2023, crop: "Corn", projectedYield: 12.2 },
      { year: 2024, crop: "Soybeans", projectedYield: 3.6 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Optimize resources with smart farming tech",
    notes: "Integration of soil sensors, GPS guidance, and variable rate application",
    documentUrl: "/docs/precision-ag-plan.pdf",
    lastDiscussionDate: "2024-03-19",
    shareUrl: "/share/t4"
  },
  {
    id: "t5",
    status: "approved",
    title: "Carbon Sequestration Program",
    parcels: ["p1"],
    currentRotation: [
      { year: 2022, crop: "Wheat", yield: 7.0 },
      { year: 2023, crop: "Corn", yield: 11.2 },
      { year: 2024, crop: "Soybeans", yield: 3.1 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Wheat", projectedYield: 7.4 },
      { year: 2023, crop: "Cover Crops", projectedYield: 0 },
      { year: 2024, crop: "Soybeans", projectedYield: 3.4 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Enhance soil carbon storage through modified practices",
    notes: "Implementation of cover crops and reduced tillage practices",
    documentUrl: "/docs/carbon-program.pdf",
    lastDiscussionDate: "2024-03-20",
    shareUrl: "/share/t5"
  },
  {
    id: "t6",
    status: "approved",
    title: "Biodiversity Enhancement",
    parcels: ["p2"],
    currentRotation: [
      { year: 2022, crop: "Corn", yield: 11.8 },
      { year: 2023, crop: "Soybeans", yield: 3.4 },
      { year: 2024, crop: "Wheat", yield: 7.1 }
    ],
    optimizedRotation: [
      { year: 2022, crop: "Corn", projectedYield: 12.0 },
      { year: 2023, crop: "Mixed Cover", projectedYield: 0 },
      { year: 2024, crop: "Wheat", projectedYield: 7.5 }
    ],
    kpiProjections: {
      baseline: [],
      optimized: []
    },
    objective: "Increase farm biodiversity and natural pest control",
    notes: "Creation of wildlife corridors and beneficial insect habitats",
    documentUrl: "/docs/biodiversity-plan.pdf",
    lastDiscussionDate: "2024-03-18",
    shareUrl: "/share/t6"
  }
];