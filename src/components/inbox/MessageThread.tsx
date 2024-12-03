import React from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { Message } from '../../data/messagesData';
import { Partner } from '../../data/partnersData';

interface MessageThreadProps {
  messages: Message[];
  partner: Partner;
  onSendMessage: (content: string) => void;
}

export default function MessageThread({ messages, partner, onSendMessage }: MessageThreadProps) {
  const [input, setInput] = React.useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.partnerId === partner.id ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.partnerId === partner.id
                  ? 'bg-gray-100'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inbox.messageContent}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="h-4 w-4 mr-2" />
            {t.inbox.compose}
          </button>
        </div>
      </form>
    </div>
  );
}