import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle, Play, Pause, Edit, MessageSquare } from 'lucide-react';
import { tasks, parcels, crops } from '../../data/planningData';
import AIAgent from '../AIAgent';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">Task not found</p>
        </div>
      </div>
    );
  }

  const parcel = parcels.find(p => p.id === task.parcelId);
  const crop = crops.find(c => c.id === task.cropId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Task Overview */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Due Date</h3>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              {task.timing && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-sm font-medium text-gray-900">Timing</h3>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {task.timing.startTime && (
                      <p>Started: {new Date(task.timing.startTime).toLocaleString()}</p>
                    )}
                    {task.timing.pausedAt && (
                      <p>Paused: {new Date(task.timing.pausedAt).toLocaleString()}</p>
                    )}
                    {task.timing.duration && (
                      <p>Duration: {task.timing.duration} minutes</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              {task.status === 'pending' && (
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Task
                </button>
              )}
              {task.status === 'in-progress' && (
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Task
                </button>
              )}
              {task.status === 'paused' && (
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Resume Task
                </button>
              )}
              {task.status !== 'completed' && (
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Task
                </button>
              )}
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Edit className="h-4 w-4 mr-2" />
                Edit Task
              </button>
            </div>
          </div>

          {/* Task Updates */}
          {task.updates && task.updates.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Updates</h2>
              <div className="space-y-4">
                {task.updates.map((update, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="ml-3">
                        <p className="text-sm text-gray-900">{update.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(update.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <AIAgent context="task" data={task} />
        </div>
      </div>
    </div>
  );
}