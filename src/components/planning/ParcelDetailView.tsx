import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, Plus, Calendar, Clock, AlertCircle, CheckCircle, Leaf, Play, Pause, Edit, MessageSquare } from 'lucide-react';
import { Parcel, Task } from '../../data/planningData';
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
              Current Crop: {parcel.cropRotation[parcel.cropRotation.length - 1]?.crop}
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
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'tasks'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Tasks
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Soil Data</h3>
                <div className="space-y-2 text-sm">
                  <p>Type: {parcel.soilData.type}</p>
                  <p>pH: {parcel.soilData.ph}</p>
                  <p>Organic Matter: {parcel.soilData.organicMatter}%</p>
                  <p>Last Tested: {new Date(parcel.soilData.lastTested).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Irrigation</h3>
                <div className="space-y-2 text-sm">
                  <p>System: {parcel.irrigation.type}</p>
                  <p>Schedule: {parcel.irrigation.schedule}</p>
                  <p>Last Maintenance: {new Date(parcel.irrigation.lastMaintenance).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {showActivityForm && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <ParcelActivityForm
                  parcelId={parcel.id}
                  onSubmit={(activity) => {
                    console.log('Activity recorded:', activity);
                    setShowActivityForm(false);
                  }}
                  onCancel={() => setShowActivityForm(false)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
              <button
                onClick={() => setShowTaskForm(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </button>
            </div>

            {showTaskForm && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <TaskForm
                  parcelId={parcel.id}
                  onSubmit={(task) => {
                    console.log('Task created:', task);
                    setShowTaskForm(false);
                  }}
                  onCancel={() => setShowTaskForm(false)}
                />
              </div>
            )}

            <div className="divide-y divide-gray-200">
              {parcelTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{task.description}</p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {task.status === 'pending' && (
                        <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200">
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </button>
                      )}
                      {task.status === 'in-progress' && (
                        <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded hover:bg-amber-200">
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </button>
                      )}
                      {task.status !== 'completed' && (
                        <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </button>
                      )}
                      <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => navigate(`/planning/tasks/${task.id}`)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          {activeTab === 'overview' && (
            <button
              onClick={() => setShowActivityForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Record Activity
            </button>
          )}
        </div>
      </div>
    </div>
  );
}