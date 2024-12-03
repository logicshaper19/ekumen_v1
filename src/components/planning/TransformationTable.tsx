import { Transformation } from '../../data/transformationData';
import { parcels } from '../../data/planningData';
import { FileDown } from 'lucide-react';

interface TransformationTableProps {
  transformations: Transformation[];
  onSelect: (id: string) => void;
}

export default function TransformationTable({ transformations, onSelect }: TransformationTableProps) {
  const getParcelNames = (parcelIds: string[]) => {
    return parcelIds
      .map(id => parcels.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Parcels
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Objective
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Discussion
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Document
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transformations.map((transformation) => (
            <tr
              key={transformation.id}
              onClick={() => onSelect(transformation.id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {transformation.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {getParcelNames(transformation.parcels)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {transformation.objective}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(transformation.lastDiscussionDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a
                  href={transformation.documentUrl}
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FileDown className="h-5 w-5" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}