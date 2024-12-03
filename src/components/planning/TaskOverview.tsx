import { ArrowRight } from 'lucide-react';
import { tasks as planningTasks } from '../../data/planningData';
import { appointments as appointmentData } from '../../data/appointmentsData';
import { useNavigate } from 'react-router-dom'; 
import { format, addDays, isWithinInterval } from 'date-fns';

export default function TaskOverview() {
  const navigate = useNavigate();
  const today = new Date();
  const weekFromNow = addDays(today, 7);

  const weeklyTasks = planningTasks
    .filter(task => {
      const taskDate = new Date(task.startDate);
      return isWithinInterval(taskDate, { start: today, end: weekFromNow });
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  const upcomingAppointments = appointmentData
    .filter(apt => {
      const aptDate = new Date(apt.date);
      return isWithinInterval(aptDate, { start: today, end: weekFromNow });
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Tâches de la semaine</h2>
          <button
            onClick={() => navigate('/planning')}
            className="text-sm text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center hover:underline"
          >
            Voir toutes les tâches
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {weeklyTasks.length > 0 ? weeklyTasks.map(task => (
            <div 
              key={task.id} 
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/planning/tasks/${task.id}`)}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  task.priority === 'high' 
                    ? 'bg-red-500' 
                    : task.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`} />
                <div>
                  <p className="text-base font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {format(new Date(task.startDate), 'dd/MM/yyyy')} • {task.startTime}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {task.status === 'pending' ? 'En attente' : 
                 task.status === 'in-progress' ? 'En cours' : 
                 task.status === 'completed' ? 'Terminé' : task.status}
              </div>
            </div>
          )) : (
            <div className="px-6 py-4 text-center text-gray-500">
              Aucune tâche prévue cette semaine
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Rendez-vous à venir</h2>
          <button
            onClick={() => navigate('/inbox')}
            className="text-sm text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center hover:underline"
          >
            Voir tous les rendez-vous
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {upcomingAppointments.length > 0 ? upcomingAppointments.map(appointment => (
              <div 
                key={appointment.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate('/inbox')}
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-500'
                      : appointment.status === 'scheduled'
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="text-base font-medium text-gray-900">{appointment.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(appointment.date), 'dd/MM/yyyy')} • {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.partnerName} • {appointment.organization}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.location}
                </div>
              </div>
          )) : (
            <div className="px-6 py-4 text-center text-gray-500">
              Aucun rendez-vous prévu cette semaine
            </div>
          )}
        </div>
      </div>
    </div>
  );
}