import { Partner } from '../../data/partnersData';
import { Building2 } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

interface ContactListProps {
  partners: Partner[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const getStatusLabel = (status: Partner['status']) => {
  switch (status) {
    case 'active':
      return 'actif';
    case 'inactive':
      return 'inactif';
    case 'new':
      return 'nouveau';
    default:
      return status;
  }
};

export default function ContactList({ partners, selectedId, onSelect }: ContactListProps) {
  const { t } = useTranslation();
  
  if (!partners || partners.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-900">{t.inbox.tabs.contacts}</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">{t.inbox.noContacts}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-900">{t.inbox.tabs.contacts}</h2>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {partners.map((partner) => (
          <li
            key={partner.id}
            className={`hover:bg-gray-50 cursor-pointer ${
              selectedId === partner.id ? 'bg-gray-50' : ''
            }`}
            onClick={() => onSelect(partner.id)}
          >
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {partner.firstName} {partner.lastName}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    partner.status === 'new'
                      ? 'bg-green-100 text-green-800'
                      : partner.status === 'inactive'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {getStatusLabel(partner.status)}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    <Building2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    {partner.company}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}