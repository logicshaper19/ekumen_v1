export interface Document {
  id: string;
  name: string;
  uploadDate: string;
  type: string;
  size: string;
  downloadUrl: string;
}

export const documents: Document[] = [
  {
    id: "doc1",
    name: "Soil Analysis Report - North Field",
    uploadDate: "2024-03-15",
    type: "PDF",
    size: "2.4 MB",
    downloadUrl: "/docs/soil-analysis-north.pdf"
  },
  {
    id: "doc2",
    name: "Irrigation System Specifications",
    uploadDate: "2024-03-10",
    type: "PDF",
    size: "1.8 MB",
    downloadUrl: "/docs/irrigation-specs.pdf"
  },
  {
    id: "doc3",
    name: "Crop Rotation Plan 2024-2025",
    uploadDate: "2024-03-05",
    type: "XLSX",
    size: "856 KB",
    downloadUrl: "/docs/rotation-plan.xlsx"
  },
  {
    id: "doc4",
    name: "Fertilizer Application Schedule",
    uploadDate: "2024-03-01",
    type: "PDF",
    size: "1.2 MB",
    downloadUrl: "/docs/fertilizer-schedule.pdf"
  }
];

export const documentStats = {
  totalDocuments: 27,
  recentUploads: 4,
  documentsByType: {
    PDF: 18,
    XLSX: 6,
    DOC: 3
  },
  uploadTrend: [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 4 }
  ]
};