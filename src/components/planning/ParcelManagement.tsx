import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Droplets, Thermometer, Leaf } from 'lucide-react';
import { parcels, tasks } from '../../data/planningData';
import ParcelDetailView from './ParcelDetailView';
import AIAgent from '../AIAgent';

export default function ParcelManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const parcel = parcels.find(p => p.id === id);

  if (!parcel) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">Parcel not found</p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      label: "Current Crop",
      value: parcel.cropRotation[parcel.cropRotation.length - 1]?.crop || "Not planted"
    },
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      label: "Soil Moisture",
      value: `${parcel.soilData.moisture || 0}%`
    },
    {
      icon: <Thermometer className="h-8 w-8 text-red-600" />,
      label: "Temperature",
      value: `${parcel.weather?.temperature || 0}°C`
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-indigo-600" />,
      label: "Last Yield",
      value: `${parcel.cropRotation.find(r => !r.planned)?.yield || 0} t/ha`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/planning')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Work Bench
        </button>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              {metric.icon}
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ParcelDetailView
            parcel={parcel}
            tasks={tasks}
            onClose={() => navigate('/planning')}
          />
        </div>
        <div className="lg:col-span-1">
          <AIAgent context="parcel" data={parcel} />
        </div>
      </div>
    </div>
  );
}