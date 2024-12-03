import { Building2, Mail, Phone, Globe, Calendar, FileText, MessageSquare, Clock } from 'lucide-react';
import { Partner } from '../../data/partnersData';
import { messages } from '../../data/messagesData';
import { useTranslation } from '../../contexts/LanguageContext';

interface ContactDetailProps {
  partner: Partner;
}

export default function ContactDetail({ partner }: ContactDetailProps) {
  const { t } = useTranslation();
  const partnerMessages = messages.filter(m => m.partnerId === partner.id);
  const lastContact = partnerMessages.length > 0 
    ? new Date(Math.max(...partnerMessages.map(m => new Date(m.timestamp).getTime())))
    : null;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-lg font-medium text-indigo-600">
                {partner.firstName[0]}{partner.lastName[0]}
              </span>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {partner.firstName} {partner.lastName}
              </h1>
              <p className="text-sm text-gray-500">{partner.title}</p>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            partner.status === 'new'
              ? 'bg-green-100 text-green-800'
              : partner.status === 'inactive'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {t.contact.status[partner.status]}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">{t.contact.information}</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-900">{partner.company}</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <a href={`mailto:${partner.email}`} className="text-indigo-600 hover:text-indigo-900">
                  {partner.email}
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <a href={`tel:${partner.phone}`} className="text-indigo-600 hover:text-indigo-900">
                  {partner.phone}
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Globe className="h-5 w-5 text-gray-400 mr-3" />
                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                  {partner.website}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">{t.contact.communicationHistory}</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{t.contact.lastContact}</span>
                  </div>
                  {lastContact && (
                    <span className="text-sm text-gray-500">
                      {lastContact.toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{t.contact.messages}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {partnerMessages.length} {t.contact.total}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{t.contact.partnerSince}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(partner.joinDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{t.contact.documents}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {partnerMessages.filter(m => m.attachments && m.attachments.length > 0).length} {t.contact.shared}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">{t.contact.recentDocuments}</h3>
            <div className="space-y-2">
              {partnerMessages
                .filter(m => m.attachments && m.attachments.length > 0)
                .slice(0, 3)
                .map((message) => (
                  message.attachments?.map((attachment, index) => (
                    <a
                      key={`${message.id}-${index}`}
                      href={attachment.url}
                      className="flex items-center p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </a>
                  ))
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}