export interface DocumentSuggestion {
  id: string;
  title: string;
  description: string;
  steps: string[];
  documentType: string;
}

export const auditReportSuggestions: DocumentSuggestion[] = [
  {
    id: 'audit1',
    title: 'Soil Quality Assessment Report',
    description: 'Generate a comprehensive soil quality assessment report',
    documentType: 'audit',
    steps: [
      'Collect recent soil test results',
      'Document fertilizer application history',
      'Record crop rotation patterns',
      'Include soil structure analysis',
      'Add recommendations for improvement'
    ]
  },
  {
    id: 'audit2',
    title: 'Environmental Impact Report',
    description: 'Create an environmental impact assessment report',
    documentType: 'audit',
    steps: [
      'Gather water usage data',
      'Document biodiversity measures',
      'Record emissions data',
      'Include sustainability practices',
      'Add improvement targets'
    ]
  }
];

export const documentOrganizationSuggestions: DocumentSuggestion[] = [
  {
    id: 'org1',
    title: 'Seasonal Planning Documents',
    description: 'Organize documents by growing season',
    documentType: 'my-docs',
    steps: [
      'Create seasonal folders',
      'Sort by crop type',
      'Tag with relevant dates',
      'Link related documents',
      'Archive previous seasons'
    ]
  }
];