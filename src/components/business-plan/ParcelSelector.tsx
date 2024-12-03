import { Parcel } from '../../data/businessPlanData';

interface ParcelSelectorProps {
  parcels: Parcel[];
  selectedParcelId: string | null;
  onParcelSelect: (parcelId: string | null) => void;
}

export default function ParcelSelector({ parcels, selectedParcelId, onParcelSelect }: ParcelSelectorProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <button
        onClick={() => onParcelSelect(null)}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          selectedParcelId === null
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Farm Overview
      </button>
      {parcels.map((parcel) => (
        <button
          key={parcel.id}
          onClick={() => onParcelSelect(parcel.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            selectedParcelId === parcel.id
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {parcel.name} ({parcel.area} ha)
        </button>
      ))}
    </div>
  );
}