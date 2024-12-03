import { CropRotationOptimization } from '../../data/transformationData';
import { Parcel } from '../../data/planningData';
import { FileText, Sparkles } from 'lucide-react';

interface RotationPlanListProps {
  transformations: CropRotationOptimization[];
  selectedPlan: { id: string; type: 'current' | 'optimized' } | null;
  onSelect: (plan: { id: string; type: 'current' | 'optimized' }) => void;
  parcels: Parcel[];
}

export default function RotationPlanList({ transformations, selectedPlan, onSelect, parcels }: RotationPlanListProps) {
  const getParcelNames = (parcelIds: string[]) => {
    return parcelIds
      .map(id => parcels.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Rotation Plans</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {transformations.map((transformation) => (
          <div key={transformation.id} className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-900">{transformation.title}</h3>
            </div>
            <p className="text-sm text-gray-500">
              {getParcelNames(transformation.parcels)}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => onSelect({ id: transformation.id, type: 'current' })}
                className={`flex-1 inline-flex items-center justify-center px-3 py-2 border rounded-md text-sm font-medium ${
                  selectedPlan?.id === transformation.id && selectedPlan?.type === 'current'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Current Plan
              </button>
              <button
                onClick={() => onSelect({ id: transformation.id, type: 'optimized' })}
                className={`flex-1 inline-flex items-center justify-center px-3 py-2 border rounded-md text-sm font-medium ${
                  selectedPlan?.id === transformation.id && selectedPlan?.type === 'optimized'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Optimized
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}