export interface WaterOptimizationPlan {
  id: string;
  title: string;
  description: string;
  estimatedSavings: string;
  implementation: string[];
  roi: string;
  partnerType: 'bank' | 'chamber';
}

export const waterOptimizationPlans: WaterOptimizationPlan[] = [
  {
    id: 'w1',
    title: 'Smart Irrigation System',
    description: 'Install precision irrigation system with soil moisture sensors',
    estimatedSavings: '30-40% water reduction',
    implementation: [
      'Install soil moisture sensors',
      'Deploy smart irrigation controllers',
      'Implement weather-based scheduling',
      'Train staff on new system'
    ],
    roi: '2-3 years',
    partnerType: 'bank'
  },
  {
    id: 'w2',
    title: 'Drought-Resistant Crop Rotation',
    description: 'Introduce drought-resistant varieties in rotation',
    estimatedSavings: '20-25% water reduction',
    implementation: [
      'Select appropriate drought-resistant varieties',
      'Adjust planting schedule',
      'Monitor soil moisture levels',
      'Evaluate crop performance'
    ],
    roi: '1-2 years',
    partnerType: 'chamber'
  },
  {
    id: 'w3',
    title: 'Water Recovery System',
    description: 'Implement water collection and recycling system',
    estimatedSavings: '15-20% water reduction',
    implementation: [
      'Install collection basins',
      'Set up filtration system',
      'Connect to irrigation network',
      'Regular maintenance schedule'
    ],
    roi: '3-4 years',
    partnerType: 'bank'
  }
];