import { useState, useMemo } from 'react';
import { MapPin, Leaf, ClipboardList, FileCheck, Info, TrendingUp, Sprout, AlertCircle, Plus } from 'lucide-react';
import { parcels, crops, tasks } from '../../data/planningData';
import { appointments } from '../../data/appointmentsData';
import TaskOverview from './TaskOverview';
import { regulatoryDocuments } from '../../data/regulatoryData';
import ParcelTable from './ParcelTable';
import CropTable from './CropTable';
import TaskList from './TaskList';
import RegulatoryList from './RegulatoryList';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../contexts/LanguageContext';

type ViewMode = 'parcels' | 'crops' | 'tasks' | 'regulatory';

export default function PlanningDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('parcels');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const today = new Date();
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcomingTasks = tasks.filter(task => {
    const taskDate = new Date(task.startDate);
    return taskDate >= today && taskDate <= weekFromNow;
  }).slice(0, 3);

  const upcomingAppointments = appointments
    .filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= today && aptDate <= weekFromNow;
    })
    .slice(0, 3);

  const totalArea = useMemo(() => 
    parcels.reduce((sum, p) => sum + p.acreage, 0), 
    [parcels]
  );

  const metrics = useMemo(() => ({
    totalParcels: parcels.length,
    activeArea: totalArea,
    pendingTasks: tasks.filter(t => t.status === 'pending').length + regulatoryDocuments.filter(d => d.status === 'pending').length,
    urgentTasks: tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length + regulatoryDocuments.filter(d => new Date(d.dueDate) < new Date() && d.completionRate < 100).length
  }), [parcels, tasks, totalArea, regulatoryDocuments]);

  const handleParcelSelect = (parcelId: string) => {
    navigate(`/planning/parcels/${parcelId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.workBench.title}</h1>
          <p className="text-sm text-gray-600">{t.workBench.description}</p>
        </div>
        <button
          onClick={() => navigate('/planning/tasks/new')}
          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t.workBench.addTask}
        </button>
      </div>
      
      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.workBench.metrics.totalParcels}</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.totalParcels}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.workBench.metrics.activeArea}</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.activeArea} ha</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-amber-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.workBench.metrics.pendingTasks}</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.pendingTasks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.workBench.metrics.urgentTasks}</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.urgentTasks}</p>
            </div>
          </div>
        </div>
      </div>

      <TaskOverview />

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <Info className="h-5 w-5 text-gray-400 mr-2" />
          {viewMode === 'parcels' && t.workBench.parcelList.description}
          {viewMode === 'crops' && t.workBench.cropList.description}
          {viewMode === 'tasks' && t.workBench.taskList.description}
          {viewMode === 'regulatory' && t.workBench.regulatoryList.description}
        </div>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setViewMode('parcels')}
            className={`${
              viewMode === 'parcels'
                ? 'bg-gray-100 text-black'
                : 'text-gray-500 hover:text-gray-700'
            } px-3 py-2 font-medium text-sm rounded-md inline-flex items-center`}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {t.workBench.tabs.parcels}
          </button>
          <button
            onClick={() => setViewMode('crops')}
            className={`${
              viewMode === 'crops'
                ? 'bg-gray-100 text-black'
                : 'text-gray-500 hover:text-gray-700'
            } px-3 py-2 font-medium text-sm rounded-md inline-flex items-center`}
          >
            <Leaf className="h-4 w-4 mr-2" />
            {t.workBench.tabs.crops}
          </button>
          <button
            onClick={() => setViewMode('tasks')}
            data-tab="tasks"
            className={`${
              viewMode === 'tasks'
                ? 'bg-gray-100 text-black'
                : 'text-gray-500 hover:text-gray-700'
            } px-3 py-2 font-medium text-sm rounded-md inline-flex items-center`}
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            {t.workBench.tabs.tasks}
          </button>
          <button
            onClick={() => setViewMode('regulatory')}
            className={`${
              viewMode === 'regulatory'
                ? 'bg-gray-100 text-black'
                : 'text-gray-500 hover:text-gray-700'
            } px-3 py-2 font-medium text-sm rounded-md inline-flex items-center`}
          >
            <FileCheck className="h-4 w-4 mr-2" />
            {t.workBench.tabs.regulatory}
          </button>
        </nav>
      </div>

      <div>
        {viewMode === 'parcels' && (
          <ParcelTable parcels={parcels} onSelect={handleParcelSelect} />
        )}
        {viewMode === 'crops' && (
          <CropTable crops={crops} />
        )}
        {viewMode === 'tasks' && (
          <TaskList
            tasks={tasks}
            parcels={parcels}
            crops={crops}
            filterPriority={filterPriority}
            onFilterChange={setFilterPriority}
          />
        )}
        {viewMode === 'regulatory' && (
          <RegulatoryList documents={regulatoryDocuments} />
        )}
      </div>
    </div>
  );
}