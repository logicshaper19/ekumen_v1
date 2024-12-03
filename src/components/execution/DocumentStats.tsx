import { FileText, Upload, PieChart } from 'lucide-react';
import { documentStats } from '../../data/executionData';
import MetricCard from '../MetricCard';

export default function DocumentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard
        title="Total Documents"
        value={documentStats.totalDocuments}
        icon={<FileText className="h-6 w-6 text-indigo-600" />}
      />
      <MetricCard
        title="Recent Uploads"
        value={documentStats.recentUploads}
        icon={<Upload className="h-6 w-6 text-indigo-600" />}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="Document Types"
        value={Object.keys(documentStats.documentsByType).length}
        icon={<PieChart className="h-6 w-6 text-indigo-600" />}
      />
    </div>
  );
}