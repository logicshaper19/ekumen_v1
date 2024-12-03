import { useState } from 'react';
import { Check } from 'lucide-react';

interface Parcel {
  id: string;
  name: string;
  size: number;
  location: string;
}

const mockParcels: Parcel[] = [
  { id: '1', name: 'North Field', size: 25, location: 'North Region' },
  { id: '2', name: 'South Field', size: 30, location: 'South Region' },
  { id: '3', name: 'East Field', size: 20, location: 'East Region' },
  { id: '4', name: 'West Field', size: 28, location: 'West Region' },
];

export default function ParcelSelection() {
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);

  const handleParcelSelect = (parcelId: string) => {
    setSelectedParcels(prev => 
      prev.includes(parcelId)
        ? prev.filter(id => id !== parcelId)
        : [...prev, parcelId]
    );
  };

  const handleContinue = () => {
    if (selectedParcels.length > 0) {
      // Navigate to next step
      console.log('Selected parcels:', selectedParcels);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Select Your Parcels</h1>
        <p className="mt-2 text-sm text-gray-600">
          Choose the parcels that make up your farm. You can select multiple parcels.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {mockParcels.map((parcel) => {
          const isSelected = selectedParcels.includes(parcel.id);
          return (
            <button
              key={parcel.id}
              onClick={() => handleParcelSelect(parcel.id)}
              className={`relative p-6 rounded-lg border-2 text-left transition-colors ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <Check className="w-5 h-5 text-indigo-600" />
                </div>
              )}
              <h3 className="text-lg font-medium text-gray-900">{parcel.name}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">Size: {parcel.size} hectares</p>
                <p className="text-sm text-gray-500">Location: {parcel.location}</p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={selectedParcels.length === 0}
          className={`px-6 py-3 rounded-md text-sm font-medium text-white ${
            selectedParcels.length > 0
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}