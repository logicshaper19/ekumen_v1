import { useState } from 'react';
import { Building2, Users, X } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  organization: string;
  type: 'bank' | 'insurance' | 'chamber';
}

const partners: Partner[] = [
  { id: '1', name: 'Jean Dupont', organization: 'Crédit Agricole', type: 'bank' },
  { id: '2', name: 'Marie Laurent', organization: "Chambre d'Agriculture", type: 'chamber' },
  { id: '3', name: 'Pierre Martin', organization: 'Groupama', type: 'insurance' }
];

interface PartnerSelectionModalProps {
  onClose: () => void;
  onSubmit: (selectedPartners: Partner[]) => void;
  t: any;
}

export default function PartnerSelectionModal({ onClose, onSubmit, t }: PartnerSelectionModalProps) {
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);

  const handlePartnerToggle = (partnerId: string) => {
    setSelectedPartners(prev =>
      prev.includes(partnerId)
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const handleSubmit = () => {
    const selected = partners.filter(p => selectedPartners.includes(p.id));
    onSubmit(selected);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{t.transition.actions.share}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 mb-4">
            {t.transition.selectPlan}
          </p>

          <div className="space-y-3">
            {partners.map((partner) => (
              <button
                key={partner.id}
                onClick={() => handlePartnerToggle(partner.id)}
                className={`w-full flex items-center p-3 rounded-lg border-2 transition-colors ${
                  selectedPartners.includes(partner.id)
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{partner.name}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">{partner.organization}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t.common.actions.cancel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedPartners.length === 0}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
              selectedPartners.length > 0
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {t.transition.actions.share}
          </button>
        </div>
      </div>
    </div>
  );
}