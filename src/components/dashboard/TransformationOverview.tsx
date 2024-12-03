import { Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';
import { transformations } from '../../data/transformationData';

export default function TransformationOverview() {
  const activeTransformations = transformations.slice(0, 3);
  const totalTransformations = transformations.length;
  const completedTransformations = transformations.filter(t => 
    t.kpiProjections.optimized.length > 0
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Transformations</h2>
          <p className="text-sm text-gray-600">
            Farm improvement initiatives and their impact
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {completedTransformations} of {totalTransformations} completed
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium text-green-600">
            {((completedTransformations / totalTransformations) * 100).toFixed(0)}% progress
          </span>
        </div>
      </div>
      
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Latest Improvements</span>
          <span>Impact</span>
        </div>
      </div>

      <div className="space-y-4">
        {activeTransformations.map((transformation) => (
          <div key={transformation.id} className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{transformation.title}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">{transformation.objective}</p>
            </div>
            <div className="ml-4 flex items-center text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">15%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}