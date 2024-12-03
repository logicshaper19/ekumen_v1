import { useState } from 'react';
import { Message } from '../../data/messagesData';
import { Partner } from '../../data/partnersData';
import { FileDown, Send, Building2, Globe, Phone } from 'lucide-react';

interface MessageThreadProps {
  partner: Partner;
  messages: Message[];
}

export default function MessageThread({ partner, messages }: MessageThreadProps) {
  const [reply, setReply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReply('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col h-[calc(100vh-16rem)]">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {partner.firstName} {partner.lastName}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Building2 className="h-4 w-4 mr-1" />
              {partner.company} • {partner.title}
            </div>
          </div>
          <div className="flex flex-col items-end text-sm text-gray-500">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {partner.phone}
            </div>
            <div className="flex items-center mt-1">
              <Globe className="h-4 w-4 mr-1" />
              {partner.website}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">{message.subject}</h4>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </div>
              {message.summary && (
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {message.summary}
                </p>
              )}
              <div className="prose max-w-none text-sm text-gray-900">
                {message.content}
              </div>
              {message.attachments && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
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
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your message..."
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
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}