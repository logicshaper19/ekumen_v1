import { Message } from '../../data/messagesData';
import { Partner } from '../../data/partnersData';
import { useTranslation } from '../../contexts/LanguageContext';

interface MessageListProps {
  messages: Message[];
  partners: Partner[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MessageList({ messages, partners, selectedId, onSelect }: MessageListProps) {
  const { t } = useTranslation();

  if (!messages || messages.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        {t.inbox.noMessages}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {messages.map((message) => {
        const partner = partners.find(p => p.id === message.partnerId);
        if (!partner) return null;
        
        return (
          <button
            key={message.id}
            onClick={() => onSelect(message.id)}
            className={`w-full px-4 py-3 flex flex-col hover:bg-gray-50 ${
              selectedId === message.id ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">
                {`${partner.firstName} ${partner.lastName}`}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm text-gray-500 text-left truncate">
              {message.content}
            </p>
          </button>
        );
      })}
    </div>
  );
}