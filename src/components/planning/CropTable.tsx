import { Leaf, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIAgent from '../AIAgent';

interface CropTableProps {
  crops: Crop[];
}

const getPlantingStatus = (crop: Crop) => {
  const now = new Date();
  const start = new Date(crop.plantingWindow.start);
  const end = new Date(crop.plantingWindow.end);
  
  if (now < start) return 'À venir';
  if (now > end) return 'Terminé';
  return 'En saison';
};

export default function CropTable({ crops }: CropTableProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Vue d'ensemble des cultures</h2>
        <p className="text-sm text-gray-500 mt-1">
          Suivre et gérer vos cultures sur toutes les parcelles
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {crops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => navigate(`/planning/crops/${crop.id}`)}
            className="p-6 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Leaf className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{crop.name}</h3>
                  <p className="text-sm text-gray-500">Variété: {crop.variety || 'Standard'}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                getPlantingStatus(crop) === 'En saison' 
                  ? 'bg-green-100 text-green-800'
                  : getPlantingStatus(crop) === 'À venir'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {getPlantingStatus(crop)}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Surface totale</p>
                  <p className="text-lg font-semibold text-gray-900">{crop.totalAcreage} ha</p>
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Parcelles</p>
                  <p className="text-lg font-semibold text-gray-900">{crop.parcels.length}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Fenêtre de semis</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(crop.plantingWindow.start).toLocaleDateString('fr-FR')} - 
                    {new Date(crop.plantingWindow.end).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
      <div className="lg:col-span-1">
        <AIAgent context="crop" data={crops} />
      </div>
    </div>
  );
}