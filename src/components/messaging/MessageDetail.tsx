import { FileDown, Send, Building2, Globe, Phone } from 'lucide-react';
import { useState } from 'react';
import { Message } from '../../data/messagesData';
import { partners } from '../../data/partnersData';

interface MessageDetailProps {
  message: Message;
}

export default function MessageDetail({ message }: MessageDetailProps) {
  const [reply, setReply] = useState('');
  const partner = partners.find(p => p.id === message.partnerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reply submission
    setReply('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col h-[calc(100vh-16rem)]">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {partner?.firstName} {partner?.lastName}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Building2 className="h-4 w-4 mr-1" />
              {partner?.company}
            </div>
          </div>
          <div className="flex flex-col items-end text-sm text-gray-500">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {partner?.phone}
            </div>
            <div className="flex items-center mt-1">
              <Globe className="h-4 w-4 mr-1" />
              {partner?.website}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-2">
          via gr@gmail.com
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{message.subject}</h2>
            {message.summary && (
              <p className="text-sm text-gray-600 mt-1">{message.summary}</p>
            )}
          </div>
          {message.isUrgent && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
              Urgent
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose max-w-none">
          <p className="text-gray-900">{message.content}</p>
        </div>

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Attachments</h3>
            <div className="space-y-2">
              {message.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment.url}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <FileDown className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                    <p className="text-xs text-gray-500">{attachment.size}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
              className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Send className="h-4 w-4 mr-2" /> 
              Reply via Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}