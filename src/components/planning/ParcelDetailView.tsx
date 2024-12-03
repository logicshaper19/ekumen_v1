import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, Plus, Calendar, Clock, AlertCircle, CheckCircle, Leaf, Play, Pause, Edit, MessageSquare } from 'lucide-react';
import { Parcel, Task } from '../../data/planningData';
import { useTranslation } from '../../contexts/LanguageContext';
import ParcelActivityForm from './ParcelActivityForm';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

interface ParcelDetailViewProps {
  parcel: Parcel;
  tasks: Task[];
  onClose: () => void;
}

export default function ParcelDetailView({ parcel, tasks, onClose }: ParcelDetailViewProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks'>('overview');

  const parcelTasks = tasks.filter(task => task.parcelId === parcel.id);
  const ongoingTasks = parcelTasks.filter(task => task.status === 'in-progress');
  const pendingTasks = parcelTasks.filter(task => task.status === 'pending');
  const completedTasks = parcelTasks.filter(task => task.status === 'completed');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col h-[calc(100vh-12rem)]">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {parcel.name}
              <span className="ml-2 text-sm font-normal text-gray-500">
                {parcel.acreage} hectares
              </span>
            </h2>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Leaf className="h-4 w-4 mr-1" />
              {t.workbench.currentCrop}: {parcel.cropRotation[parcel.cropRotation.length - 1]?.crop}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'overview'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.workbench.overview}
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'tasks'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.workbench.tasks}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{t.workbench.soil.data}</h3>
                <div className="space-y-2 text-sm">
                  <p>{t.workbench.soil.type}: {parcel.soilData.type}</p>
                  <p>{t.workbench.soil.ph}: {parcel.soilData.ph}</p>
                  <p>{t.workbench.soil.organicMatter}: {parcel.soilData.organicMatter}%</p>
                  <p>{t.workbench.soil.lastTested}: {new Date(parcel.soilData.lastTested).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{t.workbench.irrigation.title}</h3>
                <div className="space-y-2 text-sm">
                  <p>{t.workbench.irrigation.system}: {parcel.irrigation.type}</p>
                  <p>{t.workbench.irrigation.schedule}: {parcel.irrigation.schedule}</p>
                  <p>{t.workbench.irrigation.lastMaintenance}: {new Date(parcel.irrigation.lastMaintenance).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <TaskList tasks={parcelTasks} />
          </div>
        )}
      </div>

      {showActivityForm && (
        <ParcelActivityForm
          parcel={parcel}
          onClose={() => setShowActivityForm(false)}
        />
      )}

      {showTaskForm && (
        <TaskForm
          parcelId={parcel.id}
          onClose={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
}