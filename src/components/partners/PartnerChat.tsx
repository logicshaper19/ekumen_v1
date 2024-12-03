import { useState } from 'react';
import { Send, FileDown } from 'lucide-react';
import { partners, messages } from '../../data/partnersData';

interface PartnerChatProps {
  partnerId: string;
}

export default function PartnerChat({ partnerId }: PartnerChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const partner = partners.find(p => p.id === partnerId);
  const partnerMessages = messages.filter(m => m.partnerId === partnerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setNewMessage('');
  };

  if (!partner) return null;

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col h-[calc(100vh-24rem)]">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {partner.firstName} {partner.lastName}
        </h2>
        <p className="text-sm text-gray-500">{partner.company}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {partnerMessages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-900">{message.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {message.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  >
                    <FileDown className="h-4 w-4 mr-1" />
                    {attachment.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}