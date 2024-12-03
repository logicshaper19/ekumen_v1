export type AIContext = 'parcel' | 'crop' | 'transformation' | 'task' | 'regulatory';

export interface ParcelContext {
  id: string;
  name: string;
  area: number;
  soilType: string;
  soilHealth: {
    ph: number;
    organicMatter: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  irrigation: {
    type: string;
    schedule: string;
    efficiency: number;
    lastMaintenance: string;
  };
  history: {
    year: number;
    crop: string;
    yield: number;
    issues?: string[];
  }[];
  recommendations?: {
    crops: string[];
    practices: string[];
    improvements: string[];
  };
}

export interface CropContext {
  id: string;
  name: string;
  variety: string;
  plantingPeriod: {
    start: string;
    end: string;
  };
  growthRequirements: {
    soilType: string[];
    ph: { min: number; max: number };
    temperature: { min: number; max: number };
    rainfall: { min: number; max: number };
  };
  management: {
    fertilization: string[];
    pestControl: string[];
    irrigation: string[];
  };
  marketData?: {
    price: number;
    demand: 'high' | 'medium' | 'low';
    trends: string[];
  };
}

export interface TransformationContext {
  id: string;
  title: string;
  objective: string;
  currentState: {
    practices: string[];
    challenges: string[];
    metrics: Record<string, number>;
  };
  targetState: {
    practices: string[];
    improvements: string[];
    metrics: Record<string, number>;
  };
  timeline: {
    phase: string;
    duration: string;
    activities: string[];
    milestones: string[];
  }[];
  impacts: {
    environmental: string[];
    economic: string[];
    social: string[];
  };
}

export interface TaskContext {
  id: string;
  title: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  assignee?: string;
  resources: {
    equipment: string[];
    materials: string[];
    labor: number;
  };
  dependencies: string[];
  progress: number;
  notes: string[];
}

export interface RegulatoryContext {
  id: string;
  category: string;
  requirements: {
    id: string;
    title: string;
    description: string;
    deadline: string;
    status: 'compliant' | 'non_compliant' | 'in_progress';
    documents: {
      type: string;
      status: 'missing' | 'incomplete' | 'complete';
      lastUpdate?: string;
    }[];
  }[];
  certifications: {
    name: string;
    status: 'active' | 'pending' | 'expired';
    validUntil?: string;
    requirements: string[];
  }[];
  compliance: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
}

export type AIContextData = 
  | { type: 'parcel'; data: ParcelContext }
  | { type: 'crop'; data: CropContext }
  | { type: 'transformation'; data: TransformationContext }
  | { type: 'task'; data: TaskContext }
  | { type: 'regulatory'; data: RegulatoryContext };
