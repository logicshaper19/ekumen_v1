import { Partner } from '../../data/partnersData';
import { Building2, Users } from 'lucide-react';

interface ContactListProps {
  partners: Partner[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ContactList({ partners, selectedId, onSelect }: ContactListProps) {
  return (
    <div className="h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="divide-y divide-gray-100">
        {partners.map((partner) => (
          <button
            key={partner.id}
            onClick={() => onSelect(partner.id)}
            className={`w-full px-3 py-2 flex flex-col text-left hover:bg-gray-50 cursor-pointer ${
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
            <div className="text-xs text-gray-500 mt-1">
              {partner.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}