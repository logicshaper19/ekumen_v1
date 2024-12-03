import { Partner } from '../../data/partnersData';
import EmailSyncStatus from './EmailSyncStatus';

interface PartnersListProps {
  partners: Partner[];
  selectedPartnerId: string | null;
  onSelectPartner: (id: string) => void;
}

export default function PartnersList({ partners, selectedPartnerId, onSelectPartner }: PartnersListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Partners</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {partners.map((partner) => (
          <button
            key={partner.id}
            onClick={() => onSelectPartner(partner.id)}
            className={`w-full px-4 py-3 flex flex-col hover:bg-gray-50 ${
              selectedPartnerId === partner.id ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">
                  {partner.firstName} {partner.lastName}
                </p>
                <p className="text-sm text-gray-500">{partner.company}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  partner.status === 'new'
                    ? 'bg-green-100 text-green-800'
                    : partner.status === 'inactive'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {partner.status}
              </span>
            </div>
            <div className="text-left">
              <EmailSyncStatus {...partner.emailSync} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}