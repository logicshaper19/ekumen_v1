import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Ruler, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface ParcelCard {
  id: string;
  name: string;
  size: number;
  location: string;
}

const mockParcels: ParcelCard[] = [
  { id: '1', name: 'North Field', size: 25, location: 'North Region' },
  { id: '2', name: 'South Field', size: 30, location: 'South Region' },
  { id: '3', name: 'East Field', size: 20, location: 'East Region' },
  { id: '4', name: 'West Field', size: 28, location: 'West Region' }
];

export default function ParcelSelectionStep() {
  const navigate = useNavigate();
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
      // In a real app, save selected parcels
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Progress Steps */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl mb-8">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
              <Check className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Step 1</p>
              <p className="text-sm text-gray-500">Account Details</p>
            </div>
          </div>
          <div className="flex-1 mx-4 border-t-2 border-gray-200 self-center"></div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
              <span className="text-sm font-medium">2</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Step 2</p>
              <p className="text-sm text-gray-500">Farm Setup</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Select Your Parcels
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select one or more parcels to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              These are sample parcels for demonstration. In a real application, you would be able to:
            </p>
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Import parcels from land registry</li>
              <li>Draw parcels on a map</li>
              <li>Enter custom parcel details</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {mockParcels.map((parcel) => (
              <button
                key={parcel.id}
                onClick={() => handleParcelSelect(parcel.id)}
                className={`relative p-6 rounded-lg border-2 text-left transition-colors ${
                  selectedParcels.includes(parcel.id)
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-pressed={selectedParcels.includes(parcel.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">{parcel.name}</h3>
                  </div>
                  {selectedParcels.includes(parcel.id) && (
                    <Check className="h-5 w-5 text-black" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Ruler className="h-4 w-4 mr-1" />
                    Size: {parcel.size} hectares
                  </div>
                  <p className="text-sm text-gray-500">Location: {parcel.location}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={selectedParcels.length === 0}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                selectedParcels.length > 0
                  ? 'bg-black hover:bg-gray-800'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {selectedParcels.length === 0 ? 'Select at least one parcel' : 'Continue to Dashboard'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}