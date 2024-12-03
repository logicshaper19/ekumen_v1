import { Calendar, MapPin, Leaf, Droplets } from 'lucide-react';
import { parcels } from '../../data/planningData';

export default function PlanningOverview() {
  const upcomingRotations = parcels.map(parcel => {
    const currentRotation = parcel.cropRotation.find(r => r.planned);
    const previousRotation = parcel.cropRotation.find(r => !r.planned && r.year === new Date().getFullYear());
    return {
      parcelName: parcel.name,
      currentCrop: previousRotation?.crop,
      crop: currentRotation?.crop,
      year: currentRotation?.year
    };
  }).filter(rotation => rotation.crop);

  const totalAcreage = parcels.reduce((sum, p) => sum + p.acreage, 0);
  const uniqueCrops = new Set(parcels.flatMap(p => p.cropRotation.map(r => r.crop))).size;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Rotations</h2>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Planned crop rotations and current plantings overview
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Leaf className="h-5 w-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Unique Crops</p>
            <p className="text-lg font-semibold text-gray-900">{uniqueCrops}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Area</p>
            <p className="text-lg font-semibold text-gray-900">{totalAcreage} ha</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {upcomingRotations.map((rotation, index) => (
          <div key={index} className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">{rotation.parcelName}</p>
              <p className="text-sm text-gray-500 flex items-center">
                {rotation.currentCrop && (
                  <span className="inline-flex items-center mr-2">
                    Current: {rotation.currentCrop}
                  </span>
                )}
                <span className="inline-flex items-center">
                  → {rotation.crop} ({rotation.year})
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}