import { Building2, Globe, Mail, Phone, X } from 'lucide-react';
import { Partner } from '../../data/partnersData';
import { useTranslation } from '../../contexts/LanguageContext';

interface ContactDetailProps {
  partner: Partner;
  onClose?: () => void;
}

export default function ContactDetail({ partner, onClose }: ContactDetailProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          {partner.firstName} {partner.lastName}
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label={t.inbox.actions.close}
          title={t.inbox.actions.close}
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      <div className="px-6 py-4 space-y-4 flex-1 overflow-y-auto">
        <div className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-900">{partner.company}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-900">{partner.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-900">{partner.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-900">{partner.website}</span>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">{t.contact.information}</h3>
          <p className="mt-2 text-sm text-gray-500">{partner.title}</p>
        </div>
      </div>
    </div>
  );
}
