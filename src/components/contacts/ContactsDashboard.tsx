import { useState } from 'react';
import { messages } from '../../data/messagesData';
import { partners } from '../../data/partnersData';
import ContactList from './ContactList';
import MessageThread from './MessageThread';
import { Building2, Users, Plus } from 'lucide-react';
import AddContactModal from './AddContactModal';

export default function ContactsDashboard() {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);
  
  const selectedPartner = partners.find(p => p.id === selectedPartnerId);
  const partnerMessages = messages.filter(m => m.partnerId === selectedPartnerId);
  const unreadCount = messages.filter(m => !m.isRead).length;
  const urgentCount = messages.filter(m => m.isUrgent).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-600 mt-1">
            {partners.length} partners • {unreadCount} unread messages • {urgentCount} urgent
          </p>
        </div>
        <button
          onClick={() => setShowAddContact(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ContactList
            partners={partners}
            selectedId={selectedPartnerId}
            onSelect={setSelectedPartnerId}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedPartner ? (
            <MessageThread partner={selectedPartner} messages={partnerMessages} />
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
              Select a contact to view conversation history
            </div>
          )}
        </div>
      </div>

      {showAddContact && (
        <AddContactModal onClose={() => setShowAddContact(false)} />
      )}
    </div>
  );
}