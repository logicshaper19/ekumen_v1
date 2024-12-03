import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import type { Appointment } from '../../data/appointmentsData';

interface AppointmentsListProps {
  appointments: Appointment[];
}

export default function AppointmentsList({ appointments }: AppointmentsListProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
        <button
          onClick={() => navigate('/inbox')}
          className="text-sm text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center hover:underline"
        >
          See all appointments
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {appointments.length > 0 ? (
          appointments.map(appointment => (
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
          ))
        ) : (
          <div className="px-6 py-4 text-center text-gray-500">
            No upcoming appointments this week
          </div>
        )}
      </div>
    </div>
  );
}