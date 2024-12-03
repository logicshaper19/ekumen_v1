import { useState } from 'react';
import { partners } from '../../data/partnersData';
import PartnersList from './PartnersList';
import PartnerChat from './PartnerChat';
import AddPartnerForm from './AddPartnerForm';
import EmailSyncBanner from './EmailSyncBanner';
import { Users, UserPlus, UserCheck } from 'lucide-react';
import MetricCard from '../MetricCard';

export default function PartnersOverview() {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [showAddPartner, setShowAddPartner] = useState(false);

  const stats = {
    total: partners.length,
    new: partners.filter(p => p.status === 'new').length,
    inactive: partners.filter(p => p.status === 'inactive').length
  };

  const handleSync = () => {
    // Handle email synchronization
    console.log('Syncing emails...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
        <button
          onClick={() => setShowAddPartner(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Partners"
          value={stats.total}
          icon={<Users className="h-6 w-6 text-indigo-600" />}
        />
        <MetricCard
          title="New Partners"
          value={stats.new}
          icon={<UserPlus className="h-6 w-6 text-indigo-600" />}
          trend={{ value: stats.new, isPositive: true }}
        />
        <MetricCard
          title="Active Partners"
          value={stats.total - stats.inactive}
          icon={<UserCheck className="h-6 w-6 text-indigo-600" />}
          trend={{ value: ((stats.total - stats.inactive) / stats.total) * 100, isPositive: true }}
        />
      </div>

      <EmailSyncBanner
        email="gr@gmail.com"
        lastSync="2024-03-20T10:30:00"
        onSync={handleSync}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PartnersList
            partners={partners}
            selectedPartnerId={selectedPartnerId}
            onSelectPartner={setSelectedPartnerId}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedPartnerId ? (
            <PartnerChat partnerId={selectedPartnerId} />
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
              Select a partner to view conversation history
            </div>
          )}
        </div>
      </div>

      {showAddPartner && (
        <AddPartnerForm onClose={() => setShowAddPartner(false)} />
      )}
    </div>
  );
}