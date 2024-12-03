import { Message } from '../../data/messagesData';
import { Partner } from '../../data/partnersData';
import { AlertCircle, Building2, Users, Mail } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

interface MessageListProps {
  messages: Message[];
  partners: Partner[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MessageList({ messages, partners, selectedId, onSelect }: MessageListProps) {
  const { t } = useTranslation();
  const getPartner = (partnerId: string) => partners.find(p => p.id === partnerId);

  return (
    <div className="h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="divide-y divide-gray-100">
        {messages.map((message) => {
          const partner = getPartner(message.partnerId);
          const formattedDate = new Date(message.timestamp).toLocaleString('fr-FR', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          });

          return (
            <button
              key={message.id}
              onClick={() => onSelect(message.id)}
              className={`w-full px-3 py-2 flex flex-col text-left hover:bg-gray-50 ${
                selectedId === message.id ? 'bg-indigo-50' : ''
              } ${!message.isRead ? 'bg-gray-50' : ''}`}
              aria-label={t.inbox.messageItem}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-2 h-2 rounded-full ${!message.isRead ? 'bg-indigo-600' : 'bg-transparent'}`} 
                  title={!message.isRead ? t.inbox.unread : t.inbox.read}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${!message.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                      {message.sender.name}
                    </span>
                    <span className="text-xs text-gray-500" title={t.inbox.sentDate}>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm truncate ${!message.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                      {message.subject}
                    </span>
                    {message.isUrgent && (
                      <span className="flex-shrink-0" title={t.inbox.urgent}>
                        <AlertCircle className="h-4 w-4 text-amber-500" aria-label={t.inbox.urgent} />
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate" title={t.inbox.messageContent}>
                    {message.content}
                  </p>
                  {partner && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500" title={t.inbox.organization}>
                      <Building2 className="h-3 w-3" aria-hidden="true" />
                      <span>{partner.organization}</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Mail className="h-12 w-12 mb-2" />
            <p>{t.inbox.noMessages}</p>
          </div>
        )}
      </div>
    </div>
  );
}