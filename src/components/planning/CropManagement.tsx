import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, MapPin, Calendar, Leaf } from 'lucide-react';
import { crops, tasks, parcels } from '../../data/planningData';
import TaskList from './TaskList';
import AIAgent from '../AIAgent';

export default function CropManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const crop = crops.find(c => c.id === id);

  if (!crop) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">Crop not found</p>
        </div>
      </div>
    );
  }

  const cropTasks = tasks.filter(t => t.cropId === id);
  const totalYield = crop.parcels.reduce((sum, p) => sum + p.expectedYield, 0);
  const avgYield = totalYield / crop.parcels.length || 0;

  const metrics = [
    {
      icon: <MapPin className="h-8 w-8 text-indigo-600" />,
      label: "Total Area",
      value: `${crop.totalAcreage} ha`
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      label: "Parcels",
      value: crop.parcels.length
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-amber-600" />,
      label: "Avg. Yield",
      value: `${avgYield.toFixed(1)} t/ha`
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      label: "Active Tasks",
      value: cropTasks.filter(t => t.status !== 'completed').length
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

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{crop.name}</h1>
          <p className="text-sm text-gray-600 mt-1">
            Variety: {crop.variety || 'Standard'} • 
            {crop.certifications.length > 0 
              ? ` Certifications: ${crop.certifications.join(', ')}`
              : ' No certifications'
            }
          </p>
        </div>
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
        <div className="lg:col-span-2 space-y-6">
          {/* Parcels Growing This Crop */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Growing Locations</h2>
            <div className="space-y-3">
              {crop.parcels.map(parcel => {
                const parcelData = parcels.find(p => p.id === parcel.parcelId);
                return (
                  <div 
                    key={parcel.parcelId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{parcel.parcelName}</p>
                        <p className="text-sm text-gray-500">
                          {parcel.acreage} ha • Expected yield: {parcel.expectedYield} t/ha
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/planning/parcels/${parcel.parcelId}`)}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks Section */}
          <TaskList
            tasks={cropTasks}
            parcels={parcels}
            crops={crops}
            filterPriority="all"
            onFilterChange={() => {}}
          />
        </div>
        <div className="lg:col-span-1">
          <AIAgent context="crop" data={crop} />
        </div>
      </div>
    </div>
  );
}