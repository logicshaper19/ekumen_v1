import { Message } from '../../data/messagesData';
import { Partner } from '../../data/partnersData';
import { AlertCircle, Building2, Users } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  partners: Partner[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MessageList({ messages, partners, selectedId, onSelect }: MessageListProps) {
  const getPartner = (partnerId: string) => partners.find(p => p.id === partnerId);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-900">Email Messages</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {messages.map((message) => {
          const partner = getPartner(message.partnerId);
          return (
            <button
              key={message.id}
              onClick={() => onSelect(message.id)}
              className={`w-full px-4 py-3 flex flex-col text-left hover:bg-gray-50 ${
                selectedId === message.id ? 'bg-indigo-50' : ''
              } ${!message.isRead ? 'bg-gray-50' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <span className={`text-sm ${!message.isRead ? 'font-semibold' : ''}`}>
                    {partner?.firstName} {partner?.lastName}
                  </span>
                </div>
                {message.isUrgent && (
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Building2 className="h-4 w-4 mr-1" />
                {partner?.company}
              </div>
              <p className={`text-sm ${!message.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                {message.subject}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}