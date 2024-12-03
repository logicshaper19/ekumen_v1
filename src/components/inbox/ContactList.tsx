import { Partner } from '../../data/partnersData';
import { Building2, Users } from 'lucide-react';

interface ContactListProps {
  partners: Partner[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ContactList({ partners, selectedId, onSelect }: ContactListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-900">Contacts</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className={`w-full px-4 py-3 flex flex-col ${
              selectedId === partner.id ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-900">
                  {partner.firstName} {partner.lastName}
                </span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                partner.status === 'new'
                  ? 'bg-green-100 text-green-800'
                  : partner.status === 'inactive'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {partner.status}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Building2 className="h-4 w-4 mr-1" />
              {partner.company}
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-500">{partner.title}</p>
              <button
                onClick={() => onSelect(partner.id)}
                className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}