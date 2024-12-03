import { useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { messages } from '../../data/messagesData';
import { partners } from '../../data/partnersData';
import MessageList from './MessageList';
import MessageThread from './MessageThread';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import AddContactModal from './AddContactModal';
import { Mail, Users, Plus, Send } from 'lucide-react';
import ComposeModal from './ComposeModal';

type ViewMode = 'inbox' | 'contacts';

export default function InboxDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('inbox');
  const { t } = useTranslation();
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showCompose, setShowCompose] = useState(false);

  // Check if translations and data are loaded
  if (!t?.inbox?.tabs) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const filteredMessages = messages?.filter(m => {
    if (!m || !partners) return false;
    const partner = partners.find(p => p.id === m.partnerId);
    const searchText = `${partner?.firstName || ''} ${partner?.lastName || ''} ${m.subject || ''} ${m.content || ''}`.toLowerCase();
    return searchText.includes((searchQuery || '').toLowerCase());
  }) || [];

  const selectedMessage = selectedMessageId ? filteredMessages.find(m => m.id === selectedMessageId) : null;
  const selectedContact = selectedMessageId && partners 
    ? partners.find(p => p.id === selectedMessageId) ?? null 
    : null;
  const unreadCount = messages?.filter(m => !m.isRead)?.length ?? 0;
  const urgentCount = messages?.filter(m => m.isUrgent)?.length ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.inbox.title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {t.inbox.connected} • {unreadCount} {t.inbox.unread} • {urgentCount} {t.inbox.urgent}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCompose(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
          >
            <Send className="h-4 w-4 mr-2" />
            {t.inbox.compose}
          </button>
          <button
            onClick={() => setShowAddContact(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t.inbox.addContact}
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Sidebar */}
        <div className="w-48 flex-shrink-0 bg-gray-50 border-r border-gray-200">
          <div className="p-3">
            <button
              onClick={() => setViewMode('inbox')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                viewMode === 'inbox'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Mail className="h-4 w-4 inline-block mr-2" />
              {t.inbox.tabs.messages}
            </button>
            <button
              onClick={() => setViewMode('contacts')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                viewMode === 'contacts'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-4 w-4 inline-block mr-2" />
              {t.inbox.tabs.contacts}
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="w-80 flex-shrink-0 border-r border-gray-200 bg-white">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.inbox.search}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
          </div>
          {viewMode === 'inbox' ? (
            <MessageList
              messages={filteredMessages}
              partners={partners || []}
              selectedId={selectedMessageId}
              onSelect={setSelectedMessageId}
            />
          ) : (
            <ContactList
              partners={partners || []}
              selectedId={selectedMessageId}
              onSelect={setSelectedMessageId}
            />
          )}
        </div>

        {/* Message/Contact Detail */}
        <div className="flex-1 bg-white overflow-y-auto">
          {viewMode === 'inbox' && selectedMessage && (
            <MessageThread
              messages={messages.filter(m => m.id === selectedMessage.id)}
              partner={selectedContact!}
              onSendMessage={(content) => {
                // Handle sending message
                console.log('Sending message:', content);
              }}
            />
          )}
          {viewMode === 'contacts' && selectedContact && (
            <ContactDetail
              partner={selectedContact}
              onClose={() => setViewMode('inbox')}
            />
          )}
        </div>
      </div>

      {showAddContact && (
        <AddContactModal
          onClose={() => setShowAddContact(false)}
        />
      )}

      {showCompose && (
        <ComposeModal
          onClose={() => setShowCompose(false)}
        />
      )}
    </div>
  );
}