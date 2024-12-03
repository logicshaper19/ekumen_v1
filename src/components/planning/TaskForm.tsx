import { useState } from 'react';
import { Calendar } from 'lucide-react'; 
import { useTranslation } from '../../contexts/LanguageContext';

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { parcels } from '../../data/planningData'; 

export default function TaskForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [task, setTask] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    priority: 'medium',
    type: 'maintenance',
    parcelId: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle task creation
    console.log('Creating task:', task);
    setSuccess(true);
    setTimeout(() => {
      navigate('/planning');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/planning')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'espace de travail
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.workBench.addTask}</h1>

            {success && (
              <div className="mb-6 bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">Tâche créée avec succès ! Redirection...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre de la tâche
                </label>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="ex: Analyse des sols de printemps"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Description détaillée de la tâche..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Parcel
                  </label>
                  <select
                    value={task.parcelId}
                    onChange={(e) => setTask({ ...task, parcelId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Sélectionner une parcelle</option>
                    {parcels.map(parcel => (
                      <option key={parcel.id} value={parcel.id}>
                        {parcel.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={task.startDate}
                      onChange={(e) => setTask({ ...task, startDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Heure de début
                    </label>
                    <input
                      type="time"
                      value={task.startTime}
                      onChange={(e) => setTask({ ...task, startTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={task.endDate}
                      onChange={(e) => setTask({ ...task, endDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={task.endTime}
                      onChange={(e) => setTask({ ...task, endTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Priorité
                  </label>
                  <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="low">{t.workBench.taskList.priority.low}</option>
                    <option value="medium">{t.workBench.taskList.priority.medium}</option>
                    <option value="high">{t.workBench.taskList.priority.high}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type de tâche
                  </label>
                  <select
                    value={task.type}
                    onChange={(e) => setTask({ ...task, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="planting">Plantation</option>
                    <option value="harvesting">Récolte</option>
                    <option value="fertilization">Fertilisation</option>
                    <option value="irrigation">Irrigation</option>
                    <option value="soil_preparation">Préparation du sol</option>
                    <option value="pesticide">Application de pesticides</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/planning')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t.common.actions.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                >
                  {t.workBench.addTask}
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
}