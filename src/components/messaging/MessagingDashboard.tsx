import { useState } from 'react';
import { messages } from '../../data/messagesData';
import { partners } from '../../data/partnersData';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';
import { Building2, Users } from 'lucide-react';

export default function MessagingDashboard() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  
  const selectedMessage = messages.find(m => m.id === selectedMessageId);
  const unreadCount = messages.filter(m => !m.isRead).length;
  const urgentCount = messages.filter(m => m.isUrgent).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-sm text-gray-600 mt-1">
            Connected to gr@gmail.com • {unreadCount} unread • {urgentCount} urgent
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <p className="text-sm text-gray-600">
          Your email messages are synced automatically. Replies will be sent through your email account.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MessageList
            messages={messages}
            partners={partners}
            selectedId={selectedMessageId}
            onSelect={setSelectedMessageId}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <MessageDetail message={selectedMessage} />
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}