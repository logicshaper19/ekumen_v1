import { useState } from 'react';
import { Calendar, Ruler } from 'lucide-react';

interface ParcelActivityFormProps {
  parcelId: string;
  onSubmit: (activity: {
    type: string;
    details: string;
    measurements?: {
      quantity: number;
      unit: string;
    };
    notes?: string;
  }) => void;
  onCancel: () => void;
}

export default function ParcelActivityForm({ parcelId, onSubmit, onCancel }: ParcelActivityFormProps) {
  const [activity, setActivity] = useState({
    type: 'fertilizer',
    details: '',
    measurements: {
      quantity: 0,
      unit: 'kg/ha'
    },
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(activity);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Activity Type
        </label>
        <select
          value={activity.type}
          onChange={(e) => setActivity({ ...activity, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="fertilizer">Fertilizer Application</option>
          <option value="pesticide">Pesticide Application</option>
          <option value="irrigation">Irrigation</option>
          <option value="soil_work">Soil Work</option>
          <option value="harvest">Harvest</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Details
        </label>
        <input
          type="text"
          value={activity.details}
          onChange={(e) => setActivity({ ...activity, details: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="e.g., NPK 15-15-15 application"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="number"
              value={activity.measurements.quantity}
              onChange={(e) => setActivity({
                ...activity,
                measurements: {
                  ...activity.measurements,
                  quantity: parseFloat(e.target.value)
                }
              })}
              className="block w-full rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <select
              value={activity.measurements.unit}
              onChange={(e) => setActivity({
                ...activity,
                measurements: {
                  ...activity.measurements,
                  unit: e.target.value
                }
              })}
              className="rounded-r-md border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              <option value="kg/ha">kg/ha</option>
              <option value="l/ha">l/ha</option>
              <option value="m³">m³</option>
              <option value="t/ha">t/ha</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          value={activity.notes}
          onChange={(e) => setActivity({ ...activity, notes: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Additional observations or instructions..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Record Activity
        </button>
      </div>
    </form>
  );
}