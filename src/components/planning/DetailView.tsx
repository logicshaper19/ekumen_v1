import { FileDown, MessageCircle } from 'lucide-react';
import { parcels, crops, tasks } from '../../data/planningData';
import { transformations } from '../../data/transformationData';
import ParcelDetailView from './ParcelDetailView';

interface DetailViewProps {
  type: 'parcel' | 'crop' | 'transformation';
  id: string;
  onClose: () => void;
}

export default function DetailView({ type, id, onClose }: DetailViewProps) {
  const data = type === 'parcel'
    ? parcels.find(p => p.id === id)
    : type === 'crop'
    ? crops.find(c => c.id === id)
    : transformations.find(t => t.id === id);

  if (!data) return null;

  const getParcelNames = (parcelIds: string[]) => {
    return parcelIds
      .map(id => parcels.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <>
      {type === 'parcel' && 'cropRotation' in data && (
        <ParcelDetailView
          parcel={data}
          tasks={tasks}
          onClose={onClose}
        />
      )}
      <div className="bg-white shadow-md rounded-lg p-6">
        {type === 'crop' && 'parcels' in data && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Parcels Growing {data.name}</h3>
            <div className="space-y-2">
              {data.parcels.map((parcel) => (
                <div key={parcel.parcelId} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{parcel.parcelName}</span>
                  <span className="text-sm text-gray-600">{parcel.acreage} ha</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'transformation' && 'objective' in data && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Affected Parcels</h3>
              <p className="text-sm text-gray-900">{getParcelNames(data.parcels)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Objective</h3>
              <p className="text-sm text-gray-900">{data.objective}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <p className="text-sm text-gray-900">{data.notes}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Documentation</h3>
              <a
                href={data.documentUrl}
                className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-900"
              >
                <FileDown className="h-5 w-5" />
                <span className="text-sm">Download Document</span>
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Last Discussion</h3>
              <p className="text-sm text-gray-900">
                {new Date(data.lastDiscussionDate).toLocaleDateString()}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {/* Add chat functionality */}}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                See Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}