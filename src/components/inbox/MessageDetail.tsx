import { FileDown, Send, Building2, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { Message } from '../../data/messagesData';
import { Partner } from '../../data/partnersData';

interface MessageDetailProps {
  message: Message;
  partner: Partner | null;
  onClose: () => void;
}

export default function MessageDetail({ message, partner, onClose }: MessageDetailProps) {
  const [reply, setReply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReply('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          {partner?.firstName} {partner?.lastName}
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Détails du message</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Building2 className="h-4 w-4 mr-1" />
              {partner?.company} • {partner?.title}
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            Dernière mise à jour: {new Date(message.timestamp).toLocaleString('fr-FR')}
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600">
                  {message.sender.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {message.sender.name} <span className="text-gray-500">({message.sender.email})</span>
                </p>
                <p className="text-sm text-gray-500">{message.sender.company}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {new Date(message.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {message.summary && (
          <div className="mb-4 bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">{message.summary}</p>
          </div>
        )}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-900">{message.content}</p>
        </div>

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Pièces jointes</h3>
            <div className="grid grid-cols-2 gap-3">
              {message.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment.url}
                  className="flex items-center p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
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
              placeholder="Click here to reply..."
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
              Send Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}