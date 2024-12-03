import { Parcel } from '../../data/planningData';
import { MapPin, Leaf, Droplets } from 'lucide-react';

interface ParcelTableProps {
  parcels: Parcel[];
  onSelect: (id: string) => void;
}

const getLatestCrop = (rotations: any[]) => {
  const current = rotations.find(r => !r.planned);
  return current?.crop || 'Not planted';
};

export default function ParcelTable({ parcels, onSelect }: ParcelTableProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Parcelles agricoles</h2>
        <p className="text-sm text-gray-500 mt-1">Suivre et gérer les parcelles individuelles</p>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Détails de la parcelle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Culture actuelle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parcels.map((parcel) => (
            <tr
              key={parcel.id}
              onClick={() => onSelect(parcel.id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Parcelle Nord</p>
                    <p className="text-sm text-gray-500">
                      25 ha • Normandie • Limon argileux
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">
                    {getLatestCrop(parcel.cropRotation) === 'Wheat' ? 'Blé' :
                     getLatestCrop(parcel.cropRotation) === 'Corn' ? 'Maïs' :
                     getLatestCrop(parcel.cropRotation) === 'Soybeans' ? 'Soja' :
                     getLatestCrop(parcel.cropRotation)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Actif
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}