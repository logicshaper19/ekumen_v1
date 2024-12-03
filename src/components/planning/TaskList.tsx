import { Task } from '../../data/planningData';
import { useTranslation } from '../../contexts/LanguageContext';
import { Calendar, Flag, CheckCircle, Clock, AlertCircle, TrendingUp, Plus, Play, Pause, Square, Edit, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIAgent from '../AIAgent';
import TaskForm from './TaskForm';

interface TaskListProps {
  tasks: Task[];
  parcels: any[];
  crops: any[];
  filterPriority: string;
  onFilterChange: (priority: string) => void;
}

export default function TaskList({ tasks, parcels, crops, filterPriority, onFilterChange }: TaskListProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const taskStats = {
    total: tasks.length,
    onTrack: tasks.filter(t => t.status === 'in-progress').length,
    delayed: tasks.filter(t => 
      t.status === 'pending' && new Date(t.dueDate) < new Date()
    ).length,
    notStarted: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredTasks = tasks.filter(task => 
    filterPriority === 'all' || task.priority === filterPriority
  );

  const handleStartTask = (taskId: string) => {
    // In a real app, this would update the task in the backend
    console.log('Starting task:', taskId);
    setTaskCreated(true);
    setTimeout(() => setTaskCreated(false), 2000);
  };

  const handlePauseTask = (taskId: string) => {
    // In a real app, this would update the task in the backend
    console.log('Pausing task:', taskId);
    setTaskCreated(true);
    setTimeout(() => setTaskCreated(false), 2000);
  };

  const handleCompleteTask = (taskId: string) => {
    // In a real app, this would update the task in the backend
    console.log('Completing task:', taskId);
    setTaskCreated(true);
    setTimeout(() => setTaskCreated(false), 2000);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">

      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">{t.workBench.taskList.title}</h2>
          <button
            onClick={() => setShowTaskForm(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t.workBench.addTask}
          </button>
        </div>

        {taskCreated && (
          <div className="mb-4 bg-green-50 p-3 rounded-lg text-green-700 text-sm">
            Tâche créée avec succès !
          </div>
        )}

        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500">{t.workBench.metrics.totalParcels}</p>
                <p className="text-lg font-semibold text-gray-900">{taskStats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">{t.workBench.taskList.status.inProgress}</p>
                <p className="text-lg font-semibold text-green-600">{taskStats.onTrack}</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">{t.workBench.taskList.status.pending}</p>
                <p className="text-lg font-semibold text-red-600">{taskStats.delayed}</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">{t.workBench.taskList.status.pending}</p>
                <p className="text-lg font-semibold text-amber-600">{taskStats.notStarted}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">{t.workBench.taskList.status.completed}</p>
                <p className="text-lg font-semibold text-blue-600">{taskStats.completed}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <select
              value={filterPriority}
              onChange={(e) => onFilterChange(e.target.value)}
              className="rounded-md border-gray-300 text-sm"
            >
              <option value="all">{t.workBench.taskList.priorities.all}</option>
              <option value="high">{t.workBench.taskList.priorities.high}</option>
              <option value="medium">{t.workBench.taskList.priorities.medium}</option>
              <option value="low">{t.workBench.taskList.priorities.low}</option>
            </select>
          </div>
        </div>
      </div>

      {showTaskForm && (
        <div className="p-4 border-b border-gray-200">
          <TaskForm
            onSubmit={(task) => {
              setTaskCreated(true);
              setTimeout(() => setTaskCreated(false), 3000);
              setShowTaskForm(false);
            }}
            onCancel={() => setShowTaskForm(false)}
          />
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {filteredTasks.map((task) => {
          const parcel = parcels.find(p => p.id === task.parcelId);
          const crop = crops.find(c => c.id === task.cropId);

          return (
            <div key={task.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    <Flag className="h-3 w-3 mr-1" />
                    {task.priority}
                  </span>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                </div>
              </div>

              <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{task.description}</p>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {task.status === 'in-progress' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePauseTask(task.id);
                        }}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded hover:bg-amber-200"
                      >
                        <Pause className="h-3 w-3 mr-1" />
                        {t.common.actions.pause}
                      </button>
                    </>
                  )}
                  {task.status === 'paused' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartTask(task.id);
                      }}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {t.common.actions.resume}
                    </button>
                  )}
                  {(task.status === 'pending' || task.status === 'paused') && (
                    <button
                      onClick={(e) => handleStartTask(task.id)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {t.common.actions.start}
                    </button>
                  )}
                  {task.status !== 'completed' && (
                    <button
                      onClick={(e) => handleCompleteTask(task.id)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {t.common.actions.complete}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setShowEditModal(true);
                    }}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    {t.common.actions.edit}
                  </button>
                  <button 
                    onClick={() => navigate(`/planning/tasks/${task.id}`)}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {t.common.actions.view}
                  </button>
                </div>
                {task.timing?.startTime && (
                  <span className="text-xs text-gray-500">
                    Démarré: {new Date(task.timing.startTime).toLocaleTimeString()}
                  </span>
                )}
              </div>

              {(parcel || crop) && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                  {parcel && <span>Parcelle: {parcel.name}</span>}
                  {crop && <span>• Culture: {crop.name}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
    <div className="lg:col-span-1">
      <AIAgent context="task" data={{ tasks: filteredTasks, stats: taskStats }} />
    </div>

  </div>
  );
}