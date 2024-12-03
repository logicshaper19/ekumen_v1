interface CropRotation {
  year: number;
  crop: string;
  yield?: number;
  planned?: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: 'pending' | 'in-progress' | 'paused' | 'completed';
  priority: 'high' | 'medium' | 'low';
  type: 'maintenance' | 'planting' | 'harvesting' | 'fertilization' | 'irrigation' | 'soil_preparation' | 'pesticide';
  parcelId?: string;
  cropId?: string;
  timing?: {
    startTime?: string;
    endTime?: string;
    duration?: number;
    pausedAt?: string;
  };
  measurements?: {
    quantity?: number;
    unit?: string;
    notes?: string;
  };
  dependencies?: string[];
  updates?: {
    timestamp: string;
    content: string;
    type: 'start' | 'pause' | 'resume' | 'complete' | 'note';
  }[];
}

interface Parcel {
  id: string;
  name: string;
  acreage: number;
  location: {
    latitude: number;
    longitude: number;
    region: string;
  };
  soilData: {
    type: string;
    ph: number;
    organicMatter: number;
    lastTested: string;
    moisture?: number;
    nitrogen?: number;
    phosphorus?: number;
    potassium?: number;
  };
  irrigation: {
    type: string;
    lastMaintenance: string;
    schedule: string;
    waterUsage?: number;
    efficiency?: number;
  };
  weather?: {
    lastUpdated: string;
    temperature: number;
    humidity: number;
    rainfall: number;
  };
  lastAnalysis?: string;
  cropRotation: CropRotation[];
  discussions: Discussion[];
  activities: {
    id: string;
    date: string;
    type: 'fertilizer' | 'pesticide' | 'irrigation' | 'soil_work' | 'harvest';
    details: string;
    measurements?: {
      quantity: number;
      unit: string;
    };
    notes?: string;
  }[];
}

interface Crop {
  id: string;
  name: string;
  variety: string;
  certifications: string[];
  plantingWindow: {
    start: string;
    end: string;
  };
  totalAcreage: number;
  parcels: {
    parcelId: string;
    parcelName: string;
    acreage: number;
    expectedYield: number;
  }[];
}

interface Discussion {
  id: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
}

export const parcels: Parcel[] = [
  {
    id: "p1",
    name: "Parcelle Nord",
    acreage: 25,
    location: {
      latitude: 49.1834,
      longitude: 0.3714,
      region: "Normandie"
    },
    soilData: {
      type: "Limon argileux",
      ph: 6.8,
      organicMatter: 3.2,
      lastTested: "2024-02-15"
    },
    irrigation: {
      type: "Sprinkler",
      lastMaintenance: "2024-03-01",
      schedule: "Weekly"
    },
    cropRotation: [
      { year: 2022, crop: "Wheat", yield: 7.5 },
      { year: 2023, crop: "Corn", yield: 12.3 },
      { year: 2024, crop: "Soybeans", planned: true },
      { year: 2025, crop: "Wheat", planned: true }
    ],
    discussions: [],
    activities: []
  },
  {
    id: "p2",
    name: "Parcelle Sud",
    acreage: 30,
    location: {
      latitude: 49.1812,
      longitude: 0.3698,
      region: "Normandie"
    },
    soilData: {
      type: "Limon sableux",
      ph: 7.1,
      organicMatter: 2.8,
      lastTested: "2024-02-15"
    },
    irrigation: {
      type: "Drip",
      lastMaintenance: "2024-03-05",
      schedule: "Daily"
    },
    cropRotation: [
      { year: 2022, crop: "Corn", yield: 11.8 },
      { year: 2023, crop: "Soybeans", yield: 3.4 },
      { year: 2024, crop: "Wheat", planned: true },
      { year: 2025, crop: "Corn", planned: true }
    ],
    discussions: [],
    activities: []
  }
];

export const crops: Crop[] = [
  {
    id: "c1",
    name: "Wheat",
    variety: "Winter Wheat",
    certifications: [],
    plantingWindow: {
      start: "2024-09-15",
      end: "2024-10-15"
    },
    totalAcreage: 25,
    parcels: [
      { parcelId: "p1", parcelName: "North Field", acreage: 25, expectedYield: 7.5 }
    ]
  },
  {
    id: "c2",
    name: "Corn",
    variety: "Silage Corn",
    certifications: [],
    plantingWindow: {
      start: "2024-04-15",
      end: "2024-05-15"
    },
    totalAcreage: 30,
    parcels: [
      { parcelId: "p2", parcelName: "South Field", acreage: 30, expectedYield: 12.0 }
    ]
  }
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Soil Analysis - North Field",
    description: "Conduct comprehensive soil analysis before spring planting",
    startDate: "2024-04-01",
    startTime: "09:00",
    endDate: "2024-04-01", 
    endTime: "17:00",
    status: "pending",
    priority: "high",
    type: "maintenance",
    parcelId: "p1"
  },
  {
    id: "t2",
    title: "Spring Wheat Planting",
    description: "Begin planting spring wheat variety according to rotation plan",
    startDate: "2024-04-15",
    startTime: "08:00",
    endDate: "2024-04-17",
    endTime: "18:00",
    status: "pending",
    priority: "high",
    type: "planting",
    parcelId: "p2",
    cropId: "c1"
  },
  {
    id: "t3",
    title: "Irrigation System Maintenance",
    description: "Check and repair irrigation system before growing season",
    startDate: "2024-04-02",
    startTime: "10:00",
    endDate: "2024-04-02",
    endTime: "16:00",
    status: "in-progress",
    priority: "medium",
    type: "maintenance",
    parcelId: "p1"
  },
  {
    id: "t4",
    title: "Fertilizer Application",
    description: "Apply pre-planting fertilizer to South Field",
    startDate: "2024-04-03",
    startTime: "07:00",
    endDate: "2024-04-03",
    endTime: "15:00",
    status: "pending",
    priority: "medium",
    type: "fertilization",
    parcelId: "p2"
  },
  {
    id: "t5",
    title: "Equipment Inspection",
    description: "Inspect and prepare planting equipment",
    startDate: "2024-04-05",
    startTime: "09:00",
    endDate: "2024-04-05",
    endTime: "12:00",
    status: "pending",
    priority: "low",
    type: "maintenance"
  }
];
