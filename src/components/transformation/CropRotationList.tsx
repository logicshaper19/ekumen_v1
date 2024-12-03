import { CropRotationOptimization } from '../../data/transformationData';
import { parcels } from '../../data/planningData';

interface CropRotationListProps {
  transformations: CropRotationOptimization[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  type: 'crop-rotation' | 'other-optimizations';
}

export default function CropRotationList({ transformations, selectedId, onSelect, type }: CropRotationListProps) {
  const getParcelNames = (parcelIds: string[]) => {
    if (!parcelIds || !Array.isArray(parcelIds)) return '';
    return parcelIds
      .map(id => parcels.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  // Filter transformations based on type
  const filteredTransformations = transformations.filter(t => 
    type === 'crop-rotation' 
      ? t.title.toLowerCase().includes('rotation') || t.title.toLowerCase().includes('organic')
      : !t.title.toLowerCase().includes('rotation') && !t.title.toLowerCase().includes('organic')
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {type === 'crop-rotation' ? 'Rotation Plans' : 'Optimization Plans'}
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredTransformations.map((transformation) => (
          <button
            key={transformation.id}
            onClick={() => onSelect(transformation.id)}
            className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
              selectedId === transformation.id ? 'bg-indigo-50' : ''
            }`}
          >
            <h3 className="text-sm font-medium text-gray-900">{transformation.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {getParcelNames(transformation.parcels)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}